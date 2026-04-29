import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { 
    Calendar, ArrowLeft, Image as ImageIcon, 
    Zap, Loader2, Save, History, RefreshCw
} from 'lucide-react';
import { useState } from 'react';

export default function OsisEventEdit({ event }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: event.title,
        description: event.description,
        event_date: event.event_date,
        photo: null
    });

    const [preview, setPreview] = useState(event.photo_url);

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
        // Menggunakan POST dengan _method: PUT untuk upload file di Laravel
        post(`/osis/events/${event.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
                <header className="mb-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">EDIT EVENT</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             <History className="h-3 w-3" /> Memperbarui program kerja yang sudah ada.
                        </p>
                    </div>
                    <Link href="/osis/events">
                        <Button variant="ghost" className="rounded-2xl h-12 px-6 font-black tracking-widest bg-slate-50">
                            <ArrowLeft className="h-4 w-4 mr-2" /> BATAL
                        </Button>
                    </Link>
                </header>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="rounded-[3rem] border shadow-2xl overflow-hidden glass-card relative">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <RefreshCw className="h-24 w-24" />
                            </div>
                            <CardContent className="p-10 space-y-8 relative z-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Judul Program Kerja</label>
                                    <input 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full text-2xl font-black tracking-tight uppercase italic bg-slate-50/50 border-none rounded-3xl p-8 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                    {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.title}</p>}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Deskripsi Kegiatan</label>
                                    <textarea 
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full h-48 bg-slate-50/50 border-none rounded-[2.5rem] p-8 text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                                    />
                                    {errors.description && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.description}</p>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Tanggal Pelaksanaan</label>
                                    <div className="relative group max-w-sm">
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
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <Card className="rounded-[2.5rem] border shadow-sm overflow-hidden bg-slate-900 text-white">
                            <CardHeader className="p-8">
                                <CardTitle className="text-xs font-black tracking-widest uppercase flex items-center gap-2 text-primary">
                                    <ImageIcon className="h-4 w-4" /> Poster Utama
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
                                            <Zap className="h-10 w-10 mx-auto text-slate-600" />
                                            <p className="text-[10px] font-black uppercase tracking-widest">GANTI FOTO</p>
                                        </div>
                                    )}
                                    <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                                </div>
                                <p className="text-[9px] text-slate-500 italic text-center leading-relaxed">Kosongkan jika tidak ingin mengubah foto/poster saat ini.</p>
                            </CardContent>
                        </Card>

                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full h-20 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary active:scale-95 transition-all"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-6 w-6 animate-spin" /> UPDATING...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-6 w-6" /> SIMPAN PERUBAHAN
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
