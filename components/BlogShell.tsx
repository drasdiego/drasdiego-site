'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Lang } from '@/types';
import { BLOG_HANDLE, BLOG_UI, blogRoot } from '@/lib/blog';
import { LINKS } from '@/lib/icons';
import { useTweaks } from '@/hooks/useTweaks';

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
      <header className="nav">
        <div className="nav-inner">
          <Link className="brand" href={home}>
            <span className="bt">
              <span>Diego Arruda</span>
              <small>{lang === 'en' ? 'Software Engineering' : 'Engenharia de Software'}</small>
            </span>
          </Link>
          <nav className="blog-nav-links" aria-label={ui.mainNav}>
            <Link href={home}>{ui.home}</Link>
            <Link href={blogRoot(lang)} aria-current={paths[lang] === blogRoot(lang) ? 'page' : undefined} className="active">{ui.blog}</Link>
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
