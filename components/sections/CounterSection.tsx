'use client';
import { motion, type Variants } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './CounterSection.module.css';

const PILLARS = [
  {
    icon: '🧠',
    title: 'AI-Native from Day One',
    body: 'Every system we build has AI integrated at its core — not bolted on afterwards. This means your systems learn, adapt, and compound in value over time.',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery, No Shortcuts',
    body: 'Discovery to live systems in 2–6 weeks. We\'re fast because our process is clear, not because we cut corners. Your system is fully tested before launch.',
  },
  {
    icon: '📋',
    title: 'Full Ownership, Always',
    body: 'Everything we build belongs to you. Full documentation, full source code, full team training. You are never locked in — you always control your stack.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partnership',
    body: 'We don\'t disappear post-delivery. Our clients return to expand their systems because the relationship doesn\'t end at launch — it\'s just the beginning.',
  },
  {
    icon: '🎯',
    title: 'Outcomes, Not Outputs',
    body: 'We scope every project around a specific business result. If we can\'t define what success looks like in measurable terms before we start, we don\'t take the project.',
  },
  {
    icon: '🔗',
    title: 'One Partner, Full Stack',
    body: 'Web development, AI agents, automation, analytics — one team that understands how it all connects. No handoff gaps. No "that\'s not our department."',
  },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function CounterSection() {
  return (
    <section className={styles.section} id="what-you-get">
      <div className="container">

        {/* ── Section label + heading ── */}
        <ScrollReveal>
          <p className="section-label">[04] — What You Get</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <div className={styles.headerRow}>
            <h2 className={`${styles.heading} display`}>
              Built to Last.<br />
              <span className={styles.ghost}>Designed to Scale.</span>
            </h2>
            <p className={styles.headingSub}>
              When you work with Autonex AI, you&apos;re not buying a deliverable —
              you&apos;re investing in a system that grows with your business.
              Here&apos;s exactly what that means in practice.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Pillar grid ── */}
        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className={styles.card}>
              <div className={styles.cardIcon}>{p.icon}</div>
              <h3 className={`${styles.cardTitle} display`}>{p.title}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Promise strip ── */}
        <ScrollReveal delay={0.1}>
          <div className={styles.promiseStrip}>
            <div className={styles.promiseItem}>
              <span className={styles.promiseVal}>24 / 7</span>
              <span className={styles.promiseLabel}>AI systems operate</span>
            </div>
            <div className={styles.promiseDivider} />
            <div className={styles.promiseItem}>
              <span className={styles.promiseVal}>&lt; 24h</span>
              <span className={styles.promiseLabel}>Response guaranteed</span>
            </div>
            <div className={styles.promiseDivider} />
            <div className={styles.promiseItem}>
              <span className={styles.promiseVal}>2–6 wks</span>
              <span className={styles.promiseLabel}>Discovery to delivery</span>
            </div>
            <div className={styles.promiseDivider} />
            <div className={styles.promiseItem}>
              <span className={styles.promiseVal}>100%</span>
              <span className={styles.promiseLabel}>Ownership — always yours</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── CTA ── */}
        <ScrollReveal delay={0.15}>
          <div className={styles.ctaRow}>
            <p className={styles.ctaText}>
              Ready to see what this looks like for your business?
            </p>
            <a
              href="https://cal.com/autonex-ai/30min"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Book a Free Strategy Call →
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
