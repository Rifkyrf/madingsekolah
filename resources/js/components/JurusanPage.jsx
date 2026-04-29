import GuestLayout from '@/layouts/GuestLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Code, Terminal, Layout, Cpu, Globe, 
    ArrowRight, Sparkles, CheckCircle2, Star, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function JurusanPage({ 
    title, 
    tagline, 
    description, 
    image, 
    skills = [], 
    stats = [],
    highlights = [] 
}) {
    return (
        <GuestLayout>
            <div className="relative pt-40 pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[1000px] bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                            <Badge className="bg-primary/10 text-primary border-none py-1.5 px-5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                                JELAJAHI KEAHLIAN
                            </Badge>
                            <h1 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] italic capitalize">
                                {title}.
                            </h1>
                            <p className="text-3xl font-black text-primary italic leading-tight">{tagline}</p>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                                {description}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" className="h-16 px-10 rounded-2xl font-black tracking-widest shadow-xl shadow-primary/20">
                                    LIHAT KURIKULUM
                                </Button>
                                <Button variant="ghost" size="lg" className="h-16 px-8 rounded-2xl font-bold">
                                    GALERI KARYA <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-white dark:border-slate-800 rotate-2 group transition-transform hover:rotate-0 duration-700">
                                <img 
                                    src={image} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    alt={title}
                                    onError={(e) => { e.target.src = 'https://placehold.co/800x1000?text=' + title; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Features/Stats */}
                    <div className="grid md:grid-cols-3 gap-10 mb-32">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-4">
                                <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto">
                                    <stat.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic">{stat.label}</h3>
                                <p className="text-slate-500 font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Competencies */}
                    <div className="bg-slate-950 rounded-[4rem] p-16 lg:p-24 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
                        <div className="relative z-10">
                            <div className="max-w-2xl space-y-6 mb-16">
                                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter italic capitalize">Kompetensi Keunggulan <br /><span className="text-primary italic">Utama</span> Kami.</h2>
                                <p className="text-slate-400 text-lg font-medium">Lulusan kami dibekali dengan keahlian yang sangat relevan dengan kebutuhan industri masa kini.</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
                                {highlights.map((h, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-bold tracking-tight">{h.title}</h4>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed">{h.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="pt-32 text-center space-y-8">
                        <Sparkles className="h-16 w-16 text-primary animate-pulse mx-auto" />
                        <h2 className="text-4xl lg:text-6xl font-black tracking-tighter italic">Siap Menjadi Ahli di Bidang ini?</h2>
                        <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-primary text-white font-black tracking-widest text-lg shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                            DAFTAR JURUSAN SEKARANG
                        </Button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
