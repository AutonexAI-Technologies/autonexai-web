'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { BlogMeta } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import styles from './blog.module.css';
import NewsletterForm from './NewsletterForm';

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const TOPICS = ['All', 'AI', 'Automation', 'Web Development', 'Lead Generation', 'Business Growth', 'CRM', 'Sales'];

interface Props { posts: BlogMeta[] }

export default function BlogClient({ posts }: Props) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? posts
    : posts.filter(p => p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* ── Topic filters ── */}
      <div className={styles.topics}>
        <div className="container">
          <div className={styles.topicList}>
            {TOPICS.map(t => (
              <button
                key={t}
                onClick={() => setActiveFilter(t)}
                className={`${styles.topic} ${activeFilter === t ? styles.topicActive : ''}`}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── No results ── */}
      {filtered.length === 0 && (
        <div className="container">
          <div className={styles.empty}>
            <p>No articles tagged <strong>{activeFilter}</strong> yet — check back soon.</p>
            <button className={styles.emptyReset} onClick={() => setActiveFilter('All')}>
              View all articles →
            </button>
          </div>
        </div>
      )}

      {/* ── Featured post ── */}
      {featured && (
        <div className={styles.featured}>
          <div className="container">
            <p className={styles.featuredLabel}>
              {activeFilter === 'All' ? 'Featured Article' : `${activeFilter} — Latest`}
            </p>
            <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.coverImage} alt={featured.title} />
                <div className={styles.featuredImgOverlay} />
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.featuredTags}>
                  {featured.tags.map(t => <span key={t} className={styles.featuredTag}>{t}</span>)}
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.featuredMeta}>
                  <div className={styles.featuredAvatar}>{initials(featured.author)}</div>
                  <div className={styles.featuredMetaInfo}>
                    <span className={styles.featuredAuthor}>{featured.author}</span>
                    <span className={styles.featuredDate}>{formatDate(featured.date)}</span>
                  </div>
                  <span className={styles.featuredReadTime}>{featured.readingTime} min read</span>
                  <span className={styles.featuredArrow}>Read Article →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ── Articles grid ── */}
      {rest.length > 0 && (
        <div className={styles.grid}>
          <div className="container">
            <p className={styles.gridLabel}>More Articles</p>
            <div className={styles.gridPosts}>
              {rest.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.postCard}>
                  <div className={styles.postImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImage} alt={post.title} className={styles.postImg} />
                    <div className={styles.postImageOverlay} />
                    <span className={styles.postReadTime}>{post.readingTime} min</span>
                  </div>
                  <div className={styles.postBody}>
                    <div className={styles.postTags}>
                      {post.tags.slice(0, 2).map(t => <span key={t} className={styles.postTag}>{t}</span>)}
                    </div>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <div className={styles.postAvatar}>{initials(post.author)}</div>
                      <div className={styles.postMetaInfo}>
                        <span className={styles.postAuthor}>{post.author}</span>
                        <span className={styles.postDate}>{formatDate(post.date)}</span>
                      </div>
                      <span className={styles.postArrow}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Newsletter strip ── */}
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterLeft}>
              <h2 className={`${styles.newsletterHeading} display`}>
                Get the Insights<br />
                <span className={styles.newsletterGhost}>First.</span>
              </h2>
              <p className={styles.newsletterSub}>
                Practical insights on AI automation, web development, and building businesses
                that scale. Delivered weekly. No spam.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </>
  );
}
