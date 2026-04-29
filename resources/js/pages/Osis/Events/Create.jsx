import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { 
    Calendar, ArrowLeft, Image as ImageIcon, 
    FileText, Zap, Sparkles, Loader2, Save
} from 'lucide-react';
import { useState } from 'react';

export default function OsisEventCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        event_date: '',
        photo: null
    });

    const [preview, setPreview] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        post('/osis/events');
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-10 duration-700">
                <header className="mb-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">TAMBAH EVENT</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Publikasikan program kerja OSIS BN666.</p>
                    </div>
                    <Link href="/osis/events">
                        <Button variant="ghost" className="rounded-2xl h-12 px-6 font-black tracking-widest bg-slate-50">
                            <ArrowLeft className="h-4 w-4 mr-2" /> BATAL
                        </Button>
                    </Link>
                </header>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10">
                    {/* Main Form */}
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="rounded-[3rem] border shadow-2xl overflow-hidden glass-card">
                            <CardContent className="p-10 space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Judul Program Kerja</label>
                                    <input 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: HUT BN666 KE-25"
                                        className="w-full text-2xl font-black tracking-tight uppercase italic bg-slate-50/50 border-none rounded-3xl p-8 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                    {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.title}</p>}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Deskripsi Kegiatan</label>
                                    <textarea 
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Jelaskan detail kegiatan, tujuan, dan rangkaian acara..."
                                        className="w-full h-48 bg-slate-50/50 border-none rounded-[2.5rem] p-8 text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                                    />
                                    {errors.description && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Tanggal Pelaksanaan</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary" />
                                            <input 
                                                type="date"
                                                value={data.event_date}
                                                onChange={e => setData('event_date', e.target.value)}
                                                className="w-full bg-slate-50/50 border-none rounded-2xl h-14 pl-14 pr-6 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                            />
                                        </div>
                                        {errors.event_date && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.event_date}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar: Photo & Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden bg-slate-900 text-white">
                            <CardHeader className="p-8">
                                <CardTitle className="text-xs font-black tracking-widest uppercase flex items-center gap-2 text-primary">
                                    <ImageIcon className="h-4 w-4" /> Poster Event
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                <div 
                                    className="aspect-square rounded-[2rem] bg-slate-800 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-800/50 transition-all group relative overflow-hidden"
                                    onClick={() => document.getElementById('photo-upload').click()}
                                >
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center p-6 space-y-2">
                                            <Zap className="h-10 w-10 mx-auto text-slate-600 group-hover:text-primary transition-colors" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">UPLOAD POSTER</p>
                                        </div>
                                    )}
                                    <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                                </div>
                                {errors.photo && <p className="text-rose-500 text-[10px] font-black tracking-widest text-center uppercase">{errors.photo}</p>}
                                <p className="text-[9px] text-slate-500 italic text-center">Gunakan rasio 1:1 atau 16:9 untuk hasil terbaik (Max 2MB)</p>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full h-20 rounded-[2.5rem] bg-primary text-white font-black tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin" /> PROSES...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Save className="h-6 w-6" /> SIMPAN EVENT
                                    </div>
                                )}
                            </Button>
                            
                            <div className="bg-white rounded-[2rem] p-6 border shadow-sm flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 italic">"Event yang baru dibuat akan langsung tayang di kalender publik."</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
