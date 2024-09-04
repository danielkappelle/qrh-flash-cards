import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QRH Flash Cards',
  description: 'App for training QRH using flash cards',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-400`}>
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
