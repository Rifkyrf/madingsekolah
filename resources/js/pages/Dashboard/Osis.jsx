import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CalendarDays, Clock, CheckCircle, History, Plus, List, Users, Upload, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

function StatCard({ label, value, color, icon: Icon }) {
    const colors = {
        blue: 'bg-blue-600',
        green: 'bg-green-600',
        yellow: 'bg-yellow-500',
        cyan: 'bg-cyan-500',
    };
    return (
        <div className={`${colors[color]} text-white rounded-xl p-5 flex justify-between items-center shadow`}>
            <div>
                <p className="text-sm font-medium opacity-90">{label}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
            </div>
            <Icon className="h-10 w-10 opacity-60" />
        </div>
    );
}

function EventList({ events, emptyText }) {
    if (!events?.length) return (
        <div className="text-center py-8 text-gray-400">
            <CalendarDays className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">{emptyText}</p>
        </div>
    );
    return (
        <div className="divide-y">
            {events.map((e, i) => (
                <div key={e.id} className="flex gap-3 py-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <CalendarDays className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{e.title}</p>
                        <p className="text-xs text-gray-500 truncate">{e.description}</p>
                        <p className="text-xs text-blue-600 mt-0.5">{e.event_date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function DashboardOsis({ stats, recentEvents, upcomingEvents }) {
    const { auth } = usePage().props;
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                            <Users className="h-6 w-6" /> Dashboard OSIS
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Selamat datang, {auth?.user?.name}!</p>
                    </div>
                    <Link href="/osis/events/create">
                        <Button className="gap-2"><Plus className="h-4 w-4" /> Buat Event</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Event" value={stats.total_events} color="blue" icon={CalendarDays} />
                    <StatCard label="Event Mendatang" value={stats.upcoming_events} color="green" icon={Clock} />
                    <StatCard label="Sedang Berlangsung" value={stats.ongoing_events} color="yellow" icon={CheckCircle} />
                    <StatCard label="Event Selesai" value={stats.past_events} color="cyan" icon={History} />
                </div>

                {/* Event Lists */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <h5 className="font-semibold flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Event Mendatang</h5>
                            <Link href="/osis/events" className="text-xs text-blue-600 hover:underline">Lihat Semua</Link>
                        </div>
                        <div className="p-5">
                            <EventList events={upcomingEvents} emptyText="Belum ada event mendatang" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <h5 className="font-semibold flex items-center gap-2"><History className="h-4 w-4" /> Event Terbaru</h5>
                            <Link href="/osis/events" className="text-xs text-blue-600 hover:underline">Lihat Semua</Link>
                        </div>
                        <div className="p-5">
                            <EventList events={recentEvents} emptyText="Belum ada event" />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="px-5 py-4 border-b">
                        <h5 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4" /> Aksi Cepat</h5>
                    </div>
                    <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Link href="/osis/events/create"><Button variant="outline" className="w-full gap-2"><Plus className="h-4 w-4" /> Buat Event</Button></Link>
                        <Link href="/osis/events"><Button variant="outline" className="w-full gap-2"><List className="h-4 w-4" /> Kelola Event</Button></Link>
                        <Link href="/osis"><Button variant="outline" className="w-full gap-2"><Users className="h-4 w-4" /> Struktur OSIS</Button></Link>
                        <Link href="/upload"><Button variant="outline" className="w-full gap-2"><Upload className="h-4 w-4" /> Upload Karya</Button></Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
