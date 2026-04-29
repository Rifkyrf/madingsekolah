import Swal from 'sweetalert2';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save, UserPlus, Mail, Shield, Hash, Key, UserIcon } from 'lucide-react';

export default function AdminCreate({ hakgunas, kategoriGurus }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        nis: '',
        role: '',
        kategori_guru_id: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        post('/admin/users');
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/50">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Tambah User Baru</h1>
                            <p className="text-sm text-muted-foreground">Isi formulir di bawah ini untuk membuat akun baru.</p>
                        </div>
                    </div>
                </div>

                <Card className="border shadow-lg glass-morphism overflow-hidden">
                    <CardHeader className="bg-muted/30 border-b">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <UserPlus className="h-4 w-4 text-primary" />
                            Informasi Akun
                        </CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 pt-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                    Nama Lengkap
                                </label>
                                <Input 
                                    placeholder="Jane Doe" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.name && <p className="text-[10px] font-medium text-destructive">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                    Email Address
                                </label>
                                <Input 
                                    type="email" 
                                    placeholder="jane@example.com" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.email && <p className="text-[10px] font-medium text-destructive">{errors.email}</p>}
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                                    Pilih Peran (Role)
                                </label>
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                >
                                    <option value="">-- Pilih Role --</option>
                                    {hakgunas.map(hg => (
                                        <option key={hg.id} value={hg.id}>{hg.name.toUpperCase()}</option>
                                    ))}
                                </select>
                                {errors.role && <p className="text-[10px] font-medium text-destructive">{errors.role}</p>}
                            </div>

                            {/* NIS / NIP */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                                    NIS / NIP
                                </label>
                                <Input 
                                    placeholder="Masukkan NIS atau NIP" 
                                    value={data.nis}
                                    onChange={e => setData('nis', e.target.value)}
                                    className={errors.nis ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.nis && <p className="text-[10px] font-medium text-destructive">{errors.nis}</p>}
                                <p className="text-[10px] text-muted-foreground italic">* Kosongkan jika role adalah Guest</p>
                            </div>

                            {/* Kategori Guru (Optional) */}
                            {hakgunas.find(h => h.id == data.role)?.name === 'guru' && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-semibold">Kategori Guru</label>
                                    <select 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                        value={data.kategori_guru_id}
                                        onChange={e => setData('kategori_guru_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Akun Guru --</option>
                                        {kategoriGurus.map(kg => (
                                            <option key={kg.id} value={kg.id}>{kg.nama}</option>
                                        ))}
                                    </select>
                                    {errors.kategori_guru_id && <p className="text-[10px] font-medium text-destructive">{errors.kategori_guru_id}</p>}
                                </div>
                            )}

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Key className="h-3.5 w-3.5 text-muted-foreground" />
                                    Password
                                </label>
                                <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.password && <p className="text-[10px] font-medium text-destructive">{errors.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t flex items-center justify-end p-6">
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full md:w-auto min-w-[140px] shadow-sm hover:shadow-md transition-all gap-2"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                        Menyimpan...
                                    </span>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Simpan User
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>

            <style jsx>{`
                .glass-morphism {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
            `}</style>
        </AppLayout>
    );
}
