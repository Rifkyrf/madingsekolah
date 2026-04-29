<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Mading;

class MadingPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Mading $mading): bool
    {
        return $mading->status === 'published' || 
               ($user && ($user->id === $mading->user_id || $user->isAdmin() || $user->isGuru()));
    }

    public function create(User $user): bool
    {
        return $user->isSiswa() || $user->isGuru() || $user->isAdmin();
    }

    public function update(User $user, Mading $mading): bool
    {
        return $user->id === $mading->user_id || $user->isAdmin() || $user->isGuru();
    }

    public function delete(User $user, Mading $mading): bool
    {
        return $user->id === $mading->user_id || $user->isAdmin() || $user->isGuru();
    }
}