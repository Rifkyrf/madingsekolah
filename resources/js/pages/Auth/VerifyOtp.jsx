import GuestLayout from '@/layouts/GuestLayout';
import { Button } from '@/components/ui/button';
import { useForm, Link } from '@inertiajs/react';
import { ShieldCheck, ArrowLeft, Loader2, KeyRound } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function VerifyOtp({ email }) {
    const { data, setData, post, processing, errors } = useForm({
        email: email || '',
        otp: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/password/otp/verify');
    };

    return (
        <GuestLayout title="Verifikasi Kode OTP">
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <div className="w-full max-w-lg lg:max-w-4xl grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-2xl bg-white border animate-in zoom-in duration-500">
                    
                    {/* Left: Branding */}
                    <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <KeyRound className="h-48 w-48 rotate-45" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6 my-auto">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20">
                                <ShieldCheck className="h-10 w-10 text-white" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">VERIFIKASI <span className="text-slate-900">AKUN</span>.</h2>
                                <p className="text-white/80 font-medium italic italic">"Cek kotak masuk email kamu, kami baru saja mengirimkan 6 digit kode unik."</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center space-y-10">
                        <header className="space-y-4">
                            <Link href="/password/otp/request" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                                <ArrowLeft className="h-4 w-4" /> RE-SEND EMAIL
                            </Link>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">KONFIRMASI OTP</h1>
                            <p className="text-sm font-medium text-slate-500 italic">
                                Kode terkirim ke <span className="text-slate-900 font-black not-italic">{email}</span>
                            </p>
                        </header>

                        <form onSubmit={submit} className="space-y-10">
                            <div className="space-y-6 text-center">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block">6-DIGIT VERIFICATION CODE</label>
                                <input 
                                    type="text"
                                    maxLength="6"
                                    value={data.otp}
                                    onChange={e => setData('otp', e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full text-center text-5xl font-black tracking-[0.5em] bg-slate-50 border-none rounded-[2rem] p-10 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-primary"
                                    placeholder="------"
                                    required
                                />
                                {errors.otp && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest leading-relaxed italic">{errors.otp}</p>}
                                {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest leading-relaxed italic">{errors.email}</p>}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing || data.otp.length < 6}
                                className="w-full h-20 rounded-[2.5rem] bg-slate-900 text-white font-black tracking-[0.2em] text-xs shadow-2xl hover:bg-primary transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                            >
                                {processing ? <Loader2 className="h-6 w-6 animate-spin" /> : 'VERIFIKASI SEKARANG'}
                            </Button>
                        </form>

                        <footer className="text-center">
                             <button type="button" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                                Tidak menerima kode? <span className="text-slate-800">Kirim Ulang (60s)</span>
                             </button>
                        </footer>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
