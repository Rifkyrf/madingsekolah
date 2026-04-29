<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guru extends Model
{
    use SoftDeletes;
    // ✅ Tambahkan ini!
    protected $table = 'guru';

    protected $fillable = ['user_id', 'nip', 'kategori_guru_id'];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function kategori()
    {
        return $this->belongsTo(\App\Models\KategoriGuru::class, 'kategori_guru_id');
    }
}