import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://www.drasdiego.com.br', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
