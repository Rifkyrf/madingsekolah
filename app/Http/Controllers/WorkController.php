<?php

namespace App\Http\Controllers;

use App\Mail\DraftSubmitted;
use App\Mail\WorkPublished;
use App\Models\Notification;
use App\Models\User;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Inertia\Inertia;

class WorkController extends Controller
{
    /**
     * Tampilkan daftar karya yang dipublikasikan (halaman publik).
     */
    public function index()
    {
        $selectedType = request('type', 'all');
        $query = Work::published()->with('user');

        if ($selectedType !== 'all') {
            $query->where('type', $selectedType);
        } else {
            $query->whereIn('type', ['karya', 'mading', 'harian', 'mingguan', 'opini', 'prestasi', 'event']);
        }

        $works = $query->latest()->paginate(10);

        return Inertia::render('Dashboard/WorkIndex', [
            'works' => $works->through(fn($w) => $this->transformWork($w)),
            'selectedType' => $selectedType,
        ]);
    }

    /**
     * Tampilkan form upload.
     */
    public function create()
    {
        $types = [
            'karya' => 'Karya Siswa',
            'mading' => 'Mading Digital',
            'mingguan' => 'Mingguan',
            'harian' => 'Harian',
            'prestasi' => 'Prestasi',
            'opini' => 'Opini',
            'event' => 'Event',
        ];

        return Inertia::render('Works/Upload', ['types' => $types]);
    }

    /**
     * Simpan karya baru (default status = draft, kecuali untuk admin).
     */
    public function store(Request $request)
    {
        set_time_limit(0);
        ini_set('memory_limit', '512M');

        if (!Auth::check()) {
            return response()->json(['success' => false, 'message' => 'Silakan login.'], 401);
        }

        $user = Auth::user();
        $allowedRoles = ['admin', 'guru', 'siswa', 'mading'];
        if (!$user->hakguna || !in_array($user->hakguna->name, $allowedRoles)) {
            return response()->json(['success' => false, 'message' => 'Akses ditolak: Role tidak diizinkan untuk upload.'], 403);
        }

        // 1. Cek Apakah File Valid (Upload Sempurna)
        if ($request->hasFile('file') && !$request->file('file')->isValid()) {
            $error = $request->file('file')->getErrorMessage();
            return response()->json(['success' => false, 'message' => "File corrupt/terlalu besar: $error"], 422);
        }

        // 2. Validasi Input
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'file' => 'required|file|max:512000', // Limit 500MB
                'thumbnail' => 'nullable|image|max:10240', // Limit 10MB
                'type' => 'required|in:karya,mading,mingguan,harian,prestasi,opini,event',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        }

        $file = $request->file('file');
        $ext = strtolower($file->getClientOriginalExtension());
        $fileName = time() . '_' . uniqid() . '.' . $ext;
        
        // 3. Simpan File Utama (Paling Aman Tanpa Library Tambahan)
        try {
            $originalPath = $file->storeAs('uploads', $fileName, 'public');
        } catch (\Exception $e) {
            Log::error("Gagal simpan file utama: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menyimpan file ke server.'], 500);
        }

        // 4. Logika Thumbnail yang Sangat Aman
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            // Jika user upload thumbnail manual, prioritaskan ini
            $thumb = $request->file('thumbnail');
            $thumbExt = strtolower($thumb->getClientOriginalExtension());
            $thumbName = 'thumb_' . time() . '_' . uniqid() . '.' . $thumbExt;
            
            try {
                // COBA RESIZE HANYA JIKA GD TERSEDIA
                if (function_exists('imagecreatefromjpeg') && class_exists('Intervention\Image\ImageManager')) {
                    $manager = new ImageManager(new Driver());
                    $img = $manager->read($thumb);
                    $img->cover(400, 400);
                    $encoded = $img->encodeByExtension($thumbExt, quality: 70);
                    Storage::disk('public')->put('thumbnails/' . $thumbName, (string) $encoded);
                    $thumbnailPath = 'thumbnails/' . $thumbName;
                } else {
                    // Fallback: Simpan apa adanya tanpa resize
                    $thumbnailPath = $thumb->storeAs('thumbnails', $thumbName, 'public');
                }
            } catch (\Exception $e) {
                Log::warning("Gagal resize thumbnail: " . $e->getMessage() . ". Menggunakan fallback.");
                $thumbnailPath = $thumb->storeAs('thumbnails', $thumbName, 'public');
            }
        } 
        
