import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

export default function OsisEdit({ member }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: member.name || '', angkatan: member.angkatan || '',
        role: member.role || '', type: member.type || 'inti',
        nama_sekbid: member.nama_sekbid || '', photo: null,
    });
    const [preview, setPreview] = useState(member.photo_url);

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        post(`/admin/osis/${member.id}`, { forceFormData: true });
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Edit Anggota</h2>
                    <Link href="/osis/manage"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Kembali</Button></Link>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                    <div className="text-center mb-6">
                        <img src={preview} className="h-28 w-28 rounded-full border shadow mx-auto object-cover" alt="Preview" />
                        <p className="text-xs text-gray-400 mt-2">Foto Profil Saat Ini</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1">Nama Lengkap</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} required />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1">Angkatan</label>
                                <Input value={data.angkatan} onChange={e => setData('angkatan', e.target.value)} placeholder="Contoh: 2023/2024" required />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1">Jabatan</label>
                                <select value={data.role} onChange={e => setData('role', e.target.value)} required
                                    className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring">
                                    {['ketua','wakil ketua','sekretaris','bendahara','anggota'].map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 block mb-1">Tipe Anggota</label>
                                <select value={data.type} onChange={e => setData('type', e.target.value)} required
                                    className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring">
                                    <option value="inti">7 Inti OSIS</option>
                                    <option value="sekbid">Sekbid</option>
                                </select>
                            </div>
                        </div>

                        {data.type === 'sekbid' && (
                            <div>
                                <label className="text-sm font-semibold text-green-600 block mb-1">Nama Sekbid</label>
                                <Input value={data.nama_sekbid} onChange={e => setData('nama_sekbid', e.target.value)} placeholder="Contoh: Kesiswaan / Seni Budaya" />
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-semibold text-gray-600 block mb-1">Ganti Foto (Opsional)</label>
                            <Input type="file" accept="image/*" onChange={handlePhoto} />
                            <p className="text-xs text-gray-400 mt-1">Gunakan foto rasio 1:1 untuk hasil terbaik.</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Link href="/osis/manage"><Button type="button" variant="outline">Batal</Button></Link>
                            <Button type="submit" disabled={processing} className="gap-2"><Save className="h-4 w-4" /> Simpan Perubahan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
