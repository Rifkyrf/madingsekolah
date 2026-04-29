import AppLayout from '@/layouts/AppLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Mail, MapPin, Calendar, LayoutGrid, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import WorkCard from '@/components/WorkCard';

export default function ProfileShow({ profileUser, categories, allWorksCount }) {
    const tabs = [
        { key: 'all', label: 'Semua Karya', count: allWorksCount },
        { key: 'karya', label: 'Karya Siswa', count: categories.karya?.length },
        { key: 'mading', label: 'Mading', count: categories.mading?.length },
        { key: 'opini', label: 'Opini', count: categories.opini?.length },
        { key: 'prestasi', label: 'Prestasi', count: categories.prestasi?.length },
    ].filter(t => t.count > 0 || t.key === 'all');

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-8 space-y-8 animate-in fade-in duration-700">
                {/* Header Profile */}
                <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border shadow-xl overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-primary/80 via-primary to-blue-600 relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    </div>
                    
                    <div className="px-8 pb-10 flex flex-col md:flex-row items-end gap-6 -mt-16 relative z-10">
                        <div className="relative group">
                            <Avatar className="h-40 w-40 border-8 border-white dark:border-slate-900 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                <AvatarImage src={profileUser.profile_photo_url} alt={profileUser.name} />
                                <AvatarFallback className="text-4xl font-black bg-primary/5 text-primary">
                                    {profileUser.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-2 right-2 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                        </div>
                        
                        <div className="flex-1 space-y-3 pb-2 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                                    {profileUser.name}
                                </h1>
                                <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 text-[10px] font-black uppercase tracking-widest">
                                    {profileUser.role_name}
                                </Badge>
                            </div>
                            <p className="text-slate-500 font-medium max-w-xl italic">
                                "{profileUser.bio || 'Membangun masa depan dengan kreativitas di BN666.'}"
                            </p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-2 border-r pr-6 border-slate-100 dark:border-slate-800">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <span>{profileUser.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>Siswa BN666</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pb-2">
                            {profileUser.is_own_profile ? (
                                <Link href={`/profile/${profileUser.id}/edit`}>
                                    <Button size="lg" className="h-14 px-8 rounded-2xl font-black tracking-widest gap-2 shadow-xl shadow-primary/20">
                                        <Edit3 className="h-5 w-5" /> EDIT PROFIL
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Button size="lg" className="h-14 px-8 rounded-2xl font-black tracking-widest gap-2 shadow-xl">
                                        IKUTI
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-2 hover:bg-slate-50 transition-all">
                                        <Share2 className="h-5 w-5" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">Galeri Karya</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total {allWorksCount} Konten Terbit</p>
                        </div>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="bg-white/50 dark:bg-slate-900/50 p-2 h-auto rounded-[2rem] border shadow-sm flex flex-wrap justify-start gap-2 mb-8">
                            {tabs.map(tab => (
                                <TabsTrigger 
                                    key={tab.key} 
                                    value={tab.key}
                                    className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-[1.5rem] px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all"
                                >
                                    {tab.label} <span className="ml-2 opacity-50 px-1.5 py-0.5 bg-black/10 rounded-lg">{tab.count}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Object.values(categories).flat().map(work => (
                                    <WorkCard key={work.id} work={work} onClick={() => router.visit(`/works/${work.id}`)} />
                                ))}
                            </div>
                        </TabsContent>

                        {tabs.slice(1).map(tab => (
                            <TabsContent key={tab.key} value={tab.key} className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categories[tab.key]?.map(work => (
                                        <WorkCard key={work.id} work={work} onClick={() => router.visit(`/works/${work.id}`)} />
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
