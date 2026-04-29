@extends('layouts.app')

@section('title', 'Moderasi Karya')

@section('content')
<div class="container">
    <h2 class="mb-4">Moderasi Karya</h2>

    <!-- Form Pencarian -->
    <form method="GET" action="{{ route('moderasi.drafts') }}" class="mb-4">
        <div class="input-group">
            <input type="text" name="search" class="form-control" placeholder="Cari berdasarkan judul, penulis, atau tipe..." value="{{ request('search') }}">
            <button class="btn btn-outline-secondary" type="submit">Cari</button>
            @if(request('search'))
                <a href="{{ route('moderasi.drafts') }}" class="btn btn-outline-secondary">Clear</a>
            @endif
        </div>
    </form>

    <!-- Tampilkan Notifikasi Baru di sini -->
    @if(Auth::check() && (Auth::user()->isAdmin() || Auth::user()->isGuru()))
        @php
            $newDraftNotifications = Auth::user()->unreadNotifications()->where('type', 'App\Notifications\DraftSubmitted')->get();
        @endphp
        @if($newDraftNotifications->count() > 0)
            <div class="alert alert-info alert-dismissible fade show mb-4" role="alert">
                <strong>Ada {{ $newDraftNotifications->count() }} draft baru!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif
    @endif

    <x-corporate-table id="moderationTable" title="Moderasi Karya">
        <x-slot name="thead">
            <tr>
                <th class="ps-4">Judul & Thumbnail</th>
                <th>Penulis</th>
                <th>Kategori</th>
                <th>Status</th>
                <th class="pe-4 text-end">Aksi</th>
            </tr>
        </x-slot>

        @foreach($works as $work)
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    @if($work->thumbnail_path)
                        <img src="{{ asset('storage/' . $work->thumbnail_path) }}"
                             alt="Thumbnail" class="rounded me-3"
                             style="width: 50px; height: 50px; object-fit: cover;">
                    @else
                        <div class="bg-light rounded me-3 d-flex align-items-center justify-content-center"
                             style="width: 50px; height: 50px;">
                            <i class="fas fa-image text-muted opacity-50"></i>
                        </div>
                    @endif
                    <div>
                        <h6 class="mb-0 fw-bold text-dark">{{ Str::limit($work->title, 40) }}</h6>
                        <small class="text-muted">{{ Str::limit($work->description, 60) }}</small>
                    </div>
                </div>
            </td>
            <td>
                <div class="fw-medium text-dark">{{ $work->user->name }}</div>
                <small class="text-muted text-uppercase" style="font-size: 0.7rem;">{{ $work->user->role }}</small>
            </td>
            <td>
                <span class="badge bg-soft-primary text-primary px-3 py-2">{{ $work->type_label }}</span>
            </td>
            <td>
                <span class="badge {{ $work->status === 'draft' ? 'bg-warning text-dark' : ($work->status === 'published' ? 'bg-success' : 'bg-secondary') }} px-3 py-2">
                    {{ ucfirst($work->status) }}
                </span>
            </td>
            <td class="pe-4 text-end">
                <div class="btn-group shadow-sm" style="border-radius: 8px; overflow: hidden;">
                    <a href="{{ route('moderator.show', $work) }}" class="btn btn-outline-primary btn-sm px-3" title="Detail">
                        <i class="fas fa-eye"></i>
                    </a>
                    @if($work->status === 'draft')
                        <form action="{{ route('moderasi.publish', $work) }}" method="POST" class="d-inline">
                            @csrf
                            <button type="submit" class="btn btn-outline-success btn-sm px-3" title="Publish" onclick="return confirm('Publikasikan artikel ini?')">
                                <i class="fas fa-check"></i>
                            </button>
                        </form>
                    @else
                        <form action="{{ route('moderasi.unpublish', $work) }}" method="POST" class="d-inline">
                            @csrf
                            <button type="submit" class="btn btn-outline-warning btn-sm px-3" title="Unpublish" onclick="return confirm('Batalkan publikasi artikel ini?')">
                                <i class="fas fa-times text-dark"></i>
                            </button>
                        </form>
                    @endif
                    <form action="{{ route('work.destroy', $work) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-outline-danger btn-sm px-3" title="Hapus" onclick="return confirm('Apakah Anda yakin ingin menghapus permanen karya ini?')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </form>
                </div>
            </td>
        </tr>
        @endforeach
    </x-corporate-table>
</div>
@endsection

@push('styles')
<style>
    .table th,
    .table td {
        vertical-align: middle;
        padding: 1rem;
    }

    .btn i {
        font-size: 0.9em;
    }

    @media (max-width: 576px) {
        .table thead {
            display: none;
        }

        .table tbody tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 0.75rem;
            background-color: #fff;
        }

        .table tbody td {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border: none;
        }

        .table tbody td:before {
            content: attr(data-label);
            font-weight: bold;
            min-width: 100px;
        }
    }
</style>
@endpush