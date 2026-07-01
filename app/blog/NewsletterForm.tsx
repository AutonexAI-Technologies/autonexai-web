'use client';
import styles from './blog.module.css';

export default function NewsletterForm() {
  return (
    <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className={styles.newsletterInput}
        required
      />
      <button type="submit" className="btn-primary">
        Subscribe →
      </button>
    </form>
  );
}
