'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

type Consent = {
  essential: true;   // always on
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'autonex_cookie_consent';
const CONSENT_VERSION = '1'; // bump to re-prompt on policy changes

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<Consent>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) { setVisible(true); return; }
      const parsed = JSON.parse(stored);
      // Re-prompt if consent version changed
      if (parsed.version !== CONSENT_VERSION) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent: Consent) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...consent, version: CONSENT_VERSION, timestamp: new Date().toISOString() })
      );
    } catch { /* storage unavailable */ }
    setVisible(false);
    // Fire analytics init only if consented
    if (consent.analytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });
    }
  };

  const acceptAll = () => save({ essential: true, analytics: true, marketing: true });
  const rejectAll = () => save({ essential: true, analytics: false, marketing: false });
  const savePrefs = () => save(prefs);

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-label="Cookie preferences" aria-modal="true">
      <div className={styles.banner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.icon}>🍪</span>
          <div>
            <p className={styles.title}>We use cookies</p>
            <p className={styles.subtitle}>
              To deliver the best experience and in accordance with India&apos;s{' '}
              <strong>Digital Personal Data Protection Act 2023</strong>.
            </p>
          </div>
        </div>

        {/* Expandable preferences */}
        {expanded && (
          <div className={styles.prefs}>
            {/* Essential */}
            <div className={styles.prefRow}>
              <div className={styles.prefInfo}>
                <p className={styles.prefName}>Essential Cookies</p>
                <p className={styles.prefDesc}>Required for the website to function. Cannot be disabled.</p>
              </div>
              <div className={`${styles.toggle} ${styles.toggleOn} ${styles.toggleDisabled}`}>
                <span className={styles.toggleThumb} />
              </div>
            </div>

            {/* Analytics */}
            <div className={styles.prefRow}>
              <div className={styles.prefInfo}>
                <p className={styles.prefName}>Analytics Cookies</p>
                <p className={styles.prefDesc}>Help us understand how visitors use the site (e.g. Google Analytics). No personal data is sold.</p>
              </div>
              <button
                className={`${styles.toggle} ${prefs.analytics ? styles.toggleOn : ''}`}
                onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                role="switch"
                aria-checked={prefs.analytics}
                type="button"
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>

            {/* Marketing */}
            <div className={styles.prefRow}>
              <div className={styles.prefInfo}>
                <p className={styles.prefName}>Marketing Cookies</p>
                <p className={styles.prefDesc}>Used to show relevant content. No data is shared with third-party advertisers without consent.</p>
              </div>
              <button
                className={`${styles.toggle} ${prefs.marketing ? styles.toggleOn : ''}`}
                onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                role="switch"
                aria-checked={prefs.marketing}
                type="button"
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.btnText} onClick={() => setExpanded(e => !e)} type="button">
            {expanded ? 'Hide preferences ↑' : 'Customise ↓'}
          </button>
          <div className={styles.btnGroup}>
            <button className={styles.btnOutline} onClick={rejectAll} type="button">
              Reject all
            </button>
            {expanded ? (
              <button className={styles.btnPrimary} onClick={savePrefs} type="button">
                Save preferences
              </button>
            ) : (
              <button className={styles.btnPrimary} onClick={acceptAll} type="button">
                Accept all
              </button>
            )}
          </div>
        </div>

        {/* Legal note */}
        <p className={styles.legal}>
          By accepting, you consent to our{' '}
          <Link href="/privacy">Privacy Policy</Link>{' '}
          &amp; <Link href="/terms">Terms</Link>.
          You may withdraw consent at any time per DPDPA 2023.
        </p>
      </div>
    </div>
  );
}

// Extend Window for gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}
