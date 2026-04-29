@extends('layouts.app')

@section('content')
    <div class="container-fluid py-4">
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 class="fw-bold mb-1">Kelola Anggota OSIS</h2>
                        <p class="text-muted">Manajemen data kepengurusan OSIS SMK Bakti Nusantara 666</p>
                    </div>
                    @can('create', App\Models\OsisMember::class)
                        <a href="{{ route('osis.management.create') }}" class="btn btn-primary shadow-sm">
                            <i class="fas fa-plus me-2"></i>Tambah Anggota
                        </a>
                    @endcan
                </div>
            </div>
        </div>

        <!-- Statistics Section -->
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <x-stats-card title="Total Anggota" value="{{ $stats['total'] }}" icon="users" color="primary"
                    :percentage="12" :up="true" />
            </div>
            <div class="col-md-3">
                <x-stats-card title="Seksi Bidang" value="{{ $stats['sekbid_count'] }}" icon="sitemap" color="success" />
            </div>
            <div class="col-md-3">
                <x-stats-card title="Angkatan Terbaru" value="{{ $stats['latest_angkatan'] }}" icon="graduation-cap"
                    color="warning" />
            </div>
            <div class="col-md-3">
                <x-stats-card title="Baru (7 Hari)" value="{{ $stats['recent_additions'] }}" icon="user-plus"
                    color="info" />
            </div>
        </div>

        <!-- Main Table Section -->
        <div class="row">
            <div class="col-12">
                <x-corporate-table id="osisTable" title="Daftar Pengurus OSIS">
                    <x-slot name="thead">
                        <tr>
                            <th class="ps-4">Foto</th>
                            <th>Nama Lengkap</th>
                            <th>Username</th>
                            <th>Angkatan</th>
                            <th>Seksi Bidang</th>
                            <th class="pe-4 text-end">Aksi</th>
                        </tr>
                    </x-slot>

                    @foreach ($members as $member)
                        <tr>
                            <td class="ps-4">
                                <img src="{{ $member->user->profile_photo_url }}" alt="{{ $member->nama }}"
                                    class="rounded-circle border" style="width: 45px; height: 45px; object-fit: cover;">
                            </td>
                            <td>
                                <div class="fw-bold text-dark">{{ $member->nama }}</div>
                                <small class="text-muted text-uppercase" style="font-size: 0.7rem;">ID:
                                    #{{ str_pad($member->id, 4, '0', STR_PAD_LEFT) }}</small>
                            </td>
                            <td>
                                <span class="badge bg-light text-primary border px-2 py-1">
                                    <i class="fas fa-at me-1"></i>{{ $member->user->name }}
                                </span>
                            </td>
                            <td><span class="fw-medium text-dark">{{ $member->angkatan }}</span></td>
                            <td>
                                <span class="badge bg-soft-primary text-primary px-3 py-2"
                                    style="background-color: rgba(13, 110, 253, 0.1); border-radius: 6px;">
                                    {{ $member->sekbid }}
                                </span>
                            </td>
                            <td class="pe-4 text-end">
                                <div class="btn-group shadow-sm" style="border-radius: 8px; overflow: hidden;">
                                    @can('update', $member)
                                        <a href="{{ route('osis.management.edit', $member) }}"
                                            class="btn btn-white btn-sm px-3 border-end" data-bs-toggle="tooltip"
                                            title="Edit">
                                            <i class="fas fa-edit text-primary"></i>
                                        </a>
                                    @endcan
                                    @can('delete', $member)
                                        <form action="{{ route('osis.management.destroy', $member) }}" method="POST"
                                            class="d-inline" onsubmit="return confirm('Yakin ingin menghapus anggota ini?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-white btn-sm px-3" data-bs-toggle="tooltip"
                                                title="Hapus">
                                                <i class="fas fa-trash text-danger"></i>
                                            </button>
                                        </form>
                                    @endcan
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </x-corporate-table>
            </div>
        </div>
    </div>
@endsection

@push('styles')
    <style>
        .bg-soft-primary {
            background-color: rgba(13, 110, 253, 0.1);
        }

        .btn-white {
            background: #fff;
            border: 1px solid #e5e7eb;
        }

        .btn-white:hover {
            background: #f9fafb;
            color: #000;
        }

        .table> :not(caption)>*>* {
            padding: 1rem 0.75rem;
        }
    </style>
@endpush
