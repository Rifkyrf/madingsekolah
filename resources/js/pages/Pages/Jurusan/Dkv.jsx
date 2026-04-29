import JurusanPage from '@/components/JurusanPage';
import { Palette, Camera, PenTool, Video, Layers, Sparkles, Image } from 'lucide-react';

export default function Dkv() {
    return (
        <JurusanPage 
            title="DKV"
            tagline="Desain Komunikasi Visual"
            description="Pelajari seni menyampaikan pesan melalui visual. Mulai dari desain grafis, ilustrasi digital, hingga branding dan strategi kreatif di era konten."
            image="/images/jurusan/dkv-hero.jpg"
            stats={[
                { icon: Palette, label: 'Creative Art', desc: 'Pemahaman mendalam tentang teori warna, tipografi, dan komposisi artistik.' },
                { icon: PenTool, label: 'Digital Tools', desc: 'Penguasaan software standar industri seperti Adobe Suite dan Figma.' },
                { icon: Camera, label: 'Visual Story', desc: 'Teknik pengambilan gambar dan komposisi dalam fotografi profesional.' },
            ]}
            highlights={[
                { title: 'Graphic Design', desc: 'Menciptakan identitas visual, logo, dan materi promosi yang berdampak tinggi.' },
                { title: 'Digital Illustration', desc: 'Seni menggambar digital untuk berbagai kebutuhan industri kreatif dan media.' },
                { title: 'Motion Graphics', desc: 'Menghidupkan elemen desain melalui animasi 2D yang menarik dan modern.' },
                { title: 'Branding Strategy', desc: 'Membangun citra sebuah brand secara konsisten dan bermakna di mata publik.' },
            ]}
        />
    );
}
