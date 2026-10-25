'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/types';
import type { SiteContent } from '@/lib/content';
import { LINKS } from '@/lib/icons';
import { Icon } from './Icon';
import { useScrolled } from '@/hooks/useScrolled';
import { useActiveSection } from '@/hooks/useActiveSection';
import { scrollToId } from '@/lib/utils';

interface NavSection {
  id: string;
  label: string;
}

export function Nav({
  t,
  lang,
  dark,
  toggleTheme,
  sections,
}: {
  t: SiteContent;
  lang: Lang;
  dark: boolean;
  toggleTheme: () => void;
  sections: NavSection[];
}) {
  const scrolled = useScrolled(14);
  const active = useActiveSection(sections.map((s) => s.id));
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenu(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menu]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenu(false);
    scrollToId(id, 76);
  };

  const controls = () => (
    <>
      <div className="lang-toggle" role="group" aria-label={lang === 'en' ? 'Language' : 'Idioma'}>
        <Link href="/" hrefLang="pt-BR" lang="pt-BR" className={lang === 'pt' ? 'on' : ''} aria-current={lang === 'pt' ? 'true' : undefined} aria-label="PT, Português">PT</Link>
        <Link href="/en" hrefLang="en" lang="en" className={lang === 'en' ? 'on' : ''} aria-current={lang === 'en' ? 'true' : undefined} aria-label="EN, English">EN</Link>
      </div>
      <button className="icon-btn" onClick={toggleTheme} aria-label={lang === 'en' ? (dark ? 'Use light theme' : 'Use dark theme') : (dark ? 'Usar tema claro' : 'Usar tema escuro')}>
        {dark ? (
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

  const sectionLinks = () => sections.map((s) => (
    <a key={s.id} href={`#${s.id}`} onClick={(e) => go(e, s.id)} className={active === s.id ? 'active' : ''} aria-current={active === s.id ? 'location' : undefined}>
      {s.label}
    </a>
  ));

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={(e) => go(e, 'top')}>
          <span className="bt">
            <span>Diego Arruda</span>
            <small>{lang === 'en' ? 'Software Engineering' : 'Engenharia de Software'}</small>
          </span>
        </a>
        <nav className="nav-links" aria-label={lang === 'en' ? 'Main navigation' : 'Navegação principal'}>{sectionLinks()}</nav>
        <div className="nav-tools">
          <div className="nav-desktop-controls">{controls()}</div>
        </div>
        <button ref={menuButton} className="icon-btn nav-burger" onClick={() => setMenu((open) => !open)} aria-expanded={menu} aria-controls="mobile-navigation" aria-label={lang === 'en' ? (menu ? 'Close menu' : 'Open menu') : (menu ? 'Fechar menu' : 'Abrir menu')}>
          <span>Menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d={menu ? 'M6 6l12 12M6 18 18 6' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </div>
      <div id="mobile-navigation" className="mobile-nav" hidden={!menu}>
        <nav className="mobile-nav-links" aria-label={lang === 'en' ? 'Mobile navigation' : 'Navegação móvel'}>{sectionLinks()}</nav>
        <div className="mobile-controls">
          {controls()}
          <a className="icon-btn soc-li" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label={t.cta.linkedin} onClick={() => setMenu(false)}><Icon name="linkedin" /></a>
          <a className="icon-btn soc-wa" href={LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label={t.cta.whatsapp} onClick={() => setMenu(false)}><Icon name="whatsapp" /></a>
        </div>
      </div>
    </header>
  );
}
