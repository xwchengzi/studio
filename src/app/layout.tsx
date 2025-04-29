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
  title: '2025高考志愿填报（浙江专版）', // Updated app title
  description: '智能推荐高考志愿', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ensure html takes full height and remove whitespace inside
    <html lang="zh-CN" className="h-full"><body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans flex flex-col min-h-screen`} // Added flex, flex-col, min-h-screen
      >
        <div className="flex-grow"> {/* Wrapper div to push footer down */}
            {children}
        </div>
        <Toaster />
        <footer className="py-4 text-center text-sm text-muted-foreground mt-auto"> {/* Footer section, updated copyright */}
          版权所有：跃阶（杭州）教育咨询有限公司
        </footer>
      </body></html>
  );
}
