'use client';

import { useState, useRef, useCallback } from 'react';
import type { Job, Department } from '@/lib/careers';
import styles from './careers.module.css';

interface Props {
  jobs: Job[];
  departments: Department[];
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ── Application Modal ──────────────────────────────────────────────────────
interface ModalProps {
  job: Job | null; // null = general application
  onClose: () => void;
}

function ApplicationModal({ job, onClose }: ModalProps) {
  // Personal
  const [name, setName]                 = useState('');
  const [email, setEmail]               = useState('');
  const [phone, setPhone]               = useState('');
  const [jobTitle, setJobTitle]         = useState(job?.title ?? '');
  // Background
  const [yearsExp, setYearsExp]         = useState('');
  const [currentRole, setCurrentRole]   = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [availability, setAvailability] = useState('');
  // Profiles
  const [linkedin, setLinkedin]         = useState('');
  const [portfolio, setPortfolio]       = useState('');
  const [github, setGithub]             = useState('');
  const [workLinks, setWorkLinks]       = useState('');
  // Application
  const [whyUs, setWhyUs]               = useState('');
  const [coverLetter, setCoverLetter]   = useState('');
  const [resumeFile, setResumeFile]     = useState<File | null>(null);
  // State
  const [status, setStatus]             = useState<SubmitStatus>('idle');
  const [message, setMessage]           = useState('');
  const fileInputRef                    = useRef<HTMLInputElement>(null);

  const isDisabled = status === 'loading' || status === 'success';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setStatus('error'); setMessage('Please upload a PDF file only.'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setStatus('error'); setMessage('Resume must be under 5 MB.'); return;
    }
    setResumeFile(file); setStatus('idle'); setMessage('');
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !jobTitle.trim() || !coverLetter.trim()) {
      setStatus('error'); setMessage('Please fill in all required fields.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus('error'); setMessage('Please enter a valid email address.'); return;
    }
    setStatus('loading');
    const fd = new FormData();
    fd.append('name',           name.trim());
    fd.append('email',          email.trim().toLowerCase());
    fd.append('phone',          phone.trim());
    fd.append('jobId',          job?.id ?? '');
    fd.append('jobTitle',       jobTitle.trim());
    fd.append('yearsExp',       yearsExp.trim());
    fd.append('currentRole',    currentRole.trim());
    fd.append('expectedSalary', expectedSalary.trim());
    fd.append('noticePeriod',   noticePeriod.trim());
    fd.append('availability',   availability.trim());
    fd.append('linkedin',       linkedin.trim());
    fd.append('portfolio',      portfolio.trim());
    fd.append('github',         github.trim());
    fd.append('workLinks',      workLinks.trim());
    fd.append('whyUs',          whyUs.trim());
    fd.append('coverLetter',    coverLetter.trim());
    if (resumeFile) fd.append('resume', resumeFile);

    try {
      const res = await fetch('/api/careers/apply', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) { setStatus('success'); setMessage(data.message ?? 'Application submitted! 🎉'); }
      else { setStatus('error'); setMessage(data.error ?? 'Something went wrong. Please try again.'); }
    } catch {
      setStatus('error'); setMessage('Network error. Please try again.');
    }
  }, [name, email, phone, jobTitle, yearsExp, currentRole, expectedSalary, noticePeriod, availability,
      linkedin, portfolio, github, workLinks, whyUs, coverLetter, resumeFile, job]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <span className={styles.modalLabel}>Apply Now</span>
            <h2 className={`${styles.modalJobTitle} display`}>
              {job?.title ?? 'General Application'}
            </h2>
            {job && (
              <div className={styles.modalBadges}>
                <span className={styles.modalBadge}>{job.department}</span>
                <span className={styles.modalBadge}>{job.type}</span>
                <span className={styles.modalBadge}>{job.location}</span>
                {job.experience && <span className={styles.modalBadge}>{job.experience}</span>}
                {job.salaryRange && <span className={`${styles.modalBadge} ${styles.modalBadgeSalary}`}>{job.salaryRange}</span>}
              </div>
            )}
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate id="careers-apply-form">

