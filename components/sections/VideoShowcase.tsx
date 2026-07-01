'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './VideoShowcase.module.css';

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8% 0px' });

  // Video starts PAUSED and UNMUTED — clicking play gives sound by default
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // tracks if user has clicked play

  /* Preload the video when it enters the viewport */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isInView) return;
    vid.load(); // preload without playing
  }, [isInView]);

  const handleFirstPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setStarted(true);
    // Play with sound ON — user interaction satisfies browser policy
    vid.muted = false;
    vid.play()
      .then(() => { setPlaying(true); setMuted(false); })
      .catch(() => {
        // Browser still blocked — fall back to muted play
        vid.muted = true;
        setMuted(true);
        vid.play().then(() => setPlaying(true)).catch(() => {});
      });
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (!started) { handleFirstPlay(); return; }
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <section ref={sectionRef} className={styles.section} id="showcase">

      {/* Header row */}
      <motion.div
        className={`${styles.header} container`}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>See It In Action</span>
          <h2 className={`${styles.headline} display`}>
            What We Build,{' '}
            <em className={styles.headlineAccent}>in Motion.</em>
          </h2>
        </div>
        <p className={styles.headerRight}>
          Real systems. Real results. See the precision and craft behind every Autonex build.
        </p>
      </motion.div>

      {/* Double-bezel video container */}
      <motion.div
        className={`${styles.outerWrap} container`}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.outerBezel}>
          <div className={styles.innerBezel}>

            <video
              ref={videoRef}
              className={styles.video}
              loop
              playsInline
              preload="auto"
              /* No autoPlay / no muted attr — starts paused, plays with sound on first click */
            >
              <source src="/video/autonex.mp4" type="video/mp4" />
            </video>

            {/* Inset highlight rim */}
            <div className={styles.insetHighlight} />

            {/* Big play overlay — shown before first play */}
            {!started && (
              <div
                className={styles.playOverlay}
                onClick={handleFirstPlay}
                role="button"
                tabIndex={0}
                aria-label="Play video with sound"
                onKeyDown={(e) => e.key === 'Enter' && handleFirstPlay()}
              >
                <div className={styles.playRing}>
                  <div className={styles.playCircle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a0a0f">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <span className={styles.playLabel}>Play with Sound</span>
              </div>
            )}

            {/* Bottom controls bar — shown after first play */}
            <div className={styles.controlsBar}>

              {/* Left: live label */}
              <div className={styles.liveLabel}>
                <span className={`${styles.liveDot} ${playing ? styles.liveDotActive : ''}`} />
                Autonex AI · {playing ? 'Playing' : 'Paused'}
              </div>

              {/* Right: play/pause + mute */}
              <div className={styles.btnGroup}>
                <button
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause' : 'Play'}
                  className={styles.ctrlBtn}
                  id="video-play-toggle"
                >
                  {playing ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  className={`${styles.ctrlBtn} ${!muted && started ? styles.ctrlBtnActive : ''}`}
                  id="video-mute-toggle"
                >
                  {muted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className={`${styles.statsRow} container`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { num: '72h',  label: 'Average Go-Live Time' },
          { num: '100%', label: 'Custom-Built, No Templates' },
          { num: '8+',   label: 'Service Areas' },
          { num: '24/7', label: 'Systems Run Autonomously' },
        ].map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </motion.div>

    </section>
  );
}
