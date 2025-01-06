'use client';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Features } from '@/app/(root)/(home)/components/features/Features';
// import { Video } from '@/components/Video';
// import { Testimonials } from '@/app/(root)/(home)/components/testimonials/Testimonials';
import { Faq } from '@/app/(root)/(home)/components/faq/Faq';
import { Cta } from '@/app/(root)/(home)/components/cta/Cta';

import {
    featureOne,
    featureTwo,
} from '@/app/(root)/(home)/components/features/data';
import { Hero } from './components/hero/Hero';
import { MotionDiv } from '@/components/MotionDiv';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isLoggedIn) {
            setIsAdminLoggedIn(true);
            router.push('/addash'); 
        }
    }, [router]);

    return (
        <>
            {!isAdminLoggedIn && (
                <Container>
                    <Hero />

                    <MotionDiv from="bottom">
                        <SectionTitle
                            preTitle="Keunggulan PIOPOS"
                            title="Kenapa harus menggunakan PIOPOS?">
                            PIOPOS adalah solusi Point of Sales modern yang
                            dirancang untuk mempermudah manajemen bisnis Anda
                            dan membantu Anda meningkatkan produktivitas dan
                            efisiensi bisnis.
                        </SectionTitle>
                    </MotionDiv>

                    <Features data={featureOne} />
                    <Features imgPos="right" data={featureTwo} />

                    {/* <SectionTitle
                preTitle="Watch a video"
                title="Learn how to fullfil your needs">
                This section is to highlight a promo or demo video of your
                product. Analysts says a landing page with video has 3% more
                conversion rate. So, don&apos;t forget to add one. Just like
                this.
            </SectionTitle> */}

                    {/* <Video videoId="fZ0D0cnR88E" /> */}

                    {/* NOTE: Activate this section if we have testimonials */}
                    {/* <SectionTitle
                preTitle="Testimoni"
                title="Apa yang customer kami katakan">
                Testimoni adalah cara terbaik untuk membangun kepercayaan dan
                meningkatkan reputasi brand. Berikut adalah pengalaman dari
                pelanggan kami yang puas menggunakan PIOPOS.
            </SectionTitle>

            <Testimonials /> */}

                    <MotionDiv from="bottom">
                        <SectionTitle
                            preTitle="FAQ"
                            title="Frequently Asked Questions"
                            id="faq">
                            Answer your customers possible questions here, it
                            will increase the conversion rate as well as support
                            or chat requests.
                        </SectionTitle>
                    </MotionDiv>

                    <Faq />

                    <Cta />
                </Container>
            )}
        </>
    );
}
