'use client';
import styles from './Marquee.module.css';

interface Props {
  items: string[];
  speed?: number; /* seconds for one loop */
  dark?: boolean;
}

export default function Marquee({ items, speed = 16, dark = false }: Props) {
  // Duplicate to create seamless loop
  const all = [...items, ...items];
  return (
    <div className={`${styles.root} ${dark ? styles.dark : ''}`} aria-hidden="true">
      <div
        className={styles.track}
        style={{ animationDuration: `${speed}s` }}
      >
        {all.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.sep}>—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
