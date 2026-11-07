import { Portfolio } from '@/components/Portfolio';
import { buildStructuredData } from '@/lib/seo';
import type { Lang } from '@/types';

export function SitePage({ lang }: { lang: Lang }) {
  const structuredDataJson = JSON.stringify(buildStructuredData(lang)).replace(/</g, '\\u003c');
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <Portfolio initialLang={lang} />
    </>
  );
}
