@extends('layouts.app')

@section('content')
<div class="container-fluid py-4">
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold text-primary">📰 Mading Digital</h2>
                @auth
                    @if(auth()->user()->isAdmin() || auth()->user()->isGuru() || auth()->user()->isSiswa())
                        <a href="{{ route('mading.canvas') }}" class="btn btn-primary">
                            <i class="fas fa-plus me-2"></i>Buat Mading
                        </a>
                    @endif
                @endauth
            </div>
        </div>
    </div>

    @if($madings->count() > 0)
        <div class="row g-4">
            @foreach($madings as $mading)
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100 shadow-sm hover-shadow">
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
                                <small class="text-muted">
                                    <i class="fas fa-user me-1"></i>{{ $mading->user->name }}
                                </small>
                                <div class="d-flex align-items-center gap-2">
                                    <span class="badge {{ $mading->status === 'published' ? 'bg-success' : 'bg-warning' }}">
                                        {{ $mading->status === 'published' ? 'Published' : 'Draft' }}
                                    </span>
                                    <small class="text-muted">
                                        {{ $mading->created_at->format('d M Y') }}
                                    </small>
                                </div>
                            </div>

                            <div class="mt-3 d-flex gap-2">
                                <a href="{{ route('mading.show', $mading) }}"
                                   class="btn btn-outline-primary btn-sm flex-fill">
                                    <i class="fas fa-eye me-1"></i>Lihat
                                </a>

                                @auth
                                    @if(auth()->id() === $mading->user_id || auth()->user()->isAdmin())
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
                                    @endif
                                @endauth
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="d-flex justify-content-center mt-4">
            {{ $madings->links() }}
        </div>
    @else
        <div class="text-center py-5">
            <i class="fas fa-newspaper text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">Belum ada mading digital</h4>
            <p class="text-muted">Mulai buat mading digital pertama Anda!</p>
            @auth
                @if(auth()->user()->isAdmin() || auth()->user()->isGuru() || auth()->user()->isSiswa())
                    <a href="{{ route('mading.canvas') }}" class="btn btn-primary mt-3">
                        <i class="fas fa-plus me-2"></i>Buat Mading
                    </a>
                @endif
            @endauth
        </div>
    @endif
</div>

<style>
.hover-shadow {
    transition: box-shadow 0.3s ease;
}

.hover-shadow:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.bg-gradient-primary {
    background: linear-gradient(135deg, #007bff, #0056b3);
}
</style>
@endsection