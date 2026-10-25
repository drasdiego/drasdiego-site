'use client';

import type { SiteContent } from '@/lib/content';
import { LINKS } from '@/lib/icons';

export function Footer({ t }: { t: SiteContent }) {
  return (
    <footer className="footer"><div className="wrap footer-inner">
      <div><p className="footer-name">Diego Arruda</p><p>{t.footer.rights}</p></div>
      <nav className="footer-links" aria-label={t.nav.contact}>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href="#top" aria-label={t.nav.contact === 'Contact' ? 'Back to top' : 'Voltar ao início'}>↑</a>
      </nav>
    </div></footer>
  );
}
