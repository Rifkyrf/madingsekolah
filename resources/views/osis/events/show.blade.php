@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Detail Event</h5>
                    <div>
                        @if(auth()->user()->isOsis() || auth()->user()->isAdmin())
                            <a href="{{ route('osis.events.edit', $event) }}" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i> Edit
                            </a>
                        @endif
                        <a href="{{ route('osis.events.index') }}" class="btn btn-secondary btn-sm">
                            <i class="fas fa-arrow-left"></i> Kembali
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    @if($event->photo)
                        <div class="text-center mb-4">
                            <img src="{{ $event->photo_url }}" alt="{{ $event->title }}" class="img-fluid rounded" style="max-height: 400px;">
                        </div>
                    @endif
                    
                    <h3 class="mb-3">{{ $event->title }}</h3>
                    
                    <div class="mb-3">
                        <strong><i class="fas fa-calendar text-primary"></i> Tanggal Event:</strong>
                        <span class="ms-2">{{ $event->event_date->format('d F Y') }}</span>
                        @if($event->isOngoing())
                            <span class="badge bg-success ms-2">Sedang Berlangsung</span>
                        @elseif($event->isUpcoming())
                            <span class="badge bg-primary ms-2">Mendatang</span>
                        @else
                            <span class="badge bg-secondary ms-2">Selesai</span>
                        @endif
                    </div>
                    
                    <div class="mb-3">
                        <strong><i class="fas fa-user text-primary"></i> Dibuat oleh:</strong>
                        <span class="ms-2">{{ $event->creator->name ?? 'OSIS' }}</span>
                    </div>
                    
                    <div class="mb-3">
                        <strong><i class="fas fa-clock text-primary"></i> Dibuat pada:</strong>
                        <span class="ms-2">{{ $event->created_at->format('d F Y H:i') }}</span>
                    </div>
                    
                    <hr>
                    
                    <div>
                        <strong><i class="fas fa-info-circle text-primary"></i> Deskripsi:</strong>
                        <div class="mt-2">
                            {!! nl2br(e($event->description)) !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection