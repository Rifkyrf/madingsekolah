<?php

namespace App\Http\Controllers;

use App\Models\OsisEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OsisEventController extends Controller
{
    public function index()
    {
        $events = auth()->user()->osisEvents()->latest()->paginate(10);
        
        return Inertia::render('Osis/Events/Index', [
            'events' => $events->through(fn($e) => [
                'id' => $e->id,
                'title' => $e->title,
                'description' => $e->description,
                'photo_url' => $e->photo ? asset('storage/' . $e->photo) : null,
                'event_date' => $e->event_date->format('Y-m-d'),
                'event_date_human' => $e->event_date->format('d M Y'),
                'is_past' => $e->event_date->isPast()
            ])
        ]);
    }

    public function create()
    {
        return Inertia::render('Osis/Events/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|max:2048',
            'event_date' => 'required|date'
        ]);

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'event_date' => $request->event_date,
            'user_id' => auth()->id()
        ];

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('osis-events', 'public');
        }

        OsisEvent::create($data);
        return redirect()->route('osis.events.index')->with('success', 'Event berhasil ditambahkan');
    }

    public function edit(OsisEvent $event)
    {
        return Inertia::render('Osis/Events/Edit', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'event_date' => $event->event_date->format('Y-m-d'),
                'photo_url' => $event->photo ? asset('storage/' . $event->photo) : null,
            ]
        ]);
    }

    public function update(Request $request, OsisEvent $event)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|max:2048',
            'event_date' => 'required|date'
        ]);

        $data = $request->only(['title', 'description', 'event_date']);

        if ($request->hasFile('photo')) {
            if ($event->photo) Storage::disk('public')->delete($event->photo);
            $data['photo'] = $request->file('photo')->store('osis-events', 'public');
        }

        $event->update($data);
        return redirect()->route('osis.events.index')->with('success', 'Event berhasil diupdate');
    }

    public function destroy(OsisEvent $event)
    {
        if ($event->photo) Storage::disk('public')->delete($event->photo);
        $event->delete();
        return redirect()->route('osis.events.index')->with('success', 'Event berhasil dihapus');
    }

    public function show(OsisEvent $event)
    {
        return Inertia::render('Osis/Events/Show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'event_date' => $event->event_date->format('d M Y'),
                'photo_url' => $event->photo ? asset('storage/' . $event->photo) : null,
                'creator_name' => $event->user?->name
            ]
        ]);
    }

    public function archive()
    {
        $events = auth()->user()->osisEvents()->past()->latest('event_date')->paginate(10);
        return Inertia::render('Osis/Events/Archive', [
            'events' => $events->through(fn($e) => [
                'id' => $e->id,
                'title' => $e->title,
                'event_date_human' => $e->event_date->format('d M Y'),
            ])
        ]);
    }

    public function calendar()
    {
        $events = OsisEvent::all()->map(fn($e) => [
            'id' => $e->id,
            'title' => $e->title,
            'start' => $e->event_date->format('Y-m-d'),
            'description' => $e->description,
            'url' => route('osis.events.show', $e->id)
        ]);
        return response()->json($events);
    }
}