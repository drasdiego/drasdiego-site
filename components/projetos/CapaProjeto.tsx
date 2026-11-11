import type { Lang } from '@/types';
import type { Projeto } from '@/lib/projetos';
import { tagArea } from '@/lib/areas';

const CAPA_UI = {
  pt: { label: 'Projetos', site: 'www.drasdiego.com.br' },
  en: { label: 'Projects', site: 'www.drasdiego.com.br' },
} as const;

export function CapaProjeto({ lang, projeto }: { lang: Lang; projeto: Projeto }) {
  const t = projeto[lang];
  const area = t.tags.map(tagArea).find(Boolean) ?? 'ia';
  return (
    <div className="projeto-capa" data-area={area} aria-hidden="true">
      <span className="projeto-capa-tag">{CAPA_UI[lang].label}</span>
      <span className="projeto-capa-titulo">{t.title}</span>
      <span className="projeto-capa-rodape">
        <span>Diego Arruda</span>
        <span className="projeto-capa-site">{CAPA_UI[lang].site}</span>
      </span>
    </div>
  );
}
