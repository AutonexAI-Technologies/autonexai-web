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
