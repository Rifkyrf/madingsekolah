<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MadingController extends Controller
{
    public function index()
    {
        $madings = Work::where('type', 'mading')
            ->where('status', 'published')
            ->with(['user:id,name'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Mading/Index', [
            'madings' => $madings->through(fn($m) => [
                'id' => $m->id,
                'title' => $m->title,
                'description' => $m->description,
                'thumbnail_url' => $m->thumbnail_path ? asset('storage/' . $m->thumbnail_path) : null,
                'user' => [
                    'name' => $m->user->name
                ],
                'created_at_human' => $m->created_at->diffForHumans()
            ])
        ]);
    }

    public function canvas()
    {
        return Inertia::render('Mading/Canvas');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|min:3',
            'content' => 'required|string|max:1000',
            'design_data' => 'required|string', // JSON string
            'status' => 'required|in:draft,published',
            'thumbnail' => 'nullable|image|max:2048'
        ]);

        try {
            DB::beginTransaction();

            $thumbnailPath = null;
            if ($request->hasFile('thumbnail')) {
                $thumbnailPath = $request->file('thumbnail')->store('mading/thumbnails', 'public');
            }

            $designData = json_decode($validated['design_data'], true);
            $filePath = 'mading/designs/' . time() . '_' . auth()->id() . '.json';

            $work = Work::create([
                'title' => $validated['title'],
                'description' => $validated['content'],
                'type' => 'mading',
                'status' => auth()->user()->isAdmin() || auth()->user()->isGuru() ? $validated['status'] : 'draft',
                'user_id' => auth()->id(),
                'file_path' => $filePath,
                'file_type' => 'json',
                'thumbnail_path' => $thumbnailPath,
                'design_data' => $designData
            ]);

            Storage::disk('public')->put($filePath, $validated['design_data']);

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Mading berhasil disimpan!', 'id' => $work->id]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show(Work $mading)
    {
        if ($mading->type !== 'mading') abort(404);

        if (!$mading->design_data && $mading->file_path) {
            $mading->design_data = json_decode(Storage::disk('public')->get($mading->file_path), true);
        }

        return Inertia::render('Mading/Show', [
            'mading' => [
                'id' => $mading->id,
                'title' => $mading->title,
                'description' => $mading->description,
                'design_data' => $mading->design_data,
                'user' => ['name' => $mading->user->name],
                'created_at_human' => $mading->created_at->diffForHumans()
            ]
        ]);
    }

    public function edit(Work $mading)
    {
        if ($mading->type !== 'mading' || (auth()->id() !== $mading->user_id && !auth()->user()->isAdmin())) {
            abort(403);
        }

        if (!$mading->design_data && $mading->file_path) {
            $mading->design_data = json_decode(Storage::disk('public')->get($mading->file_path), true);
        }

        return Inertia::render('Mading/Canvas', [
            'mading' => $mading
        ]);
    }

    public function update(Request $request, Work $mading)
    {
        if (auth()->id() !== $mading->user_id && !auth()->user()->isAdmin()) abort(403);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'design_data' => 'required|string',
            'status' => 'required|in:draft,published',
            'thumbnail' => 'nullable|image'
        ]);

        $mading->update([
            'title' => $validated['title'],
            'description' => $validated['content'],
            'design_data' => json_decode($validated['design_data'], true),
            'status' => auth()->user()->isAdmin() || auth()->user()->isGuru() ? $validated['status'] : 'draft',
        ]);

        if ($request->hasFile('thumbnail')) {
            $mading->update(['thumbnail_path' => $request->file('thumbnail')->store('mading/thumbnails', 'public')]);
        }

        Storage::disk('public')->put($mading->file_path, $validated['design_data']);

        return response()->json(['success' => true]);
    }

    public function destroy(Work $mading)
    {
        if (auth()->id() !== $mading->user_id && !auth()->user()->isAdmin()) abort(403);
        
        $mading->delete();
        return redirect()->route('mading.archive')->with('success', 'Mading dihapus.');
    }

    public function publish(Work $mading)
    {
        if (auth()->id() !== $mading->user_id && !auth()->user()->isAdmin() && !auth()->user()->isGuru()) abort(403);
        $mading->update(['status' => 'published']);
        return back()->with('success', 'Mading berhasil diterbitkan!');
    }

    public function unpublish(Work $mading)
    {
        if (auth()->id() !== $mading->user_id && !auth()->user()->isAdmin() && !auth()->user()->isGuru()) abort(403);
        $mading->update(['status' => 'draft']);
        return back()->with('success', 'Mading ditarik ke draft.');
    }

    public function archive()
    {
        $madings = Work::where('type', 'mading')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(12);

        return Inertia::render('Mading/Archive', [
            'madings' => $madings->through(fn($m) => [
                'id' => $m->id,
                'title' => $m->title,
                'status' => $m->status,
                'thumbnail_url' => $m->thumbnail_path ? asset('storage/' . $m->thumbnail_path) : null,
                'created_at_human' => $m->created_at->diffForHumans()
            ])
        ]);
    }
}