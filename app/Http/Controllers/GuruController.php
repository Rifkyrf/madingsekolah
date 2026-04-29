<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Guru;
use App\Models\Hakguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function index()
    {
        $guruList = User::where('role', 2)->with('kategoriGuru')->paginate(10);
        
        return Inertia::render('Admin/Guru/Index', [
            'guruList' => $guruList
        ]);
    }

    public function landing()
    {
        // Public list of teachers
        $guruList = User::whereHas('hakguna', fn($q) => $q->where('name', 'guru'))
            ->with(['kategoriGuru', 'hakguna'])->get();
            
        return Inertia::render('Pages/Guru', [
            'gurus' => $guruList
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Guru/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'nis' => 'nullable|string|unique:users,nis',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nis' => $request->nis ?: null,
            'role' => 2, // guru
        ]);

        return redirect()->route('admin.index')->with('success', 'Guru berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        if ($user->role != 2) {
            abort(404);
        }
        return Inertia::render('Admin/Guru/Edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        if ($user->role != 2) abort(404);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'nis' => 'nullable|string|unique:users,nis,' . $user->id,
        ]);

        $data = $request->only(['name', 'email', 'nis']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('admin.index')->with('success', 'Data guru berhasil diubah.');
    }

    public function destroy(User $user)
    {
        if ($user->role != 2) abort(404);
        $user->delete();
        return back()->with('success', 'Guru berhasil dihapus.');
    }
}