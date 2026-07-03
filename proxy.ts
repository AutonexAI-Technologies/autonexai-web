import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── In-memory rate store (resets on cold start — use Redis/KV in production) ──
const ipStore = new Map<string, { count: number; resetAt: number }>();
const LIMIT   = 60;     // requests per window
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
  return entry.count > LIMIT;
}

let lastCleanup = Date.now();
function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60_000) return;
  lastCleanup = now;
  for (const [ip, entry] of ipStore.entries()) {
    if (now > entry.resetAt) ipStore.delete(ip);
  }
}

// ── Admin session gate ────────────────────────────────────────────────────
const ADMIN_PATHS   = ['/careers/admin'];
const COOKIE_NAME   = 'autonex_admin_session';
const ADMIN_SECRET  = process.env.ADMIN_SECRET ?? 'autonex-admin-2026';

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
}

function isAuthorised(req: NextRequest): boolean {
  return (req.cookies.get(COOKIE_NAME)?.value ?? '') === ADMIN_SECRET;
}

const ADMIN_GATE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Admin Access — Autonex AI</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#05050a;color:#fff;font-family:'Helvetica Neue',sans-serif;
         min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{text-align:center;max-width:400px;width:100%;border:1px solid rgba(255,255,255,0.08);padding:48px 36px}
    .icon{font-size:36px;margin-bottom:20px}
    h1{font-size:28px;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:10px;font-weight:900}
    p{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;margin-bottom:28px}
    form{display:flex;flex-direction:column;gap:10px}
    input{padding:13px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);
          color:#fff;font-size:14px;outline:none;width:100%}
    input:focus{border-color:rgba(255,255,255,0.35)}
    button{padding:16px;background:#fff;color:#05050a;font-size:11px;font-weight:700;
           letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer}
    .err{font-size:12px;color:#f87171;background:rgba(239,68,68,0.08);
         border:1px solid rgba(239,68,68,0.2);padding:8px 12px;display:none;text-align:left}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🔐</div>
    <h1>Admin Access</h1>
    <p>Restricted to authorised Autonex AI team members only.</p>
    <form method="POST" action="/api/careers/admin-login">
      <input type="password" name="password" placeholder="Enter admin password" required autofocus />
      <div class="err" id="err">Incorrect password — try again.</div>
      <button type="submit">Unlock →</button>
    </form>
  </div>
  <script>if(location.search.includes('err=1'))document.getElementById('err').style.display='block';</script>
</body>
</html>`;

// ── Main proxy function ───────────────────────────────────────────────────
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── 1. Admin gate (check before rate limiting) ─────────────────────────
  if (isAdminPath(pathname)) {
    if (!isAuthorised(req)) {
      const hasError = req.nextUrl.searchParams.get('err') === '1';
      return new NextResponse(
        hasError
          ? ADMIN_GATE_HTML.replace('<div class="err" id="err">', '<div class="err" id="err" style="display:block">')
          : ADMIN_GATE_HTML,
        { status: 401, headers: { 'Content-Type': 'text/html' } }
      );
    }
    return NextResponse.next();
  }

  // ── 2. Rate limiting ────────────────────────────────────────────────────
  maybeCleanup();
  const ip = getRealIp(req);
  if (isRateLimited(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60', 'Content-Type': 'text/plain' },
    });
  }

  // ── 3. Block common scanner/attacker paths ─────────────────────────────
  const BLOCKED_PATHS = [
    '/wp-admin', '/wp-login', '/.env', '/xmlrpc', '/phpmyadmin',
    '/.git', '/config.php', '/shell', '/cmd',
    '/vendor', '/actuator', '/.aws', '/.ssh',
  ];
  for (const blocked of BLOCKED_PATHS) {
    if (pathname.startsWith(blocked)) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // ── 4. Block SQLi / XSS / path-traversal in URL ───────────────────────
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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images|manifest.json|sitemap.xml|robots.txt).*)',
  ],
};
