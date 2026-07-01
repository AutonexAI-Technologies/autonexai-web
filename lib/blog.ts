import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost, BlogMeta } from './types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

function calcReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getAllPostsMeta(): BlogMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '/images/hero-bg.png',
      tags: data.tags || [],
      readingTime: calcReadingTime(content),
      author: data.author || 'Autonex AI Team',
      authorRole: data.authorRole || 'Autonex AI',
      authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fm=webp&auto=format',
    } as BlogMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  let contentHtml = processedContent.toString();

  // Inject id attributes on h2/h3 for TOC anchor navigation
  contentHtml = contentHtml.replace(
    /<(h[23])>(.*?)<\/\1>/gi,
    (_match, tag, text) => {
      const id = text
        .replace(/<[^>]+>/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return `<${tag} id="${id}">${text}</${tag}>`;
    }
  );

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '/images/hero-bg.png',
    tags: data.tags || [],
    readingTime: calcReadingTime(content),
    content: contentHtml,
    author: data.author || 'Autonex AI Team',
    authorRole: data.authorRole || 'Autonex AI',
    authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fm=webp&auto=format',
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
