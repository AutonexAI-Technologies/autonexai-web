'use client';

import { useState, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import styles from './blog.module.css';

// ── Client-side disposable domain blocklist (fast first-pass) ─────────────
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'fakeinbox.com', 'yopmail.com', 'sharklasers.com', 'spam4.me',
  'trashmail.com', 'trashmail.me', 'trashmail.net', 'dispostable.com',
  'maildrop.cc', 'mailnull.com', '10minutemail.com', '10minutemail.net',
  'minutemail.com', 'getairmail.com', 'mailnesia.com', 'tempr.email',
  'discard.email', 'inboxbear.com', 'binkmail.com', 'tempinbox.com',
  'tempmailo.com', 'filzmail.com', 'throwam.com', 'anonbox.net',
]);

function isDisposable(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

function fireConfetti() {
  // Burst from bottom-center
  const end = Date.now() + 2000;
  const colors = ['#ffffff', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'];

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.9 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.9 },
      colors,
      zIndex: 9999,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim().toLowerCase();

    // Basic format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // Client-side disposable domain check
    if (isDisposable(trimmed)) {
      setStatus('error');
      setMessage('Disposable email addresses are not allowed. Please use your real email.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message ?? 'Subscribed! Welcome to the journal. 🎉');
        setEmail('');
        fireConfetti();
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }, [email]);

  return (
    <form
      className={styles.newsletterForm}
      onSubmit={handleSubmit}
      id="newsletter-form"
      noValidate
    >
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          id="newsletter-email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          placeholder="your@email.com"
          className={`${styles.newsletterInput} ${status === 'error' ? styles.inputError : ''}`}
          disabled={status === 'loading' || status === 'success'}
          autoComplete="email"
          inputMode="email"
          required
          aria-label="Email address for newsletter"
          aria-describedby={message ? 'newsletter-message' : undefined}
        />
      </div>

      {message && (
        <p
          id="newsletter-message"
          className={`${styles.newsletterMessage} ${status === 'success' ? styles.msgSuccess : styles.msgError}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className={styles.newsletterBtn}
        disabled={status === 'loading' || status === 'success'}
        id="newsletter-submit-btn"
      >
        {status === 'loading'
          ? 'Subscribing…'
          : status === 'success'
            ? '✓ Subscribed!'
            : 'Subscribe →'}
      </button>

      <p className={styles.newsletterDisclaimer}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
