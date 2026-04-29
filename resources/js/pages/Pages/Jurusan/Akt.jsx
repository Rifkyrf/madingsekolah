import JurusanPage from '@/components/JurusanPage';
import { Calculator, BarChart3, FileText } from 'lucide-react';

export default function Akt() {
    return (
        <JurusanPage
            title="AKT"
            tagline="Akuntansi dan Keuangan Lembaga"
            description="Kuasai ilmu akuntansi, perpajakan, dan keuangan lembaga untuk menjadi tenaga profesional di bidang keuangan."
            image="/images/jurusan/akt-hero.jpg"
            stats={[
                { icon: Calculator, label: 'Akuntansi', desc: 'Pembukuan dan laporan keuangan profesional.' },
                { icon: BarChart3, label: 'Analisis Keuangan', desc: 'Analisis laporan keuangan perusahaan.' },
                { icon: FileText, label: 'Perpajakan', desc: 'Pengelolaan pajak sesuai regulasi terkini.' },
            ]}
            highlights={[
                { title: 'Pembukuan Digital', desc: 'Menggunakan software akuntansi modern seperti MYOB dan Accurate.' },
                { title: 'Laporan Keuangan', desc: 'Menyusun laporan keuangan sesuai standar akuntansi.' },
                { title: 'Perpajakan', desc: 'Menghitung dan melaporkan pajak dengan benar.' },
                { title: 'Audit Internal', desc: 'Melakukan pemeriksaan keuangan internal perusahaan.' },
            ]}
        />
    );
}
