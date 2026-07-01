import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── In-memory rate store (resets on cold start — use Redis/KV in production) ──
const ipStore = new Map<string, { count: number; resetAt: number }>();
const LIMIT   = 60;   // requests per window
const WINDOW  = 60_000; // 1 minute in ms

function getRealIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + WINDOW });
    return false;
  }

  entry.count++;
  if (entry.count > LIMIT) return true;
  return false;
}

// Clean up stale entries every 5 minutes to prevent memory leaks
let lastCleanup = Date.now();
function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60_000) return;
  lastCleanup = now;
  for (const [ip, entry] of ipStore.entries()) {
    if (now > entry.resetAt) ipStore.delete(ip);
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Rate limiting ──────────────────────────────────────────────────────────
  maybeCleanup();
  const ip = getRealIp(req);
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60', 'Content-Type': 'text/plain' },
    });
  }

  // ── Block common scanner/attacker paths ────────────────────────────────────
  const BLOCKED_PATHS = [
    '/wp-admin', '/wp-login', '/.env', '/xmlrpc', '/phpmyadmin',
    '/admin', '/.git', '/config.php', '/shell', '/cmd',
    '/vendor', '/actuator', '/.aws', '/.ssh',
  ];
  for (const blocked of BLOCKED_PATHS) {
    if (pathname.startsWith(blocked)) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // ── Block SQLi / XSS / path-traversal in URL ──────────────────────────────
  const url = req.nextUrl.toString();
  const MALICIOUS = [
    /(<script|javascript:|data:text\/html|vbscript:)/i,
    /(union\s+select|select\s+.*\s+from|insert\s+into|drop\s+table|exec\s*\()/i,
    /\.\.\//,
  ];
  for (const pattern of MALICIOUS) {
    if (pattern.test(url)) return new NextResponse('Bad Request', { status: 400 });
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', pathname.startsWith('/api/') ? 'noindex, nofollow' : 'index, follow');
  return res;
}

export const config = {
  // Apply to all routes except static assets and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images|manifest.json|sitemap.xml|robots.txt).*)',
  ],
};
