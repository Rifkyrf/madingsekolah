import GuestLayout from '@/layouts/GuestLayout';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { Lock, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/password/otp/reset');
    };

    return (
        <GuestLayout title="Atur Ulang Password">
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <div className="w-full max-w-lg lg:max-w-4xl grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-2xl bg-white border animate-in zoom-in duration-500">
                    
                    {/* Left: Branding */}
                    <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-10 opacity-5">
                            <Lock className="h-64 w-64 -rotate-12" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6 my-auto">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-emerald-500/20 backdrop-blur-xl flex items-center justify-center border border-emerald-500/20">
                                <Sparkles className="h-10 w-10 text-emerald-400" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">TAHAP <span className="text-primary italic">AKHIR</span>.</h2>
                                <p className="text-slate-400 font-medium italic">"Buatlah password baru yang kuat dan mudah kamu ingat agar akunmu tetap aman."</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center space-y-10">
                         <header className="space-y-4 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">KEY GENERATOR</h1>
                            <p className="text-sm font-medium text-slate-500 italic">Tetapkan password baru untuk keamanan akun kamu.</p>
                        </header>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full h-16 bg-slate-50 border-none rounded-3xl pl-16 pr-8 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        required
                                    />
                                </div>
                                {errors.password && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-4">{errors.password}</p>}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                                    <input 
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full h-16 bg-slate-50 border-none rounded-3xl pl-16 pr-8 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full h-20 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 shadow-emerald-500/10"
                            >
                                {processing ? <Loader2 className="h-6 w-6 animate-spin" /> : 'AKTIFKAN PASSWORD BARU'}
                            </Button>
                        </form>

                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex items-start gap-4">
                            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                            <p className="text-[10px] font-bold text-amber-700 italic leading-relaxed">
                                Pastikan password minimal 8 karakter, kombinasi huruf besar, kecil, dan angka untuk proteksi maksimal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
