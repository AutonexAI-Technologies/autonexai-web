'use client';
import { useEffect } from 'react';

// Cal.com embed script loader — injected once globally
// The booking link: https://cal.com/autonex-ai/30min

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
  }
}

export default function CalProvider() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.Cal) return;

    // Cal.com embed initialisation
    (function (C: Window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) { a.q.push(ar); };
      const d = C.document as Document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api: { q: unknown[] } & ((...a: unknown[]) => void) = Object.assign(
              function (...a: unknown[]) { p(api, a); },
              { q: [] as unknown[] }
            );
            const namespace = args[1] as string | undefined;
            if (typeof namespace === 'string') {
              cal.ns[namespace] = api;
              p(api, args);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', { origin: 'https://cal.com' });
    window.Cal('ui', {
      theme: 'dark',
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []);

  return null;
}
