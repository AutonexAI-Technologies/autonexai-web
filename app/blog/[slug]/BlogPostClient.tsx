'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './post.module.css';

interface Post {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  tags: string[];
  coverImage: string;
  content: string;
  excerpt: string;
}

function initials(name: string) {
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [readProgress, setReadProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Reaction state
  const REACTIONS = [
    { key: 'insightful',   label: '🔥 Insightful' },
    { key: 'eye-opening',  label: '💡 Eye-opening' },
    { key: 'actionable',   label: '⚡ Actionable' },
    { key: 'sharing',      label: '🤝 Sharing this' },
  ];
  const storageKey = `reactions-${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const [selected, setSelected] = useState<string | null>(null);
  const [counts, setCounts]     = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(storageKey + '-counts') ?? '{}'); } catch { return {}; }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setSelected(saved);
    } catch { /* ignore */ }
  }, [storageKey]);

  function handleReaction(key: string) {
    if (key === 'sharing') {
      if (navigator.share) {
        navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(window.location.href).then(() => {
          alert('Link copied to clipboard!');
        });
      }
      return;
    }
    setCounts(prev => {
      const next = { ...prev };
      if (selected === key) {
        // deselect — decrement
        next[key] = Math.max(0, (next[key] ?? 1) - 1);
      } else {
        // deselect old
        if (selected && next[selected]) next[selected] = Math.max(0, next[selected] - 1);
        // select new
        next[key] = (next[key] ?? 0) + 1;
      }
      try { localStorage.setItem(storageKey + '-counts', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    const next = selected === key ? null : key;
    setSelected(next);
    try { next ? localStorage.setItem(storageKey, next) : localStorage.removeItem(storageKey); } catch { /* ignore */ }
  }

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article-body');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setReadProgress(Math.min(100, (scrolled / total) * 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );
    const headings = contentRef.current?.querySelectorAll('h2[id], h3[id]');
    headings?.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  // Extract TOC from content
  const tocItems = (() => {
    const matches = [...post.content.matchAll(/<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi)];
    return matches.map(m => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, '') }));
  })();

  const estimatedEmoji = post.readingTime <= 3 ? '⚡' : post.readingTime <= 7 ? '☕' : '📚';

  return (
    <article className={styles.article} id="article-body">

      {/* ── Reading Progress Bar ── */}
      <div className={styles.progressBar} style={{ width: `${readProgress}%` }} />

      {/* ── Dark Cinematic Hero ── */}
      <div className={styles.hero}>
        {/* Background image with parallax-like overlay */}
        <div className={styles.heroBg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt="" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroBgNoise} />
        </div>

        <div className={`${styles.heroContent} container`}>
          {/* Back + breadcrumb */}
          <div className={styles.heroNav}>
            <Link href="/blog" className={styles.back}>
              <span className={styles.backArrow}>←</span> Journal
            </Link>
            <span className={styles.breadDivider}>/</span>
            <span className={styles.breadCurrent}>Article</span>
          </div>

          {/* Tags */}
          <div className={styles.heroTags}>
            {post.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          {/* Title */}
          <h1 className={`${styles.title} display`}>{post.title}</h1>

          {/* Excerpt as a pullquote */}
          <p className={styles.heroExcerpt}>{post.excerpt}</p>

          {/* Byline */}
          <div className={styles.bylineRow}>
            <div className={styles.authorInitials}>{initials(post.author)}</div>
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{post.author}</span>
              <span className={styles.authorRole}>{post.authorRole}</span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaChip}>
              <span className={styles.metaLabel}>Published</span>
              <span className={styles.metaValue}>{formatDate(post.date)}</span>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaChip}>
              <span className={styles.metaLabel}>{estimatedEmoji} Read time</span>
              <span className={styles.metaValue}>{post.readingTime} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className={styles.mainWrap}>

        {/* Left TOC sidebar */}
        {tocItems.length > 0 && (
          <aside className={styles.toc}>
            <p className={styles.tocLabel}>In this article</p>
            <nav className={styles.tocNav}>
              {tocItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${styles.tocItem} ${activeSection === item.id ? styles.tocActive : ''}`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
            {/* Progress ring */}
            <div className={styles.progressRing}>
              <svg viewBox="0 0 36 36" className={styles.progressSvg}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#1A1A1A" strokeWidth="2"
                  strokeDasharray={`${readProgress} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className={styles.progressPct}>{Math.round(readProgress)}%</span>
            </div>
          </aside>
        )}

        {/* Article content */}
        <div className={styles.contentCol}>
          {/* Mobile TOC toggle */}
          {tocItems.length > 0 && (
            <div className={styles.mobileToc}>
              <button
                className={styles.mobileTocBtn}
                onClick={() => setTocOpen(o => !o)}
                type="button"
              >
                <span>📋 Jump to section</span>
                <span className={`${styles.tocChevron} ${tocOpen ? styles.tocChevronOpen : ''}`}>›</span>
              </button>
              {tocOpen && (
                <div className={styles.mobileTocList}>
                  {tocItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={styles.mobileTocItem}
                      onClick={() => setTocOpen(false)}
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Key takeaway box */}
          <div className={styles.keyTakeaway}>
            <span className={styles.keyIcon}>💡</span>
            <div>
              <p className={styles.keyLabel}>Key Takeaway</p>
              <p className={styles.keyText}>{post.excerpt}</p>
            </div>
          </div>

          {/* Body */}
          <div
            ref={contentRef}
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share / reaction strip */}
          <div className={styles.reactionStrip}>
            <p className={styles.reactionLabel}>Was this helpful?</p>
            <div className={styles.reactions}>
              {REACTIONS.map(r => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleReaction(r.key)}
                  className={`${styles.reactionBtn} ${selected === r.key ? styles.reactionBtnActive : ''}`}
                  aria-pressed={selected === r.key}
                  title={r.key === 'sharing' ? 'Share this article' : `React with ${r.label}`}
                >
                  {r.label}
                  {r.key !== 'sharing' && (counts[r.key] ?? 0) > 0 && (
                    <span className={styles.reactionCount}>{counts[r.key]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right sticky sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarAuthor}>
            <div className={styles.sidebarInitials}>{initials(post.author)}</div>
            <div>
              <p className={styles.sidebarName}>{post.author}</p>
              <p className={styles.sidebarRole}>{post.authorRole}</p>
            </div>
          </div>

          <div className={styles.sidebarReadInfo}>
            <span>{estimatedEmoji}</span>
            <span>{post.readingTime} min read</span>
          </div>

          <div className={styles.sidebarTags}>
            {post.tags.map(t => <span key={t} className={styles.sidebarTag}>{t}</span>)}
          </div>

          {/* CTA card */}
          <div className={styles.sidebarCta}>
            <div className={styles.sidebarCtaBadge}>Free Call</div>
            <p className={styles.sidebarCtaTitle}>Ready to put this into practice?</p>
            <p className={styles.sidebarCtaDesc}>Book a free 30-min strategy call with our team.</p>
            <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className={styles.sidebarCtaBtn}>
              Book a Call →
            </a>
          </div>
        </aside>
      </div>

      {/* ── Post CTA strip ── */}
      <div className={styles.postCta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <div className={styles.ctaAuthorRow}>
                <div className={styles.ctaInitials}>{initials(post.author)}</div>
                <div>
                  <p className={styles.ctaAuthorName}>Written by {post.author}</p>
                  <p className={styles.ctaAuthorRole}>{post.authorRole}</p>
                </div>
              </div>
              <h2 className={`${styles.ctaHeading} display`}>
                Put This Into<br />
                <span className={styles.ctaGhost}>Action Today.</span>
              </h2>
              <p className={styles.ctaSub}>
                Book a free 30-minute strategy call. We&apos;ll identify exactly where AI automation
                can make the biggest difference in your business — no commitment required.
              </p>
            </div>
            <div className={styles.ctaRight}>
              <a href="https://cal.com/autonex-ai/30min" target="_blank" rel="noreferrer" className="btn-primary light">
                Book a Free Strategy Call →
              </a>
              <Link href="/blog" className={styles.ctaBack}>← More Articles</Link>
            </div>
          </div>
        </div>
      </div>

    </article>
  );
}
