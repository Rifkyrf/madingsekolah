@extends('layouts.landing')

@section('title', 'Jurusan - SMK Mading Digital')

@section('content')
<div class="container-fluid px-0">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h1 class="display-4 fw-bold mb-3">Jurusan Kami</h1>
                    <p class="lead">Pilih jurusan yang sesuai dengan minat dan bakatmu untuk masa depan yang cerah</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Jurusan Cards -->
    <section class="py-5">
        <div class="container">
            <div class="row g-4">
                @foreach($jurusans as $jurusan)
                <div class="col-lg-6 col-xl-4">
                    <div class="card h-100 shadow-sm border-0 jurusan-card" data-aos="fade-up" data-aos-delay="{{ $loop->index * 100 }}">
                        <div class="position-relative overflow-hidden">
                            <img src="{{ $jurusan->foto ? asset('storage/' . $jurusan->foto) : asset('images/default-jurusan.jpg') }}"
                                 class="card-img-top" alt="{{ $jurusan->nama }}" style="height: 200px; object-fit: cover;">
                            <div class="position-absolute top-0 end-0 m-3">
                                <span class="badge bg-primary fs-6">{{ $jurusan->kode }}</span>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold text-primary">{{ $jurusan->nama }}</h5>
                            <p class="card-text text-muted flex-grow-1">{{ Str::limit($jurusan->deskripsi, 120) }}</p>

                            <!-- Mata Pelajaran Preview -->
                            @if($jurusan->mata_pelajaran && is_array($jurusan->mata_pelajaran))
                            <div class="mb-3">
                                <small class="text-muted d-block mb-2">Mata Pelajaran:</small>
                                <div class="d-flex flex-wrap gap-1">
                                    @foreach(array_slice($jurusan->mata_pelajaran, 0, 3) as $mapel)
                                    <span class="badge bg-light text-dark">{{ $mapel }}</span>
                                    @endforeach
                                    @if(count($jurusan->mata_pelajaran) > 3)
                                    <span class="badge bg-secondary">+{{ count($jurusan->mata_pelajaran) - 3 }} lainnya</span>
                                    @endif
                                </div>
                            </div>
                            @endif

                            <a href="{{ route('jurusan.show', $jurusan->id) }}" class="btn btn-primary mt-auto">
                                Selengkapnya <i class="fas fa-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>
</div>

<style>
.jurusan-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.jurusan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

.hero-section {
    background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-primary-dark, #0056b3) 100%);
}
</style>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script>
    AOS.init({
        duration: 800,
        once: true
    });
</script>
@endsection