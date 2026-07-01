/**
 * ── Input Sanitisation Utility ───────────────────────────────────────────────
 *
 * Prevents:
 *   • XSS (cross-site scripting) — strips HTML tags and dangerous chars
 *   • SQL Injection — removes SQL keywords and special chars
 *   • NoSQL Injection — strips MongoDB operators
 *   • Path Traversal — removes ../ sequences
 *   • Template injection — removes {{ }} and <% %> patterns
 *
 * Use on ALL user-supplied strings before processing or storing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Strip HTML tags — prevent XSS */
export function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')           // remove tags
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, '/');
}

/** Encode HTML entities — safe for rendering in HTML context */
export function encodeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/** Remove SQL injection patterns */
export function stripSqlKeywords(input: string): string {
  const sqlPattern =
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|TRUNCATE|REPLACE|MERGE|CALL|LOAD|OUTFILE|DUMPFILE|INFORMATION_SCHEMA|SYS\.|XP_|SP_)\b|--|;|\/\*|\*\/|xp_|0x[0-9a-f]+)/gi;
  return input.replace(sqlPattern, '');
}

/** Remove NoSQL / MongoDB operator injection */
export function stripNoSqlOperators(input: string): string {
  return input
    .replace(/\$[a-zA-Z]+/g, '')    // $where, $or, $gt etc.
    .replace(/\{|\}/g, '');          // object braces
}

/** Remove path traversal sequences */
export function stripPathTraversal(input: string): string {
  return input
    .replace(/\.\.\//g, '')
    .replace(/\.\.\\/g, '')
    .replace(/%2e%2e%2f/gi, '')
    .replace(/%252e%252e%252f/gi, '');
}

/** Remove server-side template injection patterns */
export function stripTemplateInjection(input: string): string {
  return input
    .replace(/\{\{.*?\}\}/g, '')     // Handlebars / Jinja
    .replace(/<%.*?%>/g, '')         // EJS / ERB
    .replace(/\$\{.*?\}/g, '')       // JS template literals
    .replace(/#\{.*?\}/g, '');       // Ruby interpolation
}

/**
 * Master sanitiser — runs all checks in order.
 * Always use this on contact form inputs.
 */
export function sanitize(input: unknown): string {
  if (typeof input !== 'string') return '';

  return [
    stripPathTraversal,
    stripTemplateInjection,
    stripSqlKeywords,
    stripNoSqlOperators,
    stripHtml,
  ].reduce((val, fn) => fn(val), input.trim()).slice(0, 5000); // hard max length
}

/**
 * Validate email format (RFC 5322 simplified)
 */
export function isValidEmail(email: string): boolean {
  const formatOk =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(email) &&
    email.length <= 254;
  if (!formatOk) return false;
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return !DISPOSABLE_DOMAINS.has(domain);
}

/**
 * Disposable / throwaway email domain blocklist.
 * Add more as needed. Source: public open-source lists.
 */
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','guerrillamail.com','guerrillamail.net','guerrillamail.org','guerrillamail.biz',
  'guerrillamail.de','guerrillamail.info','tempmail.com','temp-mail.org','throwam.com',
  'throwam.net','sharklasers.com','guerrillamailblock.com','grr.la','guerrillamail.com',
  'spam4.me','spamgourmet.com','trashmail.com','trashmail.net','trashmail.org','trashmail.at',
  'trashmail.io','trashmail.me','dispostable.com','yopmail.com','yopmail.fr','cool.fr.nf',
  'jetable.fr.nf','nospam.ze.tc','nomail.xl.cx','mega.zik.dj','speed.1s.fr','courriel.fr.nf',
  'moncourrier.fr.nf','monemail.fr.nf','monmail.fr.nf','maildrop.cc','discard.email',
  'mailnull.com','spamgourmet.net','spamgourmet.org','spamgourmet.com','mailnesia.com',
  'mailnull.com','spamgourmet.com','10minutemail.com','10minutemail.net','10minutemail.org',
  '10minutemail.de','10minutemail.ru','10minutemail.be','10minutemail.us','10minutemail.pl',
  '10minutemail.co.uk','10minutemail.pro','tempinbox.com','temp-mail.ru','fakeinbox.com',
  'mailexpire.com','filzmail.com','throwam.com','e4ward.com','mytemp.email','emailondeck.com',
  'throwam.com','moakt.com','zetmail.com','mailsac.com','discard.email','mailscrap.com',
  'spamgourmet.com','mailnull.com','crap.am','dispostable.com','maileimer.de','mailnesia.com',
  'spamevader.com','spamhereplease.com','spoofmail.de','superrito.com','tempail.com',
  'tempr.email','trbvm.com','trillianpro.com','uggsrock.com','uroid.com','valemail.net',
  'vctel.com','veryrealemail.com','vinernet.com','wil.lt','willhackforfood.biz','wilemail.com',
  'xemaps.com','xents.com','xn--0-6cd4a.com','xoxy.net','xyzfree.net','yapped.net',
  'yeah.net','yogamaven.com','yopmail.com','ypmail.webarnak.fr.eu.org',
  'zippymail.info','zoemail.net','zoemail.org',
]);

/**
 * Detect obviously fake / keyboard-mash names.
 * Returns true if the name looks genuine.
 */
export function isLikelyRealName(name: string): boolean {
  const trimmed = name.trim();
  // Must have at least 2 chars and contain a space OR be a single genuine name
  if (trimmed.length < 2) return false;
  // Reject all-same-character strings (e.g. 'aaaaaaa')
  if (/^(.)\1{3,}$/.test(trimmed)) return false;
  // Reject obvious keyboard sequences
  if (/^(asdf|qwer|zxcv|1234|abcd|xxxx|test|admin|user|name|guest|demo|fake|bot)/i.test(trimmed)) return false;
  // Must contain only letters, spaces, hyphens, apostrophes, dots
  if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'.\-]+$/.test(trimmed)) return false;
  // Reject if every word is 1 char (e.g. 'a b c')
  const words = trimmed.split(/\s+/);
  if (words.every(w => w.length <= 1)) return false;
  return true;
}

/**
 * @deprecated Use isValidInternationalPhone from lib/countries.ts instead.
 * Kept for backward compatibility only.
 */
export function isValidIndianPhone(phone: string): boolean {
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

/**
 * Rate-limit helper (client-side — for display purposes)
 * For true rate limiting, use middleware or a server action.
 */
const submitTimestamps: number[] = [];
const RATE_LIMIT = 3;         // max submissions
const RATE_WINDOW = 60_000;   // per 60 seconds

export function isRateLimited(): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW;
  // Remove old entries
  while (submitTimestamps.length > 0 && submitTimestamps[0] < windowStart) {
    submitTimestamps.shift();
  }
  if (submitTimestamps.length >= RATE_LIMIT) return true;
  submitTimestamps.push(now);
  return false;
}
