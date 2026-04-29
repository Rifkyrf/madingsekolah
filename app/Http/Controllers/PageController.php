<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\User;
use App\Models\OsisEvent;
use Inertia\Inertia;

class PageController extends Controller
{
    public function landing()
    {
        $query = Work::published()->with('user');

        $type = request('type');
        if ($type && in_array($type, ['karya', 'mading', 'harian', 'mingguan', 'prestasi', 'opini', 'event'])) {
            $query->where('type', $type);
        }

        $works = $query->latest()->paginate(10);

        $popularWorks = cache()->remember('popular_works', 600, function () {
            return Work::published()->with('user:id,name,profile_photo')
                ->orderBy('created_at', 'desc')->limit(3)
                ->get(['id', 'title', 'description', 'thumbnail_path', 'type', 'created_at', 'user_id']);
        });

        $upcomingEvents = cache()->remember('upcoming_events', 300, function () {
            return OsisEvent::with('user:id,name')
                ->latest('event_date')->limit(5)
                ->get(['id', 'title', 'description', 'photo', 'event_date', 'user_id']);
        });

        return Inertia::render('Landing', [
            'works' => $works->through(fn($w) => $this->transformWork($w)),
            'popularWorks' => $popularWorks->map(fn($w) => $this->transformWork($w)),
            'upcomingEvents' => $upcomingEvents->map(fn($e) => [
                'id' => $e->id,
                'title' => $e->title,
                'description' => $e->description,
                'photo_url' => $e->photo ? asset('storage/' . $e->photo) : asset('images/default-event.jpg'),
                'event_date_formatted' => $e->event_date?->format('d M Y'),
                'creator_name' => $e->user?->name,
                'is_ongoing' => method_exists($e, 'isOngoing') ? $e->isOngoing() : false,
            ]),
            'filters' => ['type' => request('type', 'all')],
        ]);
    }

    public function popular()
    {
        $popularWorks = Work::published()->with('user')
            ->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Pages/Popular', [
            'works' => $popularWorks->through(fn($w) => $this->transformWork($w)),
        ]);
    }

    public function guru()
    {
        $gurus = User::whereHas('hakguna', fn($q) => $q->where('name', 'guru'))
            ->with(['kategoriGuru', 'hakguna'])->get();

        return Inertia::render('Pages/Guru', ['gurus' => $gurus]);
    }

    public function upcomingEvents()
    {
        $events = OsisEvent::with('user')->latest('event_date')->get();
        return Inertia::render('Pages/Events', [
            'events' => $events->map(fn($e) => [
                'id' => $e->id,
                'title' => $e->title,
                'description' => $e->description,
                'photo_url' => $e->photo ? asset('storage/' . $e->photo) : asset('images/default-event.jpg'),
                'event_date_formatted' => $e->event_date?->format('d M Y'),
                'creator_name' => $e->user?->name,
            ]),
        ]);
    }

    public function sejarah()
    {
        return Inertia::render('Pages/Sejarah');
    }

    public function visiMisi()
    {
        return Inertia::render('Pages/VisiMisi');
    }

    public function jurusanPplg() { return Inertia::render('Pages/Jurusan/Pplg'); }
    public function jurusanBdp() { return Inertia::render('Pages/Jurusan/Bdp'); }
    public function jurusanAkt() { return Inertia::render('Pages/Jurusan/Akt'); }
    public function jurusanDkv() { return Inertia::render('Pages/Jurusan/Dkv'); }
    public function jurusanAnm() { return Inertia::render('Pages/Jurusan/Anm'); }

    private function transformWork($work)
    {
        return [
            'id' => $work->id,
            'title' => $work->title,
            'description' => $work->description,
            'type' => $work->type,
            'type_label' => $work->type_label ?? ucfirst($work->type),
            'thumbnail_url' => $work->thumbnail_path ? asset('storage/' . $work->thumbnail_path) : null,
            'icon' => $work->icon ?? null,
            'created_at_human' => $work->created_at->diffForHumans(),
            'user' => $work->user ? [
                'id' => $work->user->id,
                'name' => $work->user->name,
                'profile_photo_url' => $work->user->profile_photo_url,
            ] : null,
        ];
    }
}