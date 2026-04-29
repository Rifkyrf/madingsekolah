import AppLayout from '@/layouts/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ConfirmModal from '@/components/ConfirmModal';
import ConfirmModal from '@/components/ConfirmModal';
import { router } from '@inertiajs/react';
import { ShieldCheck, Search, CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import axios from 'axios';

export default function Drafts({ drafts, search }) {
    const [searchValue, setSearchValue] = useState(search || '');
    const [confirm, setConfirm] = useState(null); // { type: 'publish'|'reject', draft }
    const [acting, setActing] = useState(null);
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/moderasi/drafts', { search: searchValue }, { preserveState: true });
    };

    const doAction = () => {
        if (!confirm) return;
        setActing(confirm.draft.id);
        if (confirm.type === 'publish') {
            router.post(`/moderasi/${confirm.draft.id}/publish`, {}, {
                onFinish: () => { setActing(null); setConfirm(null); }
            });
        } else {
            router.delete(`/works/${confirm.draft.id}`, {
                onFinish: () => { setActing(null); setConfirm(null); }
            });
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <h1 className="text-2xl font-black tracking-tight">Moderasi Draft</h1>
                        </div>
                        <p className="text-sm text-muted-foreground">Tinjau dan publikasikan karya siswa</p>
                    </div>
                    <form onSubmit={handleSearch} className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Cari judul atau penulis..."
                            className="w-full h-10 pl-9 pr-4 rounded-2xl bg-white border text-sm outline-none focus:ring-4 focus:ring-primary/5"
                        />
                    </form>
                </div>

                {/* Table */}
                <Card className="rounded-3xl border shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b">
                                        <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Karya</th>
                                        <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden md:table-cell">Penulis</th>
                                        <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden sm:table-cell">Kategori</th>
                                        <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hidden lg:table-cell">Waktu</th>
                                        <th className="p-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {drafts.data.length > 0 ? drafts.data.map((draft) => (
                                        <tr key={draft.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                                        <img
                                                            src={draft.thumbnail_url || 'https://placehold.co/100x100?text=?'}
                                                            alt={draft.title}
                                                            className="h-full w-full object-cover"
                                                            onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=?'; }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-800 line-clamp-1">{draft.title}</p>
                                                        <p className="text-[10px] text-slate-400 line-clamp-1 italic mt-0.5">{draft.description || 'Tanpa deskripsi'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7">
                                                        <AvatarImage src={draft.user?.profile_photo_url} />
                                                        <AvatarFallback className="text-[10px] font-bold">{draft.user?.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-xs font-bold text-slate-600">{draft.user?.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 hidden sm:table-cell">
                                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-2 rounded-full px-3">
                                                    {draft.type}
                                                </Badge>
                                            </td>
                                            <td className="p-4 hidden lg:table-cell">
                                                <span className="text-xs text-slate-400 font-medium">{draft.created_at_human}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost" size="icon"
                                                        className="h-9 w-9 rounded-xl hover:bg-slate-100"
                                                        title="Lihat Preview"
                                                        onClick={() => router.visit(`/moderator/works/${draft.id}`)}
                                                    >
                                                        <Eye className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="h-9 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold gap-1.5 text-[11px]"
                                                        disabled={acting === draft.id}
                                                        onClick={() => setConfirm({ type: 'publish', draft })}
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5" /> Publikasi
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="icon"
                                                        className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50"
                                                        title="Tolak & Hapus"
                                                        onClick={() => setConfirm({ type: 'reject', draft })}
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 text-slate-300">
                                                    <CheckCircle className="h-12 w-12 opacity-30" />
                                                    <p className="font-bold italic text-slate-400">Tidak ada data yang tersimpan.</p>
                                                    <p className="text-xs text-slate-300">Semua draft sudah dimoderasi!</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {drafts.last_page > 1 && (
                            <div className="p-4 border-t flex items-center justify-between">
                                <p className="text-xs text-slate-400 font-medium">
                                    {drafts.data.length} dari {drafts.total} draft
                                </p>
                                <div className="flex gap-2">
                                    {drafts.links.map((link, i) => (
                                        <Button key={i} variant={link.active ? 'default' : 'outline'}
                                            disabled={!link.url}
                                            className="h-8 w-8 p-0 rounded-xl text-xs font-bold"
                                            onClick={() => link.url && router.visit(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                open={!!confirm}
                onClose={() => setConfirm(null)}
                onConfirm={doAction}
                title={confirm?.type === 'publish' ? 'Publikasikan Karya?' : 'Tolak & Hapus Karya?'}
                description={
                    confirm?.type === 'publish'
                        ? `"${confirm?.draft?.title}" akan dipublikasikan dan penulis akan mendapat notifikasi.`
                        : `"${confirm?.draft?.title}" akan ditolak dan dihapus permanen. Penulis akan mendapat notifikasi penolakan.`
                }
                confirmText={confirm?.type === 'publish' ? 'Ya, Publikasikan' : 'Ya, Tolak & Hapus'}
                variant={confirm?.type === 'publish' ? 'save' : 'danger'}
                loading={acting === confirm?.draft?.id}
            />
        </AppLayout>
    );
}
