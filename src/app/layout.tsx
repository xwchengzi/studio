import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '高考志愿助手', // Updated app name
  description: '智能推荐高考志愿', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN"> {/* Changed lang to Chinese */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`} // Added font-sans
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
