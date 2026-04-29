import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Calendar, Plus, Search, MoreVertical, 
    Pencil, Trash2, Eye, MapPin, 
    Clock, Archive, ArrowRight
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';

export default function OsisEventIndex({ events }) {
    const handleDelete = (id) => {
        if (confirm('Hapus event ini?')) {
            router.delete(`/osis/events/${id}`);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Badge className="bg-primary/10 text-primary border-none px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                            OSIS MANAGEMENT
                        </Badge>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                            PROGRAM <span className="text-primary italic">KERJA</span>.
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-xl italic">
                            Kelola jadwal kegiatan dan event OSIS SMK Bakti Nusantara 666.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/osis/events/archive">
                            <Button variant="outline" className="h-14 px-8 rounded-2xl font-black tracking-widest gap-2 bg-white">
                                <Archive className="h-5 w-5" /> ARSIP
                            </Button>
                        </Link>
                        <Link href="/osis/events/create">
                            <Button className="h-14 px-10 rounded-2xl font-black tracking-widest gap-2 shadow-xl shadow-primary/20">
                                <Plus className="h-6 w-6" /> TAMBAH EVENT
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="grid gap-6">
                    {events.data.length > 0 ? (
                        events.data.map((event) => (
                            <Card key={event.id} className="rounded-[2.5rem] overflow-hidden border shadow-sm group hover:shadow-2xl transition-all duration-500">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                                            <img 
                                                src={event.photo_url || 'https://placehold.co/600x400?text=Event+Osis'} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className={cn("px-4 py-1.5 rounded-xl font-black tracking-widest text-[9px] uppercase border-none", event.is_past ? "bg-slate-500/90" : "bg-emerald-500/90 shadow-lg shadow-emerald-500/20")}>
                                                    {event.is_past ? 'SELESAI' : 'MENDATANG'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-8 space-y-6">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-widest uppercase">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {event.event_date_human}
                                                    </div>
                                                    <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase italic transition-colors group-hover:text-primary">
                                                        {event.title}
                                                    </h2>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/osis/events/${event.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 hover:text-primary">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-rose-50 hover:text-rose-500" onClick={() => handleDelete(event.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed italic line-clamp-2">
                                                "{event.description}"
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 09:00 WIB</span>
                                                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> AULA UTAMA</span>
                                                </div>
                                                <Link href={`/osis/events/${event.id}`}>
                                                    <Button variant="link" className="font-black text-[10px] uppercase tracking-widest p-0 h-auto group-hover:gap-3 transition-all">
                                                        DETAIL <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="py-24 text-center space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed">
                             <Calendar className="h-16 w-16 mx-auto text-slate-200" />
                             <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Belum ada program kerja yang tercatat.</p>
                             <Link href="/osis/events/create">
                                <Button variant="outline" className="rounded-xl font-bold">BUAT EVENT PERTAMA</Button>
                             </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center pt-10">
                    <div className="flex gap-2">
                        {events.links.map((link, i) => (
                            <Button 
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                disabled={!link.url}
                                className="h-12 w-12 rounded-2xl font-black italic"
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const cn = (...classes) => classes.filter(Boolean).join(' ');
