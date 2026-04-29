<?php

namespace Database\Seeders;

use App\Models\Sejarah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SejarahSeeder extends Seeder
{
    public function run(): void
    {
        $sejarahs = [
            [
                'tahun' => 2010,
                'judul' => 'Pendirian Sekolah',
                'deskripsi' => 'SMK Mading Digital didirikan dengan visi menjadi sekolah unggulan dalam bidang teknologi dan kreativitas.',
                'foto' => 'sejarah/2010.jpg',
                'urutan' => 1
            ],
            [
                'tahun' => 2012,
                'judul' => 'Pembukaan Jurusan RPL',
                'deskripsi' => 'Membuka jurusan Rekayasa Perangkat Lunak sebagai jurusan pertama dengan fokus pengembangan aplikasi.',
                'foto' => 'sejarah/2012.jpg',
                'urutan' => 1
            ],
            [
                'tahun' => 2015,
                'judul' => 'Ekspansi Jurusan Kreatif',
                'deskripsi' => 'Menambah jurusan DKV dan Animasi untuk mengembangkan industri kreatif digital.',
                'foto' => 'sejarah/2015.jpg',
                'urutan' => 1
            ],
            [
                'tahun' => 2018,
                'judul' => 'Jurusan Bisnis Digital',
                'deskripsi' => 'Membuka jurusan BDP dan Pemasaran untuk menjawab kebutuhan era digital marketing.',
                'foto' => 'sejarah/2018.jpg',
                'urutan' => 1
            ],
            [
                'tahun' => 2020,
                'judul' => 'Transformasi Digital',
                'deskripsi' => 'Implementasi sistem pembelajaran digital dan platform mading online untuk seluruh siswa.',
                'foto' => 'sejarah/2020.jpg',
                'urutan' => 1
            ],
            [
                'tahun' => 2023,
                'judul' => 'Sekolah Unggulan',
                'deskripsi' => 'Meraih status sekolah unggulan dengan prestasi siswa di berbagai kompetisi nasional.',
                'foto' => 'sejarah/2023.jpg',
                'urutan' => 1
            ]
        ];

        foreach ($sejarahs as $sejarah) {
            Sejarah::create($sejarah);
        }
    }
}
