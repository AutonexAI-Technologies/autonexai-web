import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './AboutSection.module.css';

const PILLARS = [
  {
    icon: '🚀',
    title: 'What We Build',
    body: 'High-performance websites and AI automation systems — designed around how your business actually operates. From your first website to a fully automated growth engine, we build it all.',
  },
  {
    icon: '🎯',
    title: 'How We Think',
    body: 'We focus on outcomes, not outputs. Every system we build is scoped around a specific business result — more leads, fewer manual hours, faster decisions — not just a deliverable to tick off.',
  },
  {
    icon: '🤝',
    title: 'Who We Serve',
    body: 'Ambitious founders and growing teams who know their business has more potential than their current systems are unlocking. If you move fast and think big, we\'re built for you.',
  },
];

export default function AboutSection() {
  return (
    <section className={styles.section} id="about">
      <div className={`${styles.inner} container`}>

        {/* Left column */}
        <div className={styles.left}>
          <ScrollReveal>
            <p className="section-label">[01] — Who We Are</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.heading} display`}>
              We Build<br />
              Systems<br />
              <span className={styles.ghost}>That Scale.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={styles.bodyBlock}>
              <p>
                Autonex AI was built on a single belief: <strong>the businesses that will win the next decade aren&apos;t the ones with the biggest teams — they&apos;re the ones with the smartest systems.</strong>
              </p>
              <p>
                We combine deep technical expertise with practical business strategy to design and build systems that eliminate manual work, accelerate growth, and give founders their time back.
              </p>
              <p>
                We don&apos;t just build things — we build the <em>right</em> things, in the right order, measured by what actually changes in your business.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillars */}
          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.25 + i * 0.1}>
                <div className={styles.pillar}>
                  <span className={styles.pillarIcon}>{p.icon}</span>
                  <div>
                    <h3 className={styles.pillarTitle}>{p.title}</h3>
                    <p className={styles.pillarBody}>{p.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right — image with quote */}
        <div className={styles.right}>
          <ScrollReveal direction="right" delay={0.15}>
            <div className={styles.imageStack}>
              <div className={styles.imageMain}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&fm=webp&auto=format"
                  alt="Autonex AI team collaborating on automation systems"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className={styles.imageBadgeRow}>
                <div className={styles.imageBadge}>
                  <span className={styles.badgeDot} />
                  <span className={styles.badgeLabel}>Available 24 / 7</span>
                </div>
                <div className={styles.imageBadge}>
                  <span className={styles.badgeDot} />
                  <span className={styles.badgeLabel}>8 Service Areas</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Pull quote */}
          <ScrollReveal delay={0.3}>
            <blockquote className={styles.quote}>
              &ldquo;The businesses that win in the next decade won&apos;t have bigger teams. They&apos;ll have smarter systems.&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
