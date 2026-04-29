import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ConfirmModal from '@/components/ConfirmModal';
import {
    Heart, MessageCircle, Share2, Download, Pencil, Trash2,
    FileText, ArrowRight, X, Send, Loader2, Copy, Check,
    Calendar, User, ExternalLink
} from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

function SharePopover({ url, onClose }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard?.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border rounded-2xl shadow-xl z-10 p-4 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Bagikan Tautan</p>
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border">
                <p className="flex-1 text-xs font-medium text-slate-600 truncate">{url}</p>
                <Button size="sm" className="rounded-lg shrink-0 h-7 gap-1.5 text-[10px] font-bold" onClick={copy}>
                    {copied ? <><Check className="h-3 w-3" />Tersalin</> : <><Copy className="h-3 w-3" />Salin</>}
                </Button>
            </div>
        </div>
    );
}

export default function WorkModal({ work: initialWork, open, onClose, onLikeChange }) {
    const { auth } = usePage().props;
    const [work, setWork] = useState(initialWork);
    const [liked, setLiked] = useState(initialWork?.userLiked ?? false);
    const [likesCount, setLikesCount] = useState(initialWork?.likes_count ?? 0);
    const [comments, setComments] = useState(initialWork?.comments ?? []);
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showShare, setShowShare] = useState(false);

    if (!work) return null;

    const ext = work.file_type?.toLowerCase() ?? '';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
    const isVideo = ['mp4', 'webm', 'mov', 'avi'].includes(ext);
    const fileUrl = `/storage/${work.file_path}`;
    const canEdit = auth?.user && (auth.user.id === work.user_id || auth.user.is_admin || auth.user.is_guru);

    const handleLike = async () => {
        if (!auth?.user) { router.visit('/login'); return; }
        try {
            const res = await axios.post(`/works/${work.id}/like`);
            setLiked(res.data.liked);
            setLikesCount(res.data.count);
            onLikeChange?.(work.id, res.data.liked, res.data.count);
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

    const handleDelete = () => {
        setDeleting(true);
        router.delete(`/works/${work.id}`, {
            onSuccess: () => { onClose(); router.reload(); },
            onFinish: () => setDeleting(false),
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden rounded-3xl max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 ring-2 ring-primary/10">
                                <AvatarImage src={work.user?.profile_photo_url} />
                                <AvatarFallback className="text-xs font-bold bg-primary/5 text-primary">{work.user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-black text-sm text-slate-800 leading-none">{work.user?.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{work.created_at_formatted?.split(',')[0]}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={`/works/${work.id}`} target="_blank">
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" title="Buka halaman penuh">
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div className="relative">
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl" onClick={() => setShowShare(!showShare)}>
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                {showShare && <SharePopover url={`${window.location.origin}/works/${work.id}`} onClose={() => setShowShare(false)} />}
                            </div>
                            {canEdit && (
                                <>
                                    <Link href={`/works/${work.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50" onClick={() => setConfirmDelete(true)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
                        {/* Preview */}
                        <div className="lg:flex-1 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 min-h-[200px] lg:min-h-0 overflow-hidden">
                            {isImage && (
                                <img src={fileUrl} alt={work.title}
                                    className="max-h-[50vh] lg:max-h-full max-w-full object-contain rounded-2xl shadow-lg"
                                    onError={(e) => { e.target.src = 'https://placehold.co/800x600?text=Error'; }} />
                            )}
                            {isVideo && (
                                <video controls className="max-h-[50vh] lg:max-h-full max-w-full rounded-2xl shadow-lg">
                                    <source src={fileUrl} type={`video/${ext}`} />
                                </video>
                            )}
                            {!isImage && !isVideo && (
                                <div className="flex flex-col items-center gap-4 py-12">
                                    <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center shadow-lg text-primary">
                                        <FileText className="h-10 w-10" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-slate-700 uppercase tracking-tight">Dokumen .{ext.toUpperCase()}</p>
                                        <p className="text-xs text-slate-400 mt-1">{work.title}</p>
                                    </div>
                                    <a href={fileUrl} target="_blank" rel="noreferrer">
                                        <Button className="gap-2 rounded-xl font-bold">
                                            Buka Dokumen <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Right Panel: Info + Comments */}
                        <div className="lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l overflow-hidden">
                            {/* Info */}
                            <div className="p-5 border-b space-y-3 shrink-0">
                                <h2 className="font-black text-slate-800 text-base leading-tight">{work.title}</h2>
                                {work.description && (
                                    <p className="text-xs text-slate-500 leading-relaxed italic">"{work.description}"</p>
                                )}
                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-1">
                                    <button onClick={handleLike} className={cn(
                                        'flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-colors',
                                        liked ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-500'
                                    )}>
                                        <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
                                        {likesCount}
                                    </button>
                                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-50 text-slate-500">
                                        <MessageCircle className="h-4 w-4" />
                                        {comments.length}
                                    </span>
                                    <a href={fileUrl} download className="ml-auto">
                                        <Button size="sm" variant="outline" className="rounded-xl gap-1.5 font-bold h-9">
                                            <Download className="h-3.5 w-3.5" /> Unduh
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Comments */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
                                {comments.length === 0 ? (
                                    <div className="py-8 text-center text-slate-300">
                                        <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                                        <p className="text-xs font-bold italic">Belum ada komentar</p>
                                    </div>
                                ) : comments.map((c) => (
                                    <div key={c.id} className="flex gap-2.5">
                                        <Avatar className="h-7 w-7 shrink-0">
                                            <AvatarImage src={c.user?.profile_photo_url} />
                                            <AvatarFallback className="text-[10px] font-bold">{c.user?.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 bg-slate-50 rounded-2xl px-3 py-2">
                                            <p className="text-[10px] font-black text-slate-700 uppercase">{c.user?.name}</p>
                                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{c.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Comment Input */}
                            <div className="p-4 border-t shrink-0">
                                {auth?.user ? (
                                    <form onSubmit={handleComment} className="flex gap-2">
                                        <input
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Tulis komentar..."
                                            className="flex-1 bg-slate-50 rounded-xl px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20 border-none"
                                        />
                                        <Button type="submit" size="icon" disabled={submitting || !commentText.trim()} className="h-9 w-9 rounded-xl shrink-0">
                                            {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                                        </Button>
                                    </form>
                                ) : (
                                    <Link href="/login">
                                        <Button size="sm" className="w-full rounded-xl font-bold">Login untuk komentar</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmModal
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title="Hapus Karya Ini?"
                description={`"${work.title}" akan dihapus permanen.`}
                confirmText="Ya, Hapus"
                variant="danger"
                loading={deleting}
            />
        </>
    );
}
