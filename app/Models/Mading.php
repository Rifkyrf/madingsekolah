<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mading extends Model
{
    use SoftDeletes;
    protected $table = 'mading';
    
    protected $fillable = [
        'title',
        'content', 
        'design_data',
        'thumbnail',
        'status',
        'user_id'
    ];

    protected $casts = [
        'design_data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }
}