import { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import ConfirmModal from '@/components/ConfirmModal';
import {
    Users, Plus, Pencil, Trash2, Shield, AlertTriangle,
    Loader2, Save, X, Layers
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';

// ── Sekbid Modal ──────────────────────────────────────────────────────────────
function SekbidModal({ open, onClose, sekbid, onSaved }) {
    const [nama, setNama] = useState(sekbid?.nama ?? '');
    const [deskripsi, setDeskripsi] = useState(sekbid?.deskripsi ?? '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isEdit = !!sekbid;

    const handleSave = async () => {
        if (!nama.trim()) { setError('Nama sekbid wajib diisi.'); return; }
        setLoading(true);
        setError('');
        try {
            if (isEdit) {
                await axios.put(`/admin/sekbid/${sekbid.id}`, { nama, deskripsi });
            } else {
                await axios.post('/admin/sekbid', { nama, deskripsi });
            }
            onSaved();
            onClose();
        } catch (e) {
            setError(e.response?.data?.message ?? 'Gagal menyimpan.');
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit Sekbid' : 'Tambah Sekbid Baru'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nama Sekbid *</label>
                        <input
                            value={nama}
                            onChange={e => { setNama(e.target.value); setError(''); }}
                            placeholder="Cth: Sekbid 1 (Ketaqwaan)"
                            className="w-full bg-slate-50 border-none rounded-2xl h-12 px-4 font-bold text-sm focus:ring-4 focus:ring-primary/5 outline-none"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Deskripsi</label>
                        <input
                            value={deskripsi}
                            onChange={e => setDeskripsi(e.target.value)}
                            placeholder="Deskripsi singkat (opsional)"
                            className="w-full bg-slate-50 border-none rounded-2xl h-12 px-4 font-bold text-sm focus:ring-4 focus:ring-primary/5 outline-none"
                        />
                    </div>
                    {error && <p className="text-xs text-rose-500 font-bold">{error}</p>}
                </div>
                <DialogFooter>
                    <Button variant="ghost" className="rounded-xl font-bold" onClick={onClose} disabled={loading}>Batal</Button>
                    <Button className="rounded-xl font-black px-6 gap-2" onClick={handleSave} disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isEdit ? 'Simpan' : 'Tambah'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// ── Member Card ───────────────────────────────────────────────────────────────
function MemberCard({ member, onDelete }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <>
            <Card className="rounded-3xl border shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200">
                <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-slate-100 shrink-0">
                            <AvatarImage src={member.photo ? `/storage/${member.photo}` : null} />
                            <AvatarFallback className="font-bold bg-primary/5 text-primary">{member.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-800 tracking-tight uppercase italic leading-none truncate text-sm">{member.name}</p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{member.role}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/osis/${member.id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100">
                                <Pencil className="h-3.5 w-3.5 text-slate-400" />
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50" onClick={() => setConfirmDelete(true)}>
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <ConfirmModal
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={() => { onDelete(member.id); setConfirmDelete(false); }}
                title="Hapus Pengurus?"
                description={`"${member.name}" akan dihapus dari struktur OSIS.`}
                confirmText="Ya, Hapus"
                variant="danger"
            />
        </>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OsisManage({ inti, sekbid, sekbidList: initialSekbidList, angkatanList, angkatanAktif, intiCount }) {
    const [sekbidList, setSekbidList] = useState(initialSekbidList ?? []);
    const [sekbidModal, setSekbidModal] = useState({ open: false, data: null });
    const [confirmDeleteSekbid, setConfirmDeleteSekbid] = useState(null); // { id, nama }
    const [deletingSekbid, setDeletingSekbid] = useState(false);
    const [sekbidError, setSekbidError] = useState('');

    const reloadSekbidList = async () => {
        const res = await axios.get('/admin/sekbid');
        setSekbidList(res.data);
    };

    const handleDeleteMember = (id) => {
        router.delete(`/admin/osis/${id}`, { preserveScroll: true });
    };

    const handleDeleteSekbid = async () => {
        if (!confirmDeleteSekbid) return;
        setDeletingSekbid(true);
        setSekbidError('');
        try {
            await axios.delete(`/admin/sekbid/${confirmDeleteSekbid.id}`);
            await reloadSekbidList();
            setConfirmDeleteSekbid(null);
        } catch (e) {
            setSekbidError(e.response?.data?.message ?? 'Gagal menghapus.');
        }
        setDeletingSekbid(false);
    };

    const intiMax = 7;
    const intiSisa = intiMax - (intiCount ?? inti.length);

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto py-6 space-y-8 animate-in fade-in duration-500">

                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Badge className="bg-primary/10 text-primary border-none px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2">
                            ORGANIZATION EDITOR
                        </Badge>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Struktur OSIS</h1>
                        <p className="text-sm text-slate-500 mt-1">Periode: {angkatanAktif}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={angkatanAktif}
                            onChange={(e) => router.get('/osis/manage', { angkatan: e.target.value })}
                            className="bg-white border-2 rounded-2xl h-11 px-4 font-bold text-sm outline-none focus:ring-4 focus:ring-primary/5"
                        >
                            {angkatanList.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        <Link href="/admin/osis/create">
                            <Button className="h-11 px-6 rounded-2xl font-black tracking-widest gap-2 shadow-lg shadow-primary/20">
                                <Plus className="h-4 w-4" /> Tambah Pengurus
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Pengurus Inti */}
                <section className="bg-white rounded-3xl border shadow-sm p-6 space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <h2 className="font-black uppercase tracking-widest text-xs text-slate-600">Pengurus Inti</h2>
                            <Badge variant="outline" className={`rounded-full text-[10px] font-black px-3 ${intiSisa === 0 ? 'border-rose-200 text-rose-600' : 'border-primary/20 text-primary'}`}>
                                {inti.length}/{intiMax}
                            </Badge>
                        </div>
                        {intiSisa === 0 && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
                                <AlertTriangle className="h-3.5 w-3.5" /> Sudah penuh (maks 7)
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {inti.map((member) => (
                            <MemberCard key={member.id} member={member} onDelete={handleDeleteMember} />
                        ))}
                        {intiSisa > 0 && (
                            <Link href="/admin/osis/create?type=inti" className="group">
                                <div className="h-full min-h-[100px] rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all">
                                    <Plus className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                                    <span className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-widest">Tambah ({intiSisa} slot)</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </section>

                {/* Manajemen Sekbid */}
                <section className="bg-white rounded-3xl border shadow-sm p-6 space-y-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-primary" />
                            <h2 className="font-black uppercase tracking-widest text-xs text-slate-600">Seksi Bidang</h2>
                            <Badge variant="outline" className="rounded-full text-[10px] font-black px-3 border-primary/20 text-primary">
                                {sekbidList.length} sekbid
                            </Badge>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl font-bold gap-2 border-2"
                            onClick={() => setSekbidModal({ open: true, data: null })}
                        >
                            <Plus className="h-4 w-4" /> Tambah Sekbid
                        </Button>
                    </div>

                    {sekbidError && (
                        <div className="bg-rose-50 text-rose-600 text-xs font-bold px-4 py-3 rounded-2xl border border-rose-100">
                            {sekbidError}
                        </div>
                    )}

                    {/* Daftar Sekbid */}
                    <div className="space-y-3">
                        {sekbidList.length === 0 ? (
                            <div className="py-10 text-center text-slate-300 italic text-sm">
                                Belum ada sekbid. Tambahkan sekbid terlebih dahulu.
                            </div>
                        ) : (
                            sekbidList.map((s) => (
                                <div key={s.id} className="group flex items-center justify-between bg-slate-50 rounded-2xl px-5 py-4 hover:bg-primary/5 transition-colors">
                                    <div>
                                        <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{s.nama}</p>
                                        {s.deskripsi && <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.deskripsi}</p>}
                                        <p className="text-[10px] text-primary font-bold mt-1">{s.anggota_count ?? 0} anggota</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost" size="icon"
                                            className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm"
                                            onClick={() => setSekbidModal({ open: true, data: s })}
                                        >
                                            <Pencil className="h-3.5 w-3.5 text-slate-400" />
                                        </Button>
                                        <Button
                                            variant="ghost" size="icon"
                                            className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-50"
                                            onClick={() => setConfirmDeleteSekbid({ id: s.id, nama: s.nama })}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Anggota per Sekbid */}
                {Object.keys(sekbid).length > 0 && (
                    <section className="space-y-6">
                        <h2 className="font-black uppercase tracking-widest text-xs text-slate-400 px-2 flex items-center gap-2">
                            <Users className="h-4 w-4" /> Anggota per Sekbid
                        </h2>
                        {Object.keys(sekbid).map((namaSekbid) => (
                            <div key={namaSekbid} className="bg-white rounded-3xl border shadow-sm p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-black italic uppercase tracking-tight text-slate-800">{namaSekbid}</h3>
                                    <Link href={`/admin/osis/create?type=sekbid&sekbid=${encodeURIComponent(namaSekbid)}`}>
                                        <Button variant="ghost" size="sm" className="rounded-xl font-bold gap-2 hover:bg-primary/5 hover:text-primary">
                                            <Plus className="h-4 w-4" /> Tambah Anggota
                                        </Button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {sekbid[namaSekbid].map((member) => (
                                        <MemberCard key={member.id} member={member} onDelete={handleDeleteMember} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>

            {/* Sekbid Modal */}
            <SekbidModal
                open={sekbidModal.open}
                onClose={() => setSekbidModal({ open: false, data: null })}
                sekbid={sekbidModal.data}
                onSaved={reloadSekbidList}
            />

            {/* Confirm Delete Sekbid */}
            <ConfirmModal
                open={!!confirmDeleteSekbid}
                onClose={() => { setConfirmDeleteSekbid(null); setSekbidError(''); }}
                onConfirm={handleDeleteSekbid}
                title="Hapus Sekbid?"
                description={`Sekbid "${confirmDeleteSekbid?.nama}" akan dihapus. Pastikan tidak ada anggota di sekbid ini.`}
                confirmText="Ya, Hapus"
                variant="danger"
                loading={deletingSekbid}
            />
        </AppLayout>
    );
}
