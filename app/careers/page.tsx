import type { Metadata } from 'next';
import { getActiveJobs, getDepartments } from '@/lib/careers';
import CareersClient from './CareersClient';
import styles from './careers.module.css';

export const metadata: Metadata = {
  title: 'Careers — Join Autonex AI | Build the Future of Automation',
  description:
    'Join the Autonex AI team. We\'re looking for builders who move fast, think differently, and want to work on AI systems that genuinely change how businesses operate.',
  openGraph: {
    title: 'Careers — Join Autonex AI | Build the Future of Automation',
    description:
      'Join the Autonex AI team. We\'re looking for builders who move fast, think differently, and want to work on AI systems that genuinely change how businesses operate.',
    url: 'https://www.autonexai.org/careers',
    type: 'website',
    images: [
      {
        url: '/images/tag-preview-card.jpeg',
        width: 1200,
        height: 630,
        alt: 'Careers at Autonex AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers — Join Autonex AI | Build the Future of Automation',
    description:
      'Join the Autonex AI team. We\'re looking for builders who move fast, think differently, and want to work on AI systems that genuinely change how businesses operate.',
    images: ['/images/tag-preview-card.jpeg'],
  },
};

export default function CareersPage() {
  const jobs = getActiveJobs();
  const departments = getDepartments();

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBgImage} />
        <div className={styles.heroBgOverlay} />
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroLabel}>[Careers] — Join the Team</p>
            <h1 className={`${styles.heroHeading} display`}>
              Build With<br />
              <span className={styles.heroGhost}>Autonex.</span>
            </h1>
            <p className={styles.heroSub}>
              We&apos;re a small team of builders obsessed with AI automation and high-performance software.
              We move fast, ship often, and work on problems that actually matter.
              If that sounds like your kind of environment — let&apos;s talk.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={`${styles.heroStatNum} display`}>{jobs.length}</span>
                <span className={styles.heroStatLabel}>Open Roles</span>
              </div>
              <div className={styles.heroStat}>
                <span className={`${styles.heroStatNum} display`}>100%</span>
                <span className={styles.heroStatLabel}>Remote Friendly</span>
              </div>
              <div className={styles.heroStat}>
                <span className={`${styles.heroStatNum} display`}>Fast</span>
                <span className={styles.heroStatLabel}>Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive content ── */}
      <CareersClient jobs={jobs} departments={departments} />
    </div>
  );
}
