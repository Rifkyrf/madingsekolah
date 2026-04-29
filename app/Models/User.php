<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Work;
use App\Models\Hakguna;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'nis',
        'role', 
        'kategori_guru_id',
        'profile_photo',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function hakguna()
    {
        return $this->belongsTo(Hakguna::class, 'role');
    }

    public function works()
    {
        return $this->hasMany(Work::class);
    }

    public function notifications()
    {
        return $this->hasMany(\App\Models\Notification::class);
    }

    public function unreadNotifications()
    {
        return $this->notifications()->where('read_at', null);
    }

    public function isAdmin()
    {
        return $this->hakguna && $this->hakguna->name === 'admin';
    }

    public function isGuru()
    {
        return $this->hakguna && $this->hakguna->name === 'guru';
    }

    public function isSiswa()
    {
        return $this->hakguna && $this->hakguna->name === 'siswa';
    }

    public function isGuest()
    {
        return $this->hakguna && $this->hakguna->name === 'guest';
    }

    public function isOsis()
    {
        return $this->hakguna && $this->hakguna->name === 'osis';
    }

    public function isMading()
    {
        return $this->hakguna && $this->hakguna->name === 'mading';
    }

    public function getProfilePhotoUrlAttribute()
    {
        if ($this->profile_photo) {
            return asset('storage/' . $this->profile_photo);
        }
        return sprintf(
            'https://ui-avatars.com/api/?name=%s&background=0d47a1&color=fff&size=128',
            urlencode($this->name)
        );
    }

    public function guruData()
    {
        return $this->hasOne(\App\Models\Guru::class);
    }

    public function kategoriGuru()
    {
        return $this->belongsTo(KategoriGuru::class);
    }

    public function isPembinaOsis()
    {
        return $this->isGuru() && $this->kategoriGuru && $this->kategoriGuru->jenis === 'pembina';
    }

    public function osisEvents()
    {
        return $this->hasMany(OsisEvent::class);
    }

    public function madings()
    {
        return $this->hasMany(Mading::class);
    }
}