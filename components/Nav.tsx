'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/types';
import type { SiteContent } from '@/lib/content';
import type { BlogMenuData } from '@/lib/blog-menu';
import { NAV_UI, activeNavKey, contactPath, homePath, projetosPath, sobrePath, switchLangPath } from '@/lib/site-nav';
import { LINKS } from '@/lib/icons';
import { Icon } from './Icon';
import { BlogMenu } from './BlogMenu';
import { useScrolled } from '@/hooks/useScrolled';
import { scrollToId } from '@/lib/utils';

export function Nav({
  t,
  lang,
  dark,
  toggleTheme,
  blogMenu,
}: {
  t: SiteContent;
  lang: Lang;
  dark: boolean;
  toggleTheme: () => void;
  blogMenu: BlogMenuData;
}) {
  const ui = NAV_UI[lang];
  const scrolled = useScrolled(14);
  const pathname = usePathname() ?? '/';
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = homePath(lang);
  const isHome = pathname === home;
  const active = activeNavKey(pathname);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

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

  const goHere = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    flushSync(() => setMenu(false));
    scrollToId(id, 76);
    const target = id === 'top' ? null : document.getElementById(id);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  };

  const controls = () => (
    <>
      <div className="lang-toggle" role="group" aria-label={ui.language}>
        <Link href={switchLangPath(pathname, 'pt')} hrefLang="pt-BR" lang="pt-BR" className={lang === 'pt' ? 'on' : ''} aria-current={lang === 'pt' ? 'true' : undefined} aria-label="PT, Português">PT</Link>
        <Link href={switchLangPath(pathname, 'en')} hrefLang="en" lang="en" className={lang === 'en' ? 'on' : ''} aria-current={lang === 'en' ? 'true' : undefined} aria-label="EN, English">EN</Link>
      </div>
      <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={dark ? ui.lightTheme : ui.darkTheme}>
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

  const pageLink = (key: 'projetos' | 'sobre' | 'contato', href: string) => (
    <Link key={key} href={href} className={active === key ? 'active' : ''} aria-current={active === key ? 'page' : undefined} onClick={() => setMenu(false)}>
      {ui[key]}
    </Link>
  );

  const homeLink = (
    <Link key="inicio" href={home} className={`nav-home ${isHome ? 'active' : ''}`} aria-current={isHome ? 'page' : undefined} onClick={(e) => { if (isHome) goHere(e, 'top'); else setMenu(false); }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.2a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6a2 2 0 0 1 .7 1.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        <path d="M9.5 21v-6.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V21" />
      </svg>
      <span className="nav-home-label">{ui.inicio}</span>
    </Link>
  );

  const navLinks = () => [
    homeLink,
    pageLink('projetos', projetosPath(lang)),
    <BlogMenu key="guias" data={blogMenu} active={active === 'guias'} />,
    pageLink('sobre', sobrePath(lang)),
    pageLink('contato', contactPath(lang)),
  ];

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="brand" href={home} onClick={(e) => { if (isHome) goHere(e, 'top'); else setMenu(false); }}>
          <span className="bt">
            <span translate="no">Diego Arruda</span>
            <small>{ui.brandRole}</small>
          </span>
        </Link>
        <nav className="nav-links" aria-label={ui.mainNav}>{navLinks()}</nav>
        <div className="nav-tools">
          <div className="nav-desktop-controls">{controls()}</div>
        </div>
        <button ref={menuButton} type="button" className="icon-btn nav-burger" onClick={() => setMenu((open) => !open)} aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu ? ui.closeMenu : ui.openMenu}>
          <span>{ui.menuWord}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d={menu ? 'M6 6l12 12M6 18 18 6' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
        </button>
      </div>
      <div id="mobile-navigation" className="mobile-nav" hidden={!menu}>
        <nav className="mobile-nav-links" aria-label={ui.mobileNav}>{navLinks()}</nav>
        <div className="mobile-controls">
          {controls()}
          <a className="icon-btn soc-li" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label={t.cta.linkedin} onClick={() => setMenu(false)}><Icon name="linkedin" /></a>
          <a className="icon-btn soc-wa" href={LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label={t.cta.whatsapp} onClick={() => setMenu(false)}><Icon name="whatsapp" /></a>
        </div>
      </div>
    </header>
  );
}
