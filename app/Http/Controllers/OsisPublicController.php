<?php

namespace App\Http\Controllers;

use App\Models\OsisMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OsisPublicController extends Controller
{
    public function index(Request $request)
    {
        $angkatanList = OsisMember::distinct()->pluck('angkatan')->sortDesc();
        $angkatanAktif = $request->input('angkatan', $angkatanList->first() ?? '2024/2025');

        $roleOrder = ['ketua', 'wakil ketua', 'sekretaris', 'bendahara', 'koordinator', 'anggota'];
        $orderByRole = "FIELD(role, '" . implode("','", $roleOrder) . "')";

        $pembina = OsisMember::where('type', 'pembina')
                             ->where('angkatan', $angkatanAktif)
                             ->orderBy('order')
                             ->get();

        $intiOsis = OsisMember::where('type', 'inti')
                              ->where('angkatan', $angkatanAktif)
                              ->orderByRaw($orderByRole)
                              ->orderBy('order')
                              ->get();

        $sekbid = OsisMember::where('type', 'sekbid')
                            ->where('angkatan', $angkatanAktif)
                            ->orderBy('nama_sekbid')
                            ->orderByRaw($orderByRole)
                            ->orderBy('name')
                            ->get();

        // Group Sekbid directly in controller to make it easier for frontend
        $sekbidGrouped = [];
        foreach($sekbid as $member) {
            $namaSekbid = $member->nama_sekbid ?: 'Lainnya';
            if (!isset($sekbidGrouped[$namaSekbid])) {
                $sekbidGrouped[$namaSekbid] = [];
            }
            $sekbidGrouped[$namaSekbid][] = $member;
        }

        return Inertia::render('Osis/Index', [
            'pembina' => $pembina,
            'intiOsis' => $intiOsis,
            'sekbidGrouped' => $sekbidGrouped,
            'angkatanAktif' => $angkatanAktif,
            'angkatanList' => $angkatanList
        ]);
    }
}