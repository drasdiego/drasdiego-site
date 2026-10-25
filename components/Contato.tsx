'use client';

import Image from 'next/image';
import type { SiteContent } from '@/lib/content';
import { LINKS } from '@/lib/icons';

export function Contato({ t }: { t: SiteContent }) {
  const d = t.contact;
  return (
    <section className="section section-hairline contact" id="contato"><div className="wrap contact-inner">
      <div><h2 className="section-title">{d.h2}</h2><p className="section-sub">{d.p}</p><div className="contact-actions">
        <a className="btn btn-primary" href={LINKS.linkedin} target="_blank" rel="noreferrer">{d.lk}</a><a className="text-link" href={LINKS.whatsapp} target="_blank" rel="noreferrer">{d.wa}</a><a className="text-link" href={LINKS.github} target="_blank" rel="noreferrer">{d.gh}</a>
      </div></div>
      <div className="contact-person"><Image src="/images/diego.png" alt="Diego Arruda" width={160} height={200} sizes="160px" /><p>Diego Arruda<span>{d.lines.find(line => line.ic === 'pin')?.v}</span></p></div>
    </div></section>
  );
}
