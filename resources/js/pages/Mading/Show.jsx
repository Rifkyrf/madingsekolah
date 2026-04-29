import GuestLayout from '@/layouts/GuestLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Download, Calendar, User, ArrowLeft, 
    MessageSquare, Heart, Share2, Sparkles,
    Palette
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';

export default function MadingShow({ mading }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
        script.onload = () => {
             const canvas = new window.fabric.StaticCanvas(canvasRef.current, {
                width: 800,
                height: 700,
                backgroundColor: '#ffffff'
             });
             if (mading.design_data) {
                 canvas.loadFromJSON(mading.design_data, () => {
                     canvas.renderAll();
                     
                     // Responsive scaling if needed
                     const containerWidth = canvasRef.current.parentElement.clientWidth - 40;
                     if (containerWidth < 800) {
                         const scale = containerWidth / 800;
                         canvas.setZoom(scale);
                         canvas.setDimensions({ width: 800 * scale, height: 700 * scale });
                     }
                 });
             }
        };
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [mading]);

    return (
        <GuestLayout>
            <div className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
                        {/* Header Detail */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-sm" onClick={() => window.history.back()}>
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                        <Palette className="h-3.5 w-3.5" />
                                        <span>GALLERY MADING</span>
                                    </div>
                                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">{mading.title}</h1>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold bg-white border-2">
                                    <Share2 className="h-4 w-4 mr-2" /> BAGIKAN
                                </Button>
                                <Button className="h-12 px-8 rounded-2xl font-black tracking-widest shadow-lg shadow-primary/20">
                                    <Download className="h-4 w-4 mr-2" /> UNDUH PNG
                                </Button>
                            </div>
                        </div>

                        {/* Main Canvas Display */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-4 lg:p-10 shadow-2xl border flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <Sparkles className="h-12 w-12 text-primary opacity-10" />
                            </div>
                            <div className="shadow-2xl rounded-lg overflow-hidden border">
                                <canvas ref={canvasRef} />
                            </div>
                        </div>

                        {/* Author Info */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border shadow-sm flex items-start gap-6">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                    {mading.user?.name?.charAt(0)}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-black text-slate-400 tracking-widest uppercase">Kreator</p>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{mading.user?.name}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
                                        "{mading.description || 'Siswa kreatif SMK BN666 yang selalu berinovasi dalam karya visual.'}"
                                    </p>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 flex flex-col justify-center gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tgl Terbit</span>
                                    <span className="text-xs font-black text-primary uppercase">{mading.created_at_human}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggapan</span>
                                    <div className="flex items-center gap-4 text-slate-400">
                                         <div className="flex items-center gap-1.5 font-bold">
                                            <Heart className="h-4 w-4" /> 12
                                         </div>
                                         <div className="flex items-center gap-1.5 font-bold">
                                            <MessageSquare className="h-4 w-4" /> 5
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
