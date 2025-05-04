import type { Metadata } from 'next';
<<<<<<< HEAD
import { Geist } from 'next/font/google'; // Removed GeistMono import
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Correct import for Geist Sans font
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Removed GeistMono instantiation
=======
// Removed Geist font imports due to errors
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

<<<<<<< HEAD
// Removed Geist font instantiation as it was causing errors
// const geistSans = GeistSans({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = GeistMono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });
=======
// Assign the imported font objects directly. They are not functions to be called.
const geistSans = GeistSans;
const geistMono = GeistMono;

>>>>>>> a2b05902bd0618fbd8887045c9032c741af3c592
>>>>>>> 47975480e66547ef69e0b81d45ce101e1603a09b

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
    <html lang="zh-CN" className="h-full">
<<<<<<< HEAD
      <body
<<<<<<< HEAD
        className={`${geistSans.variable} antialiased font-sans flex flex-col min-h-screen`} // Removed geistMono.variable, font-sans defined in globals.css now includes system fonts
=======
        // Removed Geist font variables from className and use system font stack from globals.css
        className={`antialiased flex flex-col min-h-screen`}
>>>>>>> 47975480e66547ef69e0b81d45ce101e1603a09b
      >
        {/* Removed potentially problematic whitespace/comment */}
        <div className="flex-grow">{children}</div>
=======
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
>>>>>>> a2b05902bd0618fbd8887045c9032c741af3c592
        <Toaster />
        <footer className="py-4 text-center text-sm text-muted-foreground mt-auto">
          版权所有：跃阶升学™
        </footer>
      </body>
    </html>
  );
