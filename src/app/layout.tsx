import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import MobileNav from '@/components/mobile-nav';

export const metadata: Metadata = {
  title: 'AuraSense',
  description: 'An elegant perfume discovery app by House of Aura.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen')}>
        <Header />
        <main className="flex-grow pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <Toaster />
      </body>
    </html>
  );
}
