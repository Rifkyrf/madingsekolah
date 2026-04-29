<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event OSIS - SMK Bakti Nusantara 666</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="{{ asset('css/landing.css') }}" rel="stylesheet">

    <style>
        .event-header {
            background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue));
            padding: 100px 0 60px;
            color: white;
            text-align: center;
            margin-bottom: 0;
        }

        .blink { animation: blink 1.5s infinite; }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
        }

        .event-card {
            border: none;
            border-radius: var(--card-radius);
            transition: var(--transition);
            overflow: hidden;
            background: white;
        }

        .event-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-hover);
        }

        .event-details i {
            width: 25px;
            color: var(--primary-blue);
        }

        .empty-state i {
            opacity: 0.3;
            display: block;
            margin-bottom: 20px;
        }

        .event-img-container {
            height: 180px;
            overflow: hidden;
            background: #f0f0f0;
            position: relative;
        }
    </style>
</head>

<body>
    @include('particial.navbar')

    <header class="event-header">
        <div class="container">
            <h1 class="display-4 fw-bold mb-3">
                <i class="fas fa-calendar-alt me-2"></i> Event OSIS
            </h1>
            <p class="lead opacity-75">Kegiatan dan acara seru dari OSIS SMK Bakti Nusantara 666</p>
            <div class="mx-auto mt-4" style="height: 4px; width: 80px; background: var(--accent-blue); border-radius: 2px;"></div>
        </div>
    </header>

    <section class="content-section bg-light py-5">
        <div class="container">
            @if($events->count() > 0)
                <div class="row g-4">
                    @foreach($events as $event)
                        @php
                            $isOngoing = $event->isOngoing();
                            $cardClass = $isOngoing ? 'border-top border-4 border-primary' : '';
                            $badgeClass = $isOngoing ? 'bg-primary' : 'bg-secondary';
                            $statusText = $isOngoing ? 'Berlangsung' : 'Mendatang';

                            // HAPUS pemanggilan file lokal yang tidak ada
                            // Gunakan Accessor photo_url dari model, jika kosong langsung ke placeholder internet
                            $eventImg = $event->photo_url ?? 'https://placehold.co/600x400?text=Event+BN666';
                        @endphp

                        <div class="col-lg-4 col-md-6">
                            <div class="card h-100 event-card shadow-sm {{ $cardClass }}">
                                <div class="event-img-container">
                                    <img src="{{ $eventImg }}"
                                         class="w-100 h-100 object-fit-cover"
                                         alt="{{ $event->title }}"
                                         loading="lazy">

                                    @if($isOngoing)
                                        <div class="position-absolute top-0 start-0 m-2">
                                            <span class="badge bg-danger shadow-sm blink">LIVE</span>
                                        </div>
                                    @endif
                                </div>

                                <div class="card-body p-4">
                                    <div class="d-flex justify-content-between align-items-start mb-3">
                                        <h5 class="card-title fw-bold text-primary mb-0">
                                            {{ Str::limit($event->title, 40) }}
                                        </h5>
                                        <span class="badge {{ $badgeClass }} rounded-pill">
                                            {{ $statusText }}
                                        </span>
                                    </div>

                                    <p class="card-text text-muted mb-4 small">
                                        {{ Str::limit($event->description, 100) }}
                                    </p>

                                    <hr class="opacity-10">

                                    <div class="event-details mt-3">
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-calendar-check"></i>
                                            <span class="text-dark fw-500 small">{{ $event->event_date->format('d F Y') }}</span>
                                        </div>
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-user-circle"></i>
                                            <span class="text-muted small">Oleh: <strong>{{ $event->creator->name ?? 'OSIS' }}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer bg-white border-0 p-4 pt-0">
                                    {{-- Sesuaikan tombol dengan format trigger modal --}}
                                    <button type="button"
                                        class="btn btn-primary w-100 rounded-pill fw-semibold"
                                        data-bs-toggle="modal"
                                        data-bs-target="#eventDetailModal"
                                        data-title="{{ $event->title }}"
                                        data-description="{{ $event->description }}"
                                        data-date="{{ $event->event_date->format('d F Y') }}"
                                        data-creator="{{ $event->creator->name ?? 'OSIS' }}"
                                        data-image="{{ $eventImg }}"
                                        data-status="{{ $statusText }}"
                                        data-badge="{{ $badgeClass }}">
                                        Lihat Detail Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                @if(method_exists($events, 'links') && $events->hasPages())
                    <div class="d-flex justify-content-center mt-5">
                        {{ $events->links() }}
                    </div>
                @endif

            @else
                <div class="text-center py-5 empty-state">
                    <i class="fas fa-calendar-times fa-4x text-muted"></i>
                    <h4 class="text-dark fw-bold mt-4">Belum Ada Event</h4>
                    <p class="text-muted mx-auto mb-4" style="max-width: 400px; font-size: 0.95rem;">
                        Saat ini belum ada jadwal kegiatan OSIS. Pantau terus halaman ini untuk informasi kegiatan mendatang!
                    </p>
                    <a href="{{ route('home') }}" class="btn btn-outline-primary btn-sm px-4 rounded-pill">
                        <i class="fas fa-arrow-left me-2"></i>Kembali ke Beranda
                    </a>
                </div>
            @endif
        </div>
    </section>

    @include('particial.modal-event')
    @include('particial.footer')

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('javascript/landing.js') }}"></script>
</body>
</html>