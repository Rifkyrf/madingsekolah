<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'nis' => $user->nis,
                    'role_name' => $user->hakguna?->name,
                    'profile_photo_url' => $user->profile_photo_url,
                    'is_admin' => $user->isAdmin(),
                    'is_guru' => $user->isGuru(),
                    'is_siswa' => $user->isSiswa(),
                    'is_guest' => $user->isGuest(),
                    'is_osis' => $user->isOsis(),
                    'is_mading' => $user->isMading(),
                    'is_pembina_osis' => $user->isPembinaOsis(),
                    'unread_notifications_count' => $user->unreadNotifications()->count(),
                    'notifications' => $user->notifications()->latest()->take(10)->get()->map(fn($n) => [
                        'id' => $n->id,
                        'title' => $n->title,
                        'message' => $n->message,
                        'url' => $n->url,
                        'read' => (bool) $n->read_at,
                        'created_at_human' => $n->created_at->diffForHumans(),
                    ])->toArray(),
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'ziggy' => [
                'location' => $request->url(),
            ],
        ];
    }
}
