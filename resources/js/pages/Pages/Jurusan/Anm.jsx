import JurusanPage from '@/components/JurusanPage';
import { Film, Clapperboard, Palette } from 'lucide-react';

export default function Anm() {
    return (
        <JurusanPage
            title="ANM"
            tagline="Animasi"
            description="Ciptakan karya animasi 2D/3D yang memukau. Pelajari teknik animasi, motion graphics, dan visual effects untuk industri kreatif."
            image="/images/jurusan/anm-hero.jpg"
            stats={[
                { icon: Film, label: '2D/3D Animation', desc: 'Teknik animasi karakter dan environment.' },
                { icon: Clapperboard, label: 'Motion Graphics', desc: 'Desain grafis bergerak untuk media digital.' },
                { icon: Palette, label: 'Visual Effects', desc: 'Efek visual untuk film dan video.' },
            ]}
            highlights={[
                { title: 'Character Animation', desc: 'Membuat animasi karakter yang ekspresif dan hidup.' },
                { title: '3D Modeling', desc: 'Pemodelan objek 3D untuk game dan film animasi.' },
                { title: 'Motion Graphics', desc: 'Desain grafis bergerak untuk iklan dan konten digital.' },
                { title: 'Video Editing', desc: 'Editing video profesional dengan software industry standard.' },
            ]}
        />
    );
}
