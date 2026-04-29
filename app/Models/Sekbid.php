<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sekbid extends Model
{
    protected $fillable = ['nama', 'deskripsi', 'order'];

    public function anggota()
    {
        return $this->hasMany(OsisMember::class, 'nama_sekbid', 'nama');
    }
}
