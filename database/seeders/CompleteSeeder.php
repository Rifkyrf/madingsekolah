<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Hakguna;
use App\Models\KategoriGuru;
use App\Models\OsisEvent;
use Illuminate\Support\Facades\Hash;

class CompleteSeeder extends Seeder
{
    public function run()
    {
        // 1. Pastikan role ada
        $adminRole = Hakguna::firstOrCreate(['name' => 'admin']);
        $guruRole = Hakguna::firstOrCreate(['name' => 'guru']);
        $siswaRole = Hakguna::firstOrCreate(['name' => 'siswa']);
        $osisRole = Hakguna::firstOrCreate(['name' => 'osis']);
        $madingRole = Hakguna::firstOrCreate(['name' => 'mading']);

        // 2. Kategori Guru
        $kategoriPembina = KategoriGuru::firstOrCreate([
            'nama' => 'Pembina OSIS',
            'jenis' => 'pembina',
            'deskripsi' => 'Guru pembina OSIS'
        ]);

        KategoriGuru::firstOrCreate([
            'nama' => 'Produktif - RPL',
            'jenis' => 'produktif',
            'deskripsi' => 'Guru mata pelajaran produktif RPL'
        ]);

        // 3. User Admin
        User::firstOrCreate(['email' => 'admin@smk.com'], [
            'name' => 'Administrator',
            'nis' => 'ADM001',
            'password' => Hash::make('password'),
            'role' => $adminRole->id,
        ]);

        // 4. User Guru Pembina OSIS
        $guruPembina = User::firstOrCreate(['email' => 'pembina@smk.com'], [
            'name' => 'Pak Pembina',
            'nis' => 'GUR001',
            'password' => Hash::make('password'),
            'role' => $guruRole->id,
            'kategori_guru_id' => $kategoriPembina->id,
        ]);

        // 5. User OSIS
        User::firstOrCreate(['email' => 'osis@smk.com'], [
            'name' => 'Ahmad OSIS',
            'nis' => '2024001',
            'password' => Hash::make('password'),
            'role' => $osisRole->id,
        ]);

        // 6. User Mading
        User::firstOrCreate(['email' => 'mading@smk.com'], [
            'name' => 'Budi Mading',
            'nis' => '2024003',
            'password' => Hash::make('password'),
            'role' => $madingRole->id,
        ]);

        // 7. Sample OSIS Event
        OsisEvent::firstOrCreate(['title' => 'Penerimaan Anggota OSIS Baru'], [
            'description' => 'Kegiatan penerimaan anggota OSIS baru untuk tahun ajaran 2024/2025',
            'photo' => 'osis-events/sample.jpg',
            'event_date' => now()->addDays(7),
            'user_id' => User::where('email', 'osis@smk.com')->first()->id,
        ]);
    }
}