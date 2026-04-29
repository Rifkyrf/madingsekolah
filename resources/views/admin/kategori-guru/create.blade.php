@extends('layouts.app')

@section('title', 'Tambah Kategori Guru')

@section('content')
<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <nav aria-label="breadcrumb" class="mb-4">
                <ol class="breadcrumb">
                    <li class="breadcrumb-atitem"><a href="{{ route('admin.kategori-guru.index') }}" class="text-decoration-none">Kategori Guru</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Tambah Kategori</li>
                </ol>
            </nav>

            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0 fw-bold text-primary">
                        <i class="fas fa-plus-circle me-2"></i>Tambah Kategori Guru
                    </h5>
                </div>

                <div class="card-body p-4">
                    <form action="{{ route('admin.kategori-guru.store') }}" method="POST">
                        @csrf

                        <div class="mb-3">
                            <label for="nama" class="form-label fw-semibold">Nama Kategori</label>
                            <input type="text"
                                   name="nama"
                                   id="nama"
                                   class="form-control @error('nama') is-invalid @enderror"
                                   placeholder="Contoh: Produktif - RPL"
                                   value="{{ old('nama') }}"
                                   required>
                            @error('nama')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="jenis" class="form-label fw-semibold">Jenis</label>
                            <select name="jenis"
                                    id="jenis"
                                    class="form-select @error('jenis') is-invalid @enderror"
                                    required>
                                <option value="" selected disabled>Pilih Jenis Kategori...</option>
                                <option value="produktif" {{ old('jenis') == 'produktif' ? 'selected' : '' }}>Produktif</option>
                                <option value="normatif" {{ old('jenis') == 'normatif' ? 'selected' : '' }}>Normatif</option>
                                <option value="adaptif" {{ old('jenis') == 'adaptif' ? 'selected' : '' }}>Adaptif</option>
                                <option value="pembina" {{ old('jenis') == 'pembina' ? 'selected' : '' }}>Pembina</option>
                                <option value="bk" {{ old('jenis') == 'bk' ? 'selected' : '' }}>BK</option>
                            </select>
                            @error('jenis')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label for="deskripsi" class="form-label fw-semibold">Deskripsi (Opsional)</label>
                            <textarea name="deskripsi"
                                      id="deskripsi"
                                      class="form-control"
                                      rows="4"
                                      placeholder="Tambahkan keterangan mengenai kategori ini...">{{ old('deskripsi') }}</textarea>
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-primary px-4">
                                <i class="fas fa-save me-1"></i> Simpan
                            </button>
                            <a href="{{ route('admin.kategori-guru.index') }}" class="btn btn-light px-4 border">
                                Batal
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection