import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, Users, MessageSquare, Download, FileSpreadsheet, Search, ArrowUpRight } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

function StatCard({ title, value, icon: Icon, colorClass }) {
    return (
        <Card className="border shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
                <div className={cn('h-11 w-11 rounded-xl flex items-center justify-center shrink-0', colorClass)}>
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function DashboardIndex({ stats, articles, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [typeFilter, setTypeFilter] = useState(filters?.type || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/dashboard/statistik', { search, status: statusFilter, type: typeFilter }, { preserveState: true });
    };

    const handleExport = (format) => {
        const params = new URLSearchParams({ search, status: statusFilter, type: typeFilter }).toString();
        window.location.href = `/dashboard/export-${format}?${params}`;
    };

    // Combine data for single donut
    const donutData = (stats?.contentTypeData || []).map(d => ({
        name: d.content_type || d.type || 'Lainnya',
        value: d.count,
    }));

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight">Dashboard Statistik</h1>
                        <p className="text-slate-500 text-sm">Pantau ekosistem karya siswa SMK BN666</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2 text-xs font-bold" onClick={() => handleExport('excel')}>
                            <FileSpreadsheet className="h-4 w-4 text-emerald-500" /> Excel
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 text-xs font-bold" onClick={() => handleExport('pdf')}>
                            <Download className="h-4 w-4 text-rose-500" /> PDF
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Draft Antrean" value={stats?.draftCount ?? 0} icon={Clock} colorClass="bg-amber-50 text-amber-600" />
                    <StatCard title="Karya Terbit" value={stats?.publishedCount ?? 0} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
                    <StatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={Users} colorClass="bg-blue-50 text-blue-600" />
                    <StatCard title="Komentar" value={stats?.totalComments ?? 0} icon={MessageSquare} colorClass="bg-purple-50 text-purple-600" />
                </div>

                {/* Single Donut Chart */}
                {donutData.length > 0 && (
                    <Card className="border shadow-sm">
                        <CardHeader className="pb-2 px-5 pt-5">
                            <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-700">Sebaran Tipe Konten</CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                                            paddingAngle={3} dataKey="value" nameKey="name">
                                            {donutData.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }} />
                                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Table with filters */}
                <Card className="border shadow-sm">
                    <CardHeader className="px-5 pt-5 pb-4 border-b">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-700">Daftar Karya</CardTitle>
                            <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
                                {/* Filter status */}
                                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                                    className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                                    <option value="">Semua Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                                {/* Filter type */}
                                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                                    className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                                    <option value="">Semua Tipe</option>
                                    {['karya','mading','harian','mingguan','prestasi','opini','event'].map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input value={search} onChange={e => setSearch(e.target.value)}
                                        placeholder="Cari judul..."
                                        className="h-8 pl-8 pr-3 rounded-lg border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-blue-500/20 w-40" />
                                </div>
                                <Button type="submit" size="sm" className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700">Cari</Button>
                            </form>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="border-b bg-slate-50/50">
                                        {['Judul Karya', 'Tipe', 'File', 'Status', 'Tgl Unggah', ''].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {articles?.data?.length > 0 ? articles.data.map((a) => (
                                        <tr key={a.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-4 py-3">
                                                <p className="font-semibold text-slate-800 text-xs truncate max-w-[180px]">{a.title}</p>
                                                <p className="text-[10px] text-slate-400">By {a.user_name}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="outline" className="text-[9px] font-bold px-2 py-0.5">{a.content_type || a.type}</Badge>
                                            </td>
                                            <td className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">{a.file_type}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={cn('h-1.5 w-1.5 rounded-full', a.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500')} />
                                                    <span className="text-[10px] font-bold uppercase text-slate-600">{a.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-[10px] text-slate-400">{a.created_at_human}</td>
                                            <td className="px-4 py-3">
                                                <Link href={`/works/${a.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100">
                                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="6" className="py-12 text-center text-slate-400 text-sm">Tidak ada data.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {articles?.links && (
                            <div className="px-4 py-3 border-t flex items-center justify-between">
                                <p className="text-xs text-slate-400">Menampilkan {articles.data?.length} dari {articles.total} data</p>
                                <div className="flex gap-1">
                                    {articles.links.map((link, i) => (
                                        <Button key={i} variant={link.active ? 'default' : 'outline'} disabled={!link.url}
                                            className={cn('h-7 w-7 p-0 rounded-lg text-xs font-bold', link.active && 'bg-blue-600 border-blue-600')}
                                            onClick={() => link.url && router.visit(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
