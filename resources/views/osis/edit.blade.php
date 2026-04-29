@extends('layouts.app')

@section('title', 'Edit Anggota OSIS')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-8">

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold text-dark">Edit Anggota</h2>
                <a href="{{ route('osis.manage') }}" class="btn btn-outline-secondary px-4">
                    <i class="fas fa-arrow-left me-2"></i>Kembali
                </a>
            </div>

            <div class="card border-0 shadow-sm rounded-3">
                <div class="card-body p-4">
                    <form method="POST" action="{{ route('osis.update', $member->id) }}" enctype="multipart/form-data" id="osisForm">
                        @csrf
                        @method('PUT')

                        <div class="text-center mb-4">
                            <div class="position-relative d-inline-block">
                                <img src="{{ $member->photo_url }}"
                                     class="rounded-circle border shadow-sm"
                                     style="width: 120px; height: 120px; object-fit: cover;"
                                     id="previewImg">
                                <div class="mt-2 small text-muted">Foto Profil Saat Ini</div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Nama Lengkap</label>
                                <input type="text" name="name" class="form-control form-control-lg" value="{{ old('name', $member->name) }}" required>
                            </div>

                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Angkatan</label>
                                <input type="text" name="angkatan" class="form-control form-control-lg" value="{{ old('angkatan', $member->angkatan) }}" required placeholder="Contoh: 2023/2024">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Jabatan</label>
                                <select name="role" class="form-select form-select-lg" required>
                                    <option value="ketua" {{ (old('role', $member->role) == 'ketua') ? 'selected' : '' }}>Ketua</option>
                                    <option value="wakil ketua" {{ (old('role', $member->role) == 'wakil ketua') ? 'selected' : '' }}>Wakil Ketua</option>
                                    <option value="sekretaris" {{ (old('role', $member->role) == 'sekretaris') ? 'selected' : '' }}>Sekretaris</option>
                                    <option value="bendahara" {{ (old('role', $member->role) == 'bendahara') ? 'selected' : '' }}>Bendahara</option>
                                    <option value="anggota" {{ (old('role', $member->role) == 'anggota') ? 'selected' : '' }}>Anggota</option>
                                </select>
                            </div>

                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Tipe Anggota</label>
                                <select name="type" class="form-select form-select-lg" required>
                                    <option value="inti" {{ (old('type', $member->type) == 'inti') ? 'selected' : '' }}>7 Inti OSIS</option>
                                    <option value="sekbid" {{ (old('type', $member->type) == 'sekbid') ? 'selected' : '' }}>Sekbid</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3" id="sekbidField" style="{{ (old('type', $member->type) != 'sekbid') ? 'display:none;' : '' }}">
                            <label class="form-label fw-bold text-success">Nama Sekbid</label>
                            <input type="text" name="nama_sekbid" class="form-control form-control-lg border-success" value="{{ old('nama_sekbid', $member->nama_sekbid) }}" placeholder="Contoh: Kesiswaan / Seni Budaya">
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-bold">Ganti Foto (Opsional)</label>
                            <input type="file" name="photo" class="form-control" accept="image/*" onchange="previewFile(this)">
                            <div class="form-text">Gunakan foto rasio 1:1 untuk hasil terbaik.</div>
                        </div>

                        <hr>

                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a href="{{ route('osis.manage') }}" class="btn btn-light px-4 border">Batal</a>
                            <button type="submit" class="btn btn-primary px-5">
                                <i class="fas fa-save me-2"></i>Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
// Preview foto saat upload
function previewFile(input){
    var file = $("input[type=file]").get(0).files[0];
    if(file){
        var reader = new FileReader();
        reader.onload = function(){
            $("#previewImg").attr("src", reader.result);
        }
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const typeSelect = document.querySelector('select[name="type"]');
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