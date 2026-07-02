import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import VideoShowcase from '@/components/sections/VideoShowcase';
import AboutSection from '@/components/sections/AboutSection';
import ManifestoSection from '@/components/sections/ManifestoSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CounterSection from '@/components/sections/CounterSection';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'Autonex AI — AI-Powered Systems for Growing Businesses',
  description:
    'Autonex AI builds high-performance websites, AI agents, lead generation systems, and automation workflows that eliminate manual work and help your business operate at full capacity.',
  openGraph: {
    title: 'Autonex AI — AI-Powered Systems for Growing Businesses',
    description:
      'Autonex AI builds high-performance websites, AI agents, lead generation systems, and automation workflows that eliminate manual work and help your business operate at full capacity.',
    url: 'https://www.autonexai.org',
    type: 'website',
    images: [
      {
        url: '/opengraph-image?v=3',
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
    title: 'Autonex AI — AI-Powered Systems for Growing Businesses',
    description:
      'Autonex AI builds high-performance websites, AI agents, lead generation systems, and automation workflows that eliminate manual work and help your business operate at full capacity.',
    images: ['/opengraph-image?v=3', '/images/logo-black.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoShowcase />
      <AboutSection />
      <ManifestoSection />
      <ServicesSection />
      <ProcessSection />
      <CounterSection />
      <FAQSection />
    </>
  );
}
