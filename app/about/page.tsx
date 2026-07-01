'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './about.module.css';

const VALUES = [
  { icon: '⚡', title: 'Speed', desc: 'From first call to live systems in weeks — because every day without the right systems is an unnecessary cost.' },
  { icon: '🎯', title: 'Precision', desc: 'Generic solutions waste money. We scope exactly what your business needs and build exactly that.' },
  { icon: '📈', title: 'Scalability', desc: 'Every system is architected to grow with you — from 10 clients to 10,000 without rebuilding from scratch.' },
  { icon: '🤝', title: 'Partnership', desc: "We don't vanish after delivery. We stay responsive, invested, and available — because the best systems evolve." },
];

const TEAM_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&fm=webp&auto=format', caption: 'Strategy & Vision' },
  { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=85&fm=webp&auto=format', caption: 'Deep in Development' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85&fm=webp&auto=format', caption: 'Client Collaboration' },
];

const WHAT_WE_DO = [
  { num: '01', area: 'Web Development', body: 'High-performance websites built from scratch — fast, SEO-optimised, and designed to convert visitors into clients.' },
  { num: '02', area: 'AI Sales & Support Agents', body: 'Custom AI agents that qualify leads, answer questions, book appointments, and support customers 24/7.' },
  { num: '03', area: 'Lead Generation & Outreach', body: 'Automated systems that research prospects, craft personalised outreach, and build a consistent pipeline.' },
  { num: '04', area: 'CRM & Operations Automation', body: 'Custom CRM builds and workflow automation that connect your tools, eliminate data entry, and make operations run without manual coordination.' },
  { num: '05', area: 'AI Voice Agents', body: 'AI phone systems that handle inbound calls, book appointments, and run outbound follow-up in natural conversation.' },
  { num: '06', area: 'Analytics & Intelligence', body: 'Real-time dashboards, predictive models, and document AI — giving you the data clarity to make better decisions faster.' },
];

