import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import WorkCard from '@/components/WorkCard';
import { Button } from '@/components/ui/button';
import { Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const FILTERS = [
    { key: 'all', label: 'Semua' },
    { key: 'karya', label: 'Karya Siswa' },
    { key: 'mading', label: 'Mading' },
    { key: 'mingguan', label: 'Mingguan' },
    { key: 'harian', label: 'Harian' },
    { key: 'prestasi', label: 'Prestasi' },
    { key: 'opini', label: 'Opini' },
    { key: 'event', label: 'Event' },
];

export default function WorkIndex({ works, selectedType }) {
    const { auth } = usePage().props;
    const currentType = selectedType || 'all';
    const handleFilter = (type) => {
        router.get('/dashboard', { type: type === 'all' ? undefined : type }, { preserveScroll: true });
    };

    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Beranda</h1>
                    <p className="text-muted-foreground text-sm mt-1">Jelajahi karya dan konten terbaru</p>
                </div>
                {auth?.user && !auth.user.is_guest && (
                    <Link href="/upload">
                        <Button size="sm" className="gap-2">
                            <Upload className="h-4 w-4" /> Upload Karya
                        </Button>
                    </Link>
                )}
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {FILTERS.map((f) => (
                    <button key={f.key} onClick={() => handleFilter(f.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                            currentType === f.key
                                ? 'bg-primary text-primary-foreground border-primary shadow'
                                : 'bg-background border-border hover:bg-accent'
                        }`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Works Grid */}
            {works?.data?.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {works.data.map((work) => (
                            <div key={work.id} className="relative">
                                <WorkCard work={work} onClick={() => router.visit(`/works/${work.id}`)} />
                            </div>
                        ))}
                    </div>

                    {works.last_page > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <Button variant="outline" size="icon" disabled={works.current_page === 1}
                                onClick={() => router.get('/dashboard', { type: currentType !== 'all' ? currentType : undefined, page: works.current_page - 1 })}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {Array.from({ length: Math.min(works.last_page, 7) }, (_, i) => i + 1).map((page) => (
                                <Button key={page} variant={page === works.current_page ? 'default' : 'outline'} size="icon"
                                    onClick={() => router.get('/dashboard', { type: currentType !== 'all' ? currentType : undefined, page })}>
                                    {page}
                                </Button>
                            ))}
                            <Button variant="outline" size="icon" disabled={works.current_page === works.last_page}
                                onClick={() => router.get('/dashboard', { type: currentType !== 'all' ? currentType : undefined, page: works.current_page + 1 })}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-5xl mb-4">📭</p>
                    <p className="font-medium">Tidak ada data yang tersimpan.</p>
                    {auth?.user && !auth.user.is_guest && (
                        <Link href="/upload" className="mt-4 inline-block">
                            <Button variant="outline" size="sm">Upload Karya Pertama</Button>
                        </Link>
                    )}
                </div>
            )}

        </AppLayout>
    );
}
