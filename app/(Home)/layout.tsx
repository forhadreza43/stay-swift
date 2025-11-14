import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { connectDB } from '@/db/models';
import { Toaster } from '@/components/ui/sonner';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: {
      default: 'StaySwift',
      template: '%s | StaySwift',
   },
   description: 'Swift and seamless hotel booking experience',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   connectDB();
   return (
      <html lang="en" suppressHydrationWarning={true}>
         <body className={`${inter.className} antialiased`}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <Navbar sideMenu={true} />
               <main>{children}</main>
               <Toaster />
            </ThemeProvider>
         </body>
      </html>
   );
}
