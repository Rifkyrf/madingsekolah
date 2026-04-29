@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row">
        <div class="col-12">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="fw-bold text-primary mb-1">
                        <i class="fas fa-calendar-alt me-2"></i>Event OSIS
                    </h2>
                    <p class="text-muted mb-0">Kelola jadwal dan event OSIS</p>
                </div>
                
                <div class="d-flex gap-2">
                    <a href="{{ route('osis.events.calendar') }}" class="btn btn-outline-info">
                        <i class="fas fa-calendar-alt me-1"></i>Lihat Kalender
                    </a>
                    <a href="{{ route('osis.events.create') }}" class="btn btn-primary">
                        <i class="fas fa-plus me-1"></i>Tambah Event
                    </a>
                </div>
            </div>

            <!-- Events List -->
            <div class="row g-4">
                @forelse($events as $event)
                    <div class="col-lg-6">
                        <div class="card h-100 shadow-sm {{ $event->isOngoing() ? 'border-primary' : '' }}">
                            @if($event->isOngoing())
                                <div class="card-header bg-primary text-white">
                                    <small><i class="fas fa-circle me-1"></i>Sedang Berlangsung</small>
                                </div>
                            @endif
                            
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <h5 class="card-title fw-bold {{ $event->isOngoing() ? 'text-primary' : '' }}">
                                        {{ $event->title }}
                                    </h5>
                                    <span class="badge bg-primary">
                                        Event
                                    </span>
                                </div>
                                
                                <p class="card-text text-muted">{{ Str::limit($event->description, 100) }}</p>
                                
                                <div class="row g-2 mb-3">
                                    <div class="col-6">
                                        <small class="text-muted d-block">
                                            <i class="fas fa-calendar me-1"></i>Tanggal
                                        </small>
                                        <strong>{{ $event->event_date->format('d M Y') }}</strong>
                                    </div>
                                </div>
                                
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">
                                        Dibuat oleh: {{ $event->user->name ?? 'OSIS' }}
                                    </small>
                                    
                                    <div class="btn-group btn-group-sm">
                                        <a href="{{ route('osis.events.show', $event) }}" 
                                           class="btn btn-outline-info">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <a href="{{ route('osis.events.edit', $event) }}" 
                                           class="btn btn-outline-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <form method="POST" 
                                              action="{{ route('osis.events.destroy', $event) }}" 
                                              class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" 
                                                    class="btn btn-outline-danger"
                                                    onclick="return confirm('Yakin hapus event ini?')">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center py-5">
                            <i class="fas fa-calendar-times text-muted" style="font-size: 4rem;"></i>
                            <h4 class="text-muted mt-3">Belum ada event</h4>
                            <p class="text-muted">Mulai buat event OSIS pertama.</p>
                            <a href="{{ route('osis.events.create') }}" class="btn btn-primary">
                                <i class="fas fa-plus me-1"></i>Tambah Event
                            </a>
                        </div>
                    </div>
                @endforelse
            </div>

            <!-- Pagination -->
            @if($events->hasPages())
                <div class="d-flex justify-content-center mt-4">
                    {{ $events->links() }}
                </div>
            @endif
        </div>
    </div>
</div>

<style>
.card.border-primary {
    border-width: 2px !important;
    box-shadow: 0 0.125rem 0.25rem rgba(13, 110, 253, 0.2) !important;
}

.card.border-primary .card-title {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
}
</style>
@endsection