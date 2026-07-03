import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { createHmac } from 'crypto';

function generateToken(email: string): string {
  const secret = process.env.NEWSLETTER_SECRET ?? 'autonex-newsletter-secret-2026';
  return createHmac('sha256', secret).update(email.toLowerCase()).digest('hex');
}

const DATA_FILE = join(process.cwd(), 'data', 'subscribers.json');

interface Subscriber {
  email: string;
  subscribedAt: string;
  token: string;
}

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw).subscribers ?? [];
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify({ subscribers }, null, 2), 'utf-8');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.toLowerCase().trim();
  const token = searchParams.get('token');

  if (!email || !token) {
    return new NextResponse(unsubscribePage('Invalid unsubscribe link.', false), {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  const expectedToken = generateToken(email);
  if (token !== expectedToken) {
    return new NextResponse(unsubscribePage('Invalid or expired unsubscribe link.', false), {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  const subscribers = await readSubscribers();
  const filtered = subscribers.filter(s => s.email !== email);

  if (filtered.length === subscribers.length) {
    // Email wasn't found — already unsubscribed
    return new NextResponse(unsubscribePage("You're already unsubscribed.", true), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  await writeSubscribers(filtered);

  return new NextResponse(unsubscribePage("You've been successfully unsubscribed.", true), {
    headers: { 'Content-Type': 'text/html' },
  });
}

function unsubscribePage(message: string, success: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${success ? 'Unsubscribed' : 'Error'} — Autonex AI</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #05050a; color: #fff; font-family: 'Helvetica Neue', sans-serif;
           display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px 20px; }
    .card { max-width: 480px; width: 100%; text-align: center; }
    .icon { font-size: 48px; margin-bottom: 24px; }
    h1 { font-size: 32px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 16px; color: #fff; }
    p { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.5); margin-bottom: 32px; }
    a { display: inline-block; padding: 14px 28px; background: #fff; color: #05050a;
        font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
        text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${success ? '✓' : '✗'}</div>
    <h1>${success ? 'Unsubscribed' : 'Oops'}</h1>
    <p>${message}</p>
    <a href="https://www.autonexai.org">Back to Autonex AI →</a>
  </div>
</body>
</html>`;
}
