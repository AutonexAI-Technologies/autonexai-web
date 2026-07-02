import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import BlogPostClient from './BlogPostClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — Autonex AI Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Autonex AI Blog`,
      description: post.excerpt,
      url: `https://www.autonexai.org/blog/${slug}`,
      type: 'article',
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
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
      title: `${post.title} — Autonex AI Blog`,
      description: post.excerpt,
      images: [post.coverImage, '/images/logo-black.png'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
