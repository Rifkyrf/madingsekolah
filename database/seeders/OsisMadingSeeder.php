<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Hakguna;
use Illuminate\Support\Facades\Hash;

class OsisMadingSeeder extends Seeder
{
    public function run()
    {
        // Pastikan role osis dan mading ada
        $osisRole = Hakguna::firstOrCreate(['name' => 'osis']);
        $madingRole = Hakguna::firstOrCreate(['name' => 'mading']);

        // User OSIS
        User::create([
            'name' => 'Ahmad Osis',
            'email' => 'osis@smk.com',
            'nis' => '2024001',
            'password' => Hash::make('password'),
            'role' => $osisRole->id,
        ]);

        User::create([
            'name' => 'Siti Osis',
            'email' => 'osis2@smk.com',
            'nis' => '2024002',
            'password' => Hash::make('password'),
            'role' => $osisRole->id,
        ]);

        // User Mading
        User::create([
            'name' => 'Budi Mading',
            'email' => 'mading@smk.com',
            'nis' => '2024003',
            'password' => Hash::make('password'),
            'role' => $madingRole->id,
        ]);

        User::create([
            'name' => 'Rina Mading',
            'email' => 'mading2@smk.com',
            'nis' => '2024004',
            'password' => Hash::make('password'),
            'role' => $madingRole->id,
        ]);
    }
}