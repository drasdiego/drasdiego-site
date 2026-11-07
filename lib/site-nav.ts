import type { Lang } from '@/types';

export type NavKey = 'projetos' | 'blog' | 'sobre' | 'contato';

export const NAV_UI = {
  pt: {
    projetos: 'Projetos',
    sobre: 'Sobre',
    contato: 'Contato',
    brandRole: 'Engenharia de Software',
    skip: 'Ir para o conteúdo',
    mainNav: 'Navegação principal',
    mobileNav: 'Navegação móvel',
    language: 'Idioma',
    menuWord: 'Menu',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    lightTheme: 'Usar tema claro',
    darkTheme: 'Usar tema escuro',
    backToTop: 'Voltar ao topo',
  },
  en: {
    projetos: 'Projects',
    sobre: 'About',
    contato: 'Contact',
    brandRole: 'Software Engineering',
    skip: 'Skip to content',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    language: 'Language',
    menuWord: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    lightTheme: 'Use light theme',
    darkTheme: 'Use dark theme',
    backToTop: 'Back to top',
  },
} as const;

export function homePath(lang: Lang): string {
  return lang === 'en' ? '/en' : '/';
}

export function pagePath(lang: Lang, sub: string): string {
  return lang === 'en' ? `/en${sub}` : sub;
}

export function sobrePath(lang: Lang): string {
  return pagePath(lang, '/sobre');
}

export function projetosPath(lang: Lang): string {
  return pagePath(lang, '/projetos');
}

export function contactPath(lang: Lang): string {
  return `${homePath(lang)}#contato`;
}

export function splitLocale(pathname: string): { lang: Lang; rest: string } {
  if (pathname === '/en') return { lang: 'en', rest: '/' };
  if (pathname.startsWith('/en/')) return { lang: 'en', rest: pathname.slice(3) };
  return { lang: 'pt', rest: pathname || '/' };
}

export function switchLangPath(pathname: string, target: Lang): string {
  const { rest } = splitLocale(pathname);
  if (target === 'pt') return rest;
  return rest === '/' ? '/en' : `/en${rest}`;
}

export function activeNavKey(pathname: string): NavKey | null {
  const { rest } = splitLocale(pathname);
  const first = rest.split('/')[1];
  if (first === 'projetos' || first === 'sobre' || first === 'blog') return first;
  return null;
}

const LEGACY_SOBRE = new Set(['experiencia', 'formacao', 'trajetoria', 'dados', 'tecnologias']);

export function legacyAnchorTarget(lang: Lang, id: string): string | null {
  if (LEGACY_SOBRE.has(id)) return `${sobrePath(lang)}#${id}`;
  if (id === 'projetos') return projetosPath(lang);
  return null;
}
