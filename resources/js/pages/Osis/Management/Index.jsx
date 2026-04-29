import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
    Users, Plus, Pencil, Trash2, 
    Shield, Briefcase, GraduationCap, 
    ArrowUpRight, ListFilter, MoreHorizontal
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function OsisManagementIndex({ members, stats }) {
    const handleDelete = (id) => {
        if (confirm('Hapus anggota ini dari struktur OSIS?')) {
            router.delete(`/admin/osis-management/${id}`);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Badge className="bg-primary/10 text-primary border-none px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                            ADMINISTRATION
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                            OSIS <span className="text-primary italic underline decoration-primary/10 underline-offset-8">STRUCTURAL</span>.
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-xl italic">
                            Kelola hierarki dan data keanggotaan OSIS SMK Bakti Nusantara 666.
                        </p>
                    </div>

                    <Link href="/admin/osis-management/create">
                        <Button className="h-16 px-10 rounded-[2rem] font-black tracking-widest gap-3 shadow-2xl shadow-primary/20">
                            <Plus className="h-6 w-6" /> TAMBAH PENGURUS
                        </Button>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatBox label="Total Pengurus" value={stats.total} icon={Users} color="bg-primary/5 text-primary" />
                    <StatBox label="Jumlah Sekbid" value={stats.sekbid_count} icon={Briefcase} color="bg-amber-50 text-amber-600" />
                    <StatBox label="Angkatan Terbaru" value={stats.latest_angkatan} icon={GraduationCap} color="bg-emerald-50 text-emerald-600" />
                    <StatBox label="Baru Ditambah" value={stats.recent_additions} icon={ArrowUpRight} color="bg-purple-50 text-purple-600" />
                </div>

                {/* Members Table Card */}
                <Card className="rounded-[3rem] border shadow-2xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-10 flex items-center justify-between bg-slate-50/50 border-b">
                            <h3 className="text-xl font-black tracking-tight uppercase italic">Daftar Keanggotaan</h3>
                            <Button variant="outline" className="rounded-xl border-2 font-bold gap-2 bg-white">
                                <ListFilter className="h-4 w-4" /> FILTER DATA
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/30">
                                        <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Pengurus</th>
                                        <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Jabatan / Sekbid</th>
                                        <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Angkatan</th>
                                        <th className="p-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {members.length > 0 ? members.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-8">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                                                        <AvatarImage src={member.profile_photo_url} />
                                                        <AvatarFallback className="font-bold bg-primary/5 text-primary">{member.nama?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-black text-slate-800 tracking-tight uppercase italic leading-none">{member.nama}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest truncate max-w-[150px]">Account: {member.user_name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-3.5 w-3.5 text-primary/40" />
                                                    <span className="text-xs font-black text-slate-600 uppercase tracking-tight italic">{member.sekbid}</span>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <Badge variant="outline" className="rounded-xl border-2 font-black text-[10px] px-4 py-1">
                                                    {member.angkatan}
                                                </Badge>
                                            </td>
                                            <td className="p-8 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/admin/osis-management/${member.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-md transition-all">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-12 w-12 rounded-xl text-rose-500 hover:bg-rose-50 hover:shadow-md transition-all"
                                                        onClick={() => handleDelete(member.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-20 text-center text-slate-300 italic font-medium">Belum ada data pengurus OSIS.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function StatBox({ label, value, icon: Icon, color }) {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all duration-500">
            <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110", color)}>
                <Icon className="h-8 w-8" />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-2">{label}</p>
                <p className="text-3xl font-black text-slate-800 tracking-tighter italic">{value}</p>
            </div>
        </div>
    );
}

