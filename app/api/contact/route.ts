/**
 * ── Contact Form API Route ────────────────────────────────────────────────────
 *
 * POST /api/contact
 *
 * 1. Server-side validation + spam checks
 * 2. Logs full submission to console (always, so nothing is ever lost)
 * 3. Sends Autonex notification email to CONTACT_TO
 * 4. Sends "Thank you" confirmation email to the user
 *
 * Required in .env.local:
 *   GMAIL_USER      — Gmail address that sends (e.g. autonexai.org@gmail.com)
 *   GMAIL_APP_PASS  — 16-char Google App Password (NOT the Gmail login password)
 *   CONTACT_TO      — inbox to receive submissions (e.g. autonexai.org@gmail.com)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { sanitize, isValidEmail, isLikelyRealName } from '@/lib/sanitize';
import { isValidInternationalPhone } from '@/lib/countries';

/* ── Rate-limit store (in-memory per process) ── */
const ipTimestamps = new Map<string, number[]>();
const RATE_LIMIT    = 3;
const RATE_WINDOW   = 60_000; // ms

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const start = now - RATE_WINDOW;
  const times = (ipTimestamps.get(ip) ?? []).filter(t => t > start);
  if (times.length >= RATE_LIMIT) return true;
  times.push(now);
  ipTimestamps.set(ip, times);
  return false;
}

/* ── Helpers ── */
function json(body: object, status = 200) {
  return Response.json(body, { status });
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const rawPass = process.env.GMAIL_APP_PASS ?? '';
  // Strip spaces — Google shows App Passwords in groups of 4 (e.g. "xwgr fors blkx gmfc")
  const pass = rawPass.replace(/\s/g, '');

  if (!user || pass.length < 16 || pass.startsWith('REPLACE')) {
    console.warn('[Contact API] ⚠️  Gmail not configured — emails skipped (submission still logged above).');
    return null;
  }

  console.log(`[Contact API] Transporter ready — user: ${user}, pass length: ${pass.length}`);

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

/* ══════════════════ Notification email (to Autonex) ══════════════════ */
function buildNotificationEmail(data: {
  name: string; email: string; phone: string; dialCode: string;
  company: string; service: string; message: string; ip: string;
}) {
  const { name, email, phone, dialCode, company, service, message, ip } = data;
  const submitted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const firstName = name.split(' ')[0];

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Lead</title></head>
<body style="margin:0;padding:0;background:#EAEAEA;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EAEAEA;">
<tr><td align="center" style="padding:32px 16px;">

  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;">

    <!-- ── TOP BANNER ── -->
    <tr>
      <td style="background:#05050a;padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:6px;background:#ffffff;"></td>
            <td style="padding:22px 28px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.45);font-weight:700;">Autonex AI &nbsp;·&nbsp; Website Lead</p>
              <p style="margin:6px 0 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.01em;">🔔&nbsp; New Enquiry Received</p>
            </td>
            <td style="padding:22px 28px;text-align:right;vertical-align:middle;">
              <span style="display:inline-block;background:rgba(255,255,255,0.12);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:6px 14px;">RESPOND WITHIN 24H</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── LEAD HERO ── -->
    <tr>
      <td style="background:#f8f8f7;padding:28px 32px;border-bottom:2px solid #e5e7eb;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="vertical-align:middle;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;font-weight:700;">From</p>
              <p style="margin:0;font-size:26px;font-weight:800;color:#05050a;letter-spacing:0.01em;line-height:1.1;">${name}</p>
              ${company ? `<p style="margin:6px 0 0;font-size:14px;color:#6b7280;font-weight:500;">${company}</p>` : ''}
            </td>
            <td style="text-align:right;vertical-align:top;padding-left:16px;">
              ${service ? `<span style="display:inline-block;background:#05050a;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:6px 14px;">${service}</span>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── CONTACT DETAILS ── -->
    <tr>
      <td style="padding:24px 32px 0;">
        <p style="margin:0 0 14px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#9ca3af;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Contact Details</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">

          <tr>
            <td style="width:140px;padding:10px 0;border-bottom:1px solid #f0f0ef;vertical-align:top;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Email</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0ef;vertical-align:top;">
              <a href="mailto:${email}" style="font-size:14px;color:#1d4ed8;text-decoration:none;font-weight:600;">${email}</a>
            </td>
          </tr>

          ${phone ? `
          <tr>
            <td style="width:140px;padding:10px 0;border-bottom:1px solid #f0f0ef;vertical-align:top;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Phone</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0ef;vertical-align:top;">
              <a href="tel:${dialCode}${phone}" style="font-size:14px;color:#111827;text-decoration:none;font-weight:500;">${dialCode} ${phone}</a>
            </td>
          </tr>` : ''}

          ${company ? `
          <tr>
            <td style="width:140px;padding:10px 0;border-bottom:1px solid #f0f0ef;vertical-align:top;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Company</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f0ef;vertical-align:top;">
              <span style="font-size:14px;color:#111827;font-weight:500;">${company}</span>
            </td>
          </tr>` : ''}

          <tr>
            <td style="width:140px;padding:10px 0;vertical-align:top;">
              <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Submitted</span>
            </td>
            <td style="padding:10px 0;vertical-align:top;">
              <span style="font-size:13px;color:#9ca3af;">${submitted} IST</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <!-- ── MESSAGE ── -->
    <tr>
      <td style="padding:24px 32px;">
        <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#9ca3af;font-weight:700;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Their Message</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:4px;background:#05050a;"></td>
            <td style="background:#f8f8f7;padding:18px 20px;">
              <p style="margin:0;font-size:14px;line-height:1.8;color:#374151;white-space:pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── CTA ── -->
    <tr>
      <td style="padding:0 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right:8px;">
              <a href="mailto:${email}?subject=Re%3A%20Your%20Enquiry%20to%20Autonex%20AI&body=Hi%20${encodeURIComponent(firstName)}%2C%0A%0A" style="display:block;background:#05050a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:15px;text-align:center;">✉️ &nbsp;Reply to ${firstName}</a>
            </td>
            ${phone ? `
            <td style="padding-left:8px;">
              <a href="tel:${dialCode}${phone}" style="display:block;background:#f0f0ef;color:#05050a;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:15px;text-align:center;border:1.5px solid #e5e7eb;">📞 &nbsp;Call ${firstName}</a>
            </td>` : ''}
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── FOOTER ── -->
    <tr>
      <td style="background:#f4f4f5;border-top:1px solid #e5e7eb;padding:14px 32px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#9ca3af;">Autonex AI Technologies &nbsp;·&nbsp; www.autonexai.org &nbsp;·&nbsp; Submitted from IP: ${ip}</p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;

  const text = `NEW LEAD — Autonex AI\n${'='.repeat(44)}\nName:     ${name}\nEmail:    ${email}\nPhone:    ${dialCode} ${phone}\nCompany:  ${company}\nService:  ${service}\nTime:     ${submitted} IST\n\nMessage:\n${message}\n\nIP: ${ip}`;
  return { html, text };
}

/* ══════════════════ Confirmation email (to enquirer) ══════════════════ */
function buildConfirmationEmail(data: {
  name: string; email: string; service: string; message: string;
}) {
  const { name, service, message } = data;
  const firstName = name.split(' ')[0];

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>We got your message</title></head>
<body style="margin:0;padding:0;background:#EAEAEA;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EAEAEA;">
<tr><td align="center" style="padding:32px 16px;">

  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;">

    <!-- ── HEADER ── -->
    <tr>
      <td style="background:#05050a;padding:40px 32px;text-align:center;">
        <!-- Logo -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px;">
          <tr>
            <td style="width:64px;height:64px;background:#ffffff;text-align:center;vertical-align:middle;padding:8px;">
              <img
                src="https://www.autonexai.org/images/logo-black.png"
                alt="Autonex AI"
                width="48"
                height="48"
                style="display:block;width:48px;height:48px;object-fit:contain;"
              />
            </td>
          </tr>
        </table>
        <h1 style="margin:0 0 8px;font-size:30px;font-weight:800;color:#ffffff;letter-spacing:0.01em;line-height:1.2;">Message Received!</h1>
        <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.6;">We'll be in touch within 24 business hours.</p>
      </td>
    </tr>

    <!-- ── GREETING ── -->
    <tr>
      <td style="padding:32px 36px 24px;">
        <p style="margin:0 0 16px;font-size:17px;color:#111827;line-height:1.6;">Hi <strong>${firstName}</strong>,</p>
        <p style="margin:0;font-size:15px;color:#4b5563;line-height:1.75;">Thank you for reaching out to <strong>Autonex AI</strong>. Our team has received your message and will personally review it — you'll hear back with specific, tailored thoughts within <strong>24 business hours</strong>.</p>
      </td>
    </tr>

    ${service ? `
    <!-- ── SERVICE BADGE ── -->
    <tr>
      <td style="padding:0 36px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f8f7;border:1.5px solid #e5e7eb;">
          <tr>
            <td style="width:5px;background:#05050a;"></td>
            <td style="padding:14px 18px;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9ca3af;">You&rsquo;re interested in</p>
              <p style="margin:0;font-size:15px;font-weight:700;color:#111827;">${service}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>` : ''}

    <!-- ── MESSAGE ECHO ── -->
    <tr>
      <td style="padding:0 36px 28px;">
        <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9ca3af;">Your Message</p>
        <div style="background:#fafaf9;border:1px solid #e5e7eb;padding:16px 18px;">
          <p style="margin:0;font-size:13px;line-height:1.75;color:#6b7280;white-space:pre-wrap;">${message.length > 350 ? message.slice(0, 350) + '…' : message}</p>
        </div>
      </td>
    </tr>

    <!-- ── DIVIDER ── -->
    <tr><td style="padding:0 36px;"><div style="height:1px;background:#e5e7eb;"></div></td></tr>

    <!-- ── WHAT NEXT ── -->
    <tr>
      <td style="padding:28px 36px;">
        <p style="margin:0 0 20px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#9ca3af;">What Happens Next</p>

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <!-- Step 1 -->
          <tr>
            <td style="width:36px;vertical-align:top;padding-bottom:18px;">
              <table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:28px;height:28px;background:#05050a;color:#ffffff;font-size:12px;font-weight:800;text-align:center;vertical-align:middle;">1</td></tr></table>
            </td>
            <td style="padding-bottom:18px;padding-left:14px;vertical-align:top;border-bottom:1px solid #f0f0ef;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827;">We review your enquiry</p>
              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">Every message is read by a real person on our team.</p>
            </td>
          </tr>
          <!-- Step 2 -->
          <tr>
            <td style="width:36px;vertical-align:top;padding-top:14px;padding-bottom:18px;">
              <table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:28px;height:28px;background:#05050a;color:#ffffff;font-size:12px;font-weight:800;text-align:center;vertical-align:middle;">2</td></tr></table>
            </td>
            <td style="padding-top:14px;padding-bottom:18px;padding-left:14px;vertical-align:top;border-bottom:1px solid #f0f0ef;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827;">You get a personalised response</p>
              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">Within 24 hours — specific ideas for your situation, not a template.</p>
            </td>
          </tr>
          <!-- Step 3 -->
          <tr>
            <td style="width:36px;vertical-align:top;padding-top:14px;">
              <table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:28px;height:28px;background:#05050a;color:#ffffff;font-size:12px;font-weight:800;text-align:center;vertical-align:middle;">3</td></tr></table>
            </td>
            <td style="padding-top:14px;padding-left:14px;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#111827;">We schedule a free strategy call</p>
              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">30 minutes. No sales pressure. Just clarity on what&rsquo;s possible.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── CTA ── -->
    <tr>
      <td style="padding:0 36px 12px;text-align:center;">
        <a href="https://cal.com/autonex-ai/30min" style="display:inline-block;background:#05050a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:16px 36px;">📅 &nbsp;Book a Free Call Now →</a>
      </td>
    </tr>
    <tr>
      <td style="padding:0 36px 32px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">Or just reply to this email — we read every reply personally.</p>
      </td>
    </tr>

    <!-- ── FOOTER ── -->
    <tr>
      <td style="background:#05050a;padding:22px 36px;text-align:center;">
        <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.45);">
          <a href="https://www.autonexai.org" style="color:rgba(255,255,255,0.45);text-decoration:none;">www.autonexai.org</a>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="mailto:hello@autonexai.org" style="color:rgba(255,255,255,0.45);text-decoration:none;">hello@autonexai.org</a>
        </p>
        <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);">You received this because you submitted a contact form on our website.</p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;

  const text = `Hi ${firstName},\n\nThank you for reaching out to Autonex AI! We've received your message.\n\nWe will respond within 24 business hours with specific ideas tailored to your situation.\n\nIn the meantime, feel free to book a free 30-min strategy call:\nhttps://cal.com/autonex-ai/30min\n\nOr simply reply to this email.\n\n— The Autonex AI Team\nhello@autonexai.org | www.autonexai.org`;
  return { html, text };
}

/* ══════════════════════ POST handler ══════════════════════ */
export async function POST(req: NextRequest) {

  const ip = getIp(req);

  /* ── 1. Rate limiting ── */
  if (isRateLimited(ip)) {
    return json({ ok: false, error: 'Too many submissions. Please wait a minute and try again.' }, 429);
  }

  /* ── 2. Parse body ── */
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  /* ── 3. Honeypot ── */
  if (body.website || body.hp) {
    return json({ ok: true }); // Silently drop bot submissions
  }

  /* ── 4. Timing check (bots submit in < 1.5 s) ── */
  const loadedAt = Number(body.loadedAt ?? 0);
  if (loadedAt && (Date.now() - loadedAt) < 1500) {
    return json({ ok: false, error: 'Submission too fast. Please try again.' }, 400);
  }

  /* ── 5. Sanitise ── */
  const name      = sanitize(body.name);
  const email     = sanitize(body.email);
  const phone     = sanitize(body.phone     ?? '');
  const dialCode  = sanitize(body.dialCode  ?? '+91');
  const countryCode = sanitize(body.countryCode ?? 'IN');
  const company   = sanitize(body.company   ?? '');
  const service   = sanitize(body.service   ?? '');
  const message   = sanitize(body.message);

  /* ── 6. Validate ── */
  type FieldErrors = Record<string, string>;
  const errors: FieldErrors = {};

  if (!name || name.length < 2)       errors.name    = 'Please enter your full name.';
  else if (!isLikelyRealName(name))   errors.name    = 'Please enter a genuine full name.';
  if (!isValidEmail(email))           errors.email   = 'Please enter a valid email address.';
  if (phone && !isValidInternationalPhone(`${dialCode}${phone}`, countryCode)) {
    errors.phone = `Please enter a valid phone number for the selected country.`;
  }
  if (!message || message.length < 20) errors.message = 'Please describe your project in at least 20 characters.';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  /* ── 7. Always log submission to server console ── */
  console.log('\n' + '═'.repeat(52));
  console.log('📨  CONTACT FORM SUBMISSION');
  console.log('═'.repeat(52));
  console.log(`  Name:    ${name}`);
  console.log(`  Email:   ${email}`);
  if (phone)   console.log(`  Phone:   ${dialCode} ${phone}`);
  if (company) console.log(`  Company: ${company}`);
  if (service) console.log(`  Service: ${service}`);
  console.log(`  Message: ${message}`);
  console.log(`  IP:      ${ip}`);
  console.log(`  Time:    ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
  console.log('═'.repeat(52) + '\n');

  /* ── 8. Send emails ── */
  const to          = process.env.CONTACT_TO ?? 'autonexai.org@gmail.com';
  const transporter = getTransporter();

  if (transporter) {
    const notif = buildNotificationEmail({ name, email, phone, dialCode, company, service, message, ip });
    const conf  = buildConfirmationEmail({ name, email, service, message });

    const [notifResult, confResult] = await Promise.allSettled([
      // ── Notification to Autonex inbox ──
      transporter.sendMail({
        from:    `"Autonex AI Website" <${process.env.GMAIL_USER}>`,
        to:      to,
        replyTo: email,
        subject: `New Enquiry from ${name}${company ? ` — ${company}` : ''}`,
        html:    notif.html,
        text:    notif.text,
        headers: {
          'X-Priority': '1',
          'X-Mailer':   'Autonex-AI-Contact-Form/1.0',
          'Importance': 'High',
        },
      }),
      // ── Confirmation to enquirer ──
      transporter.sendMail({
        from:    `"Autonex AI" <${process.env.GMAIL_USER}>`,
        to:      email,
        replyTo: process.env.GMAIL_USER,
        subject: `We received your message, ${name.split(' ')[0]} — Autonex AI`,
        html:    conf.html,
        text:    conf.text,
        headers: {
          'X-Mailer':            'Autonex-AI-Mailer/1.0',
          'List-Unsubscribe':    `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`,
          'Precedence':          'bulk',
        },
      }),
    ]);

    // ── Log SMTP delivery results ──
    if (notifResult.status === 'fulfilled') {
      const info = notifResult.value as { messageId?: string; accepted?: string[] };
      console.log(`[Contact API] ✅ Notification sent — messageId: ${info.messageId} — accepted: ${JSON.stringify(info.accepted)}`);
    } else {
      console.error('[Contact API] ❌ Notification FAILED:', notifResult.reason);
    }

    if (confResult.status === 'fulfilled') {
      const info = confResult.value as { messageId?: string; accepted?: string[] };
      console.log(`[Contact API] ✅ Confirmation sent — messageId: ${info.messageId} — accepted: ${JSON.stringify(info.accepted)}`);
    } else {
      console.error('[Contact API] ❌ Confirmation FAILED:', confResult.reason);
    }
  }

  // Always return success — submission is logged above even if email fails
  return json({ ok: true });
}

/* Reject all other HTTP methods */
export function GET()    { return json({ error: 'Method not allowed.' }, 405); }
export function PUT()    { return json({ error: 'Method not allowed.' }, 405); }
export function DELETE() { return json({ error: 'Method not allowed.' }, 405); }
