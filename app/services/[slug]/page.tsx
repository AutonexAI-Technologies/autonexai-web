import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getServiceBySlug, getAllServiceSlugs, SERVICES } from '@/lib/services';
import styles from './service-detail.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} — Autonex AI`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} — Autonex AI`,
      description: service.shortDesc,
      url: `https://www.autonexai.org/services/${slug}`,
      type: 'website',
      images: [
        {
          url: service.image || '/opengraph-image',
          width: 1200,
          height: 630,
          alt: service.title,
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
      title: `${service.title} — Autonex AI`,
      description: service.shortDesc,
      images: [service.image || '/opengraph-image', '/images/logo-black.png'],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const currentIdx = SERVICES.findIndex(s => s.slug === slug);
  const nextService = SERVICES[(currentIdx + 1) % SERVICES.length];

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={service.image} alt="" className={styles.heroBgImg} />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`${styles.heroContent} container`}>
          <Link href="/services" className={styles.back}>← All Services</Link>
          <p className={styles.heroLabel}>
            <span className={styles.heroNum}>{service.num}</span>
            {service.icon} {service.title}
          </p>
          <h1 className={`${styles.heroHeading} display`}>
            {service.tagline.split('.')[0]}.<br />
            <span className={styles.heroGhost}>Built for You.</span>
          </h1>
        </div>
      </div>

      {/* ── Overview ── */}
      <section className={styles.overview}>
        <div className={`${styles.overviewInner} container`}>
          <ScrollReveal>
            <p className="section-label">[01] — Overview</p>
          </ScrollReveal>
          <div className={styles.overviewGrid}>
            <ScrollReveal delay={0.1}>
              <div className={styles.overviewBody}>
                {service.fullDesc.split('\n\n').map((para, i) => (
                  <p key={i} className={styles.overviewPara}>{para}</p>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15} direction="right">
              <div className={styles.includesBox}>
                <p className={styles.includesTitle}>What&apos;s Included</p>
                <ul className={styles.includesList}>
                  {service.includes.map(item => (
                    <li key={item} className={styles.includesItem}>
                      <span className={styles.includesCheck}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary">
                  Get Started →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className={styles.process}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[02] — How It Works</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.processHeading} display`}>
              From Brief<br />
              <span className={styles.processGhost}>To Fully Launched.</span>
            </h2>
          </ScrollReveal>
          <div className={styles.processSteps}>
            {service.process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.08}>
                <div className={styles.processStep}>
                  <div className={styles.processLeft}>
                    <span className={styles.processNum}>{String(i + 1).padStart(2, '0')}</span>
                    {i < service.process.length - 1 && <div className={styles.processLine} />}
                  </div>
                  <div className={styles.processRight}>
                    <h3 className={`${styles.processTitle} display`}>{step.step}</h3>
                    <p className={styles.processDesc}>{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className={styles.whoFor}>
        <div className={`${styles.whoForInner} container`}>
          <div className={styles.whoForLeft}>
            <ScrollReveal>
              <p className="section-label">[03] — Who This Is For</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`${styles.whoForHeading} display`}>
                Is This<br />
                <span className={styles.whoForGhost}>Right for You?</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className={styles.whoForRight}>
            {service.whoFor.map((point, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={styles.whoForItem}>
                  <span className={styles.whoForArrow}>→</span>
                  <p>{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className={styles.outcomes}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[04] — What to Expect</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.outcomesHeading} display`}>
              Real Results.<br />
              <span className={styles.outcomesGhost}>Measurable Impact.</span>
            </h2>
          </ScrollReveal>
          <div className={styles.outcomesGrid}>
            {service.outcomes.map((outcome, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={styles.outcomeCard}>
                  <span className={styles.outcomeNum}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={styles.outcomeText}>{outcome}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <ScrollReveal>
            <h2 className={`${styles.ctaHeading} display`}>
              Ready to Build<br />
              <span className={styles.ctaGhost}>Your {service.title} System?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.ctaSub}>
              Book a free 30-minute strategy call. We&apos;ll scope exactly what you need and give you a clear plan — no commitment required.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className={styles.ctaActions}>
              <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary light">
                Book a Free Strategy Call →
              </a>
              <Link href={`/services/${nextService.slug}`} className={styles.ctaNext}>
                Next: {nextService.title} ↗
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
