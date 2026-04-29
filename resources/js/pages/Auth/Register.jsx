import { useForm, Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail, UserPlus, ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-['Poppins']">
            <Head title="Daftar sebagai Guest" />

            <div className="flex w-full h-screen overflow-hidden">
                {/* Form Side (Left) */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#f8fafc]">
                    <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transform transition-all hover:translate-y-[-2px]">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 text-[#0ea5e9] mb-2 font-bold text-xl uppercase tracking-tighter">
                                <UserPlus className="h-8 w-8" />
                                Daftar Guest
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-2 px-1">
                                    <Mail className="h-4 w-4" /> Email
                                </label>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="h-14 rounded-xl bg-[#f8fafc] border border-slate-200 px-5 text-sm font-semibold transition-all focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                                    placeholder="Masukkan email Anda"
                                    required
                                />
                                {errors.email && (
                                    <div className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border-l-[3px] border-rose-400 mt-2 font-medium">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-2 px-1">
                                    <Lock className="h-4 w-4" /> Password
                                </label>
                                <Input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="h-14 rounded-xl bg-[#f8fafc] border border-slate-200 px-5 text-sm font-semibold transition-all focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <div className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border-l-[3px] border-rose-400 mt-2 font-medium">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Password Confirmation */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-2 px-1">
                                    <CheckCircle className="h-4 w-4" /> Konfirmasi Password
                                </label>
                                <Input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="h-14 rounded-xl bg-[#f8fafc] border border-slate-200 px-5 text-sm font-semibold transition-all focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full h-14 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-xl font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                <UserPlus className="h-4 w-4" />
                                {processing ? 'Memproses...' : 'Buat Akun'}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                                Sudah punya akun?{' '}
                                <Link href="/login" className="text-[#0ea5e9] font-extrabold hover:underline">
                                    Login di sini
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Side (Right) */}
                <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-12 bg-[#0ea5e9] text-white text-center">
                    <div className="max-w-md space-y-6">
                        <h2 className="text-4xl font-bold italic uppercase tracking-tighter">Daftar sebagai Guest</h2>
                        <p className="text-lg opacity-90 font-medium">Beri like, komentar, dan eksplor karya siswa SMK Bakti Nusantara 666.</p>
                        <div className="pt-8 flex justify-center">
                            <div className="bg-white/20 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                                <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
                                <p className="text-xs font-bold uppercase tracking-widest">Keamanan Data Terjamin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

