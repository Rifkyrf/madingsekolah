import GuestLayout from '@/layouts/GuestLayout';
import { Badge } from '@/components/ui/badge';
import { 
    History, Award, ShieldCheck, Flag, 
    BookOpen, Users, Sparkles, Fingerprint, Star
} from 'lucide-react';

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
            <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Icon className="h-7 w-7" />
            </div>
            <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter mb-1">{value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
    );
}

export default function Sejarah({ timeline }) {
    const years = timeline?.length > 0 ? timeline.map(t => ({
        year: t.year,
        title: t.title,
        desc: t.content || t.desc
    })) : [
        { year: '2005', title: 'Awal Perjuangan', desc: 'SMK Bakti Nusantara 666 didirikan dengan komitmen untuk memberikan akses pendidikan kejuruan berkualitas di wilayah Cileunyi.' },
        { year: '2012', title: 'Ekspansi Fasilitas', desc: 'Pembangunan gedung utama 4 lantai dan laboratorium komputer canggih untuk jurusan TI.' },
        { year: '2018', title: 'Prestasi Nasional', desc: 'Meraih predikat sebagai SMK Pusat Keunggulan tingkat nasional di bidang Ekonomi Kreatif.' },
        { year: '2024', title: 'Era Digitalisasi', desc: 'Implementasi platform Karsisiwa sebagai pusat mading digital dan kolaborasi siswa berbasis React.' },
    ];

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-white dark:bg-slate-950">
                <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                            <Badge className="bg-primary/10 text-primary border-none py-1.5 px-4 rounded-full text-[10px] font-black tracking-widest gap-2">
                                <History className="h-3.5 w-3.5" />
                                JEJAK LANGKAH SEKOLAH
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] italic">
                                MEMBANGUN <br /> <span className="text-primary italic underline decoration-primary/20 underline-offset-8">WARISAN</span> ABADI.
                            </h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                                Perjalanan panjang penuh dedikasi sejak tahun 2005 untuk mencetak tenaga profesional yang tidak hanya kompeten, tapi juga berintegritas.
                            </p>
                        </div>
                        <div className="relative animate-in fade-in slide-in-from-right duration-1000">
                             <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden rotate-3 shadow-2xl relative">
                                <img 
                                    src="/images/school-history.jpg" 
                                    className="w-full h-full object-cover -rotate-3 scale-110" 
                                    onError={(e) => { e.target.src = 'https://placehold.co/800x800?text=School+Legacy'; }}
                                    alt="History"
                                />
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                             </div>
                             <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl space-y-2 animate-bounce duration-[4s]">
                                <Star className="h-8 w-8 text-yellow-400 fill-current mb-2" />
                                <p className="text-2xl font-black tracking-tighter">Akreditasi A</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sertifikasi Nasional</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCard icon={Users} label="Lulusan" value="5.800+" />
                        <StatCard icon={Award} label="Penghargaan" value="120+" />
                        <StatCard icon={BookOpen} label="Kurikulum" value="15+" />
                        <StatCard icon={Sparkles} label="Inovasi" value="Infinit" />
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-32 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center space-y-4 mb-24">
                        <h2 className="text-4xl font-black tracking-tighter text-slate-900 italic">TONGGAK SEJARAH KAMI</h2>
                        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                    </div>
                    
                    <div className="max-w-4xl mx-auto relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2 hidden md:block" />
                        
                        <div className="space-y-20">
                            {years.map((item, idx) => (
                                <div key={item.year} className={cn(
                                    "relative flex flex-col md:flex-row gap-12 items-center",
                                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                )}>
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <div className={cn(
                                            "flex flex-col",
                                            idx % 2 === 0 ? "md:items-start" : "md:items-end"
                                        )}>
                                            <span className="text-5xl font-black text-primary/20 tracking-tighter mb-2">{item.year}</span>
                                            <h3 className="text-2xl font-black text-slate-800">{item.title}</h3>
                                            <p className={cn(
                                                "text-slate-500 font-medium leading-relaxed mt-2",
                                                idx % 2 === 0 ? "md:text-left" : "md:text-right"
                                            )}>{item.desc}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="h-10 w-10 rounded-full bg-primary border-4 border-white shadow-xl relative z-10 flex items-center justify-center">
                                        <Fingerprint className="h-4 w-4 text-white" />
                                    </div>
                                    
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-br from-primary to-blue-800 rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <Sparkles className="absolute -top-10 -right-10 h-64 w-64 opacity-10 animate-spin duration-[20s]" />
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter italic">MARI MENJADI BAGIAN DARI SEJARAH BESAR KAMI.</h2>
                            <p className="text-white/70 text-lg font-medium leading-relaxed">
                                Bergabunglah bersama ribuan siswa sukses lainnya dan ukir prestasimu di SMK Bakti Nusantara 666.
                            </p>
                            <Button className="h-16 px-12 rounded-2xl bg-white text-primary font-black tracking-widest hover:bg-slate-50 transition-all scale-105 hover:scale-110 shadow-xl">
                                DAFTAR SEKARANG
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
