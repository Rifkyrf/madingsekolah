import GuestLayout from '@/layouts/GuestLayout';
import { Badge } from '@/components/ui/badge';
import { 
    Target, Compass, Rocket, ShieldCheck, 
    Zap, Heart, Globe, Users, Star, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

function ValueCard({ icon: Icon, title, desc, color }) {
    return (
        <div className="group bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 text-center">
            <div className={cn(
                "h-16 w-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 shadow-lg",
                color
            )}>
                <Icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-white mb-3 uppercase italic">
                {title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {desc}
            </p>
        </div>
    );
}

export default function VisiMisi() {
    const values = [
        { icon: Star, title: 'Unggul', desc: 'Menjadi yang terbaik dalam kompetensi akademik maupun non-akademik.', color: 'bg-yellow-500' },
        { icon: Heart, title: 'Karakter', desc: 'Membangun akhlak mulia dan integritas yang tinggi bagi setiap siswa.', color: 'bg-rose-500' },
        { icon: Zap, title: 'Inovatif', desc: 'Terus bereksperimen dengan teknologi dan ide-ide kreatif masa depan.', color: 'bg-blue-500' },
        { icon: Globe, title: 'Global', desc: 'Siap bersaing di kancah internasional dengan wawasan yang luas.', color: 'bg-emerald-500' },
    ];

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-white dark:bg-slate-950">
                <div className="absolute inset-0 hero-pattern opacity-5" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-700">
                        <Badge className="bg-primary/10 text-primary border-none py-1.5 px-5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                            FOUNDATION & PURPOSE
                        </Badge>
                        <h1 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] italic">
                            VISI & <span className="text-primary underline decoration-primary/10 underline-offset-8">MISI</span>.
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            Cita-cita luhur dan langkah strategis SMK Bakti Nusantara 666 dalam membangun masa depan pendidikan Indonesia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Visi Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/4" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="h-20 w-20 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 animate-pulse">
                                <Target className="h-10 w-10" />
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter italic">VISI BESAR <br />KAMI</h2>
                            <div className="p-10 lg:p-14 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-white dark:border-slate-800 relative">
                                <span className="absolute -top-10 -left-6 text-[12rem] font-black text-slate-100 dark:text-slate-800 pointer-events-none">“</span>
                                <p className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight italic relative z-10">
                                    "Menjadi lembaga pendidikan kejuruan yang unggul, berkarakter, dan berdaya saing global dalam ekosistem digital."
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-square bg-slate-200 rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-white">
                                <img 
                                    src="/images/visi-img.jpg" 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                    onError={(e) => { e.target.src = 'https://placehold.co/800x800?text=Vision'; }}
                                    alt="Visi"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Misi Section */}
            <section className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                        <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-6">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-rose-500/10 flex items-center justify-center text-rose-500">
                                <Compass className="h-8 w-8" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic capitalize">Misi <span className="text-rose-500">Strategis</span> Perjuangan.</h2>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Strategi konkret yang kami jalankan setiap hari untuk mencapai visi besar sekolah.
                            </p>
                        </div>
                        <div className="lg:w-2/3 space-y-8">
                            {[
                                { num: '01', title: 'Pendidikan Karakter', desc: 'Menyelenggarakan pendidikan yang berfokus pada pembentukan akhlak mulia melalui program pembiasaan positif dan nilai-nilai religius.' },
                                { num: '02', title: 'Kompetensi Industri', desc: 'Membangun kerjasama strategis dengan dunia usaha dan industri nasional maupun internasional untuk menjamin kompetensi lulusan.' },
                                { num: '03', title: 'Inovasi Digital', desc: 'Menerapkan teknologi informasi secara menyeluruh dalam sistem pembelajaran dan tata kelola sekolah yang efisien.' },
                                { num: '04', title: 'Lingkungan Kreatif', desc: 'Menciptakan ekosistem sekolah yang mendukung kreativitas siswa dalam berkarya dan berekspresi (Digital Mading).' },
                            ].map((misi, i) => (
                                <div key={i} className="group flex gap-8 p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-white transition-all duration-500">
                                    <span className="text-6xl font-black text-slate-200 group-hover:text-primary transition-colors tracking-tighter shrink-0">{misi.num}</span>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{misi.title}</h3>
                                        <p className="text-slate-500 text-lg font-medium leading-relaxed">{misi.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter italic">KEKUATAN <span className="text-primary">CORE VALUES</span> KAMI</h2>
                        <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">Prinsip dasar yang kami pegang teguh.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <ValueCard key={i} {...v} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Quote CTA */}
            <section className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-12 animate-in zoom-in duration-700">
                        <Rocket className="h-20 w-20 text-primary mx-auto animate-bounce lg:h-32 lg:w-32" />
                        <h2 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter italic leading-tight">
                            MAJU BERSAMA <br />UNTUK INDONESIA <span className="text-primary decoration-primary/20 underline underline-offset-8">DIGITAL</span>.
                        </h2>
                        <Button className="h-20 px-16 rounded-[2rem] bg-slate-900 text-white font-black tracking-widest hover:bg-primary transition-all shadow-2xl scale-110 text-lg">
                            GABUNG SEKARANG <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
