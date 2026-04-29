import JurusanPage from '@/components/JurusanPage';
import { Terminal, Code2, Database, Layout, Globe, Smartphone, Server } from 'lucide-react';

export default function Pplg() {
    return (
        <JurusanPage 
            title="PPLG"
            tagline="Pengembangan Perangkat Lunak dan Gim"
            description="Mencetak pengembang perangkat lunak profesional yang ahli dalam pemrograman, pengembangan web, aplikasi mobile, hingga industri game modern."
            image="/images/jurusan/pplg-hero.jpg"
            stats={[
                { icon: Terminal, label: 'Modern Stack', desc: 'Belajar menggunakan teknologi terkini seperti React, Node.js, dan Flutter.' },
                { icon: Database, label: 'Backend Expert', desc: 'Kemampuan mengelola database kompleks dan sistem server-side yang aman.' },
                { icon: Layout, label: 'UI/UX Design', desc: 'Seni menciptakan antarmuka pengguna yang menarik dan fungsional.' },
            ]}
            highlights={[
                { title: 'Web Development', desc: 'Menguasai fullstack web development dari frontend hingga deployment server.' },
                { title: 'Mobile App Creation', desc: 'Membangun aplikasi Android dan iOS dengan framework lintas platform modern.' },
                { title: 'Game Development', desc: 'Logika pemrograman tingkat tinggi untuk menciptakan pengalaman interaktif di industri gim.' },
                { title: 'Cloud Computing', desc: 'Eksplorasi layanan awan untuk skalabilitas dan performa aplikasi tingkat tinggi.' },
            ]}
        />
    );
}
