'use client';

import { useMemo, useState } from 'react';
import type { CategoryId, Qualification } from '@/types';
import type { SiteContent } from '@/lib/content';
import { QUAL_CATS, isAcademicDegree } from '@/services/sheets';
import { useQualifications } from '@/hooks/useQualifications';
import { norm } from '@/lib/utils';
import { Reveal } from './Reveal';

type MetaLabels = { inst: string; date: string; cat: string };

function QualRow({
  q,
  catLabel,
  viewCertLabel,
  metaLabels,
}: {
  q: Qualification;
  catLabel: string;
  viewCertLabel: string;
  metaLabels: MetaLabels;
}) {
  return (
    <li className={`qrow open ${q.featured ? 'feat' : ''}`}>
      <div className="qrow-head qrow-head-static">
        <span className="qrow-cat">{catLabel}</span>
        <div className="qrow-main">
          <p className="qrow-title">{q.titulo}</p>
          <span className="qrow-inst">{q.instituicao || '·'}</span>
        </div>
        <span className="qrow-aside">
          {q.featured ? <span className="qrow-badge">cert</span> : null}
          {q.dataEmissao ? <span className="qrow-date">{q.dataEmissao}</span> : null}
        </span>
      </div>
      <div className="qrow-body">
        <div className="qrow-body-clip">
          <div className="qrow-body-inner">
            {q.descricao ? <p className="qrow-desc">{q.descricao}</p> : null}
            <div className="qrow-meta">
              <div className="qmeta">
                <span className="qmeta-k">{metaLabels.inst}</span>
                <span className="qmeta-v">{q.instituicao || '·'}</span>
              </div>
              <div className="qmeta">
                <span className="qmeta-k">{metaLabels.date}</span>
                <span className="qmeta-v">{q.dataEmissao || '·'}</span>
              </div>
              <div className="qmeta">
                <span className="qmeta-k">{metaLabels.cat}</span>
                <span className="qmeta-v">{catLabel}</span>
              </div>
            </div>
            {q.urlCertificado ? (
              <a className="qrow-cert" href={q.urlCertificado} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
                {viewCertLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export function Qualificacoes({ t }: { t: SiteContent }) {
  const d = t.quals;
  const { items: allItems } = useQualifications();
  const items = useMemo(() => allItems.filter((it) => !isAcademicDegree(it.titulo)), [allItems]);
  const [active, setActive] = useState<CategoryId | null>(null);
  const [query, setQuery] = useState('');
  const [revealedAll, setRevealedAll] = useState(false);

  function selectFilter(id: CategoryId) {
    setRevealedAll(false);
    setActive((cur) => (cur === id ? null : id));
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const cat of QUAL_CATS) c[cat.id] = 0;
    for (const it of items) c[it.categoria] = (c[it.categoria] || 0) + 1;
    return c;
  }, [items]);

  const sorted = useMemo(() => {
    const yearOf = (it: Qualification) => {
      const m = String(it.dataEmissao || '').match(/(19|20)\d{2}/);
      return m ? parseInt(m[0], 10) : -1;
    };
    return items.slice().sort((a, b) => {
      const ya = yearOf(a);
      const yb = yearOf(b);
      if (yb !== ya) return yb - ya;
      return a.titulo.localeCompare(b.titulo);
    });
  }, [items]);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return sorted.filter((it) => {
      if (active !== null && it.categoria !== active) return false;
      if (q && !norm(`${it.titulo} ${it.instituicao}`).includes(q)) return false;
      return true;
    });
  }, [sorted, active, query]);

  const recent = useMemo(() => sorted.slice(0, 6), [sorted]);

  const catName = (id: CategoryId) => d.catNames[id] || id;

  const listShown = active !== null || query.trim() !== '' || revealedAll;

  function toggleAll() {
    if (listShown) {
      setRevealedAll(false);
      setActive(null);
      setQuery('');
    } else {
      setRevealedAll(true);
    }
  }

  return (
    <section className="section section-hairline" id="formacao">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="section-title">{d.title}</h2>
          <p className="section-sub">{d.sub}</p>
        </Reveal>

        <Reveal className="acad-block">
          <p className="block-label">{d.acadTitle}</p>
          <div className="acad-grid">
            {d.academic.map((a, i) => (
              <div className={`acad ${a.done ? 'done' : ''}`} key={i}>
                <div className="acad-body">
                  <span className={`acad-st ${a.done ? 'done' : 'prog'}`}>{a.status}</span>
                  <h3>{a.name}</h3>
                  <div className="acad-meta">
                    {a.org} · {a.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="qual-head" delay={1}>
          <div className="qual-head-left">
            <p className="block-label">{d.profTitle}</p>
            <p className="qual-sub">{d.profSub}</p>
          </div>
          <p className="qual-total">{counts.all} {d.totalLabel}</p>
        </Reveal>

        <Reveal className="qual-toolbar" delay={1}>
          <div className="qual-filters">
            {QUAL_CATS.map((c) => (
              <button
                key={c.id}
                className={`fpill ${active === c.id ? 'on' : ''}`}
                onClick={() => selectFilter(c.id)}
                aria-pressed={active === c.id}
                aria-controls="qualifications-list"
              >
                {catName(c.id)}
                <span className="fcount">{counts[c.id] || 0}</span>
              </button>
            ))}
            <button className={`fpill ftoggle ${listShown ? 'on' : ''}`} onClick={toggleAll} aria-expanded={listShown} aria-controls="qualifications-list">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 13, height: 13, transform: listShown ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
              {listShown ? d.collapseAll : d.expandAll}
            </button>
          </div>
          <div className="qual-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={d.searchPlaceholder} aria-label={d.searchPlaceholder} aria-controls="qualifications-list" />
            {query ? (
              <button className="qsearch-clear" onClick={() => setQuery('')} aria-label={d.searchPlaceholder.toLowerCase().includes('search') ? 'Clear search' : 'Limpar busca'}>
                ×
              </button>
            ) : null}
          </div>
        </Reveal>

        {recent.length > 0 && !listShown ? (
          <div className="qual-summary">
            <p className="qual-summary-label">{d.recentLabel}</p>
            <ul className="qual-summary-list" role="list">
              {recent.map((q) => (
                <li key={q.id}>
                  {q.titulo}
                  {q.instituicao ? ` · ${q.instituicao}` : ''}
                  {q.dataEmissao ? ` · ${q.dataEmissao}` : ''}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div id="qualifications-list" hidden={!listShown} aria-live="polite">
          {filtered.length === 0 ? (
            <div className="qual-empty">{d.emptyLabel}</div>
          ) : (
            <ul className="qual-list" role="list">
              {filtered.map((q) => (
                <QualRow
                  key={q.id}
                  q={q}
                  catLabel={catName(q.categoria)}
                  viewCertLabel={d.viewCert}
                  metaLabels={d.metaLabels}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
