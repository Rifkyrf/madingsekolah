<?php

namespace App\Http\Controllers;

use App\Models\Sejarah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SejarahController extends Controller
{
    public function index()
    {
        // Data hardcoded sementara agar halaman sejarah bisa dirender (tanpa error DB)
        $timeline = [
            [
                'id' => 1,
                'year' => '2007',
                'title' => 'Awal Berdiri',
                'content' => 'SMK Bakti Nusantara 666 didirikan sebagai respons terhadap tingginya kebutuhan tenaga kerja trampil di bidang teknologi dan bisnis.',
                'photo_url' => null,
            ],
            [
                'id' => 2,
                'year' => '2010',
                'title' => 'Akreditasi Perdana',
                'content' => 'Mendapatkan akreditasi "A" untuk semua program studi utama yang menunjukkan komitmen tinggi terhadap kualitas pendidikan.',
                'photo_url' => null,
            ],
            [
                'id' => 3,
                'year' => '2015',
                'title' => 'Ekspansi Faskes & Lab',
                'content' => 'Pembangunan laboratorium komputer terpadu dan studio multimedia berstandar industri untuk menunjang praktik siswa.',
                'photo_url' => null,
            ],
            [
                'id' => 4,
                'year' => '2023',
                'title' => 'Era Digitalisasi',
                'content' => 'Menerapkan sistem pembelajaran berbasis teknologi (LMS) secara penuh serta peluncuran platform mading digital.',
                'photo_url' => null,
            ],
        ];

        return Inertia::render('Pages/Sejarah', [
            'timeline' => $timeline
        ]);
    }

    public function visiMisi()
    {
        return Inertia::render('Pages/VisiMisi');
    }
}
