import { ImageResponse } from 'next/og';

export const alt = 'Autonex AI — Automate Today. Lead Tomorrow.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#05050a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 70% at 0% 100%, rgba(88,28,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 90% 10%, rgba(0,200,180,0.1) 0%, transparent 55%)',
          }}
        />
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 'auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            A
          </div>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, letterSpacing: 3 }}>
            AUTONEX AI
          </span>
        </div>

        {/* Heading */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.9,
              letterSpacing: -3,
            }}
          >
            Automate Today.
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'rgba(255,255,255,0.2)',
              lineHeight: 0.9,
              letterSpacing: -3,
            }}
          >
            Lead Tomorrow.
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: 24,
              fontSize: 18,
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            AI Automation &amp; Web Development for Ambitious Businesses
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
