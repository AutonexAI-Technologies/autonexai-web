'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './FAQSection.module.css';

const FAQS = [
  {
    q: 'What services does Autonex AI offer?',
    a: 'We offer 8 core services: Web Development, AI Sales & Support Agents, AI Lead Generation & Outreach, AI Content Systems, CRM & Operations Automation, AI Voice Agents & Phone Automation, AI Reporting & Business Intelligence, and Document Processing & Workflow AI. Each service can be delivered independently or as part of a connected growth system.',
  },
  {
    q: 'How long does a typical project take to complete?',
    a: 'Websites typically take 2–4 weeks from kick-off to launch. Automation systems take 3–6 weeks depending on complexity and integrations required. We always provide a precise timeline in the scoping phase — before you commit to anything.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Absolutely — startups are our sweet spot. We understand the constraints, the speed requirements, and the need to do more with less. We\'ve helped dozens of early-stage teams punch way above their weight with the right systems in place.',
  },
  {
    q: 'What does your pricing look like?',
    a: 'Pricing is custom-scoped to your specific project and goals. We never use generic packages because no two businesses are the same. A 50% deposit is required to begin, with the balance due on delivery. Book a free strategy call and we\'ll give you a clear estimate within 48 hours.',
  },
  {
    q: 'Can you integrate with the tools we already use?',
    a: 'Yes — we integrate with virtually every tool your business already runs on, across CRM, project management, communication, billing, email, and more. We build custom integrations designed around your existing stack — not against it.',
  },
  {
    q: 'What happens after the project is delivered?',
    a: 'You get full documentation, a recorded walkthrough, and 30 days of post-launch support. Most of our clients engage us for ongoing retainers as their needs grow — we\'re built for long-term partnerships, not one-off deliveries.',
  },
  {
    q: 'How do I know if automation is right for my business?',
    a: 'A simple rule: if your team is spending more than 5 hours a week on the same repetitive tasks, automation will pay for itself within the first month. Our discovery call is designed to identify exactly where automation will create the highest impact for your specific situation.',
  },
  {
    q: 'Do I need a technical background to work with you?',
    a: 'Not at all. We handle everything technical — design, development, integrations, and deployment. We communicate in plain English, provide full documentation, and train your team on every system we deliver. No jargon, no surprises.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.inner}>
          {/* Left — heading */}
          <div className={styles.left}>
            <ScrollReveal>
              <p className="section-label">[06] — FAQ</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`${styles.heading} display`}>
                Got<br />Questions?<br />
                <span className={styles.ghost}>We&apos;ve Got<br />Answers.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className={styles.sub}>
                Can&apos;t find what you&apos;re looking for? Book a free call and ask us directly.
              </p>
              <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className={`${styles.ctaBtn} btn-primary`}>
                Book a Free Call →
              </a>
            </ScrollReveal>
          </div>

          {/* Right — accordion */}
          <div className={styles.right}>
            <div className={styles.list}>
              {FAQS.map((faq, i) => (
                <div key={i} className={`${styles.item} ${open === i ? styles.active : ''}`}>
                  <button
                    className={styles.trigger}
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    <span className={styles.triggerNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.q}>{faq.q}</span>
                    <motion.span
                      className={styles.icon}
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        className={styles.answer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className={styles.a}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
