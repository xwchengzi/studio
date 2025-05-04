import type { Metadata } from 'next';
// Removed Geist font import: import { Geist } from 'geist/font/sans';
// Removed GeistMono import as well
import './globals.css';
import { Toaster } from '@/components/ui/toaster';


// Removed GeistSans instantiation as it's not used and caused errors
// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });


export const metadata: Metadata = {
  title: '2025年高考志愿（浙江专版）', // Updated app title
  description: '智能推荐高考志愿', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body
        // Removed Geist font variables from className and use system font stack from globals.css
        className={`antialiased flex flex-col min-h-screen`}
      >
        {/* Removed potentially problematic whitespace/comment */}
        <div className="flex-grow">{children}</div>
        <Toaster />
        <footer className="py-4 text-center text-sm text-muted-foreground mt-auto">
          版权所有：跃阶升学™
        </footer>
      </body>
    </html>
  );
}
