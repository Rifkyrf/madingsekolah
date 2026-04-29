<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\OsisController;
use App\Http\Controllers\MadingController;
use App\Http\Controllers\OsisEventController;
use App\Http\Controllers\DashboardOsisController;
use App\Http\Controllers\DashboardMadingController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\DashboardController;
use App\Exports\ArticlesExport;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\GuruController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// API untuk WorkModal
Route::get('/api/works/{id}', function ($id) {
    $work = \App\Models\Work::published()->with(['user', 'likes'])->findOrFail($id);
    $comments = $work->comments()->with('user')->latest()->take(20)->get();
    $userLiked = auth()->check() && $work->likes()->where('user_id', auth()->id())->exists();
    return response()->json([
        'id' => $work->id,
        'title' => $work->title,
        'description' => $work->description,
        'file_path' => $work->file_path,
        'file_type' => $work->file_type,
        'likes_count' => $work->likes->count(),
        'created_at_formatted' => $work->created_at->format('d M Y'),
        'user_id' => $work->user_id,
        'userLiked' => $userLiked,
        'user' => $work->user ? [
            'id' => $work->user->id,
            'name' => $work->user->name,
            'profile_photo_url' => $work->user->profile_photo_url,
        ] : null,
        'comments' => $comments->map(fn($c) => [
            'id' => $c->id,
            'content' => $c->content,
            'user_id' => $c->user_id,
            'created_at_human' => $c->created_at->diffForHumans(),
            'user' => $c->user ? ['id' => $c->user->id, 'name' => $c->user->name, 'profile_photo_url' => $c->user->profile_photo_url] : null,
        ])->toArray(),
    ]);
});

// Landing Page (publik)
Route::get('/', [PageController::class, 'landing'])->name('home');

// Jurusan Routes - Route statis harus di atas route dinamis
Route::get('/jurusan', [App\Http\Controllers\JurusanController::class, 'index'])->name('jurusan.index');

// Halaman Jurusan Individual (route statis)
Route::get('/jurusan/pplg', [PageController::class, 'jurusanPplg'])->name('jurusan.pplg');
Route::get('/jurusan/bdp', [PageController::class, 'jurusanBdp'])->name('jurusan.bdp');
Route::get('/jurusan/akt', [PageController::class, 'jurusanAkt'])->name('jurusan.akt');
Route::get('/jurusan/dkv', [PageController::class, 'jurusanDkv'])->name('jurusan.dkv');
Route::get('/jurusan/anm', [PageController::class, 'jurusanAnm'])->name('jurusan.anm');

// Legacy routes (redirect)
Route::get('/jurusan/rpl', [PageController::class, 'jurusanRpl'])->name('jurusan.rpl');
Route::get('/jurusan/pemasaran', [PageController::class, 'jurusanPemasaran'])->name('jurusan.pemasaran');
Route::get('/jurusan/animasi', [PageController::class, 'jurusanAnimasi'])->name('jurusan.animasi');

// Route dinamis (harus di bawah route statis)
Route::get('/jurusan/{id}', [App\Http\Controllers\JurusanController::class, 'show'])->name('jurusan.show');

// Sejarah dan Visi Misi Routes
Route::get('/sejarah', [App\Http\Controllers\SejarahController::class, 'index'])->name('sejarah.index');
Route::get('/visi-misi', [App\Http\Controllers\SejarahController::class, 'visiMisi'])->name('visi-misi');

// Detail karya (publik) - GUNAKAN /works/ UNTUK SEMUA
Route::get('/works/{id}', [WorkController::class, 'show'])->name('work.show');
Route::get('/works/{work}/modal', [WorkController::class, 'showModal'])->name('work.modal');
// Route::get('/works/{id}', [WorkController::class, 'showg'])->name('work.showg');

// Like (butuh auth)
Route::post('/works/{work}/like', [LikeController::class, 'toggle'])->name('likes.toggle');

