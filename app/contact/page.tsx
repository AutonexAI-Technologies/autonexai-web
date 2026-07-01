'use client';
import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './contact.module.css';
import { sanitize, isValidEmail, isLikelyRealName } from '@/lib/sanitize';
import { COUNTRIES, isValidInternationalPhone } from '@/lib/countries';

const COMMITMENTS = [
  { icon: '🗓️', label: 'Free 30-min call', desc: 'No commitment. No sales pressure. Just clarity.' },
  { icon: '⚡', label: '< 24h response', desc: 'Every message acknowledged within one business day.' },
  { icon: '🔒', label: '100% confidential', desc: 'Your information is never shared with anyone.' },
  { icon: '🎯', label: 'Tailored advice', desc: 'Every recommendation is specific to your business.' },
];

const FAQ = [
  {
    q: 'Do I need a large budget to work with Autonex AI?',
    a: "We work with businesses at different stages and budgets. The best way to understand what's possible for your budget is to book a free strategy call — we'll give you an honest picture.",
  },
  {
    q: 'How long does a typical project take?',
    a: "Most projects go from discovery call to live systems in 2–6 weeks, depending on scope. We'll give you a clear timeline before we start.",
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. We work with businesses globally. Our team operates Mon–Fri, 9AM–6PM IST, and we adapt to client time zones for calls.',
  },
  {
    q: 'What happens after a project is delivered?',
    a: 'Every project includes full documentation, team training, and 30 days of post-launch support. Many clients continue as long-term partners, returning to expand their systems.',
  },
];

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  form?: string;
};

