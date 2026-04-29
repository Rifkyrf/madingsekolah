import JurusanPage from '@/components/JurusanPage';
import { ShoppingBag, TrendingUp, Users } from 'lucide-react';

export default function Bdp() {
    return (
        <JurusanPage
            title="BDP"
            tagline="Bisnis Daring dan Pemasaran"
            description="Pelajari strategi pemasaran digital, e-commerce, dan manajemen bisnis modern yang relevan dengan era digital saat ini."
            image="/images/jurusan/bdp-hero.jpg"
            stats={[
                { icon: ShoppingBag, label: 'E-Commerce', desc: 'Kelola toko online dan marketplace profesional.' },
                { icon: TrendingUp, label: 'Digital Marketing', desc: 'Kuasai strategi pemasaran di era digital.' },
                { icon: Users, label: 'Manajemen Bisnis', desc: 'Bangun dan kelola bisnis yang berkelanjutan.' },
            ]}
            highlights={[
                { title: 'Pemasaran Digital', desc: 'SEO, SEM, Social Media Marketing, dan Content Marketing.' },
                { title: 'E-Commerce', desc: 'Pengelolaan toko online di berbagai platform marketplace.' },
                { title: 'Analisis Bisnis', desc: 'Membaca data pasar dan tren konsumen secara akurat.' },
                { title: 'Kewirausahaan', desc: 'Membangun jiwa wirausaha dan bisnis mandiri.' },
            ]}
        />
    );
}
