import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    quote: 'Autonex delivered a high-performing website and automation system that transformed how we handle leads. The ROI was visible within the first month. I couldn\'t believe how fast it all came together.',
    author: 'Sarah M.',
    role: 'Founder',
    company: 'TechStartup',
    date: 'March 2025',
    result: '40% more leads converted',
  },
  {
    quote: 'They delivered sharp, contemporary design that felt relevant and purposeful. From concept to final execution, everything was handled with clarity and creativity. Our bounce rate dropped dramatically.',
    author: 'James R.',
    role: 'CEO',
    company: 'Design Studio',
    date: 'February 2025',
    result: '2.3× longer session time',
  },
  {
    quote: 'The CRM automation alone saved us 15+ hours per week. The team at Autonex truly understands what growing businesses need — they just get it, and they deliver without the back-and-forth.',
    author: 'Priya S.',
    role: 'Operations Lead',
    company: 'E-Commerce Brand',
    date: 'January 2025',
    result: '15h/week saved per team member',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <p className="section-label">[05] — Client Results</p>
        </ScrollReveal>

        <div className={styles.headerRow}>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.heading} display`}>
              Real Clients.<br />
              <span className={styles.ghost}>Real Results.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.sub}>
              These aren&apos;t just nice words — they represent real hours saved,
              real leads generated, and real growth achieved.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={styles.card}>
                {/* Stars */}
                <div className={styles.stars}>
                  {[...Array(5)].map((_, s) => <span key={s}>★</span>)}
                </div>

                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>

                {/* Result chip */}
                <div className={styles.result}>
                  <span className={styles.resultIcon}>📈</span>
                  <span>{t.result}</span>
                </div>

                <div className={styles.meta}>
                  <div className={styles.author}>{t.author}</div>
                  <div className={styles.role}>{t.role} · {t.company}</div>
                  <div className={styles.date}>[{t.date}]</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust row */}
        <ScrollReveal delay={0.2}>
          <div className={styles.trust}>
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>100%</span>
              <span className={styles.trustLabel}>Project completion rate</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>4.9★</span>
              <span className={styles.trustLabel}>Average client rating</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>90%</span>
              <span className={styles.trustLabel}>Return for phase two</span>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <span className={styles.trustNum}>&lt;24h</span>
              <span className={styles.trustLabel}>Response time guaranteed</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
