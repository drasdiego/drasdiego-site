'use client';

import Link from 'next/link';
import type { Lang } from '@/types';
import { PRESENTATION } from '@/lib/presentation';
import { pagePath, projetosPath } from '@/lib/site-nav';
import { Icon } from '../Icon';

const ALL_PROJECTS = { pt: 'Ver todos os projetos', en: 'See all projects' } as const;

export function FeaturedProject({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  const openAssistant = (question?: string) => window.dispatchEvent(new CustomEvent('portfolio:open-assistant', { detail: { question } }));
  return (
    <section className="section featured" id="projetos" aria-labelledby="featured-title">
      <div className="wrap">
        <div className="section-headline">
          <h2 className="section-title" id="featured-title">{d.featuredLabel}</h2>
          <Link className="text-link" href={projetosPath(lang)}>{ALL_PROJECTS[lang]}</Link>
        </div>
        <article className="featured-card">
          <div className="featured-main">
            <h3 className="featured-title">{d.projectName}</h3>
            <p className="featured-desc">{d.projectDescription}</p>
            <p className="featured-stack"><span>{d.technologies}</span>{d.projectStack}</p>
            <div className="featured-actions">
              <Link className="btn btn-primary" href={pagePath(lang, '/projetos/assistente-de-carreira')}>{d.caseStudy}</Link>
              <button type="button" className="btn" onClick={() => openAssistant()} aria-haspopup="dialog">{d.tryAssistant}</button>
            </div>
          </div>
          <div className="featured-panel" data-ui>
            <div className="featured-panel-head"><Icon name="bot" /><h4>{d.assistantTitle}</h4></div>
            <p className="featured-panel-intro">{d.assistantIntro}</p>
            <div className="featured-questions">
              {d.assistantQuestions.map(item => (
                <button type="button" key={item.question} onClick={() => openAssistant(item.question)} aria-haspopup="dialog">
                  {item.label}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                </button>
              ))}
            </div>
            <p className="featured-note">{d.assistantNote}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
