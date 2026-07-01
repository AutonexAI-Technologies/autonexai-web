'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ParallaxImage.module.css';

interface Props {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // 0.1 to 0.3
}

export default function ParallaxImage({ src, alt, className = '', speed = 0.15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`} aria-hidden="true">
      <motion.div className={styles.inner} style={{ y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={styles.img} />
      </motion.div>
    </div>
  );
}
