'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
  num: string;
}

export function GuideToc({ title, items }: { title: string; items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  const [wide, setWide] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const wideQuery = window.matchMedia('(min-width: 1100px)');
    const mediumQuery = window.matchMedia('(min-width: 768px)');
    setWide(wideQuery.matches);
    setOpen(mediumQuery.matches);
    setReady(true);
    const onChange = () => setWide(wideQuery.matches);
    wideQuery.addEventListener('change', onChange);
    return () => wideQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || items.length === 0) return;
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
    const footer = document.querySelector('footer');
    if (headings.length === 0) return;
    const pick = () => {
      let current = headings[0].id;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= 140) current = el.id;
        else break;
      }
      if (footer) {
        const box = footer.getBoundingClientRect();
        if (box.top >= 0 && box.bottom <= window.innerHeight + 2) current = headings[headings.length - 1].id;
      }
      setActive(current);
    };
    const observer = new IntersectionObserver(pick, { rootMargin: '-140px 0px 0px 0px', threshold: [0, 0.5, 1] });
    headings.forEach((el) => observer.observe(el));
    const endObserver = new IntersectionObserver(pick, { threshold: [0, 0.25, 0.5, 0.75, 0.9, 0.95, 0.98, 0.99] });
    if (footer) endObserver.observe(footer);
    pick();
    return () => {
      observer.disconnect();
      endObserver.disconnect();
    };
  }, [items]);

  return (
    <nav className="guide-toc" aria-labelledby="guide-toc-title" data-ready={ready ? '' : undefined}>
      <details
        open={wide || open}
        onToggle={(event) => {
          if (!wide) setOpen(event.currentTarget.open);
        }}
      >
        <summary tabIndex={wide ? -1 : undefined} onClick={(event) => { if (wide) event.preventDefault(); }}>
          <span id="guide-toc-title">{title}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </summary>
        <ol className="guide-toc-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined} onClick={() => setActive(item.id)}>
                <span aria-hidden="true">{item.num}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
