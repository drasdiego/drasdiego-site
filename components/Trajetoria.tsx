'use client';

import type { SiteContent } from '@/lib/content';
import { Reveal } from './Reveal';

export function Trajetoria({ t }: { t: SiteContent }) {
  const d = t.traj;
  return (
    <section className="section section-hairline" id="trajetoria">
      <div className="wrap">
        <div className="traj-layout">
          <Reveal className="traj-intro">
            <span className="eyebrow">
              <span className="idx">{d.idx}</span> {d.eyebrow}
            </span>
            <h2 className="section-title">{d.title}</h2>
            <p className="section-sub">{d.sub}</p>
          </Reveal>

          <Reveal className="timeline" delay={1}>
            {d.milestones.map((m, i) => (
              <div className={`tl-item ${m.now ? 'now' : ''}`} key={i}>
                <div className="tl-yr">{m.yr}</div>
                <div className="tl-role">{m.role}</div>
                <div className="tl-co">{m.co}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
