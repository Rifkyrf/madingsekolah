import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { 
    FileUp, ArrowLeft, Download, AlertCircle, 
    CheckCircle2, FileSpreadsheet, Loader2 
} from 'lucide-react';
import { useState } from 'react';

export default function AdminImport({ hakgunas }) {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        post('/admin/import');
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-10 duration-700">
                <header className="mb-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900">Import Data User</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tambah data masal via Excel/CSV.</p>
                    </div>
                    <Link href="/admin">
                        <Button variant="ghost" className="rounded-xl font-bold gap-2">
                            <ArrowLeft className="h-4 w-4" /> BATAL
                        </Button>
                    </Link>
                </header>

                <div className="grid gap-8">
                    {/* Instructions Card */}
                    <Card className="rounded-[2.5rem] border-primary/10 bg-primary/[0.02] overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                                <AlertCircle className="h-4 w-4" /> Instruksi Format
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-4">
                            <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                                "Pastikan file Excel kamu mengikuti struktur kolom: <span className="font-black text-slate-700 not-italic">name, email, nis, password</span>. Gunakan NIS/NIP yang unik untuk setiap user."
                            </p>
                            <Button variant="outline" className="rounded-xl font-bold gap-2 bg-white">
                                <Download className="h-4 w-4" /> UNDUH TEMPLATE EXCEL
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Upload Card */}
                    <form onSubmit={handleSubmit}>
                        <Card className="rounded-[3rem] border shadow-2xl overflow-hidden glass-card">
                            <CardHeader className="p-10 text-center">
                                <div className="h-24 w-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <FileSpreadsheet className="h-12 w-12 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight uppercase italic leading-none">Pilih File Data</CardTitle>
                                <CardDescription className="font-medium mt-2">Dukung format .xlsx, .xls, .csv (Maks 5MB)</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 pt-0 space-y-8">
                                <label className="relative block border-4 border-dashed border-slate-100 rounded-[2rem] p-12 text-center cursor-pointer hover:border-primary/20 hover:bg-slate-50 transition-all group">
                                    <input type="file" className="hidden" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
                                    {fileName ? (
                                        <div className="space-y-2 animate-in zoom-in duration-300">
                                            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                                            <p className="font-black text-slate-700">{fileName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Klik untuk ganti file</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <FileUp className="h-10 w-10 text-slate-300 mx-auto group-hover:text-primary transition-colors" />
                                            <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Klik atau drop file di sini</p>
                                        </div>
                                    )}
                                </label>

                                {errors.file && (
                                    <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest text-center">{errors.file}</p>
                                )}

                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing || !data.file}
                                        className="w-full h-16 rounded-[2rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" /> MENGIMPOR DATA...
                                            </div>
                                        ) : (
                                            'MULAI PROSES IMPOR'
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
