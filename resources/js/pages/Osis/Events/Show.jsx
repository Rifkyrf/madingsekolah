import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
    Calendar, ArrowLeft, Clock, MapPin, 
    User, Share2, Sparkles, Map,
    AlertCircle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function OsisEventShow({ event }) {
    const copyLink = () => {
        navigator.clipboard?.writeText(window.location.href);
        // Alert logic here
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-10">
                    <div className="flex items-center gap-5">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                <Sparkles className="h-4 w-4" />
                                <span>PROGRAM KERJA TERVERIFIKASI</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">{event.title}</h1>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-primary/5 text-primary hover:bg-primary/10" onClick={copyLink}>
                        <Share2 className="h-5 w-5" />
                    </Button>
                </header>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Media Section */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border aspect-[16/10] group">
                            <img 
                                src={event.photo_url || 'https://placehold.co/1200x800?text=Event+Poster'} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-12">
                                <Badge className="bg-emerald-500 text-white border-none rounded-xl px-6 py-2 font-black tracking-widest text-[10px]">
                                    OPEN FOR STUDENTS
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-12 border shadow-sm space-y-8">
                             <div className="flex items-center gap-3 text-slate-400 mb-2">
                                <CheckCircle2 className="h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Detail & Deskripsi</span>
                             </div>
                             <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                "{event.description}"
                             </p>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white rounded-[3.5rem] p-10 border shadow-sm space-y-10">
                             <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Informasi Kegiatan</h3>
                                <div className="space-y-4">
                                    <InfoRow icon={Calendar} label="Hari, Tanggal" value={event.event_date} />
                                    <InfoRow icon={Clock} label="Waktu" value="09:00 - Selesai" />
                                    <InfoRow icon={MapPin} label="Lokasi" value="Aula Utama Bakti Nusantara 666" />
                                </div>
                             </div>

                             <div className="pt-10 border-t space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Penanggung Jawab</h3>
                                <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2rem]">
                                    <Avatar className="h-14 w-14 ring-4 ring-white">
                                        <AvatarFallback className="bg-primary text-white font-bold">{event.creator_name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                                            {event.creator_name} <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PENGURUS OSIS</p>
                                    </div>
                                </div>
                             </div>

                             <div className="pt-6">
                                <Button className="w-full h-16 rounded-2xl font-black tracking-widest gap-2 shadow-xl shadow-primary/20">
                                    HADIR KE EVENT <ChevronRight className="h-5 w-5" />
                                </Button>
                             </div>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-4 relative overflow-hidden group">
                             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Map className="h-32 w-32" />
                             </div>
                             <div className="flex items-center gap-3 text-amber-400 mb-2">
                                <AlertCircle className="h-5 w-5" />
                                <span className="text-xs font-black uppercase tracking-widest">Pesan Penting</span>
                             </div>
                             <p className="text-xs font-medium text-slate-400 italic leading-relaxed">
                                Harap datang tepat waktu dan mengenakan atribut lengkap saat kegiatan berlangsung.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-4 group">
            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-black text-slate-700 italic uppercase">{value}</p>
            </div>
        </div>
    );
}
