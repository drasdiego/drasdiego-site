'use client';

import type { Lang } from '@/types';
import { PRESENTATION } from '@/lib/presentation';
import { Icon } from './Icon';

export function Projetos({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  const openAssistant = (question?: string) => window.dispatchEvent(new CustomEvent('portfolio:open-assistant', { detail: { question } }));
  return (
    <section className="section section-hairline" id="projetos">
      <div className="wrap">
        <div className="section-head"><h2 className="section-title">{d.projectTitle}</h2><p className="section-sub">{d.projectSub}</p></div>
        <div className="project-layout">
          <div className="project-story">
            <h3>{d.projectName}</h3><p>{d.projectDescription}</p>
            <dl className="project-facts">
              <div><dt>{d.application}</dt><dd>{d.applicationDescription}</dd></div>
              <div><dt>{d.technologies}</dt><dd>Next.js, TypeScript, Gemini API</dd></div>
            </dl>
            <details className="project-decisions">
              <summary>{d.decisions}<span aria-hidden="true">+</span></summary>
              {d.details.map(item => <div className="project-decision" key={item.title}><h4>{item.title}</h4><p>{item.text}</p></div>)}
            </details>
          </div>
          <div className="project-assistant" data-ui>
            <div className="project-assistant-head"><h3>{d.assistantTitle}</h3><span aria-hidden="true"><Icon name="bot" /></span></div>
            <div className="project-assistant-body">
              <p>{d.assistantIntro}</p>
              <div className="project-questions">
                {d.assistantQuestions.map(item => (
                  <button type="button" key={item.question} onClick={() => openAssistant(item.question)} aria-haspopup="dialog">
                    {item.label}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                  </button>
                ))}
              </div>
              <button type="button" className="text-link project-write" onClick={() => openAssistant()} aria-haspopup="dialog">{d.writeQuestion}</button>
              <p className="project-assistant-note">{d.assistantNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
