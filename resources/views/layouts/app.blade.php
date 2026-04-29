<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMK Bakti Nusantara 666 - @yield('title')</title>

    <!-- Preload Critical Resources -->
    <link rel="icon" type="image/x-icon" href="{{ asset('images/logo.png') }}">

    <!-- Tailwind CSS (Direct high-performance utility library) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0d6efd',
                        secondary: '#6c757d',
                    }
                }
            }
        }
    </script>
    <link rel="preload" href="{{ asset('images/logo.png') }}" as="image">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        as="style">

    <!-- Critical CSS Inline -->
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa
        }

        .topbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 64px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
        }

        .sidebar {
            width: 288px;
            height: 100vh;
            background: white;
            position: fixed;
            top: 0;
            left: 0;
            padding-top: 64px;
            z-index: 999;
            transform: translateX(-100%);
            transition: transform 0.3s;
            border-right: 1px solid #e5e7eb;
            overflow-y: auto
        }

        .sidebar.open {
            transform: translateX(0)
        }

        .content {
            padding-top: 80px;
            padding-left: 24px;
            padding-right: 24px;
            padding-bottom: 40px;
            min-height: 100vh;
            transition: margin-left 0.3s
        }

        @media(min-width:1024px) {
            .sidebar {
                transform: translateX(0)
            }

            .content {
                margin-left: 288px
            }
        }

        .loading {
            opacity: 0.6;
            pointer-events: none
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.2s;
            border: 1px solid transparent;
            text-decoration: none
        }

        .btn-primary {
            background: #007bff;
            color: white;
            border-color: #007bff
        }

        .btn-primary:hover {
            background: #0056b3;
            border-color: #0056b3;
            color: white
        }

        .btn-success {
            background: #28a745;
            color: white;
            border-color: #28a745
        }

        .btn-warning {
            background: #ffc107;
            color: #212529;
            border-color: #ffc107
        }

        .btn-danger {
            background: #dc3545;
            color: white;
            border-color: #dc3545
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
            border-color: #6c757d
        }

        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            overflow: hidden
        }

        .card-body {
            padding: 24px
        }

        .card-header {
            padding: 16px 24px;
            border-bottom: 1px solid #e5e7eb;
            background: #f8f9fa
        }

        .form-control {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.2s
        }

        .form-control:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25)
        }
        .bg-soft-primary {
            background-color: rgba(13, 110, 253, 0.1) !important;
            color: #0d6efd !important;
        }

        .bg-soft-info {
            background-color: rgba(13, 202, 240, 0.1) !important;
            color: #0dcaf0 !important;
        }
    </style>

    <!-- Bootstrap CSS (Optimized) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" media="print"
        onload="this.media='all'">

    <!-- Font Awesome (Lazy Load) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"
        media="print" onload="this.media='all'">

    <!-- Google Fonts (Lazy Load) -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"
        media="print" onload="this.media='all'">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/mobile-bottom-nav.css') }}">

    <!-- Standard Corporate DataTables & Statistics -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    @stack('styles')
</head>

