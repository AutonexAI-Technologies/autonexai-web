'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ManifestoSection.module.css';

const LINES = [
  'DESIGN WITHOUT PURPOSE', 'IS JUST DECORATION.',
  'AUTOMATION WITHOUT STRATEGY', 'IS JUST NOISE.',
  'BUT WHEN BOTH ALIGN —', 'YOUR BUSINESS', 'BECOMES UNSTOPPABLE.',
];

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className={styles.section}>
      {/* Background image with parallax overlay */}
      <div className={styles.bg} />
      <div className={styles.overlay} />

      <div className={`${styles.inner} container`}>
        {LINES.map((line, i) => {
          const start = i / (LINES.length + 1);
          const end = (i + 1.5) / (LINES.length + 1);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, start + 0.08, end, end + 0.12], [0.08, 1, 1, 0.08]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [start, start + 0.08], [40, 0]);
          return (
            <motion.p
              key={i}
              className={`${styles.line} display`}
              style={{ opacity, y }}
            >
              {line}
            </motion.p>
          );
        })}
      </div>

      {/* Bottom label */}
      <div className={styles.bottomLabel}>
        <p>Autonex AI — Built for the businesses that refuse to be average.</p>
      </div>
    </section>
  );
}
