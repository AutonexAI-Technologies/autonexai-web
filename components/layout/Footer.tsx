import Link from 'next/link';
import Marquee from '@/components/ui/Marquee';
import styles from './Footer.module.css';

const MARQUEE_ITEMS = [
  'AUTONEX AI', 'AUTOMATE TODAY', 'LEAD TOMORROW',
  'AUTONEX AI', 'AUTOMATE TODAY', 'LEAD TOMORROW',
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* CTA Section */}
      <div className={styles.cta}>
        <div className={`${styles.ctaInner} container`}>
          <p className={styles.ctaLabel}>GET STARTED</p>
          <h2 className={`${styles.ctaHeading} display`}>
            Your Competitors<br />
            <span className={styles.ghost}>Aren&apos;t Waiting.</span>
          </h2>
          <a
            href="https://cal.com/autonex-ai/30min"
            target="_blank" rel="noreferrer"
            className="btn-primary light"
          >
            Book a Free Strategy Call →
          </a>
        </div>
      </div>

      {/* Marquee */}
      <Marquee items={MARQUEE_ITEMS} dark speed={18} />

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`${styles.bottomInner} container`}>
          <p className={styles.copy}>© 2026 Autonex AI Technologies. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link>
          </div>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/autonexai_org/" target="_blank" rel="noreferrer" className={styles.social}>IG</a>
            <a href="https://x.com/AutonexAi_Org" target="_blank" rel="noreferrer" className={styles.social}>X</a>
            <a href="https://www.linkedin.com/in/autonex-ai/" target="_blank" rel="noreferrer" className={styles.social}>LI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
