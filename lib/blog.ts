import type { Area } from './areas';
import type { Metadata } from 'next';
import type { Lang } from '@/types';
import { SEO, SITE_URL } from './seo';
import { TRIBUNAL } from './blog-tribunal';
import { REWIND } from './blog-rewind';
import { JOIN_SOMA } from './blog-join';
import { CHAVE_VAZADA } from './blog-chave';
import { HOOK } from './blog-hook';
import { PROCV } from './blog-procv';
import type { BlogMenuData } from './blog-menu';

export type TableCell = string | { v: string; tone: 'bad' | 'ok' };

export type Block =
  | { k: 'p'; v: string; muted?: boolean }
  | { k: 'h3'; v: string }
  | { k: 'ul' | 'ol'; items: string[] }
  | { k: 'code'; label: string; text: string }
  | { k: 'opts'; items: { c: string; v: string }[] }
  | { k: 'callout'; tone: 'tip' | 'warn' | 'note' | 'example'; v: string }
  | { k: 'split'; yes: { title: string; items: string[] }; no: { title: string; items: string[] } }
  | { k: 'table'; label: string; head: string[]; rows: TableCell[][] };

export interface Section {
  n?: string;
  title: string;
  note?: boolean;
  blocks: Block[];
}

export interface GuideText {
  title: string;
  short: string;
  lead: string;
  description: string;
  facts: string[];
  sections: Section[];
}

export interface Guide {
  slug: string;
  category: string;
  published: string;
  pt: GuideText;
  en: GuideText;
}

export interface Category {
  slug: string;
  area: Area;
  pt: { name: string; desc: string; note: string };
  en: { name: string; desc: string; note: string };
}

export const BLOG_HANDLE = '@drasdiegotech';

export const CATEGORIES: Category[] = [
  {
    slug: 'claude-code',
    area: 'ia',
    pt: {
      name: 'Claude Code',
      desc: 'Guias práticos para usar o Claude Code, a ferramenta de linha de comando da Anthropic para programar com IA.',
      note: 'Guia por Diego Arruda. Conteúdo educativo e independente, sem vínculo com a Anthropic.',
    },
    en: {
      name: 'Claude Code',
      desc: 'Practical guides for using Claude Code, Anthropic’s command-line tool for coding with AI.',
      note: 'Guide by Diego Arruda. Educational and independent content, not affiliated with Anthropic.',
    },
  },
  {
    slug: 'sql',
    area: 'dados',
    pt: { name: 'SQL', desc: 'Guias práticos de SQL para análise de dados, com exemplos testados.', note: 'Guia por Diego Arruda. Conteúdo educativo e independente.' },
    en: { name: 'SQL', desc: 'Practical SQL guides for data analysis, with tested examples.', note: 'Guide by Diego Arruda. Educational and independent content.' },
  },
  {
    slug: 'github',
    area: 'software',
    pt: {
      name: 'GitHub',
      desc: 'Guias práticos de GitHub e Git para proteger o seu código e as suas chaves, com base na documentação oficial.',
      note: 'Guia por Diego Arruda. Conteúdo educativo e independente, sem vínculo com o GitHub.',
    },
    en: {
      name: 'GitHub',
      desc: 'Practical GitHub and Git guides to protect your code and your keys, based on the official documentation.',
      note: 'Guide by Diego Arruda. Educational and independent content, not affiliated with GitHub.',
    },
  },
  {
    slug: 'excel',
    area: 'dados',
    pt: {
      name: 'Excel',
      desc: 'Guias práticos de Excel e planilhas para análise de dados, com exemplos testados.',
      note: 'Guia por Diego Arruda. Conteúdo educativo e independente, sem vínculo com a Microsoft.',
    },
    en: {
      name: 'Excel',
      desc: 'Practical Excel and spreadsheet guides for data analysis, with tested examples.',
      note: 'Guide by Diego Arruda. Educational and independent content, not affiliated with Microsoft.',
    },
  },
];

export const GUIDES: Guide[] = [TRIBUNAL, REWIND, JOIN_SOMA, CHAVE_VAZADA, HOOK, PROCV];

