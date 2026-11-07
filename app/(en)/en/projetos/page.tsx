import type { Metadata } from 'next';
import { ProjetosIndex } from '@/components/ProjetosPages';
import { PROJETOS_INTRO } from '@/lib/projetos';
import { buildPageMetadata } from '@/lib/seo';
import { NAV_UI } from '@/lib/site-nav';

export const metadata: Metadata = buildPageMetadata('en', '/projetos', NAV_UI.en.projetos, PROJETOS_INTRO.en);

export default function Page() {
  return <ProjetosIndex lang="en" />;
}
