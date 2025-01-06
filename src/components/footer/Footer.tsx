'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Container } from '@/components/Container';
import { Facebook, Instagram, Linkedin, WhatsApp } from './svg/svg';
import { MotionDiv } from '../MotionDiv';

export const Footer = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
        setIsAdminLoggedIn(isLoggedIn);
    }, []);

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/',
            icon: <Instagram />,
        },
        { name: 'Linkedin', href: 'https://linkedin.com/', icon: <Linkedin /> },
        {
            name: 'Facebook',
            href: 'https://facebook.com/',
            icon: <Facebook />,
        },
    ];

    const legal = [
        { name: 'Syarat & Ketentuan', href: '/terms' },
        { name: 'Kebijakan Privasi', href: '/privacy' },
    ];

    return (
        <>
            {!isAdminLoggedIn && (
                <div className="relative">
                    <Container>
                        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <MotionDiv from="left">
                                    <div>
                                        {' '}
                                        <Link
                                            href="/"
                                            className="flex items-center space-x-2 text-2xl font-medium text-[#007395] dark:text-gray-100">
                                            <Image
                                                src="/img/logo.svg"
                                                alt="N"
                                                width="32"
                                                height="32"
                                                className="w-8"
                                            />
                                            <span className="font-bold">
                                                PIOPOS
                                            </span>
                                        </Link>
                                    </div>

                                    <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
                                        Kelola Bisnis Lebih Mudah dengan Sistem
                                        POS Terpercaya!
                                    </div>

                                    <div>
                                        <p className=" mt-4 h-px border border-black w-16 dark:border-white"></p>
                                    </div>

                                    <div className="mt-5">
                                        <a
                                            href="https://wa.me/yourwhatsappnumber"
                                            target="_blank"
                                            rel="noopener"
                                            className="flex items-center px-4 py-2 w-6/12 border border-[#007395] text-[#007395] rounded-md hover:border-[#007395] hover:text-[#007395] active:bg-[#007395] active:text-white transition-all">
                                            <WhatsApp />
                                            <span className="ml-4">
                                                Hubungi Kami
                                            </span>
                                        </a>
                                    </div>
                                </MotionDiv>
                            </div>

                            <div>
                                <MotionDiv
                                    from="left"
                                    transition={{ duration: 0.8, delay: 0.2 }}>
                                    <div className="mb-4 lg:px-4 text-lg font-bold text-gray-700 dark:text-gray-300">
                                        Alamat Kantor
                                    </div>
                                    <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                                        <p className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 focus:text-[#007395] focus:bg-[#007395] focus:outline-none dark:focus:bg-trueGray-700">
                                            Jl. Flamboyan Barat No. 101,
                                            Kelurahan Harapan Indah, Kec.
                                            Setiabudi, Jakarta Selatan, DKI
                                            Jakarta 12930
                                        </p>
                                    </div>
                                </MotionDiv>
                            </div>

                            <div>
                                <MotionDiv
                                    from="left"
                                    transition={{ duration: 0.8, delay: 0.2 }}>
                                    <div className="mb-4 lg:px-4 text-lg font-bold text-gray-700 dark:text-gray-300">
                                        Legalitas
                                    </div>
                                    <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
                                        {legal.map((item, index) => (
                                            <Link
                                                prefetch={true}
                                                key={index}
                                                href={item.href}
                                                className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-[#007395] focus:text-[#007395] focus:bg-gray-100 focus:outline-none dark:focus:bg-trueGray-700">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </MotionDiv>
                            </div>

                            <div className="">
                                <MotionDiv
                                    from="left"
                                    transition={{ duration: 0.8, delay: 0.2 }}>
                                    <div className="mb-4 text-lg font-bold text-gray-700 dark:text-gray-300">
                                        Media Sosial
                                    </div>
                                    <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener">
                                                <span className="sr-only">
                                                    {social.name}
                                                </span>
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </MotionDiv>
                            </div>
                        </div>

                        <MotionDiv
                            from="bottom"
                            transition={{ duration: 0.8, delay: 0.2 }}>
                            <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
                                Copyright © 2024 - {new Date().getFullYear()}.{' '}
                                <a href="/" rel="noopener">
                                    PIOPOS
                                </a>{' '}
                                All rights reserved
                            </div>
                        </MotionDiv>
                    </Container>
                </div>
            )}
        </>
    );
};
