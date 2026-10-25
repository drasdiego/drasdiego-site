'use client';

import { useState } from 'react';
import type { SiteContent } from '@/lib/content';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/** A token is plain text (default color) or [className, text] for a colored span. */
type Token = string | [string, string];
const CODE_SAMPLES: Record<number, Token[][]> = {
  0: [
    [['c-com', '-- crescimento por trimestre']],
    [' '],
    [['c-key', 'SELECT'], ' periodo,'],
    ['       COUNT(*) AS casos,'],
    ['       AVG(resolucao) AS sla'],
    [['c-key', 'FROM'], ' atendimentos'],
    [['c-key', 'WHERE'], ' status = ', ['c-str', "'resolvido'"]],
    [['c-key', 'GROUP BY'], ' periodo'],
    [['c-key', 'ORDER BY'], ' periodo ', ['c-key', 'DESC'], ';'],
  ],
  1: [
    [['c-key', 'import'], ' pandas ', ['c-key', 'as'], ' pd'],
    [' '],
    ['df = pd.', ['c-fn', 'read_sql'], '(query, conn)'],
    ['kpi = df.', ['c-fn', 'groupby'], '(', ['c-str', "'time'"], ')'],
    ['         .', ['c-fn', 'agg'], '(sla=(', ['c-str', "'res'"], ', ', ['c-str', "'mean'"], '))'],
    [' '],
    [['c-com', '# detecta anomalias']],
    ['out = kpi[kpi.sla > kpi.sla.', ['c-fn', 'quantile'], '(', ['c-num', '0.95'], ')]'],
  ],
  2: [
    [['c-com', '// assistente de IA (Claude)']],
    [['c-key', 'const'], ' res = ', ['c-key', 'await'], ' ai.', ['c-fn', 'generate'], '({'],
    ['  model: ', ['c-str', "'claude'"], ','],
    ['  context: perfilDiego,'],
    ['  query: pergunta,'],
    ['})'],
    [' '],
    ['return res.', ['c-fn', 'text'], '()'],
  ],
};

function renderLine(parts: Token[]) {
  return parts.map((p, j) =>
    Array.isArray(p) ? (
      <span key={j} className={p[0]}>
        {p[1]}
      </span>
    ) : (
      <span key={j}>{p}</span>
    ),
  );
}

export function DataAI({ t }: { t: SiteContent }) {
  const d = t.data;
  const [tab, setTab] = useState(0);
  return (
    <section className="section section-hairline dataai" id="dados">
      <div className="wrap">
        <SectionHead idx={d.idx} eyebrow={d.eyebrow} title={d.title} sub={d.sub} />
        <div className="dataai-grid">
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

          <Reveal className="code-panel" delay={1}>
            <div className="code-tabs">
              {d.tabs.map((name, i) => (
                <button key={i} className={`code-tab ${tab === i ? 'on' : ''}`} onClick={() => setTab(i)}>
                  {name}
                </button>
              ))}
            </div>
            <div className="code-body">
              {(CODE_SAMPLES[tab] || []).map((parts, i) => (
                <span className="ln" key={i}>
                  {renderLine(parts)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
