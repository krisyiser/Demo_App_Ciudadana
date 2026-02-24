import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import AuthGuard from '@/components/AuthGuard';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Atención Ciudadana',
  description: 'Plataforma de servicios municipales: reporta fallas, agenda citas y mantente informado desde tu celular.',
  applicationName: 'Atención Ciudadana',
  authors: [{ name: 'Gobierno Municipal' }],
  generator: 'Next.js',
  keywords: ['gobierno', 'ciudadano', 'reportes', 'citas', 'servicios', 'municipio'],
  referrer: 'origin-when-cross-origin',
  creator: 'Gobierno Municipal',
  publisher: 'Gobierno Municipal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    title: 'Atención Ciudadana',
    description: 'Plataforma de servicios municipales: reporta fallas, agenda citas y mantente informado.',
    siteName: 'Atención Ciudadana',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atención Ciudadana',
    description: 'Plataforma de servicios municipales',
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Atención Ciudadana',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#1E3A5F',
    'theme-color': '#1E3A5F',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E3A5F' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <AuthGuard>
          <OfflineBanner />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <BottomNav />
        </AuthGuard>
      </body>
    </html>
  );
}
