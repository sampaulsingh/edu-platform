import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EduPro',
  description: 'Production-ready educational platform starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ maxWidth: 1120, margin: '0 auto', padding: '24px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
