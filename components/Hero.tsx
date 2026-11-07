import Link from 'next/link';
import type { Lang } from '@/types';
import { PRESENTATION } from '@/lib/presentation';
import { projetosPath, sobrePath } from '@/lib/site-nav';
import '@/app/home.css';

export function Hero({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
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
        <aside className="hero-origin">
          <p className="origin-career">{d.career}</p>
          <p className="origin-background">{d.background}</p>
          <Link className="text-link" href={sobrePath(lang)}>{d.aboutLink}</Link>
        </aside>
      </div>
    </section>
  );
}
