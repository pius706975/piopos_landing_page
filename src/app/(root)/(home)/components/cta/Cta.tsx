import React from 'react';
import { Container } from '@/components/Container';
import { MotionDiv } from '@/components/MotionDiv';

export const Cta = () => {
    return (
        <Container>
            <MotionDiv from="bottom">
                <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-[#007395] px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
                    <div className="flex-grow text-center lg:text-left">
                        <h2 className="text-2xl font-medium lg:text-3xl">
                            Siap tingkatkan bisnis kamu dengan PIOPOS?
                        </h2>
                        <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
                            Daftar sekarang dan nikmati 28 hari gratis untuk
                            menjalankan operasional bisnis lebih mudah!
                        </p>
                    </div>
                    <div className="flex-shrink-0 w-full text-center lg:w-auto">
                        <a
                            href="/sign-up"
                            target="_blank"
                            rel="noopener"
                            className="inline-block py-3 mx-auto text-lg font-medium border border-[#007395] text-center text-[#007395] bg-white rounded-md px-7 lg:px-10 lg:py-5 hover:bg-[#007395] hover:text-white hover:border-white transition-all duration-150">
                            Coba Gratis Sekarang
                        </a>
                    </div>
                </div>
            </MotionDiv>
        </Container>
    );
};
