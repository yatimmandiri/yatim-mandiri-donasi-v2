import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';

import { AuthProvider } from '@/hooks/useAuth';
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport = {
  themeColor: 'light',
};

export const metadata = {
  title: {
    template: '%s - Platform Donasi Online',
    default: 'Yatim Mandiri Donasi - Platform Donasi Online',
  },
  description: 'Yatim Mandiri Donasi - Platform Donasi Online',
  keywords: ['Zakat', 'Infak', 'Yatim', 'Dhuafa'],
  authors: [{ name: 'Yatim Mandiri', url: 'https://yatimmandiri.org' }],
  icons: {
    icon: '/assets/images/favicon.svg',
    shortcut: '/assets/images/favicon.svg',
    apple: '/assets/images/favicon.svg',
    other: {
      rel: 'logo_color',
      url: '/assets/images/favicon.svg',
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.className}>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID} />
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID2} />
      <body>
        <Suspense fallback={<></>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
