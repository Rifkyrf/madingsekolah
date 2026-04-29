@extends('layouts.app')

@section('title', 'Sejarah - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <section class="hero-section bg-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h1 class="display-4 fw-bold mb-3">Sejarah Sekolah</h1>
                    <p class="lead">Perjalanan panjang SMK Mading Digital dalam mengembangkan pendidikan teknologi dan kreativitas</p>
                    <a href="{{ route('sejarah.index') }}" class="btn btn-light btn-lg mt-3">
                        <i class="fas fa-history me-2"></i>Lihat Timeline Lengkap
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <div class="display-1 text-primary mb-3">2010</div>
                            <h5>Pendirian Sekolah</h5>
                            <p class="text-muted">SMK Mading Digital didirikan dengan visi menjadi sekolah unggulan dalam bidang teknologi dan kreativitas.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <div class="display-1 text-success mb-3">2015</div>
                            <h5>Ekspansi Jurusan</h5>
                            <p class="text-muted">Menambah jurusan DKV dan Animasi untuk mengembangkan industri kreatif digital.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <div class="display-1 text-warning mb-3">2023</div>
                            <h5>Sekolah Unggulan</h5>
                            <p class="text-muted">Meraih status sekolah unggulan dengan prestasi siswa di berbagai kompetisi nasional.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection