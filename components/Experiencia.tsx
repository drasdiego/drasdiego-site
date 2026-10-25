'use client';

import type { SiteContent } from '@/lib/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function Experiencia({ t }: { t: SiteContent }) {
  const d = t.exp;
  return (
    <section className="section section-hairline" id="experiencia">
      <div className="wrap">
        <SectionHead idx={d.idx} eyebrow={d.eyebrow} title={d.title} sub={d.sub} />
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
