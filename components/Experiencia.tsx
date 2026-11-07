'use client';

import type { SiteContent } from '@/lib/content';
import { Reveal } from './Reveal';

export function Experiencia({ t }: { t: SiteContent }) {
  const d = t.exp;
  return (
    <section className="section section-hairline" id="experiencia" aria-labelledby="experiencia-titulo">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title" id="experiencia-titulo">{d.title}</h2>
          <p className="section-sub">{d.sub}</p>
        </Reveal>
        <div className="exp-list">
          {d.rows.map((r, i) => (
            <Reveal className="exp-row" key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="exp-yr">{r.yr}</div>
              <div className="exp-main">
                <h3>{r.co}</h3>
                <p className="experience-role">{r.role}</p>
                <p>{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
