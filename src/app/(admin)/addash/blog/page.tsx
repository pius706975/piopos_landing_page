'use client';
import LoadingComponent from '@/components/loading';
import useAdminValidation from '../hook/validateAdmin';
import ThemeChanger from '@/components/DarkSwitch';
import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import { useState } from 'react';

const BlogDashboard = () => {
    const { isAdminLoggedIn, isLoading } = useAdminValidation();
    const [activeTab, setActiveTab] = useState<string>('Posts');

    const contents = [
        {
            title: 'The Power of Dream',
            date: '28 June 2021',
            createdBy: 'John Doe admin',
            editedBy: 'John Doe admin',
        },
        {
            title: 'Emotional Healing',
            date: '22 June 2021',
            createdBy: 'John Doe admin',
            editedBy: 'Jane Doe admin',
        },
        {
            title: 'Works vs School',
            date: '21 June 2021',
            createdBy: 'John Doe admin',
            editedBy: 'Joko admin',
        },
    ];

    const menuTabs = [
        { key: 'Posts', label: 'Posts' },
        { key: 'CreateNewPost', label: 'Create New Post' },
    ];

    return (
        <>
            {isLoading && <LoadingComponent />}

            {isAdminLoggedIn && (
                <div className="min-h-screen flex">
                    {/* Sidebar */}
                    <aside className="bg-gradient-to-b from-[#007395] to-gray-600 dark:from-black dark:to-gray-800 w-64 min-h-screen text-white p-6">
                        <h1 className="text-3xl  font-bold mb-8">
                            Dashboard Admin
                        </h1>
                        <ul className="space-y-6">
                            {menuTabs.map(menu => (
                                <li
                                    key={menu.key}
                                    className={`cursor-pointer ${
                                        activeTab === menu.key
                                            ? 'font-bold'
                                            : ''
                                    }`}
                                    onClick={() => setActiveTab(menu.key)}>
                                    {menu.label}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 bg-gray-50 p-8">
                        {activeTab === 'Posts' && (
                            <>
                                <div className="mb-6 flex">
                                    <h2 className="text-xl font-semibold mr-4">
                                        Posts
                                    </h2>
                                    <ThemeChanger />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {contents.map((content, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#007395] p-6 rounded-lg text-center shadow-md">
                                            <h3 className="text-2xl text-white font-semibold">
                                                {content.title}
                                            </h3>
                                            <p className="text-lg text-gray-400 font-bold">
                                                {content.date}
                                            </p>
                                            <div className="text-left">
                                                <p className="text-lg text-gray-400 font-bold">
                                                    Created by:{' '}
                                                    {content.createdBy}
                                                </p>
                                                <p className="text-lg text-gray-400 font-bold">
                                                    Edited by:{' '}
                                                    {content.editedBy}
                                                </p>
                                            </div>

                                            <div className="flex justify-between mt-4">
                                                <EditButton />
                                                <DeleteButton />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === 'CreateNewPost' && (
                            <>
                                <div className="mb-6 flex">
                                    <h2 className="text-xl font-semibold mr-4">
                                        Create New Post
                                    </h2>
                                    <ThemeChanger />
                                </div>
                                
                                <div>
                                    <form className="mt-4">
                                        <div className="mb-4">
                                            <label className="block text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                placeholder="Enter post title"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">
                                                Content
                                            </label>
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                placeholder="Enter post content"
                                                rows={5}></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            )}
        </>
    );
};

export default BlogDashboard;
