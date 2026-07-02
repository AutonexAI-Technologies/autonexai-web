import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FAQSection from '@/components/sections/FAQSection';
import styles from './why-us.module.css';

export const metadata: Metadata = {
  title: 'Why Autonex AI — The Partner Built for Growing Businesses',
  description: 'Discover why growing businesses choose Autonex AI for web development, AI automation, and business intelligence. Honest comparison, real guarantees, no fluff.',
  openGraph: {
    title: 'Why Autonex AI — The Partner Built for Growing Businesses',
    description: 'Discover why growing businesses choose Autonex AI for web development, AI automation, and business intelligence. Honest comparison, real guarantees, no fluff.',
    url: 'https://www.autonexai.org/why-us',
    type: 'website',
    images: [
      {
        url: '/opengraph-image?v=3',
        width: 1200,
        height: 630,
        alt: 'Why Autonex AI',
      },
      {
        url: '/images/logo-black.png',
        width: 800,
        height: 800,
        alt: 'Autonex AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Autonex AI — The Partner Built for Growing Businesses',
    description: 'Discover why growing businesses choose Autonex AI for web development, AI automation, and business intelligence. Honest comparison, real guarantees, no fluff.',
    images: ['/opengraph-image?v=3', '/images/logo-black.png'],
  },
};

const PROBLEMS = [
  { icon: '💀', problem: 'Manual work draining your team\'s capacity', cost: 'Every hour spent on repeatable manual tasks is an hour not spent on growth-driving work.' },
  { icon: '🐌', problem: 'A slow or outdated website losing you leads', cost: 'A 1-second delay in page load reduces conversions by up to 7%. Outdated design costs trust.' },
  { icon: '🔁', problem: 'Disconnected tools creating data chaos', cost: 'Most growing businesses use 10–20 tools. When they don\'t talk to each other, data lives in spreadsheets.' },
  { icon: '📉', problem: 'No consistent, predictable lead pipeline', cost: 'Businesses relying purely on referrals and word-of-mouth have unpredictable, fragile revenue.' },
  { icon: '🎯', problem: 'Missing enquiries outside office hours', cost: 'Leads that don\'t get an instant response go cold. Most enquiries arrive outside working hours.' },
  { icon: '📊', problem: 'Making decisions with incomplete or stale data', cost: 'Decisions without real-time data cost more, take longer, and produce worse outcomes.' },
];

const COMPARISON = [
  { feature: 'Custom-built for your specific business', autonex: true, agency: false, diy: false },
  { feature: 'AI & automation integrated from day one', autonex: true, agency: false, diy: false },
  { feature: 'Transparent pricing, no surprises', autonex: true, agency: false, diy: true },
  { feature: 'Delivery in 2–6 weeks', autonex: true, agency: false, diy: false },
  { feature: 'Full documentation & team training', autonex: true, agency: false, diy: false },
  { feature: 'Ongoing support & partnership', autonex: true, agency: false, diy: false },
  { feature: 'Results-focused strategy, not just output', autonex: true, agency: false, diy: false },
  { feature: 'Scalable architecture built to grow', autonex: true, agency: true, diy: false },
];

const GUARANTEES = [
  { icon: '🗓️', title: 'Free 30-Min Strategy Call', desc: 'Every engagement starts with a free, no-obligation strategy call where we listen to your business and give you honest recommendations — whether you work with us or not.' },
  { icon: '⚡', title: 'Response Within 24 Hours', desc: 'Every message, enquiry, or support request is acknowledged and actioned within one business day. No disappearing, no delays.' },
  { icon: '📋', title: 'Clear Scope Before We Start', desc: 'You receive a detailed scope document — with timeline, deliverables, and investment — before any work begins. No surprises, no scope creep.' },
  { icon: '📚', title: 'Full Documentation & Handover', desc: 'Every system we build comes with complete documentation and team training. You own everything we create — fully and permanently.' },
  { icon: '🤝', title: 'Long-Term Partnership', desc: 'We don\'t disappear post-delivery. Our clients come back to expand their systems because the relationship doesn\'t end at launch.' },
  { icon: '🎯', title: 'Outcome-Focused Approach', desc: 'We scope everything around a specific business result — not just a deliverable. If we can\'t define what success looks like, we don\'t take the project.' },
];

const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'We Build Systems, Not Just Deliverables',
    body: 'Most agencies deliver a website, a piece of software, or a campaign. We deliver systems — interconnected solutions that work together and evolve with your business. Every project is scoped around a business outcome, not just a deliverable.',
  },
  {
    num: '02',
    title: 'AI-Native From the Ground Up',
    body: 'AI isn\'t a bolt-on for us. It\'s built into the architecture of everything we do. From the websites we build to the automation systems we deploy, we design AI capability in from day one — not added as an afterthought.',
  },
  {
    num: '03',
    title: 'We Move Quickly Without Cutting Corners',
    body: 'Our process is designed for speed — discovery to delivery in weeks, not months. We achieve this through clear scoping, no unnecessary meetings, and a proven build process that eliminates the back-and-forth that slows most projects down.',
  },
  {
    num: '04',
    title: 'One Partner for Your Entire Growth Stack',
    body: 'From your website to your CRM to your AI agents — we handle the full picture. You don\'t need to manage four different agencies with four different project managers. One team, one vision, one point of accountability.',
  },
];