export default function ContactPage() {
  const [sent, setSent]           = useState(false);
  const [errors, setErrors]       = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  // Country selector state — default India
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch]     = useState('');
  const [countryOpen, setCountryOpen]         = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // Track page load time for timing-based bot check
  const loadedAt = useRef<number>(Date.now());

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
        setCountrySearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dial.includes(countrySearch) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const fd  = new FormData(e.currentTarget);
    const raw = {
      name:        sanitize(fd.get('name')),
      email:       sanitize(fd.get('email')),
      phone:       sanitize(fd.get('phone') ?? ''),
      dialCode:    selectedCountry.dial,
      countryCode: selectedCountry.code,
      company:     sanitize(fd.get('company') ?? ''),
      service:     sanitize(fd.get('service') ?? ''),
      message:     sanitize(fd.get('message')),
      // Honeypot — should be empty
      website:     sanitize(fd.get('website') ?? ''),
      hp:          sanitize(fd.get('hp') ?? ''),
      loadedAt:    loadedAt.current,
    };

    // ── Client-side pre-validation (mirrors server) ──
    const newErrors: FieldErrors = {};
    if (!raw.name || raw.name.length < 2)             newErrors.name    = 'Please enter your full name.';
    else if (!isLikelyRealName(raw.name))             newErrors.name    = 'Please enter a genuine name.';
    if (!isValidEmail(raw.email))                     newErrors.email   = 'Please enter a valid business email address.';
    if (raw.phone) {
      const fullPhone = `${raw.dialCode}${raw.phone}`;
      if (!isValidInternationalPhone(fullPhone, raw.countryCode)) {
        newErrors.phone = `Please enter a valid phone number for ${selectedCountry.name}.`;
      }
    }
    if (!raw.message || raw.message.length < 20)      newErrors.message = 'Please describe your project in at least 20 characters.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(raw),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors as FieldErrors);
        } else {
          setErrors({ form: data.error ?? 'Something went wrong. Please try again or email us directly.' });
        }
      } else {
        setSent(true);
      }
    } catch {
      setErrors({ form: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBgImage} />
        <div className={styles.heroBgOverlay} />
        <div className={`${styles.heroContent} container`}>
          <p className={styles.heroLabel}>[Contact Us]</p>
          <h1 className={`${styles.heroHeading} display`}>
            Let&apos;s Build<br />Your Next<br />
            <span className={styles.ghost}>Competitive Edge.</span>
          </h1>
          <p className={styles.heroSub}>
            <strong>Start with a free 30-minute strategy call. We&apos;ll listen to your business,
            identify where the biggest opportunities are, and give you honest recommendations —
            whether you work with us or not.</strong>
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className={styles.main}>
        <div className={`${styles.mainInner} container`}>

          {/* Info column */}
          <div className={styles.info}>
            <ScrollReveal>
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Primary Contact</p>
                <a href="mailto:hello@autonexai.org" className={styles.infoValue}>hello@autonexai.org</a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Response Time</p>
                <p className={styles.infoValue}>Within 24 business hours</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Availability</p>
                <p className={styles.infoValue}>Mon – Fri · 9AM – 6PM IST</p>
              </div>
            </ScrollReveal>

            {/* Book via Cal */}
            <ScrollReveal delay={0.15}>
              <div className={styles.calBlock}>
                <p className={styles.calTitle}>Prefer to book directly?</p>
                <p className={styles.calDesc}>
                  Choose a time that works for you on our live calendar.
                  30 minutes. Free. No strings attached.
                </p>
                <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary">
                  📅 Open Booking Calendar →
                </a>
              </div>
            </ScrollReveal>

            {/* Commitments */}
            <ScrollReveal delay={0.2}>
              <div className={styles.commitments}>
                {COMMITMENTS.map((c) => (
                  <div key={c.label} className={styles.commitItem}>
                    <span className={styles.commitIcon}>{c.icon}</span>
                    <div>
                      <p className={styles.commitLabel}>{c.label}</p>
                      <p className={styles.commitDesc}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Social */}
            <ScrollReveal delay={0.25}>
              <div className={styles.socialBlock}>
                <p className={styles.infoLabel}>Follow Our Work</p>
                <div className={styles.socials}>
                  <a href="https://www.instagram.com/autonexai_org/" target="_blank" rel="noreferrer" className={styles.social}>Instagram ↗</a>
                  <a href="https://x.com/AutonexAi_Org" target="_blank" rel="noreferrer" className={styles.social}>X (Twitter) ↗</a>
                  <a href="https://www.linkedin.com/in/autonex-ai/" target="_blank" rel="noreferrer" className={styles.social}>LinkedIn ↗</a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <ScrollReveal direction="right">
            <div className={styles.formWrap}>
              {sent ? (
                <div className={styles.success}>
                  <span className={styles.successIcon}>✓</span>
                  <h2 className={`${styles.successTitle} display`}>Message Received.</h2>
                  <p className={styles.successDesc}>
                    We&apos;ll be back in touch within 24 hours with specific thoughts on your situation.
                    In the meantime, feel free to book a call directly.
                  </p>
                  <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary">
                    Book a Call →
                  </a>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formHeader}>
                    <h2 className={`${styles.formTitle} display`}>Send a Message</h2>
                    <p className={styles.formSub}>
                      Tell us about your business and the challenge you&apos;re trying to solve.
                      We&apos;ll respond with specific ideas — not a generic sales pitch.
                    </p>
                  </div>

                  {/* Honeypot fields — visually hidden, must stay empty */}
                  <div aria-hidden="true" className={styles.honeypot}>
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                    <input name="hp"      type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Form-level error */}
                  {errors.form && (
                    <div className={styles.formError} role="alert">{errors.form}</div>
                  )}

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="Your full name"
                        autoComplete="name"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className={styles.fieldError}>{errors.name}</p>}
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="company">Company / Business</label>
                      <input id="company" name="company" type="text" placeholder="Company name"
                        autoComplete="organization"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="email">Business Email *</label>
                      <input id="email" name="email" type="email" placeholder="you@company.com"
                        autoComplete="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className={styles.fieldError}>{errors.email}</p>}
                    </div>

                    {/* Phone with country code selector */}
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="phone">Phone (optional)</label>
                      <div className={styles.phoneRow}>

                        {/* Country code dropdown */}
                        <div className={styles.countrySelector} ref={countryRef}>
                          <button
                            type="button"
                            className={styles.countryBtn}
                            onClick={() => { setCountryOpen(o => !o); setCountrySearch(''); }}
                            aria-label="Select country code"
                            aria-expanded={countryOpen}
                          >
                            <span>{selectedCountry.flag}</span>
                            <span className={styles.countryDial}>{selectedCountry.dial}</span>
                            <span className={styles.countryChevron}>{countryOpen ? '▲' : '▼'}</span>
                          </button>

                          {countryOpen && (
                            <div className={styles.countryDropdown} role="listbox">
                              <div className={styles.countrySearchWrap}>
                                <input
                                  type="text"
                                  className={styles.countrySearch}
                                  placeholder="Search country…"
                                  value={countrySearch}
                                  onChange={e => setCountrySearch(e.target.value)}
                                  autoFocus
                                  aria-label="Search country"
                                />
                              </div>
                              <ul className={styles.countryList}>
                                {filteredCountries.length === 0 && (
                                  <li className={styles.countryNoResult}>No countries found</li>
                                )}
                                {filteredCountries.map(c => (
                                  <li
                                    key={c.code}
                                    role="option"
                                    aria-selected={c.code === selectedCountry.code}
                                    className={`${styles.countryItem} ${c.code === selectedCountry.code ? styles.countryItemActive : ''}`}
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setCountryOpen(false);
                                      setCountrySearch('');
                                    }}
                                  >
                                    <span className={styles.countryItemFlag}>{c.flag}</span>
                                    <span className={styles.countryItemName}>{c.name}</span>
                                    <span className={styles.countryItemDial}>{c.dial}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Phone number input */}
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder={`${selectedCountry.minDigits} digits`}
                          autoComplete="tel-national"
                          className={`${styles.input} ${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                      </div>
                      {errors.phone && <p id="phone-error" className={styles.fieldError}>{errors.phone}</p>}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="service">Primary Interest</label>
                    <select id="service" name="service" className={styles.input}>
                      <option value="">What are you looking to build?</option>
                      <option>Web Development</option>
                      <option>AI Sales &amp; Support Agents</option>
                      <option>AI Lead Generation &amp; Outreach</option>
                      <option>AI Content Systems</option>
                      <option>CRM &amp; Operations Automation</option>
                      <option>AI Voice Agents &amp; Phone Automation</option>
                      <option>AI Reporting &amp; Business Intelligence</option>
                      <option>Document Processing &amp; Workflow AI</option>
                      <option>Full Growth System (Multiple Services)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">Your Biggest Bottleneck *</label>
                    <textarea id="message" name="message" rows={5}
                      placeholder="Describe the specific challenge you're trying to solve. The more detail, the better our response."
                      className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className={styles.fieldError}>{errors.message}</p>}
                  </div>

                  <div className={styles.formFooter}>
                    <button type="submit" className="btn-primary" disabled={submitting} aria-busy={submitting}>
                      {submitting ? 'Sending…' : 'Send Message →'}
                    </button>
                    <p className={styles.disclaimer}>
                      🔒 Your information is 100% confidential and never shared. Protected under DPDPA 2023.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className={styles.faq}>
        <div className="container">
          <ScrollReveal>
            <p className="section-label">Quick Answers</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`${styles.faqHeading} display`}>
              Common<br />
              <span className={styles.faqGhost}>Questions.</span>
            </h2>
          </ScrollReveal>
          <div className={styles.faqList}>
            {FAQ.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className={styles.faqItem}>
                  <button
                    className={styles.faqQ}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <span className={styles.faqToggle} aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className={styles.faqA}>{item.a}</div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
