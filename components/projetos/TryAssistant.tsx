'use client';

import type { ProjetoTry } from '@/lib/projetos';
import { Icon } from '../Icon';

export function TryAssistant({ data }: { data: ProjetoTry }) {
  const openAssistant = (question?: string) =>
    window.dispatchEvent(new CustomEvent('portfolio:open-assistant', { detail: { question } }));
  return (
    <div className="project-assistant caso-try-card" data-ui>
      <div className="project-assistant-head">
        <h3>{data.heading}</h3>
        <span aria-hidden="true"><Icon name="bot" /></span>
      </div>
      <div className="project-assistant-body">
        <p>{data.intro}</p>
        <div className="project-questions">
          {data.questions.map((item) => (
            <button type="button" key={item.question} onClick={() => openAssistant(item.question)} aria-haspopup="dialog">
              {item.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </button>
          ))}
        </div>
        <button type="button" className="text-link project-write" onClick={() => openAssistant()} aria-haspopup="dialog">{data.write}</button>
        <p className="project-assistant-note">{data.note}</p>
      </div>
    </div>
  );
}