        // 5. Jika Tidak Ada Thumbnail, Buat Placeholder/Gunakan File Utama
        if (!$thumbnailPath) {
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                $thumbnailPath = $originalPath; // Gunakan file asli sebagai thumbnail
            } else {
                $thumbnailPath = $this->getPlaceholderByExtension($ext);
            }
        }

        // 6. Simpan Data
        $status = Auth::user()->isAdmin() ? 'published' : 'draft';
        try {
            $work = Work::create([
                'title' => $request->title,
                'description' => $request->description,
                'file_path' => $originalPath,
                'file_type' => $ext,
                'content_type' => $this->determineContentType($ext),
                'mime_type' => $file->getMimeType(),
                'user_id' => Auth::id(),
                'thumbnail_path' => $thumbnailPath,
                'type' => $request->type,
                'status' => $status,
            ]);

            // Notifikasi (Opsional & Background)
            if ($status === 'draft') {
                $this->sendDraftNotifications($work);
            }

            return response()->json(['success' => true, 'message' => 'Karya berhasil diunggah!', 'work_id' => $work->id]);
        } catch (\Exception $e) {
            Log::error("Gagal simpan ke DB: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal menyimpan data ke database.'], 500);
        }
    }

    private function sendDraftNotifications($work)
    {
        try {
            $approvers = User::whereHas('hakguna', function ($q) {
                $q->whereIn('name', ['admin', 'guru']);
            })->get();

            foreach ($approvers as $approver) {
                Notification::create([
                    'user_id' => $approver->id,
                    'title' => 'Draft Baru: ' . $work->title,
                    'message' => 'Karya baru dari ' . $work->user->name . ' perlu dimoderasi.',
                    'type' => 'draft_submitted',
                    'url' => route('moderator.show', $work),
                ]);
                
                // Mail::to($approver->email)->send(new DraftSubmitted($work));
            }
        } catch (\Exception $e) {
            Log::error("Notifikasi gagal: " . $e->getMessage());
        }
    }
        /**
     * Update karya (NON AJAX).
     */
    public function update(Request $request, Work $work)
    {
        if (!Auth::check() || ($work->user_id !== Auth::id() && !Auth::user()->isAdmin())) {
            return response()->json(['success' => false, 'message' => 'Akses ditolak.'], 403);
        }

        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'type' => 'required|in:karya,mading,mingguan,harian,prestasi,opini,event',
                'file' => 'nullable|file|max:512000',
                'thumbnail' => 'nullable|image|max:10240',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'message' => 'Validasi gagal.', 'errors' => $e->errors()], 422);
        }

        // Update basic info
        $work->update([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
        ]);

        // Handle File Baru
        if ($request->hasFile('file')) {
            if ($work->file_path && Storage::disk('public')->exists($work->file_path)) {
                Storage::disk('public')->delete($work->file_path);
            }

            $file = $request->file('file');
            $ext = strtolower($file->getClientOriginalExtension());
            $fileName = time() . '_' . uniqid() . '.' . $ext;
            $filePath = $file->storeAs('uploads', $fileName, 'public');

            $work->update([
                'file_path' => $filePath,
                'file_type' => $ext,
                'content_type' => $this->determineContentType($ext),
                'mime_type' => $file->getMimeType(),
            ]);

            // Jika tidak ada thumbnail manual, update thumbnail placeholder/asli
            if (!$request->hasFile('thumbnail')) {
                if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'])) {
                    $work->update(['thumbnail_path' => $filePath]);
                } else {
                    $work->update(['thumbnail_path' => $this->getPlaceholderByExtension($ext)]);
                }
            }
        }

        // Handle Thumbnail Baru
        if ($request->hasFile('thumbnail')) {
            if ($work->thumbnail_path && Storage::disk('public')->exists($work->thumbnail_path) && !str_contains($work->thumbnail_path, 'icons/')) {
                Storage::disk('public')->delete($work->thumbnail_path);
            }

            $thumb = $request->file('thumbnail');
            $thumbExt = strtolower($thumb->getClientOriginalExtension());
            $thumbName = 'thumb_' . time() . '_' . uniqid() . '.' . $thumbExt;
            
            try {
                if (function_exists('imagecreatefromjpeg') && class_exists('Intervention\Image\ImageManager')) {
                    $manager = new ImageManager(new Driver());
                    $img = $manager->read($thumb);
                    $img->cover(400, 400);
                    $encoded = $img->encodeByExtension($thumbExt, quality: 70);
                    Storage::disk('public')->put('thumbnails/' . $thumbName, (string) $encoded);
                    $work->update(['thumbnail_path' => 'thumbnails/' . $thumbName]);
                } else {
                    $work->update(['thumbnail_path' => $thumb->storeAs('thumbnails', $thumbName, 'public')]);
                }
            } catch (\Exception $e) {
                Log::warning("Gagal update thumbnail: " . $e->getMessage());
                $work->update(['thumbnail_path' => $thumb->storeAs('thumbnails', $thumbName, 'public')]);
            }
        }

        return response()->json(['success' => true, 'message' => 'Karya berhasil diperbarui!']);
    }

    /**
     * Tampilkan form edit (halaman penuh).
     */
    public function edit($id)
    {
        $work = Work::with('user')->findOrFail($id);
        if ($work->user_id !== Auth::id() && ! Auth::user()->isAdmin()) {
            return redirect('/dashboard')->with('error', 'Tidak diizinkan.');
        }

        $types = [
            'karya' => 'Karya Siswa',
            'mading' => 'Mading Digital',
            'mingguan' => 'Mingguan',
            'harian' => 'Harian',
            'prestasi' => 'Prestasi',
            'opini' => 'Opini',
            'event' => 'Event',
        ];

        return Inertia::render('Works/Edit', [
            'work' => [
                'id' => $work->id,
                'title' => $work->title,
                'description' => $work->description,
                'type' => $work->type,
                'thumbnail_url' => $work->thumbnail_path ? asset('storage/' . $work->thumbnail_path) : null,
            ],
            'types' => $types,
        ]);
    }



    /**
     * Update karya.
     */
    // prototype untuk ajax
    // public function update1(Request $request, Work $work)
    // {
    //     if (!Auth::check() || ($work->user_id !== Auth::id() && !Auth::user()->isAdmin())) {
    //         return $request->expectsJson()
    //             ? response()->json(['success' => false, 'message' => 'Tidak diizinkan.'], 403)
    //             : redirect('/dashboard')->with('error', 'Tidak diizinkan.');
    //     }

    //     $allowedTypes = ['karya', 'mading', 'harian', 'mingguan'];

    //     $rules = [
    //         'title' => 'required|string|max:255',
    //         'description' => 'nullable|string|max:1000',
    //         'type' => ['required', Rule::in($allowedTypes)],
    //     ];

    //     if ($request->hasFile('file')) {
    //         $rules['file'] = 'required|file|max:512000';
    //     }
    //     if ($request->hasFile('thumbnail')) {
    //         $rules['thumbnail'] = 'nullable|image|max:2048';
    //     }

    //     $request->validate($rules, [
    //         'file.max' => 'File maksimal 500MB.',
    //         'thumbnail.max' => 'Thumbnail maksimal 2MB.',
    //     ]);

    //     $work->update([
    //         'title' => $request->title,
    //         'description' => $request->description,
    //         'type' => $request->type,
    //     ]);

    //     if ($request->hasFile('file')) {
    //         if ($work->file_path && Storage::disk('public')->exists($work->file_path)) {
    //             Storage::disk('public')->delete($work->file_path);
    //         }
    //         $newFile = $request->file('file');
    //         $extension = strtolower($newFile->getClientOriginalExtension());
    //         $work->update([
    //             'file_path' => $newFile->store('uploads', 'public'),
    //             'file_type' => $extension,
    //             'content_type' => $this->determineContentType($extension),
    //             'mime_type' => $newFile->getMimeType(),
    //         ]);
    //     }

    //     if ($request->hasFile('thumbnail')) {
    //         if ($work->thumbnail_path && Storage::disk('public')->exists($work->thumbnail_path)) {
    //             Storage::disk('public')->delete($work->thumbnail_path);
    //         }
    //         $work->update([
    //             'thumbnail_path' => $request->file('thumbnail')->store('thumbnails', 'public')
    //         ]);
    //     }

    //     return $request->expectsJson()
    //         ? response()->json(['success' => true, 'message' => 'Berhasil diperbarui!'])
    //         : redirect()->route('work.show', $work->id)->with('success', 'Berhasil diperbarui!');
    // }

    /**
     * Tampilkan detail karya (hanya published).
     */
    public function show($id)
    {
        $work = Work::published()->with(['user', 'likes'])->findOrFail($id);
        $comments = $work->comments()->with('user')->latest()->get();
        $userLiked = Auth::check() && $work->likes()->where('user_id', Auth::id())->exists();

        return Inertia::render('Works/Show', [
            'work' => [
                'id' => $work->id,
                'title' => $work->title,
                'description' => $work->description,
                'type' => $work->type,
                'type_label' => $work->type_label ?? ucfirst($work->type),
                'file_path' => $work->file_path,
                'file_type' => $work->file_type,
                'thumbnail_url' => $work->thumbnail_path ? asset('storage/' . $work->thumbnail_path) : null,
                'likes_count' => $work->likes->count(),
                'created_at_formatted' => $work->created_at->format('d M Y, H:i'),
                'user_id' => $work->user_id,
                'user' => $work->user ? [
                    'id' => $work->user->id,
                    'name' => $work->user->name,
                    'nis' => $work->user->nis,
                    'role_name' => $work->user->hakguna?->name,
                    'profile_photo_url' => $work->user->profile_photo_url,
                ] : null,
            ],
            'comments' => $comments->map(fn($c) => [
                'id' => $c->id,
                'content' => $c->content,
                'user_id' => $c->user_id,
                'created_at_human' => $c->created_at->diffForHumans(),
                'user' => $c->user ? [
                    'id' => $c->user->id,
                    'name' => $c->user->name,
                    'profile_photo_url' => $c->user->profile_photo_url,
                ] : null,
            ]),
            'userLiked' => $userLiked,
        ]);
    }

    /**
     * Tampilan modal detail (hanya published).
     */
    public function showModal(Work $work)
    {
        if ($work->status !== 'published') {
            abort(404);
        }

        $work->loadMissing('user');
        $likesCount = $work->likes()->count();
        $comments = $work->comments()->with('user')->latest()->limit(3)->get();
        $userLiked = Auth::check() && $work->likes()->where('user_id', Auth::id())->exists();

        return view('works._modal_content', compact('work', 'userLiked', 'comments', 'likesCount'));
    }

    /**
     * Hapus karya.
     */
    public function destroy(Work $work)
    {
        // 1. Proteksi akses
        if (! Auth::check() || ($work->user_id !== Auth::id() && ! Auth::user()->isAdmin() && ! Auth::user()->isguru())) {
            return redirect()->back()->with('error', 'Tidak diizinkan.');
        }

        // Simpan status sebelum dihapus untuk menentukan arah redirect (opsional)
        $isDraft = ($work->status === 'draft');

        // 2. Hapus file fisik
        if ($work->file_path && Storage::disk('public')->exists($work->file_path)) {
            Storage::disk('public')->delete($work->file_path);
        }
        if ($work->thumbnail_path && Storage::disk('public')->exists($work->thumbnail_path)) {
            // Hapus hanya jika bukan icon sistem
            if (!str_contains($work->thumbnail_path, 'icons/')) {
                Storage::disk('public')->delete($work->thumbnail_path);
            }
        }

        // 3. Hapus data dari database
        $work->delete();

        // 4. LOGIKA REDIRECT DINAMIS
        // Jika penghapusan dilakukan dari halaman yang memiliki referer (halaman sebelumnya)
        // back() akan mengembalikan user ke sana.
        return redirect()->back()->with('success', 'Karya berhasil dihapus!');
    }

    // === MODERASI (Admin & Guru) ===

    /**
     * Daftar draft untuk moderasi.
     */
    public function drafts(Request $request)
    {
        if (! Auth::check() || ! (Auth::user()->isAdmin() || Auth::user()->isGuru())) {
            abort(403);
        }

        $query = Work::draft()->with('user');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('user', fn($uq) => $uq->where('name', 'like', "%{$search}%"));
            });
        }

        $drafts = $query->latest()->paginate(15);

        return Inertia::render('Moderasi/Drafts', [
            'drafts' => $drafts->through(fn($w) => $this->transformWork($w, true)),
            'search' => $request->search,
        ]);
    }

    /**
     * Publish draft menjadi published.
     */
    public function publish(Work $work)
    {
        if (! Auth::check() || ! (Auth::user()->isAdmin() || Auth::user()->isGuru())) {
            abort(403);
        }

        if ($work->status !== 'draft') {
            return back()->with('error', 'Artikel ini sudah dipublikasikan.');
        }

        $work->update(['status' => 'published']);

        Log::info('Karya berhasil dipublikasikan, mencoba mengirim notifikasi WorkPublished', [
            'work_id' => $work->id,
            'work_title' => $work->title,
            'author_email' => $work->user->email,
        ]);

        // --- Tambahkan logika email untuk karya dipublikasikan ---
        try {
            Mail::to($work->user->email)
                ->send(new WorkPublished($work));
            Log::info('Email publikasi berhasil dikirim ke: '.$work->user->name.' ('.$work->user->email.')');
        } catch (\Exception $e) {
            Log::error('Gagal mengirim email publikasi ke '.$work->user->name.': '.$e->getMessage());
        }
        // --- Akhir tambahan email publikasi ---

        // --- Tambahkan logika notifikasi database untuk karya dipublikasikan ---
        Log::info('Menyimpan notifikasi database untuk publikasi karya', [
            'work_id' => $work->id,
            'work_title' => $work->title,
            'author_id' => $work->user_id,
        ]);

        // Simpan notifikasi ke database untuk penulis karya
        Notification::create([
            'user_id' => $work->user_id,
            'title' => 'Karya Dipublikasikan',
            'message' => 'Karya Anda "'.$work->title.'" telah berhasil dipublikasikan.',
            'type' => 'work_published',
            'url' => route('work.show', $work), // Ganti dengan route yang benar jika perlu
        ]);
        Log::info('Notifikasi database publikasi dibuat untuk penulis: '.$work->user->name);
        // --- Akhir tambahan notifikasi database publikasi ---

        return back()->with('success', 'Artikel berhasil dipublikasikan!');
    }

    /**
     * Unpublish karya menjadi draft.
     */
    public function unpublish(Work $work)
    {
        if (! Auth::check() || ! (Auth::user()->isAdmin() || Auth::user()->isGuru())) {
            abort(403);
        }

        if ($work->status !== 'published') {
            return back()->with('error', 'Artikel ini belum dipublikasikan.');
        }

        $work->update(['status' => 'draft']);

        // Logika notifikasi bisa ditambahkan di sini jika diperlukan
        // Contoh: Kirim notifikasi ke penulis bahwa karyanya tidak dipublikasikan

        return back()->with('success', 'Publikasi artikel berhasil dibatalkan dan dikembalikan ke draft.');
    }

    // === HELPER ===

    private function determineContentType($extension)
    {
        $map = [
            'image' => ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            'video' => ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'],
            'document' => ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt'],
            'code' => ['py', 'js', 'html', 'css', 'php', 'java', 'cpp', 'json', 'xml', 'yml', 'md'],
        ];

        foreach ($map as $type => $exts) {
            if (in_array($extension, $exts)) {
                return $type;
            }
        }

        return 'file';
    }

    /**
     * Tampilkan detail karya untuk moderator (bisa lihat draft juga).
     */
    public function moderatorShow(Work $work)
    {
        if (! Auth::check() || ! (Auth::user()->isAdmin() || Auth::user()->isGuru())) {
            abort(403);
        }

        $work->loadMissing('user');

        return Inertia::render('Moderasi/Preview', [
            'work' => $this->transformWork($work, true),
        ]);
    }

    private function transformWork($work, bool $withStatus = false): array
    {
        $data = [
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

        if ($withStatus) {
            $data['status'] = $work->status;
            $data['file_path'] = $work->file_path;
            $data['file_type'] = $work->file_type;
        }

        return $data;
    }

    private function getPlaceholderByExtension($extension)
    {
        $map = [
            'pdf'  => 'icons/pdf.png',
            'doc'  => 'icons/docx.png',
            'docx' => 'icons/docx.png',
            'xls'  => 'icons/excel.png',
            'xlsx' => 'icons/excel.png',
            'ppt'  => 'icons/powerpoint.png',
            'pptx' => 'icons/powerpoint.png',
            'php'  => 'icons/download.png',
            'html' => 'icons/html.png',
            'java' => 'icons/java.png',
            'js'   => 'icons/javascript.png',
            'mp4'  => 'icons/mp4.png',
            'rar'  => 'icons/rar.png',
            'zip'  => 'icons/rar.png',
            'txt'  => 'icons/txt.png', // format .txt
            'mov'  => 'icons/video.png',
            'avi'  => 'icons/video.png',
        ];

        return $map[$extension] ?? 'icons/txt.png'; // Default jika tidak ada
    }

}
