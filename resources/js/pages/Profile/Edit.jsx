import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import { User, Mail, FileText, Camera, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

export default function ProfileEdit({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        profile_photo: null,
        _method: 'PUT',
    });

    const [preview, setPreview] = useState(user.profile_photo_url);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/profile/${user.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto py-12 animate-in slide-in-from-bottom-10 duration-700">
                <div className="mb-8 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">Pengaturan Profil</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perbarui informasi identitas digitalmu.</p>
                    </div>
                    <Button variant="ghost" className="rounded-xl font-bold gap-2" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-4 w-4" /> KEMBALI
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="rounded-[3rem] border shadow-2xl overflow-hidden glass-card border-white/20">
                        <CardHeader className="bg-primary/5 border-b p-10 pb-8 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative group">
                                    <Avatar className="h-32 w-32 ring-8 ring-white dark:ring-slate-900 shadow-xl group-hover:scale-105 transition-all duration-500">
                                        <AvatarImage src={preview} alt={data.name} />
                                        <AvatarFallback className="text-3xl font-black bg-primary/5 text-primary">
                                            {data.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <label className="absolute bottom-1 right-1 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                        <Camera className="h-5 w-5" />
                                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    <CardTitle className="text-2xl font-black tracking-tight uppercase italic">{data.name}</CardTitle>
                                    <CardDescription className="font-medium">Ubah foto profil untuk memperbarui branding visualmu.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <User className="h-3 w-3" /> Nama Lengkap
                                    </label>
                                    <Input 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        className="h-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold shadow-inner focus-visible:ring-primary/20"
                                        placeholder="Masukkan nama lengkap kamu..."
                                    />
                                    {errors.name && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mt-2">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <Mail className="h-3 w-3" /> Alamat Email
                                    </label>
                                    <Input 
                                        type="email"
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        className="h-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold shadow-inner focus-visible:ring-primary/20"
                                        placeholder="email@sekolah.sch.id"
                                    />
                                    {errors.email && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mt-2">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                    <FileText className="h-3 w-3" /> Bio Singkat
                                </label>
                                <textarea 
                                    value={data.bio} 
                                    onChange={e => setData('bio', e.target.value)}
                                    className="w-full min-h-[140px] rounded-[2.5rem] bg-slate-50 border-none p-8 text-sm font-medium shadow-inner outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                                    placeholder="Ceritakan sedikit tentang dirimu atau motomu..."
                                />
                                {errors.bio && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mt-2">{errors.bio}</p>}
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex gap-4">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="h-16 px-12 rounded-[2rem] font-black tracking-widest bg-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex-1 md:flex-none"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin" /> MENYIMPAN...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Save className="h-5 w-5" /> SIMPAN PERUBAHAN
                                        </div>
                                    )}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    className="h-16 px-8 rounded-[2rem] font-bold text-slate-400"
                                    onClick={() => window.history.back()}
                                >
                                    BATAL
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
