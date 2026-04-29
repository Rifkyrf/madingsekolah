<?php

namespace App\Http\Controllers;

use App\Models\OsisEvent;
use App\Models\OsisMember;
use App\Models\Work;
use Illuminate\Http\Request;

class DashboardOsisController extends Controller
{
    public function index()
    {
        $stats = cache()->remember('osis_stats', 300, function () {
            return [
                'total_events' => OsisEvent::count(),
                'upcoming_events' => OsisEvent::upcoming()->count(),
                'ongoing_events' => OsisEvent::whereDate('event_date', today())->count(),
                'past_events' => OsisEvent::past()->count()
            ];
        });

        $recentEvents = OsisEvent::with('user:id,name')
            ->latest()
            ->limit(5)
            ->get(['id', 'title', 'description', 'event_date', 'user_id']);

        $upcomingEvents = OsisEvent::upcoming()
            ->with('user:id,name')
            ->limit(3)
            ->get(['id', 'title', 'description', 'event_date', 'user_id']);

        return \Inertia\Inertia::render('Dashboard/Osis', [
            'stats' => $stats,
            'recentEvents' => $recentEvents->map(fn($e) => [
                'id' => $e->id, 'title' => $e->title,
                'description' => $e->description,
                'event_date' => $e->event_date?->format('d M Y'),
                'creator_name' => $e->user?->name,
            ]),
            'upcomingEvents' => $upcomingEvents->map(fn($e) => [
                'id' => $e->id, 'title' => $e->title,
                'description' => $e->description,
                'event_date' => $e->event_date?->format('d M Y'),
                'creator_name' => $e->user?->name,
            ]),
        ]);
    }
}