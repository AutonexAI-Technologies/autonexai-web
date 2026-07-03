import type { Metadata } from 'next';
import CareersAdminClient from './CareersAdminClient';

export const metadata: Metadata = {
  title: 'Careers Admin — Autonex AI',
  robots: { index: false, follow: false }, // Never index this page
};

export default function CareersAdminPage() {
  return <CareersAdminClient />;
}
