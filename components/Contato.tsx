import Link from 'next/link';
import type { SiteContent } from '@/lib/content';
import type { Lang } from '@/types';
import { LINKS } from '@/lib/icons';
import { contactPath } from '@/lib/site-nav';

export function Contato({ t, lang }: { t: SiteContent; lang: Lang }) {
  const d = t.contact;
  return (
    <section className="section section-hairline contact" id="contato" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-card">
          <div className="contact-copy">
            <h2 className="section-title" id="contact-title">{d.h2}</h2>
            <p className="section-sub">{d.p}</p>
          </div>
          <div className="contact-actions">
            <Link className="btn btn-primary" href={contactPath(lang)}>{d.send}</Link>
            <a className="text-link" href={LINKS.linkedin} target="_blank" rel="noreferrer">{d.lk}</a>
            <a className="text-link" href={LINKS.whatsapp} target="_blank" rel="noreferrer">{d.wa}</a>
            <a className="text-link" href={LINKS.github} target="_blank" rel="noreferrer">{d.gh}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
