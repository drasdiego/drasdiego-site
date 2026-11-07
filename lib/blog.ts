import type { Metadata } from 'next';
import type { Lang } from '@/types';
import { SEO, SITE_URL } from './seo';
import { TRIBUNAL } from './blog-tribunal';
import type { BlogMenuData } from './blog-menu';

export type Block =
  | { k: 'p'; v: string; muted?: boolean }
  | { k: 'h3'; v: string }
  | { k: 'ul' | 'ol'; items: string[] }
  | { k: 'code'; label: string; text: string }
  | { k: 'opts'; items: { c: string; v: string }[] };

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
  pt: { name: string; desc: string };
  en: { name: string; desc: string };
}

export const BLOG_HANDLE = '@drasdiegotech';

export const CATEGORIES: Category[] = [
  {
    slug: 'claude-code',
    pt: { name: 'Claude Code', desc: 'Guias práticos para usar o Claude Code, a ferramenta de linha de comando da Anthropic para programar com IA.' },
    en: { name: 'Claude Code', desc: 'Practical guides for using Claude Code, Anthropic’s command-line tool for coding with AI.' },
  },
];

export const GUIDES: Guide[] = [TRIBUNAL];

export const BLOG_UI = {
  pt: {
    blog: 'Blog',
    menu: 'Blog',
    allGuides: 'Todos os guias',
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
    copied: 'Copiado',
    copyFail: 'Não foi possível copiar',
    indexTitle: 'Blog',
    indexLead: 'Guias e notas sobre ferramentas de IA e desenvolvimento de software. Conteúdo educativo e independente.',
    categoriesTitle: 'Categorias',
    guidesTitle: 'Guias',
    guideCount: (n: number) => (n === 1 ? '1 guia' : `${n} guias`),
    published: 'Publicado em',
    footer: 'Guia por Diego Arruda. Conteúdo educativo e independente, sem vínculo com a Anthropic.',
    footerNav: 'Contato',
    backHome: 'Voltar ao site',
    locale: 'pt-BR',
  },
  en: {
    blog: 'Blog',
    menu: 'Blog',
    allGuides: 'All guides',
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
    copied: 'Copied',
    copyFail: 'Could not copy',
    indexTitle: 'Blog',
    indexLead: 'Guides and notes on AI tools and software development. Independent educational content.',
    categoriesTitle: 'Categories',
    guidesTitle: 'Guides',
    guideCount: (n: number) => (n === 1 ? '1 guide' : `${n} guides`),
    published: 'Published on',
    footer: 'Guide by Diego Arruda. Educational and independent content, not affiliated with Anthropic.',
    footerNav: 'Contact',
    backHome: 'Back to the site',
    locale: 'en-US',
  },
} as const;

export function blogRoot(lang: Lang): string {
  return lang === 'en' ? '/en/blog' : '/blog';
}

export function blogPaths(sub: string): { pt: string; en: string } {
  return { pt: `/blog${sub}`, en: `/en/blog${sub}` };
}

export function buildBlogMenu(lang: Lang): BlogMenuData {
  const root = blogRoot(lang);
  return {
    label: BLOG_UI[lang].menu,
    allGuides: BLOG_UI[lang].allGuides,
    rootHref: root,
    categories: CATEGORIES.map((cat) => ({
      name: cat[lang].name,
      href: `${root}/${cat.slug}`,
      guides: guidesIn(cat.slug).map((g) => ({ title: g[lang].title, href: `${root}/${cat.slug}/${g.slug}` })),
    })),
  };
}

export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function guidesIn(category: string): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}

export function findGuide(category: string, slug: string): Guide | undefined {
  return GUIDES.find((g) => g.category === category && g.slug === slug);
}

export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(BLOG_UI[lang].locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function absoluteUrl(lang: Lang, sub: string): string {
  return lang === 'en' ? `${SITE_URL}/en/blog${sub}` : `${SITE_URL}/blog${sub}`;
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
