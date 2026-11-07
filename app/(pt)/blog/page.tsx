import type { Metadata } from 'next';
import { BlogHomePage } from '@/components/BlogPages';
import { BLOG_UI, blogMetadata } from '@/lib/blog';

export const metadata: Metadata = blogMetadata('pt', '', BLOG_UI.pt.indexTitle, BLOG_UI.pt.indexLead, 'website');

export default function Page() {
  return <BlogHomePage lang="pt" />;
}
