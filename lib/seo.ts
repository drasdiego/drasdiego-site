import type { Metadata } from 'next';
import type { Lang } from '@/types';
import { completedOrgs } from './education';

export const SITE_URL = 'https://www.drasdiego.com.br';

export const SEO = {
  pt: {
    htmlLang: 'pt-BR',
    path: '',
    title: 'Diego Arruda | Engenharia de Software, Dados e IA',
    description:
      'Desenvolvimento de software com visão de operação. Trajetória, projetos e formação de Diego Arruda em engenharia de software, dados e IA aplicada.',
    keywords: ['Diego Arruda', 'Dados', 'Data Science', 'Inteligência Artificial', 'Analytics', 'Engenharia de Software', 'Power BI', 'SQL', 'Python'],
    locale: 'pt_BR',
    personDescription: 'Engenharia de software, dados e IA aplicada, com 18 anos de carreira em operações e negócios.',
    jobTitle: 'Analista de Ouvidoria',
    knowsAbout: ['Engenharia de software', 'Dados', 'Inteligência artificial', 'Operações'],
  },
  en: {
    htmlLang: 'en',
    path: '/en',
    title: 'Diego Arruda | Software Engineering, Data and AI',
    description:
      'Software development with an operations perspective. Career, projects and education of Diego Arruda in software engineering, data and applied AI.',
    keywords: ['Diego Arruda', 'Data', 'Data Science', 'Artificial Intelligence', 'Analytics', 'Software Engineering', 'Power BI', 'SQL', 'Python'],
    locale: 'en_US',
    personDescription: 'Software engineering, data and applied AI, with 18 years of experience in operations and business.',
    jobTitle: 'Ombudsman Analyst',
    knowsAbout: ['Software engineering', 'Data', 'Artificial intelligence', 'Operations'],
  },
} as const;

export function pageUrl(lang: Lang): string {
  return `${SITE_URL}${SEO[lang].path}`;
}

export const LANGUAGE_ALTERNATES = {
  'pt-BR': SITE_URL,
  en: `${SITE_URL}/en`,
  'x-default': SITE_URL,
};

export function buildMetadata(lang: Lang): Metadata {
  const s = SEO[lang];
  const url = pageUrl(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: s.title,
    description: s.description,
    keywords: [...s.keywords],
    authors: [{ name: 'Diego Arruda', url: 'https://www.linkedin.com/in/drasdiego/' }],
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32 48x48' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    alternates: { canonical: url, languages: LANGUAGE_ALTERNATES },
    openGraph: {
      title: s.title,
      description: s.description,
      type: 'website',
      locale: s.locale,
      alternateLocale: lang === 'pt' ? 'en_US' : 'pt_BR',
      url,
      siteName: 'Diego Arruda',
    },
    twitter: { card: 'summary_large_image', title: s.title, description: s.description },
  };
}

export function buildStructuredData(lang: Lang) {
  const s = SEO[lang];
  const url = pageUrl(lang);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Diego Arruda',
        description: s.description,
        inLanguage: s.htmlLang,
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Diego Arruda',
        url: SITE_URL,
        image: `${SITE_URL}/images/diego.webp`,
        description: s.personDescription,
        jobTitle: s.jobTitle,
        worksFor: { '@type': 'Organization', name: 'Nubank' },
        knowsAbout: [...s.knowsAbout],
        address: { '@type': 'PostalAddress', addressLocality: 'Balneário Camboriú', addressRegion: 'SC', addressCountry: 'BR' },
        alumniOf: completedOrgs().map(name => ({ '@type': 'EducationalOrganization', name })),
        sameAs: ['https://www.linkedin.com/in/drasdiego/', 'https://github.com/drasdiego'],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        url,
        name: s.title,
        description: s.description,
        inLanguage: s.htmlLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };
}
