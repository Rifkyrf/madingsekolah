import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Tags, Plus, Pencil, Trash2, 
    Layers, BookOpen, UserCheck, 
    ArrowRight, Info
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';

export default function KategoriGuruIndex({ kategoris }) {
    const handleDelete = (id) => {
        if (confirm('Hapus kategori ini?')) {
            router.delete(`/admin/kategori-guru/${id}`);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Badge className="bg-primary/10 text-primary border-none px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                            ACADEMIC SETUP
                        </Badge>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                            TEACHER <span className="text-primary italic">GROUPS</span>.
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-xl italic">
                            Kelola kategori dan klasifikasi tenaga pendidik untuk filter pencarian.
                        </p>
                    </div>

                    <Link href="/admin/kategori-guru/create">
                        <Button className="h-16 px-10 rounded-[2rem] font-black tracking-widest gap-3 shadow-2xl shadow-primary/20">
                            <Plus className="h-6 w-6" /> TAMBAH KATEGORI
                        </Button>
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {kategoris.map((kategori) => (
                        <Card key={kategori.id} className="rounded-[2.5rem] border shadow-sm group hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-white">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Layers className="h-20 w-20" />
                            </div>
                            <CardContent className="p-10 space-y-8 relative z-10">
                                <div className="space-y-2">
                                    <Badge variant="outline" className="rounded-lg px-3 py-1 border-2 font-black text-[9px] uppercase tracking-widest bg-slate-50">
                                        {kategori.jenis}
                                    </Badge>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">{kategori.nama}</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <UserCheck className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">{kategori.guru_count} Guru Terdaftar</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium italic line-clamp-2">
                                        "{kategori.deskripsi || 'Sistem klasifikasi tenaga pengajar untuk mempermudah navigasi siswa.'}"
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-6 border-t">
                                    <Link href={`/admin/kategori-guru/${kategori.id}/edit`} className="flex-1">
                                        <Button variant="outline" className="w-full h-12 rounded-xl font-black tracking-widest text-[10px] gap-2">
                                            <Pencil className="h-3.5 w-3.5" /> EDIT
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="outline" 
                                        className="h-12 w-12 rounded-xl text-rose-500 hover:bg-rose-50 border-rose-100"
                                        onClick={() => handleDelete(kategori.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {kategoris.length === 0 && (
                        <div className="col-span-full py-24 text-center space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed">
                             <Tags className="h-16 w-16 mx-auto text-slate-200" />
                             <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Belum ada kategori guru.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
