# Dokumentasi Gambar untuk Fitur Jurusan dan Sejarah

## Gambar Jurusan
Letakkan gambar-gambar berikut di folder `storage/app/public/jurusan/`:

1. **rpl.jpg** - Gambar untuk jurusan Rekayasa Perangkat Lunak
   - Ukuran: 800x600 pixels
   - Format: JPG/PNG
   - Konten: Komputer, coding, teknologi

2. **bdp.jpg** - Gambar untuk jurusan Bisnis Daring dan Pemasaran
   - Ukuran: 800x600 pixels
   - Format: JPG/PNG
   - Konten: E-commerce, digital marketing, online business

3. **pemasaran.jpg** - Gambar untuk jurusan Pemasaran
   - Ukuran: 800x600 pixels
   - Format: JPG/PNG
   - Konten: Marketing, sales, business meeting

4. **dkv.jpg** - Gambar untuk jurusan Desain Komunikasi Visual
   - Ukuran: 800x600 pixels
   - Format: JPG/PNG
   - Konten: Design tools, graphics, creative workspace

5. **animasi.jpg** - Gambar untuk jurusan Animasi
   - Ukuran: 800x600 pixels
   - Format: JPG/PNG
   - Konten: Animation software, 3D modeling, creative studio

## Gambar Sejarah
Letakkan gambar-gambar berikut di folder `storage/app/public/sejarah/`:

1. **2010.jpg** - Pendirian Sekolah
2. **2012.jpg** - Pembukaan Jurusan RPL
3. **2015.jpg** - Ekspansi Jurusan Kreatif
4. **2018.jpg** - Jurusan Bisnis Digital
5. **2020.jpg** - Transformasi Digital
6. **2023.jpg** - Sekolah Unggulan

## Gambar Default
Letakkan di folder `public/images/`:
- **default-jurusan.jpg** - Gambar default jika gambar jurusan tidak tersedia

## Cara Upload Gambar
1. Buat folder yang diperlukan jika belum ada
2. Upload gambar dengan nama yang sesuai
3. Pastikan ukuran file tidak terlalu besar (maksimal 2MB)
4. Jalankan `php artisan storage:link` jika belum

## Contoh Perintah
```bash
# Membuat symbolic link untuk storage
php artisan storage:link

# Membuat folder jika belum ada
mkdir storage/app/public/jurusan
mkdir storage/app/public/sejarah
```