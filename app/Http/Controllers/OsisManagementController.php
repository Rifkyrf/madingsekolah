<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\OsisMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OsisManagementController extends Controller
{
    public function index()
    {
        // $this->authorize('viewAny', OsisMember::class);
        
        $stats = \Cache::remember('osis_stats', 600, function() {
            return [
                'total' => OsisMember::count(),
                'sekbid_count' => OsisMember::distinct('sekbid')->count(),
                'latest_angkatan' => OsisMember::max('angkatan') ?? '-',
                'recent_additions' => OsisMember::where('created_at', '>=', now()->subDays(7))->count()
            ];
        });

        $members = OsisMember::with('user')->latest()->get();
        
        return Inertia::render('Osis/Management/Index', [
            'members' => $members->map(fn($m) => [
                'id' => $m->id,
                'nama' => $m->nama,
                'angkatan' => $m->angkatan,
                'sekbid' => $m->sekbid,
                'user_name' => $m->user?->name,
                'profile_photo_url' => $m->user?->profile_photo_url,
            ]),
            'stats' => $stats
        ]);
    }

    public function create()
    {
        // $this->authorize('create', OsisMember::class);
        $siswaUsers = User::whereHas('hakguna', function($q) {
            $q->where('name', 'siswa');
        })->get(['id', 'name', 'nis']);
        
        return Inertia::render('Osis/Management/Create', [
            'siswaUsers' => $siswaUsers
        ]);
    }

    public function store(Request $request)
    {
        // $this->authorize('create', OsisMember::class);
        
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nama' => 'required|string|max:255',
            'angkatan' => 'required|string|max:10',
            'sekbid' => 'required|string|max:255'
        ]);

        OsisMember::create($request->all());

        return redirect()->route('osis.management.index')->with('success', 'Anggota OSIS berhasil ditambahkan');
    }

    public function edit(OsisMember $member)
    {
        // $this->authorize('update', $member);
        $siswaUsers = User::whereHas('hakguna', function($q) {
            $q->where('name', 'siswa');
        })->get(['id', 'name', 'nis']);

        return Inertia::render('Osis/Management/Edit', [
            'member' => $member,
            'siswaUsers' => $siswaUsers
        ]);
    }

    public function update(Request $request, OsisMember $member)
    {
        // $this->authorize('update', $member);
        
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nama' => 'required|string|max:255',
            'angkatan' => 'required|string|max:10',
            'sekbid' => 'required|string|max:255'
        ]);

        $member->update($request->all());

        return redirect()->route('osis.management.index')->with('success', 'Data anggota OSIS berhasil diupdate');
    }

    public function destroy(OsisMember $member)
    {
        // $this->authorize('delete', $member);
        $member->delete();
        return redirect()->route('osis.management.index')->with('success', 'Anggota OSIS berhasil dihapus');
    }
}