import GuestLayout from '@/layouts/GuestLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, router } from '@inertiajs/react';
import { 
    Layout, Palette, Plus, Search, 
    ArrowRight, Globe, Layers, Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';

function MadingCard({ mading }) {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
            <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img 
                    src={mading.thumbnail_url || 'https://placehold.co/800x450?text=Mading+Digital'} 
                    alt={mading.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/800x450?text=Premium+Mading'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <Button size="sm" className="rounded-xl font-bold gap-2 bg-white text-slate-900 hover:bg-white/90">
                        LIHAT <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                        <Palette className="h-3.5 w-3.5" />
                        <span>KREASI SISWA</span>
                        <span className="h-1 w-1 bg-slate-200 rounded-full" />
                        <span>{mading.created_at_human}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white line-clamp-1 italic uppercase">
                        {mading.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {mading.description || 'Karya mading digital kolaboratif.'}
                    </p>
                </div>
                
                <div className="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                            {mading.user?.name?.charAt(0)}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By {mading.user?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MadingIndex({ madings }) {
    return (
        <GuestLayout>
            <div className="relative pt-32 pb-24">
                <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                        <div className="space-y-6 max-w-2xl">
                            <Badge className="bg-primary/10 text-primary border-none py-1.5 px-5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                                CANVAS DIGITAL
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                                MADING <span className="text-primary italic underline decoration-primary/10 underline-offset-8">DIGITAL</span>.
                            </h1>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                                Wadah kreativitas tanpa batas. Buat, desain, dan publikasikan mading sekolah dengan editor canvas modern kami.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/mading/archive">
                                <Button variant="outline" size="lg" className="h-16 px-10 rounded-[2rem] font-black tracking-widest border-2">
                                    ARSIP SAYA
                                </Button>
                            </Link>
                            <Link href="/mading/canvas">
                                <Button size="lg" className="h-16 px-10 rounded-[2rem] font-black tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                                    <Plus className="h-5 w-5 mr-2" /> BUAT MADING
                                </Button>
                            </Link>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {madings.data.length > 0 ? (
                            madings.data.map((mading) => (
                                <MadingCard key={mading.id} mading={mading} />
                            ))
                        ) : (
                            <div className="col-span-full py-40 text-center flex flex-col items-center justify-center bg-white rounded-[4rem] border-2 border-dashed">
                                <Layers className="h-20 w-20 text-slate-100 mb-6" />
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight italic opacity-30">"Belum ada mading yang terbit hari ini."</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
