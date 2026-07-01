import type { Intent } from '@/lib/types';

// ──────────────────────────────────────────
// Intent tree — no API key needed
// ──────────────────────────────────────────
export const INTENTS: Intent[] = [
  {
    id: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'howdy', 'start'],
    responses: [
      "Hey! 👋 Welcome to Autonex AI. I'm here to help you explore how we can automate and grow your business.",
      "Hello! 👋 Great to see you. I can answer questions about our services, pricing, or help you book a free strategy call.",
    ],
    followUp: ['Our Services', 'Book a Call', 'About Autonex', 'Blog'],
  },
  {
    id: 'services',
    patterns: ['service', 'what do you', 'offer', 'help with', 'capabilities', 'build', 'create', 'develop'],
    responses: [
      "We offer 8 core services: Web Development, AI Sales & Support Agents, AI Lead Generation, AI Content Systems, CRM & Operations Automation, AI Voice Agents, AI Reporting, and Document Processing. Which interests you?",
    ],
    followUp: ['Web Development', 'AI Agents', 'Automation', 'Lead Generation'],
  },
  {
    id: 'web-dev',
    patterns: ['web', 'website', 'landing page', 'frontend', 'site'],
    responses: [
      "We build fast, responsive, and scalable websites designed to convert visitors into customers. Every site we deliver is optimized for performance and your brand. 🌐",
    ],
    followUp: ['Book a Call', 'See Pricing', 'Other Services'],
  },
  {
    id: 'ai-agents',
    patterns: ['ai agent', 'chatbot', 'sales agent', 'support agent', 'customer service', 'bot'],
    responses: [
      "Our AI Sales & Support Agents handle customer queries, qualify leads, and support your sales process — 24/7, automatically. Think of it as a team member that never sleeps. 🤖",
    ],
    followUp: ['Book a Call', 'Lead Generation', 'Voice Agents'],
  },
  {
    id: 'automation',
    patterns: ['automat', 'crm', 'workflow', 'operations', 'manual', 'process', 'streamline'],
    responses: [
      "Our CRM & Operations Automation connects your tools, eliminates manual work, and streamlines how your business runs. We integrate with most popular platforms. ⚙️",
    ],
    followUp: ['Book a Call', 'AI Reporting', 'Document Processing'],
  },
  {
    id: 'lead-gen',
    patterns: ['lead', 'prospect', 'outreach', 'generate', 'pipeline', 'sales'],
    responses: [
      "Our AI Lead Generation & Outreach system builds automated, personalized outreach sequences that consistently fill your pipeline with qualified prospects. 🎯",
    ],
    followUp: ['Book a Call', 'AI Sales Agents', 'Content Systems'],
  },
  {
    id: 'content',
    patterns: ['content', 'blog', 'social', 'post', 'marketing', 'copywriting'],
    responses: [
      "Our AI Content Systems generate blogs, social posts, and marketing copy at scale — maintaining your brand voice while saving dozens of hours. ✍️",
    ],
    followUp: ['Book a Call', 'Other Services'],
  },
  {
    id: 'voice',
    patterns: ['voice', 'phone', 'call', 'booking', 'appointment', 'reception'],
    responses: [
      "Our AI Voice Agents handle inbound/outbound calls, bookings, and customer interactions automatically — so you never miss a lead. 📞",
    ],
    followUp: ['Book a Call', 'AI Support Agents'],
  },
  {
    id: 'reporting',
    patterns: ['report', 'dashboard', 'analytics', 'data', 'insight', 'intelligence', 'kpi'],
    responses: [
      "We build automated dashboards and reports that pull live data, so you always know how your business is performing — without manually pulling spreadsheets. 📊",
    ],
    followUp: ['Book a Call', 'CRM Automation'],
  },
  {
    id: 'document',
    patterns: ['document', 'approval', 'paperwork', 'invoice', 'form', 'pdf', 'processing'],
    responses: [
      "Our Document Processing AI automates form handling, approvals, data extraction, and repetitive document workflows — cutting processing time dramatically. 📄",
    ],
    followUp: ['Book a Call', 'Operations Automation'],
  },
  {
    id: 'pricing',
    patterns: ['price', 'cost', 'pricing', 'how much', 'rate', 'charge', 'fee', 'budget', 'afford', 'package'],
    responses: [
      "Our pricing is scoped to your specific project and goals — so we never over-charge or under-deliver. The fastest way to get an accurate estimate is a free 30-min strategy call.",
    ],
    followUp: ['Book a Free Call', 'Contact Us'],
    link: { label: 'Book a Free Strategy Call', href: 'https://cal.com/autonex-ai/30min' },
  },
  {
    id: 'booking',
    patterns: ['book', 'schedule', 'meeting', 'calendar', 'call', 'consult', 'strategy', 'talk', 'demo'],
    responses: [
      "Awesome! Book a free 30-minute strategy call — no commitment, no sales pressure. Just clarity on what's possible for your business. 🚀",
    ],
    followUp: ['Book a Free Call'],
    link: { label: '📅 Book Your Free Strategy Call', href: 'https://cal.com/autonex-ai/30min' },
  },
  {
    id: 'contact',
    patterns: ['contact', 'email', 'reach', 'message', 'get in touch', 'touch'],
    responses: [
      "You can reach us at hello@autonexai.org — or fill the contact form on our website. We typically respond within 24 hours. 📧",
    ],
    followUp: ['Book a Call', 'Our Services'],
    link: { label: 'Go to Contact Page', href: '/contact' },
  },
  {
    id: 'about',
    patterns: ['about', 'who are', 'company', 'team', 'founded', 'autonex', 'background'],
    responses: [
      "Autonex AI builds high-performance websites and automation systems that help startups and growing businesses save time, reduce manual work, and scale efficiently. We combine modern web development with smart automation. 🚀",
    ],
    followUp: ['Our Services', 'Book a Call', 'Blog'],
    link: { label: 'Learn More About Us', href: '/about' },
  },
  {
    id: 'blog',
    patterns: ['blog', 'article', 'read', 'resource', 'guide', 'learn', 'knowledge'],
    responses: [
      "We publish practical guides on AI automation, web development, and business efficiency on our blog. Worth a read! 📚",
    ],
    followUp: ['Go to Blog', 'Book a Call'],
    link: { label: 'Read Our Blog', href: '/blog' },
  },
  {
    id: 'timeline',
    patterns: ['how long', 'timeline', 'deadline', 'time', 'duration', 'quick', 'fast', 'week'],
    responses: [
      "Timelines vary by project scope. A website typically takes 2–4 weeks; automation systems take 3–6 weeks depending on complexity. We'll give you a precise timeline after our strategy call.",
    ],
    followUp: ['Book a Call', 'Pricing'],
  },
  {
    id: 'startups',
    patterns: ['startup', 'small business', 'growing', 'early stage', 'entrepreneur', 'founder'],
    responses: [
      "We specialize in working with startups and growing businesses — we understand your constraints and move fast. Our systems are built to scale with you. 🌱",
    ],
    followUp: ['Our Services', 'Book a Call'],
  },
  {
    id: 'fallback',
    patterns: [],
    responses: [
      "Great question! I'm not 100% sure about that, but our team can give you a definitive answer on a quick call. 😊",
      "Hmm, I'd love to help but that's a bit outside my knowledge! Drop us an email at hello@autonexai.org and we'll get back to you.",
    ],
    followUp: ['Book a Call', 'Contact Us', 'Our Services'],
  },
];

// Quick-reply button labels → mapped to user intents
export const QUICK_REPLY_INTENTS: Record<string, string> = {
  'our services':      'services',
  'book a call':       'booking',
  'book a free call':  'booking',
  'about autonex':     'about',
  'blog':              'blog',
  'go to blog':        'blog',
  'web development':   'web-dev',
  'ai agents':         'ai-agents',
  'ai support agents': 'ai-agents',
  'automation':        'automation',
  'crm automation':    'automation',
  'lead generation':   'lead-gen',
  'content systems':   'content',
  'voice agents':      'voice',
  'ai reporting':      'reporting',
  'document processing': 'document',
  'see pricing':       'pricing',
  'pricing':           'pricing',
  'contact us':        'contact',
  'other services':    'services',
  'operations automation': 'automation',
  'startups':          'startups',
  'timeline':          'timeline',
};

export function getResponse(userInput: string): Intent {
  const input = userInput.toLowerCase().trim();

  // Check quick reply mapping first
  if (QUICK_REPLY_INTENTS[input]) {
    const intentId = QUICK_REPLY_INTENTS[input];
    const found = INTENTS.find(i => i.id === intentId);
    if (found) return found;
  }

  // Pattern match
  const matched = INTENTS.find(intent =>
    intent.patterns.some(pattern => input.includes(pattern))
  );
  return matched ?? INTENTS.find(i => i.id === 'fallback')!;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
