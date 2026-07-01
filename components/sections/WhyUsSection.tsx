import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './WhyUsSection.module.css';

const REASONS = [
  {
    num: '01',
    icon: '🌐',
    title: 'High-Performance Websites',
    desc: 'We build fast, responsive, and scalable websites designed to deliver seamless user experiences and help convert visitors into customers.',
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'Smart Automation Systems',
    desc: 'We integrate automation into your workflows to reduce manual work, streamline operations, and improve efficiency across your business.',
  },
  {
    num: '03',
    icon: '📈',
    title: 'Built for Real Business Impact',
    desc: 'Every solution is designed with performance and usability in mind — helping your business operate more effectively and scale with confidence.',
  },
];

const STATS = [
  { value: '50+', label: 'Clients Served' },
  { value: '3×', label: 'Average Efficiency Gain' },
  { value: '24h', label: 'Response Time' },
  { value: '100%', label: 'Custom Solutions' },
];

export default function WhyUsSection() {
  return (
    <section className={styles.section} id="why-us">
      <div className="container">
        <ScrollReveal>
          <p className="section-label">[03] — Why Choose Autonex</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className={`${styles.heading} display`}>
            Why<br />
            <span className={styles.ghost}>Autonex.</span>
          </h2>
        </ScrollReveal>

        {/* Reasons grid */}
        <div className={styles.grid}>
          {REASONS.map((r, i) => (
            <ScrollReveal key={r.num} delay={i * 0.1}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{r.num}</span>
                  <span className={styles.cardIcon}>{r.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{r.title}</h3>
                <p className={styles.cardDesc}>{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats row */}
        <div className={styles.stats}>
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <div className={styles.stat}>
                <span className={`${styles.statValue} display`}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
