'use client';
import { motion } from 'framer-motion';
import styles from './OrbitRing.module.css';

const ITEMS = [
  { icon: '🌐', label: 'Web Dev', color: 'rgba(88,28,255,0.7)' },
  { icon: '💬', label: 'AI Agents', color: 'rgba(0,200,200,0.7)' },
  { icon: '🎯', label: 'Lead Gen', color: 'rgba(255,80,40,0.7)' },
  { icon: '✍️', label: 'Content', color: 'rgba(200,50,255,0.7)' },
  { icon: '⚙️', label: 'Automation', color: 'rgba(40,180,255,0.7)' },
  { icon: '📞', label: 'Voice AI', color: 'rgba(255,200,0,0.7)' },
  { icon: '📊', label: 'Analytics', color: 'rgba(0,255,140,0.7)' },
  { icon: '📄', label: 'Documents', color: 'rgba(255,100,180,0.7)' },
];

const RADIUS = 130; // px

export default function OrbitRing() {
  return (
    <div className={styles.root}>
      {/* Outer ring track */}
      <div className={styles.track} />
      <div className={styles.trackInner} />

      {/* Central core */}
      <div className={styles.core}>
        <motion.div
          className={styles.corePulse}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className={styles.coreLabel}>AI</span>
        <span className={styles.coreSubLabel}>AUTONEX</span>
      </div>

      {/* Orbiting nodes */}
      <motion.div
        className={styles.ring}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        {ITEMS.map((item, i) => {
          const angle = (i / ITEMS.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * RADIUS;
          const y = Math.sin(rad) * RADIUS;

          return (
            <motion.div
              key={item.label}
              className={styles.node}
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              <div className={styles.nodeInner} style={{ '--glow': item.color } as React.CSSProperties}>
                <span className={styles.nodeIcon}>{item.icon}</span>
              </div>
              <span className={styles.nodeLabel}>{item.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
