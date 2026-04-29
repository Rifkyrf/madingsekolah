@extends('layouts.landing')

@section('title', 'Desain Komunikasi Visual - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <section class="hero-section bg-warning text-dark py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="badge bg-dark text-warning fs-6 mb-3">DKV</div>
                    <h1 class="display-4 fw-bold mb-3">Desain Komunikasi Visual</h1>
                    <p class="lead">Jurusan yang mengembangkan kemampuan desain grafis dan komunikasi visual untuk berbagai media.</p>
                    <a href="{{ route('jurusan.index') }}" class="btn btn-dark btn-lg mt-3">
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
                        <li class="list-group-item"><i class="fas fa-palette text-warning me-2"></i>Desain Grafis</li>
                        <li class="list-group-item"><i class="fas fa-font text-warning me-2"></i>Tipografi</li>
                        <li class="list-group-item"><i class="fas fa-camera text-warning me-2"></i>Fotografi</li>
                        <li class="list-group-item"><i class="fas fa-paint-brush text-warning me-2"></i>Ilustrasi Digital</li>
                        <li class="list-group-item"><i class="fas fa-tag text-warning me-2"></i>Branding</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <h3 class="mb-4">Prospek Kerja</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fas fa-pencil-ruler text-primary me-2"></i>Graphic Designer</li>
                        <li class="list-group-item"><i class="fas fa-desktop text-primary me-2"></i>UI/UX Designer</li>
                        <li class="list-group-item"><i class="fas fa-trademark text-primary me-2"></i>Brand Designer</li>
                        <li class="list-group-item"><i class="fas fa-image text-primary me-2"></i>Illustrator</li>
                        <li class="list-group-item"><i class="fas fa-lightbulb text-primary me-2"></i>Creative Director</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection