import type { SiteContent } from '@/lib/content';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

export function DataAI({ t }: { t: SiteContent }) {
  const d = t.data;
  return (
    <section className="section section-hairline dataai" id="dados">
      <div className="wrap">
        <SectionHead idx={d.idx} eyebrow={d.eyebrow} title={d.title} sub={d.sub} />
        <Reveal className="cap-list">
          {d.caps.map((c, i) => (
            <div className="cap" key={i}>
              <div className="cap-ic">
                <Icon name={c.ic} />
              </div>
              <div>
                <h4>{c.h}</h4>
                <p>{c.p}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
