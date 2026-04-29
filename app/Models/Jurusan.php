<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jurusan extends Model
{
    protected $fillable = [
        'nama',
        'kode',
        'deskripsi',
        'foto',
        'prospek_kerja',
        'mata_pelajaran',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'mata_pelajaran' => 'array',
        'prospek_kerja' => 'array'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
