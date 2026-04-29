<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Illuminate\Http\Request;

class DashboardMadingController extends Controller
{
    public function index()
    {
        $stats = [
            'total_madings' => Work::where('type', 'mading')->count(),
            'published_madings' => Work::where('type', 'mading')->where('status', 'published')->count(),
            'draft_madings' => Work::where('type', 'mading')->where('status', 'draft')->count(),
            'my_madings' => Work::where('type', 'mading')->where('user_id', auth()->id())->count()
        ];

        $recentMadings = Work::where('type', 'mading')
            ->with('user')
            ->latest()
            ->limit(5)
            ->get();

        $myMadings = Work::where('type', 'mading')
            ->where('user_id', auth()->id())
            ->latest()
            ->limit(3)
            ->get();

        return \Inertia\Inertia::render('Dashboard/Mading', [
            'stats' => $stats,
            'myMadings' => $myMadings->map(fn($m) => [
                'id' => $m->id, 'title' => $m->title,
                'description' => $m->description,
                'status' => $m->status,
                'thumbnail_url' => $m->thumbnail_path ? asset('storage/'.$m->thumbnail_path) : null,
                'created_at_human' => $m->created_at->diffForHumans(),
            ]),
            'recentMadings' => $recentMadings->map(fn($m) => [
                'id' => $m->id, 'title' => $m->title,
                'description' => $m->description,
                'status' => $m->status,
                'thumbnail_url' => $m->thumbnail_path ? asset('storage/'.$m->thumbnail_path) : null,
                'creator_name' => $m->user?->name,
            ]),
        ]);
    }
}