import { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { Menu, Bell, Search, X, User, LogOut, LayoutDashboard, Sun, Moon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import axios from 'axios';

export default function Topbar({ onMenuToggle, scrolled, sidebarCollapsed }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ users: [], works: [] });
    const [showResults, setShowResults] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const searchRef = useRef(null);
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    const toggleDark = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle('dark', next);
        try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    };

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') { document.documentElement.classList.add('dark'); setDarkMode(true); }
    }, []);

    const avatarUrl = user?.profile_photo_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? 'U')}&background=1a4b8c&color=fff&size=64`;

    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSearch = async (q) => {
        setSearchQuery(q);
        if (q.length < 2) { setSearchResults([]); setShowResults(false); return; }
        try {
            const res = await axios.get(`/search/all?q=${encodeURIComponent(q)}`);
            setSearchResults(res.data ?? { users: [], works: [] });
            setShowResults(true);
        } catch { setSearchResults({ users: [], works: [] }); }
    };

    const markAsRead = async (id) => {
        await axios.put(`/notifications/${id}/read`);
    };

    return (
        <header className={cn(
            'fixed top-0 right-0 h-16 z-[60] transition-all duration-300 px-4',
            sidebarCollapsed ? 'lg:left-20' : 'lg:left-64',
            'left-0',
            scrolled
                ? 'bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm'
                : 'bg-white border-b border-slate-100'
        )}>
            <div className="h-full flex items-center justify-between gap-4">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-primary p-1 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                            <img src="/images/logo.png" alt="Logo" className="h-full w-full object-contain"
                                onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="hidden sm:block leading-tight">
                            <p className="font-bold text-sm tracking-tight">Karsisiwa</p>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Digital Mading</p>
                        </div>
                    </Link>
                </div>

                {/* Center: Search */}
                <div className="hidden lg:flex flex-1 max-w-md relative" ref={searchRef}>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Cari pengguna atau karya..."
                            className="w-full bg-muted/50 border border-transparent focus:border-primary/30 rounded-full pl-10 pr-10 py-1.5 text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(''); setShowResults(false); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                                <X className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                            </button>
                        )}
                    </div>
                    {showResults && (searchResults.users?.length > 0 || searchResults.works?.length > 0) && (
                        <div className="absolute top-full mt-2 w-full bg-background border rounded-2xl shadow-xl z-50 overflow-hidden">
                            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                                {searchResults.users?.length > 0 && (
                                    <>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1">Pengguna</p>
                                        {searchResults.users.map((u) => (
                                            <Link key={u.id} href={`/profile/${u.id}`} onClick={() => setShowResults(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition-colors text-sm">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarImage src={u.profile_photo_url} />
                                                    <AvatarFallback>{u.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{u.name}</span>
                                            </Link>
                                        ))}
                                    </>
                                )}
                                {searchResults.works?.length > 0 && (
                                    <>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1 mt-2">Karya</p>
                                        {searchResults.works.map((w) => (
                                            <Link key={w.id} href={`/works/${w.id}`} onClick={() => setShowResults(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition-colors text-sm">
                                                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                    <FileText className="h-3.5 w-3.5 text-primary" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="font-medium truncate">{w.title}</p>
                                                    <p className="text-[10px] text-muted-foreground">{w.user?.name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                    {/* Dark Mode Toggle */}
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleDark}>
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    {user ? (
                        <>
                            {/* Notifications */}
                            <div className="relative" ref={notifRef}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn('rounded-full relative', showNotif && 'bg-muted')}
                                    onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                                >
                                    <Bell className="h-5 w-5" />
                                    {user.unread_notifications_count > 0 && (
                                        <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                                    )}
                                </Button>
                                {showNotif && (
                                    <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-2xl shadow-xl z-50 overflow-hidden">
                                        <div className="px-4 py-3 border-b flex items-center justify-between bg-muted/10">
                                            <h3 className="font-bold text-sm">Notifikasi</h3>
                                            <Badge variant="outline" className="text-[10px]">Baru</Badge>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto divide-y divide-muted">
                                            {user.notifications?.length > 0 ? user.notifications.map((n) => (
                                                <a key={n.id} href={n.url ?? '#'}
                                                    onClick={() => markAsRead(n.id)}
                                                    className={cn('flex flex-col gap-1 px-4 py-3 hover:bg-muted/50 transition-colors text-sm', !n.read && 'bg-primary/[0.03]')}
                                                >
                                                    <span className="font-semibold">{n.title}</span>
                                                    <span className="text-muted-foreground text-xs">{n.message}</span>
                                                    <span className="text-[10px] text-muted-foreground">{n.created_at_human}</span>
                                                </a>
                                            )) : (
                                                <div className="py-10 flex flex-col items-center text-muted-foreground">
                                                    <Bell className="h-8 w-8 opacity-10 mb-2" />
                                                    <p className="text-xs italic">Tidak ada notifikasi</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Menu */}
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                                    className="p-0.5 rounded-full border-2 border-transparent hover:border-primary/20 transition-all focus:outline-none"
                                >
                                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shadow-sm">
                                        <AvatarImage src={avatarUrl} alt={user.name} />
                                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </button>
                                {showProfile && (
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-background border rounded-2xl shadow-xl z-50 overflow-hidden">
                                        <div className="p-4 bg-muted/10 border-b">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                                                    <AvatarImage src={avatarUrl} />
                                                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-sm truncate">{user.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{user.role_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <Link href={`/profile/${user.id}`} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                                                <User className="h-4 w-4" /> Profil Saya
                                            </Link>
                                            <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                                            </Link>
                                            {user.is_admin && (
                                                <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm hover:bg-accent transition-colors text-primary font-medium">
                                                    <ShieldIcon className="h-4 w-4" /> Admin Panel
                                                </Link>
                                            )}
                                        </div>
                                        <div className="p-2 bg-muted/10 border-t">
                                            <button
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: 'Keluar?',
                                                        text: 'Anda yakin ingin keluar dari sesi ini?',
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonText: 'Ya, Keluar',
                                                        cancelButtonText: 'Batal',
                                                        customClass: {
                                                            confirmButton: 'bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-6 py-2 ml-2',
                                                            cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2'
                                                        },
                                                        buttonsStyling: false
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            router.post('/logout');
                                                        }
                                                    });
                                                }}
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-rose-600 hover:bg-rose-50 w-full transition-colors font-semibold outline-none"
                                            >
                                                <LogOut className="h-4 w-4" /> Keluar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="hidden sm:flex">Masuk</Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20">Daftar</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

function ShieldIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
    );
}
