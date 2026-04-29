<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\User;
use App\Models\Comment;
use App\Models\Hakguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exports\ArticlesExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        if (!auth()->user()->isGuru() && !auth()->user()->isAdmin()) {
            abort(403, 'Akses ditolak.');
        }

        $draftCount = Work::draft()->count();
        $publishedCount = Work::published()->count();

        $fileTypeData = Work::select('file_type', DB::raw('count(*) as count'))
            ->whereNotNull('file_type')
            ->groupBy('file_type')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $contentTypeData = Work::select('content_type', DB::raw('count(*) as count'))
            ->whereNotNull('content_type')
            ->groupBy('content_type')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $roleData = Hakguna::withCount('users')->get();
        $totalUsers = User::count();
        $totalComments = Comment::count();

        $articlesQuery = Work::with('user')
            ->select('id', 'title', 'content_type', 'file_type', 'status', 'type', 'created_at', 'user_id');

        if ($search = request('search')) {
            $articlesQuery->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('content_type', 'like', '%' . $search . '%')
                  ->orWhere('file_type', 'like', '%' . $search . '%')
                  ->orWhere('status', 'like', '%' . $search . '%');
            });
        }

        $articles = $articlesQuery->latest()->paginate(10);

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'draftCount' => $draftCount,
                'publishedCount' => $publishedCount,
                'totalUsers' => $totalUsers,
                'totalComments' => $totalComments,
                'fileTypeData' => $fileTypeData,
                'contentTypeData' => $contentTypeData,
                'roleData' => $roleData
            ],
            'articles' => $articles->through(fn($a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content_type' => $a->content_type,
                'file_type' => $a->file_type,
                'status' => $a->status,
                'type' => $a->type,
                'created_at_human' => $a->created_at->diffForHumans(),
                'user_name' => $a->user?->name
            ]),
            'filters' => request()->all('search')
        ]);
    }

    public function exportExcel()
    {
        return Excel::download(new ArticlesExport(request()->only(['search', 'status', 'type'])), 'Laporan_Artikel_' . date('Y-m-d_His') . '.xlsx');
    }

    public function exportPdf(Request $request)
    {
        $articles = Work::with('user')->orderBy('created_at', 'desc')->get();
        $draftCount = Work::draft()->count();
        $publishedCount = Work::published()->count();

        $data = [
            'articles' => $articles,
            'draftCount' => $draftCount,
            'publishedCount' => $publishedCount,
        ];

        $pdf = Pdf::loadView('dashboard.pdf', $data);
        return $pdf->download('laporan_artikel_' . date('Y-m-d') . '.pdf');
    }
}