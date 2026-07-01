'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SERVICES } from '@/lib/services';
import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx]   = useState<number | null>(null);

  // Floating image follows mouse
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 80);
  }

  function toggle(i: number) {
    setExpandedIdx(expandedIdx === i ? null : i);
  }

  return (
    <section className={styles.section} id="services" onMouseMove={handleMouseMove}>

      {/* ── Floating cursor image ── */}
      <AnimatePresence>
        {hoveredIdx !== null && (
          <motion.div
            className={styles.cursorPreview}
            key={hoveredIdx}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SERVICES[hoveredIdx].image}
              alt={SERVICES[hoveredIdx].title}
              className={styles.cursorImg}
            />
            <div className={styles.cursorOverlay} />
            <span className={styles.cursorLabel}>{SERVICES[hoveredIdx].title}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className={`${styles.sectionHeader} container`}>
        <ScrollReveal>
          <p className="section-label">[02] — What We Build</p>
        </ScrollReveal>
        <div className={styles.headerInner}>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.heading} display`}>
              8 Systems.<br />
              <span className={styles.ghost}>One Partner.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.sub}>
              Each service is a complete, production-ready system — designed to work independently
              or as part of a fully integrated growth stack. Start with the highest-ROI system first.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Service list ── */}
      <div className={`${styles.list} container`}>
        {SERVICES.map((s, i) => (
          <ScrollReveal key={s.num} delay={i * 0.03}>
            <div
              className={`${styles.item} ${expandedIdx === i ? styles.expanded : ''}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Clickable row */}
              <button
                className={styles.itemRow}
                onClick={() => toggle(i)}
                aria-expanded={expandedIdx === i}
                id={`service-toggle-${s.slug}`}
              >
                <span className={styles.num}>{s.num}</span>
                <span className={styles.itemIcon}>{s.icon}</span>
                <div className={styles.itemMeta}>
                  <span className={`${styles.itemTitle} display`}>{s.title}</span>
                  <span className={styles.itemTagline}>{s.tagline}</span>
                </div>
                <motion.span
                  className={styles.expandIcon}
                  animate={{ rotate: expandedIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                >
                  +
                </motion.span>
              </button>

              {/* Expand panel */}
              <AnimatePresence initial={false}>
                {expandedIdx === i && (
                  <motion.div
                    className={styles.itemExpand}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.expandInner}>
                      {/* Image */}
                      <div className={styles.expandImage}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.image} alt={s.title} className={styles.expandImg} />
                        <div className={styles.expandImageOverlay} />
                        <span className={styles.expandImageIcon}>{s.icon}</span>
                      </div>

                      {/* Content */}
                      <div className={styles.expandContent}>
                        <p className={styles.expandDesc}>{s.shortDesc}</p>

                        <ul className={styles.outcomes}>
                          {s.outcomes.map(o => (
                            <li key={o} className={styles.outcomeItem}>
                              <span className={styles.outcomeArrow}>→</span>
                              {o}
                            </li>
                          ))}
                        </ul>

                        <div className={styles.expandActions}>
                          <Link
                            href={`/services/${s.slug}`}
                            className={styles.expandPrimary}
                            id={`service-link-${s.slug}`}
                          >
                            Full Service Details →
                          </Link>
                          <a
                            href="https://cal.com/autonex-ai/30min"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.expandBook}
                          >
                            Book a Call ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className={`${styles.bottomCta} container`}>
        <ScrollReveal>
          <div className={styles.ctaInner}>
            <div>
              <p className={styles.ctaHeading}>Not sure where to start?</p>
              <p className={styles.ctaSubText}>
                Book a free 30-min strategy call — we&apos;ll identify the highest-ROI system for your business.
              </p>
            </div>
            <a
              href="https://cal.com/autonex-ai/30min"
              target="_blank"
              rel="noreferrer"
              className={styles.ctaBtn}
            >
              Book a Free Call →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
