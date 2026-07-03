import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

// ── Security Headers ─────────────────────────────────────────────────────────
// Applied to every response via Next.js headers() config.
// Covers: XSS, clickjacking, MIME sniffing, HSTS, CSP, Permissions-Policy.
// ─────────────────────────────────────────────────────────────────────────────
const securityHeaders = [
  // Prevent browsers from guessing MIME types (MIME-sniffing attacks)
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Block embedding in iframes (clickjacking prevention)
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Legacy XSS filter for older browsers
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Enforce HTTPS for 2 years (includeSubDomains, preload-ready)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Restrict browser features / APIs
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
    ].join(', '),
  },
  // Content-Security-Policy
  // Allows: self, Google Fonts, Cal.com embed, Unsplash images, Google Analytics
  {
    key: 'Content-Security-Policy',
    value: [
      `default-src 'self'`,
      // Scripts: self + Cal.com embed + GA (relaxed in dev)
      isDev
        ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://www.googletagmanager.com`
        : `script-src 'self' 'unsafe-inline' https://app.cal.com https://www.googletagmanager.com`,
      // Styles: self + Google Fonts + inline (needed for CSS-in-JS)
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      // Fonts: Google Fonts CDN
      `font-src 'self' https://fonts.gstatic.com data:`,
      // Images: self + Unsplash + data URIs
      `img-src 'self' https://images.unsplash.com https://www.gravatar.com data: blob:`,
      // Frames: Cal.com embed
      `frame-src 'self' https://cal.com https://app.cal.com`,
      // Connections: self + Cal.com API + GA
      `connect-src 'self' https://cal.com https://app.cal.com https://www.google-analytics.com https://analytics.google.com`,
      // Media
      `media-src 'self'`,
      // Object (Flash etc) — blocked completely
      `object-src 'none'`,
      // Base URI restriction (prevents base tag injection)
      `base-uri 'self'`,
      // Form action restriction
      `form-action 'self' https://cal.com`,
      // Upgrade insecure requests in production
      ...(isDev ? [] : [`upgrade-insecure-requests`]),
    ].join('; '),
  },
  // Cross-Origin policies
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'cross-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'unsafe-none', // needed for Cal.com iframe
  },
];

const nextConfig: NextConfig = {
  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.gravatar.com' },
    ],
  },

  // Turbopack workspace root (silences the lockfile warning)
  turbopack: {
    root: __dirname,
  },

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Extra cache-control for static assets
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  // Redirect www → non-www (handled at hosting level, but added as safety net)
  async redirects() {
    return [];
  },

  // Powered by header removal (avoid disclosing tech stack)
  poweredByHeader: false,

  // Strict mode for catching React issues early
  reactStrictMode: true,
};

export default nextConfig;
