import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ArrowLeft } from 'lucide-react';

export default function OsisEventsArchive({ events }) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Arsip Event OSIS</h1>
                    <Link href="/osis/events"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Kembali ke Event</Button></Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events?.data?.map(event => (
                        <div key={event.id} className="bg-white rounded-xl border shadow-sm overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                            {event.photo_url && <img src={event.photo_url} alt={event.title} className="w-full h-48 object-cover" />}
                            <div className="p-4 space-y-2">
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{event.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 flex items-center gap-1"><CalendarDays className="h-4 w-4" />{event.event_date}</span>
                                    <Badge variant="secondary">Selesai</Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!events?.data?.length && (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-30" />
                            <p>Belum ada arsip event.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
