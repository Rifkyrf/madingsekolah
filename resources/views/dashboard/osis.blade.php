@extends('layouts.app')

@section('content')
<div class="container py-4">
    <!-- Header -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold text-primary mb-1">
                        <i class="fas fa-users me-2"></i>Dashboard OSIS
                    </h2>
                    <p class="text-muted mb-0">Selamat datang, {{ auth()->user()->name }}!</p>
                </div>
                <div class="d-flex gap-2">
                    <a href="{{ route('osis.events.create') }}" class="btn btn-primary">
                        <i class="fas fa-plus me-1"></i>Buat Event
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
                            <h6 class="card-title mb-1">Total Event</h6>
                            <h3 class="mb-0">{{ $stats['total_events'] }}</h3>
                        </div>
                        <i class="fas fa-calendar-alt fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
            <div class="card bg-success text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Event Mendatang</h6>
                            <h3 class="mb-0">{{ $stats['upcoming_events'] }}</h3>
                        </div>
                        <i class="fas fa-clock fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
            <div class="card bg-warning text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Sedang Berlangsung</h6>
                            <h3 class="mb-0">{{ $stats['ongoing_events'] }}</h3>
                        </div>
                        <i class="fas fa-play-circle fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
            <div class="card bg-info text-white h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">Event Selesai</h6>
                            <h3 class="mb-0">{{ $stats['past_events'] }}</h3>
                        </div>
                        <i class="fas fa-check-circle fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <!-- Event Mendatang -->
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                            <i class="fas fa-calendar-check me-2"></i>Event Mendatang
                        </h5>
                        <a href="{{ route('osis.events.index') }}" class="btn btn-outline-primary btn-sm">
                            Lihat Semua
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    @forelse($upcomingEvents as $event)
                        <div class="d-flex align-items-start mb-3 {{ !$loop->last ? 'border-bottom pb-3' : '' }}">
                            <div class="flex-shrink-0 me-3">
                                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                     style="width: 40px; height: 40px;">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-1">{{ $event->title }}</h6>
                                <p class="text-muted small mb-1">{{ Str::limit($event->description, 60) }}</p>
                                <div class="d-flex gap-3">
                                    <small class="text-primary">
                                        <i class="fas fa-calendar me-1"></i>{{ $event->event_date->format('d M Y') }}
                                    </small>

                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-4">
                            <i class="fas fa-calendar-times text-muted fa-2x mb-2"></i>
                            <p class="text-muted mb-0">Belum ada event mendatang</p>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>

        <!-- Event Terbaru -->
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                            <i class="fas fa-history me-2"></i>Event Terbaru
                        </h5>
                        <a href="{{ route('osis.events.index') }}" class="btn btn-outline-primary btn-sm">
                            Lihat Semua
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    @forelse($recentEvents as $event)
                        <div class="d-flex align-items-start mb-3 {{ !$loop->last ? 'border-bottom pb-3' : '' }}">
                            <div class="flex-shrink-0 me-3">
                                <div class="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                     style="width: 40px; height: 40px;">
                                    <i class="fas fa-calendar"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-1">{{ $event->title }}</h6>
                                <p class="text-muted small mb-1">{{ Str::limit($event->description, 60) }}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        <i class="fas fa-user me-1"></i>{{ $event->user->name ?? 'OSIS' }}
                                    </small>
                                    <span class="badge bg-primary">
                                        Event
                                    </span>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="text-center py-4">
                            <i class="fas fa-calendar-times text-muted fa-2x mb-2"></i>
                            <p class="text-muted mb-0">Belum ada event</p>
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
                            <a href="{{ route('osis.events.create') }}" class="btn btn-outline-primary w-100">
                                <i class="fas fa-plus-circle me-2"></i>Buat Event Baru
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="{{ route('osis.events.index') }}" class="btn btn-outline-info w-100">
                                <i class="fas fa-list me-2"></i>Kelola Event
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="{{ route('osis.index') }}" class="btn btn-outline-success w-100">
                                <i class="fas fa-users me-2"></i>Lihat Struktur OSIS
                            </a>
                        </div>
                        <div class="col-md-3">
                            <a href="{{ route('upload.page') }}" class="btn btn-outline-warning w-100">
                                <i class="fas fa-upload me-2"></i>Upload Karya
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection