import Swal from 'sweetalert2';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Save, UserCheck, Mail, Shield, Hash, Key, UserIcon } from 'lucide-react';

export default function AdminEdit({ user, hakgunas, kategoriGurus }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        nis: user.nis || '',
        role: user.role || '',
        kategori_guru_id: user.kategori_guru_id || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({ title: 'Tunggu dulu...', text: 'Apakah Anda yakin ingin melanjutkan aksi ini?', icon: 'question', showCancelButton: true, confirmButtonText: 'Ya, Lanjutkan', cancelButtonText: 'Batal', customClass: { confirmButton: 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2', cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2' }, buttonsStyling: false });
        if (!result.isConfirmed) return;
        put(`/admin/users/${user.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted/50">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Edit Profile User</h1>
                            <p className="text-sm text-muted-foreground text-primary italic">ID: #{user.id}</p>
                        </div>
                    </div>
                </div>

                <Card className="border shadow-lg glass-morphism overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-primary" />
                            Informasi Detail
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
                                    className={errors.name ? "border-destructive" : ""}
                                />
                                {errors.name && <p className="text-[10px] text-destructive italic">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                    Email Address
                                </label>
                                <Input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className={errors.email ? "border-destructive" : ""}
                                />
                                {errors.email && <p className="text-[10px] text-destructive italic">{errors.email}</p>}
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                                    Peran (Role)
                                </label>
                                <select 
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                >
                                    <option value="">-- Pilih Role --</option>
                                    {hakgunas.map(hg => (
                                        <option key={hg.id} value={hg.id}>{hg.name.toUpperCase()}</option>
                                    ))}
                                </select>
                                {errors.role && <p className="text-[10px] text-destructive italic">{errors.role}</p>}
                            </div>

                            {/* NIS / NIP */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                                    NIS / NIP
                                </label>
                                <Input 
                                    value={data.nis}
                                    onChange={e => setData('nis', e.target.value)}
                                    className={errors.nis ? "border-destructive" : ""}
                                />
                                {errors.nis && <p className="text-[10px] text-destructive italic">{errors.nis}</p>}
                            </div>

                            {/* Guru Specific */}
                            {hakgunas.find(h => h.id == data.role)?.name === 'guru' && (
                                <div className="space-y-2 py-2 bg-muted/20 rounded-lg px-3">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Opsi Pilihan Guru</label>
                                    <select 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={data.kategori_guru_id}
                                        onChange={e => setData('kategori_guru_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        {kategoriGurus.map(kg => (
                                            <option key={kg.id} value={kg.id}>{kg.nama}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="pt-4 border-t">
                                <p className="text-xs text-muted-foreground mb-4">Ganti Password (Opsional)</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase text-muted-foreground">Password Baru</label>
                                        <Input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase text-muted-foreground">Konfirmasi</label>
                                        <Input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                </div>
                                {errors.password && <p className="text-[10px] text-destructive italic mt-1">{errors.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t flex items-center justify-end p-6">
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full md:w-auto min-w-[140px] shadow-sm gap-2"
                            >
                                {processing ? 'Menyimpan...' : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Update Data
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
