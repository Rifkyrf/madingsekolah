import AppLayout from '@/layouts/AppLayout';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
    Type, Image as ImageIcon, Square, Circle, 
    Eraser, Trash2, Download, Save, Send,
    Loader2, MousePointer2, Settings2, Sparkles,
    ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

export default function Canvas({ mading = null }) {
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(24);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Load Fabric.js
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
        script.async = true;
        script.onload = () => initCanvas();
        document.body.appendChild(script);

        return () => {
            if (fabricRef.current) {
                fabricRef.current.dispose();
            }
            document.body.removeChild(script);
        };
    }, []);

    const initCanvas = () => {
        const isMobile = window.innerWidth < 768;
        const width = isMobile ? window.innerWidth - 48 : 800;
        const height = isMobile ? 500 : 700;

        const canvas = new window.fabric.Canvas(canvasRef.current, {
            width: width,
            height: height,
            backgroundColor: '#ffffff',
            preserveObjectStacking: true,
        });

        fabricRef.current = canvas;
        setLoading(false);

        if (mading?.design_data) {
            canvas.loadFromJSON(mading.design_data, () => {
                canvas.renderAll();
            });
        }
    };

    const addText = () => {
        const text = new window.fabric.IText('Klik untuk ubah teks', {
            left: 100,
            top: 100,
            fontFamily: 'Inter, sans-serif',
            fontSize: fontSize,
            fill: color,
        });
        fabricRef.current.add(text);
        fabricRef.current.setActiveObject(text);
    };

    const addRect = () => {
        const rect = new window.fabric.Rect({
            left: 150,
            top: 150,
            fill: color,
            width: 100,
            height: 100,
            rx: 10,
            ry: 10
        });
        fabricRef.current.add(rect);
        fabricRef.current.setActiveObject(rect);
    };

    const addCircle = () => {
        const circle = new window.fabric.Circle({
            left: 200,
            top: 200,
            fill: color,
            radius: 50,
        });
        fabricRef.current.add(circle);
        fabricRef.current.setActiveObject(circle);
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (f) => {
                window.fabric.Image.fromURL(f.target.result, (img) => {
                    img.scaleToWidth(200);
                    fabricRef.current.add(img);
                    fabricRef.current.setActiveObject(img);
                });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    const deleteSelected = () => {
        const activeObjects = fabricRef.current.getActiveObjects();
        fabricRef.current.discardActiveObject();
        fabricRef.current.remove(...activeObjects);
    };

    const clearCanvas = () => {
        if (confirm('Bersihkan semua?')) {
            fabricRef.current.clear();
            fabricRef.current.setBackgroundColor('#ffffff', fabricRef.current.renderAll.bind(fabricRef.current));
        }
    };

    const saveToServer = async (status) => {
        const title = prompt('Masukkan Judul Mading:', mading?.title || '');
        if (!title) return;

        setSaving(true);
        const designData = JSON.stringify(fabricRef.current.toJSON());
        const thumbnail = fabricRef.current.toDataURL({ format: 'png', quality: 0.8 });

        // Convert dataURL to Blob
        const response = await fetch(thumbnail);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', 'Mading Digital');
        formData.append('design_data', designData);
        formData.append('status', status);
        formData.append('thumbnail', blob, 'mading.png');

        if (mading) {
            formData.append('_method', 'PUT');
            router.post(`/mading/${mading.id}`, formData, {
                onFinish: () => setSaving(false)
            });
        } else {
            router.post('/mading', formData, {
                onFinish: () => setSaving(false)
            });
        }
    };

    const downloadImage = () => {
        const dataURL = fabricRef.current.toDataURL({
            format: 'png',
            multiplier: 2
        });
        const link = document.createElement('a');
        link.download = 'mading-karsisiwa.png';
        link.href = dataURL;
        link.click();
    };

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 animate-in fade-in duration-700">
                {/* Tools Sidebar */}
                <aside className="lg:w-80 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border p-8 shadow-xl space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-xl font-black tracking-tighter uppercase italic flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-primary" /> EDITOR TOOLS
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Rancang mading kreatifmu</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <ToolButton icon={Type} label="Teks" onClick={addText} />
                            <ToolButton icon={ImageIcon} label="Gambar" onClick={addImage} />
                            <ToolButton icon={Square} label="Kotak" onClick={addRect} />
                            <ToolButton icon={Circle} label="Bulat" onClick={addCircle} />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Warna Utama</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['#000000', '#2563eb', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(c => (
                                        <button 
                                            key={c} 
                                            className={cn("h-8 w-8 rounded-full border-2 transition-transform hover:scale-110", color === c ? "border-primary scale-110" : "border-transparent")}
                                            style={{ backgroundColor: c }}
                                            onClick={() => setColor(c)}
                                        />
                                    ))}
                                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-8 w-8 rounded-full overflow-hidden cursor-pointer bg-transparent border-none" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ukuran Font</label>
                                    <span className="text-[10px] font-black py-0.5 px-2 bg-slate-100 rounded-md">{fontSize}px</span>
                                </div>
                                <Slider 
                                    defaultValue={[fontSize]} 
                                    max={120} 
                                    min={12} 
                                    step={1} 
                                    onValueChange={v => setFontSize(v[0])}
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t space-y-3">
                            <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl font-bold h-12 text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={deleteSelected}>
                                <Trash2 className="h-4 w-4" /> Hapus Terpilih
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl font-bold h-12 text-slate-400" onClick={clearCanvas}>
                                <Eraser className="h-4 w-4" /> Bersihkan Semua
                            </Button>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Sparkles className="h-5 w-5 fill-current" />
                            <span className="text-sm font-black tracking-widest uppercase italic">Tips Kreatif</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                            "Gunakan kombinasi warna kontras dan perbesar ukuran teks untuk headline agar menarik perhatian pembaca."
                        </p>
                    </div>
                </aside>

                {/* Main Canvas Area */}
                <main className="flex-1 space-y-6">
                    <header className="bg-white dark:bg-slate-900 rounded-[2.5rem] border p-6 px-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                             <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/50" onClick={() => router.visit('/mading')}>
                                <ArrowLeft className="h-5 w-5" />
                             </Button>
                             <div>
                                <h1 className="text-2xl font-black tracking-tighter uppercase italic">{mading ? 'Edit' : 'Canvas'} Mading</h1>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kreativitas tak terbatas</p>
                             </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-2" onClick={downloadImage}>
                                <Download className="h-4 w-4 mr-2" /> PNG
                            </Button>
                            <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-2 text-amber-500 border-amber-100 hover:bg-amber-50" onClick={() => saveToServer('draft')}>
                                <Save className="h-4 w-4 mr-2" /> SIMPAN DRAFT
                            </Button>
                            <Button className="h-12 px-8 rounded-2xl font-black tracking-widest shadow-lg shadow-primary/20" onClick={() => saveToServer('published')} disabled={saving}>
                                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />} 
                                {mading ? 'UPDATE' : 'TERBITKAN'}
                            </Button>
                        </div>
                    </header>

                    <div className="bg-slate-100 dark:bg-slate-950 rounded-[3rem] p-12 border-4 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[700px] relative overflow-hidden">
                        {loading && (
                            <div className="absolute inset-0 z-20 bg-white/50 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="text-sm font-black tracking-widest text-primary animate-pulse uppercase">Inisialisasi Canvas...</p>
                            </div>
                        )}
                        <div className="shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden bg-white">
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
                .canvas-container { margin: 0 auto !important; }
            `}</style>
        </AppLayout>
    );
}

function ToolButton({ icon: Icon, label, onClick }) {
    return (
        <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center p-4 h-24 rounded-2xl gap-3 border-2 hover:border-primary hover:text-primary transition-all group"
            onClick={onClick}
        >
            <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </Button>
    );
}
