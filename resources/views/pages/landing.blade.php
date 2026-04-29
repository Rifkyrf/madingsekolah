<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMK Bakti Nusantara 666 - Mading & Karya Siswa</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <!-- Google Fonts: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    {{-- Css link --}}
    <link href="{{ asset('css/landing.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body class="d-flex flex-column min-vh-100">
    <!-- Navbar -->
@include('particial.navbar')

    <main class="flex-grow-1">

    <!-- Hero Section dengan Foto Sekolah -->
    <section class="sekolah-hero">
        <div class="hero-overlay"></div>
        <div class="container">
            <div class="row align-items-center min-vh-75">
                <div class="col-lg-6">
                    <h1 class="hero-title">SMK Bakti Nusantara 666</h1>
                    <p class="hero-description">
                        Sekolah Menengah Kejuruan yang berkomitmen untuk mencetak generasi unggul,
                        kreatif, dan berkarakter. Dengan berbagai program keahlian yang relevan
                        dengan kebutuhan industri, kami siap membekali siswa dengan keterampilan
                        yang dibutuhkan di era digital.
                    </p>

                </div>
                <div class="col-lg-6">
                    <div class="hero-image-container">
                        @if(file_exists(public_path('images/sekolah_hero.png')))
                            <img src="{{ asset('images/sekolah_hero.png') }}" alt="SMK Bakti Nusantara 666"
                                class="hero-image">
                        @elseif(file_exists(public_path('images/sekolah-hero.jpg')))
                            <img src="{{ asset('images/sekolah-hero.jpg') }}" alt="SMK Bakti Nusantara 666"
                                class="hero-image" loading="lazy">
                        @else
                            <div class="placeholder-hero">
                                <i class="fas fa-school fa-5x mb-3"></i>
                                <p>Foto SMK Bakti Nusantara 666</p>
                                <small class="text-muted">Letakkan foto sekolah di: public/images/sekolah_hero.png</small>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ========== ARTIKEL POPULER ========== -->

    <section class="popular-articles-section">
        <div class="container">
            <div class="section-header text-center">
                <h2><i class="fas fa-star me-2"></i>Artikel Populer</h2>
                <p class="section-subtitle">Karya terbaik dan paling banyak disukai oleh komunitas SMK Bakti Nusantara 666</p>
            </div>

            <div class="row g-4">
                @forelse($popularWorks as $work)
                    @include('components.work-card', ['work' => $work])
                @empty
                <div class="col-12 text-center text-muted py-5">
                    <i class="fas fa-star fa-3x mb-3 text-secondary opacity-50"></i>
                    <p>Belum ada artikel populer saat ini.</p>
                </div>
                @endforelse
            </div>

            <div class="text-center mt-5">
                <a href="{{ route('popular') }}" class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-ellipsis-h me-1"></i> Lihat Semua Artikel Populer
                </a>
            </div>
        </div>
    </section>

    <!-- ========== END ARTIKEL POPULER ========== -->

    @if($upcomingEvents->count() > 0)
    <section class="events-section bg-light py-5">
        <div class="container">
            <div class="section-header text-center mb-5">
                <h2 class="fw-bold"><i class="fas fa-calendar-check text-primary me-2"></i>Agenda Kegiatan OSIS</h2>
                <p class="section-subtitle text-muted">Ayo berpartisipasi dan ramaikan setiap kegiatan seru di SMK Bakti Nusantara 666!</p>
            </div>

            <div class="row g-4">
                @foreach($upcomingEvents as $event)
                @php
                    $isOngoing = $event->isOngoing();
                    $badgeClass = $isOngoing ? 'bg-danger' : 'bg-primary';
                    $statusText = $isOngoing ? 'Sedang Berlangsung' : 'Mendatang';

                    // Gunakan Accessor photo_url dari model, jika null lari ke default
                    $eventImg = $event->photo_url ;
                @endphp

                <div class="col-lg-4 col-md-6">
                    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden position-relative">
                        <div class="event-img-wrapper" style="height: 200px; overflow: hidden; background: #e9ecef;">
                            {{-- Gunakan $eventImg yang sudah kita set di atas --}}
                            <img src="{{ $eventImg }}"
                                 alt="{{ $event->title }}"
                                 class="w-100 h-100 object-fit-cover"
                                 loading="lazy"
                                 onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Gambar+Event';">

                            <div class="position-absolute top-0 end-0 m-3">
                                <span class="badge {{ $badgeClass }} shadow-sm px-3 py-2">
                                    @if($isOngoing) <i class="fas fa-circle me-1 blink"></i> @endif
                                    {{ $statusText }}
                                </span>
                            </div>
                        </div>

                        <div class="card-body p-4">
                            <h5 class="card-title fw-bold mb-3 text-dark">
                                {{ Str::limit($event->title, 45) }}
                            </h5>
                            <p class="card-text text-muted small mb-4">
                                {{ Str::limit($event->description, 90) }}
                            </p>

                            <div class="event-info-grid small border-top pt-3">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fas fa-calendar-day text-primary me-3" style="width: 20px;"></i>
                                    <span class="text-secondary">{{ $event->event_date->format('d M Y') }}</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="fas fa-user-circle text-primary me-3" style="width: 20px;"></i>
                                    <span class="text-secondary">Oleh: <strong>{{ $event->creator->name ?? 'OSIS' }}</strong></span>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer bg-white border-0 p-4 pt-0">
                            <button type="button"
                                class="btn btn-primary w-100 rounded-3 fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#eventDetailModal"
                                data-title="{{ $event->title }}"
                                data-description="{{ $event->description }}"
                                data-date="{{ $event->event_date->format('d M Y') }}"
                                data-creator="{{ $event->creator->name ?? 'OSIS' }}"
                                data-image="{{ $eventImg }}" {{-- Data image diambil dari variabel $eventImg --}}
                                data-status="{{ $statusText }}"
                                data-badge="{{ $badgeClass }}">
                                Lihat Detail Event <i class="fas fa-arrow-right ms-2 small"></i>
                            </button>
                        </div>
                    </div>
                </div>
            @endforeach
            </div>

            <div class="text-center mt-5">
                <a href="{{ route('events.upcoming') }}" class="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm">
                    <i class="fas fa-list-ul me-2"></i>Lihat Semua Agenda
                </a>
            </div>
        </div>
    </section>
    @endif

    <!-- ========== END EVENT OSIS ========== -->

    <!-- Filter Buttons Modern -->
    <section class="filter-section">
        <div class="container">
            <div class="filter-container d-flex flex-wrap justify-content-start gap-2">
                <a href="?type=all"
                    class="filter-btn {{ request('type') == 'all' || !request('type') ? 'active' : '' }}">
                    <i class="fas fa-th-large me-2"></i>Semua
                </a>
                <a href="?type=mading" class="filter-btn {{ request('type') == 'mading' ? 'active' : '' }}">
                    <i class="fas fa-newspaper me-2"></i>Mading Digital
                </a>
                <a href="?type=karya" class="filter-btn {{ request('type') == 'karya' ? 'active' : '' }}">
                    <i class="fas fa-palette me-2"></i>Karya Siswa
                </a>
                <a href="?type=mingguan" class="filter-btn {{ request('type') == 'mingguan' ? 'active' : '' }}">
                    <i class="fas fa-calendar-week me-2"></i>Konten Mingguan
                </a>
                <a href="?type=harian" class="filter-btn {{ request('type') == 'harian' ? 'active' : '' }}">
                    <i class="fas fa-calendar-day me-2"></i>Konten Harian
                </a>
                <a href="?type=prestasi" class="filter-btn {{ request('type') == 'prestasi' ? 'active' : '' }}">
                    <i class="fas fa-trophy me-2"></i>Prestasi Siswa
                </a>
                <a href="?type=opini" class="filter-btn {{ request('type') == 'opini' ? 'active' : '' }}">
                    <i class="fas fa-comment me-2"></i>Opini
                </a>
                <a href="?type=event" class="filter-btn {{ request('type') == 'event' ? 'active' : '' }}">
                    <i class="fas fa-calendar-alt me-2"></i>Event
                </a>
            </div>
        </div>
    </section>

    <!-- Content -->
    <section class="content-section">
        <div class="container">
            <div class="section-header">
                <h2>
                    @if(request('type') == 'mading')
                        <i class="fas fa-newspaper me-2"></i>Mading Digital
                    @elseif(request('type') == 'karya')
                        <i class="fas fa-palette me-2"></i>Karya Siswa
                    @elseif(request('type') == 'mingguan')
                        <i class="fas fa-calendar-week me-2"></i>Konten Mingguan
                    @elseif(request('type') == 'harian')
                        <i class="fas fa-calendar-day me-2"></i>Konten Harian
                    @elseif(request('type') == 'prestasi')
                        <i class="fas fa-trophy me-2"></i>Prestasi Siswa
                    @elseif(request('type') == 'opini')
                        <i class="fas fa-comment me-2"></i>Opini
                    @elseif(request('type') == 'event')
                        <i class="fas fa-calendar-alt me-2"></i>Event
                    @else
                        <i class="fas fa-th-large me-2"></i>Semua Konten
                    @endif
                </h2>
                <p class="section-subtitle">Jelajahi berbagai karya dan informasi dari siswa SMK Bakti Nusantara 666</p>
            </div>

            <div class="row g-4">
                @forelse($works as $index => $work)
                    @php
                        $show = false;
                        $currentType = request('type');

                        if (!$currentType || $currentType === 'all') {
                            $show = true;
                        } elseif ($currentType === 'karya' && $work->type === 'karya') {
                            $show = true;
                        } elseif ($currentType === 'mading' && $work->type === 'mading') {
                            $show = true;
                        } elseif ($currentType === 'harian' && $work->type === 'harian') {
                            $show = true;
                        } elseif ($currentType === 'mingguan' && $work->type === 'mingguan') {
                            $show = true;
                        } elseif ($currentType === 'prestasi' && $work->type === 'prestasi') {
                            $show = true;
                        } elseif ($currentType === 'opini' && $work->type === 'opini') {
                            $show = true;
                        } elseif ($currentType === 'event' && $work->type === 'event') {
                            $show = true;
                        }
                    @endphp

                    @if($show)
                        @include('components.work-card', ['work' => $work])
                    @endif
                @empty
                    <div class="col-12 text-center text-muted py-5">
                        <i class="fas fa-inbox fa-3x mb-3"></i>
                        <p>Tidak ada konten yang tersedia.</p>
                    </div>
                @endforelse
            </div>

            <!-- Pagination -->
            @if($works->hasPages())
                <div class="d-flex justify-content-center mt-5">
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            {{-- Previous Page Link --}}
                            @if($works->onFirstPage())
                                <li class="page-item disabled">
                                    <span class="page-link"><i class="fas fa-chevron-left"></i></span>
                                </li>
                            @else
                                <li class="page-item">
                                    <a class="page-link"
                                        href="{{ $works->previousPageUrl() }}{{ request()->getQueryString() ? '&' . request()->getQueryString() : '' }}"
                                        rel="prev">
                                        <i class="fas fa-chevron-left"></i>
                                    </a>
                                </li>
                            @endif

                            {{-- Pagination Elements --}}
                            @foreach($works->links()->elements[0] as $page => $url)
                                @if($page == $works->currentPage())
                                    <li class="page-item active">
                                        <span class="page-link">{{ $page }}</span>
                                    </li>
                                @else
                                    <li class="page-item">
                                        <a class="page-link"
                                            href="{{ $url }}{{ request()->getQueryString() ? '&' . request()->getQueryString() : '' }}">{{ $page }}</a>
                                    </li>
                                @endif
                            @endforeach

                            {{-- Next Page Link --}}
                            @if($works->hasMorePages())
                                <li class="page-item">
                                    <a class="page-link"
                                        href="{{ $works->nextPageUrl() }}{{ request()->getQueryString() ? '&' . request()->getQueryString() : '' }}"
                                        rel="next">
                                        <i class="fas fa-chevron-right"></i>
                                    </a>
                                </li>
                            @else
                                <li class="page-item disabled">
                                    <span class="page-link"><i class="fas fa-chevron-right"></i></span>
                                </li>
                            @endif
                        </ul>
                    </nav>
                </div>
            @endif
        </div>
    </section>
    <div class="modal fade" id="workModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Karya</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="modalWorkBody">
                    <div class="text-center p-5">
                        <div class="spinner-border text-primary"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('particial.modal-event')

    </main>
    @include('particial.footer')



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('javascript/landing.js') }}"></script>

    <style>
    .blink {
        animation: blink 1.5s infinite;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.3; }
    }

    .events-section .card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .events-section .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
    }

    .badge-sm {
        font-size: 0.7rem;
    }

    .event-details i {
        width: 16px;
        text-align: center;
    }
    </style>
</body>

</html>