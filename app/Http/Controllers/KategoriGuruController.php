<?php

namespace App\Http\Controllers;

use App\Models\KategoriGuru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriGuruController extends Controller
{
    public function index()
    {
        $kategoris = KategoriGuru::withCount('guru')->get();
        return Inertia::render('Admin/KategoriGuru/Index', [
            'kategoris' => $kategoris
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/KategoriGuru/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:produktif,normatif,adaptif,pembina,bk',
            'deskripsi' => 'nullable|string'
        ]);

        KategoriGuru::create($request->all());
        return redirect()->route('admin.kategori-guru.index')->with('success', 'Kategori guru berhasil ditambahkan');
    }

    public function edit(KategoriGuru $kategoriGuru)
    {
        return Inertia::render('Admin/KategoriGuru/Edit', [
            'kategori' => $kategoriGuru
        ]);
    }

    public function update(Request $request, KategoriGuru $kategoriGuru)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:produktif,normatif,adaptif,pembina,bk',
            'deskripsi' => 'nullable|string'
        ]);

        $kategoriGuru->update($request->all());
        return redirect()->route('admin.kategori-guru.index')->with('success', 'Kategori guru berhasil diupdate');
    }

    public function destroy(KategoriGuru $kategoriGuru)
    {
        $kategoriGuru->delete();
        return redirect()->route('admin.kategori-guru.index')->with('success', 'Kategori guru berhasil dihapus');
    }
}