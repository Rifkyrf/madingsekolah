@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4><i class="fas fa-user-plus me-2"></i>Tambah Anggota OSIS</h4>
                </div>
                <div class="card-body">
                    <form action="{{ route('osis.management.store') }}" method="POST">
                        @csrf
                        
                        <div class="mb-3">
                            <label for="user_id" class="form-label">Pilih Siswa</label>
                            <select class="form-select @error('user_id') is-invalid @enderror" 
                                    id="user_id" name="user_id" required>
                                <option value="">-- Pilih Siswa --</option>
                                @foreach($siswaUsers as $siswa)
                                    <option value="{{ $siswa->id }}" {{ old('user_id') == $siswa->id ? 'selected' : '' }}>
                                        {{ $siswa->name }} ({{ $siswa->nis }})
                                    </option>
                                @endforeach
                            </select>
                            @error('user_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="nama" class="form-label">Nama Lengkap</label>
                            <input type="text" class="form-control @error('nama') is-invalid @enderror" 
                                   id="nama" name="nama" value="{{ old('nama') }}" required>
                            @error('nama')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="angkatan" class="form-label">Angkatan</label>
                            <input type="text" class="form-control @error('angkatan') is-invalid @enderror" 
                                   id="angkatan" name="angkatan" value="{{ old('angkatan') }}" 
                                   placeholder="Contoh: 2024" required>
                            @error('angkatan')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="sekbid" class="form-label">Seksi/Bidang</label>
                            <select class="form-select @error('sekbid') is-invalid @enderror" 
                                    id="sekbid" name="sekbid" required>
                                <option value="">-- Pilih Seksi/Bidang --</option>
                                <option value="Ketua" {{ old('sekbid') == 'Ketua' ? 'selected' : '' }}>Ketua</option>
                                <option value="Wakil Ketua" {{ old('sekbid') == 'Wakil Ketua' ? 'selected' : '' }}>Wakil Ketua</option>
                                <option value="Sekretaris" {{ old('sekbid') == 'Sekretaris' ? 'selected' : '' }}>Sekretaris</option>
                                <option value="Bendahara" {{ old('sekbid') == 'Bendahara' ? 'selected' : '' }}>Bendahara</option>
                                <option value="Sekbid Keagamaan" {{ old('sekbid') == 'Sekbid Keagamaan' ? 'selected' : '' }}>Sekbid Keagamaan</option>
                                <option value="Sekbid Pendidikan" {{ old('sekbid') == 'Sekbid Pendidikan' ? 'selected' : '' }}>Sekbid Pendidikan</option>
                                <option value="Sekbid Olahraga" {{ old('sekbid') == 'Sekbid Olahraga' ? 'selected' : '' }}>Sekbid Olahraga</option>
                                <option value="Sekbid Seni Budaya" {{ old('sekbid') == 'Sekbid Seni Budaya' ? 'selected' : '' }}>Sekbid Seni Budaya</option>
                                <option value="Sekbid Humas" {{ old('sekbid') == 'Sekbid Humas' ? 'selected' : '' }}>Sekbid Humas</option>
                                <option value="Anggota" {{ old('sekbid') == 'Anggota' ? 'selected' : '' }}>Anggota</option>
                            </select>
                            @error('sekbid')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save me-1"></i>Simpan
                            </button>
                            <a href="{{ route('osis.management.index') }}" class="btn btn-secondary">
                                <i class="fas fa-arrow-left me-1"></i>Kembali
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection