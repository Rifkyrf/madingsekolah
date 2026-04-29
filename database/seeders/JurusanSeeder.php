<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JurusanSeeder extends Seeder
{
    public function run(): void
    {
        $jurusans = [
            [
                'nama' => 'Pengembangan Perangkat Lunak dan Gim',
                'kode' => 'PPLG',
                'deskripsi' => 'Jurusan yang mempelajari pengembangan aplikasi, sistem perangkat lunak, dan game dengan teknologi terkini.',
                'foto' => 'jurusan/pplg.jpg',
                'prospek_kerja' => [
                    'Software Developer',
                    'Game Developer',
                    'Web Developer',
                    'Mobile App Developer',
                    'System Analyst'
                ],
                'mata_pelajaran' => [
                    'Pemrograman Dasar',
                    'Basis Data',
                    'Pemrograman Web',
                    'Game Development',
                    'Mobile Programming'
                ]
            ],
            [
                'nama' => 'Bisnis dan Pemasaran',
                'kode' => 'BDP',
                'deskripsi' => 'Jurusan yang fokus pada strategi pemasaran digital dan pengelolaan bisnis modern.',
                'foto' => 'jurusan/bdp.jpg',
                'prospek_kerja' => [
                    'Digital Marketing Specialist',
                    'Business Development',
                    'Social Media Manager',
                    'Content Creator',
                    'E-commerce Manager'
                ],
                'mata_pelajaran' => [
                    'Pemasaran Digital',
                    'Manajemen Bisnis',
                    'Media Sosial Marketing',
                    'E-commerce',
                    'Kewirausahaan'
                ]
            ],
            [
                'nama' => 'Akuntansi',
                'kode' => 'AKT',
                'deskripsi' => 'Jurusan yang mempelajari pencatatan, pengolahan, dan pelaporan keuangan perusahaan.',
                'foto' => 'jurusan/akt.jpg',
                'prospek_kerja' => [
                    'Akuntan',
                    'Staff Keuangan',
                    'Auditor',
                    'Tax Consultant',
                    'Financial Analyst'
                ],
                'mata_pelajaran' => [
                    'Akuntansi Dasar',
                    'Akuntansi Perusahaan',
                    'Perpajakan',
                    'Audit',
                    'Sistem Informasi Akuntansi'
                ]
            ],
            [
                'nama' => 'Desain Komunikasi Visual',
                'kode' => 'DKV',
                'deskripsi' => 'Jurusan yang mengembangkan kemampuan desain grafis dan komunikasi visual untuk berbagai media.',
                'foto' => 'jurusan/dkv.jpg',
                'prospek_kerja' => [
                    'Graphic Designer',
                    'UI/UX Designer',
                    'Brand Designer',
                    'Illustrator',
                    'Creative Director'
                ],
                'mata_pelajaran' => [
                    'Desain Grafis',
                    'Tipografi',
                    'Fotografi',
                    'Ilustrasi Digital',
                    'Branding'
                ]
            ],
            [
                'nama' => 'Animasi',
                'kode' => 'ANM',
                'deskripsi' => 'Jurusan yang fokus pada pembuatan animasi 2D dan 3D untuk film, game, dan media digital.',
                'foto' => 'jurusan/anm.jpg',
                'prospek_kerja' => [
                    '2D/3D Animator',
                    'Motion Graphics Designer',
                    'Game Artist',
                    'VFX Artist',
                    'Character Designer'
                ],
                'mata_pelajaran' => [
                    'Animasi 2D',
                    'Animasi 3D',
                    'Motion Graphics',
                    'Character Design',
                    'Visual Effects'
                ]
            ]
        ];

        foreach ($jurusans as $jurusan) {
            Jurusan::create($jurusan);
        }
    }
}