            {/* ── Section: Personal Info ── */}
            <p className={styles.formSection}>Personal Information</p>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="cf-name">Full Name</label>
                <input id="cf-name" type="text" className={styles.input}
                  placeholder="Your full name" value={name}
                  onChange={e => setName(e.target.value)} required disabled={isDisabled} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="cf-email">Email Address</label>
                <input id="cf-email" type="email" className={styles.input}
                  placeholder="you@example.com" value={email}
                  onChange={e => setEmail(e.target.value)} required autoComplete="email" disabled={isDisabled} />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-phone">Phone / WhatsApp</label>
                <input id="cf-phone" type="tel" className={styles.input}
                  placeholder="+91 9876543210" value={phone}
                  onChange={e => setPhone(e.target.value)} disabled={isDisabled} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="cf-position">Position Applying For</label>
                <input id="cf-position" type="text" className={styles.input}
                  placeholder="e.g. AI Automation Engineer" value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)} required
                  disabled={!!job || isDisabled} />
              </div>
            </div>

            {/* ── Section: Professional Background ── */}
            <p className={styles.formSection}>Professional Background</p>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-currentrole">Current Role / Title</label>
                <input id="cf-currentrole" type="text" className={styles.input}
                  placeholder="e.g. Frontend Developer at XYZ Corp" value={currentRole}
                  onChange={e => setCurrentRole(e.target.value)} disabled={isDisabled} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-years">Years of Experience</label>
                <input id="cf-years" type="text" className={styles.input}
                  placeholder="e.g. 3 years" value={yearsExp}
                  onChange={e => setYearsExp(e.target.value)} disabled={isDisabled} />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-salary">Expected Salary / Compensation</label>
                <input id="cf-salary" type="text" className={styles.input}
                  placeholder="e.g. ₹8L/year or $5000/month" value={expectedSalary}
                  onChange={e => setExpectedSalary(e.target.value)} disabled={isDisabled} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-notice">Notice Period</label>
                <input id="cf-notice" type="text" className={styles.input}
                  placeholder="e.g. Immediate / 30 days / 60 days" value={noticePeriod}
                  onChange={e => setNoticePeriod(e.target.value)} disabled={isDisabled} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="cf-availability">Availability / Working Hours</label>
              <input id="cf-availability" type="text" className={styles.input}
                placeholder="e.g. Full-time from July 15, or Part-time weekdays" value={availability}
                onChange={e => setAvailability(e.target.value)} disabled={isDisabled} />
            </div>

            {/* ── Section: Online Profiles ── */}
            <p className={styles.formSection}>Online Profiles &amp; Work</p>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-linkedin">LinkedIn</label>
                <input id="cf-linkedin" type="url" className={styles.input}
                  placeholder="https://linkedin.com/in/yourname" value={linkedin}
                  onChange={e => setLinkedin(e.target.value)} disabled={isDisabled} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="cf-github">GitHub</label>
                <input id="cf-github" type="url" className={styles.input}
                  placeholder="https://github.com/yourusername" value={github}
                  onChange={e => setGithub(e.target.value)} disabled={isDisabled} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="cf-portfolio">Portfolio / Website</label>
              <input id="cf-portfolio" type="url" className={styles.input}
                placeholder="https://yourportfolio.com" value={portfolio}
                onChange={e => setPortfolio(e.target.value)} disabled={isDisabled} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="cf-worklinks">Other Relevant Links</label>
              <textarea id="cf-worklinks" className={styles.textarea}
                placeholder="Live projects, Dribbble, case studies, YouTube demos — one per line"
                value={workLinks} onChange={e => setWorkLinks(e.target.value)}
                rows={3} style={{ minHeight: '72px' }} disabled={isDisabled} />
            </div>

            {/* ── Section: Application ── */}
            <p className={styles.formSection}>Your Application</p>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="cf-why">Why Autonex AI?</label>
              <textarea id="cf-why" className={styles.textarea}
                placeholder="What draws you to Autonex AI specifically? What excites you about this role?"
                value={whyUs} onChange={e => setWhyUs(e.target.value)}
                rows={3} style={{ minHeight: '80px' }} disabled={isDisabled} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="cf-cover">Cover Letter</label>
              <textarea id="cf-cover" className={styles.textarea}
                placeholder="Tell us about yourself, your most relevant experience, and what makes you the right fit for this role…"
                value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
                required rows={5} disabled={isDisabled} />
            </div>

            {/* Resume upload */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Resume / CV (PDF)</label>
              <div className={styles.fileUpload}>
                <label
                  className={`${styles.fileLabel} ${resumeFile ? styles.fileLabelHasFile : ''}`}
                  htmlFor="cf-resume"
                >
                  <span>📎</span>
                  <span>
                    {resumeFile
                      ? `${resumeFile.name} · ${(resumeFile.size / 1024 / 1024).toFixed(1)} MB`
                      : 'Click to attach your resume (PDF only)'}
                  </span>
                </label>
                <input ref={fileInputRef} id="cf-resume" type="file"
                  className={styles.fileInput} accept=".pdf,application/pdf"
                  onChange={handleFileChange} disabled={isDisabled} />
                <p className={styles.fileNote}>PDF only · Max 5 MB</p>
              </div>
            </div>

            {/* Status message */}
            {message && (
              <p
                className={`${styles.formMessage} ${status === 'success' ? styles.msgSuccess : styles.msgError}`}
                role={status === 'error' ? 'alert' : 'status'}
              >{message}</p>
            )}

            {/* Submit */}
            <button type="submit" className={styles.submitBtn} id="careers-submit-btn"
              disabled={isDisabled}>
              {status === 'loading' ? 'Submitting…' : status === 'success' ? '✓ Application Sent!' : 'Submit Application →'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

// ── Main Careers Client ────────────────────────────────────────────────────
export default function CareersClient({ jobs, departments }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedJob, setSelectedJob]   = useState<Job | null | undefined>(undefined);

  const filtered = activeFilter === 'All' ? jobs : jobs.filter(j => j.department === activeFilter);

  const openModal  = (job: Job | null) => setSelectedJob(job);
  const closeModal = () => setSelectedJob(undefined);

  return (
    <>
      {/* Culture strip */}
      <div className={styles.culture}>
        <div className="container">
          <div className={styles.cultureInner}>
            {[
              { icon: '🌍', title: 'Remote First',  desc: 'Work from anywhere. Results matter more than your timezone.' },
              { icon: '⚡', title: 'Move Fast',      desc: 'We ship weekly. No endless meetings — just building.' },
              { icon: '🧠', title: 'AI-Native',      desc: 'We use AI in our own workflow. You\'ll be surrounded by tools that amplify you.' },
              { icon: '📈', title: 'Grow Fast',      desc: 'We\'re early. People who join now will shape the company\'s DNA.' },
            ].map(c => (
              <div key={c.title} className={styles.cultureItem}>
                <div className={styles.cultureIcon}>{c.icon}</div>
                <h3 className={`${styles.cultureTitle} display`}>{c.title}</h3>
                <p className={styles.cultureDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs section */}
      <div className={styles.jobs}>
        <div className="container">

          {/* Header + filters */}
          <div className={styles.jobsHeader}>
            <div>
              <h2 className={`${styles.jobsHeading} display`}>
                Open <span className={styles.jobsGhost}>Roles.</span>
              </h2>
              <p className={styles.jobsSub}>
                {jobs.length} position{jobs.length !== 1 ? 's' : ''} open.
                {' '}Don&apos;t see a fit? Send a general application.
              </p>
            </div>
            <div className={styles.filters}>
              <button className={`${styles.filterBtn} ${activeFilter === 'All' ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter('All')} type="button" id="filter-all">All</button>
              {departments.map(d => (
                <button key={d}
                  className={`${styles.filterBtn} ${activeFilter === d ? styles.filterActive : ''}`}
                  onClick={() => setActiveFilter(d)} type="button"
                  id={`filter-${d.toLowerCase().replace(/\//g, '-')}`}>{d}</button>
              ))}
            </div>
          </div>

          {/* Job list */}
          {filtered.length > 0 ? (
            <div className={styles.jobList}>
              {filtered.map(job => (
                <div key={job.id} className={styles.jobCard}
                  onClick={() => openModal(job)} role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openModal(job)}
                  id={`job-${job.id}`}>
                  <div className={styles.jobCardLeft}>
                    <div className={styles.jobBadges}>
                      <span className={`${styles.jobBadge} ${styles.jobBadgeDept}`}>{job.department}</span>
                      <span className={styles.jobBadge}>{job.type}</span>
                      <span className={styles.jobBadge}>{job.location}</span>
                      {job.experience && <span className={styles.jobBadge}>{job.experience}</span>}
                      {job.salaryRange && <span className={`${styles.jobBadge} ${styles.jobBadgeSalary}`}>{job.salaryRange}</span>}
                    </div>
                    <h3 className={`${styles.jobTitle} display`}>{job.title}</h3>
                    <p className={styles.jobDesc}>{job.description}</p>
                    {/* Skills pills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className={styles.skillPills}>
                        {job.skills.map(s => <span key={s} className={styles.skillPill}>{s}</span>)}
                      </div>
                    )}
                    {/* Deadline */}
                    {job.applicationDeadline && (
                      <p className={styles.deadline}>
                        Apply by {new Date(job.applicationDeadline).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                      </p>
                    )}
                  </div>
                  <div className={styles.jobCardRight}>
                    <button className={styles.applyBtn}
                      onClick={e => { e.stopPropagation(); openModal(job); }}
                      type="button" id={`apply-btn-${job.id}`}>
                      Apply Now →
                    </button>
                    <span className={styles.jobArrow}>→</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noJobs}>
              <p>No {activeFilter !== 'All' ? activeFilter + ' ' : ''}positions open right now.</p>
              <button className={styles.generalApplyBtn} onClick={() => openModal(null)}
                type="button" id="general-apply-btn">
                Send a General Application →
              </button>
            </div>
          )}

          {/* General apply CTA */}
          {filtered.length > 0 && (
            <div style={{
              marginTop: '48px', paddingTop: '48px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '24px', flexWrap: 'wrap',
            }}>
              <div>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(18px,2vw,28px)', textTransform:'uppercase', letterSpacing:'0.04em', color:'rgba(255,255,255,0.7)', marginBottom:'8px' }}>
                  Don&apos;t see a role that fits?
                </p>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'rgba(255,255,255,0.4)' }}>
                  We&apos;re always looking for exceptional people. Send us a general application.
                </p>
              </div>
              <button className={styles.generalApplyBtn} onClick={() => openModal(null)}
                type="button" id="general-apply-btn-bottom">
                General Application →
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Application modal */}
      {selectedJob !== undefined && (
        <ApplicationModal job={selectedJob} onClose={closeModal} />
      )}
    </>
  );
}
