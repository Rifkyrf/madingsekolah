import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { 
    UserPlus, ArrowLeft, Shield, 
    GraduationCap, Briefcase, User, 
    CheckCircle2, Search, Loader2
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function OsisManagementCreate({ siswaUsers }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        nama: '',
        angkatan: '',
        sekbid: ''
    });

    const [search, setSearch] = useState('');
    
    const filteredUsers = siswaUsers.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        (u.nis && u.nis.includes(search))
    ).slice(0, 5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        post('/admin/osis-management');
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-10 duration-700">
                <header className="mb-10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 leading-none">TAMBAH PENGURUS</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registrasi anggota baru ke struktur organisasi OSIS.</p>
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
                            
                            {/* User Selection */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <User className="h-5 w-5" />
                                    <span className="text-xs font-black uppercase tracking-widest">Pilih Akun Siswa</span>
                                </div>
                                <div className="relative group">
                                    <Search className="absolute left-6 top-6 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <input 
                                        placeholder="Cari nama atau NIS siswa..."
                                        className="w-full bg-slate-50 border-none rounded-3xl p-6 pl-16 text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    {search && filteredUsers.length > 0 && (
                                        <div className="absolute top-full left-0 w-full bg-white mt-2 border rounded-3xl shadow-2xl z-20 overflow-hidden divide-y animate-in fade-in slide-in-from-top-2">
                                            {filteredUsers.map(user => (
                                                <div 
                                                    key={user.id} 
                                                    onClick={() => {
                                                        setData('user_id', user.id);
                                                        setData('nama', user.name);
                                                        setSearch('');
                                                    }}
                                                    className="p-4 px-8 hover:bg-slate-50 cursor-pointer flex items-center justify-between group/item"
                                                >
                                                    <div>
                                                        <p className="font-black text-slate-800 text-sm tracking-tight">{user.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{user.nis || 'No NIS'}</p>
                                                    </div>
                                                    <CheckCircle2 className={cn("h-5 w-5 transition-colors", data.user_id === user.id ? "text-emerald-500" : "text-slate-100 group-hover/item:text-slate-200")} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.user_id && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.user_id}</p>}
                                
                                {data.nama && (
                                    <div className="bg-emerald-50 rounded-2xl p-6 flex items-center gap-4 animate-in zoom-in duration-300">
                                        <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">TERPILIH</p>
                                            <p className="text-sm font-black text-slate-800 uppercase italic">{data.nama}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-10 pt-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Display Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input 
                                            value={data.nama}
                                            onChange={e => setData('nama', e.target.value)}
                                            placeholder="Nama lengkap pengurus..."
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
                                            placeholder="Cth: 2023/2024"
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
                                        placeholder="Cth: Ketua OSIS / Sekbid 1 (Ketaqwaan)"
                                        className="w-full bg-slate-50 border-none rounded-2xl h-16 pl-16 pr-6 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                </div>
                                {errors.sekbid && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest ml-4">{errors.sekbid}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                         <Button 
                            type="submit" 
                            disabled={processing}
                            className="h-20 px-12 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            {processing ? <Loader2 className="h-6 w-6 animate-spin" /> : 'KONFIRMASI PENGURUS'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

