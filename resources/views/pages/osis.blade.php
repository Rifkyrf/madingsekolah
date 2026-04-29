<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Struktur OSIS - SMK Bakti Nusantara 666</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <link href="{{ asset('css/landing.css') }}" rel="stylesheet">

    <style>
        :root {
            --primary-blue: #1e3a8a;
            --accent-blue: #3b82f6;
            --soft-bg: #f8fafc;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--soft-bg);
            color: #334155;
            overflow-x: hidden;
        }

        /* Hero Section khusus OSIS */
        .osis-header {
            background: linear-gradient(135deg, var(--primary-blue) 0%, #1e40af 100%);
            color: white;
            padding: 100px 0 60px;
            margin-bottom: 50px;
            border-radius: 0 0 50px 50px;
        }

        /* Pencarian Angkatan Modern */
        .search-box {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            margin-top: -50px;
            position: relative;
            z-index: 10;
        }

        /* Zigzag Card Improvement */
        .zigzag-container {
            position: relative;
            padding: 40px 0;
        }

        .zigzag-card {
            display: flex;
            align-items: center;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            margin-bottom: 40px;
            border-left: 5px solid var(--accent-blue);
        }

        .zigzag-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }

        .zigzag-card img {
            width: 250px;
            height: 300px;
            object-fit: cover;
        }

        .zigzag-card .info {
            padding: 40px;
            flex: 1;
        }

        .zigzag-card:nth-child(even) {
            flex-direction: row-reverse;
            border-left: none;
            border-right: 5px solid var(--accent-blue);
            text-align: right;
        }

        /* Sekbid Grid Improvement */
        .sekbid-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            transition: 0.3s;
            background: white;
        }

        .sekbid-card:hover {
            transform: scale(1.03);
        }

        .sekbid-img-wrapper {
            position: relative;
            height: 250px;
            overflow: hidden;
        }

        .sekbid-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .sekbid-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            padding: 20px;
            color: white;
        }

        .section-title {
            font-weight: 700;
            color: var(--primary-blue);
            margin-bottom: 40px;
            position: relative;
            display: inline-block;
        }

        .section-title::after {
            content: '';
            width: 50%;
            height: 4px;
            background: var(--accent-blue);
            position: absolute;
            bottom: -10px;
            left: 25%;
            border-radius: 2px;
        }

        /* Fix Footer agar tidak tenggelam */
        footer {
            margin-top: 80px;
            position: relative;
            z-index: 1;
        }

        @media (max-width: 768px) {
            .zigzag-card, .zigzag-card:nth-child(even) {
                flex-direction: column;
                text-align: center;
                border: none;
                border-top: 5px solid var(--accent-blue);
            }
            .zigzag-card img {
                width: 100%;
                height: 350px;
            }
        }
    </style>
</head>

<body>
    @include('particial.navbar')

    <header class="osis-header text-center">
        <div class="container">
            <h1 class="display-4 fw-bold">Struktur Organisasi OSIS</h1>
            <p class="lead opacity-75">Mengenal lebih dekat para penggerak roda organisasi siswa SMK Bakti Nusantara 666</p>
        </div>
    </header>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="search-box text-center">
                    <form method="GET" class="row g-3 justify-content-center">
                        <div class="col-md-8">
                            <div class="input-group">
                                <span class="input-group-text bg-transparent border-end-0">
                                    <i class="fas fa-history text-muted"></i>
                                </span>
                                <input type="text" name="angkatan" class="form-control border-start-0"
                                       placeholder="Cari Angkatan (Contoh: 2024/2025)" value="{{ request('angkatan') }}">
                                <button class="btn btn-primary px-4" type="submit">Cari</button>
                            </div>
                        </div>
                    </form>
                    @if($angkatanList->isNotEmpty())
                        <div class="mt-3">
                            <small class="text-muted">Riwayat: </small>
                            @foreach($angkatanList as $angk)
                                <a href="{{ route('osis.index', ['angkatan' => $angk]) }}" class="badge rounded-pill bg-light text-primary text-decoration-none me-1 border">
                                    {{ $angk }}
                                </a>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <section class="mt-5 pt-5">
            <div class="text-center mb-5">
                <h2 class="section-title">7 Pengurus Inti</h2>
                <p class="text-muted">Periode Masa Bakti {{ $angkatanAktif }}</p>
            </div>

            <div class="zigzag-container">
                @forelse($intiOsis as $member)
                    <div class="zigzag-card">
                        <img src="{{ $member->photo_url }}" alt="{{ $member->name }}">
                        <div class="info">
                            <span class="badge bg-primary mb-2">{{ strtoupper($member->role) }}</span>
                            <h4>{{ $member->name }}</h4>
                            <p class="mb-0 text-muted">
                                <i class="fas fa-graduation-cap me-2"></i>Angkatan {{ $member->angkatan }}
                            </p>
                            <hr class="w-25">
                            <p class="small italic">"Bekerja dengan hati, mengabdi dengan bukti."</p>
                        </div>
                    </div>
                @empty
                    <div class="alert alert-light text-center shadow-sm border-0 py-5">
                        <i class="fas fa-users-slash fa-3x mb-3 text-muted"></i>
                        <p class="mb-0">Data pengurus inti belum tersedia untuk periode ini.</p>
                    </div>
                @endforelse
            </div>
        </section>

        <section class="mt-5 pb-5">
            <div class="text-center mb-5">
                <h2 class="section-title">Sekretariat Bidang</h2>
                <p class="text-muted">Para koordinator dan pelaksana program kerja unggulan</p>
            </div>

            <div class="row g-4">
                @forelse($sekbid as $member)
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card sekbid-card shadow-sm h-100">
                            <div class="sekbid-img-wrapper">
                                <img src="{{ $member->photo_url }}" alt="{{ $member->name }}">
                                <div class="sekbid-overlay">
                                    <h6 class="mb-0 text-white fw-bold">{{ $member->name }}</h6>
                                    <small class="text-light">{{ $member->nama_sekbid }}</small>
                                </div>
                            </div>
                            <div class="card-body p-3 text-center">
                                <span class="text-primary fw-bold small">{{ strtoupper($member->role) }}</span>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center text-muted">Data Sekbid belum tersedia.</div>
                    </div>
                @endforelse
            </div>
        </section>
    </div>

    @include('particial.footer')

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>