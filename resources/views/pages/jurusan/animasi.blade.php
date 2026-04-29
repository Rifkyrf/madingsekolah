@extends('layouts.landing')

@section('title', 'Animasi - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <section class="hero-section bg-danger text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="badge bg-light text-danger fs-6 mb-3">ANM</div>
                    <h1 class="display-4 fw-bold mb-3">Animasi</h1>
                    <p class="lead">Jurusan yang fokus pada pembuatan animasi 2D dan 3D untuk film, game, dan media digital.</p>
                    <a href="{{ route('jurusan.index') }}" class="btn btn-light btn-lg mt-3">
                        <i class="fas fa-arrow-left me-2"></i>Lihat Semua Jurusan
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6">
                    <h3 class="mb-4">Mata Pelajaran</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fas fa-play text-danger me-2"></i>Animasi 2D</li>
                        <li class="list-group-item"><i class="fas fa-cube text-danger me-2"></i>Animasi 3D</li>
                        <li class="list-group-item"><i class="fas fa-video text-danger me-2"></i>Motion Graphics</li>
                        <li class="list-group-item"><i class="fas fa-user text-danger me-2"></i>Character Design</li>
                        <li class="list-group-item"><i class="fas fa-magic text-danger me-2"></i>Visual Effects</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <h3 class="mb-4">Prospek Kerja</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fas fa-film text-primary me-2"></i>2D/3D Animator</li>
                        <li class="list-group-item"><i class="fas fa-play-circle text-primary me-2"></i>Motion Graphics Designer</li>
                        <li class="list-group-item"><i class="fas fa-gamepad text-primary me-2"></i>Game Artist</li>
                        <li class="list-group-item"><i class="fas fa-wand-magic-sparkles text-primary me-2"></i>VFX Artist</li>
                        <li class="list-group-item"><i class="fas fa-user-ninja text-primary me-2"></i>Character Designer</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection