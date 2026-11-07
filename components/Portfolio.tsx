'use client';

import { useEffect } from 'react';
import type { Lang } from '@/types';
import { CONTENT } from '@/lib/content';
import { PRESENTATION } from '@/lib/presentation';
import type { BlogMenuData } from '@/lib/blog-menu';
import { siteSections } from '@/lib/site-nav';
import { useTweaks } from '@/hooks/useTweaks';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { Trajetoria } from './Trajetoria';
import { Experiencia } from './Experiencia';
import { DataAI } from './DataAI';
import { Projetos } from './Projetos';
import { Tecnologias } from './Tecnologias';
import { Qualificacoes } from './Qualificacoes';
import { Contato } from './Contato';
import { Footer } from './Footer';
import { Assistant } from './Assistant';

export function Portfolio({ initialLang, blogMenu }: { initialLang: Lang; blogMenu: BlogMenuData }) {
  const { tweaks, set, hydrated } = useTweaks();
  const lang = initialLang;

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
    root.setAttribute('data-density', tweaks.density);
  }, [hydrated, tweaks.dark, tweaks.density]);

  const t = CONTENT[lang];
  const d = PRESENTATION[lang];

  const sections = siteSections(lang);

  return (
    <>
      <a className="skip-link" href="#conteudo">{d.skip}</a>
      <Nav t={t} lang={lang} dark={tweaks.dark} toggleTheme={() => set('dark', !tweaks.dark)} sections={sections} blogMenu={blogMenu} />

      <main id="conteudo">
        <Hero lang={lang} />
        <Projetos lang={lang} />
        <Experiencia t={{ ...t, exp: { ...t.exp, title: d.experienceTitle, sub: d.experienceSub } }} />
        <div className="wrap">
          <details className="background-details">
            <summary>{d.moreBackground}<span aria-hidden="true">+</span></summary>
            <Trajetoria t={t} />
            <DataAI t={t} />
            <Tecnologias t={t} />
          </details>
        </div>
        <Qualificacoes t={{ ...t, quals: { ...t.quals, title: d.educationTitle, sub: d.educationSub } }} />
        <Contato lang={lang} t={{ ...t, contact: { ...t.contact, h2: d.contactTitle, p: d.contactDescription } }} />
      </main>

      <Footer t={{ ...t, footer: { ...t.footer, rights: d.footer } }} />
      <Assistant t={t} lang={lang} />
    </>
  );
}
