# Dokumentasi Fitur Jurusan dan Sejarah

## Overview
Fitur baru yang telah ditambahkan ke aplikasi SMK Mading Digital:

### 1. Sistem Jurusan
- **Halaman Index Jurusan**: Menampilkan semua jurusan dalam bentuk card dengan animasi
- **Halaman Detail Jurusan**: Informasi lengkap tentang mata pelajaran dan prospek kerja
- **5 Jurusan**: RPL, BDP, Pemasaran, DKV, dan Animasi

### 2. Sistem Sejarah
- **Timeline Sejarah**: Menampilkan perjalanan sekolah dari tahun ke tahun
- **Animasi Timeline**: Fade in dan slide animation untuk setiap item
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile

### 3. Halaman Visi & Misi
- **Desain Modern**: Layout yang menarik dengan animasi
- **Nilai-nilai Sekolah**: Menampilkan core values dengan visual yang menarik

## Struktur File

### Models
- `app/Models/Jurusan.php` - Model untuk data jurusan
- `app/Models/Sejarah.php` - Model untuk data sejarah

### Controllers
- `app/Http/Controllers/JurusanController.php` - Controller untuk jurusan
- `app/Http/Controllers/SejarahController.php` - Controller untuk sejarah

### Views
```
resources/views/pages/
├── jurusan/
│   ├── index.blade.php    # Halaman daftar jurusan
│   └── show.blade.php     # Halaman detail jurusan
├── sejarah/
│   └── index.blade.php    # Halaman timeline sejarah
└── visi-misi.blade.php    # Halaman visi & misi
```

### Migrations
- `2026_01_13_060514_create_jurusans_table.php`
- `2026_01_13_060602_create_sejarahs_table.php`

### Seeders
- `database/seeders/JurusanSeeder.php` - Data 5 jurusan
- `database/seeders/SejarahSeeder.php` - Data timeline sejarah

## Routes

### Public Routes
```php
// Jurusan
Route::get('/jurusan', [JurusanController::class, 'index'])->name('jurusan.index');
Route::get('/jurusan/{id}', [JurusanController::class, 'show'])->name('jurusan.show');

// Sejarah dan Visi Misi
Route::get('/sejarah', [SejarahController::class, 'index'])->name('sejarah.index');
Route::get('/visi-misi', [SejarahController::class, 'visiMisi'])->name('visi-misi');
```

## Database Schema

### Tabel Jurusans
```sql
- id (bigint, primary key)
- nama (string) - Nama jurusan
- kode (string, 10) - Kode jurusan (RPL, BDP, dll)
- deskripsi (text) - Deskripsi jurusan
- foto (string, nullable) - Path foto jurusan
- prospek_kerja (text, nullable) - JSON array prospek kerja
- mata_pelajaran (text, nullable) - JSON array mata pelajaran
- is_active (boolean, default true)
- created_at, updated_at
```

### Tabel Sejarahs
```sql
- id (bigint, primary key)
- tahun (year) - Tahun kejadian
- judul (string) - Judul peristiwa
- deskripsi (text) - Deskripsi peristiwa
- foto (string, nullable) - Path foto
- urutan (integer, default 0) - Urutan tampil
- is_active (boolean, default true)
- created_at, updated_at
```

## Fitur Animasi

### Library yang Digunakan
- **AOS (Animate On Scroll)**: https://unpkg.com/aos@2.3.1/
- **Custom CSS Animations**: `public/css/animations.css`

### Jenis Animasi
1. **Fade In**: Muncul dengan efek fade
2. **Slide In**: Masuk dari samping
3. **Scale**: Efek zoom in
4. **Timeline**: Animasi khusus untuk timeline sejarah
5. **Hover Effects**: Efek saat hover pada card

## Navbar Updates

### Desktop Navigation
- **Dropdown Jurusan**: Menampilkan semua jurusan + link "Semua Jurusan"
- **Dropdown Tentang**: Berisi Sejarah dan Visi & Misi

### Mobile Navigation
- **Nested Dropdown**: Dropdown bersarang untuk mobile
- **Responsive Design**: Optimal untuk layar kecil

## Assets dan Media

### Struktur Folder
```
storage/app/public/
├── jurusan/
│   ├── rpl.jpg
│   ├── bdp.jpg
│   ├── pemasaran.jpg
│   ├── dkv.jpg
│   └── animasi.jpg
└── sejarah/
    ├── 2010.jpg
    ├── 2012.jpg
    ├── 2015.jpg
    ├── 2018.jpg
    ├── 2020.jpg
    └── 2023.jpg

public/images/
└── default-jurusan.jpg
```

## Cara Penggunaan

### 1. Setup Database
```bash
# Jalankan migration
php artisan migrate

# Jalankan seeder
php artisan db:seed --class=JurusanSeeder
php artisan db:seed --class=SejarahSeeder

# Buat symbolic link storage
php artisan storage:link
```

### 2. Upload Gambar
- Upload gambar jurusan ke `storage/app/public/jurusan/`
- Upload gambar sejarah ke `storage/app/public/sejarah/`
- Upload gambar default ke `public/images/`

### 3. Akses Halaman
- **Semua Jurusan**: `/jurusan`
- **Detail Jurusan**: `/jurusan/{id}`
- **Sejarah**: `/sejarah`
- **Visi & Misi**: `/visi-misi`

## Customization

### Menambah Jurusan Baru
1. Tambah data di `JurusanSeeder.php`
2. Jalankan `php artisan db:seed --class=JurusanSeeder`
3. Upload gambar jurusan

### Menambah Timeline Sejarah
1. Tambah data di `SejarahSeeder.php`
2. Jalankan `php artisan db:seed --class=SejarahSeeder`
3. Upload gambar sejarah

### Mengubah Animasi
- Edit file `public/css/animations.css`
- Atau gunakan AOS attributes di view files

## Responsive Design

### Breakpoints
- **Desktop**: >= 992px
- **Tablet**: 768px - 991px
- **Mobile**: < 768px

### Mobile Optimizations
- Timeline berubah menjadi single column
- Card layout menyesuaikan layar
- Navigation menjadi hamburger menu
- Animasi duration dipercepat

## Performance

### Optimizations
- Lazy loading untuk gambar
- CSS dan JS minification
- Efficient database queries
- Responsive images

### Caching
- Route caching: `php artisan route:cache`
- Config caching: `php artisan config:cache`
- View caching: `php artisan view:cache`

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Gambar Tidak Muncul
1. Pastikan `php artisan storage:link` sudah dijalankan
2. Cek permission folder storage
3. Pastikan file gambar ada di lokasi yang benar

### Animasi Tidak Berjalan
1. Pastikan AOS library ter-load
2. Cek console browser untuk error JavaScript
3. Pastikan CSS animations ter-load

### Route Tidak Ditemukan
1. Jalankan `php artisan route:clear`
2. Pastikan controller dan method ada
3. Cek namespace di routes/web.php