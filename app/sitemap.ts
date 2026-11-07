import type { MetadataRoute } from 'next';
import { LANGUAGE_ALTERNATES, SITE_URL, pageAlternates, pagePathUrl } from '@/lib/seo';
import { CATEGORIES, GUIDES } from '@/lib/blog';
import { PROJETOS } from '@/lib/projetos';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const blogSubs = ['', ...CATEGORIES.map((c) => `/${c.slug}`), ...GUIDES.map((g) => `/${g.category}/${g.slug}`)];
  const blog: MetadataRoute.Sitemap = blogSubs.flatMap((sub) => {
    const alternates = { languages: { 'pt-BR': `${SITE_URL}/blog${sub}`, en: `${SITE_URL}/en/blog${sub}`, 'x-default': `${SITE_URL}/blog${sub}` } };
    return [
      { url: `${SITE_URL}/blog${sub}`, lastModified, changeFrequency: 'monthly' as const, priority: sub ? 0.6 : 0.7, alternates },
      { url: `${SITE_URL}/en/blog${sub}`, lastModified, changeFrequency: 'monthly' as const, priority: sub ? 0.6 : 0.7, alternates },
    ];
  });
  const pageSubs = ['/sobre', '/projetos', ...PROJETOS.map((p) => `/projetos/${p.slug}`)];
  const pages: MetadataRoute.Sitemap = pageSubs.flatMap((sub) => {
    const alternates = { languages: pageAlternates(sub) };
    const priority = sub === '/projetos' || sub === '/sobre' ? 0.9 : 0.8;
    return [
      { url: pagePathUrl('pt', sub), lastModified, changeFrequency: 'monthly' as const, priority, alternates },
      { url: pagePathUrl('en', sub), lastModified, changeFrequency: 'monthly' as const, priority, alternates },
    ];
  });
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1, alternates: { languages: LANGUAGE_ALTERNATES } },
    { url: `${SITE_URL}/en`, lastModified, changeFrequency: 'monthly', priority: 1, alternates: { languages: LANGUAGE_ALTERNATES } },
    ...pages,
    ...blog,
  ];
}