const WHO_WE_SERVE = [
  { title: 'Ambitious Founders', desc: "You're building something serious and your current systems aren't keeping pace. You need infrastructure that matches your ambition." },
  { title: 'Fast-Moving Teams', desc: "You move quickly and can't afford weeks of back-and-forth. You need a partner who understands urgency and delivers without drama." },
  { title: 'Businesses Ready to Scale', desc: "You've proven the model. Now you need systems that let you scale revenue without scaling headcount in the same proportion." },
  { title: 'Operators Tired of Manual Work', desc: "You know exactly where the time is being wasted. You're ready to fix it properly — with systems that work quietly in the background." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '15%']);

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div ref={heroRef} className={styles.hero}>
        <div className={styles.heroBgImage} />
        <div className={styles.heroBgOverlay} />
        <motion.div className={`${styles.heroContent} container`} style={{ opacity: heroOpacity, y: heroY }}>
          <motion.p className={styles.heroLabel}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}>
            [About Autonex AI]
          </motion.p>
          <motion.h1 className={`${styles.heroHeading} display`}
            initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            We Build<br />Systems That<br />
            <span className={styles.heroGhost}>Change Everything.</span>
          </motion.h1>
          <motion.p className={styles.heroSub}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}>
            <strong>Autonex AI is a specialist AI and web development studio — built to design,
            build, and deploy the systems that let growing businesses operate at full capacity.</strong>
          </motion.p>
        </motion.div>
      </div>

      {/* ── Story with images ── */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyGrid}>
            {/* Text side */}
            <div className={styles.storyLeft}>
              <ScrollReveal>
                <p className="section-label">[01] — Our Story</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`${styles.storyHeading} display`}>
                  Built From<br />
                  <span className={styles.storyGhost}>a Clear Belief.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className={styles.storyBody}>
                  Autonex AI was founded on a simple but powerful observation: <strong>most businesses aren&apos;t held back by a lack of ambition — they&apos;re held back by the systems they&apos;re running on.</strong>
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className={styles.storyBody}>
                  Talented teams buried in manual data entry. Founders doing admin that should be automated. Sales pipelines managed in spreadsheets. Websites that load slowly and convert poorly. Support queries going unanswered after 5pm.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p className={styles.storyBody}>
                  <strong>These aren&apos;t edge cases — they&apos;re the norm.</strong> And every single one of them is solvable with the right systems. That&apos;s what we set out to do: design and build those systems. Custom solutions built around how each business actually works, combining high-performance web development with intelligent AI automation.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className={styles.storyBtn}>
                  Start the Conversation →
                </a>
              </ScrollReveal>
            </div>

            {/* Image stack */}
            <div className={styles.storyRight}>
              <ScrollReveal delay={0.1} direction="right">
                <div className={styles.imageStack}>
                  {TEAM_IMAGES.map((img, i) => (
                    <div key={i} className={styles.stackItem} style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.caption} className={styles.stackImg} />
                      <div className={styles.stackOverlay} />
                      <span className={styles.stackCaption}>{img.caption}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className={styles.mission}>
        <div className="container">
          <ScrollReveal>
            <blockquote className={`${styles.missionQuote} display`}>
              &ldquo;The businesses that will win the next decade aren&apos;t the ones with the biggest teams.
              They&apos;re the ones with the smartest systems.&rdquo;
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={styles.missionAttr}>— Autonex AI, founding principle</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Full-width agency image ── */}
      <section className={styles.fullImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&q=85&fm=webp&auto=format"
          alt="Team at work"
          className={styles.fullImg}
        />
        <div className={styles.fullImageOverlay} />
        <div className={`${styles.fullImageCaption} container`}>
          <p className={styles.fullCapText}>Where ambition meets execution.</p>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className={styles.whatWeDo}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[02] — What We Do</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.wwdHeading} display`}>
              Six Areas.<br />
              <span className={styles.wwdGhost}>One Partner.</span>
            </h2>
          </ScrollReveal>
          <div className={styles.wwdGrid}>
            {WHAT_WE_DO.map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.06}>
                <div className={styles.wwdCard}>
                  <span className={styles.wwdNum}>{item.num}</span>
                  <h3 className={`${styles.wwdArea} display`}>{item.area}</h3>
                  <p className={styles.wwdBody}>{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={styles.values}>
        <div className="container">
          <div className={styles.valuesInner}>
            {/* Left: heading + image */}
            <div className={styles.valuesLeft}>
              <ScrollReveal>
                <p className="section-label">[03] — Our Values</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`${styles.valuesHeading} display`}>
                  The Principles<br />
                  <span className={styles.valuesGhost}>Behind Every Decision.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className={styles.valuesImg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=900&q=85&fm=webp&auto=format"
                    alt="Values"
                    className={styles.valuesImgEl}
                  />
                  <div className={styles.valuesImgOverlay} />
                </div>
              </ScrollReveal>
            </div>

            {/* Right: value cards */}
            <div className={styles.valuesRight}>
              {VALUES.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <div className={styles.valueCard}>
                    <div className={styles.valueTop}>
                      <span className={styles.valueIcon}>{v.icon}</span>
                      <span className={styles.valueNum}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className={`${styles.valueTitle} display`}>{v.title}</h3>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Serve ── */}
      <section className={styles.whoWeServe}>
        <div className={`${styles.wwsInner} container`}>
          <div className={styles.wwsLeft}>
            <ScrollReveal>
              <p className="section-label">[04] — Who We Serve</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`${styles.wwsHeading} display`}>
                Built For<br />
                <span className={styles.wwsGhost}>Ambitious Businesses.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className={styles.wwsSub}>
                We work best with businesses that know exactly what they want to achieve
                and are ready to invest in the systems to get there faster.
              </p>
            </ScrollReveal>
            {/* Image */}
            <ScrollReveal delay={0.3}>
              <div className={styles.wwsImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=85&fm=webp&auto=format"
                  alt="Ambitious team"
                  className={styles.wwsImg}
                />
                <div className={styles.wwsImgOverlay} />
              </div>
            </ScrollReveal>
          </div>
          <div className={styles.wwsRight}>
            {WHO_WE_SERVE.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className={styles.wwsItem}>
                  <span className={styles.wwsItemNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={`${styles.wwsItemTitle} display`}>{item.title}</h3>
                    <p className={styles.wwsItemDesc}>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className={styles.howWeWork}>
        <div className={`${styles.hwwInner} container`}>
          <div className={styles.hwwLeft}>
            <ScrollReveal>
              <p className="section-label">[05] — Our Process</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`${styles.hwwHeading} display`}>
                Transparent.<br />Fast.<br />
                <span className={styles.hwwGhost}>Effective.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className={styles.hwwSub}>
                Every project follows a clear, tested process — no surprises, no delays,
                no scope creep. You know exactly what&apos;s happening at every stage.
              </p>
            </ScrollReveal>
          </div>
          <div className={styles.hwwRight}>
            {[
              { step: 'Discovery Call', detail: 'Free · 30 min · No commitment' },
              { step: 'Strategy & Scoping', detail: '2–3 business days' },
              { step: 'Design & Build', detail: '2–6 weeks, depending on scope' },
              { step: 'Launch & Handover', detail: 'Full docs + 30-day support' },
              { step: 'Ongoing Partnership', detail: 'Long-term growth together' },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className={styles.hwwStep}>
                  <span className={styles.hwwNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.hwwStepBody}>
                    <span className={`${styles.hwwStepTitle} display`}>{item.step}</span>
                    <span className={styles.hwwDetail}>{item.detail}</span>
                  </div>
                  <span className={styles.hwwArrow}>→</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[06] — Next Step</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.ctaHeading} display`}>
              Ready to Build<br />
              <span className={styles.ctaGhost}>Something That Lasts?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className={styles.ctaActions}>
              <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary light">
                Book a Free Strategy Call →
              </a>
              <a href="/services" className={styles.ctaSecondary}>
                See All Services ↗
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
