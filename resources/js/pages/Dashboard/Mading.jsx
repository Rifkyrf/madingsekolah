import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Newspaper, CheckCircle, Edit, User, Plus, List, Upload, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

function StatCard({ label, value, color, icon: Icon }) {
    const colors = { blue: 'bg-blue-600', green: 'bg-green-600', yellow: 'bg-yellow-500', cyan: 'bg-cyan-500' };
    return (
        <div className={`${colors[color]} text-white rounded-xl p-5 flex justify-between items-center shadow`}>
            <div>
                <p className="text-sm font-medium opacity-90">{label}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
            </div>
            <Icon className="h-10 w-10 opacity-60" />
        </div>
    );
}

function MadingItem({ mading, showCreator }) {
    return (
        <div className="flex gap-3 py-3 border-b last:border-0">
            <div className="h-12 w-12 rounded shrink-0 overflow-hidden bg-gray-100">
                {mading.thumbnail_url
                    ? <img src={mading.thumbnail_url} alt={mading.title} className="h-full w-full object-cover" />
                    : <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white"><Newspaper className="h-5 w-5" /></div>
                }
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 truncate">{mading.title}</p>
                <p className="text-xs text-gray-500 truncate">{mading.description}</p>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{showCreator ? mading.creator_name : mading.created_at_human}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mading.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {mading.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function DashboardMading({ stats, myMadings, recentMadings }) {
    const { auth } = usePage().props;
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                            <Newspaper className="h-6 w-6" /> Dashboard Mading
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Selamat datang, {auth?.user?.name}!</p>
                    </div>
                    <Link href="/mading/canvas">
                        <Button className="gap-2"><Plus className="h-4 w-4" /> Buat Mading</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Mading" value={stats.total_madings} color="blue" icon={Newspaper} />
                    <StatCard label="Published" value={stats.published_madings} color="green" icon={CheckCircle} />
                    <StatCard label="Draft" value={stats.draft_madings} color="yellow" icon={Edit} />
                    <StatCard label="Mading Saya" value={stats.my_madings} color="cyan" icon={User} />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <h5 className="font-semibold flex items-center gap-2"><User className="h-4 w-4" /> Mading Saya</h5>
                            <Link href="/mading" className="text-xs text-blue-600 hover:underline">Lihat Semua</Link>
                        </div>
                        <div className="p-5">
                            {myMadings?.length ? myMadings.map(m => <MadingItem key={m.id} mading={m} showCreator={false} />) : (
                                <div className="text-center py-8 text-gray-400">
                                    <Newspaper className="h-10 w-10 mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">Belum ada mading</p>
                                    <Link href="/mading/canvas"><Button size="sm" className="mt-3 gap-1"><Plus className="h-3 w-3" /> Buat Mading</Button></Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <h5 className="font-semibold flex items-center gap-2"><Clock className="h-4 w-4" /> Mading Terbaru</h5>
                            <Link href="/mading" className="text-xs text-blue-600 hover:underline">Lihat Semua</Link>
                        </div>
                        <div className="p-5">
                            {recentMadings?.length ? recentMadings.map(m => <MadingItem key={m.id} mading={m} showCreator={true} />) : (
                                <div className="text-center py-8 text-gray-400"><Newspaper className="h-10 w-10 mx-auto mb-2 opacity-30" /><p className="text-sm">Belum ada mading</p></div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="px-5 py-4 border-b">
                        <h5 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4" /> Aksi Cepat</h5>
                    </div>
                    <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Link href="/mading/canvas"><Button variant="outline" className="w-full gap-2"><Plus className="h-4 w-4" /> Buat Mading</Button></Link>
                        <Link href="/mading"><Button variant="outline" className="w-full gap-2"><List className="h-4 w-4" /> Semua Mading</Button></Link>
                        <Link href="/upload"><Button variant="outline" className="w-full gap-2"><Upload className="h-4 w-4" /> Upload Karya</Button></Link>
                        <Link href={`/profile/${auth?.user?.id}`}><Button variant="outline" className="w-full gap-2"><User className="h-4 w-4" /> Profil Saya</Button></Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
