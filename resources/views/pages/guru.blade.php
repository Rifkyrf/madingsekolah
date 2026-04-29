<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guru & Tenaga Pendidik - SMK Bakti Nusantara 666</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="{{ asset('css/landing.css') }}" rel="stylesheet">
</head>
<body class="bg-light">
    @include('particial.navbar')

    <section class="sekolah-hero">
        <div class="hero-overlay"></div>
        <div class="container text-center">
            <h1 class="hero-title">Guru & Tenaga Pendidik</h1>
            <p class="hero-description mx-auto" style="max-width: 700px;">
                Mengenal lebih dekat para pendidik profesional SMK Bakti Nusantara 666 yang berdedikasi membimbing generasi cerdas dan berkarakter.
            </p>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            <div class="section-header">
                <h2>Profil Pendidik</h2>
                <div class="mx-auto bg-primary" style="height: 3px; width: 60px;"></div>
            </div>

            <div class="row g-4 justify-content-center">
                @foreach($gurus as $guru)
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="card work-card h-100 border-0 shadow-sm">
                        <div class="card-body text-center p-4">
                            <div class="position-relative d-inline-block mb-4">
                                <img src="{{ $guru->profile_photo_url }}" alt="{{ $guru->name }}"
                                     class="rounded-circle border border-4 border-white shadow-sm"
                                     style="width: 120px; height: 120px; object-fit: cover;">

                                @if($guru->isPembinaOsis())
                                    <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-warning text-dark shadow-sm p-2"
                                          title="Pembina OSIS" style="border: 2px solid white;">
                                        <i class="fas fa-star"></i>
                                    </span>
                                @endif
                            </div>

                            <h5 class="card-title mb-1" style="color: var(--primary-blue); font-weight: 700;">
                                {{ $guru->name }}
                            </h5>

                            @if($guru->kategoriGuru)
                            <div class="mb-3">
                                <span class="badge px-3 py-2 rounded-pill
                                    @if($guru->kategoriGuru->jenis === 'produktif') bg-primary
                                    @elseif($guru->kategoriGuru->jenis === 'normatif') bg-success
                                    @elseif($guru->kategoriGuru->jenis === 'adaptif') bg-info
                                    @elseif($guru->kategoriGuru->jenis === 'pembina') bg-warning text-dark
                                    @else bg-secondary
                                    @endif" style="font-weight: 500; font-size: 0.75rem; letter-spacing: 0.5px;">
                                    <i class="fas fa-tag me-1"></i> {{ strtoupper($guru->kategoriGuru->nama) }}
                                </span>
                            </div>
                            @endif

                            <div class="border-top pt-3 mt-3">
                                @if($guru->bio)
                                    <p class="card-text text-muted small italic">"{{ Str::limit($guru->bio, 70) }}"</p>
                                @else
                                    <p class="card-text text-muted small opacity-50">Berdedikasi untuk pendidikan Indonesia.</p>
                                @endif
                            </div>
                        </div>

                        <div class="card-footer bg-white border-0 text-center pb-4">
                            <div class="d-flex justify-content-center gap-2">
                                <a href="mailto:{{ $guru->email ?? 'info@smkbn666.sch.id' }}" class="btn btn-light btn-sm rounded-circle text-primary">
                                    <i class="fas fa-envelope"></i>
                                </a>
                                <a href="#" class="btn btn-light btn-sm rounded-circle text-primary">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            @if($gurus->isEmpty())
            <div class="text-center py-5">
                <div class="mb-3 opacity-25">
                    <i class="fas fa-chalkboard-teacher fa-5x"></i>
                </div>
                <h4 class="text-muted">Data guru belum tersedia</h4>
                <p class="text-secondary">Sedang dalam proses pembaruan data pendidik.</p>
            </div>
            @endif
        </div>
    </section>

    @include('particial.footer')

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <style>
        /* Tambahan style khusus halaman guru agar lebih "Pop" */
        .work-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 20px !important; /* Membuat sudut lebih lembut */
        }

        .work-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 20px 40px rgba(26, 75, 140, 0.12) !important;
        }

        .work-card img {
            transition: transform 0.5s ease;
        }

        .work-card:hover img {
            transform: scale(1.05);
        }

        .sekolah-hero {
            /* Pastikan hero section guru punya background yang elegan */
            background-image: url('https://images.unsplash.com/photo-1523050853064-8bd9275141e8?auto=format&fit=crop&q=80');
            background-size: cover;
            background-position: center;
        }

        .badge {
            text-transform: uppercase;
        }
    </style>
</body>
</html>