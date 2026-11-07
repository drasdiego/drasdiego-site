'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/types';
import { BLOG_HANDLE, BLOG_UI, CATEGORIES, blogRoot, guidesIn } from '@/lib/blog';
import { LINKS } from '@/lib/icons';
import { useTweaks } from '@/hooks/useTweaks';

function BlogMenu({ lang }: { lang: Lang }) {
  const ui = BLOG_UI[lang];
  const pathname = usePathname();
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
      <button ref={button} type="button" className="blog-menu-btn" aria-expanded={open} aria-controls="blog-menu-panel" onClick={() => setOpen((v) => !v)}>
        <span>{ui.menu}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={open ? 'open' : undefined}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id="blog-menu-panel" className="blog-menu-panel" hidden={!open}>
        <Link href={blogRoot(lang)} className="blog-menu-all">{ui.allGuides}</Link>
        {CATEGORIES.map((cat) => (
          <div key={cat.slug} className="blog-menu-cat">
            <Link href={`${blogRoot(lang)}/${cat.slug}`}>{cat[lang].name}</Link>
            <ul>
              {guidesIn(cat.slug).map((g) => (
                <li key={g.slug}><Link href={`${blogRoot(lang)}/${cat.slug}/${g.slug}`}>{g[lang].title}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogShell({ lang, paths, children }: { lang: Lang; paths: { pt: string; en: string }; children: React.ReactNode }) {
  const ui = BLOG_UI[lang];
  const { tweaks, set, hydrated } = useTweaks();
  const home = lang === 'en' ? '/en' : '/';

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
    root.setAttribute('data-density', tweaks.density);
  }, [hydrated, tweaks.dark, tweaks.density]);

  return (
    <>
      <a className="skip-link" href="#conteudo">{ui.skip}</a>
      <header className="nav blog-header">
        <div className="nav-inner">
          <Link className="brand" href={home}>
            <span className="bt">
              <span>Diego Arruda</span>
              <small>{lang === 'en' ? 'Software Engineering' : 'Engenharia de Software'}</small>
            </span>
          </Link>
          <nav className="blog-nav-links" aria-label={ui.mainNav}>
            <Link href={home}>{ui.home}</Link>
            <BlogMenu lang={lang} />
          </nav>
          <div className="blog-tools">
            <div className="lang-toggle" role="group" aria-label={ui.language}>
              <Link href={paths.pt} hrefLang="pt-BR" lang="pt-BR" className={lang === 'pt' ? 'on' : ''} aria-current={lang === 'pt' ? 'true' : undefined} aria-label="PT, Português">PT</Link>
              <Link href={paths.en} hrefLang="en" lang="en" className={lang === 'en' ? 'on' : ''} aria-current={lang === 'en' ? 'true' : undefined} aria-label="EN, English">EN</Link>
            </div>
            <button type="button" className="icon-btn" onClick={() => set('dark', !tweaks.dark)} aria-label={tweaks.dark ? ui.lightTheme : ui.darkTheme}>
              {tweaks.dark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <footer className="footer blog-footer">
        <div className="wrap footer-inner">
          <div>
            <p className="footer-name">Diego Arruda</p>
            <p>{ui.footer}</p>
            <p className="blog-handle">{BLOG_HANDLE}</p>
          </div>
          <nav className="footer-links" aria-label={ui.footerNav}>
            <Link href={home}>{ui.backHome}</Link>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
