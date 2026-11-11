import { PROJETOS } from '@/lib/projetos';
import { PROJECT_OG_SIZE, projetoOgAlt, projetoOgImage } from '@/lib/og-projeto';

export const size = PROJECT_OG_SIZE;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug, __metadata_id__: 'projeto' }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return [{ id: 'projeto', alt: projetoOgAlt('pt', slug), size: PROJECT_OG_SIZE, contentType: 'image/png' }];
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return projetoOgImage('pt', slug);
}
