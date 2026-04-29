import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ConfirmModal from '@/components/ConfirmModal';
import {
    Heart, MessageCircle, Share2, ArrowLeft, ArrowRight, Download,
    Pencil, Trash2, Calendar, FileText, Send,
    MoreHorizontal, Sparkles, User, Globe, Copy, Check, Loader2
} from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

function CommentItem({ comment, auth, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const canEdit = auth?.user && (auth.user.id === comment.user_id || auth.user.role_name === 'admin' || auth.user.role_name === 'guru');

    const handleUpdate = async () => {
        await onUpdate(comment.id, content);
        setEditing(false);
    };

    return (
        <>
            <div className="group flex gap-4 py-6 border-b border-slate-50 last:border-0 animate-in fade-in duration-300">
                <Avatar className="h-10 w-10 shrink-0 ring-2 ring-slate-50">
                    <AvatarImage src={comment.user?.profile_photo_url} />
                    <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{comment.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-black text-xs text-slate-900 uppercase tracking-tight">{comment.user?.name}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment.created_at_human}</span>
                        </div>
                        {canEdit && !editing && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                <button onClick={() => setEditing(true)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                    <Pencil className="h-3 w-3 text-slate-400" />
                                </button>
                                <button onClick={() => setConfirmDelete(true)} className="p-2 hover:bg-rose-50 rounded-lg transition-colors">
                                    <Trash2 className="h-3 w-3 text-rose-400" />
                                </button>
                            </div>
                        )}
                    </div>
                    {editing ? (
                        <div className="flex flex-col gap-3 mt-2">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full text-sm border-none bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                            />
                            <div className="flex gap-2 justify-end">
                                <Button size="sm" variant="ghost" className="rounded-xl font-bold" onClick={() => setEditing(false)}>Batal</Button>
                                <Button size="sm" className="rounded-xl font-black tracking-widest px-6" onClick={handleUpdate}>SIMPAN</Button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{comment.content}"</p>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={() => { onDelete(comment.id); setConfirmDelete(false); }}
                title="Hapus Komentar?"
                description="Komentar ini akan dihapus permanen dan tidak bisa dikembalikan."
                confirmText="Ya, Hapus"
                variant="danger"
            />
        </>
    );
}

function ShareModal({ open, onClose, url }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard?.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Bagikan Karya</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 bg-slate-50 rounded-2xl p-3 border">
                    <p className="flex-1 text-xs font-medium text-slate-600 truncate">{url}</p>
                    <Button size="sm" className="rounded-xl shrink-0 gap-2 font-bold" onClick={copy}>
                        {copied ? <><Check className="h-3.5 w-3.5" /> Tersalin!</> : <><Copy className="h-3.5 w-3.5" /> Salin</>}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function WorkShow({ work, comments: initialComments, userLiked: initialLiked }) {
    const { auth } = usePage().props;
    const [liked, setLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(work.likes_count ?? 0);
    const [comments, setComments] = useState(initialComments ?? []);
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    const ext = work.file_type?.toLowerCase() ?? '';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
    const isVideo = ['mp4', 'webm', 'mov', 'avi'].includes(ext);
    const fileUrl = `/storage/${work.file_path}`;

    const handleLike = async () => {
        if (!auth?.user) { router.visit('/login'); return; }
        try {
            const res = await axios.post(`/works/${work.id}/like`);
            setLiked(res.data.liked);
            setLikesCount(res.data.count);
        } catch {}
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setSubmitting(true);
        try {
            const res = await axios.post('/comments', { work_id: work.id, content: commentText });
            setComments([res.data.comment, ...comments]);
            setCommentText('');
        } catch {}
        setSubmitting(false);
    };

    const handleDeleteComment = async (id) => {
        await axios.delete(`/comments/${id}`);
        setComments(comments.filter(c => c.id !== id));
    };

    const handleUpdateComment = async (id, content) => {
        await axios.put(`/comments/${id}`, { content });
        setComments(comments.map(c => c.id === id ? { ...c, content } : c));
    };

    const handleDelete = async () => {
        setDeleting(true);
        router.delete(`/works/${work.id}`, {
            onSuccess: () => router.visit('/dashboard'),
            onFinish: () => setDeleting(false),
        });
    };

    const canEdit = auth?.user && (auth.user.id === work.user_id || auth.user.is_admin || auth.user.is_guru);

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-6 space-y-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Preview & Meta */}
                    <div className="lg:col-span-8 space-y-6">
                        <header className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 px-6 rounded-3xl border shadow-sm">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl bg-slate-50 hover:bg-slate-100" onClick={() => window.history.back()}>
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-widest">
                                        <Globe className="h-3 w-3" /> PUBLIKASI KARYA
                                    </div>
                                    <h1 className="text-xl font-black text-slate-800 tracking-tight">{work.title}</h1>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl bg-primary/5 text-primary hover:bg-primary/10" onClick={() => setShareOpen(true)}>
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </header>

                        {/* Preview */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-10 shadow-sm border flex items-center justify-center relative overflow-hidden group min-h-[300px]">
                            <Sparkles className="absolute top-6 right-6 h-10 w-10 text-primary opacity-5 group-hover:opacity-20 transition-opacity" />
                            <div className="relative z-10 w-full flex justify-center">
                                {isImage && (
                                    <img src={fileUrl} alt={work.title}
                                        className="max-h-[500px] rounded-2xl shadow-xl object-contain ring-4 ring-slate-50 hover:scale-[1.01] transition-transform duration-500"
                                        onError={(e) => { e.target.src = 'https://placehold.co/800x600?text=Karya+Siswa'; }} />
                                )}
                                {isVideo && (
                                    <video controls className="w-full max-h-[500px] rounded-2xl shadow-xl ring-4 ring-slate-50">
                                        <source src={fileUrl} type={`video/${ext}`} />
                                    </video>
                                )}
                                {!isImage && !isVideo && (
                                    <div className="w-full py-24 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed gap-5">
                                        <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center shadow-lg text-primary">
                                            <FileText className="h-10 w-10" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-black text-slate-800 tracking-tight">DOKUMEN TERUNGGAH</p>
                                            <p className="text-xs font-medium text-slate-400">Format: .{ext.toUpperCase()}</p>
                                        </div>
                                        <a href={fileUrl} target="_blank" rel="noreferrer">
                                            <Button className="h-11 px-7 rounded-xl font-black tracking-widest gap-2">
                                                BUKA DOKUMEN <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-slate-400">
                                <FileText className="h-4 w-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Deskripsi Karya</span>
                            </div>
                            <p className="text-base text-slate-600 font-medium leading-relaxed italic">
                                "{work.description || 'Penulis tidak menyertakan deskripsi untuk karya ini.'}"
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleLike}
                                    className={cn(
                                        'h-12 px-6 rounded-2xl font-black tracking-widest gap-2 transition-all shadow-lg',
                                        liked ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20' : 'bg-white text-slate-600 hover:bg-slate-50 border shadow-slate-200/50'
                                    )}
                                >
                                    <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
                                    {likesCount} LIKES
                                </Button>
                                <Button variant="outline" className="h-12 px-6 rounded-2xl font-black tracking-widest gap-2 bg-white border-2">
                                    <MessageCircle className="h-4 w-4" />
                                    {comments.length}
                                </Button>
                            </div>
                            <a href={fileUrl} download>
                                <Button className="h-12 px-8 rounded-2xl font-black tracking-widest gap-2 shadow-lg shadow-primary/20">
                                    <Download className="h-4 w-4" /> UNDUH
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Right: Author & Comments */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Author Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border shadow-sm space-y-5">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-14 w-14 ring-4 ring-primary/10">
                                    <AvatarImage src={work.user?.profile_photo_url} />
                                    <AvatarFallback className="text-lg font-bold bg-primary/5 text-primary">{work.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Penulis</p>
                                    <h3 className="text-lg font-black tracking-tight text-slate-800 uppercase italic leading-tight">{work.user?.name}</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-2xl p-3 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> Tanggal
                                    </span>
                                    <p className="text-xs font-bold text-slate-700">{work.created_at_formatted?.split(',')[0]}</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-3 space-y-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <User className="h-3 w-3" /> Role
                                    </span>
                                    <p className="text-xs font-bold text-slate-700 capitalize">{work.user?.role_name}</p>
                                </div>
                            </div>

                            <Link href={`/profile/${work.user_id}`}>
                                <Button variant="ghost" className="w-full h-11 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary/5 hover:text-primary gap-2">
                                    Lihat Profil <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>

                            {canEdit && (
                                <div className="pt-4 border-t grid grid-cols-2 gap-3">
                                    <Link href={`/works/${work.id}/edit`}>
                                        <Button variant="outline" className="w-full h-11 rounded-xl border-2 font-bold gap-2">
                                            <Pencil className="h-4 w-4" /> EDIT
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" className="h-11 rounded-xl font-bold gap-2" onClick={() => setConfirmDelete(true)}>
                                        <Trash2 className="h-4 w-4" /> HAPUS
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Comments */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border shadow-sm flex flex-col" style={{ maxHeight: '560px' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xs font-black tracking-widest uppercase text-slate-400">Tanggapan ({comments.length})</h3>
                                <MoreHorizontal className="h-4 w-4 text-slate-300" />
                            </div>

                            <div className="flex-1 overflow-y-auto pr-1 scrollbar-none">
                                {comments.length > 0 ? (
                                    comments.map((c) => (
                                        <CommentItem key={c.id} comment={c} auth={auth}
                                            onDelete={handleDeleteComment} onUpdate={handleUpdateComment} />
                                    ))
                                ) : (
                                    <div className="h-32 flex flex-col items-center justify-center text-center opacity-30">
                                        <MessageCircle className="h-10 w-10 mb-2" />
                                        <p className="text-xs font-bold italic">Belum ada tanggapan.</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t mt-4">
                                {auth?.user ? (
                                    <form onSubmit={handleComment} className="relative">
                                        <textarea
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Tulis pendapat kamu..."
                                            maxLength={1000}
                                            className="w-full h-20 p-4 pr-14 rounded-2xl bg-slate-50 border-none text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            disabled={submitting || !commentText.trim()}
                                            className="absolute bottom-3 right-3 h-9 w-9 rounded-xl shadow-md shadow-primary/20"
                                        >
                                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="bg-slate-50 rounded-2xl p-5 text-center space-y-3 border border-dashed">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Login untuk komentar</p>
                                        <Link href="/login">
                                            <Button size="sm" className="rounded-xl font-black px-8">LOGIN</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title="Hapus Karya Ini?"
                description={`Karya "${work.title}" akan dihapus permanen beserta semua komentar dan likes-nya.`}
                confirmText="Ya, Hapus Permanen"
                variant="danger"
                loading={deleting}
            />

            <ShareModal
                open={shareOpen}
                onClose={() => setShareOpen(false)}
                url={window.location.href}
            />
        </AppLayout>
    );
}
