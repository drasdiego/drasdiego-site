import type { Metadata } from 'next';
import { CONTATO_UI, ContatoPage } from '@/components/ContatoPage';
import { buildPageMetadata } from '@/lib/seo';
import { NAV_UI } from '@/lib/site-nav';

export const metadata: Metadata = buildPageMetadata('pt', '/contato', NAV_UI.pt.contato, CONTATO_UI.pt.description);

export default function Page() {
  return <ContatoPage lang="pt" />;
}
