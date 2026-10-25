import { Portfolio } from '@/components/Portfolio';
import { QualificationsProvider } from '@/hooks/qualificationsContext';
import { QUAL_SEED, fetchQualificationsServer } from '@/services/sheets';
import type { Qualification } from '@/types';

export const revalidate = 600;

const SITE_URL = 'https://www.drasdiego.com.br';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Diego Arruda',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Diego Arruda',
      url: SITE_URL,
      image: `${SITE_URL}/images/diego.webp`,
      jobTitle: 'Analista de Ouvidoria',
      worksFor: { '@type': 'Organization', name: 'Nubank' },
      sameAs: ['https://www.linkedin.com/in/drasdiego/', 'https://github.com/drasdiego'],
    },
  ],
};

const structuredDataJson = JSON.stringify(structuredData).replace(/</g, '\\u003c');

export default async function Page() {
  let initial: Qualification[] = QUAL_SEED;
  try {
    const live = await fetchQualificationsServer(revalidate);
    if (live.length) initial = live;
  } catch {
    initial = QUAL_SEED;
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
      <QualificationsProvider initial={initial}>
        <Portfolio />
      </QualificationsProvider>
    </>
  );
}
