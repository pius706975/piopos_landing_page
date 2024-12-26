import {
    CalculatorIcon,
    ChartPieIcon,
    ClockIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    SunIcon,
} from '@heroicons/react/24/solid';

import featureOneImg from '../../../../../../public/img/feature-one.png';
import featureTwoImg from '../../../../../../public/img/feature-two.png';

const featureOne = {
    title: 'Fitur Utama PIOPOS',
    desc: 'PIOPOS dirancang untuk memberikan kemudahan dalam mengelola bisnis Anda dengan fitur-fitur unggulan berikut.',
    image: featureOneImg,
    bullets: [
        {
            title: 'Akuntansi',
            desc: 'Kelola dan hitung keuangan Anda dengan akuntansi akurat yang terintegrasi ke dalam POS Anda.',
            icon: <CalculatorIcon />,
        },
        {
            title: 'Laporan Penjualan Real-time',
            desc: 'Dapatkan laporan penjualan langsung untuk membantu Anda membuat keputusan bisnis lebih cepat dan tepat.',
            icon: <ClockIcon />,
        },
        {
            title: 'Manajemen Stok Otomatis',
            desc: 'Pantau dan kelola stok produk Anda dengan sistem yang otomatis dan akurat.',
            icon: <ChartPieIcon />,
        },
    ],
};

const featureTwo = {
    title: 'Fitur Lainnya',
    desc: 'Selain fitur utama, PIOPOS juga dilengkapi dengan fitur tambahan untuk meningkatkan efisiensi dan kenyamanan pengguna.',
    image: featureTwoImg,
    bullets: [
        {
            title: 'Antarmuka Ramah Pengguna',
            desc: 'Mudah digunakan, bahkan untuk pengguna yang baru pertama kali menggunakan sistem Point of Sales.',
            icon: <ComputerDesktopIcon />,
        },
        {
            title: 'Akses Multi-Perangkat',
            desc: 'Progressive Web App (PWA) memungkinkan Anda untuk menggunakan PIOPOS di desktop, tablet, atau smartphone dengan antarmuka responsif tanpa perlu menginstall aplikasi',
            icon: <DevicePhoneMobileIcon />,
        },
        {
            title: 'Mode Gelap & Terang',
            desc: 'Pilih tampilan yang sesuai dengan kenyamanan Anda, baik mode gelap maupun terang.',
            icon: <SunIcon />,
        },
    ],
};

export { featureOne, featureTwo };
