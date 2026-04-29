<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Menampilkan profil publik pengguna.
     */
    public function show($id)
    {
        $user = User::with(['hakguna'])->findOrFail($id);

        $works = $user->works()->published()->latest()->get();
        // Categorize works for the frontend
        $categories = [
            'karya' => $works->where('type', 'karya'),
            'mading' => $works->where('type', 'mading'),
            'mingguan' => $works->where('type', 'mingguan'),
            'harian' => $works->where('type', 'harian'),
            'opini' => $works->where('type', 'opini'),
            'prestasi' => $works->where('type', 'prestasi'),
            'event' => $works->where('type', 'event'),
        ];

        return Inertia::render('Profile/Show', [
            'profileUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio,
                'profile_photo_url' => $user->profile_photo_url,
                'role_name' => $user->hakguna?->name,
                'is_own_profile' => Auth::id() === $user->id,
            ],
            'categories' => collect($categories)->map(fn($group) => $group->map(fn($w) => [
                'id' => $w->id,
                'title' => $w->title,
                'thumbnail_url' => $w->thumbnail_path ? asset('storage/' . $w->thumbnail_path) : null,
                'type' => $w->type,
                'created_at_human' => $w->created_at->diffForHumans(),
            ]))->toArray(),
            'allWorksCount' => $works->count(),
        ]);
    }

    /**
     * Menampilkan form edit profil.
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);

        if ($user->id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Profile/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'bio' => $user->bio,
                'profile_photo_url' => $user->profile_photo_url,
            ]
        ]);
    }

    /**
     * Memperbarui data profil.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($user->id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'bio' => 'nullable|string|max:500',
            'profile_photo' => 'nullable|image|max:2048',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'bio' => $request->bio,
        ]);

        if ($request->hasFile('profile_photo')) {
            if ($user->profile_photo) {
                Storage::disk('public')->delete($user->profile_photo);
            }
            $path = $request->file('profile_photo')->store('profile_photos', 'public');
            $user->update(['profile_photo' => $path]);
        }

        return redirect()->route('profile.show', $user->id)
                         ->with('success', 'Profil berhasil diperbarui!');
    }
}