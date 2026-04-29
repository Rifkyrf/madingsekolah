@extends('layouts.landing')

@section('title', 'Visi & Misi - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center min-vh-50">
                <div class="col-lg-8">
                    <h1 class="display-4 fw-bold mb-3" data-aos="fade-right">Visi & Misi</h1>
                    <p class="lead" data-aos="fade-right" data-aos-delay="200">
                        Komitmen kami dalam menciptakan generasi yang unggul di bidang teknologi dan kreativitas
                    </p>
                </div>
                <div class="col-lg-4 text-center" data-aos="fade-left" data-aos-delay="400">
                    <div class="hero-icon">
                        <i class="fas fa-eye fa-5x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Visi Section -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="text-center mb-5" data-aos="fade-up">
                        <div class="icon-box bg-primary text-white rounded-circle mx-auto mb-4">
                            <i class="fas fa-eye fa-2x"></i>
                        </div>
                        <h2 class="display-5 fw-bold text-primary mb-4">VISI</h2>
                    </div>

                    <div class="card border-0 shadow-lg" data-aos="zoom-in" data-aos-delay="200">
                        <div class="card-body p-5 text-center">
                            <blockquote class="blockquote mb-0">
                                <p class="fs-4 text-muted lh-lg">
                                    "Menjadi sekolah menengah kejuruan unggulan yang menghasilkan lulusan berkarakter,
                                    kompeten di bidang teknologi informasi dan industri kreatif, serta mampu bersaing
                                    di era digital global."
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Misi Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="text-center mb-5" data-aos="fade-up">
                        <div class="icon-box bg-success text-white rounded-circle mx-auto mb-4">
                            <i class="fas fa-bullseye fa-2x"></i>
                        </div>
                        <h2 class="display-5 fw-bold text-success mb-4">MISI</h2>
                    </div>

                    <div class="row g-4">
                        @php
                        $misi = [
                            [
                                'icon' => 'fas fa-graduation-cap',
                                'title' => 'Pendidikan Berkualitas',
                                'description' => 'Menyelenggarakan pendidikan kejuruan yang berkualitas dengan kurikulum yang relevan dengan kebutuhan industri dan perkembangan teknologi.'
                            ],
                            [
                                'icon' => 'fas fa-users',
                                'title' => 'Karakter Unggul',
                                'description' => 'Membentuk peserta didik yang berkarakter mulia, berakhlak baik, dan memiliki jiwa kepemimpinan serta kewirausahaan.'
                            ],
                            [
                                'icon' => 'fas fa-laptop-code',
                                'title' => 'Kompetensi Digital',
                                'description' => 'Mengembangkan kompetensi peserta didik di bidang teknologi informasi, desain grafis, animasi, dan pemasaran digital.'
                            ],
                            [
                                'icon' => 'fas fa-handshake',
                                'title' => 'Kemitraan Industri',
                                'description' => 'Menjalin kerjasama yang erat dengan dunia usaha dan industri untuk meningkatkan relevansi pendidikan dengan kebutuhan pasar kerja.'
                            ],
                            [
                                'icon' => 'fas fa-lightbulb',
                                'title' => 'Inovasi Berkelanjutan',
                                'description' => 'Mendorong budaya inovasi dan kreativitas dalam proses pembelajaran serta pengembangan produk-produk digital.'
                            ],
                            [
                                'icon' => 'fas fa-globe',
                                'title' => 'Daya Saing Global',
                                'description' => 'Mempersiapkan lulusan yang mampu bersaing di tingkat nasional dan internasional dengan standar kompetensi yang tinggi.'
                            ]
                        ];
                        @endphp

                        @foreach($misi as $index => $item)
                        <div class="col-lg-6">
                            <div class="card border-0 shadow-sm h-100 misi-card"
                                 data-aos="fade-up"
                                 data-aos-delay="{{ ($index + 1) * 100 }}">
                                <div class="card-body p-4">
                                    <div class="d-flex align-items-start">
                                        <div class="icon-box-sm bg-primary text-white rounded-circle me-3 flex-shrink-0">
                                            <i class="{{ $item['icon'] }}"></i>
                                        </div>
                                        <div>
                                            <h5 class="card-title fw-bold text-primary mb-3">{{ $item['title'] }}</h5>
                                            <p class="card-text text-muted">{{ $item['description'] }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="text-center mb-5" data-aos="fade-up">
                        <h2 class="display-6 fw-bold text-primary mb-4">Nilai-Nilai Kami</h2>
                        <p class="text-muted">Nilai-nilai yang menjadi fondasi dalam setiap aktivitas pendidikan</p>
                    </div>

                    <div class="row g-4">
                        @php
                        $values = [
                            ['name' => 'Integritas', 'color' => 'primary'],
                            ['name' => 'Inovasi', 'color' => 'success'],
                            ['name' => 'Kolaborasi', 'color' => 'info'],
                            ['name' => 'Kreativitas', 'color' => 'warning'],
                            ['name' => 'Keunggulan', 'color' => 'danger']
                        ];
                        @endphp

                        @foreach($values as $index => $value)
                        <div class="col-lg-2 col-md-4 col-6">
                            <div class="text-center value-item"
                                 data-aos="zoom-in"
                                 data-aos-delay="{{ ($index + 1) * 150 }}">
                                <div class="value-circle bg-{{ $value['color'] }} text-white mx-auto mb-3">
                                    {{ substr($value['name'], 0, 1) }}
                                </div>
                                <h6 class="fw-bold">{{ $value['name'] }}</h6>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary text-white py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center" data-aos="fade-up">
                    <h3 class="mb-3">Bergabunglah dengan Kami</h3>
                    <p class="mb-4">Wujudkan impianmu bersama SMK Mading Digital dan jadilah bagian dari generasi digital masa depan</p>
                    <div class="d-flex gap-3 justify-content-center flex-wrap">
                        <a href="{{ route('jurusan.index') }}" class="btn btn-light btn-lg">
                            <i class="fas fa-graduation-cap me-2"></i>Lihat Jurusan
                        </a>
                        <a href="{{ route('sejarah.index') }}" class="btn btn-outline-light btn-lg">
                            <i class="fas fa-history me-2"></i>Sejarah Kami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
.bg-gradient-primary {
    background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-primary-dark, #0056b3) 100%);
}

.min-vh-50 {
    min-height: 50vh;
}

.icon-box {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-box-sm {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.misi-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.misi-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

.value-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.value-item:hover .value-circle {
    transform: scale(1.1);
}

.hero-icon {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}
</style>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script>
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
</script>
@endsection