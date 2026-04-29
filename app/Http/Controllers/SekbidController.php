<?php

namespace App\Http\Controllers;

use App\Models\Sekbid;
use Illuminate\Http\Request;

class SekbidController extends Controller
{
    public function index()
    {
        $sekbids = Sekbid::withCount('anggota')->orderBy('order')->get();
        return response()->json($sekbids);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100|unique:sekbids,nama',
            'deskripsi' => 'nullable|string|max:255',
        ]);

        $maxOrder = Sekbid::max('order') ?? 0;
        $sekbid = Sekbid::create([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'order' => $maxOrder + 1,
        ]);

        return response()->json(['success' => true, 'sekbid' => $sekbid]);
    }

    public function update(Request $request, Sekbid $sekbid)
    {
        $request->validate([
            'nama' => 'required|string|max:100|unique:sekbids,nama,' . $sekbid->id,
            'deskripsi' => 'nullable|string|max:255',
        ]);

        $oldNama = $sekbid->nama;
        $sekbid->update([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        // Update nama_sekbid di OsisMember jika nama berubah
        if ($oldNama !== $request->nama) {
            \App\Models\OsisMember::where('nama_sekbid', $oldNama)->update(['nama_sekbid' => $request->nama]);
        }

        return response()->json(['success' => true, 'sekbid' => $sekbid]);
    }

    public function destroy(Sekbid $sekbid)
    {
        // Cek apakah ada anggota
        if ($sekbid->anggota()->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Tidak bisa menghapus Sekbid yang masih memiliki anggota.'], 422);
        }

        $sekbid->delete();
        return response()->json(['success' => true]);
    }
}
