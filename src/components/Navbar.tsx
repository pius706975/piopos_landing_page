'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeChanger from './DarkSwitch';
import Image from 'next/image';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { WhatsApp } from './footer/svg/svg';

export const Navbar = () => {
    const [hasScrolled, setHasScrolled] = useState<boolean>(false);
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Fitur', href: '/feature' },
        { name: 'Harga', href: '/pricing' },
        { name: 'Tentang Kami', href: '/about-us' },
        { name: 'Blog', href: '/blog' },
    ];

    const navigation2 = [
        { name: 'Syarat & Ketentuan', href: '/terms' },
        { name: 'Kebijakan Privasi', href: '/privacy' },
    ];

    return (
        <div
            className={`w-full sticky top-0 z-50 bg-white ${
                hasScrolled ? 'dark:bg-gray-900' : 'dark:bg-[#171717]'
            }  transition-all duration-300 ${hasScrolled ? 'shadow-md' : ''}`}>
            <nav className="container relative flex flex-wrap items-center justify-between p-4 mx-auto lg:justify-between xl:px-1">
                {/* Logo  */}
                <Link href="/">
                    <span className="flex items-center space-x-2 text-2xl font-medium text-[#007395] dark:text-gray-100">
                        <span>
                            <Image
                                src="/img/logo.svg"
                                width="32"
                                alt="N"
                                height="32"
                                className="w-8"
                            />
                        </span>
                        <span className="font-bold">PIOPOS</span>
                    </span>
                </Link>

                {/* menu  */}
                <div className="hidden text-center lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
                        {navigation.map((menu, index) => (
                            <li className="mr-3 nav__item" key={index}>
                                <Link
                                    href={menu.href}
                                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-[#007395] hover:dark:text-[#007395] focus:text-[#007395] focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800 transition-all">
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* get started  */}
                <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
                    <ThemeChanger />
                    <div className="hidden mr-3 lg:flex nav__item">
                        <Link
                            href="/sign-in"
                            target="_blank"
                            className="px-6 py-2 text-white bg-[#007395] border border-[#007395] rounded-md md:ml-5 hover:bg-white hover:text-[#007395] transition-all active:bg-[#007395] active:text-white">
                            Masuk
                        </Link>
                    </div>
                </div>

                <Disclosure>
                    {({ open }) => (
                        <>
                            <DisclosureButton
                                aria-label="Toggle Menu"
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-[#007395] focus:text-[#007395] focus:bg-[#007395] focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                                <svg
                                    className="w-6 h-6 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    {isSidebarOpen ? (
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                        />
                                    ) : (
                                        <path
                                            fillRule="evenodd"
                                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                                        />
                                    )}
                                </svg>
                            </DisclosureButton>

                            {isSidebarOpen && (
                                <div
                                    onClick={() => setSidebarOpen(false)}
                                    className="fixed inset-0 z-30 bg-black opacity-50"></div>
                            )}

                            <div
                                className={`fixed inset-0 z-40 bg-white dark:bg-gray-900 transform ${
                                    isSidebarOpen
                                        ? 'translate-x-0'
                                        : '-translate-x-full'
                                } transition-transform duration-300 ease-in-out`}>
                                <div className="flex justify-end p-4">
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="text-gray-500 dark:text-gray-300">
                                        <svg
                                            className="w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="flex flex-col items-center space-y-4">
                                    {navigation.map((item, index) => (
                                        <Link
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                            key={index}
                                            href={item.href}
                                            className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#007395] transition">
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link
                                        onClick={() => setSidebarOpen(false)}
                                        href="/sign-in"
                                        className="px-6 py-2 mt-3 text-center text-white bg-[#007395] border border-[#007395] rounded-md">
                                        Masuk
                                    </Link>

                                    <div>
                                        <p className=" mt-4 mb-4 h-px border border-gray-200 w-screen dark:border-gray-700"></p>
                                    </div>

                                    <Link
                                        onClick={() => setSidebarOpen(false)}
                                        href="#faq"
                                        className="flex px-6 py-2 mt-3 text-center text-[#007395] border border-[#007395] rounded-md active:bg-[#007395] active:text-white transition-all">
                                        FAQ
                                    </Link>

                                    <Link
                                        onClick={() => setSidebarOpen(false)}
                                        target="_blank"
                                        href="https://wa.me/yourwhatsappnumber"
                                        className="flex px-6 py-2 mt-3 text-center text-[#007395] border border-[#007395] rounded-md active:bg-[#007395] active:text-white transition-all">
                                        <WhatsApp />{' '}
                                        <span className="ml-4">
                                            Hubungi Kami
                                        </span>
                                    </Link>

                                    <div>
                                        <p className=" mt-4 mb-4 h-px border border-gray-200 w-screen dark:border-gray-700"></p>
                                    </div>

                                    {navigation2.map((item, index) => (
                                        <Link
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                            key={index}
                                            href={item.href}
                                            className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#007395] transition">
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="bottom my-10 text-sm text-center text-gray-600 dark:text-gray-400">
                                        Copyright © 2024 -{' '}
                                        {new Date().getFullYear()}.{' '}
                                        <a href="/" rel="noopener">
                                            PIOPOS
                                        </a>{' '}
                                        All rights reserved
                                    </div>
                            </div>
                        </>
                    )}
                </Disclosure>
            </nav>
        </div>
    );
};
