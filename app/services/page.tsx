import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SERVICES } from '@/lib/services';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services — Autonex AI',
  description: 'Explore all 8 AI-powered services offered by Autonex AI — from high-performance web development to AI voice agents, lead generation, CRM automation, and more.',
  openGraph: {
    title: 'Services — Autonex AI',
    description: 'Explore all 8 AI-powered services offered by Autonex AI — from high-performance web development to AI voice agents, lead generation, CRM automation, and more.',
    url: 'https://www.autonexai.org/services',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Autonex AI Services',
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
    title: 'Services — Autonex AI',
    description: 'Explore all 8 AI-powered services offered by Autonex AI — from high-performance web development to AI voice agents, lead generation, CRM automation, and more.',
    images: ['/opengraph-image', '/images/logo-black.png'],
  },
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerBgImage} />
        <div className={styles.headerBgOverlay} />
        <div className="container">
          <div className={styles.headerInner}>
            <p className={styles.headerLabel}>[Services] — What We Build</p>
            <h1 className={`${styles.heading} display`}>
              8 Systems.<br />
              <span className={styles.ghost}>One Growth Partner.</span>
            </h1>
            <p className={styles.sub}>
              <strong>Each service is designed to solve a specific business bottleneck — and they all work together
              as part of a unified growth stack. Explore each one below.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className={styles.grid}>
        <div className="container">
          <div className={styles.cards}>
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.05}>
                <Link href={`/services/${service.slug}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} alt={service.title} className={styles.cardImg} />
                    <div className={styles.cardImageOverlay} />
                    <span className={styles.cardNum}>{service.num}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <div className={styles.cardIconRow}>
                        <span className={styles.cardIcon}>{service.icon}</span>
                        <span className={styles.cardArrow}>→</span>
                      </div>
                      <h2 className={`${styles.cardTitle} display`}>{service.title}</h2>
                      <p className={styles.cardTagline}>{service.tagline}</p>
                    </div>
                    <p className={styles.cardDesc}>{service.shortDesc}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardCta}>Explore Service →</span>
                      <div className={styles.cardIncludes}>
                        {service.includes.slice(0, 3).map(inc => (
                          <span key={inc} className={styles.cardIncludeTag}>{inc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <ScrollReveal>
            <h2 className={`${styles.ctaHeading} display`}>
              Not Sure<br />
              <span className={styles.ctaGhost}>Where to Start?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className={styles.ctaSub}>
              Most clients start with one service and expand once they see results. Book a free strategy call
              and we&apos;ll identify exactly where automation will make the biggest difference in your business.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary light">
              Book a Free Strategy Call →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
