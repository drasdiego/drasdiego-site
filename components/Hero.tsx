import Image from 'next/image';
import Link from 'next/link';
import type { Lang } from '@/types';
import { PRESENTATION } from '@/lib/presentation';
import { PROJETOS } from '@/lib/projetos';
import { pagePath, projetosPath } from '@/lib/site-nav';
import '@/app/espaco.css';
import '@/app/home.css';

const SHOTS = {
  pt: {
    label: 'Telas dos projetos',
    assistant: 'Tela do assistente de carreira, com a saudação e sugestões de perguntas. Abrir o estudo de caso do Assistente de carreira.',
    panel: 'Tela do painel Fora do Digital. Abrir o estudo de caso do Fora do Digital.',
  },
  en: {
    label: 'Project screens',
    assistant: 'Career assistant screen, with the greeting and suggested questions. Open the Career assistant case study.',
    panel: 'Fora do Digital dashboard screen. Open the Fora do Digital case study.',
  },
} as const;

export function Hero({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  const s = SHOTS[lang];
  const painel = PROJETOS.find((p) => p.slug === 'fora-do-digital')?.image;
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-intro">
          <h1 className="hero-h1"><span className="sr-only">Diego Arruda</span>{' '}<span className="hero-headline">{d.title}</span></h1>
          <p className="hero-lead">{d.lead}</p>
          <p className="hero-context">{d.context}</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href={projetosPath(lang)}>{d.viewProjects}</Link>
            <a className="text-link" href="#contato">{d.talk}</a>
          </div>
        </div>
        <div className="hero-shots" role="group" aria-label={s.label}>
          {painel ? (
            <Link className="hero-shot hero-shot-panel" href={pagePath(lang, '/projetos/fora-do-digital')} aria-label={s.panel}>
              <Image src={painel.cardSrc} width={painel.cardWidth} height={painel.cardHeight} alt="" priority unoptimized />
            </Link>
          ) : null}
          <Link className="hero-shot hero-shot-assistant" href={pagePath(lang, '/projetos/assistente-de-carreira')} aria-label={s.assistant}>
            <Image src={`/images/projetos/assistente-${lang}.webp`} width={780} height={1120} alt="" priority unoptimized />
          </Link>
        </div>
      </div>
    </section>
  );
}
