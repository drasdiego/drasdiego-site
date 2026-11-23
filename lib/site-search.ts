import type { Lang } from '@/types';
import { PROJETOS } from './projetos';
import { NAV_UI, contactPath, homePath, privacyPath, projetosPath, sobrePath } from './site-nav';
import { blogRoot } from './blog';
import { keywordIndex, type SearchEntry } from './search';

const PAGE_WORDS = {
  pt: {
    home: 'início principal apresentação',
    projetos: 'projetos portfólio demonstração código',
    guias: 'guias tutoriais passo a passo',
    sobre: 'sobre trajetória experiência formação dados tecnologias carreira',
    contato: 'contato falar mensagem whatsapp linkedin',
    privacidade: 'privacidade dados pessoais política',
  },
  en: {
    home: 'home main introduction',
    projetos: 'projects portfolio demo code',
    guias: 'guides tutorials step by step',
    sobre: 'about career experience education data technologies',
    contato: 'contact message whatsapp linkedin',
    privacidade: 'privacy personal data policy',
  },
} as const;

export function buildSiteSearch(lang: Lang): SearchEntry[] {
  const ui = NAV_UI[lang];
  const words = PAGE_WORDS[lang];
  const page = (title: string, href: string, extra: string): SearchEntry => ({
    title,
    href,
    kind: 'page',
    hay: keywordIndex([title, extra]),
  });
  const pages: SearchEntry[] = [
    page(ui.inicio, homePath(lang), words.home),
    page(ui.projetos, projetosPath(lang), words.projetos),
    page(ui.guias, blogRoot(lang), words.guias),
    page(ui.sobre, sobrePath(lang), words.sobre),
    page(ui.contato, contactPath(lang), words.contato),
    page(ui.privacidade, privacyPath(lang), words.privacidade),
  ];
  const projects: SearchEntry[] = PROJETOS.map((projeto) => {
    const text = projeto[lang];
    return {
      title: text.title,
      href: `${projetosPath(lang)}/${projeto.slug}`,
      kind: 'project',
      hay: keywordIndex([text.title, text.short, text.lead, ...text.tags]),
    };
  });
  return [...pages, ...projects];
}
