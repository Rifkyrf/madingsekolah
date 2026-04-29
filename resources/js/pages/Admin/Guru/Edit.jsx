import Swal from 'sweetalert2';
import AppLayout from '@/layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';

export default function GuruEdit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '', email: user.email || '',
        password: '', password_confirmation: '', nis: user.nis || '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        put(`/admin/guru/${user.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Edit Guru</h2>
                    <Link href="/admin"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Kembali</Button></Link>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: 'Nama Lengkap', key: 'name', type: 'text' },
                            { label: 'Email', key: 'email', type: 'email' },
                            { label: 'NIS/NIP', key: 'nis', type: 'text' },
                            { label: 'Password Baru (opsional)', key: 'password', type: 'password', placeholder: 'Kosongkan jika tidak diubah' },
                            { label: 'Konfirmasi Password', key: 'password_confirmation', type: 'password' },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="text-sm font-semibold text-gray-600 block mb-1">{f.label}</label>
                                <Input type={f.type} value={data[f.key]} onChange={e => setData(f.key, e.target.value)} placeholder={f.placeholder || ''} />
                                {errors[f.key] && <p className="text-xs text-red-500 mt-1">{errors[f.key]}</p>}
                            </div>
                        ))}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Link href="/admin"><Button type="button" variant="outline">Batal</Button></Link>
                            <Button type="submit" disabled={processing} className="gap-2"><Save className="h-4 w-4" /> Simpan Perubahan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
