'use client';
import styles from './LiquidHeroBg.module.css';

export default function LiquidHeroBg() {
  return (
    <div className={styles.root}>
      {/* Animated blob layers */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      <div className={styles.blob4} />
      <div className={styles.blob5} />
      {/* Prism conic sweep */}
      <div className={styles.prism} />
      {/* Noise texture */}
      <div className={styles.noise} />
      {/* Fine grid */}
      <div className={styles.grid} />
      {/* Inner vignette to keep content readable */}
      <div className={styles.vignette} />
    </div>
  );
}
