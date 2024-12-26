import Image from 'next/image';
import { Container } from '@/components/Container';
import heroImg from '../../../../../../public/img/hero.png';
import { MotionDiv } from '@/components/MotionDiv';

export const Hero = () => {
    return (
        <>
            <Container className="flex flex-wrap ">
                <div className="flex items-center w-full lg:w-1/2">
                    <div className="max-w-2xl mb-8">
                        <MotionDiv from="left">
                            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                                Kelola Bisnis Lebih Mudah dengan Sistem{' '}
                                <span className="text-[#007395]">
                                    POS Terpercaya!
                                </span>
                            </h1>
                        </MotionDiv>

                        <MotionDiv
                            from="left"
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                                Optimalkan bisnis Anda dengan solusi POS
                                berbasis cloud yang cocok untuk usaha kecil,
                                menengah, dan besar.
                            </p>
                        </MotionDiv>

                        <MotionDiv
                            from="bottom"
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                                <a
                                    href="sign-up"
                                    target="_blank"
                                    rel="noopener"
                                    className="px-8 py-4 text-lg font-medium text-center text-white bg-[#007395] hover:bg-white hover:text-[#007395] border border-[#007395] rounded-md transition-all duration-150 active:bg-[#007395] active:text-white">
                                    Coba dulu yuk, gratis kok!
                                </a>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full lg:w-1/2">
                    <MotionDiv from="top" transition={{ duration: 0.8, delay: 0.4 }}>
                        <div>
                            <Image
                                src={heroImg}
                                width="616"
                                height="617"
                                className={'object-cover'}
                                alt="Hero Illustration"
                                loading="eager"
                                placeholder="blur"
                            />
                        </div>
                    </MotionDiv>
                </div>
            </Container>

            <Container>
                <MotionDiv from="top" transition={{ duration: 0.8, delay: 0.4 }}>
                    <div className="flex flex-col justify-center">
                        <div className="text-xl text-center text-gray-700 dark:text-white">
                            Digunakan lebih dari{' '}
                            <span className="text-[#007395]">0+</span> Merchants
                            di seluruh Indonesia
                        </div>
                    </div>
                </MotionDiv>
            </Container>
        </>
    );
};
