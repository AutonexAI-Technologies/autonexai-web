import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — Autonex AI Technologies',
  description: 'Privacy Policy for Autonex AI Technologies (v2.0). Learn how we collect, use, store, and protect your personal data in compliance with the Digital Personal Data Protection Act 2023, Information Technology Act 2000, and applicable Indian regulations.',
};

const EFFECTIVE_DATE = '25 May 2026';
const VERSION = '2.0';
const COMPANY = 'Autonex AI Technologies';
const EMAIL = 'hello@autonexai.org';
const ADDRESS = 'Hyderabad, Telangana, India';

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className="container">
          <Link href="/" className={styles.back}>← Home</Link>
          <p className={styles.heroLabel}>[Legal Document]</p>
          <h1 className={`${styles.heroHeading} display`}>
            Privacy<br />
            <span className={styles.ghost}>Policy.</span>
          </h1>
          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Version</span>
              <span className={styles.metaValue}>{VERSION}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Effective Date</span>
              <span className={styles.metaValue}>{EFFECTIVE_DATE}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Jurisdiction</span>
              <span className={styles.metaValue}>Hyderabad, Telangana, India</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Contact</span>
              <span className={styles.metaValue}>{EMAIL}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <div className={`${styles.contentInner} container`}>

          {/* Legal Notice */}
          <div className={styles.infoBox}>
            <span className={styles.calloutIcon}>ℹ</span>
            <div>
              <p className={styles.calloutTitle}>Legal Notice</p>
              <p className={styles.calloutText}>
                This Privacy Policy is a legally binding document. By using our website or services, you consent to the
                practices described herein. If you do not agree, you must discontinue use immediately.
              </p>
            </div>
          </div>

          {/* §1 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>1. Introduction &amp; Data Controller Identity</h2>
            <p>
              <strong>{COMPANY}</strong> (&apos;Autonex&apos;, &apos;we&apos;, &apos;our&apos;, &apos;us&apos;) is the Data Controller for all
              personal data collected through our website and services. We are committed to protecting your personal data
              and processing it lawfully, fairly, and transparently in accordance with the{' '}
              <strong>Information Technology Act, 2000</strong>, the{' '}
              <strong>
                Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
                Information) Rules, 2011
              </strong>
              , and the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
            </p>
            <div className={styles.contactCard}>
              <p><strong>Registered Business Name:</strong> {COMPANY}</p>
              <p><strong>Data Controller Contact:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              <p>
                <strong>Grievance Officer:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a> (Response within 30 days as
                required by law)
              </p>
            </div>
          </section>

          {/* §2 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>2. Definitions</h2>
            <p>For the purpose of this Policy, the following terms shall have the meanings set out below:</p>
            <ul className={styles.list}>
              <li>
                <strong>&quot;Personal Data&quot;</strong> means any information relating to an identified or identifiable
                natural person.
              </li>
              <li>
                <strong>&quot;Processing&quot;</strong> means any operation performed on personal data, including collection,
                storage, use, disclosure, and deletion.
              </li>
              <li>
                <strong>&quot;Data Principal&quot;</strong> means the individual to whom the personal data relates (you, the
                user).
              </li>
              <li>
                <strong>&quot;Data Fiduciary&quot;</strong> means the entity that determines the purpose and means of
                processing ({COMPANY}).
              </li>
              <li>
                <strong>&quot;Consent&quot;</strong> means a freely given, specific, informed, and unambiguous indication of
                agreement to the processing of personal data.
              </li>
            </ul>
          </section>

          {/* §3 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>3. Information We Collect</h2>
            <p>
              We collect only the minimum personal data necessary for specified, explicit, and legitimate purposes.
              Categories of data collected include:
            </p>

            <h3 className={styles.subHeading}>3.1 Data You Voluntarily Provide</h3>
            <ul className={styles.list}>
              <li>Full name and business email address (via contact and onboarding forms)</li>
              <li>Business name, industry, and size</li>
              <li>Project requirements and business bottlenecks</li>
              <li>
                Payment details (processed exclusively through secure third-party payment gateways; we do not store card
                data)
              </li>
              <li>Meeting and scheduling preferences (via Cal.com)</li>
              <li>Communications and correspondence with us</li>
            </ul>

            <h3 className={styles.subHeading}>3.2 Data Collected Automatically</h3>
            <ul className={styles.list}>
              <li>IP address and approximate geographic location</li>
              <li>Browser type, version, and operating system</li>
              <li>Pages visited, time on site, and referral sources (via analytics tools where enabled)</li>
              <li>Device identifiers and cookie data</li>
            </ul>

            <h3 className={styles.subHeading}>3.3 Data We Do Not Collect</h3>
            <p>
              We do not collect Sensitive Personal Data or Information (SPDI) as defined under the IT (SPDI) Rules,
              2011 — including financial credentials, government ID numbers, medical information, or biometric data —
              unless explicitly required for a contracted service and with express written consent.
            </p>
          </section>

          {/* §4 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>4. Legal Basis for Processing</h2>
            <p>
              We process your personal data only when we have a lawful basis to do so under the{' '}
              <strong>DPDP Act, 2023</strong> and applicable Indian law:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Consent:</strong> You have given explicit consent for a specific purpose (e.g., receiving
                marketing communications).
              </li>
              <li>
                <strong>Contractual Necessity:</strong> Processing is necessary to fulfil or prepare a contract with you
                (e.g., delivering a project) under the <strong>Indian Contract Act, 1872</strong>.
              </li>
              <li>
                <strong>Legal Obligation:</strong> We are required to process your data to comply with a legal
                obligation under Indian law.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests,
                provided those interests are not overridden by your rights and freedoms.
              </li>
            </ul>
            <p>
              You may withdraw consent at any time by contacting us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              Withdrawal does not affect the lawfulness of processing based on consent before withdrawal.
            </p>
          </section>

          {/* §5 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>5. How We Use Your Information</h2>
            <p>Your data is used exclusively for the following purposes:</p>
            <ul className={styles.list}>
              <li>To respond to inquiries and provide quotes or proposals</li>
              <li>To onboard you as a client and deliver contracted services</li>
              <li>To process payments and maintain financial records</li>
              <li>To communicate project status, updates, and deliverables</li>
              <li>To schedule and manage calls, meetings, and milestones via Cal.com</li>
              <li>To comply with legal, regulatory, and tax obligations under Indian law</li>
              <li>To protect against fraud, identity misrepresentation, and misuse of services</li>
              <li>To improve our website, services, and internal processes</li>
            </ul>
            <p className={styles.highlightBox}>
              ⚡ We will never use your data for purposes incompatible with those stated above without prior
              notification and, where required, fresh consent. We do not sell, rent, or trade your personal data to any
              third party for their marketing purposes.
            </p>
          </section>

          {/* §6 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>6. Data Sharing &amp; Third-Party Processors</h2>
            <p>
              We do not sell, rent, trade, or broker your personal data to any third party. We may share your data only
              with trusted sub-processors who assist in delivering our services, and only to the extent strictly
              necessary:
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Processor</th>
                    <th>Purpose</th>
                    <th>Data Shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Formspree</td>
                    <td>Contact form submissions</td>
                    <td>Name, email, inquiry details</td>
                  </tr>
                  <tr>
                    <td>Cal.com</td>
                    <td>Meeting scheduling</td>
                    <td>Name, email, schedule preferences</td>
                  </tr>
                  <tr>
                    <td>Google Analytics</td>
                    <td>Website analytics (if enabled)</td>
                    <td>Anonymised usage data</td>
                  </tr>
                  <tr>
                    <td>Payment Gateway</td>
                    <td>Secure payment processing</td>
                    <td>Payment amount, transaction ID</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              We ensure that all third-party processors are contractually bound to maintain confidentiality and
              implement appropriate security measures equivalent to Indian standards.
            </p>
          </section>

          {/* §7 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>7. International Data Transfers</h2>
            <p>
              Some of our sub-processors may process your data outside India. Where such transfers occur, we ensure
              they are protected by appropriate safeguards including standard contractual clauses, adequacy decisions,
              or other legally recognised mechanisms in compliance with the <strong>DPDP Act, 2023</strong>. By using
              our services, you consent to such transfers where necessary for service delivery.
            </p>
          </section>

          {/* §8 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>8. Data Retention</h2>
            <p>
              We retain your personal data only for as long as is necessary for the purpose it was collected or as
              required by applicable Indian law:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Inquiry data (non-clients):</strong> 12 months from last contact
              </li>
              <li>
                <strong>Client project records:</strong> 7 years from project completion (statutory compliance under
                the <strong>Companies Act, 2013</strong>)
              </li>
              <li>
                <strong>Financial and payment records:</strong> 7 years (as required by the{' '}
                <strong>Income Tax Act, 1961</strong> and GST law)
              </li>
              <li>
                <strong>Marketing consent records:</strong> Until consent is withdrawn plus 3 years
              </li>
              <li>
                <strong>Security and fraud prevention logs:</strong> 3 years
              </li>
            </ul>
            <p>
              Upon expiry of the applicable retention period, data will be securely deleted or anonymised. Deletion
              includes removal from backup systems within 90 days of the scheduled deletion date.
            </p>
          </section>

          {/* §9 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>9. Cookies &amp; Tracking Technologies</h2>
            <p>
              Our website may use cookies and similar tracking technologies. In accordance with applicable Indian
              regulations, we obtain consent for non-essential cookies. We use:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Strictly Necessary Cookies:</strong> Required for the website to function. These cannot be
                disabled.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Used to understand how visitors interact with our website (e.g.,
                Google Analytics). These are only activated with your consent.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Used to remember your settings and preferences (1-year duration).
              </li>
            </ul>
            <p>
              You may control and manage cookies through your browser settings. Disabling essential cookies may affect
              website functionality.
            </p>
          </section>

          {/* §10 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>10. Data Security</h2>
            <p>
              We implement and maintain industry-standard technical and organisational security measures as required
              under <strong>Rule 8 of the IT (Reasonable Security Practices and Procedures and SPDI) Rules, 2011</strong>
              . Measures include:
            </p>
            <ul className={styles.list}>
              <li>Encrypted data transmission (SSL/TLS) and encryption at rest for all sensitive data stores</li>
              <li>Multi-factor authentication (MFA) for all internal system access</li>
              <li>Access controls limited to authorised personnel on a strict need-to-know basis</li>
              <li>Audit logging of all access to personal data systems</li>
              <li>Regular security assessments, vulnerability scanning, and penetration testing</li>
              <li>Secure data disposal using approved data destruction methods</li>
            </ul>
            <p>
              In the event of a personal data breach, we will notify <strong>CERT-In within 6 hours</strong> of
              becoming aware, as mandated by the CERT-In Directions (April 2022). Affected Data Principals will be
              notified within 72 hours where feasible, and the incident will be reported to the{' '}
              <strong>Data Protection Board of India</strong> as required by the DPDP Act, 2023.
            </p>
          </section>

          {/* §11 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>11. Your Rights as a Data Principal</h2>
            <p>
              Under the <strong>Digital Personal Data Protection Act, 2023</strong> and applicable Indian data
              protection law, you have the following rights:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Right to Access:</strong> You may request a summary of the personal data we hold about you and
                how it is processed.
              </li>
              <li>
                <strong>Right to Correction:</strong> You may request correction of inaccurate or incomplete personal
                data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You may request deletion of your personal data, subject to our legal
                obligations to retain certain records.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it
                at any time without affecting the lawfulness of prior processing.
              </li>
              <li>
                <strong>Right to Grievance Redressal:</strong> You may raise a grievance with our Grievance Officer or
                escalate to the <strong>Data Protection Board of India</strong> once constituted under the DPDP Act,
                2023.
              </li>
              <li>
                <strong>Right to Nominate:</strong> You may nominate another individual to exercise your rights on your
                behalf in the event of death or incapacity.
              </li>
            </ul>
            <p>
              To exercise any of these rights, submit a written request to{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will respond within{' '}
              <strong>30 days</strong> as required by the DPDP Act, 2023. We may require identity verification before
              processing your request.
            </p>
          </section>

          {/* §12 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>12. Children&apos;s Privacy</h2>
            <p>
              Our services are directed exclusively at businesses and individuals aged 18 years and above. We do not
              knowingly collect personal data from minors. In accordance with the <strong>DPDP Act, 2023</strong>, if
              we become aware that a minor has provided us with personal data, we will delete it promptly and implement
              appropriate parental consent mechanisms. If you believe a minor has provided us with their data, please
              contact us immediately at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </section>

          {/* §13 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>13. AI Data Processing</h2>
            <p>
              As an AI technology company, we process certain client data through AI models and automated systems as
              part of delivering contracted services. We expressly confirm that:
            </p>
            <ul className={styles.list}>
              <li>
                Client data is processed by AI models{' '}
                <strong>solely for the purpose of delivering the contracted services</strong>
              </li>
              <li>
                Your data will{' '}
                <strong>
                  not be used to train, fine-tune, or improve any publicly available AI model
                </strong>{' '}
                without your explicit prior written consent
              </li>
              <li>
                AI-processed outputs are governed by the same data protection standards applicable to all other
                processing activities under this Policy
              </li>
              <li>
                Where third-party AI APIs are used (e.g., OpenAI, Google), only the minimum data necessary is shared,
                and such providers are reviewed for compliance with data protection standards before use
              </li>
            </ul>
          </section>

          {/* §14 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>14. Anti-Fraud &amp; Misrepresentation</h2>
            <div className={styles.warningBox}>
              <span className={styles.calloutIcon}>⚠</span>
              <div>
                <p className={styles.calloutTitle}>Fraud Prevention Notice</p>
                <p className={styles.calloutText}>
                  Any person who provides false, misleading, or fabricated identity or business information to obtain
                  services from {COMPANY} may be subject to: immediate termination of services, forfeiture of all
                  payments made, civil recovery proceedings under the{' '}
                  <strong>Code of Civil Procedure, 1908</strong>, and referral to law enforcement under the{' '}
                  <strong>Indian Penal Code, 1860</strong> (Sections 415–420 on cheating and fraud) and the{' '}
                  <strong>IT Act, 2000</strong> (Section 66D on identity impersonation by using a communication device).
                </p>
              </div>
            </div>
            <p>
              We reserve the right to verify the identity and credentials of any client or prospective client through
              reasonable means, including requesting government-issued identification, GST registration, or business
              registration documents, prior to or during any engagement.
            </p>
          </section>

          {/* §15 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>15. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in law, technology, or our
              practices. When we make material changes, we will post the updated Policy on our website with a revised
              effective date and, where practicable, notify existing clients by email. Your continued use of our
              services after the effective date of any update constitutes acceptance of the revised Policy.
            </p>
          </section>

          {/* §16 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>16. Grievance Officer &amp; Contact</h2>
            <p>
              If you have questions, concerns, or complaints about this Privacy Policy or our data practices, please
              contact our Grievance Officer. In accordance with the <strong>Information Technology Act, 2000</strong>{' '}
              and the{' '}
              <strong>IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>:
            </p>
            <div className={styles.contactCard}>
              <p><strong>Organisation:</strong> {COMPANY}</p>
              <p>
                <strong>Grievance Officer Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <p><strong>Address:</strong> {ADDRESS}</p>
              <p>
                <strong>Response Time:</strong> Grievances acknowledged within 24 hours; resolved within 30 days as
                required by the DPDP Act, 2023
              </p>
            </div>
            <p>
              If your grievance is not resolved satisfactorily, you may approach the{' '}
              <strong>Data Protection Board of India</strong> in accordance with the DPDP Act, 2023, or the competent
              Consumer Forum in Hyderabad, Telangana under the{' '}
              <strong>Consumer Protection Act, 2019</strong>.
            </p>
          </section>

          {/* Footer nav */}
          <div className={styles.legalFooter}>
            <p>
              Version {VERSION} · Last updated: {EFFECTIVE_DATE} · © 2026 {COMPANY}
            </p>
            <div className={styles.legalFooterLinks}>
              <Link href="/terms">Terms &amp; Conditions</Link>
              <span>·</span>
              <Link href="/contact">Contact Us</Link>
              <span>·</span>
              <Link href="/">Home</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
