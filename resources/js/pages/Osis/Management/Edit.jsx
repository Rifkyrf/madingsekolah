import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { 
    PencilLine, ArrowLeft, Shield, 
    GraduationCap, User, Loader2, Save
} from 'lucide-react';

export default function OsisManagementEdit({ member, siswaUsers }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: member.user_id,
        nama: member.nama,
        angkatan: member.angkatan,
        sekbid: member.sekbid
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        put(`/admin/osis-management/${member.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
                <header className="mb-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">EDIT DATA PENGURUS</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Memperbarui informasi struktural pengurus OSIS.</p>
                    </div>
                    <Link href="/admin/osis-management">
                        <Button variant="ghost" className="rounded-2xl h-12 px-6 font-black tracking-widest bg-slate-50">
                            <ArrowLeft className="h-4 w-4 mr-2" /> KEMBALI
                        </Button>
                    </Link>
                </header>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <Card className="rounded-[3rem] border shadow-2xl overflow-hidden glass-card">
                        <CardContent className="p-10 lg:p-16 space-y-12">
                            
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Akun Terhubung</label>
                                <select 
                                    value={data.user_id}
                                    onChange={e => setData('user_id', e.target.value)}
                                    className="w-full bg-slate-50/50 border-none rounded-2xl h-16 px-8 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                >
                                    <option value="">Pilih Siswa</option>
                                    {siswaUsers.map(u => (
                                        <option key={u.id} value={u.id}>{u.name} ({u.nis})</option>
                                    ))}
                                </select>
                                {errors.user_id && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.user_id}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Display Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input 
                                            value={data.nama}
                                            onChange={e => setData('nama', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl h-16 pl-16 pr-6 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        />
                                    </div>
                                    {errors.nama && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.nama}</p>}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Angkatan</label>
                                    <div className="relative group">
                                        <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input 
                                            value={data.angkatan}
                                            onChange={e => setData('angkatan', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl h-16 pl-16 pr-6 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        />
                                    </div>
                                    {errors.angkatan && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.angkatan}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Jabatan / Sekbid</label>
                                <div className="relative group">
                                    <Shield className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <input 
                                        value={data.sekbid}
                                        onChange={e => setData('sekbid', e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-2xl h-16 pl-16 pr-6 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                </div>
                                {errors.sekbid && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.sekbid}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                         <Button 
                            type="submit" 
                            disabled={processing}
                            className="h-20 px-12 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary hover:scale-[1.02] transition-all"
                        >
                            {processing ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                                <div className="flex items-center gap-2">
                                    <Save className="h-5 w-5" /> UPDATE DATA
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
