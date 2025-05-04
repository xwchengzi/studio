import type { Metadata } from 'next';
// Import Geist fonts from the correct package
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Assign the imported font objects directly. They are not functions to be called.
const geistSans = GeistSans;
const geistMono = GeistMono;


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
    <html lang="zh-CN" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* Fixed header */}
        <header className="fixed top-0 left-0 w-full bg-background z-50 border-b border-border py-4 text-center text-lg font-bold">
          2025高考志愿填报（浙江专版）
        </header>
        {/* Main content container with top padding to accommodate the header */}
        <main className="flex-grow pt-16">
          <div className="px-4">
            {children}
          </div>
        </main>
        <Toaster />
        <footer className="py-4 text-center text-sm text-muted-foreground mt-auto">
          版权所有：跃阶升学™
        </footer>
      </body>
    </html>
  );
