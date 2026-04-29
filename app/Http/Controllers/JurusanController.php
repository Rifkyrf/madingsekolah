<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JurusanController extends Controller
{
    public function index()
    {
        $jurusans = Jurusan::all();
        
        return Inertia::render('Pages/Jurusan/Index', [
            'jurusans' => $jurusans
        ]);
    }

    public function show($id)
    {
        $jurusan = Jurusan::findOrFail($id);
        
        return Inertia::render('Pages/Jurusan/Show', [
            'jurusan' => $jurusan
        ]);
    }
}
