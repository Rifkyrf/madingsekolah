<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Hakguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UsersImport;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            return redirect('/')->with('error', 'Akses ditolak.');
        }

        $query = User::with('hakguna')->withCount('works')->orderBy('role')->orderBy('name');

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%')
                  ->orWhere('nis', 'like', '%' . $search . '%');
            });
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Index', [
            'users' => $users,
            'filters' => request()->all('search')
        ]);
    }

    public function create()
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            return redirect('/')->with('error', 'Akses ditolak.');
        }
        $hakgunas = Hakguna::all();
        $kategoriGurus = \App\Models\KategoriGuru::all();
        return Inertia::render('Admin/Create', [
            'hakgunas' => $hakgunas,
            'kategoriGurus' => $kategoriGurus
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::user()->isAdmin()) abort(403);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'nis' => $request->role === 'guest' ? 'nullable' : 'required|unique:users',
            'role' => 'required|exists:hakguna,id',
            'kategori_guru_id' => 'nullable|exists:kategori_guru,id',
            'password' => 'required|string|min:6',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->nis = $request->role === 'guest' ? null : $request->nis;
        $user->role = $request->role;
        $user->kategori_guru_id = $request->kategori_guru_id;
        $user->password = Hash::make($request->password);
        $user->save();

        $hakguna = Hakguna::find($request->role);
        if ($hakguna) $user->syncRoles($hakguna->name);

        return redirect()->route('admin.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function edit($id)
    {
        if (!Auth::user()->isAdmin()) abort(403);
        
        $user = User::findOrFail($id);
        $hakgunas = Hakguna::all();
        $kategoriGurus = \App\Models\KategoriGuru::all();
        return Inertia::render('Admin/Edit', [
            'user' => $user,
            'hakgunas' => $hakgunas,
            'kategoriGurus' => $kategoriGurus
        ]);
    }

    public function update(Request $request, $id)
    {
        if (!Auth::user()->isAdmin()) abort(403);

        $user = User::findOrFail($id);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'nis' => $request->role === 'guest' ? 'nullable' : 'required|unique:users,nis,' . $id,
            'role' => 'required|exists:hakguna,id',
            'kategori_guru_id' => 'nullable|exists:kategori_guru,id',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->kategori_guru_id = $request->kategori_guru_id;
        $user->nis = $request->role === 'guest' ? null : $request->nis;

        if ($request->filled('password')) $user->password = Hash::make($request->password);

        $user->save();

        $hakguna = Hakguna::find($request->role);
        if ($hakguna) $user->syncRoles($hakguna->name);

        return redirect()->route('admin.index')->with('success', 'User berhasil diperbarui.');
    }

    public function destroy($id)
    {
        if (!Auth::user()->isAdmin()) abort(403);

        $user = User::findOrFail($id);
        if ($user->id === Auth::id()) return back()->with('error', 'Tidak bisa menghapus akun sendiri.');

        $user->delete();
        return redirect()->route('admin.index')->with('success', 'User berhasil dihapus.');
    }

    public function importForm()
    {
        if (!Auth::user()->isAdmin()) abort(403);
        
        return Inertia::render('Admin/Import', [
            'hakgunas' => Hakguna::all()
        ]);
    }

    public function import(Request $request)
    {
        if (!Auth::user()->isAdmin()) abort(403);

        $request->validate(['file' => 'required|mimes:xlsx,xls,csv']);

        try {
            Excel::import(new UsersImport, $request->file('file'));
            return redirect()->route('admin.index')->with('success', 'Data user berhasil diimpor.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }
}