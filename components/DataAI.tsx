import type { SiteContent } from '@/lib/content';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

export function DataAI({ t }: { t: SiteContent }) {
  const d = t.data;
  return (
    <section className="section section-hairline dataai" id="dados" aria-labelledby="dados-titulo">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title" id="dados-titulo">{d.title}</h2>
          <p className="section-sub">{d.sub}</p>
        </Reveal>
        <Reveal className="cap-list">
          {d.caps.map((c, i) => (
            <div className="cap" key={i}>
              <div className="cap-ic">
                <Icon name={c.ic} />
              </div>
              <div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
