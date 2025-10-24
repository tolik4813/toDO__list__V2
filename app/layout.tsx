import type { Metadata } from 'next';
import { Bitcount_Grid_Single } from 'next/font/google';
import './globals.css';
import MainHeader from '@/app/customComponents/MainHeader';

const bitcountGridSingle = Bitcount_Grid_Single({
  variable: '--font-bitcount-grid-single',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'TO-DO',
  description: 'TO-DO list app',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bitcountGridSingle.variable} antialiased bg-black`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
