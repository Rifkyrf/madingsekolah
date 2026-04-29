@extends('layouts.app')

@section('title', 'Kelola OSIS')

@section('content')
<div class="container py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
            <h2 class="fw-bold text-dark mb-1">Struktur Organisasi OSIS</h2>
            <p class="text-muted mb-0">Manajemen pengurus inti dan sekbid.</p>
        </div>
        <a href="{{ route('osis.create') }}" class="btn btn-primary px-4 shadow-sm">
            <i class="fas fa-plus me-2"></i> Tambah Anggota
        </a>
    </div>

    <div class="card shadow-sm border-0 mb-5">
        <div class="card-body bg-light rounded">
            <label class="form-label fw-bold small text-uppercase text-secondary">Pilih Masa Bakti / Angkatan</label>
            <select class="form-select form-select-lg" onchange="location = this.value;">
                @foreach($angkatanList as $angkatan)
                    <option value="{{ route('osis.manage') }}?angkatan={{ $angkatan }}"
                            {{ $angkatan == $angkatanAktif ? 'selected' : '' }}>
                        Angkatan {{ $angkatan }}
                    </option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="mb-5">
        <div class="d-flex align-items-center mb-3">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                <i class="fas fa-users"></i>
            </div>
            <h4 class="fw-bold mb-0">7 Pengurus Inti</h4>
        </div>

        <div class="card shadow-sm border-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light">
                        <tr>
                            <th class="px-4 py-3 border-0" style="width: 80px;">Foto</th>
                            <th class="py-3 border-0">Nama Lengkap</th>
                            <th class="py-3 border-0">Jabatan</th>
                            <th class="py-3 border-0 text-end px-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($inti as $member)
                        <tr>
                            <td class="px-4">
                                <img src="{{ $member->photo_url }}"
                                     class="rounded-circle border"
                                     style="width: 50px; height: 50px; object-fit: cover;"
                                     alt="Profile">
                            </td>
                            <td>
                                <div class="fw-bold text-dark">{{ $member->name }}</div>
                                <small class="text-muted">Angkatan {{ $member->angkatan }}</small>
                            </td>
                            <td>
                                <span class="badge bg-primary-subtle text-primary border border-primary-semibold px-3 py-2 rounded-pill">
                                    {{ ucfirst($member->role) }}
                                </span>
                            </td>
                            <td class="text-end px-4">
                                <div class="btn-group shadow-sm">
                                    <a href="{{ route('osis.edit', $member->id) }}" class="btn btn-sm btn-white border">
                                        <i class="fas fa-edit text-primary"></i>
                                    </a>
                                    <form action="{{ route('osis.destroy', $member->id) }}" method="POST" class="d-inline">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-white border text-danger" onclick="return confirm('Hapus data ini?')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="4" class="text-center py-4 text-muted italic">Belum ada data pengurus inti.</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="mb-5">
        <div class="d-flex align-items-center mb-3">
            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                <i class="fas fa-sitemap"></i>
            </div>
            <h4 class="fw-bold mb-0">Seksi Bidang (Sekbid)</h4>
        </div>

        @forelse($sekbid as $namaSekbid => $members)
            <div class="card shadow-sm border-0 mb-4">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="mb-0 fw-bold text-success">{{ $namaSekbid }}</h5>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <tbody>
                            @foreach($members as $member)
                            <tr>
                                <td class="px-4" style="width: 80px;">
                                    <img src="{{ $member->photo_url }}"
                                         class="rounded-circle border"
                                         style="width: 45px; height: 45px; object-fit: cover;">
                                </td>
                                <td>
                                    <div class="fw-bold">{{ $member->name }}</div>
                                    <small class="text-muted">Angkatan {{ $member->angkatan }}</small>
                                </td>
                                <td>
                                    <span class="text-muted small uppercase fw-semibold">{{ ucfirst($member->role) }}</span>
                                </td>
                                <td class="text-end px-4">
                                    <div class="btn-group shadow-sm">
                                        <a href="{{ route('osis.edit', $member->id) }}" class="btn btn-sm btn-white border"><i class="fas fa-edit text-primary"></i></a>
                                        <form action="{{ route('osis.destroy', $member->id) }}" method="POST" class="d-inline">
                                            @csrf @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-white border text-danger" onclick="return confirm('Hapus?')"><i class="fas fa-trash"></i></button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        @empty
            <p class="text-muted px-3">Belum ada data Sekbid.</p>
        @endforelse
    </div>
</div>

<style>
    .btn-white:hover { background-color: #f8f9fa; }
    .table thead th { font-size: 0.8rem; letter-spacing: 1px; }
    .bg-primary-subtle { background-color: #e7f0ff !important; }
    .text-primary-semibold { color: #1a4b8c !important; }
</style>
@endsection