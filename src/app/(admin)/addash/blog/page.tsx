'use client';
import LoadingComponent from '@/components/Loading';
import useAdminValidation from '../hook/validateAdmin';
import ThemeChanger from '@/components/DarkSwitch';
import { useState } from 'react';
import { useAuth } from '@/service/api';
import CreateNewPost from './CreateNewPost';
import PostedContent from './Posted';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BlogDashboard = () => {
    useAuth();
    const { isAdminLoggedIn, isAdminLoading } = useAdminValidation();
    const [activeTab, setActiveTab] = useState<string>('Posts');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const menuTabs = [
        { key: 'Posts', label: 'Konten' },
        { key: 'CreateNewPost', label: 'Buat Konten Baru' },
    ];

    return (
        <>
            {isAdminLoading && <LoadingComponent />}

            {isAdminLoggedIn && (
                <div className="min-h-screen flex flex-col lg:flex-row">
                    {/* Sidebar */}
                    <aside
                        className={`bg-gradient-to-b from-[#007395] to-gray-600 dark:from-[#007395] dark:to-gray-800 w-64 h-screen text-white p-6 transform lg:translate-x-0 ${
                            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } fixed lg:sticky top-0 z-50 transition-transform`}>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <button
                                className="lg:hidden text-white text-2xl"
                                onClick={() => setSidebarOpen(false)}>
                                &times;
                            </button>
                        </div>
                        <ul className="space-y-6">
                            {menuTabs.map(menu => (
                                <li
                                    key={menu.key}
                                    className={`cursor-pointer ${
                                        activeTab === menu.key
                                            ? 'font-bold'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setActiveTab(menu.key);
                                        setSidebarOpen(false);
                                    }}>
                                    {menu.label}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 bg-gray-50 p-4 lg:p-8 dark:bg-black">
                        {activeTab === 'Posts' && (
                            <>
                                <div className="mb-6 flex items-center justify-between sticky top-0 bg-gray-50 dark:bg-black z-10 p-4">
                                    <div className="flex">
                                        <div>
                                            <button
                                                className="lg:hidden text-[#007395] dark:text-white text-xl mr-4"
                                                onClick={() =>
                                                    setSidebarOpen(!sidebarOpen)
                                                }>
                                                &#9776;
                                            </button>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                Konten
                                            </h2>
                                        </div>
                                    </div>
                                    <ThemeChanger />
                                </div>

                                <PostedContent API_URL={BASE_URL} />
                            </>
                        )}

                        {activeTab === 'CreateNewPost' && (
                            <>
                                <div className="mb-6 flex items-center justify-between sticky top-0 bg-gray-50 dark:bg-black z-10 p-4">
                                    <div className="flex">
                                        <div>
                                            <button
                                                className="lg:hidden text-[#007395] dark:text-white text-xl mr-4"
                                                onClick={() =>
                                                    setSidebarOpen(!sidebarOpen)
                                                }>
                                                &#9776;
                                            </button>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                Buat Konten Baru
                                            </h2>
                                        </div>
                                    </div>
                                    <ThemeChanger />
                                </div>

                                <CreateNewPost API_URL={BASE_URL} />
                            </>
                        )}
                    </main>
                </div>
            )}
        </>
    );
};

export default BlogDashboard;
