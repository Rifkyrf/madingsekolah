import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

function Logo({ isTransparent }) {
    return (
        <div className="flex items-center gap-2.5 group">
            <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <span className={cn('text-sm md:text-lg font-black tracking-tight', !isTransparent ? 'text-blue-600' : 'text-white')}>
                SMK BAKTI NUSANTARA 666
            </span>
        </div>
    );
}

function PublicNavbar({ transparentHeader = false }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Beranda', href: '/' },
        { label: 'Jurusan', href: '/jurusan' },
        { label: 'Event', href: '/events' },
        { label: 'Karya Siswa', href: '/popular' },
        { label: 'Guru', href: '/guru' },
        { label: 'OSIS', href: '/osis' },
    ];

    const isTransparent = transparentHeader && !scrolled;

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
            !isTransparent
                ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-2'
                : 'bg-transparent py-4'
        )}>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <Link href="/">
                    <Logo isTransparent={isTransparent} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-2">
                    <Link href="/" className={cn('px-3 py-1.5 rounded-lg text-sm font-semibold transition-all', !isTransparent ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')}>Beranda</Link>
                    
                    {/* Jurusan Dropdown */}
                    <div className="relative group">
                        <button className={cn('flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all', !isTransparent ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')}>
                            Jurusan <ChevronDown className="h-3 w-3" />
                        </button>
                        <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 flex flex-col">
                                <Link href="/jurusan/pplg" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50">RPL</Link>
                                <Link href="/jurusan/bdp" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50">BDP</Link>
                                <Link href="/jurusan/akt" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50">AKT</Link>
                                <Link href="/jurusan/anm" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50">ANM</Link>
                                <Link href="/jurusan/dkv" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50">DKV</Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/events" className={cn('px-3 py-1.5 rounded-lg text-sm font-semibold transition-all', !isTransparent ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')}>Event</Link>
                    <Link href="/popular" className={cn('px-3 py-1.5 rounded-lg text-sm font-semibold transition-all', !isTransparent ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')}>Karya Siswa</Link>
                    <Link href="/guru" className={cn('px-3 py-1.5 rounded-lg text-sm font-semibold transition-all', !isTransparent ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')}>Guru</Link>
                    <Link href="/osis" className={cn('px-3 py-1.5 rounded-lg text-sm font-semibold transition-all', !isTransparent ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')}>OSIS</Link>
                    
                    <div className="w-px h-4 bg-slate-300/40 mx-2" />
                    {auth?.user && (
                        <Link href="/dashboard">
                            <Button size="sm" className="rounded-xl px-4 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
                                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    className={cn('lg:hidden h-9 w-9 rounded-lg flex items-center justify-center', !isTransparent ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white')}
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-xl p-4">
                    <div className="flex flex-col gap-1">
                        <Link href="/" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setOpen(false)}>Beranda</Link>
                        <div className="px-4 py-1 flex items-center justify-between text-sm font-semibold text-slate-400 uppercase tracking-widest mt-2">Jurusan</div>
                        <div className="grid grid-cols-2 gap-2 px-2">
                            <Link href="/jurusan/pplg" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-center" onClick={() => setOpen(false)}>RPL</Link>
                            <Link href="/jurusan/bdp" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-center" onClick={() => setOpen(false)}>BDP</Link>
                            <Link href="/jurusan/akt" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-center" onClick={() => setOpen(false)}>AKT</Link>
                            <Link href="/jurusan/anm" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-center" onClick={() => setOpen(false)}>ANM</Link>
                            <Link href="/jurusan/dkv" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-center col-span-2" onClick={() => setOpen(false)}>DKV</Link>
                        </div>
                        <Link href="/events" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 mt-2" onClick={() => setOpen(false)}>Event</Link>
                        <Link href="/popular" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setOpen(false)}>Karya Siswa</Link>
                        <Link href="/guru" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setOpen(false)}>Guru</Link>
                        <Link href="/osis" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600" onClick={() => setOpen(false)}>OSIS</Link>
                        
                        {auth?.user && (
                            <div className="mt-3 pt-3 border-t">
                                <Link href="/dashboard" onClick={() => setOpen(false)}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Dashboard</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="space-y-3">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-lg font-black text-white tracking-tight">SMK BAKTI NUSANTARA 666</span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Wadah kreasi digital SMK Bakti Nusantara 666. Teruslah berkarya!
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Informasi</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/sejarah" className="hover:text-white transition-colors">Sejarah Sekolah</Link></li>
                            <li><Link href="/visi-misi" className="hover:text-white transition-colors">Visi & Misi</Link></li>
                            <li><Link href="/guru" className="hover:text-white transition-colors">Daftar Guru</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Konten</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/popular" className="hover:text-white transition-colors">Karya Populer</Link></li>
                            <li><Link href="/events" className="hover:text-white transition-colors">Agenda Event</Link></li>
                            <li><Link href="/osis" className="hover:text-white transition-colors">Anggota OSIS</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-6 border-t border-white/5 text-center text-xs text-slate-600">
                    © {new Date().getFullYear()} SMK Bakti Nusantara 666. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default function GuestLayout({ children, showFooter = true, transparentHeader = false }) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans overflow-x-hidden">
            <PublicNavbar transparentHeader={transparentHeader} />
            <main className="flex-1">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
}
