@extends('layouts.app')

@section('title', 'Tambah Anggota OSIS')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-8">

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold text-dark mb-0">Tambah Anggota Baru</h2>
                <a href="{{ route('osis.manage') }}" class="btn btn-outline-secondary px-4 shadow-sm">
                    <i class="fas fa-arrow-left me-2"></i>Kembali
                </a>
            </div>

            <div class="card border-0 shadow-sm rounded-3">
                <div class="card-body p-4 p-md-5">
                    <form method="POST" action="{{ route('osis.store') }}" enctype="multipart/form-data">
                        @csrf

                        <div class="text-center mb-5">
                            <div class="position-relative d-inline-block">
                                <img src="https://ui-avatars.com/api/?name=User&background=f8f9fa&color=dee2e6&size=128"
                                     id="previewImg"
                                     class="rounded-circle border border-4 border-white shadow"
                                     style="width: 140px; height: 140px; object-fit: cover;"
                                     alt="Profile">
                                <div class="mt-3">
                                    <span class="badge bg-light text-dark border fw-normal">Pratinjau Foto Profil</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold small text-muted">Nama Lengkap</label>
                                <input type="text" name="name" class="form-control form-control-lg bg-light @error('name') is-invalid @enderror" value="{{ old('name') }}" placeholder="Masukkan nama..." required>
                                @error('name') <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>

                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold small text-muted">Angkatan</label>
                                <input type="text" name="angkatan" class="form-control form-control-lg bg-light @error('angkatan') is-invalid @enderror" value="{{ old('angkatan') }}" placeholder="Contoh: 2024/2025" required>
                                @error('angkatan') <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>

                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold small text-muted">Jabatan</label>
                                <select name="role" class="form-select form-select-lg bg-light @error('role') is-invalid @enderror" required>
                                    <option value="" selected disabled>Pilih Jabatan</option>
                                    <option value="ketua" {{ old('role') == 'ketua' ? 'selected' : '' }}>Ketua</option>
                                    <option value="wakil ketua" {{ old('role') == 'wakil ketua' ? 'selected' : '' }}>Wakil Ketua</option>
                                    <option value="sekretaris" {{ old('role') == 'sekretaris' ? 'selected' : '' }}>Sekretaris</option>
                                    <option value="bendahara" {{ old('role') == 'bendahara' ? 'selected' : '' }}>Bendahara</option>
                                    <option value="anggota" {{ old('role') == 'anggota' ? 'selected' : '' }}>Anggota</option>
                                </select>
                                @error('role') <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>

                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold small text-muted">Tipe Pengurus</label>
                                <select name="type" id="typeSelect" class="form-select form-select-lg bg-light @error('type') is-invalid @enderror" required>
                                    <option value="inti" {{ old('type') == 'inti' ? 'selected' : '' }}>7 Pengurus Inti</option>
                                    <option value="sekbid" {{ old('type') == 'sekbid' ? 'selected' : '' }}>Seksi Bidang (Sekbid)</option>
                                </select>
                                @error('type') <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>
                        </div>

                        <div class="mb-3" id="sekbidField" style="{{ old('type') != 'sekbid' ? 'display:none;' : '' }}">
                            <label class="form-label fw-bold small text-success">Nama Seksi Bidang</label>
                            <input type="text" name="nama_sekbid" class="form-control form-control-lg border-success" value="{{ old('nama_sekbid') }}" placeholder="Contoh: Kesiswaan / Bela Negara">
                            <div class="form-text">Wajib diisi jika memilih tipe Seksi Bidang.</div>
                        </div>

                        <div class="mb-4 pt-3 border-top mt-4">
                            <label class="form-label fw-bold small text-muted">Foto Profil</label>
                            <input type="file" name="photo" class="form-control @error('photo') is-invalid @enderror" accept="image/*" onchange="previewFile(this)">
                            <div class="form-text mt-2"><i class="fas fa-info-circle me-1"></i> Gunakan foto rasio 1:1. Maksimal 2MB.</div>
                            @error('photo') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>

                        <div class="row g-2 pt-3">
                            <div class="col-12 col-md-auto ms-auto order-md-2">
                                <button type="submit" class="btn btn-primary btn-lg px-5 w-100 shadow-sm">
                                    <i class="fas fa-save me-2"></i>Simpan Anggota
                                </button>
                            </div>
                            <div class="col-12 col-md-auto order-md-1">
                                <a href="{{ route('osis.manage') }}" class="btn btn-light btn-lg px-4 w-100 border text-muted">Batal</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
// Fungsi Pratinjau Foto
function previewFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Logic Tampilkan/Sembunyikan Field Sekbid
document.addEventListener('DOMContentLoaded', function () {
    const typeSelect = document.getElementById('typeSelect');
    const sekbidField = document.getElementById('sekbidField');

    function toggleSekbid() {
        if (typeSelect.value === 'sekbid') {
            sekbidField.style.display = 'block';
            sekbidField.querySelector('input').setAttribute('required', 'required');
        } else {
            sekbidField.style.display = 'none';
            sekbidField.querySelector('input').removeAttribute('required');
        }
    }

    typeSelect.addEventListener('change', toggleSekbid);
});
</script>
@endpush
@endsection