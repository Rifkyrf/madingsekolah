import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function JurusanIndex({ jurusans }) {
    return (
        <GuestLayout>
            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">PROGRAM KEAHLIAN</h1>
                    <p className="text-slate-500 mt-4 max-w-xl mx-auto">Temukan jurusan yang sesuai dengan minat dan bakatmu di SMK Bakti Nusantara 666.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jurusans?.map(j => (
                        <Link key={j.id} href={`/jurusan/${j.id}`} className="group bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all p-6 flex flex-col gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">{j.name}</h3>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{j.description}</p>
                            </div>
                            <div className="mt-auto flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                                Lihat Detail <ArrowRight className="h-4 w-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
