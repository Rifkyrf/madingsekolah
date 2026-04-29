import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export default function LoadingScreen() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const show = router.on('start', () => setVisible(true));
        const hide = router.on('finish', () => setVisible(false));
        return () => { show(); hide(); };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="flex flex-col items-center gap-4">
                <img src="/images/logo.png" alt="Logo" className="h-12 w-12 object-contain opacity-80 animate-pulse"
                    onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="relative h-8 w-8">
                    <div className="absolute inset-0 rounded-full border-3 border-slate-200" />
                    <div className="absolute inset-0 rounded-full border-3 border-primary border-t-transparent animate-spin" style={{ borderWidth: 3 }} />
                </div>
            </div>
        </div>
    );
}
