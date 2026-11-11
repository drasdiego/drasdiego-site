import { CATEGORIES } from '@/lib/blog';
export { default, alt, size, contentType } from '../../opengraph-image';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}
