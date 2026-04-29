import GuestLayout from '@/layouts/GuestLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    CalendarDays, MapPin, User, ChevronRight, 
    Bell, Sparkles, Clock, Globe, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

function EventItem({ event }) {
    const isOngoing = event.is_ongoing;
    
    return (
        <div className="group relative grid lg:grid-cols-5 gap-0 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden">
            <div className="lg:col-span-2 relative h-64 lg:h-full overflow-hidden">
                <img 
                    src={event.photo_url || '/images/default-event.jpg'} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/800x600?text=Event+Photo'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-slate-950/20" />
                <div className="absolute top-6 left-6">
                    <Badge className={cn(
                        "font-black text-[10px] uppercase px-4 py-1.5 rounded-full border-none shadow-xl",
                        isOngoing ? 'bg-rose-500 text-white animate-pulse' : 'bg-primary text-white'
                    )}>
                        {isOngoing ? '🔴 Sedang Berlangsung' : 'Agenda Mendatang'}
                    </Badge>
                </div>
            </div>
            
            <div className="lg:col-span-3 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <CalendarDays className="h-4 w-4" />
                    <span>{event.event_date_formatted}</span>
                    <span className="h-1 w-1 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{event.creator_name ?? 'Panitia OSIS'}</span>
                </div>
                
                <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                </h2>
                
                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 line-clamp-3">
                    {event.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>08:00 - SELESAI</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>SMK BN 666 HALL</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button className="h-12 px-8 rounded-2xl font-black tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        IKUTI EVENT <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="ghost" className="h-12 w-12 rounded-2xl bg-muted/50 p-0 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                        <Bell className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function EventsIndex({ events }) {
    return (
        <GuestLayout>
            <div className="relative pt-32 pb-32">
                {/* Abstract Decorations */}
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-500/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-blue-500/[0.02] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <header className="max-w-xl mx-auto text-center space-y-6 mb-24 animate-in fade-in slide-in-from-top-10 duration-700">
                        <div className="inline-flex items-center gap-3 bg-rose-500/10 text-rose-500 py-2 px-5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                            <Sparkles className="h-3.5 w-3.5 fill-current" />
                            AGENDA & KEGIATAN
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic">
                            JANGAN LEWATKAN <span className="text-rose-500">MOMEN</span> SERU!
                        </h1>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">
                            Ayo bergabung dalam berbagai kemeriahan acara sekolah yang diselenggarakan oleh OSIS dan Jurusan. Jadikan masa sekolahmu tak terlupakan.
                        </p>
                    </header>

                    <div className="space-y-12">
                        {events?.length > 0 ? events.map((event) => (
                            <EventItem key={event.id} event={event} />
                        )) : (
                            <div className="py-40 text-center flex flex-col items-center justify-center">
                                <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
                                    <Globe className="h-10 w-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight italic opacity-50">"Belum ada agenda dalam waktu dekat."</h3>
                                <p className="text-slate-400 mt-2 font-medium">Tetap pantau halaman ini untuk update kegiatan terbaru.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Newsletter Invite */}
                    <div className="mt-32 p-12 lg:p-16 rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/20 rounded-full blur-[100px]" />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-center lg:text-left">
                                <h2 className="text-3xl lg:text-5xl font-black tracking-tighter leading-tight">
                                    Dapatkan Notifikasi <br /><span className="text-primary italic">Agenda</span> Terbaru.
                                </h2>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                    Jangan sampai ketinggalan pendaftaran lomba atau event besar sekolah. Daftarkan emailmu untuk info tercepat.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input 
                                    className="h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none flex-1 font-medium focus:border-primary/50 transition-colors"
                                    placeholder="Masukkan alamat email kamu..."
                                />
                                <Button className="h-16 px-10 rounded-2xl font-black tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                                    SUBSCRIBE
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
