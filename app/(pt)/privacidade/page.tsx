import type { Metadata } from 'next';
import { PRIVACIDADE_UI, PrivacidadePage } from '@/components/PrivacidadePage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('pt', '/privacidade', PRIVACIDADE_UI.pt.title, PRIVACIDADE_UI.pt.description);

export default function Page() {
  return <PrivacidadePage lang="pt" />;
}
