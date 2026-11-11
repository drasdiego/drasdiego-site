import { GUIDES } from '@/lib/blog';
import { GUIDE_OG_SIZE, guideOgImage } from '@/lib/og-guia';

export const alt = 'A practical guide by Diego Arruda.';
export const size = GUIDE_OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ category: g.category, slug: g.slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return guideOgImage('en', category, slug);
}
