import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/footer/Footer';
import ClientProvider from './components/ClientProvide';
// import { PopupWidget } from '@/components/PopupWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PIOPOS',
    description: 'PIOPOS Landing Page',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class">
                    <ClientProvider>
                        <Navbar />
                        <div>{children}</div>
                        <Footer />
                        {/* <PopupWidget /> */}
                    </ClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
