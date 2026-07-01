import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './ProcessSection.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We start with a focused 30-minute call to understand your business, goals, and the biggest bottlenecks holding you back. No fluff — just clarity.',
    detail: 'Free · 30 min · No commitment',
  },
  {
    num: '02',
    title: 'Strategy & Scoping',
    desc: 'Our team maps out the exact systems you need — custom to your workflow, your stack, your team. You get a clear scope, timeline, and investment before we start.',
    detail: '2–3 business days',
  },
  {
    num: '03',
    title: 'Design & Build',
    desc: 'We execute with precision. Regular updates, shared previews, and full transparency throughout. No disappearing acts — just progress you can see.',
    detail: '2–6 weeks depending on scope',
  },
  {
    num: '04',
    title: 'Launch & Handover',
    desc: 'We deploy, test, and hand over full documentation. Your team gets trained on everything we built. And we stay on for support.',
    detail: 'Full handover + 30-day support',
  },
  {
    num: '05',
    title: 'Scale Together',
    desc: 'Your systems grow with you. As your business evolves, we expand and optimize. Most clients come back for phase two within 90 days.',
    detail: 'Long-term partnership',
  },
];

export default function ProcessSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <p className="section-label">[03] — How We Work</p>
        </ScrollReveal>
        <div className={styles.header}>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.heading} display`}>
              From First Call<br />
              <span className={styles.ghost}>To Fully Launched.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.sub}>
              A clear, transparent process that respects your time and delivers results you can measure.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.1}>
              <div className={styles.step}>
                {/* Left — number */}
                <div className={styles.stepLeft}>
                  <span className={styles.stepNum}>{step.num}</span>
                  {i < STEPS.length - 1 && <div className={styles.connector} />}
                </div>

                {/* Right — content */}
                <div className={styles.stepContent}>
                  <h3 className={`${styles.stepTitle} display`}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <span className={styles.stepDetail}>{step.detail}</span>
                </div>

                {/* CTA on last step */}
                {i === STEPS.length - 1 && (
                  <div className={styles.stepCta}>
                    <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary">
                      Start Step 01 →
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
