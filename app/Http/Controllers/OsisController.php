<?php

namespace App\Http\Controllers;

use App\Models\OsisMember;
use App\Models\Sekbid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OsisController extends Controller
{
    public function manage()
    {
        $angkatanList = OsisMember::select('angkatan')->distinct()->pluck('angkatan');
        $angkatanAktif = request('angkatan') ?? ($angkatanList->first() ?? date('Y') . '/' . (date('Y') + 1));

        $inti = OsisMember::where('type', 'inti')
                          ->where('angkatan', $angkatanAktif)
                          ->orderBy('order')
                          ->get();

        $sekbid = OsisMember::where('type', 'sekbid')
                            ->where('angkatan', $angkatanAktif)
                            ->orderBy('nama_sekbid')
                            ->orderBy('order')
                            ->get()
                            ->groupBy('nama_sekbid');

        return Inertia::render('Osis/Manage', [
            'inti' => $inti,
            'sekbid' => $sekbid,
            'sekbidList' => Sekbid::orderBy('order')->get(),
            'angkatanList' => $angkatanList,
            'angkatanAktif' => $angkatanAktif,
            'intiCount' => $inti->count(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Osis/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'role' => 'required|string',
            'type' => 'required|in:inti,sekbid',
            'angkatan' => 'required|string|max:9',
            'nama_sekbid' => 'nullable|required_if:type,sekbid|string|max:100',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->type === 'inti') {
            $jumlahInti = OsisMember::where('type', 'inti')->where('angkatan', $request->angkatan)->count();
            if ($jumlahInti >= 7) return back()->withErrors(['type' => 'Pengurus inti maksimal 7 orang.']);
        }

        $data = $request->only(['name', 'role', 'type', 'angkatan', 'nama_sekbid']);
        if ($request->hasFile('photo')) $data['photo'] = $request->file('photo')->store('osis', 'public');

        $query = OsisMember::where('angkatan', $request->angkatan);
        $query->where('type', $request->type);
        if ($request->type === 'sekbid') $query->where('nama_sekbid', $request->nama_sekbid);
        
        $data['order'] = ($query->max('order') ?? 0) + 1;

        OsisMember::create($data);
        return redirect()->route('osis.manage')->with('success', 'Anggota OSIS berhasil ditambahkan!');
    }

    public function edit(OsisMember $osis)
    {
        return Inertia::render('Osis/Edit', ['member' => $osis]);
    }

    public function update(Request $request, OsisMember $osis)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'role' => 'required|string',
            'type' => 'required|in:inti,sekbid',
            'angkatan' => 'required|string|max:9',
            'nama_sekbid' => 'nullable|required_if:type,sekbid|string|max:100',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'role', 'type', 'angkatan', 'nama_sekbid']);
        if ($request->hasFile('photo')) {
            if ($osis->photo) Storage::disk('public')->delete($osis->photo);
            $data['photo'] = $request->file('photo')->store('osis', 'public');
        }

        $osis->update($data);
        return redirect()->route('osis.manage')->with('success', 'Data pengurus berhasil diperbarui!');
    }

    public function destroy(OsisMember $osis)
    {
        if ($osis->photo) Storage::disk('public')->delete($osis->photo);
        $osis->delete();
        return redirect()->route('osis.manage')->with('success', 'Data berhasil dihapus!');
    }
}