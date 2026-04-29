<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hakguna extends Model
{
    protected $table = 'hakguna'; 

    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(User::class, 'role', 'id');
    }
}