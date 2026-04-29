import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { router, Link, useForm } from '@inertiajs/react';
import { Layers, Plus, Trash2, Edit3, Eye, MoreVertical, CheckCircle2, Clock, Send, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function MadingCard({ mading }) {
    const isDraft = mading.status === 'draft';

    const handlePublish = () => {
        router.post(`/mading/${mading.id}/publish`);
    };

    const handleUnpublish = () => {
        router.post(`/mading/${mading.id}/unpublish`);
    };

    const handleDelete = () => {
        if (confirm('Hapus mading ini?')) router.delete(`/mading/${mading.id}`);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img
                    src={mading.thumbnail_url || 'https://placehold.co/800x450?text=Mading'}
                    alt={mading.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://placehold.co/800x450?text=Mading'; }}
                />
                <div className="absolute top-3 left-3">
                    <Badge className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border-none',
                        isDraft ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white')}>
                        {isDraft ? 'Draft' : 'Terbit'}
                    </Badge>
                </div>
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link href={`/mading/${mading.id}`}>
                        <Button size="icon" className="h-9 w-9 rounded-xl bg-white text-slate-900 hover:bg-white/90">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={`/mading/${mading.id}/edit`}>
                        <Button size="icon" className="h-9 w-9 rounded-xl bg-white text-slate-900 hover:bg-white/90">
                            <Edit3 className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-slate-900 truncate">{mading.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">{mading.created_at_human}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                                <MoreVertical className="h-4 w-4 text-slate-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl p-1.5 min-w-[160px]">
                            <DropdownMenuItem className="rounded-lg gap-2 text-xs font-semibold p-2.5" onClick={() => router.visit(`/mading/${mading.id}/edit`)}>
                                <Edit3 className="h-3.5 w-3.5" /> Edit Mading
                            </DropdownMenuItem>
                            {isDraft ? (
                                <DropdownMenuItem className="rounded-lg gap-2 text-xs font-semibold p-2.5 text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50" onClick={handlePublish}>
                                    <Send className="h-3.5 w-3.5" /> Terbitkan
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem className="rounded-lg gap-2 text-xs font-semibold p-2.5 text-amber-600 focus:text-amber-600 focus:bg-amber-50" onClick={handleUnpublish}>
                                    <RotateCcw className="h-3.5 w-3.5" /> Tarik ke Draft
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="rounded-lg gap-2 text-xs font-semibold p-2.5 text-rose-500 focus:text-rose-600 focus:bg-rose-50" onClick={handleDelete}>
                                <Trash2 className="h-3.5 w-3.5" /> Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold">
                    {isDraft ? (
                        <span className="flex items-center gap-1 text-amber-500"><Clock className="h-3 w-3" /> Menunggu Moderasi</span>
                    ) : (
                        <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 className="h-3 w-3" /> Sudah Terbit</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MadingArchive({ madings }) {
    const drafts = madings?.data?.filter(m => m.status === 'draft') || [];
    const published = madings?.data?.filter(m => m.status === 'published') || [];

    return (
        <AppLayout>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Draft */}
                <aside className="lg:w-72 shrink-0">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-20">
                        <div className="px-4 py-3 border-b bg-amber-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <h3 className="font-bold text-sm text-amber-700">Draft Saya</h3>
                            </div>
                            <Badge className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-none">
                                {drafts.length}
                            </Badge>
                        </div>
                        <div className="divide-y max-h-[60vh] overflow-y-auto">
                            {drafts.length > 0 ? drafts.map(m => (
                                <div key={m.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                        <img src={m.thumbnail_url || 'https://placehold.co/80x80?text=M'} alt={m.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=M'; }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-800 truncate">{m.title}</p>
                                        <p className="text-[10px] text-slate-400">{m.created_at_human}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link href={`/mading/${m.id}/edit`}>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                                                <Edit3 className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-emerald-500 hover:bg-emerald-50"
                                            onClick={() => router.post(`/mading/${m.id}/publish`)}>
                                            <Send className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )) : (
                                <div className="py-8 text-center text-slate-400">
                                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                    <p className="text-xs">Tidak ada draft</p>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-black text-slate-900">Arsip Mading Saya</h1>
                            <p className="text-slate-500 text-sm mt-0.5">Kelola semua mading yang pernah kamu buat</p>
                        </div>
                        <Link href="/mading/canvas">
                            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold">
                                <Plus className="h-4 w-4" /> Buat Mading
                            </Button>
                        </Link>
                    </div>

                    {madings?.data?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {madings.data.map(m => <MadingCard key={m.id} mading={m} />)}
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                            <Layers className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="font-bold text-slate-600">Belum ada mading</h3>
                            <p className="text-slate-400 text-sm mt-1">Mulai buat mading digitalmu sekarang!</p>
                            <Link href="/mading/canvas" className="mt-4 inline-block">
                                <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2 text-sm">
                                    <Plus className="h-4 w-4" /> Buat Mading
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
