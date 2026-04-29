@extends('layouts.app')

@section('title', $jurusan->nama . ' - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <!-- Hero Section -->
    <section class="hero-section position-relative">
        <div class="hero-bg" style="background-image: url('{{ $jurusan->foto ? asset('storage/' . $jurusan->foto) : asset('images/default-jurusan.jpg') }}')"></div>
        <div class="hero-overlay"></div>
        <div class="container position-relative">
            <div class="row align-items-center min-vh-50">
                <div class="col-lg-8">
                    <nav aria-label="breadcrumb" class="mb-3">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-white-50">Home</a></li>
                            <li class="breadcrumb-item"><a href="{{ route('jurusan.index') }}" class="text-white-50">Jurusan</a></li>
                            <li class="breadcrumb-item active text-white">{{ $jurusan->nama }}</li>
                        </ol>
                    </nav>
                    <div class="badge bg-primary fs-6 mb-3">{{ $jurusan->kode }}</div>
                    <h1 class="display-4 fw-bold text-white mb-3">{{ $jurusan->nama }}</h1>
                    <p class="lead text-white-75">{{ $jurusan->deskripsi }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Content Section -->
    <section class="py-5">
        <div class="container">
            <div class="row g-5">
                <!-- Mata Pelajaran -->
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm h-100" data-aos="fade-right">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center mb-4">
                                <div class="icon-box bg-primary text-white rounded-circle me-3">
                                    <i class="fas fa-book"></i>
                                </div>
                                <h3 class="mb-0">Mata Pelajaran</h3>
                            </div>
                            @if($jurusan->mata_pelajaran && is_array($jurusan->mata_pelajaran))
                            <div class="row g-2">
                                @foreach($jurusan->mata_pelajaran as $mapel)
                                <div class="col-12">
                                    <div class="d-flex align-items-center p-3 bg-light rounded">
                                        <i class="fas fa-check-circle text-success me-3"></i>
                                        <span>{{ $mapel }}</span>
                                    </div>
                                </div>
                                @endforeach
                            </div>
                            @endif
                        </div>
                    </div>
                </div>

                <!-- Prospek Kerja -->
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm h-100" data-aos="fade-left">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center mb-4">
                                <div class="icon-box bg-success text-white rounded-circle me-3">
                                    <i class="fas fa-briefcase"></i>
                                </div>
                                <h3 class="mb-0">Prospek Kerja</h3>
                            </div>
                            @if($jurusan->prospek_kerja && is_array($jurusan->prospek_kerja))
                            <div class="row g-2">
                                @foreach($jurusan->prospek_kerja as $prospek)
                                <div class="col-12">
                                    <div class="d-flex align-items-center p-3 bg-light rounded">
                                        <i class="fas fa-arrow-right text-primary me-3"></i>
                                        <span>{{ $prospek }}</span>
                                    </div>
                                </div>
                                @endforeach
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="row mt-5">
                <div class="col-12">
                    <div class="card bg-primary text-white border-0" data-aos="fade-up">
                        <div class="card-body text-center p-5">
                            <h3 class="mb-3">Tertarik dengan {{ $jurusan->nama }}?</h3>
                            <p class="mb-4">Bergabunglah dengan kami dan wujudkan impianmu di bidang {{ strtolower($jurusan->nama) }}</p>
                            <div class="d-flex gap-3 justify-content-center flex-wrap">
                                <a href="{{ route('jurusan.index') }}" class="btn btn-light btn-lg">
                                    <i class="fas fa-arrow-left me-2"></i>Lihat Jurusan Lain
                                </a>
                                <a href="#" class="btn btn-outline-light btn-lg">
                                    <i class="fas fa-phone me-2"></i>Hubungi Kami
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
.hero-section {
    min-height: 50vh;
    position: relative;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
}

.min-vh-50 {
    min-height: 50vh;
}

.icon-box {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.text-white-75 {
    color: rgba(255,255,255,0.75) !important;
}

.breadcrumb-item + .breadcrumb-item::before {
    color: rgba(255,255,255,0.5);
}
</style>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script>
    AOS.init({
        duration: 800,
        once: true
    });
</script>
@endsection