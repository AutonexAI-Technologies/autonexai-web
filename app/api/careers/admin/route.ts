import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import type { Job } from '@/lib/careers';

const DATA_FILE = join(process.cwd(), 'data', 'jobs.json');
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'autonex-admin-2026';

// ── Data helpers ──────────────────────────────────────────────────────────
async function readJobs(): Promise<Job[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw).jobs ?? [];
  } catch {
    return [];
  }
}

async function writeJobs(jobs: Job[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify({ jobs }, null, 2), 'utf-8');
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48)
    + '-' + Date.now().toString(36);
}

// ── Auth check ────────────────────────────────────────────────────────────
function checkAuth(password: string): boolean {
  return password === ADMIN_SECRET;
}

// ── POST handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const { password } = body as { password: string };
  if (!checkAuth(password)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  // ── auth ── just validates password
  if (action === 'auth') {
    return NextResponse.json({ ok: true });
  }

  // ── list ── return all jobs (including inactive)
  if (action === 'list') {
    const jobs = await readJobs();
    return NextResponse.json({ jobs });
  }

  // ── save ── create or update a job
  if (action === 'save') {
    const { job, isNew } = body as { job: Partial<Job> & { id?: string }; isNew: boolean };

    if (!job.title?.trim() || !job.description?.trim()) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const jobs = await readJobs();

    const clean = (arr?: string[]) => (arr ?? []).filter(s => s.trim());

    const jobData = {
      title: job.title.trim(),
      department: job.department ?? 'Engineering',
      type: job.type ?? 'Full-time',
      location: job.location ?? 'Remote',
      experience: job.experience ?? 'Mid-level',
      salaryRange: (job.salaryRange ?? '').trim() || undefined,
      equity: (job.equity ?? '').trim() || undefined,
      skills: clean(job.skills),
      description: job.description.trim(),
      responsibilities: clean(job.responsibilities),
      requirements: clean(job.requirements),
      niceToHave: clean(job.niceToHave),
      benefits: clean(job.benefits),
      applicationDeadline: (job.applicationDeadline ?? '').trim() || undefined,
      postedDate: job.postedDate ?? new Date().toISOString().slice(0, 10),
      active: job.active ?? true,
    };

    if (isNew) {
      jobs.push({ id: generateId(job.title), ...jobData } as Job);
    } else {
      const idx = jobs.findIndex(j => j.id === job.id);
      if (idx === -1) return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
      jobs[idx] = { ...jobs[idx], ...jobData };
    }

    await writeJobs(jobs);
    return NextResponse.json({ ok: true });
  }

  // ── toggle ── flip active status
  if (action === 'toggle') {
    const { id, active } = body as { id: string; active: boolean };
    const jobs = await readJobs();
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    jobs[idx].active = active;
    await writeJobs(jobs);
    return NextResponse.json({ ok: true });
  }

  // ── delete ──
  if (action === 'delete') {
    const { id } = body as { id: string };
    const jobs = await readJobs();
    await writeJobs(jobs.filter(j => j.id !== id));
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
}
