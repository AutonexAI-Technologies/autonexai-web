import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/legal.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Autonex AI Technologies',
  description: 'Terms & Conditions for Autonex AI Technologies (v2.0). Governs all service engagements including scope, payments, IP, deployment, warranties, maintenance, and dispute resolution under Indian law.',
  openGraph: {
    title: 'Terms & Conditions — Autonex AI Technologies',
    description: 'Terms & Conditions for Autonex AI Technologies (v2.0). Governs all service engagements including scope, payments, IP, deployment, warranties, maintenance, and dispute resolution under Indian law.',
    url: 'https://www.autonexai.org/terms',
    type: 'website',
    images: [
      {
        url: '/images/logo-black.png',
        width: 800,
        height: 800,
        alt: 'Autonex AI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions — Autonex AI Technologies',
    description: 'Terms & Conditions for Autonex AI Technologies (v2.0). Governs all service engagements including scope, payments, IP, deployment, warranties, maintenance, and dispute resolution under Indian law.',
    images: ['/images/logo-black.png'],
  },
};

const EFFECTIVE_DATE = '25 May 2026';
const VERSION = '2.0';
const COMPANY = 'Autonex AI Technologies';
const EMAIL = 'hello@autonexai.org';
const ADDRESS = 'Hyderabad, Telangana, India';

export default function TermsPage() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className="container">
          <Link href="/" className={styles.back}>← Home</Link>
          <p className={styles.heroLabel}>[Legal Document]</p>
          <h1 className={`${styles.heroHeading} display`}>
            Terms &amp;<br />
            <span className={styles.ghost}>Conditions.</span>
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

          {/* Important notice */}
          <div className={styles.warningBox}>
            <span className={styles.calloutIcon}>⚠</span>
            <div>
              <p className={styles.calloutTitle}>Important — Read Carefully</p>
              <p className={styles.calloutText}>
                These Terms &amp; Conditions constitute a legally binding agreement under the{' '}
                <strong>Indian Contract Act, 1872</strong>. By engaging {COMPANY} for any service, requesting a
                proposal, signing a contract, or making any payment, you confirm that you have read, understood, and
                agree to be bound by these Terms in their entirety.
              </p>
            </div>
          </div>

          {/* §1 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>1. Definitions</h2>
            <p>In these Terms &amp; Conditions, unless the context requires otherwise:</p>
            <ul className={styles.list}>
              <li>
                <strong>&quot;Company&quot;</strong> or <strong>&quot;Autonex&quot;</strong> means {COMPANY}, its
                employees, contractors, and authorised representatives.
              </li>
              <li>
                <strong>&quot;Client&quot;</strong> means any individual, sole trader, company, or legal entity
                engaging or attempting to engage Autonex for services.
              </li>
              <li>
                <strong>&quot;Services&quot;</strong> means any web development, AI automation, consulting, reporting,
                CRM, content, or related services provided by Autonex.
              </li>
              <li>
                <strong>&quot;Project&quot;</strong> means a specific, scoped engagement of Services as agreed in
                writing between the parties.
              </li>
              <li>
                <strong>&quot;Deliverable&quot;</strong> means any tangible output, code, design, system, report, or
                documentation produced under a Project.
              </li>
              <li>
                <strong>&quot;Agreement&quot;</strong> means these Terms &amp; Conditions, together with any project
                contract, scope document, and invoice issued by Autonex.
              </li>
              <li>
                <strong>&quot;Force Majeure Event&quot;</strong> means any event beyond the reasonable control of a
                party, including natural disasters, government actions, internet or infrastructure outages, or pandemic.
              </li>
            </ul>
          </section>

          {/* §2 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>2. Acceptance of Terms</h2>
            <p>
              These Terms apply to all website visitors, prospective clients, and existing clients. A binding agreement
              is formed when: (a) the Client signs a project contract or scope document; (b) the Client makes any
              payment to Autonex; or (c) Autonex begins delivering any services at the Client&apos;s request. No earlier
              verbal or written representation shall override these Terms unless expressly incorporated in writing and
              signed by an authorised representative of Autonex.
            </p>
          </section>

          {/* §3 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>3. Services</h2>
            <p>
              Autonex provides custom technology services including but not limited to web development, AI sales and
              support agents, AI lead generation, content systems, CRM automation, AI voice agents, reporting and
              business intelligence, and document processing.
            </p>
            <p>
              All services are customised based on the Client&apos;s confirmed requirements. Autonex reserves the right to
              decline any project or client enquiry without obligation to provide reasons.
            </p>
          </section>

          {/* §4 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>4. Client Identity, Authority &amp; Representations</h2>
            <p>By engaging Autonex, the Client expressly warrants and represents that:</p>
            <ul className={styles.list}>
              <li>
                All information provided during enquiry, onboarding, and throughout the engagement is truthful,
                accurate, and complete
              </li>
              <li>
                The Client is a legally constituted individual, partnership, or incorporated entity with the legal
                capacity to enter into contracts under the <strong>Indian Contract Act, 1872</strong>
              </li>
              <li>
                The person signing any contract or making payment is duly authorised to bind the Client entity
              </li>
              <li>
                The Client&apos;s business, intended use of services, and provided credentials are genuine
              </li>
              <li>
                The Client will promptly notify Autonex of any change in circumstances that affects the accuracy of
                representations made
              </li>
            </ul>
            <div className={styles.warningBox}>
              <span className={styles.calloutIcon}>⚠</span>
              <div>
                <p className={styles.calloutTitle}>Misrepresentation Clause</p>
                <p className={styles.calloutText}>
                  Any Client who provides false, misleading, or fabricated identity, business, or financial information
                  to obtain services — including but not limited to misrepresenting business size, budget, authority, or
                  intended use — will be in material breach of this Agreement. Upon discovery, Autonex may immediately
                  terminate all services, retain all payments received, pursue civil recovery of outstanding amounts
                  under the <strong>Code of Civil Procedure, 1908</strong>, and refer the matter to law enforcement
                  under the <strong>Indian Penal Code, 1860</strong> (Sections 415–420) and the{' '}
                  <strong>IT Act, 2000</strong>. No refund shall be due in such circumstances.
                </p>
              </div>
            </div>
          </section>

          {/* §5 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>5. Project Engagement &amp; Scope of Work</h2>

            <h3 className={styles.subHeading}>5.1 Commencement</h3>
            <p>
              A project commences only after: (a) both parties have agreed on scope in writing; (b) the Client has
              signed the project contract; and (c) the required deposit has been received and cleared.
            </p>

            <h3 className={styles.subHeading}>5.2 Scope Definition</h3>
            <p>
              The agreed scope of work will be documented in a Project Brief or Statement of Work (&apos;SOW&apos;) shared
              before commencement. The SOW is the definitive reference for deliverables, features, and specifications.
            </p>

            <h3 className={styles.subHeading}>5.3 Scope Freeze</h3>
            <p>
              Once a project commences, the agreed scope is frozen. New requirements, features, or material changes
              requested by the Client after commencement constitute scope changes and will be handled under Clause 6.
            </p>

            <h3 className={styles.subHeading}>5.4 Client Cooperation</h3>
            <p>
              The Client agrees to provide all required assets (content, credentials, branding, approvals) within 5
              business days of request. Failure to do so constitutes a client-caused delay and extends timelines
              accordingly without penalty to Autonex.
            </p>

            <h3 className={styles.subHeading}>5.5 Project Brief Accuracy</h3>
            <p>
              Autonex is entitled to rely on all information provided by the Client in the project brief. If such
              information proves incorrect, any rework required will be billed as additional work at Autonex&apos;s
              then-current rates.
            </p>
          </section>

          {/* §6 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>6. Scope Changes &amp; Additions</h2>
            <p>
              Any work requested by the Client that falls outside the agreed SOW — including new features, redesigns,
              additional integrations, or material changes to agreed specifications — will be treated as a scope change
              and must be agreed upon in writing before any additional work commences. Scope changes will be quoted and
              billed at Autonex&apos;s then-current hourly rate (minimum ₹5,000 per hour) or as a separately agreed fixed
              fee. Autonex is under no obligation to perform out-of-scope work without written agreement and additional
              payment.
            </p>
          </section>

          {/* §7 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>7. Revisions Policy</h2>
            <p>
              Each project includes up to two (2) rounds of revisions within the originally agreed scope. A
              &apos;revision round&apos; is defined as a consolidated, written list of feedback submitted in a single
              communication. Revision requests must be submitted in writing within 7 calendar days of delivery.
              Feedback submitted after this window, or feedback that constitutes new requirements, will be treated as a
              scope change under Clause 6. Additional revision rounds beyond the included two will be billed at ₹5,000
              per round or as separately agreed.
            </p>
          </section>

          {/* §8 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>8. Payments</h2>

            <h3 className={styles.subHeading}>8.1 Deposit</h3>
            <p>
              A non-refundable deposit of 50% of the total agreed project fee is required before any work commences.
              Work will not begin until the deposit is received and cleared. The deposit represents a commitment of
              resources and opportunity cost.
            </p>

            <h3 className={styles.subHeading}>8.2 Final Payment</h3>
            <p>
              The remaining 50% balance is due upon project completion and before final Deliverables, source files, or
              credentials are released to the Client.
            </p>

            <h3 className={styles.subHeading}>8.3 Milestone Payments</h3>
            <p>
              For larger projects, milestone-based payment schedules may be agreed in writing. Failure to meet a
              milestone payment may result in suspension of work until payment is received.
            </p>

            <h3 className={styles.subHeading}>8.4 Late Payment</h3>
            <p>
              Balances not paid within 7 days of the due date will incur an interest charge of 2% per month
              (compounding) on the outstanding amount. Work suspension is automatic at 14 days of non-payment.
            </p>

            <h3 className={styles.subHeading}>8.5 Withholding of Deliverables</h3>
            <p>
              Autonex expressly reserves the right to withhold all Deliverables, source code, access credentials, and
              related assets until full payment has been received and cleared.
            </p>

            <h3 className={styles.subHeading}>8.6 Currency</h3>
            <p>
              All amounts are in Indian Rupees (INR) unless expressly stated otherwise in the project contract.
            </p>

            <h3 className={styles.subHeading}>8.7 Taxes</h3>
            <p>
              All fees are exclusive of applicable taxes including GST. The Client is responsible for any taxes
              imposed on them by their jurisdiction. Applicable GST will be charged as per prevailing Indian tax law.
            </p>

            <div className={styles.warningBox}>
              <span className={styles.calloutIcon}>⚠</span>
              <div>
                <p className={styles.calloutTitle}>Anti-Chargeback Policy</p>
                <p className={styles.calloutText}>
                  By engaging Autonex and making payment, the Client expressly agrees not to initiate a chargeback,
                  payment dispute, or reversal with their bank, card provider, or payment platform for services
                  rendered or in progress. In the event of a dispute, the Client must first contact Autonex in writing
                  at <strong>{EMAIL}</strong> and allow a minimum of 7 business days for good-faith resolution.
                  Initiating a chargeback without following this process constitutes a material breach. Autonex
                  reserves the right to recover all amounts including chargeback fees, legal costs, and damages through
                  civil proceedings under the <strong>Code of Civil Procedure, 1908</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* §9 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>9. Refund Policy</h2>
            <ul className={styles.list}>
              <li>
                <strong>9.1</strong> Deposits are strictly non-refundable under all circumstances, including but not
                limited to the Client changing their mind, business closure, budget cuts, or dissatisfaction with
                preliminary concepts.
              </li>
              <li>
                <strong>9.2</strong> If the Client terminates the project after commencement, all work completed up to
                the date of termination will be assessed, invoiced at the pro-rata project rate, and payable within 7
                days.
              </li>
              <li>
                <strong>9.3</strong> Partial refunds are solely at Autonex&apos;s discretion and will only be considered
                in extraordinary circumstances where Autonex is demonstrably at fault and has failed to deliver agreed
                scope after a reasonable remediation period.
              </li>
              <li>
                <strong>9.4</strong> Refunds, if approved, will be processed within 14 business days to the original
                payment method.
              </li>
            </ul>
          </section>

          {/* §10 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>10. Timelines &amp; Delays</h2>
            <ul className={styles.list}>
              <li>
                <strong>10.1</strong> Project timelines will be outlined in the onboarding document and/or SOW. All
                timelines are estimates based on timely provision of required information and assets by the Client.
              </li>
              <li>
                <strong>10.2</strong> Client-caused delays — including delayed asset provision, approvals, feedback, or
                payments — automatically extend timelines on a day-for-day basis and do not constitute a breach by
                Autonex.
              </li>
              <li>
                <strong>10.3</strong> If a project is placed on hold at the Client&apos;s request for more than 30
                consecutive days, Autonex reserves the right to: (a) invoice and charge for all work completed to
                date; (b) treat the project as abandoned; or (c) charge a project re-engagement fee of up to 20% of
                the total project fee upon resumption.
              </li>
              <li>
                <strong>10.4 Force Majeure:</strong> Neither party shall be liable for delays caused by a Force
                Majeure Event. The affected party must notify the other within 5 business days of the onset.
              </li>
            </ul>
          </section>

          {/* §11 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>11. Deliverable Approval &amp; Deemed Acceptance</h2>
            <p>
              Upon delivery of any Deliverable or milestone, the Client must formally approve or reject it in writing
              within 7 calendar days. Rejection must be accompanied by specific, written reasons tied to the agreed
              SOW. Silence, non-response, or failure to provide structured feedback within 7 calendar days shall
              constitute <strong>deemed acceptance</strong> of the Deliverable. Autonex shall not be responsible for
              defects raised after deemed acceptance unless they are material defects present at the time of delivery.
            </p>
          </section>

          {/* §12 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>12. Intellectual Property</h2>

            <h3 className={styles.subHeading}>12.1 Ownership</h3>
            <p>
              Upon receipt of full and final payment, all custom Deliverables created specifically for the Client under
              the Agreement become the exclusive intellectual property of the Client, protected under the{' '}
              <strong>Copyright Act, 1957</strong>.
            </p>

            <h3 className={styles.subHeading}>12.2 Pre-existing IP</h3>
            <p>
              Any pre-existing intellectual property, frameworks, libraries, tools, methodologies, or code developed by
              Autonex prior to the engagement (&apos;Background IP&apos;) remains exclusively the property of Autonex. The Client
              receives a non-exclusive, non-transferable licence to use Background IP as incorporated in the
              Deliverable.
            </p>

            <h3 className={styles.subHeading}>12.3 Third-Party Licences</h3>
            <p>
              Deliverables may incorporate third-party tools, plugins, APIs, or open-source software. Such components
              remain subject to their respective licences. Autonex will disclose significant third-party dependencies
              in the SOW.
            </p>

            <h3 className={styles.subHeading}>12.4 Portfolio Rights</h3>
            <p>
              Autonex retains the right to display completed work in its portfolio, case studies, and marketing
              materials unless the Client explicitly requests confidentiality in writing at project commencement.
            </p>

            <h3 className={styles.subHeading}>12.5 No Transfer Without Payment</h3>
            <p>
              No intellectual property, code, or source files are transferred to the Client until full payment has been
              received. Unauthorised use of Deliverables before full payment constitutes IP infringement under the{' '}
              <strong>Copyright Act, 1957</strong>.
            </p>
          </section>

          {/* §13 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>13. Confidentiality</h2>

            <h3 className={styles.subHeading}>13.1</h3>
            <p>
              Both parties agree to keep confidential all Confidential Information received from the other party.
              &apos;Confidential Information&apos; means all business strategies, trade secrets, technical data, client lists,
              pricing, project details, and other non-public information disclosed in connection with this Agreement.
            </p>

            <h3 className={styles.subHeading}>13.2</h3>
            <p>
              Each party shall use Confidential Information solely for the purpose of this Agreement and shall not
              disclose it to third parties without prior written consent, except to employees or contractors who need
              to know and are bound by equivalent confidentiality obligations.
            </p>

            <h3 className={styles.subHeading}>13.3</h3>
            <p>This confidentiality obligation survives the termination of this Agreement indefinitely.</p>

            <h3 className={styles.subHeading}>13.4 Exceptions</h3>
            <p>
              Confidentiality obligations do not apply to information that: (a) is or becomes publicly known through no
              breach of this clause; (b) was already in the receiving party&apos;s possession before disclosure; (c) is
              required to be disclosed by law, court order, or regulatory authority.
            </p>

            <h3 className={styles.subHeading}>13.5 NDA</h3>
            <p>
              If either party requires a formal Non-Disclosure Agreement prior to sharing sensitive information, this
              may be requested before initial consultations and will be provided upon reasonable request.
            </p>
          </section>

          {/* §14 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>14. No Guarantees &amp; Disclaimer of Warranties</h2>
            <p>
              Autonex warrants that services will be performed with reasonable skill and care and that Deliverables
              will materially conform to the agreed SOW at the time of delivery. However:
            </p>
            <ul className={styles.list}>
              <li>
                Autonex does not guarantee specific business results, revenue, growth, lead volumes, or return on
                investment
              </li>
              <li>
                Performance of third-party tools, APIs, platforms, or integrations is outside Autonex&apos;s control and
                cannot be guaranteed
              </li>
              <li>
                AI-powered systems may produce variable outputs and are delivered as tools, not as guaranteed solutions
              </li>
              <li>
                Search engine rankings, algorithm changes, or platform policy changes are beyond Autonex&apos;s control
              </li>
            </ul>
            <p>
              All other warranties, express or implied, are excluded to the maximum extent permitted by Indian law,
              subject to your non-excludable rights under the <strong>Consumer Protection Act, 2019</strong>.
            </p>
          </section>

          {/* §15 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>15. Limitation of Liability</h2>

            <h3 className={styles.subHeading}>15.1</h3>
            <p>
              Autonex&apos;s total aggregate liability under or in connection with this Agreement, whether in contract, tort
              (including negligence), breach of statutory duty, or otherwise, shall not exceed the total fees paid by
              the Client under the relevant project in the 12 months preceding the claim.
            </p>

            <h3 className={styles.subHeading}>15.2</h3>
            <p>In no event shall Autonex be liable for:</p>
            <ul className={styles.list}>
              <li>Loss of profits, revenue, or business</li>
              <li>Loss of data or corruption of data</li>
              <li>Loss of goodwill or reputation</li>
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Failure of third-party services, tools, or platforms</li>
              <li>Damages arising from Client&apos;s misuse or modification of Deliverables after handover</li>
            </ul>

            <h3 className={styles.subHeading}>15.3</h3>
            <p>
              Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or
              fraudulent misrepresentation, or any other liability that cannot be excluded under the{' '}
              <strong>Consumer Protection Act, 2019</strong> or Indian law.
            </p>
          </section>

          {/* §16 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>16. Termination</h2>

            <h3 className={styles.subHeading}>16.1 By the Client</h3>
            <p>
              The Client may terminate a project with 14 days&apos; written notice. Upon termination, the non-refundable
              deposit is forfeited. Work completed up to the termination date will be assessed and invoiced at the
              pro-rata project rate. All outstanding amounts are due within 7 days.
            </p>

            <h3 className={styles.subHeading}>16.2 By Autonex (With Notice)</h3>
            <p>
              Autonex may terminate the Agreement with 14 days&apos; written notice if: (a) the Client repeatedly fails to
              provide required assets or approvals; (b) the Client&apos;s requirements have fundamentally changed beyond
              the agreed scope; or (c) continued engagement is no longer commercially viable.
            </p>

            <h3 className={styles.subHeading}>16.3 By Autonex (Immediate)</h3>
            <p>
              Autonex may terminate the Agreement immediately, without notice and without refund, in the event of:
              (a) non-payment of any invoice for more than 14 days; (b) material breach of these Terms by the Client;
              (c) discovery of Client misrepresentation or fraud; (d) abusive, threatening, or harassing conduct
              toward Autonex personnel; (e) the Client entering insolvency, receivership, or liquidation.
            </p>

            <h3 className={styles.subHeading}>16.4 Effect of Termination</h3>
            <p>
              Upon termination for any reason, the Client shall immediately pay all outstanding invoices. All licences
              are revoked until payment is settled. Autonex retains all completed work until outstanding amounts are
              paid in full.
            </p>
          </section>

          {/* §17 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>17. Prohibited Conduct &amp; Misuse of Services</h2>
            <p>
              The Client agrees not to use Autonex&apos;s services or Deliverables for any purpose that is unlawful,
              fraudulent, harmful, or contrary to these Terms. Prohibited conduct includes:
            </p>
            <ul className={styles.list}>
              <li>Using services to facilitate illegal activities, scams, or fraud</li>
              <li>Requesting content or systems that infringe third-party intellectual property</li>
              <li>Reverse engineering, reselling, or sublicensing Deliverables without Autonex&apos;s written consent</li>
              <li>Using AI systems built by Autonex to generate spam, misleading content, or harassment</li>
              <li>Making false or defamatory statements about Autonex</li>
              <li>Circumventing payment obligations through chargebacks or fraudulent claims</li>
            </ul>
            <p>
              Any prohibited conduct entitles Autonex to immediate termination of services, forfeiture of all
              payments, and civil or criminal proceedings as appropriate under Indian law.
            </p>
          </section>

          {/* §18 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>18. Dispute Resolution</h2>

            <h3 className={styles.subHeading}>18.1 Good-Faith Negotiation</h3>
            <p>
              In the event of any dispute arising under or in connection with this Agreement, both parties agree to
              first attempt resolution through good-faith negotiation. Either party may initiate this by sending
              written notice of the dispute to the other party. The parties will meet (in person or virtually) within
              14 days of the notice.
            </p>

            <h3 className={styles.subHeading}>18.2 Mediation</h3>
            <p>
              If the dispute is not resolved within 30 days of the written notice, either party may request formal
              mediation through a mutually agreed mediator. Costs of mediation will be shared equally.
            </p>

            <h3 className={styles.subHeading}>18.3 Legal Proceedings</h3>
            <p>
              If mediation fails or either party refuses to mediate, the dispute shall be subject to the exclusive
              jurisdiction of the courts of <strong>Hyderabad, Telangana, India</strong>, under the laws of India
              including the <strong>Arbitration and Conciliation Act, 1996</strong> and the{' '}
              <strong>Code of Civil Procedure, 1908</strong>.
            </p>

            <h3 className={styles.subHeading}>18.4 No Class Actions</h3>
            <p>
              Each party waives the right to participate in any class action, collective proceeding, or representative
              action against the other.
            </p>
          </section>

          {/* §19 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>19. Third-Party Services &amp; Integrations</h2>
            <p>
              Autonex may integrate third-party platforms, APIs, tools, or services (including Cal.com for scheduling,
              OpenAI, Google Cloud, Twilio, Vercel, and similar) as part of project delivery. The Client acknowledges
              that: (a) the availability and functionality of third-party services is beyond Autonex&apos;s control; (b)
              third-party terms of service, pricing, and policies may change; (c) Autonex is not responsible for
              third-party outages, security incidents, or policy changes; and (d) any third-party subscription or
              licence costs are the Client&apos;s responsibility unless expressly agreed otherwise in writing.
            </p>
          </section>

          {/* §20 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>20. Anti-Solicitation</h2>
            <p>
              During any engagement and for 12 months following its termination, the Client agrees not to directly or
              indirectly solicit, recruit, or engage any Autonex employee, contractor, or sub-processor who was
              involved in the Client&apos;s project. A breach of this clause will result in a recruitment fee equivalent to
              3 months of the relevant person&apos;s last invoiced rate, payable as liquidated damages.
            </p>
          </section>

          {/* §21 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>21. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms &amp; Conditions and all Agreements formed under them are governed by and construed in
              accordance with the laws of <strong>India</strong>. The courts of{' '}
              <strong>Hyderabad, Telangana</strong> shall have exclusive jurisdiction over any dispute arising from or
              connected with this Agreement. Both parties irrevocably submit to this jurisdiction.
            </p>
          </section>

          {/* §22 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>22. Severability</h2>
            <p>
              If any provision of these Terms is found by a competent court to be invalid, unlawful, or unenforceable,
              that provision shall be modified to the minimum extent necessary to make it enforceable, or if it cannot
              be so modified, it shall be severed. The remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* §23 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>23. Entire Agreement</h2>
            <p>
              These Terms &amp; Conditions, together with any project contract, SOW, and invoice issued by Autonex,
              constitute the entire agreement between the parties and supersede all prior negotiations,
              representations, warranties, understandings, or agreements (whether oral or written) relating to the
              subject matter hereof.
            </p>
          </section>

          {/* §24 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>24. Amendments</h2>
            <p>
              Autonex reserves the right to update these Terms at any time. Updated Terms will be posted on our
              website with a revised effective date. For clients with ongoing projects, material changes will be
              communicated by email. Continued engagement after the effective date of any update constitutes
              acceptance. If you do not agree to the updated Terms, you must cease use of our services.
            </p>
          </section>

          {/* §25 — NEW: Production Deployment */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>25. Production Deployment, Acceptance &amp; Warranty</h2>

            <h3 className={styles.subHeading}>25.1 Deployment Acceptance</h3>
            <p>
              Production deployment of any Deliverable constitutes successful delivery. Following deployment, the
              Client has <strong>14 calendar days</strong> to report critical defects in writing. Defects are defined
              as functionality failures that directly contradict the agreed SOW. Any issues not reported within this
              window are deemed accepted, and remediation will be treated as new billable work.
            </p>

            <h3 className={styles.subHeading}>25.2 Post-Deployment Warranty</h3>
            <p>
              Autonex provides a <strong>30-day post-deployment bug warranty</strong> for bugs arising from Autonex&apos;s
              own code within the agreed SOW. This warranty covers:
            </p>
            <ul className={styles.list}>
              <li>Bugs caused by Autonex&apos;s code that were present at the time of deployment — fixed at no cost</li>
              <li>
                Bugs caused by Client-made changes, third-party updates, or scope additions — billed as additional
                work
              </li>
              <li>New feature requests, design changes, or enhancements — always billed separately</li>
            </ul>

            <h3 className={styles.subHeading}>25.3 Post-Warranty Support</h3>
            <p>
              After the 30-day warranty period expires, all maintenance, bug fixes, and support are billable at
              Autonex&apos;s then-current rates, or covered under a separately agreed Maintenance Retainer (see Clause 29).
            </p>
          </section>

          {/* §26 — Infrastructure */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>26. Infrastructure Ownership, Credentials &amp; Hosting</h2>

            <h3 className={styles.subHeading}>26.1 Infrastructure Ownership</h3>
            <p>
              Upon project completion and full payment, ownership of the deployed infrastructure is as follows unless
              expressly agreed otherwise in writing:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Client-provided accounts</strong> (hosting, domain, DNS, cloud services): owned by the Client
              </li>
              <li>
                <strong>Autonex-provisioned accounts</strong> (where Autonex set up the infrastructure): transferred
                to the Client upon full payment and completion of handover
              </li>
              <li>
                Domain names, DNS records, email accounts, and SSL certificates: owned by whichever party registered
                them, as documented in the SOW
              </li>
            </ul>

            <h3 className={styles.subHeading}>26.2 Client Credentials Responsibility</h3>
            <p>
              The Client is responsible for providing valid, active credentials for all required third-party services
              (hosting providers, APIs, payment gateways, email platforms, domain registrars) within 5 business days
              of request. Delays caused by missing, expired, or incorrect credentials extend project timelines
              accordingly without liability to Autonex.
            </p>

            <h3 className={styles.subHeading}>26.3 Hosting Uptime</h3>
            <p>
              After handover, Autonex does not guarantee hosting uptime unless covered under a separately agreed
              Maintenance Retainer. Hosting uptime, performance, and availability are the responsibility of the
              Client&apos;s chosen hosting provider. Autonex is not liable for third-party hosting outages or disruptions.
            </p>
          </section>

          {/* §27 — Backup & Security */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>27. Backup, Disaster Recovery &amp; Security After Handover</h2>

            <h3 className={styles.subHeading}>27.1 Backup Responsibility</h3>
            <p>
              Unless a Maintenance Retainer covering backups is in place, the Client is solely responsible for
              maintaining backups of all Deliverables, databases, and infrastructure following handover. Autonex
              recommends automated daily backups and accepts no liability for data loss after the handover date.
            </p>

            <h3 className={styles.subHeading}>27.2 Disaster Recovery</h3>
            <p>
              Disaster recovery planning, restoration procedures, and recovery time objectives are the Client&apos;s
              responsibility after handover. Autonex may assist with recovery work as a separately quoted engagement.
            </p>

            <h3 className={styles.subHeading}>27.3 Security After Handover</h3>
            <p>
              Following handover, Autonex is not liable for security vulnerabilities or breaches arising from:
            </p>
            <ul className={styles.list}>
              <li>Client-made modifications to code, configuration, or infrastructure</li>
              <li>Weak or reused passwords or failure to implement multi-factor authentication</li>
              <li>Exposed API keys, credentials, or secrets due to Client actions</li>
              <li>Outdated software, plugins, or dependencies not updated by the Client</li>
              <li>Unauthorised third-party access or modifications</li>
              <li>Insecure server or hosting configuration set up by the Client</li>
            </ul>
          </section>

          {/* §28 — Maintenance Retainer */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>28. Maintenance, Support &amp; Retainer Services</h2>

            <h3 className={styles.subHeading}>28.1 Scope</h3>
            <p>
              Maintenance and ongoing support services are not included with project delivery unless expressly agreed
              in writing. Clients may subscribe to an <strong>Autonex Care Retainer</strong> for continued support.
              Retainer services may include: security monitoring, software and dependency updates, AI model
              optimisation, performance improvements, bug fixes within agreed scope, deployment assistance, backup
              verification, and monthly health reports.
            </p>

            <h3 className={styles.subHeading}>28.2 Retainer Billing</h3>
            <p>
              Retainer fees are billed monthly in advance. Unused support hours expire at the end of each billing
              period unless otherwise agreed in writing. Emergency work outside the selected retainer plan will be
              quoted and billed separately.
            </p>

            <h3 className={styles.subHeading}>28.3 Response Times</h3>
            <p>Under an active retainer, Autonex will use reasonable efforts to meet the following response targets:</p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Description</th>
                    <th>Target Response</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Critical</td>
                    <td>Complete service outage or data loss</td>
                    <td>4 business hours</td>
                  </tr>
                  <tr>
                    <td>High</td>
                    <td>Major functionality broken, no workaround</td>
                    <td>12 business hours</td>
                  </tr>
                  <tr>
                    <td>Medium</td>
                    <td>Partial disruption, workaround available</td>
                    <td>24 business hours</td>
                  </tr>
                  <tr>
                    <td>Low</td>
                    <td>Minor issues, cosmetic, or non-urgent</td>
                    <td>48 business hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Response times apply during Indian Standard Time (IST) business hours (Monday–Friday, 9:00 AM–6:00 PM
              IST) unless a 24×7 plan is expressly agreed.
            </p>

            <h3 className={styles.subHeading}>28.4 Cancellation</h3>
            <p>
              Either party may terminate a retainer agreement with 30 days&apos; written notice. No refunds are provided
              for unused portions of a prepaid monthly retainer period.
            </p>

            <h3 className={styles.subHeading}>28.5 AI Retainer Services</h3>
            <p>
              For AI system deployments, Autonex Care retainer plans may additionally include: prompt engineering
              optimisation, knowledge base updates, AI accuracy improvements, model version upgrades, token usage
              optimisation, hallucination monitoring, CRM integration support, and monthly AI performance analytics.
            </p>
          </section>

          {/* §29 — Contact */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>29. Contact &amp; Notices</h2>
            <p>
              All legal notices and formal communications under this Agreement must be sent in writing to:
            </p>
            <div className={styles.contactCard}>
              <p><strong>Company:</strong> {COMPANY}</p>
              <p><strong>Legal Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              <p><strong>Address:</strong> {ADDRESS}</p>
              <p><strong>Response time for legal notices:</strong> Within 7 business days</p>
            </div>
            <p>
              For general enquiries, support, or project communications, email{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </section>

          {/* Footer nav */}
          <div className={styles.legalFooter}>
            <p>
              Version {VERSION} · Last updated: {EFFECTIVE_DATE} · © 2026 {COMPANY}
            </p>
            <div className={styles.legalFooterLinks}>
              <Link href="/privacy">Privacy Policy</Link>
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
