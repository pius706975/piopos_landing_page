'use client';
import React from 'react';
import { Container } from '@/components/Container';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import faqdata from './faqdata';
import { MotionDiv } from '@/components/MotionDiv';

export const Faq = () => {
    return (
        <Container className="!p-0">
            <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
                {faqdata.map(item => (
                    <div key={item.question} className="mb-5">
                        <MotionDiv from="bottom">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#007395] focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                                            <span>{item.question}</span>
                                            <ChevronUpIcon
                                                className={`${
                                                    open
                                                        ? 'rotate-180 transform'
                                                        : ''
                                                } w-5 h-5 text-[#007395] transition-transform duration-200`}
                                            />
                                        </DisclosureButton>
                                        <DisclosurePanel
                                            className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300"
                                            static>
                                            <div
                                                className={`transition-all duration-300 ${
                                                    open
                                                        ? 'opacity-100 max-h-screen'
                                                        : 'opacity-0 max-h-0'
                                                } overflow-hidden`}>
                                                {item.answer}
                                            </div>
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        </MotionDiv>
                    </div>
                ))}
            </div>
        </Container>
    );
};
