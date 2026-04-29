import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
    CheckCircle, XCircle, ArrowLeft, 
    Download, Eye, User, Calendar, 
    FileText, ShieldCheck, Star, 
    Loader2, AlertTriangle, Terminal
} from 'lucide-react';
import { router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ModerasiPreview({ work }) {
    const [acting, setActing] = useState(false);

    const handleAction = (type) => {
        setActing(true);
        if (type === 'publish') {
            router.post(`/moderasi/${work.id}/publish`, {}, {
                onFinish: () => setActing(false)
            });
        } else if (type === 'reject') {
             if (confirm('Yakin ingin menghapus karya ini?')) {
                router.delete(`/works/${work.id}`, {
                    onFinish: () => setActing(false)
                });
             } else {
                 setActing(false)
             }
        }
    };

    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(work.file_type?.toLowerCase());

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-10">
                    <div className="flex items-center gap-5">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-sm" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="space-y-1">
                            <Badge className="bg-amber-500/10 text-amber-600 border-none px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                                PENDING MODERATION
                            </Badge>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">{work.title}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button 
                            disabled={acting}
                            variant="outline" 
                            className="h-14 px-8 rounded-2xl font-black tracking-widest border-2 text-rose-500 border-rose-50 hover:bg-rose-50"
                            onClick={() => handleAction('reject')}
                        >
                            <XCircle className="h-5 w-5 mr-2" /> REJECT
                        </Button>
                        <Button 
                            disabled={acting}
                            className="h-14 px-10 rounded-2xl font-black tracking-widest shadow-xl shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600"
                            onClick={() => handleAction('publish')}
                        >
                            {acting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CheckCircle className="h-5 w-5 mr-2" />} 
                            PUBLISH NOW
                        </Button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Content Preview */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-4 lg:p-10 border shadow-2xl flex items-center justify-center relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8">
                                <ShieldCheck className="h-12 w-12 text-primary opacity-10" />
                           </div>
                           
                           <div className="w-full relative z-10">
                                {isImage ? (
                                    <img 
                                        src={`/storage/${work.file_path}`} 
                                        alt={work.title} 
                                        className="w-full rounded-[2rem] shadow-2xl object-contain max-h-[700px] ring-8 ring-slate-50" 
                                    />
                                ) : (
                                    <div className="py-40 flex flex-col items-center justify-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed gap-6">
                                        <div className="h-24 w-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-primary">
                                            <FileText className="h-12 w-12" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-black text-slate-800 tracking-tight uppercase">FILE DOKUMEN</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">.{work.file_type?.toUpperCase()} Format</p>
                                        </div>
                                        <a href={`/storage/${work.file_path}`} target="_blank">
                                            <Button className="h-12 px-8 rounded-xl font-black tracking-widest">DOWNLOAD FILE</Button>
                                        </a>
                                    </div>
                                )}
                           </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 border shadow-sm space-y-8">
                             <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Terminal className="h-4 w-4" /> Deskripsi Karya
                                </h3>
                                <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                                    "{work.description || 'Tidak ada deskripsi dari penulis.'}"
                                </p>
                             </div>

                             <div className="pt-8 border-t space-y-4">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" /> Catatan Moderator
                                </h3>
                                <textarea 
                                    className="w-full h-32 p-6 rounded-2xl bg-slate-50 border-none text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none shadow-inner"
                                    placeholder="Opsional: Tambahkan alasan jika Anda mereview karya ini..."
                                />
                             </div>
                        </div>
                    </div>

                    {/* Meta Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[3.5rem] p-10 border shadow-sm space-y-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                                    <AvatarImage src={work.user?.profile_photo_url} />
                                    <AvatarFallback className="text-xl font-bold">{work.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Penulis</p>
                                    <h3 className="text-xl font-black tracking-tight text-slate-800 uppercase italic leading-none">{work.user?.name}</h3>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <DetailItem icon={Calendar} label="Diajukan pada" value={work.created_at_human} />
                                <DetailItem icon={Star} label="Kategori" value={work.type_label} />
                                <DetailItem icon={User} label="Status Akun" value="TERVERIFIKASI" />
                            </div>

                            <div className="pt-4">
                                <Link href={`/profile/${work.user?.id}`}>
                                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black tracking-widest text-[11px]">
                                        LIHAT SEMUA KARYA PENULIS
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-4">
                             <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                <Star className="h-5 w-5 fill-current" />
                                <span className="text-xs font-black uppercase tracking-widest">Pedoman Kurasi</span>
                             </div>
                             <ul className="space-y-4 text-xs font-medium text-slate-400 italic">
                                <li>• Pastikan tidak mengandung SARA/Pornografi.</li>
                                <li>• Kualitas visual harus standar mading BN666.</li>
                                <li>• Deskripsi mencerminkan isi karya dengan baik.</li>
                             </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="bg-slate-50 rounded-2xl p-5 space-y-1 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-black text-slate-700 italic uppercase">{value}</p>
            </div>
        </div>
    );
}
