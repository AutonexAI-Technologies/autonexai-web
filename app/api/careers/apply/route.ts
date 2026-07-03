import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getJobById } from '@/lib/careers';

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES   = ['application/pdf'];

interface AttachmentData {
  filename: string;
  content: Buffer;
  contentType: string;
}

function sanitize(str: string): string {
  return (str ?? '').replace(/[<>"'&]/g, '').trim().slice(0, 3000);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // ── Extract all applicant fields ───────────────────────────────────────
    const name            = sanitize(formData.get('name') as string);
    const email           = sanitize(formData.get('email') as string).toLowerCase();
    const phone           = sanitize(formData.get('phone') as string);
    const jobId           = sanitize(formData.get('jobId') as string);
    const jobTitle        = sanitize(formData.get('jobTitle') as string);
    const yearsExp        = sanitize(formData.get('yearsExp') as string);
    const currentRole     = sanitize(formData.get('currentRole') as string);
    const expectedSalary  = sanitize(formData.get('expectedSalary') as string);
    const noticePeriod    = sanitize(formData.get('noticePeriod') as string);
    const availability    = sanitize(formData.get('availability') as string);
    const linkedin        = sanitize(formData.get('linkedin') as string);
    const portfolio       = sanitize(formData.get('portfolio') as string);
    const github          = sanitize(formData.get('github') as string);
    const workLinks       = sanitize(formData.get('workLinks') as string);
    const whyUs           = sanitize(formData.get('whyUs') as string);
    const coverLetter     = sanitize(formData.get('coverLetter') as string);
    const resumeFile      = formData.get('resume') as File | null;

    // ── Validation ─────────────────────────────────────────────────────────
    if (!name || !email || !jobTitle || !coverLetter) {
      return NextResponse.json(
        { error: 'Name, email, position, and cover letter are required.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // ── Resume validation ──────────────────────────────────────────────────
    let resumeAttachment: AttachmentData | null = null;
    if (resumeFile && resumeFile.size > 0) {
      if (!ALLOWED_TYPES.includes(resumeFile.type)) {
        return NextResponse.json({ error: 'Resume must be a PDF file.' }, { status: 400 });
      }
      if (resumeFile.size > MAX_RESUME_SIZE) {
        return NextResponse.json({ error: 'Resume must be under 5 MB.' }, { status: 400 });
      }
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      resumeAttachment = { filename: resumeFile.name || 'resume.pdf', content: buffer, contentType: 'application/pdf' };
    }

    // ── Lookup job details ─────────────────────────────────────────────────
    const job = jobId ? getJobById(jobId) : null;
    const department = job?.department ?? 'General Application';

    // ── HR email HTML ──────────────────────────────────────────────────────
    const hrHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;">

        <tr><td style="background:#05050a;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;">
          <span style="color:#fff;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">
            New Application — Autonex AI Careers
          </span>
        </td></tr>

        <tr><td style="padding:28px;">

          <!-- Candidate -->
          <h2 style="margin:0 0 4px;font-size:24px;color:#111;font-weight:800;">${name}</h2>
          <p style="margin:0 0 4px;font-size:14px;color:#555;">
            Applying for: <strong>${jobTitle}</strong> &nbsp;·&nbsp; ${department}
          </p>
          ${currentRole ? `<p style="margin:0;font-size:13px;color:#888;">Currently: ${currentRole}</p>` : ''}

          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />

          <!-- Contact details -->
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row('Email',   `<a href="mailto:${email}" style="color:#5b21b6;">${email}</a>`)}
            ${phone    ? row('Phone',   phone) : ''}
            ${yearsExp ? row('Experience', `${yearsExp} years`) : ''}
            ${expectedSalary ? row('Expected Salary', expectedSalary) : ''}
            ${noticePeriod   ? row('Notice Period',   noticePeriod) : ''}
            ${availability   ? row('Availability',    availability) : ''}
          </table>

          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />

          <!-- Online profiles -->
          ${linkedin || portfolio || github || workLinks ? `
          <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#999;">Profiles & Work</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${linkedin   ? row('LinkedIn',  `<a href="${linkedin}" style="color:#5b21b6;">${linkedin}</a>`) : ''}
            ${portfolio  ? row('Portfolio', `<a href="${portfolio}" style="color:#5b21b6;">${portfolio}</a>`) : ''}
            ${github     ? row('GitHub',    `<a href="${github}" style="color:#5b21b6;">${github}</a>`) : ''}
            ${workLinks  ? row('Other Links', workLinks.split('\n').filter(l=>l.trim()).map(l=>`<a href="${l.trim()}" style="color:#5b21b6;">${l.trim()}</a>`).join('<br/>')) : ''}
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          ` : ''}

          <!-- Why us -->
          ${whyUs ? `
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#999;">Why Autonex AI</p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.75;color:#333;white-space:pre-wrap;">${whyUs}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          ` : ''}

          <!-- Cover letter -->
          <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#999;">Cover Letter</p>
          <p style="margin:0;font-size:14px;line-height:1.75;color:#333;white-space:pre-wrap;">${coverLetter}</p>

          ${resumeAttachment ? `
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
          <p style="margin:0;font-size:13px;color:#666;">📎 Resume attached: <strong>${resumeFile!.name}</strong></p>
          ` : ''}

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // ── Applicant auto-reply HTML ──────────────────────────────────────────
    const applicantHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#05050a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05050a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:0 0 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);">AUTONEX AI CAREERS</span>
        </td></tr>
        <tr><td style="padding:44px 0 36px;">
          <h1 style="margin:0 0 24px;font-size:42px;line-height:1;color:#fff;font-weight:900;letter-spacing:-1px;">Application<br/>Received.</h1>
          <p style="margin:0 0 14px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.6);">Hi ${name},</p>
          <p style="margin:0 0 14px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.6);">
            We've received your application for <strong style="color:#fff;">${jobTitle}</strong>. Our team will review it and get back to you within 5–7 business days if your profile is a strong match.
          </p>
          <p style="margin:0 0 32px;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.5);">
            In the meantime, feel free to explore our latest thinking on the Autonex AI blog.
          </p>
          <a href="https://www.autonexai.org/careers"
             style="display:inline-block;padding:16px 32px;background:#fff;color:#05050a;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;">
            View All Open Roles →
          </a>
        </td></tr>
        <tr><td style="padding:24px 0 0;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);line-height:1.7;">
            Autonex AI Technologies · Hyderabad, India<br/>
            <a href="https://www.autonexai.org" style="color:rgba(255,255,255,0.35);text-decoration:underline;">autonexai.org</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // ── Send both emails ───────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS },
    });

    await Promise.all([
      transporter.sendMail({
        from:        `"Autonex AI Careers" <${process.env.GMAIL_USER}>`,
        to:          process.env.CONTACT_TO,
        replyTo:     email,
        subject:     `🧑‍💼 Application: ${jobTitle} — ${name}`,
        html:        hrHtml,
        attachments: resumeAttachment ? [resumeAttachment] : [],
      }),
      transporter.sendMail({
        from:    `"Autonex AI Careers" <${process.env.GMAIL_USER}>`,
        to:      email,
        subject: `Application Received — ${jobTitle} at Autonex AI`,
        html:    applicantHtml,
      }),
    ]);

    return NextResponse.json({ message: "Application submitted! We'll be in touch soon." }, { status: 200 });

  } catch (err) {
    console.error('[careers/apply]', err);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again or email us directly at hello@autonexai.org' },
      { status: 500 }
    );
  }
}

// ── Email row helper ───────────────────────────────────────────────────────
function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;vertical-align:top;width:130px;">
      <span style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#aaa;">${label}</span>
    </td>
    <td style="padding:6px 0;font-size:13px;color:#333;line-height:1.5;">${value}</td>
  </tr>`;
}