// Pencarian (publik)
Route::get('/search/results', function (\Illuminate\Http\Request $request) {
    $query = $request->get('q', '');
    $users = [];

    if (strlen($query) >= 2) {
        $users = \App\Models\User::where('name', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->orWhere('nis', 'like', "%{$query}%")
            ->select('id', 'name', 'profile_photo')
            ->limit(20)
            ->get();
    }

    return view('search.results', compact('users', 'query'));
})->name('search.results');

Route::get('/search/users', [SearchController::class, 'users'])->name('search.users');

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| Authenticated Routes (User & Admin)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    // Dashboard - redirect berdasarkan role
    Route::get('/dashboard', function() {
        if (auth()->user()->isOsis()) {
            return app(App\Http\Controllers\DashboardOsisController::class)->index();
        } elseif (auth()->user()->isMading()) {
            return app(App\Http\Controllers\DashboardMadingController::class)->index();
        } else {
            return app(App\Http\Controllers\WorkController::class)->index();
        }
    })->name('dashboard');

    // Dashboard khusus
    Route::get('/dashboard/osis', [App\Http\Controllers\DashboardOsisController::class, 'index'])->name('dashboard.osis');
    Route::get('/dashboard/mading', [App\Http\Controllers\DashboardMadingController::class, 'index'])->name('dashboard.mading');

    // // Edit - prototypr ajax
    // Route::get('/works/{work}/edit/form', [WorkController::class, 'editForm'])->name('work.edit.form');
    // Route::put('/works/{work}', [WorkController::class, 'update'])->name('work.update');

    // Delete
    Route::delete('/works/{work}', [WorkController::class, 'destroy'])->name('work.destroy');

    // edit dan update
    Route::get('/works/{work}/edit', [WorkController::class, 'edit'])->name('works.edit');
    Route::put('/works/{work}', [WorkController::class, 'update'])->name('works.update');

    // Komentar
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');

    // Profil
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/{id}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/work/{id}/edit', [WorkController::class, 'edit'])->name('work.edit');
});

Route::middleware(['auth'])->group(function () {
    // Upload - akses berdasarkan hakguna (bukan Spatie role)
    Route::get('/upload', [WorkController::class, 'create'])->name('upload.page');
    Route::post('/upload', [WorkController::class, 'store'])->name('upload.store');
    Route::get('/upload/form', [WorkController::class, 'create'])->name('upload.form.modal');
});

