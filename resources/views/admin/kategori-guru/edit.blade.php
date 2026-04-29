@extends('layouts.app')

@section('title', 'Edit Kategori Guru')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-12 col-lg-8">

            <div class="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h1 class="h3 mb-1 fw-bold text-dark">Edit Kategori</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="{{ route('admin.kategori-guru.index') }}" class="text-decoration-none">Daftar</a></li>
                            <li class="breadcrumb-item active">Ubah Data</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="card shadow-sm border-0 rounded-3">
                <div class="card-body p-4">
                    <form action="{{ route('admin.kategori-guru.update', $kategoriGuru) }}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="mb-3">
                            <label for="nama" class="form-label fw-bold text-secondary">Nama Kategori</label>
                            <input type="text"
                                   name="nama"
                                   id="nama"
                                   class="form-control form-control-lg @error('nama') is-invalid @enderror"
                                   value="{{ old('nama', $kategoriGuru->nama) }}"
                                   placeholder="Masukkan nama kategori..."
                                   required>
                            @error('nama')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="jenis" class="form-label fw-bold text-secondary">Jenis</label>
                            <select name="jenis"
                                    id="jenis"
                                    class="form-select form-select-lg @error('jenis') is-invalid @enderror"
                                    required>
                                <option value="" disabled>Pilih Jenis</option>
                                <option value="produktif" {{ old('jenis', $kategoriGuru->jenis) === 'produktif' ? 'selected' : '' }}>Produktif</option>
                                <option value="normatif" {{ old('jenis', $kategoriGuru->jenis) === 'normatif' ? 'selected' : '' }}>Normatif</option>
                                <option value="adaptif" {{ old('jenis', $kategoriGuru->jenis) === 'adaptif' ? 'selected' : '' }}>Adaptif</option>
                                <option value="pembina" {{ old('jenis', $kategoriGuru->jenis) === 'pembina' ? 'selected' : '' }}>Pembina</option>
                                <option value="bk" {{ old('jenis', $kategoriGuru->jenis) === 'bk' ? 'selected' : '' }}>BK</option>
                            </select>
                            @error('jenis')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="deskripsi" class="form-label fw-bold text-secondary">Deskripsi</label>
                            <textarea name="deskripsi"
                                      id="deskripsi"
                                      class="form-control"
                                      rows="4"
                                      placeholder="Tambahkan keterangan deskripsi jika ada...">{{ old('deskripsi', $kategoriGuru->deskripsi) }}</textarea>
                        </div>

                        <div class="row g-2">
                            <div class="col-12 col-md-auto">
                                <button type="submit" class="btn btn-primary btn-lg px-5 w-100">
                                    <i class="fas fa-save me-2"></i> Update
                                </button>
                            </div>
                            <div class="col-12 col-md-auto">
                                <a href="{{ route('admin.kategori-guru.index') }}" class="btn btn-light btn-lg px-5 w-100 border">
                                    Batal
                                </a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection