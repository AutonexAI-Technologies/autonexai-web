/**
 * POST /api/newsletter/notify-new-post
 *
 * Webhook endpoint — call this after publishing a new blog post.
 * It reads all subscribers from data/subscribers.json and sends
 * each one a branded email with the new article preview.
 *
 * Authentication: Bearer token via NEWSLETTER_SECRET env var
 *
 * Body: { slug: string }
 *
 * Example curl:
 *   curl -X POST https://www.autonexai.org/api/newsletter/notify-new-post \
 *        -H "Authorization: Bearer <NEWSLETTER_SECRET>" \
 *        -H "Content-Type: application/json" \
 *        -d '{"slug":"my-new-post-slug"}'
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { createHmac } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import nodemailer from 'nodemailer';

const SECRET    = process.env.NEWSLETTER_SECRET ?? 'autonex-newsletter-secret-2026';
const DATA_FILE = join(process.cwd(), 'data', 'subscribers.json');
const BLOG_DIR  = join(process.cwd(), 'content', 'blog');
const BASE_URL  = 'https://www.autonexai.org';

// ── Auth ──────────────────────────────────────────────────────────────────
function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return token === SECRET;
}

// ── Helpers ────────────────────────────────────────────────────────────────
interface Subscriber { email: string; subscribedAt: string; token: string; }

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw).subscribers ?? [];
  } catch { return []; }
}

function generateToken(email: string): string {
  return createHmac('sha256', SECRET).update(email.toLowerCase()).digest('hex');
}

interface PostMeta {
  title: string; excerpt?: string; date?: string;
  author?: string; coverImage?: string;
}

function readPost(slug: string): PostMeta | null {
  for (const ext of ['.md', '.mdx']) {
    const filePath = join(BLOG_DIR, `${slug}${ext}`);
    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, 'utf-8');
      return matter(raw).data as PostMeta;
    }
  }
  return null;
}

function buildHtml(meta: PostMeta, slug: string, email: string, token: string): string {
  const postUrl = `${BASE_URL}/blog/${slug}`;
  const unsubUrl = `${BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
  const dateStr = meta.date
    ? new Date(meta.date).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric', timeZone:'Asia/Kolkata' })
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#05050a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05050a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:0 0 32px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <a href="${BASE_URL}/blog" style="font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);text-decoration:none;">AUTONEX AI JOURNAL — NEW ARTICLE</a>
        </td></tr>
        ${meta.coverImage ? `<tr><td style="padding-top:32px;"><img src="${BASE_URL}${meta.coverImage}" alt="${meta.title}" width="600" style="display:block;width:100%;height:auto;" /></td></tr>` : ''}
        <tr><td style="padding:40px 0 32px;">
          ${dateStr ? `<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);">${dateStr}</p>` : ''}
          <h1 style="margin:0 0 20px;font-size:36px;line-height:1.1;color:#fff;font-weight:900;">${meta.title}</h1>
          ${meta.excerpt ? `<p style="margin:0 0 32px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.55);">${meta.excerpt}</p>` : ''}
          <a href="${postUrl}" style="display:inline-block;padding:16px 32px;background:#fff;color:#05050a;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;">Read the Article →</a>
        </td></tr>
        <tr><td style="padding:24px 0 0;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6;">
            You're receiving this because you subscribed to the Autonex AI Journal.<br />
            <a href="${unsubUrl}" style="color:rgba(255,255,255,0.35);text-decoration:underline;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── POST ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let slug: string;
  try {
    const body = await req.json();
    slug = body.slug;
    if (!slug) throw new Error('slug required');
  } catch {
    return NextResponse.json({ error: 'Body must be { slug: string }' }, { status: 400 });
  }

  const meta = readPost(slug);
  if (!meta) {
    return NextResponse.json({ error: `Post not found: ${slug}` }, { status: 404 });
  }

  const subscribers = await readSubscribers();
  if (subscribers.length === 0) {
    return NextResponse.json({ message: 'No subscribers yet.', sent: 0, failed: 0 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS },
  });

  let sent = 0, failed = 0;

  for (const sub of subscribers) {
    const token = generateToken(sub.email);
    try {
      await transporter.sendMail({
        from: `"Autonex AI Journal" <${process.env.GMAIL_USER}>`,
        to: sub.email,
        subject: `📰 New: ${meta.title}`,
        html: buildHtml(meta, slug, sub.email, token),
      });
      sent++;
    } catch (err) {
      console.error(`[notify] failed for ${sub.email}:`, err);
      failed++;
    }
  }

  return NextResponse.json({
    message: `Notifications sent. ✓ ${sent} delivered, ✗ ${failed} failed.`,
    sent,
    failed,
  });
}
