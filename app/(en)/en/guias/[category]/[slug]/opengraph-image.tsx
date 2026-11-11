import { GUIDES, findGuide } from '@/lib/blog';
import { GUIDE_OG_SIZE, guideOgImage } from '@/lib/og-guia';

export const size = GUIDE_OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ category: g.category, slug: g.slug, __metadata_id__: 'guia' }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const guide = findGuide(category, slug);
  return [{ id: 'guia', alt: guide ? `Guide by Diego Arruda: ${guide.en.title}` : 'A practical guide by Diego Arruda.', size: GUIDE_OG_SIZE, contentType: 'image/png' }];
}

export default async function OpenGraphImage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return guideOgImage('en', category, slug);
}
