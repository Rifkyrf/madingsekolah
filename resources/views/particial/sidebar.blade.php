<div class="sidebar shadow-sm" id="sidebar">
    <div class="sidebar-header py-4 px-3 text-center">
        <div class="school-logo mb-3 mx-auto d-flex align-items-center justify-content-center">
            <img src="{{ asset('images/logo.png') }}" alt="Logo" style="width: 45px; height: 45px; object-fit: contain;"
                 onerror="this.src='https://ui-avatars.com/api/?name=BN&background=1a4b8c&color=fff'">
        </div>
        <div class="school-name fw-bold px-2">
            SMK BAKTI NUSANTARA 666
        </div>
    </div>

    <div class="sidebar-menu px-3">
        @auth
            {{-- LABEL: UTAMA --}}
            <div class="menu-label">Utama</div>

            @if(Auth::user()->isAdmin())
                <a href="{{ route('dashboard.statistik') }}" class="menu-item {{ request()->routeIs('dashboard.statistik') ? 'active' : '' }}">
                    <div class="menu-icon"><i class="fas fa-chart-pie"></i></div>
                    <div class="menu-text">Analitik</div>
                </a>
            @endif

            <a href="/dashboard" class="menu-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                <div class="menu-icon"><i class="fas fa-th-large"></i></div>
                <div class="menu-text">Beranda</div>
            </a>

            {{-- LABEL: KONTEN --}}
            @if(!Auth::user()->isGuest())
                <div class="menu-label mt-4">Konten & Moderasi</div>

                @if(Auth::user()->isAdmin() || Auth::user()->isGuru() || Auth::user()->isSiswa())
                    <a href="/upload" class="menu-item {{ request()->routeIs('upload*') ? 'active' : '' }}">
                        <div class="menu-icon"><i class="fas fa-plus-circle"></i></div>
                        <div class="menu-text">Upload Karya</div>
                    </a>
                @endif

                @if(Auth::user()->isGuru() || Auth::user()->isAdmin())
                <a href="{{ route('moderasi.drafts') }}" class="menu-item {{ request()->routeIs('moderasi*') ? 'active' : '' }}">
                    <div class="menu-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="menu-text">Moderasi</div>
                </a>
                @endif
            @endif

            {{-- LABEL: MANAJEMEN --}}
            @if(Auth::user()->isAdmin() || Auth::user()->isPembinaOsis() || Auth::user()->isOsis() || Auth::user()->isMading())
                <div class="menu-label mt-4">Manajemen</div>

                @if(Auth::user()->isAdmin() || Auth::user()->isPembinaOsis())
                    <a href="{{ route('osis.manage') }}" class="menu-item {{ request()->routeIs('osis.manage') ? 'active' : '' }}">
                        <div class="menu-icon"><i class="fas fa-user-tie"></i></div>
                        <div class="menu-text">Kelola OSIS</div>
                    </a>
                @endif

                @if(Auth::user()->isAdmin())
                    <a href="{{ route('admin.index') }}" class="menu-item {{ request()->routeIs('admin.index') ? 'active' : '' }}">
                        <div class="menu-icon"><i class="fas fa-users"></i></div>
                        <div class="menu-text">User & Guru</div>
                    </a>
                    <a href="{{ route('admin.recycle-bin.index') }}" class="menu-item {{ request()->routeIs('admin.recycle-bin.*') ? 'active' : '' }}">
                        <div class="menu-icon text-danger"><i class="fas fa-trash-alt"></i></div>
                        <div class="menu-text">Recycle Bin</div>
                    </a>
                @endif

                @if(Auth::user()->isOsis())
                    <a href="{{ route('osis.events.index') }}" class="menu-item {{ request()->routeIs('osis.events.*') ? 'active' : '' }}">
                        <div class="menu-icon"><i class="fas fa-calendar-alt"></i></div>
                        <div class="menu-text">Event OSIS</div>
                    </a>
                @endif

                @if(Auth::user()->isMading())
                    <a href="{{ route('mading.canvas') }}" class="menu-item {{ request()->routeIs('mading.*') ? 'active' : '' }}">
                        <div class="menu-icon"><i class="fas fa-paint-roller"></i></div>
                        <div class="menu-text">Mading Digital</div>
                    </a>
                @endif
            @endif

            {{-- AKUN --}}
            <div class="mt-5 pt-3 border-top">
                <a href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="menu-item text-danger">
                    <div class="menu-icon"><i class="fas fa-sign-out-alt"></i></div>
                    <div class="menu-text">Keluar</div>
                </a>
            </div>

        @else
            {{-- Guest Menu --}}
            <a href="/" class="menu-item mt-4">
                <div class="menu-icon"><i class="fas fa-home"></i></div>
                <div class="menu-text">Beranda Utama</div>
            </a>
            <a href="/login" class="menu-item mt-2 bg-primary text-white border-0">
                <div class="menu-icon"><i class="fas fa-sign-in-alt"></i></div>
                <div class="menu-text">Login Sistem</div>
            </a>
        @endauth
    </div>
</div>

<style>
    .sidebar {
        width: 280px; /* Samakan dengan app.css */
        height: 100vh;
        background: white;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1040; /* Di bawah Topbar (1050) */
        transition: transform 0.3s ease;
        border-right: 1px solid rgba(0,0,0,0.05);
        padding-top: 70px; /* PENTING: Setinggi Topbar agar header terlihat */
    }

    .sidebar-header {
        border-bottom: 1px solid #f8f9fa;
    }

    .school-name {
        font-size: 0.8rem;
        color: var(--primary);
        letter-spacing: 1px;
        line-height: 1.4;
    }

    .menu-label {
        font-size: 0.65rem;
        text-uppercase: uppercase;
        font-weight: 700;
        color: #adb5bd;
        margin-bottom: 10px;
        padding-left: 15px;
        letter-spacing: 0.5px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        text-decoration: none;
        color: #555;
        border-radius: 12px;
        margin-bottom: 4px;
        transition: all 0.2s ease;
    }

    .menu-item:hover {
        background: #f1f4f9;
        color: var(--primary);
        transform: translateX(4px);
    }

    .menu-item.active {
        background: var(--primary-light);
        color: var(--primary);
        font-weight: 600;
    }

    .menu-item.active i {
        color: var(--primary);
    }

    .menu-icon {
        width: 32px;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
    }

    .sidebar-menu {
        overflow-y: auto;
        height: calc(100vh - 100px);
        padding-top: 20px;
        padding-bottom: 50px;
    }

    /* Sembunyikan Scrollbar */
    .sidebar-menu::-webkit-scrollbar { display: none; }
    .sidebar-menu { -ms-overflow-style: none; scrollbar-width: none; }

    /* Responsive */
    @media (max-width: 991px) {
        .sidebar {
            transform: translateX(-100%);
        }
        .sidebar.open {
            transform: translateX(0);
        }
    }
</style>