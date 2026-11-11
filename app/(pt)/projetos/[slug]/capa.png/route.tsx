import { PROJETOS } from '@/lib/projetos';
import { projetoOgImage } from '@/lib/og-projeto';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return projetoOgImage('pt', slug);
}
