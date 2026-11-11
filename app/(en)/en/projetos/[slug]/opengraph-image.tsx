import { PROJETOS } from '@/lib/projetos';
export { default, alt, size, contentType } from '../../opengraph-image';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug }));
}
