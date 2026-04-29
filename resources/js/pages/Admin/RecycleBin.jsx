import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Trash2, RotateCcw, Trash, Users, 
    FileText, LayoutPanelLeft, Calendar,
    AlertTriangle, Shell
} from 'lucide-react';
import { router } from '@inertiajs/react';

export default function RecycleBin({ trashedWorks, trashedMadings, trashedUsers, trashedEvents }) {
    
    const handleRestore = (model, id) => {
        router.post(`/admin/recycle-bin/restore/${model}/${id}`);
    };

    const handleForceDelete = (model, id) => {
        if (confirm('PERINGATAN: Data ini akan dihapus PERMANEN dan tidak bisa dikembalikan. Lanjutkan?')) {
            router.delete(`/admin/recycle-bin/force-delete/${model}/${id}`);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Badge className="bg-rose-500/10 text-rose-600 border-none px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase italic">
                            SYSTEM SAFETY
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                            RECYCLE <span className="text-rose-500 italic">BIN</span>.
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-xl italic">
                            Pulihkan data yang dihapus atau bersihkan sistem secara permanen.
                        </p>
                    </div>
                </header>

                <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 flex items-center gap-6 text-amber-900">
                    <div className="h-14 w-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">
                        <AlertTriangle className="h-8 w-8" />
                    </div>
                    <div>
                        <p className="font-black uppercase tracking-widest text-xs italic">Penghapusan Permanen</p>
                        <p className="text-sm font-medium italic opacity-80 mt-1">Gunakan fitur force delete dengan bijak. Seluruh file terkait akan dihapus dari storage.</p>
                    </div>
                </div>

                <Tabs defaultValue="works" className="space-y-8">
                    <TabsList className="bg-slate-100/50 p-2 rounded-[2rem] border h-auto flex-wrap gap-2">
                        <TabItem value="works" icon={FileText} label="Karya" count={trashedWorks.length} />
                        <TabItem value="mading" icon={LayoutPanelLeft} label="Mading" count={trashedMadings.length} />
                        <TabItem value="users" icon={Users} label="User" count={trashedUsers.length} />
                        <TabItem value="events" icon={Calendar} label="Event" count={trashedEvents.length} />
                    </TabsList>

                    <TabsContent value="works" className="animate-in slide-in-from-bottom-4 duration-500">
                        <TrashedTable items={trashedWorks} model="work" onRestore={handleRestore} onDelete={handleForceDelete} />
                    </TabsContent>
                    
                    <TabsContent value="mading" className="animate-in slide-in-from-bottom-4 duration-500">
                        <TrashedTable items={trashedMadings} model="mading" onRestore={handleRestore} onDelete={handleForceDelete} />
                    </TabsContent>

                    <TabsContent value="users" className="animate-in slide-in-from-bottom-4 duration-500">
                        <TrashedTable items={trashedUsers} model="user" onRestore={handleRestore} onDelete={handleForceDelete} />
                    </TabsContent>

                    <TabsContent value="events" className="animate-in slide-in-from-bottom-4 duration-500">
                        <TrashedTable items={trashedEvents} model="event" onRestore={handleRestore} onDelete={handleForceDelete} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}

function TabItem({ value, icon: Icon, label, count }) {
    return (
        <TabsTrigger value={value} className="rounded-[1.5rem] px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary transition-all gap-3">
            <Icon className="h-4 w-4" />
            <span className="font-black uppercase tracking-widest text-[10px]">{label}</span>
            <Badge variant="secondary" className="rounded-lg px-2 py-0 h-5 text-[10px] bg-slate-200/50">{count}</Badge>
        </TabsTrigger>
    );
}

function TrashedTable({ items, model, onRestore, onDelete }) {
    if (items.length === 0) {
        return (
            <div className="py-24 text-center space-y-6 bg-slate-50/50 rounded-[3rem] border-2 border-dashed">
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Shell className="h-10 w-10 text-slate-200" />
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Tempat sampah kosong.</p>
            </div>
        );
    }

    return (
        <Card className="rounded-[3rem] border shadow-2xl overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b">
                                <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Informasi Data</th>
                                <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Dihapus Pada</th>
                                <th className="p-8 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Aksi Pulihkan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="p-8">
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-800 tracking-tight uppercase italic leading-none">{item.title || item.name || 'Untitled'}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {item.user?.name ? `Oleh: ${item.user.name}` : `ID: ${item.id}`}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <Badge variant="outline" className="rounded-lg border-2 font-black text-[10px]">
                                            {new Date(item.deleted_at).toLocaleDateString()}
                                        </Badge>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                                            <Button 
                                                variant="outline" 
                                                className="h-12 px-6 rounded-2xl border-2 font-black text-[10px] tracking-widest gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                                                onClick={() => onRestore(model, item.id)}
                                            >
                                                <RotateCcw className="h-4 w-4" /> RESTORE
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                className="h-12 px-6 rounded-2xl border-2 font-black text-[10px] tracking-widest gap-2 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                                onClick={() => onDelete(model, item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" /> BERSIHKAN
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
