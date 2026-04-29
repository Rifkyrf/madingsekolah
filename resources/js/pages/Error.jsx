import { Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileX, ShieldX, Ghost } from 'lucide-react';
import GuestLayout from '@/layouts/GuestLayout';

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Layanan Tidak Tersedia',
        500: '500: Kesalahan Server',
        404: '404: Halaman Tidak Ditemukan',
        403: '403: Akses Ditolak',
    }[status] || 'Terjadi Kesalahan';

    const description = {
        503: 'Maaf, layanan sedang dalam pemeliharaan. Silakan coba lagi nanti.',
        500: 'Maaf, terjadi kesalahan internal di server kami. Tim kami sedang menanganinya.',
        404: 'Maaf, halaman yang Anda cari tidak ditemukan. Mungkin sudah dihapus atau URL salah.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status] || 'Terjadi kesalahan sistem, silakan kembali dalam beberapa saat.';

    const Icon = {
        503: ShieldX,
        500: AlertCircle,
        404: Ghost,
        403: ShieldX,
    }[status] || AlertCircle;

    return (
        <GuestLayout showFooter={false}>
            <Head title={title} />
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50">
                <div className="text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-8 shadow-sm">
                        <Icon strokeWidth={1.5} className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">{title}</h1>
                    <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                        {description}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/">
                            <Button className="h-12 px-8 rounded-full font-bold shadow-lg bg-blue-600 hover:bg-blue-700">
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
