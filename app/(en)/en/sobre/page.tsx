import type { Metadata } from 'next';
import { SobrePage } from '@/components/SobrePage';
import { SEO, buildPageMetadata } from '@/lib/seo';
import { NAV_UI } from '@/lib/site-nav';

export const revalidate = 600;

export const metadata: Metadata = buildPageMetadata('en', '/sobre', NAV_UI.en.sobre, SEO.en.personDescription);

export default function Page() {
  return <SobrePage lang="en" />;
}
