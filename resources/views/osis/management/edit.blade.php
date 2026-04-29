@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Edit Anggota OSIS</h5>
                    <a href="{{ route('osis.management.index') }}" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left"></i> Kembali
                    </a>
                </div>
                <div class="card-body">
                    <form action="{{ route('osis.management.update', $member) }}" method="POST">
                        @csrf
                        @method('PUT')
                        
                        <div class="mb-3">
                            <label for="user_id" class="form-label">Pilih Siswa <span class="text-danger">*</span></label>
                            <select class="form-select @error('user_id') is-invalid @enderror" id="user_id" name="user_id" required>
                                <option value="">-- Pilih Siswa --</option>
                                @foreach($siswaUsers as $user)
                                    <option value="{{ $user->id }}" {{ old('user_id', $member->user_id) == $user->id ? 'selected' : '' }}>
                                        {{ $user->name }} ({{ $user->nis }})
                                    </option>
                                @endforeach
                            </select>
                            @error('user_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="nama" class="form-label">Nama Lengkap <span class="text-danger">*</span></label>
                            <input type="text" class="form-control @error('nama') is-invalid @enderror" 
                                   id="nama" name="nama" value="{{ old('nama', $member->nama) }}" required>
                            @error('nama')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="angkatan" class="form-label">Angkatan <span class="text-danger">*</span></label>
                            <input type="text" class="form-control @error('angkatan') is-invalid @enderror" 
                                   id="angkatan" name="angkatan" value="{{ old('angkatan', $member->angkatan) }}" 
                                   placeholder="Contoh: 2024" required>
                            @error('angkatan')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="sekbid" class="form-label">Seksi/Bidang <span class="text-danger">*</span></label>
                            <select class="form-select @error('sekbid') is-invalid @enderror" id="sekbid" name="sekbid" required>
                                <option value="">-- Pilih Seksi/Bidang --</option>
                                <option value="Ketua" {{ old('sekbid', $member->sekbid) == 'Ketua' ? 'selected' : '' }}>Ketua</option>
                                <option value="Wakil Ketua" {{ old('sekbid', $member->sekbid) == 'Wakil Ketua' ? 'selected' : '' }}>Wakil Ketua</option>
                                <option value="Sekretaris" {{ old('sekbid', $member->sekbid) == 'Sekretaris' ? 'selected' : '' }}>Sekretaris</option>
                                <option value="Bendahara" {{ old('sekbid', $member->sekbid) == 'Bendahara' ? 'selected' : '' }}>Bendahara</option>
                                <option value="Sekbid Pendidikan" {{ old('sekbid', $member->sekbid) == 'Sekbid Pendidikan' ? 'selected' : '' }}>Sekbid Pendidikan</option>
                                <option value="Sekbid Keagamaan" {{ old('sekbid', $member->sekbid) == 'Sekbid Keagamaan' ? 'selected' : '' }}>Sekbid Keagamaan</option>
                                <option value="Sekbid Olahraga" {{ old('sekbid', $member->sekbid) == 'Sekbid Olahraga' ? 'selected' : '' }}>Sekbid Olahraga</option>
                                <option value="Sekbid Seni Budaya" {{ old('sekbid', $member->sekbid) == 'Sekbid Seni Budaya' ? 'selected' : '' }}>Sekbid Seni Budaya</option>
                                <option value="Sekbid Humas" {{ old('sekbid', $member->sekbid) == 'Sekbid Humas' ? 'selected' : '' }}>Sekbid Humas</option>
                                <option value="Anggota" {{ old('sekbid', $member->sekbid) == 'Anggota' ? 'selected' : '' }}>Anggota</option>
                            </select>
                            @error('sekbid')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex justify-content-between">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save"></i> Update Data
                            </button>
                            
                            <button type="button" class="btn btn-danger" onclick="confirmDelete()">
                                <i class="fas fa-trash"></i> Hapus Anggota
                            </button>
                        </div>
                    </form>
                    
                    <form id="delete-form" action="{{ route('osis.management.destroy', $member) }}" method="POST" style="display: none;">
                        @csrf
                        @method('DELETE')
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function confirmDelete() {
    if (confirm('Apakah Anda yakin ingin menghapus anggota OSIS ini?')) {
        document.getElementById('delete-form').submit();
    }
}
</script>
@endsection