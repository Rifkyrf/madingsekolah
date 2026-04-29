import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { 
    Tags, ArrowLeft, Layers, 
    Type, AlignLeft, Save, Loader2 
} from 'lucide-react';

export default function KategoriGuruCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        jenis: 'produktif',
        deskripsi: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        post('/admin/kategori-guru');
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-10 duration-700">
                <header className="mb-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">BUAT KATEGORI</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Definisikan kelompok baru untuk tenaga pendidik.</p>
                    </div>
                    <Link href="/admin/kategori-guru">
                        <Button variant="ghost" className="rounded-2xl h-12 px-6 font-black tracking-widest bg-slate-50">
                            <ArrowLeft className="h-4 w-4 mr-2" /> KEMBALI
                        </Button>
                    </Link>
                </header>

                <form onSubmit={handleSubmit}>
                    <Card className="rounded-[3rem] border shadow-2xl overflow-hidden glass-card">
                        <CardContent className="p-10 lg:p-16 space-y-10">
                            
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Nama Kategori</label>
                                <div className="relative group">
                                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <input 
                                        value={data.nama}
                                        onChange={e => setData('nama', e.target.value)}
                                        placeholder="Cth: Produktif PPLG / Pembina OSIS"
                                        className="w-full bg-slate-50 border-none rounded-2xl h-16 pl-16 pr-6 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        required
                                    />
                                </div>
                                {errors.nama && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.nama}</p>}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Jenis Klasifikasi</label>
                                <div className="relative group">
                                    <Layers className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <select 
                                        value={data.jenis}
                                        onChange={e => setData('jenis', e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-2xl h-16 pl-16 pr-8 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
                                    >
                                        <option value="produktif">PRODUKTIF</option>
                                        <option value="normatif">NORMATIF</option>
                                        <option value="adaptif">ADAPTIF</option>
                                        <option value="pembina">PEMBINA</option>
                                        <option value="bk">BK (KONSELING)</option>
                                    </select>
                                </div>
                                {errors.jenis && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.jenis}</p>}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Detail Deskripsi (Opsional)</label>
                                <div className="relative group">
                                    <AlignLeft className="absolute left-6 top-8 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <textarea 
                                        value={data.deskripsi}
                                        onChange={e => setData('deskripsi', e.target.value)}
                                        placeholder="Jelaskan peran atau kriteria kategori ini..."
                                        className="w-full h-32 bg-slate-50 border-none rounded-[2rem] p-8 pl-16 text-sm font-medium focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full h-20 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary transition-all active:scale-95"
                                >
                                    {processing ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                                        <div className="flex items-center gap-2">
                                            <Save className="h-5 w-5" /> KONFIRMASI KATEGORI
                                        </div>
                                    )}
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
