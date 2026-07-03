'use client';

import { useState } from 'react';
import type { Job, Department, JobType, Location, Experience } from '@/lib/careers';
import styles from './admin.module.css';

type AdminStatus = 'locked' | 'authenticated';

const DEPARTMENTS: Department[]  = ['Engineering', 'Design', 'AI/ML', 'Business', 'Marketing'];
const JOB_TYPES: JobType[]       = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const LOCATIONS: Location[]      = ['Remote', 'Hybrid', 'On-site'];
const EXPERIENCES: Experience[]  = ['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead / Principal'];

const EMPTY_JOB: Omit<Job, 'id'> = {
  title: '',
  department: 'Engineering',
  type: 'Full-time',
  location: 'Remote',
  experience: 'Mid-level',
  salaryRange: '',
  equity: '',
  skills: [''],
  description: '',
  responsibilities: [''],
  requirements: [''],
  niceToHave: [''],
  benefits: [''],
  applicationDeadline: '',
  postedDate: new Date().toISOString().slice(0, 10),
  active: true,
};

// ── List helpers ──────────────────────────────────────────────────────────
function updateAt(arr: string[], i: number, val: string) { const n=[...arr]; n[i]=val; return n; }
function addItem(arr: string[]) { return [...arr, '']; }
function removeAt(arr: string[], i: number) { return arr.filter((_,idx) => idx !== i); }

// ── ListField sub-component ───────────────────────────────────────────────
function ListField({
  label, items, placeholder, onChange,
}: {
  label: string;
  items: string[];
  placeholder: string;
  onChange: (next: string[]) => void;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {items.map((item, i) => (
        <div key={i} className={styles.listItem}>
          <input className={styles.input} value={item}
            onChange={e => onChange(updateAt(items, i, e.target.value))}
            placeholder={`${placeholder} ${i + 1}`} />
          <button type="button" className={styles.removeBtn}
            onClick={() => onChange(removeAt(items, i))} title="Remove">−</button>
        </div>
      ))}
      <button type="button" className={styles.addBtn}
        onClick={() => onChange(addItem(items))}>+ Add {label}</button>
    </div>
  );
}

