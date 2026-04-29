import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Clock, Play, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkCard({ work, onClick }) {
    const thumb = work.thumbnail_url || work.icon || 'https://placehold.co/600x400?text=No+Preview';
    const authorPhoto = work.user?.profile_photo_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(work.user?.name ?? 'User')}&background=1a4b8c&color=fff`;

    const isVideo = ['mp4', 'webm', 'mov'].includes(work.file_type?.toLowerCase());

    return (
        <div
            className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary/5 cursor-pointer transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
            onClick={onClick}
        >
            <div className="relative aspect-[4/3] m-2 overflow-hidden rounded-[2rem]">
                <img
                    src={thumb}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Error+Loading'; }}
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none hover:bg-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {work.type_label ?? work.type}
                    </Badge>
                </div>

                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                            <Play className="h-5 w-5 text-white fill-current" />
                        </div>
                    </div>
                )}

                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                        <ExternalLink className="h-4 w-4" />
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                    {work.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
                    "{work.description || 'Tanpa deskripsi...'}"
                </p>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-50 dark:border-slate-800/50">
                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <Avatar className="h-8 w-8 ring-2 ring-slate-50 dark:ring-slate-950">
                                <AvatarImage src={authorPhoto} alt={work.user?.name} />
                                <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                                    {work.user?.name?.charAt(0) ?? 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{work.user?.name ?? 'Anonim'}</span>
                            <span className="text-[10px] text-slate-400 font-medium">Siswa BN666</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {work.created_at_human}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
