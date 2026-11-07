import type { Lang } from '@/types';
import { CONTENT } from './content';

export interface NavSection {
  id: string;
  label: string;
}

export function siteSections(lang: Lang): NavSection[] {
  const t = CONTENT[lang];
  return [
    { id: 'projetos', label: lang === 'en' ? 'Project' : 'Projeto' },
    { id: 'experiencia', label: t.nav.exp },
    { id: 'formacao', label: t.nav.cert },
    { id: 'contato', label: t.nav.contact },
  ];
}
