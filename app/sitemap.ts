import type { MetadataRoute } from 'next';
import { LANGUAGE_ALTERNATES, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1, alternates: { languages: LANGUAGE_ALTERNATES } },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: 'monthly', priority: 1, alternates: { languages: LANGUAGE_ALTERNATES } },
  ];
}
