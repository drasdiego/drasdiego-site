'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BlogMenuData } from '@/lib/blog-menu';

export function BlogMenu({ data, active = false }: { data: BlogMenuData; active?: boolean }) {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  return (
    <div
      ref={box}
      className="blog-menu"
      onBlur={(event) => {
        if (open && !box.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button ref={button} type="button" className={`blog-menu-btn${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
        <span>{data.label}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={open ? 'open' : undefined}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={panelId} className="blog-menu-panel" hidden={!open}>
        {data.categories.map((cat) => (
          <div key={cat.href} className="blog-menu-cat">
            <Link href={cat.href}>{cat.name}</Link>
            <ul>
              {cat.guides.map((g) => (
                <li key={g.href}><Link href={g.href}>{g.title}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
