<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'manage users',
            'manage works',
            'manage mading',
            'manage events',
            'create works',
            'edit works',
            'delete works',
            'comment',
            'like',
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(\Spatie\Permission\Models\Permission::all());

        $guruRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'guru']);
        $guruRole->givePermissionTo([
            'manage mading',
            'manage events',
            'create works',
            'edit works',
            'delete works',
            'comment',
            'like',
        ]);

        $osisRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'osis']);
        $osisRole->givePermissionTo([
            'manage events',
            'create works',
            'edit works',
            'delete works',
            'comment',
            'like',
        ]);

        $siswaRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'siswa']);
        $siswaRole->givePermissionTo([
            'create works',
            'edit works',
            'delete works',
            'comment',
            'like',
        ]);

        $guestRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'guest']);
        $guestRole->givePermissionTo([
            'comment',
            'like',
        ]);

        $madingRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'mading']);
        $madingRole->givePermissionTo([
            'manage mading',
            'create works',
            'edit works',
            'delete works',
            'comment',
            'like',
        ]);

        // Create a default admin user
        $admin = \App\Models\User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin Mading',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole($adminRole);
    }
}
