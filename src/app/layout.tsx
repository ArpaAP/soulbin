import type { Metadata, Viewport } from 'next';

import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'SoulBin',
  description: 'AI 기반 감정분석 채팅 서비스',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} flex min-h-screen items-start justify-center bg-[#ececef] antialiased`}
      >
        <main className="bg-background min-h-screen w-full max-w-[480px] shadow-xl">
          {children}
        </main>
      </body>
    </html>
  );
}
