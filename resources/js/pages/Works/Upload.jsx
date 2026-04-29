import Swal from 'sweetalert2';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, X, FileIcon, ImageIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

export default function WorkUpload({ types }) {
    const [form, setForm] = useState({ title: '', description: '', type: 'karya' });
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        setErrors({});
        setUploading(true);
        setSuccess(false);

        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('type', form.type);
        if (file) fd.append('file', file);
        if (thumbnail) fd.append('thumbnail', thumbnail);

        try {
            const res = await axios.post('/upload', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
            });
            if (res.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.visit(`/works/${res.data.work_id}`, { replace: true });
                }, 1500);
            }
        } catch (err) {
            if (err.response?.data?.errors) setErrors(err.response.data.errors);
            else setErrors({ file: err.response?.data?.message ?? 'Terjadi kesalahan sistem.' });
        }
        setUploading(false);
        // Keep progress at 100 if success
        if (!success) setProgress(0);
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2 py-4">
                    <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">BAGIKAN KARYAMU</h1>
                    <p className="text-muted-foreground text-sm font-medium">Inspirasikan teman-teman BN666 dengan kreativitasmu.</p>
                </div>

                <Card className="border shadow-2xl rounded-[3rem] overflow-hidden glass-morphism border-white/20">
                    <CardHeader className="bg-primary/5 border-b p-8 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <Upload className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Upload Konten Baru</CardTitle>
                                <CardDescription>Data akan dimoderasi oleh guru sebelum dipublikasikan.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        {success ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
                                <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 className="h-10 w-10" />
                                </div>
                                <h2 className="text-2xl font-bold">Berhasil Diupload!</h2>
                                <p className="text-muted-foreground">Karya Anda telah disimpan dan menunggu moderasi. Mengalihkan...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Judul Karya *</label>
                                            <Input 
                                                value={form.title} 
                                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                                placeholder="Contoh: UI Design Apps E-Commerce" 
                                                className="h-12 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20"
                                                required 
                                            />
                                            {errors.title && <p className="text-[10px] text-destructive font-bold flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" /> {errors.title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Kategori *</label>
                                            <select 
                                                value={form.type} 
                                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                                className="w-full h-12 rounded-2xl border-none bg-muted/30 px-4 py-2 text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
                                            >
                                                {Object.entries(types).map(([key, label]) => (
                                                    <option key={key} value={key}>{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Deskripsi Singkat</label>
                                            <textarea 
                                                value={form.description} 
                                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                                placeholder="Ceritakan tentang karya ini..."
                                                className="w-full min-h-[140px] rounded-[2rem] bg-muted/30 border-none px-5 py-4 text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none shadow-inner" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">File Sumber *</label>
                                            <div className={cn(
                                                "relative group rounded-[2.5rem] border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center text-center min-h-[220px]",
                                                file ? "border-emerald-200 bg-emerald-50/30" : "border-muted-foreground/20 hover:border-primary/50 bg-muted/10 hover:bg-muted/30"
                                            )}>
                                                {file ? (
                                                    <div className="space-y-3 animate-in zoom-in duration-200">
                                                        <div className="h-16 w-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                                                            <FileIcon className="h-8 w-8" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold truncate max-w-[200px]">{file.name}</p>
                                                            <p className="text-[10px] text-muted-foreground font-black uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                        </div>
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => setFile(null)} className="h-8 text-[10px] font-bold rounded-full hover:bg-emerald-100">
                                                            GANTI FILE
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <label className="cursor-pointer space-y-3 w-full">
                                                        <div className="h-16 w-16 rounded-2xl bg-background flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                            <Upload className="h-7 w-7 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold">Drop atau Pilih File</p>
                                                            <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Video, Gambar, atau Dokumen (Maks 500MB)</p>
                                                        </div>
                                                        <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                                                    </label>
                                                )}
                                            </div>
                                            {errors.file && <p className="text-[10px] text-destructive font-bold flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" /> {errors.file}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Thumbnail (Opsi)</label>
                                            <div className={cn(
                                                "relative rounded-3xl border border-muted bg-muted/20 p-4 transition-all overflow-hidden",
                                                thumbnail && "border-primary/20 bg-primary/[0.02]"
                                            )}>
                                                {thumbnail ? (
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted relative">
                                                            <img src={URL.createObjectURL(thumbnail)} className="h-full w-full object-cover" alt="Preview" />
                                                        </div>
                                                        <div className="flex-1 overflow-hidden">
                                                            <p className="text-xs font-bold truncate">{thumbnail.name}</p>
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setThumbnail(null)}
                                                                className="text-[10px] font-black text-rose-500 uppercase mt-1 hover:underline"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label className="flex items-center gap-4 cursor-pointer">
                                                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted-foreground/20">
                                                            <ImageIcon className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-xs font-bold">Tambah Cover Display</p>
                                                            <p className="text-[9px] text-muted-foreground uppercase font-medium">Recomended size 4:3 (JPG/PNG)</p>
                                                        </div>
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setThumbnail(e.target.files[0])} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {uploading && (
                                    <div className="space-y-2 py-4 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-[10px] font-black tracking-widest text-primary uppercase animate-pulse">Sedang Mengunggah...</span>
                                            <span className="text-xl font-black text-primary italic">{progress}%</span>
                                        </div>
                                        <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full bg-gradient-to-r from-primary via-blue-400 to-primary transition-all duration-300 ease-out flex items-center justify-end pr-2" style={{ width: `${progress}%` }}>
                                                <div className="h-1 w-1 bg-white rounded-full animate-ping" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col-reverse md:flex-row gap-4 pt-4">
                                    <Button type="button" variant="ghost" className="h-14 w-full md:w-auto px-8 rounded-2xl font-bold text-muted-foreground" onClick={() => router.visit('/dashboard')}>
                                        BATAL
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={uploading || !file} 
                                        className="flex-1 w-full h-14 rounded-2xl font-black tracking-widest text-xs md:text-sm shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                        {uploading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                MEMPROSES...
                                            </div>
                                        ) : (
                                            'PUBLIKASIKAN SEKARANG'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>

            <style jsx>{`
                .glass-morphism {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                :global(.dark) .glass-morphism {
                    background: rgba(15, 23, 42, 0.6);
                }
            `}</style>
        </AppLayout>
    );
}
