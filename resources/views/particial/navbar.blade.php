<nav class="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar" id="mainNavbar">
    <div class="container">
        <a class="navbar-brand" href="{{ route('home') }}">
            @if(file_exists(public_path('images/logo.png')))
                <img src="{{ asset('images/logo.png') }}" alt="Logo" class="navbar-logo">
            @else
                <i class="fas fa-school me-2 text-warning"></i>
            @endif
            <span>SMK Bakti Nusantara 666</span>
        </a>

        <div class="ms-auto d-flex align-items-center">
            <ul class="navbar-nav d-none d-lg-flex flex-row gap-3 me-3">
                <li class="nav-item">
                    <a class="nav-link text-white fw-500" href="{{ route('home') }}">Beranda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white fw-500" href="{{ route('events.upcoming') }}">Event</a>
                </li>
            </ul>

            <div class="dropdown">
                <button class="btn-hamburger" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg animate slideIn">
                    <li class="d-lg-none"><a class="dropdown-item" href="{{ route('home') }}">Beranda</a></li>
                    <li class="d-lg-none"><a class="dropdown-item" href="{{ route('events.upcoming') }}">Event</a></li>
                    <li class="d-lg-none"><hr class="dropdown-divider"></li>
                    
                    <li class="dropdown-submenu">
                        <a class="dropdown-item dropdown-toggle" href="#">Jurusan</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="{{ route('jurusan.index') }}"><i class="fas fa-list me-2"></i>Semua Jurusan</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="{{ route('jurusan.pplg') }}"><i class="fas fa-code me-2"></i>PPLG</a></li>
                            <li><a class="dropdown-item" href="{{ route('jurusan.bdp') }}"><i class="fas fa-store me-2"></i>BDP</a></li>
                            <li><a class="dropdown-item" href="{{ route('jurusan.akt') }}"><i class="fas fa-calculator me-2"></i>AKT</a></li>
                            <li><a class="dropdown-item" href="{{ route('jurusan.dkv') }}"><i class="fas fa-palette me-2"></i>DKV</a></li>
                            <li><a class="dropdown-item" href="{{ route('jurusan.anm') }}"><i class="fas fa-play me-2"></i>ANM</a></li>
                        </ul>
                    </li>
                    <li><a class="dropdown-item" href="{{ route('sejarah.index') }}"><i class="fas fa-history me-2"></i>Sejarah</a></li>
                    <li><a class="dropdown-item" href="{{ route('visi-misi') }}"><i class="fas fa-eye me-2"></i>Visi & Misi</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="{{ route('osis.index') }}"><i class="fas fa-users me-2"></i>OSIS</a></li>
                    <li><a class="dropdown-item" href="{{ route('guru.landing') }}"><i class="fas fa-chalkboard-teacher me-2"></i>Guru</a></li>
                    @if(Auth::check())
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="/dashboard"><i class="fas fa-home me-2"></i>Dashboard</a></li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</nav>