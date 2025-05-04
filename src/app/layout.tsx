import type { Metadata } from 'next';
// Import Geist fonts from the correct package
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Correct variable names and instantiation remain the same
const geistSans = GeistSans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
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
    <html lang="zh-CN" className="h-full">
      <body
        // Use the variables from the imported Geist fonts
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Removed potentially problematic whitespace/comment */}
        <div className="flex-grow">{children}</div>
        <Toaster />
        {/* Removed potentially problematic whitespace/comment */}
        <footer className="py-4 text-center text-sm text-muted-foreground mt-auto">版权所有：跃阶升学™</footer>
      </body>
    </html>
  );
}
