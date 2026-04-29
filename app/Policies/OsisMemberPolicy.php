<?php

namespace App\Policies;

use App\Models\User;
use App\Models\OsisMember;

class OsisMemberPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isGuru();
    }

    public function view(User $user, OsisMember $osisMember): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isGuru();
    }

    public function update(User $user, OsisMember $osisMember): bool
    {
        return $user->isAdmin() || $user->isGuru();
    }

    public function delete(User $user, OsisMember $osisMember): bool
    {
        return $user->isAdmin() || $user->isGuru();
    }
}