// ── Job type definitions ───────────────────────────────────────────────────
export type Department  = 'Engineering' | 'Design' | 'AI/ML' | 'Business' | 'Marketing';
export type JobType     = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type Location    = 'Remote' | 'Hybrid' | 'On-site';
export type Experience  = 'Entry-level' | 'Junior' | 'Mid-level' | 'Senior' | 'Lead / Principal';

export interface Job {
  id: string;
  title: string;
  department: Department;
  type: JobType;
  location: Location;
  experience: Experience;
  salaryRange?: string;          // e.g. "₹6L – ₹12L / year" or "$40k–$70k"
  equity?: string;               // e.g. "0.1% – 0.5%"
  skills: string[];              // required tech / skills tags
  description: string;
  responsibilities: string[];    // day-to-day bullet points
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];           // what the company offers
  applicationDeadline?: string;  // ISO date string, optional
  postedDate: string;
  active: boolean;
}

// ── Read jobs from data/jobs.json (server-side only) ──────────────────────
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function readJobsFromFile(): Job[] {
  const filePath = join(process.cwd(), 'data', 'jobs.json');
  if (!existsSync(filePath)) return [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw).jobs ?? [];
  } catch {
    return [];
  }
}

// ── Public helpers ─────────────────────────────────────────────────────────
export function getActiveJobs(): Job[] {
  return readJobsFromFile().filter(j => j.active);
}

export function getAllJobs(): Job[] {
  return readJobsFromFile();
}

export function getDepartments(): Department[] {
  return [...new Set(readJobsFromFile().filter(j => j.active).map(j => j.department))];
}

export function getJobById(id: string): Job | undefined {
  return readJobsFromFile().find(j => j.id === id);
}
