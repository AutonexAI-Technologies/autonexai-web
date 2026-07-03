import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Autonex AI — Automate Today. Lead Tomorrow.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  // Load logo-black.png as base64
  const logoData = readFileSync(join(process.cwd(), 'public/images/logo-black.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#030308',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px 90px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.18) 0%, transparent 60%), radial-gradient(circle at 90% 10%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)',
          }}
        />

        {/* Tech Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing border/accent on left side */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            background: 'linear-gradient(to bottom, #8b5cf6, #06b6d4)',
          }}
        />

        {/* Header Section (Logo + Brand) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Autonex AI Logo"
            width={72}
            height={72}
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.3))',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: '#ffffff',
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 6,
                lineHeight: 1,
              }}
            >
              AUTONEX AI
            </span>
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              TECHNOLOGIES
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.0,
                letterSpacing: -2,
              }}
            >
              Automate Today.
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                color: '#06b6d4',
                lineHeight: 1.0,
                letterSpacing: -2,
              }}
            >
              Lead Tomorrow.
            </div>
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: '850px',
              marginTop: 10,
            }}
          >
            We build high-performance websites and AI automation systems that eliminate manual work and help your business scale faster.
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 24,
          }}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 14, letterSpacing: 1 }}>
            AI Agents • CRM Integration • Custom Web Builds
          </span>
          <span
            style={{
              color: '#8b5cf6',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            autonexai.org
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
