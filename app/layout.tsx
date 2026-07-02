import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import CalProvider from '@/components/ui/CalProvider';
import CookieBanner from '@/components/ui/CookieBanner';

const GA_ID = 'G-MRHEFY2DQX';

// ── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Autonex AI — Automate Today. Lead Tomorrow.',
    template: '%s | Autonex AI',
  },
  description:
    'We build high-performance websites and AI automation systems that eliminate manual work and help your business scale faster. Based in Hyderabad, India.',
  keywords: [
    'AI automation', 'web development', 'AI agents', 'lead generation',
    'CRM automation', 'business automation', 'Hyderabad', 'India',
    'AI solutions', 'custom CRM', 'AI voice agents',
  ],
  authors: [{ name: 'Autonex AI Technologies', url: 'https://www.autonexai.org' }],
  creator: 'Autonex AI Technologies',
  publisher: 'Autonex AI Technologies',
  metadataBase: new URL('https://www.autonexai.org'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.autonexai.org',
    siteName: 'Autonex AI',
    title: 'Autonex AI — Automate Today. Lead Tomorrow.',
    description: 'High-performance AI automation & web development for ambitious businesses.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Autonex AI — Automate Today. Lead Tomorrow.',
      },
      {
        url: '/images/logo-black.png',
        width: 800,
        height: 800,
        alt: 'Autonex AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@autonexai',
    creator: '@autonexai',
    title: 'Autonex AI — Automate Today. Lead Tomorrow.',
    description: 'High-performance AI automation & web development.',
    images: ['/opengraph-image', '/images/logo-black.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.png?v=3', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/apple-touch-icon.png?v=3',
  },
  verification: {
    google: 'your-google-search-console-verification-code',
  },
};

// ── Viewport (mobile-first — iOS & Android) ───────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,     // allow user zoom (accessibility)
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05050a' },
    { media: '(prefers-color-scheme: light)', color: '#F0EEEA' },
  ],
  colorScheme: 'dark light',
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* iOS web-app meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Autonex AI" />
        {/* Android Chrome */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Format detection — prevent iOS auto-linking numbers/emails */}
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
      </head>
      <body>
        <CalProvider />
        <CookieBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
        {/* ── Google Analytics 4 ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
