import AppLayout from '@/layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/ConfirmModal';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Generate daftar tahun angkatan: 5 tahun ke belakang + 1 ke depan
function generateAngkatan() {
    const year = new Date().getFullYear();
    const list = [];
    for (let i = -1; i <= 4; i++) {
        list.push(`${year - i}/${year - i + 1}`);
    }
    return list;
}

export default function OsisCreate({ sekbidList: initialSekbidList = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '', angkatan: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
        role: '', type: 'inti', nama_sekbid: '', photo: null,
    });
    const [preview, setPreview] = useState(null);
    const [sekbidList, setSekbidList] = useState(initialSekbidList);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
    const angkatanOptions = generateAngkatan();

    useEffect(() => {
        if (sekbidList.length === 0) {
            axios.get('/admin/sekbid').then(r => setSekbidList(r.data)).catch(() => {});
        }
    }, []);

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = () => {
        post('/admin/osis', { forceFormData: true });
        setConfirmSubmit(false);
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Tambah Anggota OSIS</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Daftarkan pengurus baru ke struktur organisasi</p>
                    </div>
                    <Link href="/osis/manage">
                        <Button variant="outline" className="gap-2 rounded-2xl font-bold">
                            <ArrowLeft className="h-4 w-4" /> Kembali
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border shadow-sm p-6 space-y-5">
                    {/* Photo Preview */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src={preview || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=eff6ff&color=2563eb&size=128`}
                                className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                                alt="Preview"
                            />
                            <label className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
                                <span className="text-white text-lg leading-none">+</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Nama */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Nama Lengkap *</label>
                            <input
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Masukkan nama lengkap..."
                                className="w-full h-11 rounded-2xl bg-slate-50 border-none px-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5"
                                required
                            />
                            {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name}</p>}
                        </div>

                        {/* Angkatan — select generatif */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Angkatan *</label>
                            <select
                                value={data.angkatan}
                                onChange={e => setData('angkatan', e.target.value)}
                                className="w-full h-11 rounded-2xl bg-slate-50 border-none px-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 appearance-none"
                                required
                            >
                                {angkatanOptions.map(a => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                            {errors.angkatan && <p className="text-xs text-rose-500 font-bold">{errors.angkatan}</p>}
                        </div>

                        {/* Jabatan */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Jabatan *</label>
                            <select
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                                className="w-full h-11 rounded-2xl bg-slate-50 border-none px-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 appearance-none"
                                required
                            >
                                <option value="">Pilih Jabatan</option>
                                {['Ketua', 'Wakil Ketua', 'Sekretaris', 'Bendahara', 'Anggota'].map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.role && <p className="text-xs text-rose-500 font-bold">{errors.role}</p>}
                        </div>

                        {/* Tipe */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Tipe Pengurus *</label>
                            <select
                                value={data.type}
                                onChange={e => { setData('type', e.target.value); setData('nama_sekbid', ''); }}
                                className="w-full h-11 rounded-2xl bg-slate-50 border-none px-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 appearance-none"
                            >
                                <option value="inti">7 Pengurus Inti</option>
                                <option value="sekbid">Seksi Bidang (Sekbid)</option>
                            </select>
                        </div>
                    </div>

                    {/* Sekbid Select — dinamis dari tabel sekbids */}
                    {data.type === 'sekbid' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Seksi Bidang *</label>
                            <select
                                value={data.nama_sekbid}
                                onChange={e => setData('nama_sekbid', e.target.value)}
                                className="w-full h-11 rounded-2xl bg-slate-50 border-none px-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 appearance-none"
                                required
                            >
                                <option value="">Pilih Sekbid...</option>
                                {sekbidList.map(s => (
                                    <option key={s.id} value={s.nama}>{s.nama}</option>
                                ))}
                            </select>
                            {sekbidList.length === 0 && (
                                <p className="text-xs text-amber-500 font-bold">
                                    Belum ada sekbid. <Link href="/osis/manage" className="underline">Tambah sekbid dulu</Link>.
                                </p>
                            )}
                            {errors.nama_sekbid && <p className="text-xs text-rose-500 font-bold">{errors.nama_sekbid}</p>}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Link href="/osis/manage">
                            <Button type="button" variant="ghost" className="rounded-2xl font-bold">Batal</Button>
                        </Link>
                        <Button
                            type="button"
                            disabled={processing}
                            className="gap-2 rounded-2xl font-black px-8"
                            onClick={() => setConfirmSubmit(true)}
                        >
                            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Simpan Anggota
                        </Button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={confirmSubmit}
                onClose={() => setConfirmSubmit(false)}
                onConfirm={handleSubmit}
                title="Tambah Anggota OSIS?"
                description={`"${data.name}" akan ditambahkan sebagai ${data.type === 'inti' ? 'pengurus inti' : `anggota ${data.nama_sekbid}`} angkatan ${data.angkatan}.`}
                confirmText="Ya, Tambahkan"
                variant="info"
                loading={processing}
            />
        </AppLayout>
    );
}
