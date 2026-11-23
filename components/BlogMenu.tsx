'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { BlogMenuData } from '@/lib/blog-menu';
import { matchEntries, normalizeText } from '@/lib/search';

export function BlogMenu({ data, active = false }: { data: BlogMenuData; active?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const panelId = useId();
  const tabPrefix = useId();
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const found = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const moveFocus = useRef(false);

  const categories = data.categories.filter((cat) => cat.guides.length > 0);
  const searching = normalizeText(query) !== '';
  const results = useMemo(
    () =>
      matchEntries(
        categories.flatMap((cat) => cat.guides.map((guide) => ({ ...guide, category: cat.name, label: cat.name }))),
        query,
      ),
    [categories, query],
  );
  const status = !searching ? '' : results.length === 0 ? data.searchEmpty : results.length === 1 ? data.searchOne : data.searchMany.replace('{n}', String(results.length));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 761px)');
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const input = field.current;
      if (input && document.activeElement === input && input.value) {
        event.preventDefault();
        setQuery('');
        return;
      }
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

  useEffect(() => {
    if (!open || !wide || !moveFocus.current) return;
    moveFocus.current = false;
    tabs.current[current]?.focus();
  }, [current, open, wide]);

  const toggle = () => {
    setOpen((value) => {
      if (!value) {
        setCurrent(0);
        setExpanded(null);
        setQuery('');
      }
      return !value;
    });
  };

  const close = () => setOpen(false);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    moveFocus.current = true;
    setCurrent(next);
  };

  const onFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searching && results[0]) {
      event.preventDefault();
      router.push(results[0].href);
      close();
    } else if (event.key === 'ArrowDown') {
      const first = found.current?.querySelector<HTMLAnchorElement>('a');
      if (first) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onFoundKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const all = Array.from(found.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const index = all.findIndex((node) => node === document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    if (event.key === 'ArrowDown') all[Math.min(index + 1, all.length - 1)]?.focus();
    else if (index === 0) field.current?.focus();
    else all[index - 1]?.focus();
  };

  const selected = categories[current] ?? categories[0];

  return (
    <div
      ref={box}
      className="blog-menu"
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null;
        if (open && next && !box.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        className={`blog-menu-btn${active ? ' active' : ''}`}
        aria-current={active ? 'page' : undefined}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span>{data.label}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={open ? 'open' : undefined}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={panelId} className="blog-menu-panel" hidden={!open}>
        <div className="blog-menu-search">
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
              placeholder={data.searchPlaceholder}
              aria-label={data.searchLabel}
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
        <p className="sr-only" role="status">{status}</p>
        {searching ? (
          <div className="blog-menu-list blog-menu-found">
            {results.length === 0 ? (
              <p className="search-empty">{data.searchEmpty}</p>
            ) : (
              <ul ref={found} onKeyDown={onFoundKeyDown}>
                {results.map((guide) => (
                  <li key={guide.href}>
                    <Link href={guide.href} onClick={close}>
                      <span>{guide.title}</span>
                      <span className="search-meta">
                        <span>{guide.category}</span>
                        <span className="search-key">{guide.keyword}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : wide && selected ? (
          <div className="blog-menu-cols">
            <div className="blog-menu-topics" role="tablist" aria-orientation="vertical" aria-label={data.topicsLabel}>
              <p className="blog-menu-head">{data.topicsLabel}</p>
              {categories.map((cat, index) => (
                <button
                  key={cat.slug}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${tabPrefix}-tab-${cat.slug}`}
                  aria-selected={index === current}
                  aria-controls={`${tabPrefix}-panel-${cat.slug}`}
                  tabIndex={index === current ? 0 : -1}
                  className={`blog-menu-topic${index === current ? ' on' : ''}`}
                  onClick={() => setCurrent(index)}
                  onFocus={() => setCurrent(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span>{cat.name}</span>
                  <span className="blog-menu-count">{cat.guides.length}</span>
                </button>
              ))}
            </div>
            <div
              className="blog-menu-list"
              role="tabpanel"
              id={`${tabPrefix}-panel-${selected.slug}`}
              aria-labelledby={`${tabPrefix}-tab-${selected.slug}`}
              tabIndex={0}
            >
              <p className="blog-menu-head">
                {selected.name} <span className="blog-menu-count">{selected.count}</span>
              </p>
              <ul>
                {selected.guides.map((guide) => (
                  <li key={guide.href}>
                    <Link href={guide.href} onClick={close}>{guide.title}</Link>
                  </li>
                ))}
              </ul>
              <Link className="blog-menu-more" href={selected.href} onClick={close}>{selected.allInLabel}</Link>
            </div>
          </div>
        ) : (
          <ul className="blog-menu-acc">
            {categories.map((cat) => {
              const isOpen = expanded === cat.slug;
              return (
                <li key={cat.slug}>
                  <button
                    type="button"
                    className={`blog-menu-topic${isOpen ? ' on' : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={`${tabPrefix}-acc-${cat.slug}`}
                    onClick={() => setExpanded(isOpen ? null : cat.slug)}
                  >
                    <span>{cat.name}</span>
                    <span className="blog-menu-count">{cat.guides.length}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={isOpen ? 'open' : undefined}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div id={`${tabPrefix}-acc-${cat.slug}`} className="blog-menu-sub" hidden={!isOpen}>
                    <ul>
                      {cat.guides.map((guide) => (
                        <li key={guide.href}>
                          <Link href={guide.href} onClick={close}>{guide.title}</Link>
                        </li>
                      ))}
                    </ul>
                    <Link className="blog-menu-more" href={cat.href} onClick={close}>{cat.allInLabel}</Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Link className="blog-menu-all" href={data.allHref} onClick={close}>{data.allLabel}</Link>
      </div>
    </div>
  );
}