export const BLOG_UI = {
  pt: {
    blog: 'Guias',
    menu: 'Guias',
    mobileNav: 'Navegação móvel',
    menuWord: 'Menu',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    skip: 'Pular para o conteúdo',
    crumbs: 'Trilha de navegação',
    mainNav: 'Navegação principal',
    language: 'Idioma',
    lightTheme: 'Mudar para o tema claro',
    darkTheme: 'Mudar para o tema escuro',
    copy: 'Copiar',
    tip: 'Dica',
    warn: 'Atenção',
    note: 'Nota',
    example: 'Exemplo',
    toc: 'Neste guia',
    copied: 'Copiado',
    copyFail: 'Não foi possível copiar',
    indexTitle: 'Guias',
    indexLead: 'Guias práticos sobre ferramentas de IA, desenvolvimento de software, SQL, GitHub e Excel. Conteúdo educativo e independente.',
    categoriesTitle: 'Categorias',
    allGuides: 'Todos',
    guidesTitle: 'Lista de guias',
    guideCount: (n: number) => (n === 1 ? '1 guia' : `${n} guias`),
    published: 'Publicado em',
    footer: 'Guias por Diego Arruda. Conteúdo educativo e independente.',
    footerNav: 'Contato',
    backHome: 'Voltar ao site',
    locale: 'pt-BR',
  },
  en: {
    blog: 'Guides',
    menu: 'Guides',
    mobileNav: 'Mobile navigation',
    menuWord: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    crumbs: 'Breadcrumb',
    mainNav: 'Main navigation',
    language: 'Language',
    lightTheme: 'Switch to light theme',
    darkTheme: 'Switch to dark theme',
    copy: 'Copy',
    tip: 'Tip',
    warn: 'Caution',
    note: 'Note',
    example: 'Example',
    toc: 'In this guide',
    copied: 'Copied',
    copyFail: 'Could not copy',
    indexTitle: 'Guides',
    indexLead: 'Practical guides on AI tools, software development, SQL, GitHub and Excel. Independent educational content.',
    categoriesTitle: 'Categories',
    allGuides: 'All',
    guidesTitle: 'Guide list',
    guideCount: (n: number) => (n === 1 ? '1 guide' : `${n} guides`),
    published: 'Published on',
    footer: 'Guides by Diego Arruda. Educational and independent content.',
    footerNav: 'Contact',
    backHome: 'Back to the site',
    locale: 'en-US',
  },
} as const;

export function blogRoot(lang: Lang): string {
  return lang === 'en' ? '/en/guias' : '/guias';
}

export function blogPaths(sub: string): { pt: string; en: string } {
  return { pt: `/guias${sub}`, en: `/en/guias${sub}` };
}

export function buildBlogMenu(lang: Lang): BlogMenuData {
  const root = blogRoot(lang);
  return {
    label: BLOG_UI[lang].menu,
    categories: CATEGORIES.map((cat) => ({
      name: cat[lang].name,
      href: `${root}/${cat.slug}`,
      guides: guidesIn(cat.slug).map((g) => ({ title: g[lang].title, href: `${root}/${cat.slug}/${g.slug}` })),
    })),
  };
}

export function guideNotes(lang: Lang): { index: string; byCategory: Record<string, string> } {
  return { index: BLOG_UI[lang].footer, byCategory: Object.fromEntries(CATEGORIES.map((c) => [c.slug, c[lang].note])) };
}

export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function guidesIn(category: string): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}

export function sortGuides(list: Guide[]): Guide[] {
  return list
    .map((guide, index) => ({ guide, index }))
    .sort((a, b) => (a.guide.published < b.guide.published ? 1 : a.guide.published > b.guide.published ? -1 : a.index - b.index))
    .map((item) => item.guide);
}

export function findGuide(category: string, slug: string): Guide | undefined {
  return GUIDES.find((g) => g.category === category && g.slug === slug);
}

export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(BLOG_UI[lang].locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function absoluteUrl(lang: Lang, sub: string): string {
  return lang === 'en' ? `${SITE_URL}/en/guias${sub}` : `${SITE_URL}/guias${sub}`;
}

export function blogMetadata(lang: Lang, sub: string, title: string, description: string, type: 'website' | 'article'): Metadata {
  const s = SEO[lang];
  const fullTitle = `${title} | Diego Arruda`;
  const url = absoluteUrl(lang, sub);
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: { 'pt-BR': absoluteUrl('pt', sub), en: absoluteUrl('en', sub), 'x-default': absoluteUrl('pt', sub) },
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      locale: s.locale,
      alternateLocale: lang === 'pt' ? 'en_US' : 'pt_BR',
      url,
      siteName: 'Diego Arruda',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  };
}

export function blogStructuredData(lang: Lang, crumbs: { name: string; sub: string }[], article?: { headline: string; description: string; published: string }): string {
  const s = SEO[lang];
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(lang, c.sub) })),
    },
  ];
  if (article) {
    graph.push({
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      datePublished: article.published,
      inLanguage: s.htmlLang,
      mainEntityOfPage: absoluteUrl(lang, crumbs[crumbs.length - 1].sub),
      author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Diego Arruda', url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#person` },
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
