@extends('layouts.app')

@section('content')
<div class="container py-4">
    <!-- Header -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold text-primary mb-1">
                        <i class="fas fa-newspaper me-2"></i>Dashboard Mading
                    </h2>
                    <p class="text-muted mb-0">Selamat datang, {{ auth()->user()->name }}!</p>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('mading.canvas') }}" class="btn btn-primary">
                        <i class="fas fa-plus me-1"></i>Buat Mading
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
        <div class="col-lg-3 col-md-6">
            <div class="card bg-primary text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Total Mading</h6>
                            <h3 class="mb-0">{{ $stats['total_madings'] }}</h3>
                        </div>
                        <i class="fas fa-newspaper fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card bg-success text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Published</h6>
                            <h3 class="mb-0">{{ $stats['published_madings'] }}</h3>
                        </div>
                        <i class="fas fa-check-circle fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card bg-warning text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Draft</h6>
                            <h3 class="mb-0">{{ $stats['draft_madings'] }}</h3>
                        </div>
                        <i class="fas fa-edit fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card bg-info text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Mading Saya</h6>
                            <h3 class="mb-0">{{ $stats['my_madings'] }}</h3>
                        </div>
                        <i class="fas fa-user-edit fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <!-- Mading Saya -->
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                            <i class="fas fa-user-edit me-2"></i>Mading Saya
                        </h5>
                        <a href="{{ route('mading.index') }}" class="btn btn-outline-primary btn-sm">
                            Lihat Semua
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    @forelse($myMadings as $mading)
                        <div class="d-flex align-items-start mb-3 {{ !$loop->last ? 'border-bottom pb-3' : '' }}">
                            <div class="flex-shrink-0 me-3">
                                @if($mading->thumbnail_path)
                                    <img src="{{ asset('storage/' . $mading->thumbnail_path) }}"
                                         class="rounded"
                                         style="width: 50px; height: 50px; object-fit: cover;"
                                         alt="{{ $mading->title }}">
                                @else
                                    <div class="bg-primary text-white rounded d-flex align-items-center justify-content-center"
                                         style="width: 50px; height: 50px;">
                                        <i class="fas fa-newspaper"></i>
                                    </div>
                                @endif
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-1">{{ $mading->title }}</h6>
                                <p class="text-muted small mb-1">{{ Str::limit($mading->description, 60) }}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        <i class="fas fa-clock me-1"></i>{{ $mading->created_at->diffForHumans() }}
                                    </small>
                                    <span class="badge {{ $mading->status === 'published' ? 'bg-success' : 'bg-warning' }}">
                                        {{ ucfirst($mading->status) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-4">
                            <i class="fas fa-newspaper text-muted fa-2x mb-2"></i>
                            <p class="text-muted mb-0">Belum ada mading</p>
                            <a href="{{ route('mading.canvas') }}" class="btn btn-primary btn-sm mt-2">
                                <i class="fas fa-plus me-1"></i>Buat Mading Pertama
                            </a>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>

        <!-- Mading Terbaru -->
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                            <i class="fas fa-history me-2"></i>Mading Terbaru
                        </h5>
                        <a href="{{ route('mading.index') }}" class="btn btn-outline-primary btn-sm">
                            Lihat Semua
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    @forelse($recentMadings as $mading)
                        <div class="d-flex align-items-start mb-3 {{ !$loop->last ? 'border-bottom pb-3' : '' }}">
                            <div class="flex-shrink-0 me-3">
                                @if($mading->thumbnail_path)
                                    <img src="{{ asset('storage/' . $mading->thumbnail_path) }}"
                                         class="rounded"
                                         style="width: 50px; height: 50px; object-fit: cover;"
                                         alt="{{ $mading->title }}">
                                @else
                                    <div class="bg-secondary text-white rounded d-flex align-items-center justify-content-center"
                                         style="width: 50px; height: 50px;">
                                        <i class="fas fa-newspaper"></i>
                                    </div>
                                @endif
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-1">{{ $mading->title }}</h6>
                                <p class="text-muted small mb-1">{{ Str::limit($mading->description, 60) }}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        <i class="fas fa-user me-1"></i>{{ $mading->user->name }}
                                    </small>
                                    <span class="badge {{ $mading->status === 'published' ? 'bg-success' : 'bg-warning' }}">
                                        {{ ucfirst($mading->status) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-4">
                            <i class="fas fa-newspaper text-muted fa-2x mb-2"></i>
                            <p class="text-muted mb-0">Belum ada mading</p>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-white">
                    <h5 class="mb-0">
                        <i class="fas fa-bolt me-2"></i>Aksi Cepat
                    </h5>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <a href="{{ route('mading.canvas') }}" class="btn btn-outline-primary w-100">
                                <i class="fas fa-plus-circle me-2"></i>Buat Mading Baru
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="{{ route('mading.index') }}" class="btn btn-outline-info w-100">
                                <i class="fas fa-list me-2"></i>Lihat Semua Mading
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="{{ route('upload.page') }}" class="btn btn-outline-success w-100">
                                <i class="fas fa-upload me-2"></i>Upload Karya
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="{{ route('profile.show', auth()->id()) }}" class="btn btn-outline-warning w-100">
                                <i class="fas fa-user me-2"></i>Profil Saya
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection