// ──────────────────────────────────────────
// Shared TypeScript types
// ──────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  readingTime: number;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  readingTime: number;
  author: string;
  authorRole: string;
  authorAvatar: string;
}

export interface ServiceDetail {
  slug: string;
  num: string;
  icon: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  includes: string[];
  process: { step: string; desc: string }[];
  whoFor: string[];
  outcomes: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface Intent {
  id: string;
  patterns: string[];
  responses: string[];
  followUp?: string[];
  link?: { label: string; href: string };
}
