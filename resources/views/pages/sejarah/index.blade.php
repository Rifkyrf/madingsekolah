@extends('layouts.landing')

@section('title', 'Sejarah - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h1 class="display-4 fw-bold mb-3">Sejarah Sekolah</h1>
                    <p class="lead">Perjalanan panjang SMK Mading Digital dalam mengembangkan pendidikan teknologi dan kreativitas</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-5">
        <div class="container">
            <div class="timeline">
                @foreach($sejarahs as $sejarah)
                <div class="timeline-item {{ $loop->even ? 'timeline-item-right' : 'timeline-item-left' }}" 
                     data-aos="{{ $loop->even ? 'fade-left' : 'fade-right' }}" 
                     data-aos-delay="{{ $loop->index * 200 }}">
                    <div class="timeline-marker">
                        <div class="timeline-year">{{ $sejarah->tahun }}</div>
                    </div>
                    <div class="timeline-content">
                        <div class="card border-0 shadow-sm">
                            @if($sejarah->foto)
                            <img src="{{ asset('storage/' . $sejarah->foto) }}" 
                                 class="card-img-top" alt="{{ $sejarah->judul }}" 
                                 style="height: 200px; object-fit: cover;">
                            @endif
                            <div class="card-body">
                                <h4 class="card-title text-primary fw-bold">{{ $sejarah->judul }}</h4>
                                <p class="card-text text-muted">{{ $sejarah->deskripsi }}</p>
                                <small class="text-muted">
                                    <i class="fas fa-calendar me-1"></i>{{ $sejarah->tahun }}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-light py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <h3 class="mb-3">Ingin Tahu Lebih Lanjut?</h3>
                    <p class="text-muted mb-4">Pelajari visi dan misi kami untuk masa depan pendidikan yang lebih baik</p>
                    <a href="{{ route('visi-misi') }}" class="btn btn-primary btn-lg">
                        <i class="fas fa-eye me-2"></i>Lihat Visi & Misi
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
.hero-section {
    background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-primary-dark, #0056b3) 100%);
}

.timeline {
    position: relative;
    padding: 2rem 0;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, var(--bs-primary), var(--bs-secondary));
    transform: translateX(-50%);
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    width: 50%;
}

.timeline-item-left {
    left: 0;
    padding-right: 3rem;
}

.timeline-item-right {
    left: 50%;
    padding-left: 3rem;
}

.timeline-marker {
    position: absolute;
    top: 20px;
    width: 80px;
    height: 80px;
    background: var(--bs-primary);
    border: 4px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10;
}

.timeline-item-left .timeline-marker {
    right: -40px;
}

.timeline-item-right .timeline-marker {
    left: -40px;
}

.timeline-year {
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
}

.timeline-content {
    position: relative;
}

.timeline-content::before {
    content: '';
    position: absolute;
    top: 30px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
}

.timeline-item-left .timeline-content::before {
    right: -20px;
    border-left-color: white;
}

.timeline-item-right .timeline-content::before {
    left: -20px;
    border-right-color: white;
}

.timeline-item .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-item .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .timeline::before {
        left: 30px;
    }
    
    .timeline-item {
        width: 100%;
        left: 0 !important;
        padding-left: 4rem !important;
        padding-right: 1rem !important;
    }
    
    .timeline-marker {
        left: 0 !important;
        right: auto !important;
    }
    
    .timeline-content::before {
        left: -20px !important;
        right: auto !important;
        border-right-color: white !important;
        border-left-color: transparent !important;
    }
}
</style>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script>
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
</script>
@endsection