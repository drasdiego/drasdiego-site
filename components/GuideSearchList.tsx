'use client';

import { useId, useMemo, useRef, useState } from 'react';
import type { GuideListData } from '@/lib/blog-menu';
import { matchEntries, normalizeText } from '@/lib/search';
import { GuideCardView } from './GuideCardView';

export function GuideSearchList({ data, heading }: { data: GuideListData; heading: string }) {
  const [query, setQuery] = useState('');
  const field = useRef<HTMLInputElement>(null);
  const headingId = useId();
  const searching = normalizeText(query) !== '';

  const shown = useMemo(
    () => (searching ? matchEntries(data.items.map((item) => ({ ...item, label: item.tag })), query) : data.items),
    [data.items, query, searching],
  );

  const count = (many: string, one: string, n: number) => (n === 1 ? one : many.replace('{n}', String(n)));
  const status = searching ? count(data.found, data.foundOne, shown.length) : count(data.total, data.totalOne, data.items.length);

  const clear = () => {
    setQuery('');
    field.current?.focus();
  };

  return (
    <section className="blog-list" aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">{heading}</h2>
      <div className="blog-search" role="search">
        <div className="search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            ref={field}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && query) {
                event.preventDefault();
                setQuery('');
              }
            }}
            placeholder={data.placeholder}
            aria-label={data.searchLabel}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button type="button" className="search-clear" onClick={clear} aria-label={data.clearLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          )}
        </div>
        <p className="blog-search-count" role="status" aria-live="polite">{status}</p>
      </div>
      {shown.length === 0 ? (
        <p className="blog-search-empty">
          <strong>{data.empty}</strong> {data.emptyTip}
        </p>
      ) : (
        <ul className="guides-grid">
          {shown.map((item) => (
            <li key={item.href}><GuideCardView card={item} /></li>
          ))}
        </ul>
      )}
    </section>
  );
}
