<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class OsisEvent extends Model
{
    use SoftDeletes;
    protected $fillable = ['title', 'description', 'photo', 'event_date', 'user_id'];
    
    protected $casts = ['event_date' => 'date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('event_date', '>=', Carbon::today());
    }

    public function scopePast($query)
    {
        return $query->where('event_date', '<', Carbon::today());
    }

    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }

    public function isOngoing()
    {
        return $this->event_date->isToday();
    }

    public function isPast()
    {
        return $this->event_date->isPast();
    }

    public function isUpcoming()
    {
        return $this->event_date->isFuture();
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}