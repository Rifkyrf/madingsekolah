import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/components/LoadingScreen';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(() => {
        try { return localStorage.getItem('sidebar_collapsed') === 'true'; } catch { return false; }
    });
    const { flash } = usePage().props;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleCollapse = () => {
        setCollapsed(prev => {
            const next = !prev;
            try { localStorage.setItem('sidebar_collapsed', String(next)); } catch {}
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] font-sans">
            <Topbar
                onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                scrolled={scrolled}
                sidebarCollapsed={collapsed}
            />

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                collapsed={collapsed}
                onToggleCollapse={handleToggleCollapse}
            />

            <main className={cn(
                'transition-all duration-300 ease-in-out min-h-screen pt-16 pb-20 lg:pb-8',
                collapsed ? 'lg:pl-20' : 'lg:pl-64'
            )}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    {flash?.success && (
                        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-800 flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] shrink-0">✓</span>
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-100 px-4 py-3 text-sm text-rose-800 flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white text-[10px] shrink-0">!</span>
                            {flash.error}
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Bottom Nav hanya mobile */}
            <BottomNav onOpenSidebar={() => setSidebarOpen(true)} />

            <LoadingScreen />
            <Toaster />
        </div>
    );
}
