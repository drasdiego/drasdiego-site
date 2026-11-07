'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/types';
import { BLOG_HANDLE, BLOG_UI } from '@/lib/blog';
import type { BlogMenuData } from '@/lib/blog-menu';
import type { NavSection } from '@/lib/site-nav';
import { LINKS } from '@/lib/icons';
import { useTweaks } from '@/hooks/useTweaks';
import { useScrolled } from '@/hooks/useScrolled';
import { BlogMenu } from './BlogMenu';

export function BlogShell({
  lang,
  paths,
  sections,
  menu,
  children,
}: {
  lang: Lang;
  paths: { pt: string; en: string };
  sections: NavSection[];
  menu: BlogMenuData;
  children: React.ReactNode;
}) {
  const ui = BLOG_UI[lang];
  const { tweaks, set, hydrated } = useTweaks();
  const scrolled = useScrolled(14);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const home = lang === 'en' ? '/en' : '/';

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
    root.setAttribute('data-density', tweaks.density);
  }, [hydrated, tweaks.dark, tweaks.density]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileOpen(false);
      burger.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const controls = () => (
    <>
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
    </>
  );

  const links = () => (
    <>
      {sections.map((s) => (
        <Link key={s.id} href={`${home}#${s.id}`}>{s.label}</Link>
      ))}
      <BlogMenu data={menu} />
    </>
  );

  return (
    <>
      <a className="skip-link" href="#conteudo">{ui.skip}</a>
      <header className={`nav blog-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link className="brand" href={home}>
            <span className="bt">
              <span>Diego Arruda</span>
              <small>{lang === 'en' ? 'Software Engineering' : 'Engenharia de Software'}</small>
            </span>
          </Link>
          <nav className="nav-links" aria-label={ui.mainNav}>{links()}</nav>
          <div className="nav-tools">
            <div className="nav-desktop-controls">{controls()}</div>
          </div>
          <button ref={burger} type="button" className="icon-btn nav-burger" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? ui.closeMenu : ui.openMenu}>
            <span>{ui.menuWord}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d={mobileOpen ? 'M6 6l12 12M6 18 18 6' : 'M3 6h18M3 12h18M3 18h18'} />
            </svg>
          </button>
        </div>
        <div id="mobile-navigation" className="mobile-nav" hidden={!mobileOpen}>
          <nav className="mobile-nav-links" aria-label={ui.mobileNav}>{links()}</nav>
          <div className="mobile-controls">{controls()}</div>
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
