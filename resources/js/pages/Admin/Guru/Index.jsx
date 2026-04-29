import AppLayout from '@/layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';

export default function GuruIndex({ guruList }) {
    const handleDelete = (id) => {
        if (confirm('Hapus data guru ini?')) router.delete(`/admin/guru/${id}`);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="h-6 w-6 text-blue-600" /> Data Guru</h1>
                        <p className="text-gray-500 text-sm mt-1">Kelola data guru SMK Bakti Nusantara 666</p>
                    </div>
                    <Link href="/admin/guru/create"><Button className="gap-2"><Plus className="h-4 w-4" /> Tambah Guru</Button></Link>
                </div>

                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Nama</th>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">NIS/NIP</th>
                                <th className="p-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {guruList?.data?.map(guru => (
                                <tr key={guru.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4 font-semibold text-gray-800">{guru.name}</td>
                                    <td className="p-4 text-gray-500 text-sm">{guru.email}</td>
                                    <td className="p-4 text-gray-500 text-sm">{guru.nis || '-'}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/admin/guru/${guru.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg"><Pencil className="h-4 w-4" /></Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-red-500 hover:bg-red-50" onClick={() => handleDelete(guru.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!guruList?.data?.length && (
                                <tr><td colSpan="4" className="p-12 text-center text-gray-400">Belum ada data guru.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
