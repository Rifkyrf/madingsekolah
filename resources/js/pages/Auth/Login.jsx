import { useForm, Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail, User, IdCard, GraduationCap, ArrowRight, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Login({ status, errors: serverErrors }) {
    const [loginMode, setLoginMode] = useState('internal_nis');
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        identifier: '',
        password: '',
        login_as: 'internal_nis',
        remember: false,
    });

    useEffect(() => {
        setData('login_as', loginMode);
    }, [loginMode]);

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    const getModeLabel = () => {
        if (loginMode === 'internal_nis') return 'NIS';
        if (loginMode === 'internal_email') return 'Email';
        return 'Email Tamu';
    };

    const getModePlaceholder = () => {
        if (loginMode === 'internal_nis') return 'Masukkan NIS Anda';
        if (loginMode === 'internal_email') return 'Masukkan email Anda';
        return 'Masukkan email tamu';
    };

    const getModeIcon = () => {
        if (loginMode === 'internal_nis') return <IdCard className="h-4 w-4" />;
        if (loginMode === 'internal_email') return <Mail className="h-4 w-4" />;
        return <User className="h-4 w-4" />;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-['Poppins']">
            <Head title="Login Siswa, Guru & Tamu" />
            
            <div className="flex w-full h-screen overflow-hidden">
                {/* Visual Side (Left) */}
                <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-8 bg-slate-900 group">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[10s] group-hover:scale-110" 
                        style={{ backgroundImage: "url('/images/sekolah_hero.png')" }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                    
                    <div className="relative z-10 text-center text-white space-y-4">
                        <h2 className="text-4xl font-bold drop-shadow-2xl">SMK Bakti Nusantara 666</h2>
                        <p className="text-lg opacity-90 font-medium">Mencetak Generasi Unggul dan Berkarakter</p>
                    </div>
                </div>

                {/* Form Side (Right) */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#f8fafc]">
                    <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transform transition-all hover:translate-y-[-2px]">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 text-[#1e40af] mb-2 font-bold text-xl uppercase tracking-tighter">
                                <GraduationCap className="h-8 w-8 text-[#3b82f6]" />
                                Bakti Nusantara 666
                            </div>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-medium border border-emerald-100 flex items-center gap-2">
                                <LogIn className="h-4 w-4" /> {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Mode Toggle */}
                            <div className="flex bg-[#f1f5f9] p-1 rounded-2xl gap-1 shrink-0">
                                {[
                                    { id: 'internal_nis', label: 'Login NIS' },
                                    { id: 'internal_email', label: 'Login Email' },
                                    { id: 'guest', label: 'Login Tamu' }
                                ].map((mode) => (
                                    <button
                                        key={mode.id}
                                        type="button"
                                        onClick={() => setLoginMode(mode.id)}
                                        className={cn(
                                            "flex-1 py-2 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                                            loginMode === mode.id 
                                                ? "bg-white text-[#1e40af] shadow-sm" 
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        {mode.label}
                                    </button>
                                ))}
                            </div>

                            {/* Identifier Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-2 px-1">
                                    {getModeIcon()} {getModeLabel()}
                                </label>
                                <Input
                                    type="text"
                                    value={data.identifier}
                                    onChange={(e) => setData('identifier', e.target.value)}
                                    className={cn(
                                        "h-14 rounded-xl bg-[#f8fafc] border border-slate-200 px-5 text-sm font-semibold transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10",
                                        errors.identifier && "border-rose-400 focus:ring-rose-500/10"
                                    )}
                                    placeholder={getModePlaceholder()}
                                />
                                {errors.identifier && (
                                    <div className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border-l-[3px] border-rose-400 mt-2 font-medium flex items-center gap-2">
                                        <ArrowRight className="h-3 w-3" /> {errors.identifier}
                                    </div>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 flex items-center gap-2 px-1">
                                    <Lock className="h-4 w-4" /> Password
                                </label>
                                <div className="relative group">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={cn(
                                            "h-14 rounded-xl bg-[#f8fafc] border border-slate-200 px-5 pr-12 text-sm font-semibold transition-all focus:bg-white focus:ring-4 focus:ring-blue-500/10",
                                            errors.password && "border-rose-400 focus:ring-rose-500/10"
                                        )}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border-l-[3px] border-rose-400 mt-2 font-medium flex items-center gap-2">
                                        <ArrowRight className="h-3 w-3" /> {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full h-14 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                <LogIn className="h-4 w-4" />
                                {processing ? 'Memproses...' : 'Masuk'}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3 text-center">
                            <Link href="/forgot-password" size="sm" className="block text-xs font-bold text-[#3b82f6] hover:underline">
                                Lupa password?
                            </Link>
                            <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                                Belum punya akun?{' '}
                                <Link href="/register" className="text-[#3b82f6] font-extrabold hover:underline">
                                    Daftar Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

