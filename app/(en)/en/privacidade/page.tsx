import type { Metadata } from 'next';
import { PRIVACIDADE_UI, PrivacidadePage } from '@/components/PrivacidadePage';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('en', '/privacidade', PRIVACIDADE_UI.en.title, PRIVACIDADE_UI.en.description);

export default function Page() {
  return <PrivacidadePage lang="en" />;
}
