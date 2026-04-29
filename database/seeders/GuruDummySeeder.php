<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\KategoriGuru;
use App\Models\User;
use Illuminate\Database\Seeder;

class GuruDummySeeder extends Seeder
{
    public function run()
    {
        // Buat kategori guru
        $rpl = KategoriGuru::create([
            'nama' => 'Produktif - RPL',
            'jenis' => 'produktif',
        ]);

        $mtk = KategoriGuru::create([
            'nama' => 'Akademik - Matematika',
            'jenis' => 'akademik',
        ]);

        // Buat 3 user guru
        for ($i = 1; $i <= 3; $i++) {
            $user = User::factory()->create([
                'name' => "Guru $i",
                'email' => "guru$i@smkbn666.sch.id",
                'role' => 2,      // role guru
                'nis' => null,    // guru tidak pakai NIS → null
            ]);

            Guru::create([
                'user_id' => $user->id,
                'nip' => "NIP000$i",
                'kategori_guru_id' => $i % 2 === 1 ? $rpl->id : $mtk->id,
            ]);
        }
    }
}