'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/types';
import { CONTENT } from '@/lib/content';
import { PRESENTATION } from '@/lib/presentation';
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

const LANG_KEY = 'diego_lang';

export function Portfolio() {
  const { tweaks, set } = useTweaks();
  const [lang, setLang] = useState<Lang>('pt');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY) as Lang | null;
      if (stored === 'pt' || stored === 'en') setLang(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
    root.setAttribute('data-density', tweaks.density);
  }, [tweaks.dark, tweaks.density]);

  const t = CONTENT[lang];
  const d = PRESENTATION[lang];

  const sections = [
    { id: 'projetos', label: lang === 'en' ? 'Project' : 'Projeto' },
    { id: 'experiencia', label: t.nav.exp },
    { id: 'formacao', label: t.nav.cert },
    { id: 'contato', label: t.nav.contact },
  ];

  return (
    <>
      <a className="skip-link" href="#conteudo">{d.skip}</a>
      <Nav t={t} lang={lang} setLang={setLang} dark={tweaks.dark} toggleTheme={() => set('dark', !tweaks.dark)} sections={sections} />

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
        <Contato t={{ ...t, contact: { ...t.contact, h2: d.contactTitle, p: d.contactDescription } }} />
      </main>

      <Footer t={{ ...t, footer: { ...t.footer, rights: d.footer } }} />
      <Assistant t={t} lang={lang} />
    </>
  );
}