export default function WhyUsPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80&fm=webp&auto=format"
            alt="Teamwork"
            className={styles.heroBgImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`${styles.heroContent} container`}>
          <p className={styles.heroLabel}>[Why Autonex AI]</p>
          <h1 className={`${styles.heroHeading} display`}>
            Why Growing<br />Businesses<br />
            <span className={styles.ghost}>Choose Us.</span>
          </h1>
          <p className={styles.heroSub}>
            <strong>There are hundreds of agencies and thousands of tools. Here&apos;s an honest breakdown of why
            businesses that care about results choose Autonex AI — and stay.</strong>
          </p>
        </div>
      </div>

      {/* ── The Problem ── */}
      <section className={styles.problem}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[01] — The Problem We Solve</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.problemHeading} display`}>
              These Are the<br />
              <span className={styles.problemGhost}>Bottlenecks We Fix.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.problemSub}>
              Every one of these is a common, solvable problem. Autonex AI exists to fix them — with systems, not band-aids.
            </p>
          </ScrollReveal>

          <div className={styles.problemGrid}>
            {PROBLEMS.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className={styles.problemCard}>
                  <span className={styles.problemIcon}>{p.icon}</span>
                  <h3 className={styles.problemTitle}>{p.problem}</h3>
                  <p className={styles.problemCost}>{p.cost}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className={styles.problemCta}>
              <p className={styles.problemCtaText}>
                Every single one of these problems has a direct, buildable solution. That&apos;s what Autonex AI does.
              </p>
              <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary">
                Let&apos;s Solve Yours →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section className={styles.differentiators}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[02] — What Makes Us Different</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.diffHeading} display`}>
              The Autonex AI<br />
              <span className={styles.diffGhost}>Difference.</span>
            </h2>
          </ScrollReveal>
          <div className={styles.diffList}>
            {DIFFERENTIATORS.map((d, i) => (
              <ScrollReveal key={d.num} delay={i * 0.08}>
                <div className={styles.diffItem}>
                  <span className={styles.diffNum}>{d.num}</span>
                  <div className={styles.diffContent}>
                    <h3 className={`${styles.diffTitle} display`}>{d.title}</h3>
                    <p className={styles.diffBody}>{d.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className={styles.comparison}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[03] — How We Compare</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.compHeading} display`}>
              Autonex vs<br />
              <span className={styles.compGhost}>The Alternatives.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.thFeature}></div>
                <div className={`${styles.thCol} ${styles.thHighlight}`}>
                  <span className={styles.colLabel}>Autonex AI</span>
                  <span className={styles.colSub}>Recommended</span>
                </div>
                <div className={styles.thCol}>
                  <span className={styles.colLabel}>Traditional Studio</span>
                  <span className={styles.colSub}>Expensive & Slow</span>
                </div>
                <div className={styles.thCol}>
                  <span className={styles.colLabel}>DIY / Templates</span>
                  <span className={styles.colSub}>Time-Consuming</span>
                </div>
              </div>

              {COMPARISON.map((row, i) => (
                <div key={i} className={`${styles.tableRow} ${i % 2 === 0 ? styles.rowAlt : ''}`}>
                  <div className={styles.tdFeature}>{row.feature}</div>
                  <div className={`${styles.tdCol} ${styles.tdHighlight}`}>
                    <span className={row.autonex ? styles.yes : styles.no}>{row.autonex ? '✓' : '✕'}</span>
                  </div>
                  <div className={styles.tdCol}>
                    <span className={row.agency ? styles.yes : styles.no}>{row.agency ? '✓' : '✕'}</span>
                  </div>
                  <div className={styles.tdCol}>
                    <span className={row.diy ? styles.yes : styles.no}>{row.diy ? '✓' : '✕'}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Our Guarantees ── */}
      <section className={styles.guarantees}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">[04] — Our Commitments</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.guarHeading} display`}>
              What We<br />
              <span className={styles.guarGhost}>Guarantee You.</span>
            </h2>
          </ScrollReveal>
          <div className={styles.guarGrid}>
            {GUARANTEES.map((g, i) => (
              <ScrollReveal key={g.title} delay={i * 0.06}>
                <div className={styles.guarCard}>
                  <span className={styles.guarIcon}>{g.icon}</span>
                  <h3 className={styles.guarTitle}>{g.title}</h3>
                  <p className={styles.guarDesc}>{g.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Final CTA ── */}
      <section className={styles.finalCta}>
        <div className="container">
          <ScrollReveal>
            <h2 className={`${styles.finalHeading} display`}>
              Stop Losing<br />Ground.<br />
              <span className={styles.finalGhost}>Start Building Systems.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className={styles.finalSub}>
              Every week without the right systems is a week your competitors are using to pull ahead.
              Book a free call — no commitment, just clarity about where to start.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary light">
              Book a Free Strategy Call →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
