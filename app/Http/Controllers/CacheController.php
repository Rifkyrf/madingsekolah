<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CacheController extends Controller
{
    public function clear()
    {
        Cache::forget('osis_stats');
        Cache::forget('popular_works');
        Cache::forget('upcoming_events');
        
        return back()->with('success', 'Cache berhasil dibersihkan');
    }
}