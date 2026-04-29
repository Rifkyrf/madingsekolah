import { router } from '@inertiajs/react';
import GuestLayout from '@/layouts/GuestLayout';
import WorkCard from '@/components/WorkCard';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Popular({ works }) {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    return (
        <GuestLayout>
            <div className="relative pt-32 pb-24">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/[0.05] to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 text-[10px] font-black tracking-widest uppercase">
                                Hall of Fame
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter italic">
                                KARYA <span className="text-primary italic underline underline-offset-8 decoration-primary/20">POPULER</span>.
                            </h1>
                            <p className="text-lg text-slate-500 font-medium max-w-xl">
                                Penjelajahan karya-karya terbaik pilihan siswa SMK BN666. Dapatkan inspirasi dari kreativitas tanpa batas di sini.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-2.5 rounded-xl transition-all",
                                    viewMode === 'grid' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <LayoutGrid className="h-5 w-5" />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-2.5 rounded-xl transition-all",
                                    viewMode === 'list' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </header>

                    {works?.data?.length > 0 ? (
                        <div className={cn(
                            "grid gap-8",
                            viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                        )}>
                            {works.data.map((work) => (
                                <WorkCard key={work.id} work={work} onClick={() => router.visit(`/works/${work.id}`)} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-40 text-center flex flex-col items-center justify-center bg-white rounded-[4rem] border border-dashed">
                             <TrendingUp className="h-16 w-16 text-slate-200 mb-6" />
                             <h3 className="text-2xl font-black text-slate-800 italic opacity-50">Belum ada karya populer hari ini.</h3>
                             <p className="text-slate-400 mt-2">Ayo unggah karyamu dan jadilah yang terpopuler!</p>
                        </div>
                    )}

                    {/* Pagination - Reuse pattern from Landing or create component */}
                    {works?.last_page > 1 && (
                        <div className="flex justify-center mt-20">
                            {/* Pagination Logic */}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
