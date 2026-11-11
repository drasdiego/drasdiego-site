import Link from 'next/link';
import type { Lang } from '@/types';
import { PRESENTATION } from '@/lib/presentation';
import { PROJETOS } from '@/lib/projetos';
import { pagePath, projetosPath } from '@/lib/site-nav';
import { HeroCarrossel, type HeroSlide } from './home/HeroCarrossel';
import '@/app/espaco.css';
import '@/app/home.css';

const ABRIR = {
  pt: (titulo: string) => `Abrir o estudo de caso de ${titulo}`,
  en: (titulo: string) => `Open the ${titulo} case study`,
} as const;

export function Hero({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  const raiz = projetosPath(lang);
  const slides: HeroSlide[] = PROJETOS.map((projeto) => ({
    slug: projeto.slug,
    href: pagePath(lang, `/projetos/${projeto.slug}`),
    src: projeto.capa ? projeto.capa.src : `${raiz}/${projeto.slug}/capa.png`,
    width: projeto.capa ? projeto.capa.width : 1200,
    height: projeto.capa ? projeto.capa.height : 630,
    title: projeto[lang].title,
    label: ABRIR[lang](projeto[lang].title),
  }));
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-intro">
          <h1 className="hero-h1"><span className="sr-only">Diego Arruda</span>{' '}<span className="hero-headline">{d.title}</span></h1>
          <p className="hero-lead">{d.heroLead}</p>
          <p className="hero-context">{d.context}</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href={projetosPath(lang)}>{d.viewProjects}</Link>
            <a className="text-link" href="#contato">{d.talk}</a>
          </div>
        </div>
        <HeroCarrossel lang={lang} slides={slides} />
      </div>
    </section>
  );
}
