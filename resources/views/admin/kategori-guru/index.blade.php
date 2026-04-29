@extends('layouts.app')

@section('title', 'Kelola Kategori Guru')

@section('content')
<div class="container py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <h1 class="h3 fw-bold text-dark mb-1">Kelola Kategori Guru</h1>
            <p class="text-muted small mb-0">Manajemen data kategori untuk pengelompokan guru.</p>
        </div>
        <a href="{{ route('admin.kategori-guru.create') }}" class="btn btn-primary shadow-sm px-4">
            <i class="fas fa-plus me-2"></i>Tambah Kategori
        </a>
    </div>

    <x-corporate-table id="kategoriTable" title="Daftar Kategori Guru">
        <x-slot name="thead">
            <tr>
                <th class="ps-4">Nama Kategori</th>
                <th>Jenis</th>
                <th class="text-center">Jumlah Guru</th>
                <th class="pe-4 text-end">Aksi</th>
            </tr>
        </x-slot>

        @foreach($kategoris as $kategori)
        <tr>
            <td class="ps-4 fw-semibold text-dark">{{ $kategori->nama }}</td>
            <td>
                @php
                    $badgeColor = [
                        'produktif' => 'bg-soft-primary',
                        'normatif' => 'bg-soft-success',
                        'adaptif' => 'bg-soft-info',
                        'pembina' => 'bg-warning text-dark',
                        'bk' => 'bg-soft-danger'
                    ][$kategori->jenis] ?? 'bg-secondary';
                @endphp
                <span class="badge {{ $badgeColor }} px-3 py-2">
                    {{ ucfirst($kategori->jenis) }}
                </span>
            </td>
            <td class="text-center">
                <span class="badge bg-light text-dark border px-3 py-2">
                    {{ $kategori->guru_count }} Guru
                </span>
            </td>
            <td class="pe-4 text-end">
                <div class="btn-group shadow-sm" style="border-radius: 8px; overflow: hidden;">
                    <a href="{{ route('admin.kategori-guru.edit', $kategori) }}"
                       class="btn btn-outline-primary btn-sm px-3"
                       title="Edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <form action="{{ route('admin.kategori-guru.destroy', $kategori) }}"
                          method="POST"
                          class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit"
                                class="btn btn-outline-danger btn-sm px-3"
                                onclick="return confirm('Apakah Anda yakin ingin menghapus kategori ini?')"
                                title="Hapus">
                            <i class="fas fa-trash"></i>
                        </button>
                    </form>
                </div>
            </td>
        </tr>
        @endforeach
    </x-corporate-table>
</div>

<style>
    /* Tambahan sedikit CSS agar tampilan lebih premium */
    .table thead th {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    .hover-bg-light:hover {
        background-color: #f8f9fa !important;
    }
    .btn-group .btn {
        padding: 0.4rem 0.8rem;
    }
</style>
@endsection