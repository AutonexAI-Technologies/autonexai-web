import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'autonex-admin-2026';
const COOKIE_NAME  = 'autonex_admin_session';

// Called by the middleware's inline HTML form (POST with form body)
// and also by the client-side admin (JSON body)
export async function POST(req: NextRequest) {
  let password = '';

  const ct = req.headers.get('content-type') ?? '';

  if (ct.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    password = body.password ?? '';
  } else {
    // form-urlencoded from the middleware HTML gate
    const text = await req.text();
    const params = new URLSearchParams(text);
    password = params.get('password') ?? '';
  }

  if (password !== ADMIN_SECRET) {
    // If it's an HTML form post, redirect back with error flag
    if (!ct.includes('application/json')) {
      return NextResponse.redirect(new URL('/careers/admin?err=1', req.url), 302);
    }
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  // ✅ Correct — set httpOnly session cookie and redirect to admin
  const response = ct.includes('application/json')
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL('/careers/admin', req.url), 302);

  response.cookies.set(COOKIE_NAME, ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/careers/admin',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}
