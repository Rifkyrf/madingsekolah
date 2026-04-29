@extends('layouts.app')

@section('title', 'Recycle Bin')

@section('content')
<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold mb-0"><i class="fas fa-trash-alt me-2 text-danger"></i> Recycle Bin</h2>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Dashboard</a></li>
                <li class="breadcrumb-item active">Recycle Bin</li>
            </ol>
        </nav>
    </div>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm mb-4" role="alert">
        <i class="fas fa-check-circle me-2"></i> {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    @endif

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="card-header bg-white py-3 border-bottom">
            <ul class="nav nav-pills card-header-pills" id="recycleTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-pill px-4" id="works-tab" data-bs-toggle="tab" data-bs-target="#works" type="button" role="tab">Karya ({{ $trashedWorks->count() }})</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill px-4" id="mading-tab" data-bs-toggle="tab" data-bs-target="#mading" type="button" role="tab">Mading ({{ $trashedMadings->count() }})</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill px-4" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab">Pengguna ({{ $trashedUsers->count() }})</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill px-4" id="events-tab" data-bs-toggle="tab" data-bs-target="#events" type="button" role="tab">Event ({{ $trashedEvents->count() }})</button>
                </li>
            </ul>
        </div>
        <div class="card-body p-0">
            <div class="tab-content" id="recycleTabContent">
                <!-- Works Tab -->
                <div class="tab-pane fade show active" id="works" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="ps-4">Item</th>
                                    <th>Penulis</th>
                                    <th>Dihapus</th>
                                    <th class="text-end pe-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($trashedWorks as $work)
                                <tr>
                                    <td class="ps-4">
                                        <div class="d-flex align-items-center">
                                            <img src="{{ $work->thumbnail_path ? asset('storage/'.$work->thumbnail_path) : asset('images/placeholder.png') }}" class="rounded me-3" width="50" height="50" style="object-fit: cover;">
                                            <div>
                                                <h6 class="mb-0 fw-bold">{{ $work->title }}</h6>
                                                <small class="text-muted">{{ $work->type_label }}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ $work->user->name }}</td>
                                    <td>{{ $work->deleted_at->diffForHumans() }}</td>
                                    <td class="text-end pe-4">
                                        <div class="d-flex justify-content-end gap-2">
                                            <form action="{{ route('admin.recycle-bin.restore', ['model' => 'work', 'id' => $work->id]) }}" method="POST">
                                                @csrf
                                                <button type="submit" class="btn btn-sm btn-outline-success rounded-pill px-3">
                                                    <i class="fas fa-undo me-1"></i> Pulihkan
                                                </button>
                                            </form>
                                            <form action="{{ route('admin.recycle-bin.force-delete', ['model' => 'work', 'id' => $work->id]) }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3 delete-confirm">
                                                    <i class="fas fa-trash me-1"></i> Hapus Permanen
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">Tidak ada data di keranjang sampah.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Mading Tab -->
                <div class="tab-pane fade" id="mading" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="ps-4">Judul</th>
                                    <th>Pembuat</th>
                                    <th>Dihapus</th>
                                    <th class="text-end pe-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($trashedMadings as $mading)
                                <tr>
                                    <td class="ps-4">{{ $mading->title }}</td>
                                    <td>{{ $mading->user->name }}</td>
                                    <td>{{ $mading->deleted_at->diffForHumans() }}</td>
                                    <td class="text-end pe-4">
                                        <div class="d-flex justify-content-end gap-2">
                                            <form action="{{ route('admin.recycle-bin.restore', ['model' => 'mading', 'id' => $mading->id]) }}" method="POST">
                                                @csrf
                                                <button type="submit" class="btn btn-sm btn-outline-success rounded-pill px-3">Pulihkan</button>
                                            </form>
                                            <form action="{{ route('admin.recycle-bin.force-delete', ['model' => 'mading', 'id' => $mading->id]) }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3 delete-confirm">Hapus Permanen</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">Tidak ada data.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Users Tab -->
                <div class="tab-pane fade" id="users" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="ps-4">Nama</th>
                                    <th>Email</th>
                                    <th>Dihapus</th>
                                    <th class="text-end pe-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($trashedUsers as $user)
                                <tr>
                                    <td class="ps-4">{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>{{ $user->deleted_at->diffForHumans() }}</td>
                                    <td class="text-end pe-4">
                                        <div class="d-flex justify-content-end gap-2">
                                            <form action="{{ route('admin.recycle-bin.restore', ['model' => 'user', 'id' => $user->id]) }}" method="POST">
                                                @csrf
                                                <button type="submit" class="btn btn-sm btn-outline-success rounded-pill px-3">Pulihkan</button>
                                            </form>
                                            <form action="{{ route('admin.recycle-bin.force-delete', ['model' => 'user', 'id' => $user->id]) }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3 delete-confirm">Hapus Permanen</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">Tidak ada data.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Events Tab -->
                <div class="tab-pane fade" id="events" role="tabpanel">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="ps-4">Event</th>
                                    <th>Tanggal Event</th>
                                    <th>Dihapus</th>
                                    <th class="text-end pe-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($trashedEvents as $event)
                                <tr>
                                    <td class="ps-4">{{ $event->title }}</td>
                                    <td>{{ $event->event_date->format('d M Y') }}</td>
                                    <td>{{ $event->deleted_at->diffForHumans() }}</td>
                                    <td class="text-end pe-4">
                                        <div class="d-flex justify-content-end gap-2">
                                            <form action="{{ route('admin.recycle-bin.restore', ['model' => 'event', 'id' => $event->id]) }}" method="POST">
                                                @csrf
                                                <button type="submit" class="btn btn-sm btn-outline-success rounded-pill px-3">Pulihkan</button>
                                            </form>
                                            <form action="{{ route('admin.recycle-bin.force-delete', ['model' => 'event', 'id' => $event->id]) }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-3 delete-confirm">Hapus Permanen</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="4" class="text-center py-5 text-muted">Tidak ada data.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .nav-pills .nav-link {
        color: #6c757d;
        font-weight: 500;
        transition: all 0.3s;
    }
    .nav-pills .nav-link.active {
        background-color: #0d6efd;
        color: white;
        box-shadow: 0 4px 10px rgba(13, 110, 253, 0.2);
    }
    .table thead th {
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #6c757d;
        border-bottom: none;
    }
    .table tbody td {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .btn-outline-success:hover {
        background-color: #198754;
        color: white;
    }
    .btn-outline-danger:hover {
        background-color: #dc3545;
        color: white;
    }
</style>
@endsection
