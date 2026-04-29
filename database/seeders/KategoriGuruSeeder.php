<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KategoriGuru;

class KategoriGuruSeeder extends Seeder
{
    public function run()
    {
        $kategoris = [
            ['nama' => 'Produktif - RPL', 'jenis' => 'produktif', 'deskripsi' => 'Guru mata pelajaran produktif Rekayasa Perangkat Lunak'],
            ['nama' => 'Produktif - TKJ', 'jenis' => 'produktif', 'deskripsi' => 'Guru mata pelajaran produktif Teknik Komputer Jaringan'],
            ['nama' => 'Normatif', 'jenis' => 'normatif', 'deskripsi' => 'Guru mata pelajaran normatif (Bahasa Indonesia, Matematika, dll)'],
            ['nama' => 'Adaptif', 'jenis' => 'adaptif', 'deskripsi' => 'Guru mata pelajaran adaptif (Bahasa Inggris, IPA, dll)'],
            ['nama' => 'Pembina OSIS', 'jenis' => 'pembina', 'deskripsi' => 'Guru pembina OSIS'],
            ['nama' => 'BK', 'jenis' => 'bk', 'deskripsi' => 'Guru Bimbingan Konseling'],
        ];

        foreach ($kategoris as $kategori) {
            KategoriGuru::create($kategori);
        }
    }
}