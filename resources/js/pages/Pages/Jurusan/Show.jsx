import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JurusanShow({ jurusan }) {
    return (
        <GuestLayout>
            <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <Link href="/jurusan"><Button variant="outline" className="gap-2 mb-8"><ArrowLeft className="h-4 w-4" /> Semua Jurusan</Button></Link>
                <div className="bg-white rounded-2xl border shadow-sm p-10">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-4">{jurusan?.name}</h1>
                    <p className="text-slate-600 leading-relaxed">{jurusan?.description || 'Informasi jurusan akan segera tersedia.'}</p>
                </div>
            </div>
        </GuestLayout>
    );
}