// ── TagField sub-component (skills) ──────────────────────────────────────
function TagField({ items, onChange }: { items: string[]; onChange: (n: string[]) => void }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Skills / Tech Stack Tags</label>
      <div className={styles.tagGrid}>
        {items.map((tag, i) => (
          <div key={i} className={styles.tagItem}>
            <input className={styles.tagInput} value={tag}
              onChange={e => onChange(updateAt(items, i, e.target.value))}
              placeholder={`e.g. Python, Next.js`} />
            <button type="button" className={styles.tagRemove}
              onClick={() => onChange(removeAt(items, i))}>×</button>
          </div>
        ))}
      </div>
      <button type="button" className={styles.addBtn}
        onClick={() => onChange(addItem(items))}>+ Add Skill</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function CareersAdminClient() {
  const [status, setStatus]           = useState<AdminStatus>('locked');
  const [password, setPassword]       = useState('');
  const [authError, setAuthError]     = useState('');
  const [jobs, setJobs]               = useState<Job[]>([]);
  const [loading, setLoading]         = useState(false);
  const [saveMsg, setSaveMsg]         = useState('');
  const [editingJob, setEditingJob]   = useState<(Omit<Job,'id'> & {id?:string}) | null>(null);
  const [isNew, setIsNew]             = useState(false);

  // ── Auth — also sets httpOnly session cookie via the login API ─────────
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await fetch('/api/careers/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setStatus('authenticated');
      fetchJobs();
    } else {
      setAuthError('Incorrect password. Try again.');
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    const res = await fetch('/api/careers/admin?action=list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { const d = await res.json(); setJobs(d.jobs); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editingJob) return;
    setSaveMsg('');
    const res = await fetch('/api/careers/admin?action=save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, job: editingJob, isNew }),
    });
    const data = await res.json();
    if (res.ok) { setSaveMsg('✓ Saved!'); setEditingJob(null); fetchJobs(); }
    else setSaveMsg('✗ ' + (data.error ?? 'Failed.'));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this listing permanently?')) return;
    await fetch('/api/careers/admin?action=delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, id }),
    });
    fetchJobs();
  };

  const handleToggle = async (id: string, active: boolean) => {
    await fetch('/api/careers/admin?action=toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, id, active: !active }),
    });
    fetchJobs();
  };

  const set = (key: keyof Omit<Job,'id'>, val: unknown) =>
    setEditingJob(j => j ? { ...j, [key]: val } : j);

  // ── Lock screen ──────────────────────────────────────────────────────────
  if (status === 'locked') return (
    <div className={styles.lockScreen}>
      <div className={styles.lockCard}>
        <div className={styles.lockIcon}>🔐</div>
        <h1 className={`${styles.lockTitle} display`}>Admin Access</h1>
        <p className={styles.lockSub}>Autonex AI — Careers Management</p>
        <form onSubmit={handleAuth} className={styles.lockForm}>
          <input type="password" className={styles.lockInput}
            placeholder="Enter admin password" value={password}
            onChange={e => { setPassword(e.target.value); setAuthError(''); }} autoFocus />
          {authError && <p className={styles.lockError}>{authError}</p>}
          <button type="submit" className={styles.lockBtn}>Unlock →</button>
        </form>
      </div>
    </div>
  );

  // ── Authenticated ─────────────────────────────────────────────────────────
  return (
    <div className={styles.admin}>
      {/* Header */}
      <div className={styles.adminHeader}>
        <div className="container">
          <div className={styles.adminHeaderInner}>
            <div>
              <p className={styles.adminLabel}>AUTONEX AI</p>
              <h1 className={`${styles.adminTitle} display`}>Careers Admin</h1>
            </div>
            <div className={styles.adminActions}>
              {saveMsg && (
                <span className={`${styles.saveMsg} ${saveMsg.startsWith('✓') ? styles.saveMsgOk : styles.saveMsgErr}`}>
                  {saveMsg}
                </span>
              )}
              <button className={styles.newJobBtn} type="button"
                onClick={() => { setEditingJob({...EMPTY_JOB}); setIsNew(true); setSaveMsg(''); }}>
                + New Job Listing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs list */}
      <div className={styles.adminBody}>
        <div className="container">
          {loading ? (
            <p className={styles.loading}>Loading…</p>
          ) : jobs.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No job listings yet.</p>
              <button className={styles.newJobBtn} type="button"
                onClick={() => { setEditingJob({...EMPTY_JOB}); setIsNew(true); }}>
                + Create Your First Job Listing
              </button>
            </div>
          ) : (
            <div className={styles.jobList}>
              {jobs.map(job => (
                <div key={job.id} className={`${styles.jobRow} ${!job.active ? styles.jobRowInactive : ''}`}>
                  <div className={styles.jobRowLeft}>
                    <div className={styles.jobRowBadges}>
                      <span className={`${styles.badge} ${styles.badgeDept}`}>{job.department}</span>
                      <span className={styles.badge}>{job.type}</span>
                      <span className={styles.badge}>{job.location}</span>
                      <span className={styles.badge}>{job.experience}</span>
                      {job.salaryRange && <span className={`${styles.badge} ${styles.badgeSalary}`}>{job.salaryRange}</span>}
                      <span className={`${styles.badge} ${job.active ? styles.badgeActive : styles.badgeInactive}`}>
                        {job.active ? '● Live' : '○ Hidden'}
                      </span>
                    </div>
                    <h3 className={`${styles.jobRowTitle} display`}>{job.title}</h3>
                    <p className={styles.jobRowDesc}>{job.description.slice(0, 120)}…</p>
                    {job.applicationDeadline && (
                      <p className={styles.jobRowDeadline}>
                        Deadline: {new Date(job.applicationDeadline).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                      </p>
                    )}
                  </div>
                  <div className={styles.jobRowActions}>
                    <button className={styles.editBtn} type="button"
                      onClick={() => { setEditingJob({...job}); setIsNew(false); setSaveMsg(''); }}>Edit</button>
                    <button className={styles.toggleBtn} type="button"
                      onClick={() => handleToggle(job.id, job.active)}>
                      {job.active ? 'Hide' : 'Publish'}
                    </button>
                    <button className={styles.deleteBtn} type="button"
                      onClick={() => handleDelete(job.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Edit / Create Modal ── */}
      {editingJob && (
        <div className={styles.modalOverlay}
          onClick={e => e.target === e.currentTarget && setEditingJob(null)}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={`${styles.modalTitle} display`}>
                {isNew ? 'New Job Listing' : 'Edit Job'}
              </h2>
              <button className={styles.modalClose} onClick={() => setEditingJob(null)}>×</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.form}>

                {/* ── SECTION: Basic Info ── */}
                <div className={styles.sectionLabel}>Basic Information</div>

                <div className={styles.field}>
                  <label className={styles.label}>Job Title *</label>
                  <input className={styles.input} value={editingJob.title}
                    onChange={e => set('title', e.target.value)}
                    placeholder="e.g. AI Automation Engineer" />
                </div>

                <div className={styles.row3}>
                  <div className={styles.field}>
                    <label className={styles.label}>Department</label>
                    <select className={styles.select} value={editingJob.department}
                      onChange={e => set('department', e.target.value as Department)}>
                      {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Job Type</label>
                    <select className={styles.select} value={editingJob.type}
                      onChange={e => set('type', e.target.value as JobType)}>
                      {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Location</label>
                    <select className={styles.select} value={editingJob.location}
                      onChange={e => set('location', e.target.value as Location)}>
                      {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.row3}>
                  <div className={styles.field}>
                    <label className={styles.label}>Experience Level</label>
                    <select className={styles.select} value={editingJob.experience}
                      onChange={e => set('experience', e.target.value as Experience)}>
                      {EXPERIENCES.map(ex => <option key={ex}>{ex}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Salary / Compensation</label>
                    <input className={styles.input} value={editingJob.salaryRange ?? ''}
                      onChange={e => set('salaryRange', e.target.value)}
                      placeholder="e.g. ₹6L–₹12L / year" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Equity (optional)</label>
                    <input className={styles.input} value={editingJob.equity ?? ''}
                      onChange={e => set('equity', e.target.value)}
                      placeholder="e.g. 0.1% – 0.5%" />
                  </div>
                </div>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Posted Date</label>
                    <input type="date" className={styles.input} value={editingJob.postedDate}
                      onChange={e => set('postedDate', e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Application Deadline</label>
                    <input type="date" className={styles.input} value={editingJob.applicationDeadline ?? ''}
                      onChange={e => set('applicationDeadline', e.target.value)} />
                  </div>
                </div>

                {/* ── SECTION: Role Details ── */}
                <div className={styles.sectionLabel}>Role Details</div>

                <div className={styles.field}>
                  <label className={styles.label}>Job Description *</label>
                  <textarea className={styles.textarea} rows={4} value={editingJob.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Describe the role, the problem it solves, and the impact the person will have…" />
                </div>

                <ListField
                  label="Responsibilities"
                  items={editingJob.responsibilities ?? ['']}
                  placeholder="Responsibility"
                  onChange={v => set('responsibilities', v)}
                />

                {/* ── SECTION: Skills & Requirements ── */}
                <div className={styles.sectionLabel}>Skills &amp; Requirements</div>

                <TagField
                  items={editingJob.skills ?? ['']}
                  onChange={v => set('skills', v)}
                />

                <ListField
                  label="Requirements"
                  items={editingJob.requirements}
                  placeholder="Requirement"
                  onChange={v => set('requirements', v)}
                />

                <ListField
                  label="Nice to Have"
                  items={editingJob.niceToHave ?? ['']}
                  placeholder="Nice to have"
                  onChange={v => set('niceToHave', v)}
                />

                {/* ── SECTION: Compensation & Benefits ── */}
                <div className={styles.sectionLabel}>What We Offer</div>

                <ListField
                  label="Benefits"
                  items={editingJob.benefits ?? ['']}
                  placeholder="Benefit"
                  onChange={v => set('benefits', v)}
                />

                {/* ── Status ── */}
                <div className={styles.sectionLabel}>Visibility</div>

                <div className={styles.field}>
                  <label className={styles.toggleLabel}>
                    <input type="checkbox" className={styles.toggleInput}
                      checked={editingJob.active}
                      onChange={e => set('active', e.target.checked)} />
                    <span className={styles.toggleSlider} />
                    <span className={styles.toggleText}>
                      {editingJob.active ? '● Published — visible on careers page' : '○ Hidden — draft, not visible'}
                    </span>
                  </label>
                </div>

                {/* Save */}
                <button type="button" className={styles.saveBtn} onClick={handleSave}>
                  {isNew ? 'Publish Job Listing →' : 'Save Changes →'}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
