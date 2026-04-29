@extends('layouts.app')

@section('content')
<div class="container-fluid py-4">
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold text-primary">📰 Arsip Mading Saya</h2>
                <a href="{{ route('mading.canvas') }}" class="btn btn-primary">
                    <i class="fas fa-plus me-2"></i>Buat Mading
                </a>
            </div>
        </div>
    </div>

    @if($archivedMadings->count() > 0)
        <div class="row g-4">
            @foreach($archivedMadings as $mading)
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100 shadow-sm">
                        @if($mading->thumbnail_path)
                            <img src="{{ asset('storage/' . $mading->thumbnail_path) }}"
                                 class="card-img-top"
                                 style="height: 200px; object-fit: cover;"
                                 alt="{{ $mading->title }}">
                        @else
                            <div class="card-img-top bg-gradient-primary d-flex align-items-center justify-content-center"
                                 style="height: 200px;">
                                <i class="fas fa-newspaper text-white" style="font-size: 3rem;"></i>
                            </div>
                        @endif

                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold">{{ $mading->title }}</h5>
                            <p class="card-text text-muted small flex-grow-1">
                                {{ Str::limit($mading->description, 100) }}
                            </p>

                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <span class="badge {{ $mading->status === 'published' ? 'bg-success' : 'bg-warning' }}">
                                    {{ ucfirst($mading->status) }}
                                </span>
                                <small class="text-muted">
                                    {{ $mading->created_at->format('d M Y') }}
                                </small>
                            </div>

                            <div class="mt-3 d-flex gap-2">
                                <a href="{{ route('mading.show', $mading) }}"
                                   class="btn btn-outline-primary btn-sm flex-fill">
                                    <i class="fas fa-eye me-1"></i>Lihat
                                </a>
                                <a href="{{ route('mading.edit', $mading) }}"
                                   class="btn btn-outline-warning btn-sm">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <form method="POST" action="{{ route('mading.destroy', $mading) }}"
                                      class="d-inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                            class="btn btn-outline-danger btn-sm"
                                            onclick="return confirm('Yakin hapus mading ini?')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="d-flex justify-content-center mt-4">
            {{ $archivedMadings->links() }}
        </div>
    @else
        <div class="text-center py-5">
            <i class="fas fa-newspaper text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">Belum ada mading</h4>
            <p class="text-muted">Mulai buat mading digital pertama Anda!</p>
            <a href="{{ route('mading.canvas') }}" class="btn btn-primary mt-3">
                <i class="fas fa-plus me-2"></i>Buat Mading
            </a>
        </div>
    @endif
</div>
@endsection
