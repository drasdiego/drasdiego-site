'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BlogMenuData } from '@/lib/blog-menu';

export function BlogMenu({ data, active = false }: { data: BlogMenuData; active?: boolean }) {
  const pathname = usePathname();
  const panelId = useId();
  const tabPrefix = useId();
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const moveFocus = useRef(false);

  const categories = data.categories.filter((cat) => cat.guides.length > 0);

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
        {wide && selected ? (
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
