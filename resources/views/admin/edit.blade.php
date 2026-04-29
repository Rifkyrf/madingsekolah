@extends('layouts.app')
@section('title', 'Edit User')
@section('content')
<div class="container py-4">
    <h2><i class="fas fa-user-edit"></i> Edit User</h2>
    <form action="{{ route('admin.update', $user->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label>Nama Lengkap</label>
            <input type="text" name="name" class="form-control" value="{{ old('name', $user->name) }}" required>
        </div>
        <div class="mb-3">
            <label>Email</label>
            <input type="email" name="email" class="form-control" value="{{ old('email', $user->email) }}" required>
        </div>
        <div class="mb-3" id="nisField" style="display: {{ old('role', $user->role) === 'guest' ? 'none' : 'block' }};">
            <label>NIS/NIP</label>
            <input type="text" name="nis" class="form-control" value="{{ old('nis', $user->nis) }}" {{ old('role', $user->role) === 'guest' ? '' : 'required' }}>
        </div>
        <div class="mb-3">
            <label>Role</label>
            <select name="role" class="form-control" id="roleSelect" required>
                @foreach($hakgunas as $hakguna)
                <option value="{{ $hakguna->id }}" {{ old('role', $user->role) == $hakguna->id ? 'selected' : '' }}>
                    {{ $hakguna->name }}
                </option>
                @endforeach
            </select>
        </div>
        <div class="mb-3" id="kategoriGuruField" style="display: {{ $user->isGuru() ? 'block' : 'none' }};">
            <label>Kategori Guru</label>
            <select name="kategori_guru_id" class="form-control">
                <option value="">-- Pilih Kategori --</option>
                @foreach($kategoriGurus as $kategori)
                    <option value="{{ $kategori->id }}" {{ old('kategori_guru_id', $user->kategori_guru_id) == $kategori->id ? 'selected' : '' }}>
                        {{ $kategori->nama }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label>Password Baru (kosongkan jika tidak ingin diubah)</label>
            <input type="password" name="password" class="form-control">
        </div>
        <div class="mb-3">
            <label>Konfirmasi Password</label>
            <input type="password" name="password_confirmation" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary update-confirm">Perbarui</button>
        <a href="{{ route('admin.index') }}" class="btn btn-secondary">Batal</a>
    </form>
</div>

<script>
function toggleFields() {
    const roleSelect = document.getElementById('roleSelect');
    const nisField = document.getElementById('nisField');
    const kategoriGuruField = document.getElementById('kategoriGuruField');
    const selectedText = roleSelect.options[roleSelect.selectedIndex].text.toLowerCase();

    // Toggle NIS field
    if (selectedText === 'guest') {
        nisField.style.display = 'none';
        nisField.querySelector('input').removeAttribute('required');
    } else {
        nisField.style.display = 'block';
        nisField.querySelector('input').setAttribute('required', '');
    }

    // Toggle Kategori Guru field
    if (selectedText === 'guru') {
        kategoriGuruField.style.display = 'block';
    } else {
        kategoriGuruField.style.display = 'none';
    }
}

document.getElementById('roleSelect').addEventListener('change', toggleFields);
document.addEventListener('DOMContentLoaded', toggleFields);
</script>

@if($errors->any())
    <script>
        Swal.fire({
            title: 'Error!',
            html: `
                <ul class="text-start" style="color: #dc3545; list-style: none; padding: 0; font-size: 0.9em;">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            `,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545'
        });
    </script>
@endif
@endsection