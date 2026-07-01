import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/lib/blog';
import BlogClient from './BlogClient';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — AI Automation, Web Dev & Business Growth | Autonex AI',
  description: 'Practical guides on AI automation, web development, lead generation, and building systems that scale. From the Autonex AI team.',
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerBgImage} />
        <div className={styles.headerBgOverlay} />
        <div className="container">
          <div className={styles.headerInner}>
            <p className={styles.headerLabel}>[Journal] — Insights & Guides</p>
            <h1 className={`${styles.heading} display`}>
              The Autonex<br />
              <span className={styles.ghost}>Journal.</span>
            </h1>
            <p className={styles.sub}>
              <strong>No fluff. No gatekeeping. Practical, actionable insights on AI automation,
              web development, and building businesses that operate at scale.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive content (filter + posts + newsletter) ── */}
      <BlogClient posts={posts} />
    </div>
  );
}
