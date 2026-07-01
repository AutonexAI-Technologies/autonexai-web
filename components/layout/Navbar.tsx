'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/why-us', label: 'Why Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} container`}>
        {/* Left links */}
        <div className={`${styles.links} ${styles.left}`}>
          {NAV_LINKS.slice(0, 3).map(l => (
            <Link key={l.href} href={l.href}
              className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-black.png"
            alt="Autonex AI"
            width={44}
            height={44}
            className={styles.logoImg}
          />
          <span className={styles.logoMain}>Autonex</span>
          <span className={styles.logoSub}>AI</span>
        </Link>

        {/* Right links */}
        <div className={`${styles.links} ${styles.right}`}>
          {NAV_LINKS.slice(3).map(l => (
            <Link key={l.href} href={l.href}
              className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className={styles.ctaBtn}
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
          >
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className={styles.mobileLink}>
                {l.label}
              </Link>
            ))}
            <Link href="/book"
              className={styles.mobileCta}
              onClick={() => setMobileOpen(false)}
            >
              Book a Free Strategy Call →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
