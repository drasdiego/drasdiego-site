import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogCategoryPage } from '@/components/BlogPages';
import { CATEGORIES, blogMetadata, findCategory } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) return {};
  return blogMetadata('pt', `/${cat.slug}`, cat.pt.name, cat.pt.desc, 'website');
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();
  return <BlogCategoryPage lang="pt" category={cat} />;
}
