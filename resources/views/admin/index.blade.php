@extends('layouts.app')

@section('title', 'Admin Dashboard')

@section('content')
<div class="container-fluid py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="mb-1"><i class="fas fa-cog me-2"></i>Admin Panel</h2>
            <p class="text-muted mb-0">Kelola semua data user</p>
        </div>
    </div>

    <x-corporate-table id="userTable" title="Daftar Semua User">
        <x-slot name="thead">
            <tr>
                <th class="ps-4">Nama</th>
                <th>Email</th>
                <th>NIS/NIP</th>
                <th>Role</th>
                <th class="text-center">Karya</th>
                <th class="pe-4 text-end">Aksi</th>
            </tr>
        </x-slot>

        @foreach($users as $user)
        <tr>
            <td class="ps-4 fw-medium text-dark">{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
            <td>{{ $user->nis ?? '-' }}</td>
            <td>
                @if($user->hakguna)
                    <span class="badge {{ $user->hakguna->name === 'admin' ? 'bg-secondary' : ($user->hakguna->name === 'guru' ? 'bg-primary' : ($user->hakguna->name === 'siswa' ? 'bg-success' : 'bg-warning text-dark')) }}">
                        {{ ucfirst($user->hakguna->name) }}
                    </span>
                @else
                    <span class="badge bg-danger">N/A</span>
                @endif
            </td>
            <td class="text-center">
                <span class="badge bg-soft-info text-info">{{ $user->works_count }}</span>
            </td>
            <td class="pe-4 text-end">
                <div class="btn-group shadow-sm" style="border-radius: 8px; overflow: hidden;">
                    <a href="{{ route('admin.edit', $user->id) }}" class="btn btn-outline-primary btn-sm px-3" title="Edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <form action="{{ route('admin.destroy', $user->id) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="button" class="btn btn-outline-danger btn-sm px-3 delete-confirm" title="Hapus">
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