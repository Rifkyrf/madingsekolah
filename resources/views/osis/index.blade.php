@extends('layouts.app')

@section('content')
<div class="container py-5">
    <!-- Header -->
    <div class="text-center mb-5">
        <h1 class="display-4 fw-bold text-primary mb-3">
            <i class="fas fa-users me-3"></i>OSIS
        </h1>
        <p class="lead text-muted">Organisasi Siswa Intra Sekolah</p>
        <div class="bg-primary" style="height: 3px; width: 100px; margin: 0 auto;"></div>
    </div>

    @if($members->where('type', 'inti')->count() > 0)
        <!-- Pengurus Inti -->
        <div class="mb-5">
            <h2 class="text-center fw-bold mb-4 text-secondary">
                <i class="fas fa-crown me-2"></i>Pengurus Inti
            </h2>
            
            <div class="row g-4 justify-content-center">
                @foreach($members->where('type', 'inti') as $member)
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card h-100 shadow-sm hover-card">
                            <div class="position-relative">
                                @if($member->foto)
                                    <img src="{{ asset('storage/' . $member->foto) }}" 
                                         class="card-img-top member-photo" 
                                         alt="{{ $member->nama }}">
                                @else
                                    <div class="card-img-top bg-gradient-primary d-flex align-items-center justify-content-center member-photo">
                                        <i class="fas fa-user text-white" style="font-size: 3rem;"></i>
                                    </div>
                                @endif
                                
                                <div class="position-absolute top-0 end-0 m-2">
                                    <span class="badge bg-warning text-dark">
                                        <i class="fas fa-star me-1"></i>Inti
                                    </span>
                                </div>
                            </div>
                            
                            <div class="card-body text-center">
                                <h5 class="card-title fw-bold text-primary">{{ $member->nama }}</h5>
                                <p class="card-text text-muted mb-2">{{ $member->role }}</p>
                                <small class="text-secondary">
                                    <i class="fas fa-graduation-cap me-1"></i>Angkatan {{ $member->angkatan }}
                                </small>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

    @if($members->where('type', 'sekbid')->count() > 0)
        <!-- Seksi Bidang -->
        <div class="mb-5">
            <h2 class="text-center fw-bold mb-4 text-secondary">
                <i class="fas fa-sitemap me-2"></i>Seksi Bidang
            </h2>
            
            @php
                $sekbids = $members->where('type', 'sekbid')->groupBy('nama_sekbid');
            @endphp
            
            @foreach($sekbids as $namaSekbid => $anggota)
                <div class="mb-4">
                    <h4 class="text-center fw-bold text-info mb-3">{{ $namaSekbid }}</h4>
                    
                    <div class="row g-3 justify-content-center">
                        @foreach($anggota as $member)
                            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                                <div class="card h-100 shadow-sm hover-card">
                                    @if($member->foto)
                                        <img src="{{ asset('storage/' . $member->foto) }}" 
                                             class="card-img-top member-photo-small" 
                                             alt="{{ $member->nama }}">
                                    @else
                                        <div class="card-img-top bg-gradient-info d-flex align-items-center justify-content-center member-photo-small">
                                            <i class="fas fa-user text-white" style="font-size: 2rem;"></i>
                                        </div>
                                    @endif
                                    
                                    <div class="card-body text-center p-2">
                                        <h6 class="card-title fw-bold text-primary mb-1" style="font-size: 0.9rem;">
                                            {{ $member->nama }}
                                        </h6>
                                        <p class="card-text text-muted mb-1" style="font-size: 0.8rem;">
                                            {{ $member->role }}
                                        </p>
                                        <small class="text-secondary" style="font-size: 0.7rem;">
                                            Angkatan {{ $member->angkatan }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    @endif

    @if($members->count() === 0)
        <div class="text-center py-5">
            <i class="fas fa-users text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">Belum ada data anggota OSIS</h4>
            <p class="text-muted">Data anggota OSIS akan segera diperbarui.</p>
        </div>
    @endif

    <!-- Admin Button -->
    @auth
        @if(auth()->user()->isAdmin() || auth()->user()->isGuru())
            <div class="text-center mt-5">
                <a href="{{ route('osis.admin') }}" class="btn btn-primary btn-lg">
                    <i class="fas fa-cog me-2"></i>Kelola OSIS
                </a>
            </div>
        @endif
    @endauth
</div>

<style>
.member-photo {
    height: 250px;
    object-fit: cover;
}

.member-photo-small {
    height: 150px;
    object-fit: cover;
}

.hover-card {
    transition: all 0.3s ease;
    border: none;
}

.hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.bg-gradient-primary {
    background: linear-gradient(135deg, #007bff, #0056b3);
}

.bg-gradient-info {
    background: linear-gradient(135deg, #17a2b8, #138496);
}

.card-title {
    line-height: 1.2;
}

.card-text {
    line-height: 1.1;
}

@media (max-width: 768px) {
    .display-4 {
        font-size: 2.5rem;
    }
    
    .member-photo {
        height: 200px;
    }
    
    .member-photo-small {
        height: 120px;
    }
}
</style>
@endsection