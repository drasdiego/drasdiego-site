'use client';

import { useMemo, useState } from 'react';
import type { SiteContent } from '@/lib/content';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

const ALL = 'all' as const;
type ActiveKey = typeof ALL | string;

export function Tecnologias({ t }: { t: SiteContent }) {
  const d = t.tech;
  const [active, setActive] = useState<ActiveKey>(ALL);

  // Deduped union of all tools across categories. Drives the "All" pill.
  const allItems = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const c of d.cats) {
      for (const it of c.items) {
        if (!seen.has(it)) {
          seen.add(it);
          out.push(it);
        }
      }
    }
    return out;
  }, [d.cats]);

  const activeCat = active === ALL ? null : d.cats.find((c) => c.key === active) || null;
  const items = activeCat ? activeCat.items : allItems;
  const description = activeCat ? activeCat.desc : d.allDesc;

  return (
    <section className="section section-hairline" id="tecnologias">
      <div className="wrap">
        <SectionHead idx={d.idx} eyebrow={d.eyebrow} title={d.title} sub={d.sub} />

        <Reveal className="tech-pills">
          <button
            className={`tech-pill ${active === ALL ? 'on' : ''}`}
            onClick={() => setActive(ALL)}
            aria-pressed={active === ALL}
          >
            {d.allLabel}
            <span className="cnt">{allItems.length}</span>
          </button>
          {d.cats.map((c) => (
            <button
              key={c.key}
              className={`tech-pill ${active === c.key ? 'on' : ''}`}
              onClick={() => setActive(active === c.key ? ALL : c.key)}
              aria-pressed={active === c.key}
            >
              {c.name}
              <span className="cnt">{c.items.length}</span>
            </button>
          ))}
        </Reveal>

        <Reveal className="tech-meta" delay={1} key={`meta-${active}`}>
          <span className="tech-meta-lbl">{activeCat ? activeCat.name : d.allLabel}</span>
          <span className="tech-meta-desc">{description}</span>
        </Reveal>

        <Reveal className="tech-pool" delay={1} key={`pool-${active}`}>
          {items.map((it, i) => (
            <span className="chip" key={it} style={{ animationDelay: `${i * 30}ms` }}>
              <span className="dot" />
              {it}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
