import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Autonex AI — Automate Today. Lead Tomorrow.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), 'public/images/main-autonex-logo-mid.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

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
            gap: 16,
            marginBottom: 'auto',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Autonex AI Logo"
            width={64}
            height={64}
            style={{ objectFit: 'contain' }}
          />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 700, letterSpacing: 4 }}>
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