/*
|--------------------------------------------------------------------------
| Admin Only Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth','role:admin'])->group(function () {
    Route::post('/admin/cache/clear', [App\Http\Controllers\CacheController::class, 'clear'])->name('admin.cache.clear');
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/users/create', [AdminController::class, 'create'])->name('admin.create');
    Route::post('/admin/users', [AdminController::class, 'store'])->name('admin.store');
    Route::get('/admin/users/{id}/edit', [AdminController::class, 'edit'])->name('admin.edit');
    Route::put('/admin/users/{id}', [AdminController::class, 'update'])->name('admin.update');
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroy'])->name('admin.destroy');
    Route::get('/admin/import', [AdminController::class, 'importForm'])->name('admin.import.form');
    Route::post('/admin/import', [AdminController::class, 'import'])->name('admin.import');

    // Kategori Guru Routes
    Route::resource('admin/kategori-guru', App\Http\Controllers\KategoriGuruController::class, [
        'as' => 'admin'
    ]);

    // Clear cache after creating/updating events
    Route::post('/admin/cache/clear', [App\Http\Controllers\CacheController::class, 'clear'])->name('admin.cache.clear');

    // Recycle Bin Routes
    Route::get('/admin/recycle-bin', [App\Http\Controllers\Admin\RecycleBinController::class, 'index'])->name('admin.recycle-bin.index');
    Route::post('/admin/recycle-bin/restore/{model}/{id}', [App\Http\Controllers\Admin\RecycleBinController::class, 'restore'])->name('admin.recycle-bin.restore');
    Route::delete('/admin/recycle-bin/force-delete/{model}/{id}', [App\Http\Controllers\Admin\RecycleBinController::class, 'forceDelete'])->name('admin.recycle-bin.force-delete');
});
// OSIS Routes
Route::get('/osis', [App\Http\Controllers\OsisPublicController::class, 'index'])->name('osis.index');
Route::get('/osis/manage', [App\Http\Controllers\OsisController::class, 'manage'])->name('osis.manage');

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/osis', [App\Http\Controllers\OsisController::class, 'admin'])->name('osis.admin');
    Route::get('/admin/osis/create', [App\Http\Controllers\OsisController::class, 'create'])->name('osis.create');
    Route::post('/admin/osis', [App\Http\Controllers\OsisController::class, 'store'])->name('osis.store');
    Route::get('/admin/osis/{osis}/edit', [App\Http\Controllers\OsisController::class, 'edit'])->name('osis.edit');
    Route::put('/admin/osis/{osis}', [App\Http\Controllers\OsisController::class, 'update'])->name('osis.update');
    Route::delete('/admin/osis/{osis}', [App\Http\Controllers\OsisController::class, 'destroy'])->name('osis.destroy');
    Route::post('/admin/osis/update-order', [App\Http\Controllers\OsisController::class, 'updateOrder'])->name('osis.update-order');
    // Sekbid CRUD
    Route::get('/admin/sekbid', [App\Http\Controllers\SekbidController::class, 'index'])->name('sekbid.index');
    Route::post('/admin/sekbid', [App\Http\Controllers\SekbidController::class, 'store'])->name('sekbid.store');
    Route::put('/admin/sekbid/{sekbid}', [App\Http\Controllers\SekbidController::class, 'update'])->name('sekbid.update');
    Route::delete('/admin/sekbid/{sekbid}', [App\Http\Controllers\SekbidController::class, 'destroy'])->name('sekbid.destroy');
});

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);


Route::middleware(['web'])->group(function () {
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

// === Moderasi Draft (hanya admin & guru) ===
Route::middleware(['auth', 'role:admin,guru'])->prefix('moderasi')->group(function () {
    Route::get('/drafts', [WorkController::class, 'drafts'])->name('moderasi.drafts');
    Route::post('/{work}/publish', [WorkController::class, 'publish'])->name('moderasi.publish');
    Route::post('/{work}/unpublish', [WorkController::class, 'unpublish'])->name('moderasi.unpublish'); // Ganti ke POST

});

// Route untuk preview (diluar prefix moderasi agar tidak bentrok)
Route::middleware(['auth', 'role:admin,guru'])->get('/moderator/works/{work}', [WorkController::class, 'moderatorShow'])->name('moderator.show');

Route::get('/search/results', [SearchController::class, 'results'])->name('search.results');
Route::get('/search/users', [SearchController::class, 'users'])->name('search.users');
Route::get('/search/all', [SearchController::class, 'searchAll']);


// Route untuk dashboard statistik, hanya bisa diakses oleh dan admin
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/statistik', [DashboardController::class, 'index']) // Tambahkan namespace lengkap
        ->name('dashboard.statistik')
        ->middleware('role:admin'); // Pastikan role ini benar, atau ubah ke 'role:admin|guru'
    Route::get('/dashboard/export-excel', [DashboardController::class, 'exportExcel'])
        ->name('dashboard.export.excel')
        ->middleware('role:admin');
});

Route::put('/notifications/{notification}/read', [App\Http\Controllers\NotificationController::class, 'markAsRead'])->middleware('auth');
Route::get('/notifications/unread-count', [App\Http\Controllers\NotificationController::class, 'unreadCount'])->middleware('auth');
use App\Http\Controllers\PasswordResetController;


// Password Reset via otp
// Sistem Custom OTP Anda
Route::get('/password/otp/request', [PasswordResetController::class, 'showRequestForm'])->name('password.otp.request');
Route::post('/password/otp/send', [PasswordResetController::class, 'sendOtp'])->name('password.otp.send');

// Route untuk menampilkan form verifikasi OTP
Route::get('/password/otp/verify', [PasswordResetController::class, 'showVerifyForm'])->name('password.otp.verify');

// Route untuk memproses verifikasi OTP
Route::post('/password/otp/verify', [PasswordResetController::class, 'verifyOtp'])->name('password.otp.verify.submit');

Route::get('/password/otp/reset', [PasswordResetController::class, 'showResetForm'])->name('password.otp.reset.form');
Route::post('/password/otp/reset', [PasswordResetController::class, 'resetPassword'])->name('password.otp.update');


Route::get('/dashboard/export/pdf', [DashboardController::class, 'exportPdf'])->name('dashboard.export.pdf');

Route::get('/popular', [PageController::class, 'popular'])->name('popular');
Route::get('/guru', [PageController::class, 'guru'])->name('guru.landing');
Route::get('/events', [PageController::class, 'upcomingEvents'])->name('events.upcoming');
Route::get('/events/upcoming', [PageController::class, 'upcomingEvents'])->name('events.upcoming');

// Mading Digital Routes
Route::get('/mading', [App\Http\Controllers\MadingController::class, 'index'])->name('mading.index');
Route::get('/mading/canvas', [App\Http\Controllers\MadingController::class, 'canvas'])->name('mading.canvas');
Route::get('/mading/{mading}', [App\Http\Controllers\MadingController::class, 'show'])->name('mading.show');

// Test route for debugging
Route::get('/test-roles', function() {
    if (!auth()->check()) {
        return 'Not logged in';
    }

    $user = auth()->user();
    $hakguna = $user->hakguna;

    return [
        'user_name' => $user->name,
        'role_id' => $user->role,
        'hakguna' => $hakguna ? $hakguna->name : 'No hakguna',
        'isAdmin' => $user->isAdmin(),
        'isGuru' => $user->isGuru(),
        'isSiswa' => $user->isSiswa(),
    ];
})->middleware('auth');

Route::middleware(['auth', 'role:admin,guru,siswa,mading'])->group(function () {
    Route::get('/canvas', [App\Http\Controllers\MadingController::class, 'create'])->name('mading.create');
    Route::get('/mading/archive', [App\Http\Controllers\MadingController::class, 'archive'])->name('mading.archive');
    Route::get('/mading/editor', [App\Http\Controllers\MadingController::class, 'editor'])->name('mading.editor');
    Route::post('/mading', [App\Http\Controllers\MadingController::class, 'store'])->name('mading.store');
    Route::get('/mading/{mading}/edit', [App\Http\Controllers\MadingController::class, 'edit'])->name('mading.edit');
    Route::put('/mading/{mading}', [App\Http\Controllers\MadingController::class, 'update'])->name('mading.update');
    Route::delete('/mading/{mading}', [App\Http\Controllers\MadingController::class, 'destroy'])->name('mading.destroy');
    Route::post('/mading/{mading}/publish', [App\Http\Controllers\MadingController::class, 'publish'])->name('mading.publish');
    Route::post('/mading/{mading}/unpublish', [App\Http\Controllers\MadingController::class, 'unpublish'])->name('mading.unpublish');
});

// OSIS Event Routes
Route::middleware(['auth', 'role:admin,guru,osis'])->group(function () {
    Route::get('/osis/events', [App\Http\Controllers\OsisEventController::class, 'index'])->name('osis.events.index');
    Route::get('/osis/events/create', [App\Http\Controllers\OsisEventController::class, 'create'])->name('osis.events.create');
    Route::post('/osis/events', [App\Http\Controllers\OsisEventController::class, 'store'])->name('osis.events.store');
    Route::get('/osis/events/archive', [App\Http\Controllers\OsisEventController::class, 'archive'])->name('osis.events.archive');
    Route::get('/osis/events/{event}', [App\Http\Controllers\OsisEventController::class, 'show'])->name('osis.events.show');
    Route::get('/osis/events/{event}/edit', [App\Http\Controllers\OsisEventController::class, 'edit'])->name('osis.events.edit');
    Route::put('/osis/events/{event}', [App\Http\Controllers\OsisEventController::class, 'update'])->name('osis.events.update');
    Route::delete('/osis/events/{event}', [App\Http\Controllers\OsisEventController::class, 'destroy'])->name('osis.events.destroy');
});

// Public event calendar API
// API Data (JSON) - Tetap digunakan oleh FullCalendar
Route::get('/api/osis/events/calendar', [App\Http\Controllers\OsisEventController::class, 'calendar'])->name('osis.events.calendar');

// Halaman View Kalender
Route::view('/osis/events/view-calendar', 'osis.events.calendar')->name('osis.events.calendar.view');

// Enhanced OSIS Management Routes
Route::middleware(['auth', 'role:admin,guru'])->prefix('admin')->name('osis.management.')->group(function () {
    Route::get('/osis-management', [App\Http\Controllers\OsisManagementController::class, 'index'])->name('index');
    Route::get('/osis-management/create', [App\Http\Controllers\OsisManagementController::class, 'create'])->name('create');
    Route::post('/osis-management', [App\Http\Controllers\OsisManagementController::class, 'store'])->name('store');
    Route::get('/osis-management/{member}/edit', [App\Http\Controllers\OsisManagementController::class, 'edit'])->name('edit');
    Route::put('/osis-management/{member}', [App\Http\Controllers\OsisManagementController::class, 'update'])->name('update');
    Route::delete('/osis-management/{member}', [App\Http\Controllers\OsisManagementController::class, 'destroy'])->name('destroy');
});
