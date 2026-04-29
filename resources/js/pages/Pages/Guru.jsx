import GuestLayout from '@/layouts/GuestLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Shield, User, Search, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

function GuruCard({ guru }) {
    return (
        <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/5 to-blue-400/5 group-hover:from-primary/10 transition-colors" />
            
            <div className="relative mb-6">
                <Avatar className="h-28 w-28 ring-4 ring-white dark:ring-slate-950 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <AvatarImage src={guru.profile_photo_url} alt={guru.name} />
                    <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
                        {guru.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-950 p-1.5 rounded-full shadow-lg border border-slate-50">
                    <div className="h-6 w-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                </div>
            </div>

            <div className="space-y-1 mb-6 relative z-10">
                <h3 className="text-xl font-black tracking-tight text-slate-800 dark:text-white leading-tight">
                    {guru.name}
                </h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    {guru.kategori_guru?.nama ?? 'Tenaga Pendidik'}
                </p>
                <Badge variant="secondary" className="mt-2 text-[10px] uppercase font-black tracking-widest bg-slate-100 text-slate-500 border-none">
                    {guru.hakguna?.name ?? 'Guru'}
                </Badge>
            </div>

            <div className="w-full grid grid-cols-1 gap-3 pt-6 border-t border-slate-50 dark:border-slate-800 mt-auto relative z-10">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kontak</span>
                    <a href={`mailto:${guru.email}`} className="text-primary hover:underline flex items-center justify-center bg-slate-50 h-8 w-8 rounded-full">
                        <Mail className="h-4 w-4" />
                    </a>
                </div>
            </div>
            
            {/* Background design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 bg-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}

export default function GuruIndex({ gurus }) {
    const [search, setSearch] = useState('');

    const filteredGurus = gurus.filter(g => 
        g.name.toLowerCase().includes(search.toLowerCase()) || 
        g.email.toLowerCase().includes(search.toLowerCase()) ||
        g.kategori_guru?.nama?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <GuestLayout>
            <div className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-x flex flex-col items-center text-center space-y-6 mb-20 animate-in fade-in slide-in-from-top-10 duration-700">
                        <Badge className="bg-primary/10 text-primary border-none rounded-full px-5 py-1 text-[10px] font-black tracking-widest uppercase">
                            DIREKTORI GURU
                        </Badge>
                        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">
                            TEMUI PARA <span className="text-primary italic underline decoration-primary/20 underline-offset-8">PENDIDIK</span> KAMI.
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
                            Mengenal lebih dekat para pakar dan mentor hebat yang membimbing siswa SMK Bakti Nusantara 666 menuju masa depan gemilang.
                        </p>
                        
                        <div className="relative w-full max-w-lg pt-8">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Cari nama guru atau mata pelajaran..." 
                                className="h-14 pl-12 pr-6 rounded-2xl bg-white shadow-xl shadow-primary/5 border-none text-base placeholder:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-4 focus-visible:ring-primary/5 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredGurus.map((guru) => (
                            <GuruCard key={guru.id} guru={guru} />
                        ))}
                    </div>

                    {filteredGurus.length === 0 && (
                        <div className="py-32 text-center flex flex-col items-center justify-center animate-in zoom-in duration-300">
                            <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <Shield className="h-10 w-10 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 italic">"Guru tidak ditemukan."</h3>
                            <p className="text-slate-400 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .hero-pattern {
                    background-image: radial-gradient(#2563eb 0.5px, transparent 0.5px), radial-gradient(#2563eb 0.5px, #f8fafc 0.5px);
                    background-size: 20px 20px;
                    background-position: 0 0,10px 10px;
                    opacity: 0.05;
                }
            `}</style>
        </GuestLayout>
    );
}
