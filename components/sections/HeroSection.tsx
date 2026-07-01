'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';
import Marquee from '@/components/ui/Marquee';
import styles from './HeroSection.module.css';

const TICKER = ['AI SALES AGENTS', 'WEB DEVELOPMENT', 'LEAD GENERATION', 'CRM AUTOMATION', 'VOICE AI', 'CONTENT SYSTEMS', 'AI ANALYTICS', 'AUTONEX AI'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <section ref={ref} className={styles.hero} id="hero">
        {/* Background */}
        <div className={styles.heroBgImage} />
        <div className={styles.heroBgOverlay} />

        {/* Main Content */}
        <motion.div
          className={`${styles.content} container`}
          style={{ y, opacity }}
        >
          <motion.div
            className={styles.inner}
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow label */}
            <motion.p variants={fadeUp} className={styles.eyebrow}>
              Autonex AI — AI Systems &amp; Web Development
            </motion.p>

            {/* Main headline */}
            <motion.h1 variants={stagger} className={`${styles.heading} display`}>
              <motion.span variants={fadeUp} className={styles.headingLine}>
                We Build the Systems
              </motion.span>
              <motion.span variants={fadeUp} className={styles.headingLine}>
                That <em className={styles.headingAccent}>Scale</em> Your Business.
              </motion.span>
            </motion.h1>

            {/* Sub-description */}
            <motion.p variants={fadeUp} className={styles.sub}>
              Most businesses don&apos;t fail from lack of ambition — they fail because
              their operations can&apos;t keep pace. Autonex AI builds and deploys the
              AI-powered systems, automations, and websites that eliminate bottlenecks,
              remove manual work, and free your team to focus on what actually drives growth.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={fadeUp} className={styles.actions}>
              <a
                href="https://cal.com/autonex-ai/30min"
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
                id="hero-cta-book"
              >
                Book a Free Strategy Call
                <motion.span
                  className={styles.arrow}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </a>
              <a href="#services" className={styles.btnGhost} id="hero-cta-services">
                Explore Our Services ↓
              </a>
            </motion.div>
          </motion.div>
        </motion.div>


      </section>

      <Marquee items={TICKER} speed={10} />
    </>
  );
}
