import Swal from 'sweetalert2';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import axios from 'axios';

export default function WorkEdit({ work, types }) {
    const [form, setForm] = useState({ title: work.title, description: work.description ?? '', type: work.type });
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        setErrors({});
        setSaving(true);

        const fd = new FormData();
        fd.append('_method', 'PUT');
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('type', form.type);
        if (file) fd.append('file', file);
        if (thumbnail) fd.append('thumbnail', thumbnail);

        try {
            const res = await axios.post(`/works/${work.id}`, fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (res.data.success) {
                router.visit(`/works/${work.id}`);
            }
        } catch (err) {
            if (err.response?.data?.errors) setErrors(err.response.data.errors);
            else setErrors({ title: err.response?.data?.message ?? 'Gagal menyimpan.' });
        }
        setSaving(false);
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Pencil className="h-5 w-5" /> Edit Karya
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {work.thumbnail_url && (
                            <img src={work.thumbnail_url} alt="Thumbnail" className="w-full h-40 object-cover rounded-lg mb-5" />
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Judul *</label>
                                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                                {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Deskripsi</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring resize-none" />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Jenis Konten *</label>
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-ring">
                                    {Object.entries(types).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Ganti File (opsional)</label>
                                <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Ganti Thumbnail (opsional)</label>
                                <Input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={() => router.visit(`/works/${work.id}`)}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={saving} className="flex-1">
                                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
