import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { resolveMx } from 'dns';
import { promisify } from 'util';
import nodemailer from 'nodemailer';
import { neon } from '@neondatabase/serverless';

const resolveMxAsync = promisify(resolveMx);

// ── Neon SQL client ────────────────────────────────────────────────────────────
function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  return neon(url);
}

// ── Ensure subscribers table exists ───────────────────────────────────────────
async function ensureTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id         SERIAL PRIMARY KEY,
      email      TEXT UNIQUE NOT NULL,
      token      TEXT NOT NULL,
      subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

// ── Disposable / known-spam email domains ──────────────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'fakeinbox.com', 'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com',
  'grr.la', 'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.de',
  'guerrillamail.net', 'guerrillamail.org', 'spam4.me', 'trashmail.com',
  'trashmail.me', 'trashmail.net', 'dispostable.com', 'maildrop.cc',
  'mailnull.com', 'spamgourmet.com', 'trashmail.at', 'spamgourmet.net',
  'spamgourmet.org', 'tempr.email', 'discard.email', 'spamhereplease.com',
  'spamtraps.uk', 'spamtrap.ro', '10minutemail.com', '10minutemail.net',
  'minutemail.com', 'getairmail.com', 'mailnesia.com', 'nowmymail.com',
  'spamavert.com', 'trashmail.io', 'inboxbear.com', 'spamevader.com',
  'binkmail.com', 'safetymail.info', 'tempinbox.com', 'emkei.cz',
  'mailfreeonline.com', 'filzmail.com', 'mailnew.com', 'throwam.com',
  'anonbox.net', 'spamfree24.org', 'tempmailo.com', 'zzrgg.com',
]);

// ── HMAC token for unsubscribe links ──────────────────────────────────────────
function generateToken(email: string): string {
  const secret = process.env.NEWSLETTER_SECRET ?? 'autonex-nl-secret-2026-xK9mP3qR7vL2nJ5w';
  return createHmac('sha256', secret).update(email.toLowerCase()).digest('hex');
}

// ── Validate email format ──────────────────────────────────────────────────────
function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ── Check MX records (verifies domain can receive email) ──────────────────────
async function hasMxRecord(domain: string): Promise<boolean> {
  try {
    const records = await resolveMxAsync(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

// ── Send welcome email ─────────────────────────────────────────────────────────
async function sendWelcomeEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  const unsubscribeUrl = `https://www.autonexai.org/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;

  await transporter.sendMail({
    from: `"Autonex AI" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '🎉 You\'re in — Welcome to the Autonex AI Journal',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;background:#05050a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#05050a;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
              <!-- Header -->
              <tr><td style="padding:0 0 32px;border-bottom:1px solid rgba(255,255,255,0.08);">
                <span style="font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);">AUTONEX AI JOURNAL</span>
              </td></tr>
              <!-- Body -->
              <tr><td style="padding:48px 0 40px;">
                <h1 style="margin:0 0 20px;font-size:48px;line-height:1;color:#fff;font-weight:900;letter-spacing:-1px;">
                  You're in.
                </h1>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.6);">
                  Welcome to the Autonex AI Journal — practical, no-fluff insights on AI automation, 
                  web development, and building businesses that scale.
                </p>
                <p style="margin:0 0 32px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.6);">
                  Expect weekly articles from our team. We'll never spam you — only the good stuff.
                </p>
                <a href="https://www.autonexai.org/blog" 
                   style="display:inline-block;padding:16px 32px;background:#fff;color:#05050a;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;">
                  Explore the Blog →
                </a>
              </td></tr>
              <!-- Footer -->
              <tr><td style="padding:24px 0 0;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6;">
                  You're receiving this because you subscribed at autonexai.org.<br />
                  <a href="${unsubscribeUrl}" style="color:rgba(255,255,255,0.35);text-decoration:underline;">Unsubscribe</a>
                </p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}

// ── Notify company of new subscriber ──────────────────────────────────────────
async function notifyCompany(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Autonex AI Website" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_TO,
    subject: `📬 New Newsletter Subscriber: ${email}`,
    html: `
      <p><strong>New newsletter subscriber:</strong> ${email}</p>
      <p>Subscribed at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
    `,
  });
}

// ── POST handler ───────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();

    // Format check
    if (!isValidEmailFormat(trimmed)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const domain = trimmed.split('@')[1];

    // Disposable domain check
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: 'Disposable email addresses are not allowed. Please use your real email.' },
        { status: 400 },
      );
    }

    // MX record check (verifies domain actually exists and can receive mail)
    const hasMx = await hasMxRecord(domain);
    if (!hasMx) {
      return NextResponse.json(
        { error: 'This email domain does not appear to exist. Please check and try again.' },
        { status: 400 },
      );
    }

    // Ensure the table exists (wrapped in try-catch so it won't crash if table already exists or due to permission checks)
    try {
      await ensureTable();
    } catch (dbErr) {
      console.warn('ensureTable warning:', dbErr);
    }

    const sql = getDb();
    const token = generateToken(trimmed);

    // Insert — if email already exists the ON CONFLICT clause skips silently
    const result = await sql`
      INSERT INTO subscribers (email, token)
      VALUES (${trimmed}, ${token})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;

    // If no row was returned the email was already in the DB
    if (result.length === 0) {
      return NextResponse.json(
        { message: 'You\'re already subscribed! 🎉 Check your inbox for our latest articles.' },
        { status: 200 },
      );
    }

    // Await sending emails so Vercel doesn't freeze before mail is sent
    await Promise.all([
      sendWelcomeEmail(trimmed, token).catch(err => console.error('Welcome email failed:', err)),
      notifyCompany(trimmed).catch(err => console.error('Company notification failed:', err)),
    ]);

    return NextResponse.json(
      { message: 'Subscribed successfully! Welcome to the journal. 🎉' },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('[newsletter/subscribe]', err);
    return NextResponse.json({ error: err?.message || 'Something went wrong. Please try again.', details: err?.stack || String(err) }, { status: 500 });
  }
}
