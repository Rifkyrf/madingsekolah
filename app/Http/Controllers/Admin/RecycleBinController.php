<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Work;
use App\Models\Mading;
use App\Models\User;
use App\Models\OsisEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecycleBinController extends Controller
{
    public function index()
    {
        $trashedWorks = Work::onlyTrashed()->with('user:id,name')->get();
        $trashedMadings = Mading::onlyTrashed()->with('user:id,name')->get();
        $trashedUsers = User::onlyTrashed()->get();
        $trashedEvents = OsisEvent::onlyTrashed()->get();

        return Inertia::render('Admin/RecycleBin', [
            'trashedWorks' => $trashedWorks,
            'trashedMadings' => $trashedMadings,
            'trashedUsers' => $trashedUsers,
            'trashedEvents' => $trashedEvents
        ]);
    }

    public function restore($model, $id)
    {
        $modelClass = $this->getModelClass($model);
        if (!$modelClass) abort(404);

        $record = $modelClass::withTrashed()->findOrFail($id);
        $record->restore();

        return back()->with('success', 'Data berhasil dipulihkan!');
    }

    public function forceDelete($model, $id)
    {
        $modelClass = $this->getModelClass($model);
        if (!$modelClass) abort(404);

        $record = $modelClass::withTrashed()->findOrFail($id);
        
        if (in_array($model, ['work', 'mading'])) {
            if ($record->file_path) \Storage::disk('public')->delete($record->file_path);
            if ($record->thumbnail_path && !str_contains($record->thumbnail_path, 'icons/')) {
                \Storage::disk('public')->delete($record->thumbnail_path);
            }
        }

        $record->forceDelete();

        return back()->with('success', 'Data berhasil dihapus permanen!');
    }

    private function getModelClass($model)
    {
        return match ($model) {
            'work' => Work::class,
            'mading' => Mading::class,
            'user' => User::class,
            'event' => OsisEvent::class,
            default => null,
        };
    }
}
