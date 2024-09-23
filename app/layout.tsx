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
        <div className="w-full h-full flex justify-center items-center sm:p-4">
          <div className="w-full 	md:w-2/3 lg:w-1/2 xl:w-1/3 h-full max-h-full border-8 border-black bg-white p-4 relative">
            <div className="overflow-auto h-full max-h-full" id="scrollBox">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
