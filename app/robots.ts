import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers
        userAgent: '*',
        allow: '/',
        // Block private/internal paths
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/draft/',
          '/*.json$',
        ],
      },
      // Block known bad bots / scrapers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
          'DataForSeoBot',
          'PetalBot',
          'Bytespider',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.autonexai.org/sitemap.xml',
    host: 'https://www.autonexai.org',
  };
}
