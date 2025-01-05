import { AboutUsIcon, BlogIcon, FeatureIcon, PricingIcon, ProfileIcon } from "./svg";

const menuList = [
    {
        id: 1,
        label: 'Fitur',
        icon: <FeatureIcon />,
        bg: 'bg-blue-500',
        activeBg: 'active:bg-blue-700',
        href: '/addash',
    },
    {
        id: 2,
        label: 'Harga',
        icon: <PricingIcon />,
        bg: 'bg-green-500',
        activeBg: 'active:bg-green-700',
        href: '/addash',
    },
    {
        id: 3,
        label: 'Tentang Kami',
        icon: <AboutUsIcon />,
        bg: 'bg-yellow-500',
        activeBg: 'active:bg-yellow-700',
        href: '/addash',
    },
    {
        id: 4,
        label: 'Blog',
        icon: <BlogIcon />,
        bg: 'bg-orange-500',
        activeBg: 'active:bg-orange-700',
        href: '/addash/blog',
    },
    {
        id: 5,
        label: 'Profile',
        icon: <ProfileIcon />,
        bg: 'bg-purple-500',
        activeBg: 'active:bg-purple-700',
        href: '/addash/profile',
    },
];

export default menuList;