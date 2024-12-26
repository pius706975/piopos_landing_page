import Image from 'next/image';
import React from 'react';
import { Container } from '@/components/Container';
import { MotionDiv } from '@/components/MotionDiv';

interface FeaturesProps {
    imgPos?: 'left' | 'right';
    data: {
        imgPos?: 'left' | 'right';
        title: string;
        desc: string;
        image: any;
        bullets: {
            title: string;
            desc: string;
            icon: React.ReactNode;
        }[];
    };
}
export const Features = (props: Readonly<FeaturesProps>) => {
    const { data } = props;
    return (
        <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
            <div
                className={`flex items-center justify-center w-full lg:w-1/2 ${
                    props.imgPos === 'right' ? 'lg:order-1' : ''
                }`}>
                <MotionDiv
                    from="bottom"
                    transition={{ duration: 0.8, delay: 0.4 }}>
                    <div>
                        <Image
                            src={data.image}
                            width={521}
                            height={521}
                            alt="Features"
                            className={'object-cover'}
                            placeholder="blur"
                            blurDataURL={data.image.src}
                        />
                    </div>
                </MotionDiv>
            </div>

            <div
                className={`flex flex-wrap items-center w-full lg:w-1/2 ${
                    data.imgPos === 'right' ? 'lg:justify-end' : ''
                }`}>
                <div>
                    <div className="flex flex-col w-full mt-4">
                        <MotionDiv
                            from="bottom"
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                                {data.title}
                            </h3>
                        </MotionDiv>

                        <MotionDiv
                            from="bottom"
                            transition={{ duration: 0.8, delay: 0.4 }}>
                            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                                {data.desc}
                            </p>
                        </MotionDiv>
                    </div>

                    <div className="w-full mt-5">
                        {data.bullets.map((item, index) => (
                            <>
                                <MotionDiv
                                    from="bottom"
                                    transition={{ duration: 0.8, delay: 0.6 }}>
                                    <Feature
                                        key={index}
                                        title={item.title}
                                        icon={item.icon}>
                                        {item.desc}
                                    </Feature>
                                </MotionDiv>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

function Feature(props: any, classname: string) {
    return (
        <div className="flex items-start mt-8 space-x-3 hover:bg-gray-100 hover:rounded-xl hover:dark:bg-gray-800 p-3 hover:animate-pulse">
            <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-[#007395] rounded-md w-11 h-11 ">
                {React.cloneElement(props.icon, {
                    className: 'w-7 h-7 text-indigo-50',
                })}
            </div>
            <div>
                <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    {props.title}
                </h4>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    {props.children}
                </p>
            </div>
        </div>
    );
}
