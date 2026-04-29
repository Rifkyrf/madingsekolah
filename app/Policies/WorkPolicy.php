<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Work;

class WorkPolicy
{
    public function update(User $user, Work $work)
    {
        return $user->id === $work->user_id || $user->isAdmin() || $user->isGuru();
    }

    public function delete(User $user, Work $work)
    {
        return $user->id === $work->user_id || $user->isAdmin();
    }
}