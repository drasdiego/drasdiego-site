import Image from 'next/image';
import Link from 'next/link';
import type { Lang, Qualification } from '@/types';
import '../app/paginas.css';
import '../app/blog.css';
import '../app/espaco.css';
import { QualificationsProvider } from '@/hooks/qualificationsContext';
import { CONTENT } from '@/lib/content';
import { PRESENTATION } from '@/lib/presentation';
import { SEO, SITE_URL, pagePathUrl } from '@/lib/seo';
import { NAV_UI, contactPath, projetosPath } from '@/lib/site-nav';
import { QUAL_SEED, fetchQualificationsServer } from '@/services/sheets';
import { Experiencia } from './Experiencia';
import { DataAI } from './DataAI';
import { Tecnologias } from './Tecnologias';
import { Qualificacoes } from './Qualificacoes';

const REVALIDATE = 600;

const SOBRE_UI = {
  pt: { summary: 'Resumo', toc: 'Seções desta página', photo: 'Retrato de Diego Arruda, de óculos e camiseta preta, sobre fundo escuro com grafismos em roxo e azul.' },
  en: { summary: 'Summary', toc: 'Sections on this page', photo: 'Portrait of Diego Arruda, wearing glasses and a black T-shirt, against a dark background with purple and blue graphics.' },
} as const;

async function loadQualifications(): Promise<Qualification[]> {
  try {
    const live = await fetchQualificationsServer(REVALIDATE);
    return live.length ? live : QUAL_SEED;
  } catch {
    return QUAL_SEED;
  }
}

function sobreStructuredData(lang: Lang): string {
  const s = SEO[lang];
  const url = pagePathUrl(lang, '/sobre');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    name: NAV_UI[lang].sobre,
    description: s.personDescription,
    inLanguage: s.htmlLang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export async function SobrePage({ lang }: { lang: Lang }) {
  const initial = await loadQualifications();
  const t = CONTENT[lang];
  const d = PRESENTATION[lang];
  const ui = SOBRE_UI[lang];
  const toc = [
    { id: 'resumo', label: ui.summary },
    { id: 'experiencia', label: t.nav.exp },
    { id: 'formacao', label: t.nav.cert },
    { id: 'dados', label: t.nav.data },
    { id: 'tecnologias', label: t.nav.tech },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sobreStructuredData(lang) }} />
      <QualificationsProvider initial={initial}>
        <div className="wrap blog-page sobre-page">
          <header className="sobre-head">
            <div className="blog-col">
              <h1 className="blog-title">{NAV_UI[lang].sobre}</h1>
              <p className="blog-lead">{d.career} {d.background}</p>
            </div>
            <div className="sobre-foto">
              <Image src="/images/diego-retrato.webp" width={640} height={640} alt={ui.photo} priority unoptimized />
            </div>
          </header>
          <nav className="sobre-toc" aria-label={ui.toc}>
            <ul>
              {toc.map((item) => (
                <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="sobre-body">
            <section className="section section-hairline" id="resumo" aria-labelledby="resumo-titulo">
              <div className="wrap">
                <div className="section-head">
                  <h2 className="section-title" id="resumo-titulo">{ui.summary}</h2>
                </div>
                <div className="sobre-resumo">
                  <p className="sobre-resumo-lead">{d.lead}</p>
                  <p className="sobre-resumo-ctx">{d.context}</p>
                  <div className="sobre-resumo-cta">
                    <Link className="btn btn-primary" href={`${projetosPath(lang)}/assistente-de-carreira`}>{d.projectLink}</Link>
                    <Link className="text-link" href={contactPath(lang)}>{d.talk}</Link>
                  </div>
                </div>
              </div>
            </section>
            <Experiencia t={{ ...t, exp: { ...t.exp, title: d.experienceTitle, sub: d.experienceSub } }} />
            <Qualificacoes t={{ ...t, quals: { ...t.quals, title: d.educationTitle, sub: d.educationSub } }} />
            <DataAI t={t} />
            <Tecnologias t={t} />
          </div>
        </div>
      </QualificationsProvider>
    </>
  );
}

