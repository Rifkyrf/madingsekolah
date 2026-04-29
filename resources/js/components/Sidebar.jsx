import { Link, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    LayoutDashboard, Upload, ShieldCheck, Users, Trash2,
    CalendarDays, PaintRoller, UserCog, BarChart3, LogOut, Home,
    ChevronRight, ChevronLeft
} from 'lucide-react';

function MenuItem({ href, icon: Icon, label, active, collapsed, badge }) {
    return (
        <Link
            href={href}
            title={collapsed ? label : undefined}
            className={cn(
                'group flex items-center rounded-2xl text-sm transition-all duration-200 relative overflow-hidden',
                collapsed ? 'justify-center p-3' : 'justify-between px-4 py-2.5',
                active
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
            )}
        >
            <div className={cn('flex items-center relative z-10', collapsed ? '' : 'gap-3.5')}>
                <div className={cn(
                    'p-1.5 rounded-lg transition-colors',
                    active ? 'bg-white/20' : 'bg-muted group-hover:bg-primary/10'
                )}>
                    <Icon className={cn('h-4 w-4', active ? 'text-white' : 'text-muted-foreground group-hover:text-primary')} />
                </div>
                {!collapsed && <span className="font-semibold tracking-tight">{label}</span>}
            </div>
            {!collapsed && badge && (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">{badge}</span>
            )}
            {!collapsed && !badge && active && <ChevronRight className="h-3 w-3 opacity-50" />}
        </Link>
    );
}

function MenuLabel({ children, collapsed }) {
    if (collapsed) return <div className="h-px bg-muted mx-2 my-3" />;
    return (
        <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-5 mt-6 mb-2 flex items-center gap-2">
            <span className="h-px bg-muted flex-1" />
            {children}
            <span className="h-px bg-muted flex-1" />
        </p>
    );
}

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
    const { auth, ziggy } = usePage().props;
    const user = auth?.user;
    const currentUrl = ziggy?.location ?? window.location.href;
    const is = (p) => currentUrl.includes(p);

    return (
        <>
            {/* Overlay mobile */}
            {open && (
                <div
                    className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    'fixed top-0 left-0 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 z-[80] pt-16 transition-all duration-300 ease-in-out flex flex-col',
                    // Desktop: collapsed = w-20, expanded = w-64
                    collapsed ? 'lg:w-20' : 'lg:w-64',
                    // Mobile: slide in/out
                    'w-72',
                    open ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Toggle collapse button (desktop only) */}
                <button
                    onClick={onToggleCollapse}
                    className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors z-10"
                >
                    {collapsed
                        ? <ChevronRight className="h-3 w-3" />
                        : <ChevronLeft className="h-3 w-3" />
                    }
                </button>

                {/* User Snapshot — hanya tampil di mobile atau saat expanded */}
                {!collapsed && (
                    <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-900">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40">
                            <div className="relative shrink-0">
                                <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                    <AvatarImage src={user?.profile_photo_url} />
                                    <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm truncate">{user?.name ?? 'Guest'}</p>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{user?.role_name ?? 'Visitor'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {collapsed && (
                    <div className="flex justify-center py-4 border-b border-slate-100 dark:border-slate-900">
                        <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm">
                            <AvatarImage src={user?.profile_photo_url} />
                            <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
                        </Avatar>
                    </div>
                )}

                {/* Navigation */}
                <nav className={cn(
                    'flex-1 overflow-y-auto py-3 space-y-0.5 scrollbar-none',
                    collapsed ? 'px-2' : 'px-3'
                )}>
                    {user ? (
                        <>
                            <MenuLabel collapsed={collapsed}>Insight</MenuLabel>
                            {user.is_admin && (
                                <MenuItem href="/dashboard/statistik" icon={BarChart3} label="Statistik" active={is('/dashboard/statistik')} collapsed={collapsed} />
                            )}
                            <MenuItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" active={currentUrl.endsWith('/dashboard')} collapsed={collapsed} />

                            {!user.is_guest && (
                                <>
                                    <MenuLabel collapsed={collapsed}>Main Room</MenuLabel>
                                    {(user.is_admin || user.is_guru || user.is_siswa) && (
                                        <MenuItem href="/upload" icon={Upload} label="Upload Karya" active={is('/upload')} collapsed={collapsed} />
                                    )}
                                    {(user.is_guru || user.is_admin) && (
                                        <MenuItem href="/moderasi/drafts" icon={ShieldCheck} label="Moderasi" active={is('/moderasi')} badge={!collapsed && user.pending_drafts_count} collapsed={collapsed} />
                                    )}
                                </>
                            )}

                            {(user.is_admin || user.is_osis || user.is_mading) && (
                                <>
                                    <MenuLabel collapsed={collapsed}>Manajer</MenuLabel>
                                    {(user.is_admin || user.is_pembina_osis) && (
                                        <MenuItem href="/osis/manage" icon={UserCog} label="Pengaturan OSIS" active={is('/osis/manage')} collapsed={collapsed} />
                                    )}
                                    {user.is_admin && (
                                        <>
                                            <MenuItem href="/admin" icon={Users} label="Data User" active={is('/admin') && !is('/admin/recycle')} collapsed={collapsed} />
                                            <MenuItem href="/admin/recycle-bin" icon={Trash2} label="Sampah" active={is('/admin/recycle-bin')} collapsed={collapsed} />
                                        </>
                                    )}
                                    {user.is_osis && (
                                        <MenuItem href="/osis/events" icon={CalendarDays} label="Program Event" active={is('/osis/events')} collapsed={collapsed} />
                                    )}
                                    {user.is_mading && (
                                        <MenuItem href="/mading/canvas" icon={PaintRoller} label="Mading Digital" active={is('/mading')} collapsed={collapsed} />
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <MenuItem href="/" icon={Home} label="Beranda" active={currentUrl.endsWith('/')} collapsed={collapsed} />
                            <MenuItem href="/login" icon={LogOut} label="Masuk" active={is('/login')} collapsed={collapsed} />
                        </>
                    )}
                </nav>

                {/* Logout di bawah */}
                {user && (
                    <div className={cn('p-3 border-t border-slate-100 dark:border-slate-900', collapsed && 'flex justify-center')}>
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
                            title={collapsed ? 'Keluar' : undefined}
                            className={cn(
                                'flex items-center gap-2.5 rounded-2xl text-sm text-rose-500 hover:bg-rose-50 transition-colors font-semibold outline-none',
                                collapsed ? 'p-3 justify-center' : 'px-4 py-2.5 w-full'
                            )}
                        >
                            <LogOut className="h-4 w-4 shrink-0" />
                            {!collapsed && 'Keluar'}
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
