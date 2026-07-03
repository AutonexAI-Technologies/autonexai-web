import { readFileSync } from 'fs';
import { join } from 'path';
import { ImageResponse } from 'next/og';

export const alt = 'Autonex AI — Automate Today. Lead Tomorrow.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/jpeg';

export default function OGImage() {
  // Serve the tag-preview-card.jpeg directly as the OG image
  const imageData = readFileSync(join(process.cwd(), 'public/images/tag-preview-card.jpeg'));
  const base64 = `data:image/jpeg;base64,${imageData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={base64}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size }
  );
}
