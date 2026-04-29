<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Guru - SMK Bakti Nusantara 666</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Google Fonts: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    {{-- CSS khusus untuk landing --}}
    <link href="{{ asset('css/landing.css') }}" rel="stylesheet">
    <style>
        .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,123,255,0.15);
        }
        .bg-gradient {
            background: linear-gradient(45deg, #007bff, #0056b3);
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    @include('particial.navbar')

    <!-- Konten Utama -->
    <div class="container py-5">
        <div class="text-center mb-5">
            <h1><i class="fas fa-chalkboard-teacher me-2"></i>Daftar Guru</h1>
            <p class="text-muted">Guru-guru profesional SMK Bakti Nusantara 666 yang siap membimbing generasi unggul</p>
        </div>

        @if($guruList->isEmpty())
            <div class="text-center py-5">
                <i class="fas fa-user-graduate fa-3x text-muted mb-3"></i>
                <p>Belum ada data guru tersedia.</p>
            </div>
        @else
            <div class="row g-4">
                @foreach($guruList as $guru)
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm border-0 text-center hover-card">
                            <div class="card-body">
                                <img src="{{ $guru->user->profile_photo_url }}"
                                     alt="{{ $guru->user->name }}"
                                     class="rounded-circle mb-3"
                                     style="width: 100px; height: 100px; object-fit: cover; border: 3px solid #007bff;">
                                <h5 class="card-title text-primary">{{ $guru->user->name }}</h5>
                                <p class="text-muted small mb-2">
                                    <i class="fas fa-id-card me-1"></i>NIP: {{ $guru->nip }}
                                </p>
                                <span class="badge bg-gradient bg-primary px-3 py-2 mb-2">
                                    <i class="fas fa-chalkboard-teacher me-1"></i>
                                    {{ $guru->kategori?->nama ?? 'Guru' }}
                                </span>
                                @if($guru->kategori?->deskripsi)
                                    <p class="text-muted small mt-2">{{ Str::limit($guru->kategori->deskripsi, 80) }}</p>
                                @endif
                            </div>
                            <div class="card-footer bg-transparent border-0">
                                <small class="text-muted">
                                    <i class="fas fa-graduation-cap me-1"></i>
                                    {{ $guru->kategori?->jenis ?? 'Pendidik' }}
                                </small>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            
            <div class="mt-4 d-flex justify-content-center">
                {{ $guruList->links() }}
            </div>
        @endif
    </div>

    <!-- Footer -->
    @include('particial.footer')

    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('javascript/landing.js') }}"></script>
</body>
</html>