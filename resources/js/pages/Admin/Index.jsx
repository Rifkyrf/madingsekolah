import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ConfirmModal from '@/components/ConfirmModal';
import { 
    Search, UserPlus, MoreVertical, Edit, Trash2, 
    ChevronLeft, ChevronRight, Filter, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminIndex({ users, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [confirmDelete, setConfirmDelete] = useState(null); // { id, name }

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin', { search }, { preserveState: true, replace: true });
    };

    const doDelete = () => {
        router.delete(`/admin/users/${confirmDelete.id}`, {
            onFinish: () => setConfirmDelete(null)
        });
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen User</h1>
                        <p className="text-muted-foreground">Kelola pengguna, guru, dan admin sistem.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </Button>
                        <Link href="/admin/users/create">
                            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                                <UserPlus className="h-4 w-4" />
                                <span>Tambah User</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filters & Table Card */}
                <div className="bg-card glass-morphism rounded-2xl border shadow-sm overflow-hidden">
                    <div className="p-4 border-b bg-muted/30">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Cari nama, email, atau NIS..." 
                                    className="pl-9 bg-background/50 border-muted"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="secondary" className="gap-2">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b text-[0.7rem] uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Karya</th>
                                    <th className="px-6 py-4">Kontak</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                                                    <AvatarImage src={user.profile_photo_url} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground line-clamp-1">{user.nis || 'Guest'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={user.hakguna?.name === 'admin' ? 'default' : 'secondary'} className="capitalize font-medium">
                                                {user.hakguna?.name || 'Siswa'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-semibold">{user.works_count || 0}</span>
                                                <span className="text-muted-foreground text-xs text-[10px] uppercase">Karya</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-muted-foreground lowercase">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/users/${user.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => setConfirmDelete({ id: user.id, name: user.name })}
                                                    disabled={auth.user.id === user.id}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground italic">
                                            Tidak ada data yang tersimpan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t bg-muted/20 flex items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">
                            Menampilkan <span className="font-semibold text-foreground">{users.from || 0}</span> sampai <span className="font-semibold text-foreground">{users.to || 0}</span> dari <span className="font-semibold text-foreground">{users.total}</span> data
                        </p>
                        <div className="flex items-center gap-1">
                            {users.links.map((link, i) => {
                                if (link.label.includes('Previous')) {
                                    return (
                                        <Button 
                                            key={i} 
                                            variant="outline" 
                                            size="icon" 
                                            className="h-8 w-8"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                    );
                                }
                                if (link.label.includes('Next')) {
                                    return (
                                        <Button 
                                            key={i} 
                                            variant="outline" 
                                            size="icon" 
                                            className="h-8 w-8"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    );
                                }
                                if (link.label === '...') {
                                    return <span key={i} className="px-2 text-muted-foreground">...</span>;
                                }
                                return (
                                    <Button 
                                        key={i} 
                                        variant={link.active ? 'default' : 'outline'} 
                                        size="icon" 
                                        className={cn("h-8 w-8", !link.url && "opacity-50 cursor-not-allowed")}
                                        onClick={() => link.url && router.get(link.url)}
                                    >
                                        <span className="text-xs font-semibold">{link.label}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                onConfirm={doDelete}
                title="Hapus User Ini?"
                description={`User "${confirmDelete?.name}" akan dihapus permanen beserta semua datanya.`}
                confirmText="Ya, Hapus"
                variant="danger"
            />
        </AppLayout>
    );
}
