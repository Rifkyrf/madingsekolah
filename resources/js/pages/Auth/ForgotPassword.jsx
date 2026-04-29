import GuestLayout from '@/layouts/GuestLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useForm, Link } from '@inertiajs/react';
import { Mail, ArrowLeft, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/password/otp/send');
    };

    return (
        <GuestLayout title="Lupa Password">
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
                <div className="w-full max-w-lg lg:max-w-4xl grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-2xl bg-white border animate-in zoom-in duration-500">
                    
                    {/* Left: Branding */}
                    <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <ShieldCheck className="w-full h-full -rotate-12 scale-150" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6 my-auto">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-primary/20 backdrop-blur-xl flex items-center justify-center border border-white/10">
                                <Mail className="h-10 w-10 text-primary" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-4xl font-black tracking-tighter uppercase italic italic">SAFETY <span className="text-primary italic">FIRST</span>.</h2>
                                <p className="text-slate-400 font-medium italic">"Jangan khawatir, kami akan membantu kamu mendapatkan akses kembali ke galeri karya siswa."</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center space-y-10">
                        <header className="space-y-4">
                            <Link href="/login" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                                <ArrowLeft className="h-4 w-4" /> KEMBALI
                            </Link>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">RESET PASSWORD</h1>
                            <p className="text-sm font-medium text-slate-500 italic">Masukkan email kamu untuk menerima kode OTP verifikasi.</p>
                        </header>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="Cth: siswa@baknun666.sch.id"
                                        className="w-full h-16 bg-slate-50 border-none rounded-3xl pl-16 pr-8 font-bold text-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest ml-4">{errors.email}</p>}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full h-16 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary transition-all active:scale-95"
                            >
                                {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : 'KIRIM KODE OTP'}
                            </Button>
                        </form>

                        <footer className="pt-10 flex flex-col items-center gap-4 text-center">
                            <div className="flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                                <Sparkles className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Keamanan Terjamin</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
