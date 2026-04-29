@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="row">
        <div class="col-12">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="fw-bold text-primary mb-1">
                        <i class="fas fa-users-cog me-2"></i>Kelola OSIS
                    </h2>
                    <p class="text-muted mb-0">Manajemen anggota Organisasi Siswa Intra Sekolah</p>
                </div>
                
                <div class="d-flex gap-2">
                    <a href="{{ route('osis.index') }}" class="btn btn-outline-secondary">
                        <i class="fas fa-eye me-1"></i>Lihat Publik
                    </a>
                    <a href="{{ route('osis.create') }}" class="btn btn-primary">
                        <i class="fas fa-plus me-1"></i>Tambah Anggota
                    </a>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <div class="card bg-primary text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">Total Anggota</h6>
                                    <h3 class="mb-0">{{ $members->total() }}</h3>
                                </div>
                                <i class="fas fa-users fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="card bg-warning text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">Pengurus Inti</h6>
                                    <h3 class="mb-0">{{ $members->where('type', 'inti')->count() }}</h3>
                                </div>
                                <i class="fas fa-crown fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="card bg-info text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">Seksi Bidang</h6>
                                    <h3 class="mb-0">{{ $members->where('type', 'sekbid')->count() }}</h3>
                                </div>
                                <i class="fas fa-sitemap fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3">
                    <div class="card bg-success text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h6 class="card-title">Dengan Foto</h6>
                                    <h3 class="mb-0">{{ $members->whereNotNull('foto')->count() }}</h3>
                                </div>
                                <i class="fas fa-camera fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Members Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Daftar Anggota OSIS</h5>
                        <small class="text-muted">Drag & drop untuk mengubah urutan</small>
                    </div>
                </div>
                
                <div class="card-body p-0">
                    @if($members->count() > 0)
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th width="50">#</th>
                                        <th width="80">Foto</th>
                                        <th>Nama</th>
                                        <th>Role</th>
                                        <th>Type</th>
                                        <th>Sekbid</th>
                                        <th>Angkatan</th>
                                        <th width="120">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="sortable-members">
                                    @foreach($members as $member)
                                        <tr data-id="{{ $member->id }}" class="sortable-row">
                                            <td>
                                                <i class="fas fa-grip-vertical text-muted drag-handle"></i>
                                                {{ $member->order }}
                                            </td>
                                            <td>
                                                @if($member->foto)
                                                    <img src="{{ asset('storage/' . $member->foto) }}" 
                                                         class="rounded-circle" 
                                                         width="40" 
                                                         height="40" 
                                                         style="object-fit: cover;"
                                                         alt="{{ $member->nama }}">
                                                @else
                                                    <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                                                         style="width: 40px; height: 40px;">
                                                        <i class="fas fa-user text-white"></i>
                                                    </div>
                                                @endif
                                            </td>
                                            <td class="fw-medium">{{ $member->nama }}</td>
                                            <td>{{ $member->role }}</td>
                                            <td>
                                                <span class="badge {{ $member->type === 'inti' ? 'bg-warning' : 'bg-info' }}">
                                                    {{ ucfirst($member->type) }}
                                                </span>
                                            </td>
                                            <td>{{ $member->nama_sekbid ?? '-' }}</td>
                                            <td>{{ $member->angkatan }}</td>
                                            <td>
                                                <div class="btn-group btn-group-sm">
                                                    <a href="{{ route('osis.edit', $member) }}" 
                                                       class="btn btn-outline-warning"
                                                       title="Edit">
                                                        <i class="fas fa-edit"></i>
                                                    </a>
                                                    <form method="POST" 
                                                          action="{{ route('osis.destroy', $member) }}" 
                                                          class="d-inline">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit" 
                                                                class="btn btn-outline-danger"
                                                                onclick="return confirm('Yakin hapus anggota ini?')"
                                                                title="Hapus">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="p-3">
                            {{ $members->links() }}
                        </div>
                    @else
                        <div class="text-center py-5">
                            <i class="fas fa-users text-muted" style="font-size: 3rem;"></i>
                            <h5 class="text-muted mt-3">Belum ada anggota OSIS</h5>
                            <p class="text-muted">Mulai tambahkan anggota OSIS pertama.</p>
                            <a href="{{ route('osis.create') }}" class="btn btn-primary">
                                <i class="fas fa-plus me-1"></i>Tambah Anggota
                            </a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Include SortableJS -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>

<script>
// Initialize sortable
const sortable = Sortable.create(document.getElementById('sortable-members'), {
    handle: '.drag-handle',
    animation: 150,
    onEnd: function(evt) {
        const orders = Array.from(document.querySelectorAll('.sortable-row')).map(row => row.dataset.id);
        
        fetch('{{ route("osis.update-order") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ orders: orders })
        }).then(response => {
            if (response.ok) {
                // Update order numbers in UI
                document.querySelectorAll('.sortable-row').forEach((row, index) => {
                    row.querySelector('td:first-child').innerHTML = 
                        '<i class="fas fa-grip-vertical text-muted drag-handle"></i> ' + (index + 1);
                });
            }
        });
    }
});

// Add hover effect for drag handle
document.querySelectorAll('.drag-handle').forEach(handle => {
    handle.style.cursor = 'grab';
    handle.addEventListener('mousedown', () => {
        handle.style.cursor = 'grabbing';
    });
    handle.addEventListener('mouseup', () => {
        handle.style.cursor = 'grab';
    });
});
</script>

<style>
.sortable-row {
    transition: background-color 0.2s ease;
}

.sortable-row:hover {
    background-color: rgba(0, 123, 255, 0.05);
}

.drag-handle:hover {
    color: #007bff !important;
}

.sortable-ghost {
    opacity: 0.5;
    background-color: rgba(0, 123, 255, 0.1);
}
</style>
@endsection