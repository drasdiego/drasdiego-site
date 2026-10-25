import { Portfolio } from '@/components/Portfolio';
import { QualificationsProvider } from '@/hooks/qualificationsContext';
import { QUAL_SEED, fetchQualificationsServer } from '@/services/sheets';
import { buildStructuredData } from '@/lib/seo';
import type { Lang, Qualification } from '@/types';

const REVALIDATE = 600;

export async function SitePage({ lang }: { lang: Lang }) {
  let initial: Qualification[] = QUAL_SEED;
  try {
    const live = await fetchQualificationsServer(REVALIDATE);
    if (live.length) initial = live;
  } catch {
    initial = QUAL_SEED;
  }
  const structuredDataJson = JSON.stringify(buildStructuredData(lang)).replace(/</g, '\\u003c');
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <QualificationsProvider initial={initial}>
        <Portfolio initialLang={lang} />
      </QualificationsProvider>
    </>
  );
}