<body class="loaded">

    <!-- Preloader Section -->
    <div id="preloader" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700">
        <div class="relative">
            <img src="{{ asset('images/logo.png') }}" alt="Logo" class="w-32 h-32 animate-pulse mb-4 object-contain">
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 animate-[loading_1.5s_infinite]"></div>
            </div>
        </div>
        <p class="mt-4 text-blue-900 font-bold tracking-widest animate-pulse">SMK BAKTI NUSANTARA 666</p>
    </div>

    <style>
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        #preloader.loaded {
            opacity: 0;
            pointer-events: none;
        }
        body {
            overflow: hidden; /* Prevent scroll during preloader */
        }
        body.loaded {
            overflow: auto;
        }
    </style>

    <script>
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('loaded');
            document.body.classList.add('loaded');
            setTimeout(() => preloader.style.display = 'none', 700);
        });
    </script>

    <!-- Topbar -->
    <div class="topbar">
        <!-- Brand & Menu Toggle -->
        <div class="d-flex align-items-center">
            <button class="btn btn-outline-light me-3 d-lg-none" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            <a href="{{ route('dashboard') }}" class="topbar-brand">
                @if (file_exists(public_path('images/logo.png')))
                    <img src="{{ asset('images/logo.png') }}" alt="SMK Bakti Nusantara 666" class="topbar-logo" loading="lazy">
                @else
                    <i class="fas fa-school me-2"></i>
                @endif
                <span>SMK Bakti Nusantara 666</span>
            </a>
        </div>

        <!-- Search Bar (Desktop Only) -->
        <div class="search-bar d-none d-lg-block">
            <div class="container d-flex justify-content-center">
                <div class="position-relative" style="max-width: 500px; width: 100%;">
                    <div class="input-group search-input-group">
                        <span class="input-group-text bg-white border-0"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" id="desktopSearchInput" class="form-control search-input border-0"
                            placeholder="Cari pengguna, konten, atau informasi..." autocomplete="off">
                        <button class="btn btn-primary search-btn" id="desktopSearchButton" disabled>
                            <i class="fas fa-spinner fa-spin d-none" id="desktopSearchSpinner"></i>
                            Cari
                        </button>
                    </div>
                    <div id="desktopSearchResults" class="position-absolute bg-white shadow rounded mt-1 w-100"
                        style="z-index: 9999; display: none; max-height: 400px; overflow-y: auto;"></div>
                </div>
            </div>
        </div>

        <!-- Topbar Actions -->
        <div class="topbar-actions">
            <!-- Notifications Dropdown -->
            @if (Auth::check())
                <div class="dropdown">
                    <button class="btn btn-outline-light position-relative" type="button" id="notificationDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-bell"></i>
                        @if (Auth::user()->unreadNotifications()->count() > 0)
                            <span
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{ Auth::user()->unreadNotifications()->count() }}
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        @endif
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end notification-dropdown"
                        aria-labelledby="notificationDropdown" style="max-height: 400px; overflow-y: auto;">
                        @forelse (Auth::user()->notifications()->latest()->take(10)->get() as $notification)
                            <!-- Ambil 10 terbaru -->
                            <li class="notification-item {{ $notification->read ? '' : 'unread' }}">
                                <a class="dropdown-item d-flex justify-content-between align-items-center"
                                    href="{{ $notification->url ?? '#' }}"
                                    onclick="markAsRead('{{ $notification->id }}', this)">
                                    <div>
                                        <h6 class="mb-0">{{ $notification->title }}</h6>
                                        <small class="text-muted">{{ $notification->message }}</small><br>
                                        <small
                                            class="text-muted">{{ $notification->created_at->diffForHumans() }}</small>
                                    </div>
                                    @if (!$notification->read)
                                        <span class="badge bg-success rounded-pill">Baru</span>
                                    @endif
                                </a>
                            </li>
                        @empty
                            <li><a class="dropdown-item text-center text-muted" href="#">Tidak ada notifikasi</a>
                            </li>
                        @endforelse
                    </ul>
                </div>
            @endif

            <!-- User Profile Dropdown -->
            @if (Auth::check())
                <div class="dropdown ms-2"> <!-- Tambahkan margin kiri -->
                    <button class="btn p-0 border-0" type="button" data-bs-toggle="dropdown">
                        <img src="{{ Auth::user()->profile_photo
                            ? asset('storage/' . Auth::user()->profile_photo)
                            : 'https://ui-avatars.com/api/?name=' . urlencode(Auth::user()->name) . '&background=1a4b8c&color=fff&size=64' }}"
                            alt="Foto Profil" class="rounded-circle"
                            style="width: 40px; height: 40px; object-fit: cover; border: 2px solid rgba(255,255,255,0.5);"
                            loading="lazy">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li class="px-3 py-2 border-bottom">
                            <div class="d-flex align-items-center">
                                <img src="{{ Auth::user()->profile_photo
                                    ? asset('storage/' . Auth::user()->profile_photo)
                                    : 'https://ui-avatars.com/api/?name=' . urlencode(Auth::user()->name) . '&background=1a4b8c&color=fff&size=48' }}"
                                    class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;"
                                    loading="lazy">
                                <div>
                                    <div class="fw-bold">{{ Auth::user()->name }}</div>
                                    <small class="text-muted">{{ ucfirst(Auth::user()->role) }}</small>
                                </div>
                            </div>
                        </li>
                        <li><a class="dropdown-item" href="{{ route('profile.show', Auth::id()) }}"><i
                                    class="fas fa-user me-2"></i> Profil Saya</a></li>
                        <li><a class="dropdown-item" href="{{ route('dashboard') }}"><i
                                    class="fas fa-home me-2"></i> Beranda</a></li>
                        @if (Auth::user()->isAdmin())
                            <li><a class="dropdown-item" href="/admin"><i class="fas fa-cog me-2"></i> Admin
                                    Panel</a></li>
                        @endif
                        <!-- Ganti dropdown bersarang dengan satu item -->
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a href="{{ route('password.otp.request') }}">Reset via OTP</a> |
                            <a href="{{ route('password.request') }}">Reset via Email</a>
                        </li>
                        <!-- /Ganti dropdown bersarang -->
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item text-danger" href="{{ route('logout') }}"
                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <i class="fas fa-sign-out-alt me-2"></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            @endif
        </div>
    </div>



    @include('particial.sidebar')

    <!-- Overlay untuk Mobile Sidebar -->
    <div class="overlay" id="overlay"></div>

    <!-- Main Content -->
    <main class="content" id="mainContent">
        @yield('content')
    </main>

    <!-- Mobile Bottom Navigation -->
    @auth
        <nav class="mobile-bottom-nav d-lg-none">
            <a href="{{ route('dashboard') }}" class="nav-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                <i class="fas fa-home"></i>
                <span>Beranda</span>
            </a>
            {{-- Sembunyikan tombol upload jika user adalah Guest --}}
            @if (!Auth::user()->isGuest())
                <a href="{{ route('upload.store') }}"
                    class="nav-item {{ request()->routeIs('upload*') ? 'active' : '' }}">
                    <i class="fas fa-plus"></i>
                    <span>Upload</span>
                </a>
            @endif
            <a href="#" id="search-tab" class="nav-item">
                <i class="fas fa-search"></i>
                <span>Cari</span>
            </a>
            <a href="{{ route('profile.show', Auth::id()) }}"
                class="nav-item {{ request()->is('profile/*') ? 'active' : '' }}">
                <i class="fas fa-user"></i>
                <span>Profil</span>
            </a>
        </nav>
    @endauth

    <!-- Modal Pencarian (Mobile) -->
    <div class="search-modal" id="searchModal">
        <div class="search-header">
            <button class="btn btn-link text-dark" id="closeSearch">&times;</button>
            <input type="text" id="searchInput" class="form-control" placeholder="Cari pengguna...">
        </div>
        <div class="search-results" id="searchResults">
            <!-- Hasil akan dimuat di sini -->
        </div>
    </div>

    <!-- Logout Form -->
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>

    <!-- Scripts (Optimized Loading) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>

    <!-- Fabric.js untuk Mading Canvas (Conditional Load) -->
    @if (request()->routeIs('mading.*'))
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"></script>
    @endif
    @stack('canvas-scripts')

    <!-- App Scripts (Optimized) -->
    <script src="{{ asset('javascript/app.js') }}" defer></script>
    <script src="{{ asset('javascript/detail-karya.js') }}" defer></script>
    <script src="{{ asset('javascript/appn.js') }}" defer></script>

    <!-- SweetAlert2 (Lazy Load) -->
    <script>
        // Lazy load SweetAlert2 only when needed
        function loadSweetAlert(callback) {
            if (typeof Swal === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
                script.onload = callback;
                document.head.appendChild(script);
            } else {
                callback();
            }
        }

        // Show alerts only if needed
        @if (session('error'))
            loadSweetAlert(() => {
                Swal.fire({
                    title: 'Error!',
                    text: '{{ session('error') }}',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545'
                });
            });
        @endif

        @if ($errors->any())
            loadSweetAlert(() => {
                Swal.fire({
                    title: 'Gagal Validasi!',
                    html: `
                    <ul style="color: #dc3545; list-style: none; padding: 0; font-size: 0.9em; text-align: left;">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                `,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545'
                });
            });
        @endif

        @if (session('success'))
            loadSweetAlert(() => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: '{{ session('success') }}',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#28a745'
                });
            });
        @endif

        // Confirmation Handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Delete confirmation
            document.querySelectorAll('.delete-confirm').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const form = this.closest('form');
                    loadSweetAlert(() => {
                        Swal.fire({
                            title: 'Apakah yakin ingin hapus?',
                            text: "Data yang dihapus akan masuk ke Recycle Bin.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#dc3545',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Ya, Hapus!',
                            cancelButtonText: 'Tidak'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.submit();
                            }
                        });
                    });
                });
            });

            // Update confirmation
            document.querySelectorAll('.update-confirm').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const form = this.closest('form');
                    loadSweetAlert(() => {
                        Swal.fire({
                            title: 'Apakah anda yakin ingin update?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#007bff',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Ya, Update!',
                            cancelButtonText: 'Tidak'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.submit();
                            }
                        });
                    });
                });
            });

            // Add confirmation
            document.querySelectorAll('.add-confirm').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const form = this.closest('form');
                    loadSweetAlert(() => {
                        Swal.fire({
                            title: 'Anda ingin menambahkan ini?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#28a745',
                            cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Ya, Tambahkan!',
                            cancelButtonText: 'Tidak'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.submit();
                            }
                        });
                    });
                });
            });
        });
    </script>



    <!-- DataTables & ApexCharts (Global for professional tables) -->
    <script src="https://code.jquery.com/jquery-3.7.0.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js" defer></script>
    <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js" defer></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js" defer></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.bootstrap5.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js" defer></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js" defer></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js" defer></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js" defer></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/responsive.bootstrap5.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts" defer></script>

    @stack('scripts')
    @yield('scripts')
</body>

</html>
