'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/types';
import { LINKS } from '@/lib/icons';
import { PRESENTATION } from '@/lib/presentation';
import type { GuideNoteData } from '@/lib/blog-menu';
import { NAV_UI, activeNavKey, privacyPath, splitLocale } from '@/lib/site-nav';

export function Footer({ lang, blogNote }: { lang: Lang; blogNote: GuideNoteData }) {
  const ui = NAV_UI[lang];
  const pathname = usePathname() ?? '/';
  const isBlog = activeNavKey(pathname) === 'guias';
  const category = splitLocale(pathname).rest.split('/')[2];
  const note = (category && blogNote.byCategory[category]) || blogNote.index;
  return (
    <footer className={`footer${isBlog ? ' blog-footer' : ''}`}>
      <div className="wrap footer-inner">
        <div>
          <p className="footer-name" translate="no">Diego Arruda</p>
          <p>{PRESENTATION[lang].footer}</p>
          {isBlog && <p className="footer-note">{note}</p>}
          {isBlog && <p className="blog-handle">{blogNote.handle}</p>}
          <p className="footer-legal"><Link href={privacyPath(lang)}>{ui.privacidade}</Link></p>
        </div>
        <div className="footer-contact">
          <p className="footer-contact-label">{ui.contato}</p>
          <nav className="footer-links" aria-label={ui.contato}>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="#top" aria-label={ui.backToTop}>↑</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
