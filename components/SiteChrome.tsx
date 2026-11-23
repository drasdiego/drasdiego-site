'use client';

import { useEffect } from 'react';
import type { Lang } from '@/types';
import { CONTENT } from '@/lib/content';
import { NAV_UI } from '@/lib/site-nav';
import type { BlogMenuData, GuideNoteData } from '@/lib/blog-menu';
import { useTweaks } from '@/hooks/useTweaks';
import { watchThemeColor } from '@/lib/theme';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { Assistant } from './Assistant';
import { AnchorRedirect } from './AnchorRedirect';

export function SiteChrome({
  lang,
  menu,
  blogNote,
  children,
}: {
  lang: Lang;
  menu: BlogMenuData;
  blogNote: GuideNoteData;
  children: React.ReactNode;
}) {
  const { tweaks, set, hydrated } = useTweaks();
  const t = CONTENT[lang];

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.dark ? 'dark' : 'light');
    return watchThemeColor(tweaks.dark);
  }, [hydrated, tweaks.dark]);

  return (
    <>
      <a className="skip-link" href="#conteudo">{NAV_UI[lang].skip}</a>
      <Nav t={t} lang={lang} dark={tweaks.dark} toggleTheme={() => set('dark', !tweaks.dark)} blogMenu={menu} />
      <main id="conteudo" tabIndex={-1}>{children}</main>
      <Footer lang={lang} blogNote={blogNote} />
      <Assistant t={t} lang={lang} />
      <AnchorRedirect lang={lang} />
    </>
  );
}
