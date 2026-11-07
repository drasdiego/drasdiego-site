import type { SiteContent } from '@/lib/content';
import { LINKS } from '@/lib/icons';

export function Contato({ t }: { t: SiteContent }) {
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
            <a className="btn btn-primary" href={LINKS.linkedin} target="_blank" rel="noreferrer">{d.lk}</a>
            <a className="text-link" href={LINKS.whatsapp} target="_blank" rel="noreferrer">{d.wa}</a>
            <a className="text-link" href={LINKS.github} target="_blank" rel="noreferrer">{d.gh}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
