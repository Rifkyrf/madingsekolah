@extends('layouts.landing')

@section('title', 'Pengembangan Perangkat Lunak dan Gim (PPLG)')

@section('content')
<div class="hero-section bg-primary text-white py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6 fade-in-left">
                <h1 class="display-4 fw-bold mb-4">Pengembangan Perangkat Lunak dan Gim</h1>
                <p class="lead mb-4">Jurusan yang mempersiapkan siswa menjadi programmer dan developer handal dengan kemampuan merancang, mengembangkan, dan mengelola sistem perangkat lunak serta game development.</p>
                <div class="d-flex gap-3">
                    <span class="badge bg-light text-primary px-3 py-2">Programming</span>
                    <span class="badge bg-light text-primary px-3 py-2">Web Development</span>
                    <span class="badge bg-light text-primary px-3 py-2">Game Development</span>
                </div>
            </div>
            <div class="col-lg-6 text-center fade-in-right">
                <img src="{{ asset('images/jurusan/pplg.jpg') }}" alt="PPLG" class="img-fluid rounded shadow"
                     onerror="this.src='https://via.placeholder.com/500x300/007bff/ffffff?text=PPLG'">
            </div>
        </div>
    </div>
</div>

<div class="container py-5">
    <div class="row">
        <div class="col-lg-8">
            <div class="card shadow-sm mb-4 fade-in-up">
                <div class="card-body">
                    <h3 class="text-primary mb-4">Tentang Jurusan PPLG</h3>
                    <p>Pengembangan Perangkat Lunak dan Gim (PPLG) adalah jurusan yang fokus pada pengembangan aplikasi, sistem perangkat lunak, dan game development. Siswa akan mempelajari berbagai bahasa pemrograman, framework modern, dan teknologi game development.</p>

                    <h5 class="mt-4 mb-3">Mata Pelajaran Utama:</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Pemrograman Dasar</li>
                                <li><i class="fas fa-check text-success me-2"></i>Basis Data</li>
                                <li><i class="fas fa-check text-success me-2"></i>Pemrograman Web</li>
                                <li><i class="fas fa-check text-success me-2"></i>Pemrograman Mobile</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Game Development</li>
                                <li><i class="fas fa-check text-success me-2"></i>Sistem Operasi</li>
                                <li><i class="fas fa-check text-success me-2"></i>Jaringan Komputer</li>
                                <li><i class="fas fa-check text-success me-2"></i>UI/UX Design</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm fade-in-up">
                <div class="card-body">
                    <h3 class="text-primary mb-4">Prospek Karir</h3>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-primary text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-code"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Software Developer</h6>
                                    <small class="text-muted">Mengembangkan aplikasi desktop dan web</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-success text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-gamepad"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Game Developer</h6>
                                    <small class="text-muted">Membuat game untuk berbagai platform</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-warning text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Mobile Developer</h6>
                                    <small class="text-muted">Membuat aplikasi Android dan iOS</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-info text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-globe"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Web Developer</h6>
                                    <small class="text-muted">Membangun website dan sistem web</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card shadow-sm mb-4 fade-in-up">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Info Jurusan</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <strong>Lama Studi:</strong><br>
                        <span class="text-muted">3 Tahun</span>
                    </div>
                    <div class="mb-3">
                        <strong>Kapasitas:</strong><br>
                        <span class="text-muted">36 Siswa per Kelas</span>
                    </div>
                    <div class="mb-3">
                        <strong>Akreditasi:</strong><br>
                        <span class="badge bg-success">A</span>
                    </div>
                    <div class="mb-3">
                        <strong>Fasilitas:</strong><br>
                        <small class="text-muted">Lab Komputer, Lab Programming, Lab Game Development</small>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm fade-in-up">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0"><i class="fas fa-tools me-2"></i>Tools & Software</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-primary">Visual Studio Code</span>
                        <span class="badge bg-secondary">PHP</span>
                        <span class="badge bg-warning text-dark">JavaScript</span>
                        <span class="badge bg-info">MySQL</span>
                        <span class="badge bg-success">Laravel</span>
                        <span class="badge bg-danger">Unity</span>
                        <span class="badge bg-dark">Git</span>
                        <span class="badge bg-primary">Android Studio</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.fade-in-left { animation: fadeInLeft 1s ease-out; }
.fade-in-right { animation: fadeInRight 1s ease-out; }
.fade-in-up { animation: fadeInUp 0.8s ease-out; }

@keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
@endsection