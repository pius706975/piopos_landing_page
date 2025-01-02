'use client';
import useAdminValidation from '@/app/(admin)/addash/hook/validateAdmin';
import Link from 'next/link';
import menuList from './menuItem';
import LoadingComponent from '@/components/Loading';
import { useAuth } from '@/service/api';

const Dashboard = () => {
    useAuth();
    const { isAdminLoggedIn, isAdminLoading } = useAdminValidation();
    const menuItems = menuList;

    return (
        <>
            {isAdminLoading && (
                <LoadingComponent/>
            )}

            {isAdminLoggedIn && (
                <div className="flex items-center justify-center min-h-screen bg-[#007395] dark:bg-[#171717]">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-white text-center">
                            PIOPOS Dashboard Admin
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {menuItems.map(item => (
                                <Link href={item.href} key={item.id}>
                                    <div
                                        key={item.id}
                                        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg text-white ${item.bg} ${item.activeBg}`}>
                                        {item.icon}
                                        <h2 className="mt-4 text-lg font-semibold">
                                            {item.label}
                                        </h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
