import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Removed GeistMono import
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Correct import for Geist Sans font
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Removed GeistMono instantiation

export const metadata: Metadata = {
  title: '2025高考志愿（浙江专版）', // Updated app title
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
        className={`${geistSans.variable} antialiased font-sans flex flex-col min-h-screen`} // Removed geistMono.variable, font-sans defined in globals.css now includes system fonts
      >
        <div className="flex-grow"> {/* Wrapper div to push footer down */}
            {children}
        </div>
        <Toaster />
        <footer className="py-4 text-center text-sm text-muted-foreground mt-auto"> {/* Footer section, updated copyright */}
          版权所有：跃阶升学™
        </footer>
      </body>
    </html>
  );
}
