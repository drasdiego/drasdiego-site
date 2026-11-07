import type { Metadata } from 'next';
import { ProjetosIndex } from '@/components/ProjetosPages';
import { PROJETOS_INTRO } from '@/lib/projetos';
import { buildPageMetadata } from '@/lib/seo';
import { NAV_UI } from '@/lib/site-nav';

export const metadata: Metadata = buildPageMetadata('pt', '/projetos', NAV_UI.pt.projetos, PROJETOS_INTRO.pt);

export default function Page() {
  return <ProjetosIndex lang="pt" />;
}
