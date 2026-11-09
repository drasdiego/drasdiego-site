import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogGuidePage } from '@/components/BlogPages';
import { GUIDES, blogMetadata, findCategory, findGuide } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ category: g.category, slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const guide = findGuide(category, slug);
  if (!guide) return {};
  return blogMetadata('pt', `/${category}/${slug}`, guide.pt.title, guide.pt.description, 'article');
}

export default async function Page({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const cat = findCategory(category);
  const guide = findGuide(category, slug);
  if (!cat || !guide) notFound();
  return <BlogGuidePage lang="pt" category={cat} guide={guide} />;
}
