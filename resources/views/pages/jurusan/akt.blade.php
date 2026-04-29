@extends('layouts.landing')

@section('title', 'Akuntansi dan Keuangan Lembaga (AKT)')

@section('content')
<div class="hero-section bg-success text-white py-5">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6 fade-in-left">
                <h1 class="display-4 fw-bold mb-4">Akuntansi dan Keuangan Lembaga</h1>
                <p class="lead mb-4">Jurusan yang mempersiapkan siswa menjadi tenaga ahli di bidang akuntansi dan keuangan dengan kemampuan mengelola keuangan lembaga dan perusahaan.</p>
                <div class="d-flex gap-3">
                    <span class="badge bg-light text-success px-3 py-2">Akuntansi</span>
                    <span class="badge bg-light text-success px-3 py-2">Keuangan</span>
                    <span class="badge bg-light text-success px-3 py-2">Perpajakan</span>
                </div>
            </div>
            <div class="col-lg-6 text-center fade-in-right">
                <img src="{{ asset('images/jurusan/akt.jpg') }}" alt="AKT" class="img-fluid rounded shadow" 
                     onerror="this.src='https://via.placeholder.com/500x300/28a745/ffffff?text=AKT'">
            </div>
        </div>
    </div>
</div>

<div class="container py-5">
    <div class="row">
        <div class="col-lg-8">
            <div class="card shadow-sm mb-4 fade-in-up">
                <div class="card-body">
                    <h3 class="text-success mb-4">Tentang Jurusan AKT</h3>
                    <p>Akuntansi dan Keuangan Lembaga (AKT) adalah jurusan yang fokus pada pengelolaan keuangan, akuntansi, dan administrasi keuangan lembaga. Siswa akan mempelajari sistem akuntansi, perpajakan, dan manajemen keuangan.</p>
                    
                    <h5 class="mt-4 mb-3">Mata Pelajaran Utama:</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Akuntansi Dasar</li>
                                <li><i class="fas fa-check text-success me-2"></i>Akuntansi Keuangan</li>
                                <li><i class="fas fa-check text-success me-2"></i>Akuntansi Biaya</li>
                                <li><i class="fas fa-check text-success me-2"></i>Perpajakan</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Manajemen Keuangan</li>
                                <li><i class="fas fa-check text-success me-2"></i>Sistem Informasi Akuntansi</li>
                                <li><i class="fas fa-check text-success me-2"></i>Auditing</li>
                                <li><i class="fas fa-check text-success me-2"></i>Ekonomi Bisnis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm fade-in-up">
                <div class="card-body">
                    <h3 class="text-success mb-4">Prospek Karir</h3>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-success text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-calculator"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Staff Akuntansi</h6>
                                    <small class="text-muted">Mengelola pembukuan dan laporan keuangan</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-primary text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-coins"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Kasir</h6>
                                    <small class="text-muted">Mengelola transaksi keuangan harian</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-warning text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-file-invoice"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Tax Consultant</h6>
                                    <small class="text-muted">Konsultan perpajakan dan pelaporan pajak</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="d-flex align-items-center">
                                <div class="bg-info text-white rounded-circle p-2 me-3">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div>
                                    <h6 class="mb-1">Financial Analyst</h6>
                                    <small class="text-muted">Menganalisis kinerja keuangan perusahaan</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card shadow-sm mb-4 fade-in-up">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Info Jurusan</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <strong>Lama Studi:</strong><br>
                        <span class="text-muted">3 Tahun</span>
                    </div>
                    <div class="mb-3">
                        <strong>Kapasitas:</strong><br>
                        <span class="text-muted">36 Siswa per Kelas</span>
                    </div>
                    <div class="mb-3">
                        <strong>Akreditasi:</strong><br>
                        <span class="badge bg-success">A</span>
                    </div>
                    <div class="mb-3">
                        <strong>Fasilitas:</strong><br>
                        <small class="text-muted">Lab Akuntansi, Lab Komputer, Perpustakaan Ekonomi</small>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm fade-in-up">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-tools me-2"></i>Software & Tools</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-success">MYOB</span>
                        <span class="badge bg-primary">Accurate</span>
                        <span class="badge bg-warning text-dark">Excel</span>
                        <span class="badge bg-info">Zahir</span>
                        <span class="badge bg-danger">SAP</span>
                        <span class="badge bg-secondary">QuickBooks</span>
                        <span class="badge bg-dark">Jurnal.id</span>
                        <span class="badge bg-success">e-SPT</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.fade-in-left { animation: fadeInLeft 1s ease-out; }
.fade-in-right { animation: fadeInRight 1s ease-out; }
.fade-in-up { animation: fadeInUp 0.8s ease-out; }

@keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
@endsection