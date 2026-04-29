import { Link, usePage } from '@inertiajs/react';
import { Home, Upload, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav({ onOpenSidebar }) {
    const { auth, ziggy } = usePage().props;
    const user = auth?.user;
    const currentUrl = ziggy?.location ?? window.location.href;
    const is = (p) => currentUrl.includes(p);

    const navItems = [
        { href: '/dashboard', icon: Home, label: 'Beranda', active: currentUrl.endsWith('/dashboard') || is('/works') },
        ...(user && !user.is_guest ? [{ href: '/upload', icon: Upload, label: 'Upload', active: is('/upload') }] : []),
        { href: user ? `/profile/${user.id}` : '/login', icon: User, label: 'Profil', active: is('/profile') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[90] lg:hidden bg-white/90 backdrop-blur-lg border-t border-slate-200 safe-area-pb">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map(({ href, icon: Icon, label, active }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            'flex flex-col items-center justify-center gap-1 flex-1 h-full text-[10px] font-bold uppercase tracking-wider transition-colors',
                            active ? 'text-primary' : 'text-muted-foreground'
                        )}
                    >
                        <div className={cn(
                            'p-1.5 rounded-xl transition-all',
                            active ? 'bg-primary/10 scale-110' : ''
                        )}>
                            <Icon className="h-5 w-5" />
                        </div>
                        {label}
                    </Link>
                ))}
                <button
                    onClick={onOpenSidebar}
                    className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                    <div className="p-1.5 rounded-xl">
                        <Menu className="h-5 w-5" />
                    </div>
                    Menu
                </button>
            </div>
        </nav>
    );
}
