'use client';

import type { Lang } from '@/types';
import { PRESENTATION } from '@/lib/presentation';

export function Hero({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-intro">
          <h1 className="hero-h1">{d.title}</h1>
          <p className="hero-lead">{d.lead}</p>
          <p className="hero-context">{d.context}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projetos">{d.projectLink}</a>
            <a className="text-link" href="#contato">{d.talk}</a>
          </div>
        </div>
        <aside className="hero-origin">
          <p className="origin-career">{d.career}</p>
          <p className="origin-background">{d.background}</p>
          <a className="text-link" href="#experiencia">{d.experience}</a>
        </aside>
      </div>
    </section>
  );
}
