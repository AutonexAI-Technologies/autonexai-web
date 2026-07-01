'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './book.module.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
  }
}

export default function BookPage() {
  const calLoaded = useRef(false);

  useEffect(() => {
    if (calLoaded.current) return;
    calLoaded.current = true;

    const initCal = () => {
      if (!window.Cal) return;
      window.Cal('init', { origin: 'https://cal.com' });
      window.Cal('inline', {
        elementOrSelector: '#cal-booking-inline',
        calLink: 'autonex-ai/30min',
        layout: 'month_view',
      });
      window.Cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          dark: {
            'cal-brand': '#ffffff',
            'cal-brand-emphasis': '#f0f0f0',
            'cal-brand-text': '#000000',
            'cal-bg': '#05050a',
            'cal-bg-emphasis': '#111111',
            'cal-border': 'rgba(255,255,255,0.08)',
            'cal-text': '#ffffff',
            'cal-text-subtle': 'rgba(255,255,255,0.5)',
          },
        },
      });
    };

    if (window.Cal) {
      initCal();
    } else {
      // Load the script if CalProvider hasn't loaded it yet
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.onload = initCal;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className="container">
          <Link href="/" className={styles.back}>← Home</Link>
          <p className={styles.heroLabel}>[Free Strategy Call]</p>
          <h1 className={`${styles.heroHeading} display`}>
            Book Your<br />
            <span className={styles.ghost}>Free 30-Min Call.</span>
          </h1>
          <div className={styles.heroPoints}>
            {[
              '⚡ No commitment. No sales pressure.',
              '🎯 Specific advice for your business.',
              '🔒 100% confidential.',
              '📅 Pick a time that works for you.',
            ].map(p => (
              <span key={p} className={styles.heroPoint}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inline calendar ── */}
      <div className={styles.calWrap}>
        <div className="container">
          <div id="cal-booking-inline" className={styles.calContainer} />
        </div>
      </div>

      {/* ── What to expect ── */}
      <section className={styles.expect}>
        <div className="container">
          <p className={styles.expectLabel}>What happens on the call?</p>
          <div className={styles.expectGrid}>
            {[
              { num: '01', title: 'We listen', desc: 'You tell us about your business, current challenges, and growth goals. No pitch, no agenda.' },
              { num: '02', title: 'We diagnose', desc: 'We identify the biggest bottlenecks where AI or automation can make an immediate difference.' },
              { num: '03', title: 'We recommend', desc: 'You get a clear, honest roadmap — whether you work with us or not.' },
            ].map(s => (
              <div key={s.num} className={styles.expectStep}>
                <span className={styles.expectNum}>{s.num}</span>
                <h3 className={`${styles.expectTitle} display`}>{s.title}</h3>
                <p className={styles.expectDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
