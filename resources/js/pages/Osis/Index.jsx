import { useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, ChevronDown, GraduationCap, Trophy, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

function MemberCard({ member, isSmall = false }) {
    const showDetails = () => {
        Swal.fire({
            html: `
                <div class="flex flex-col sm:flex-row gap-6 text-left items-center sm:items-start p-2">
                    <img src="${member.photo_url}" class="h-32 w-32 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md flex-shrink-0 bg-slate-50" onerror="this.src='https://placehold.co/400x400?text=${member.name}'" />
                    <div class="space-y-4 flex-1">
                        <div>
                            <h2 class="text-xl font-black text-slate-800 uppercase tracking-tight">${member.name}</h2>
                            <p class="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">${member.role}</p>
                        </div>
                        <div class="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div>
                                <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Kelas</p>
                                <p class="text-sm font-bold text-slate-700">${member.kelas || '-'}</p>
                            </div>
                            <div>
                                <p class="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Angkatan</p>
                                <p class="text-sm font-bold text-slate-700">${member.angkatan || '-'}</p>
                            </div>
                        </div>
                        ${member.nama_sekbid ? `<div class="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-2 rounded-lg text-xs font-bold">${member.nama_sekbid}</div>` : ''}
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Tutup',
            customClass: {
                popup: 'rounded-[2rem] p-4',
                confirmButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-8 font-bold',
            },
            buttonsStyling: false,
            width: '32rem'
        });
    };

    return (
        <div onClick={showDetails} className={cn(
            'bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1',
            isSmall ? 'p-4' : 'p-6'
        )}>
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-br from-blue-50 to-slate-50" />
            <div className="relative mb-3">
                <Avatar className={cn('ring-2 ring-white shadow-md', isSmall ? 'h-16 w-16' : 'h-20 w-20')}>
                    <AvatarImage src={member.photo_url} alt={member.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg">{member.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {member.role === 'ketua' && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 p-1.5 rounded-full shadow border-2 border-white">
                        <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                )}
            </div>
            <div className="relative z-10 space-y-1">
                <h3 className={cn('font-bold text-slate-900 line-clamp-1', isSmall ? 'text-xs' : 'text-sm')}>{member.name}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{member.role}</p>
                {member.nama_sekbid && (
                    <Badge variant="secondary" className="text-[9px] font-bold bg-slate-100 text-slate-500 border-none px-2 py-0.5 rounded-full">
                        {member.nama_sekbid}
                    </Badge>
                )}
            </div>
        </div>
    );
}

export default function OsisIndex({ pembina, intiOsis, sekbidGrouped, angkatanAktif, angkatanList }) {
    const [expandedSekbid, setExpandedSekbid] = useState({});

    const handleAngkatanChange = (angkatan) => {
        router.get('/osis', { angkatan }, { preserveState: true });
    };

    const toggleSekbid = (divisi) => {
        setExpandedSekbid(prev => ({ ...prev, [divisi]: !prev[divisi] }));
    };

    return (
        <GuestLayout>
            <div className="pt-24 pb-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-4 mb-14">
                        <Badge className="bg-blue-100 text-blue-600 border-none px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            Organisasi Intra Sekolah
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Pengurus OSIS <span className="text-blue-600">BN666</span>
                        </h1>
                        <p className="text-slate-500 text-sm max-w-lg mx-auto">
                            Para pemimpin muda yang berdedikasi memajukan SMK Bakti Nusantara 666.
                        </p>

                        {/* Angkatan selector */}
                        {angkatanList?.length > 0 && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Periode:</span>
                                <select
                                    value={angkatanAktif}
                                    onChange={(e) => handleAngkatanChange(e.target.value)}
                                    className="bg-transparent text-sm font-bold text-blue-600 outline-none cursor-pointer"
                                >
                                    {angkatanList.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                                <ChevronDown className="h-3.5 w-3.5 text-blue-600" />
                            </div>
                        )}
                    </div>

                    {/* Pembina OSIS */}
                    {pembina?.length > 0 && (
                        <section className="mb-14">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-8 bg-amber-500 rounded-full" />
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Pembina OSIS</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {pembina.map(member => <MemberCard key={member.id} member={member} />)}
                            </div>
                        </section>
                    )}

                    {/* Pengurus Inti */}
                    {intiOsis?.length > 0 && (
                        <section className="mb-14">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-8 bg-blue-600 rounded-full" />
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Pengurus Inti</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {intiOsis.map(member => <MemberCard key={member.id} member={member} />)}
                            </div>
                        </section>
                    )}

                    {/* Sekbid - grouped by divisi, in order */}
                    {sekbidGrouped && Object.keys(sekbidGrouped).length > 0 && (
                        <section className="space-y-6 mb-14">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1 w-8 bg-rose-500 rounded-full" />
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Seksi Bidang</h2>
                            </div>
                            
                            <div className="grid gap-4">
                                {Object.entries(sekbidGrouped).map(([divisi, members]) => (
                                    <div key={divisi} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                        <div 
                                            onClick={() => toggleSekbid(divisi)}
                                            className="p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                                                    {members.length}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">{divisi}</h3>
                                                    <p className="text-sm font-bold text-slate-400">Ketuk untuk melihat {members.length} anggota</p>
                                                </div>
                                            </div>
                                            <ChevronDown className={cn('h-6 w-6 text-slate-400 transition-transform duration-300', expandedSekbid[divisi] && 'rotate-180')} />
                                        </div>
                                        
                                        <div className={cn('grid-transition overflow-hidden', expandedSekbid[divisi] ? 'max-h-[2000px] border-t border-slate-100' : 'max-h-0')}>
                                            <div className="p-6 bg-slate-50/50">
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {members.map(member => <MemberCard key={member.id} member={member} isSmall />)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Stats removed */}
                </div>
            </div>
        </GuestLayout>
    );
}
