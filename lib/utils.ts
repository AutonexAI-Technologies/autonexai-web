/**
 * Browser-safe utility functions — no Node.js imports allowed here.
 * Import from this file in Client Components instead of lib/blog.ts.
 */

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
