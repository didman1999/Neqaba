import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'اللجنة الادارية النقابية للعاملين بالهيئة | C.C.B.A',
  description: 'نظام إدارة اشتراكات النقابة وخطوط الاتصالات للعاملين بالهيئة',
  keywords: ['نقابة', 'اتصالات', 'موظفين', 'إدارة', 'CCBA', 'هيئة'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
