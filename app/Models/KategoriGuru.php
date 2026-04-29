<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriGuru extends Model
{
    protected $table = 'kategori_guru';
    protected $fillable = ['nama', 'jenis', 'deskripsi'];

    public function guru()
    {
        return $this->hasMany(Guru::class);
    }
}