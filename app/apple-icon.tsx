import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#05050a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: 80,
              fontWeight: 900,
              fontFamily: 'sans-serif',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            A
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
