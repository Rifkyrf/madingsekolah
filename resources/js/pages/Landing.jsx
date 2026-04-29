import { useState, useEffect } from 'react';
import { Link, router, Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/GuestLayout';
import WorkCard from '@/components/WorkCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Calendar, User, ChevronLeft, ChevronRight, 
    ArrowRight, Star, CalendarDays, Inbox,
    Info, ExternalLink, School
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTERS = [
    { key: 'all', label: 'Semua', icon: <Inbox className="h-4 w-4" /> },
    { key: 'mading', label: 'Mading Digital', icon: <CalendarDays className="h-4 w-4" /> },
    { key: 'karya', label: 'Karya Siswa', icon: <Star className="h-4 w-4" /> },
    { key: 'mingguan', label: 'Mingguan', icon: <Calendar className="h-4 w-4" /> },
    { key: 'harian', label: 'Harian', icon: <Calendar className="h-4 w-4" /> },
    { key: 'prestasi', label: 'Prestasi', icon: <Star className="h-4 w-4" /> },
    { key: 'opini', label: 'Opini', icon: <Info className="h-4 w-4" /> },
    { key: 'event', label: 'Event', icon: <Calendar className="h-4 w-4" /> },
];

function EventCard({ event }) {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                    src={event.photo_url || '/images/default-event.jpg'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Event'; }}
                />
                <div className="absolute top-4 right-4">
                    <Badge className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                        event.is_ongoing ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-600 text-white'
                    )}>
                        {event.is_ongoing ? 'Sedang Berlangsung' : 'Mendatang'}
                    </Badge>
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-slate-500 text-xs mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 pt-4 border-t border-slate-50 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-blue-600" /> {event.event_date_formatted}
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-blue-600" /> Oleh: <span className="font-bold text-slate-700">{event.creator_name ?? 'OSIS'}</span>
                    </div>
                </div>
                
                <Button variant="default" className="w-full mt-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold gap-2">
                    Detail Event <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default function Landing({ popularWorks, upcomingEvents, works, filters }) {
    const currentType = filters?.type || 'all';

    const handleFilter = (type) => {
        router.get('/', { type: type === 'all' ? undefined : type }, { preserveScroll: true });
    };

    return (
        <GuestLayout transparentHeader={true}>
            <Head title="Mading & Karya Siswa" />
            
            {/* Hero Section - Mirroring Blade Layout */}
            <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-[20s] hover:scale-110"
                    style={{ backgroundImage: "url('/images/sekolah_hero.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
                
                <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 lg:py-0">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-white max-w-xl">
                            <Badge className="bg-blue-600/20 text-blue-400 border-none px-4 py-1.5 rounded-full text-xs font-bold tracking-widest gap-2 uppercase">
                                <School className="h-3.5 w-3.5" /> Selamat Datang
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                                SMK Bakti <br /> Nusantara 666
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                                Sekolah Menengah Kejuruan yang berkomitmen untuk mencetak generasi unggul, kreatif, dan berkarakter. Kami siap membekali siswa dengan keterampilan yang dibutuhkan di era digital.
                            </p>
                        </div>
                        <div className="hidden lg:block relative p-4 bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden">
                            <img
                                src="/images/sekolah_hero.png"
                                alt="SMK BN666"
                                className="rounded-[2.5rem] w-full aspect-video object-cover"
                                onError={(e) => { e.target.src = 'https://placehold.co/800x450?text=SMK+BN666'; }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Articles Section */}
            {popularWorks?.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center mb-16 text-center space-y-4">
                            <div className="h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm mb-2">
                                <Star className="h-8 w-8 fill-current" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
                                <span className="italic">Artikel Populer</span>
                            </h2>
                            <p className="text-slate-500 max-w-2xl font-medium">Karya terbaik dan paling banyak disukai oleh komunitas SMK Bakti Nusantara 666.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {popularWorks.map((work) => (
                                <WorkCard key={work.id} work={work} onClick={() => router.visit(`/works/${work.id}`)} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/popular">
                                <Button variant="outline" className="h-12 px-8 rounded-full font-bold border-2 gap-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                    <ExternalLink className="h-4 w-4" /> Lihat Semua Artikel Populer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Events OSIS Section */}
            {upcomingEvents?.length > 0 && (
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center mb-20 text-center space-y-4">
                            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                <CalendarDays className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Agenda Kegiatan OSIS</h2>
                            <p className="text-slate-500 max-w-2xl font-medium uppercase tracking-[0.1em] text-xs">Ayo berpartisipasi dan ramaikan setiap kegiatan seru di sekolah!</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>

                        <div className="text-center mt-16">
                            <Link href="/events/upcoming">
                                <Button variant="outline" className="h-14 px-10 rounded-full font-bold shadow-xl bg-white border-none text-slate-900 hover:bg-blue-600 hover:text-white transition-all gap-3">
                                    <Calendar className="h-5 w-5 text-blue-600 group-hover:text-white" /> Lihat Semua Agenda
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Filter Section */}
            <section className="py-12 bg-white sticky top-16 z-40 border-b border-slate-100/10 shadow-sm backdrop-blur-md bg-white/80">
                <div className="container mx-auto px-6 overflow-x-auto scrollbar-none">
                    <div className="flex items-center gap-3 py-2 min-w-max">
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => handleFilter(f.key)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                                    currentType === f.key
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {f.icon} {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Feed Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                            <span className="h-2 w-8 bg-blue-600 rounded-full" />
                            {FILTERS.find(f => f.key === currentType)?.label || 'Semua'} Konten
                        </h2>
                    </div>

                    {works?.data?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {works.data.map((work) => (
                                    <WorkCard key={work.id} work={work} onClick={() => router.visit(`/works/${work.id}`)} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {works.last_page > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-20">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-12 w-12 rounded-2xl border-2 hover:bg-blue-600 hover:text-white"
                                        disabled={works.current_page === 1}
                                        onClick={() => router.get('/', { type: currentType !== 'all' ? currentType : undefined, page: works.current_page - 1 })}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    
                                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                                        {[...Array(works.last_page)].map((_, i) => {
                                            const page = i + 1;
                                            return (
                                                <Button 
                                                    key={page} 
                                                    variant={page === works.current_page ? 'default' : 'ghost'} 
                                                    className={cn(
                                                        "h-10 w-10 text-xs font-bold rounded-xl transition-all",
                                                        page === works.current_page ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : ""
                                                    )}
                                                    onClick={() => router.get('/', { type: currentType !== 'all' ? currentType : undefined, page })}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        })}
                                    </div>

                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-12 w-12 rounded-2xl border-2 hover:bg-blue-600 hover:text-white"
                                        disabled={works.current_page === works.last_page}
                                        onClick={() => router.get('/', { type: currentType !== 'all' ? currentType : undefined, page: works.current_page + 1 })}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-32 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200">
                            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <Inbox className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Tidak ada konten tersedia</h3>
                            <p className="text-slate-400 max-w-xs mx-auto mt-2 font-medium">Coba cari kategori lain.</p>
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}

