import { Inter } from 'next/font/google';
import './globals.css';
import PageHeader from '@/components/page-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | alerTree',
    default: 'alerTree',
  },
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <PageHeader />
        {children}
      </body>
    </html>
  );
}
