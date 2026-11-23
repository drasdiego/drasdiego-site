'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { Lang } from '@/types';
import type { BlogMenuData } from '@/lib/blog-menu';
import { NAV_UI } from '@/lib/site-nav';
import { matchEntries, normalizeText } from '@/lib/search';

export function SiteSearch({ lang, menu }: { lang: Lang; menu: BlogMenuData }) {
  const ui = NAV_UI[lang];
  const router = useRouter();
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const entries = useMemo(
    () => menu.categories.flatMap((cat) => cat.guides.map((guide) => ({ ...guide, category: cat.name, label: cat.name }))),
    [menu],
  );
  const searching = normalizeText(query) !== '';
  const results = useMemo(() => matchEntries(entries, query), [entries, query]);
  const status = !searching ? '' : results.length === 0 ? menu.searchEmpty : results.length === 1 ? menu.searchOne : menu.searchMany.replace('{n}', String(results.length));

  useEffect(() => {
    setOpen(false);
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (event: MouseEvent | TouchEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
    };
  }, [open]);

  const links = () => Array.from(list.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);

  const onFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searching && results[0]) {
      event.preventDefault();
      router.push(results[0].href);
      setOpen(false);
    } else if (event.key === 'ArrowDown') {
      const first = links()[0];
      if (first) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const all = links();
    const index = all.findIndex((node) => node === document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    if (event.key === 'ArrowDown') all[Math.min(index + 1, all.length - 1)]?.focus();
    else if (index === 0) field.current?.focus();
    else all[index - 1]?.focus();
  };

  return (
    <div
      ref={box}
      className="site-search"
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null;
        if (open && next && !box.current?.contains(next)) setOpen(false);
      }}
    >
      <button ref={button} type="button" className="icon-btn" aria-label={ui.search} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      </button>
      <div id={panelId} className="site-search-panel" role="search" hidden={!open}>
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
            onKeyDown={onFieldKeyDown}
            placeholder={ui.searchPlaceholder}
            aria-label={ui.search}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <p className="sr-only" role="status">{status}</p>
        {!searching ? (
          <p className="search-empty">{ui.searchHint}</p>
        ) : results.length === 0 ? (
          <p className="search-empty">{menu.searchEmpty}</p>
        ) : (
          <ul ref={list} className="search-results" onKeyDown={onListKeyDown}>
            {results.map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} onClick={() => setOpen(false)}>
                  <span>{guide.title}</span>
                  <span className="search-meta">
                    <span>{guide.category}</span>
                    <span className="search-key" aria-label={`${menu.keywordShort}: ${guide.keyword}`}>{guide.keyword}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
