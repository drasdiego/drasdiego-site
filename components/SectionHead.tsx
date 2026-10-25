'use client';

import { Reveal } from './Reveal';

export function SectionHead({ title, sub }: { idx: string; eyebrow: string; title: string; sub: string }) {
  return (
    <Reveal className="section-head">
      <h2 className="section-title">{title}</h2>
      <p className="section-sub">{sub}</p>
    </Reveal>
  );
}
