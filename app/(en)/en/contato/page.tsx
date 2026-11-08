import type { Metadata } from 'next';
import { CONTATO_UI, ContatoPage } from '@/components/ContatoPage';
import { buildPageMetadata } from '@/lib/seo';
import { NAV_UI } from '@/lib/site-nav';

export const metadata: Metadata = buildPageMetadata('en', '/contato', NAV_UI.en.contato, CONTATO_UI.en.description);

export default function Page() {
  return <ContatoPage lang="en" />;
}
