@extends('layouts.landing')

@section('title', 'Bisnis dan Pemasaran - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <section class="hero-section bg-success text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="badge bg-light text-success fs-6 mb-3">BDP</div>
                    <h1 class="display-4 fw-bold mb-3">Bisnis dan Pemasaran</h1>
                    <p class="lead">Jurusan yang fokus pada strategi pemasaran digital dan pengelolaan bisnis modern.</p>
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
                        <li class="list-group-item"><i class="fas fa-bullhorn text-success me-2"></i>Pemasaran Digital</li>
                        <li class="list-group-item"><i class="fas fa-briefcase text-success me-2"></i>Manajemen Bisnis</li>
                        <li class="list-group-item"><i class="fas fa-share-alt text-success me-2"></i>Media Sosial Marketing</li>
                        <li class="list-group-item"><i class="fas fa-shopping-cart text-success me-2"></i>E-commerce</li>
                        <li class="list-group-item"><i class="fas fa-lightbulb text-success me-2"></i>Kewirausahaan</li>
                    </ul>
                </div>
                <div class="col-lg-6">
                    <h3 class="mb-4">Prospek Kerja</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fas fa-digital-tachograph text-primary me-2"></i>Digital Marketing Specialist</li>
                        <li class="list-group-item"><i class="fas fa-chart-line text-primary me-2"></i>Business Development</li>
                        <li class="list-group-item"><i class="fas fa-users text-primary me-2"></i>Social Media Manager</li>
                        <li class="list-group-item"><i class="fas fa-pen text-primary me-2"></i>Content Creator</li>
                        <li class="list-group-item"><i class="fas fa-store-alt text-primary me-2"></i>E-commerce Manager</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection