import type { Metadata } from 'next';
import { BlogHomePage } from '@/components/BlogPages';
import { BLOG_UI, blogMetadata } from '@/lib/blog';

export const metadata: Metadata = blogMetadata('en', '', BLOG_UI.en.indexTitle, BLOG_UI.en.indexLead, 'website');

export default function Page() {
  return <BlogHomePage lang="en" />;
}
