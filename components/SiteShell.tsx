import type { Lang } from '@/types';
import { BLOG_HANDLE, buildBlogMenu, guideNotes } from '@/lib/blog';
import { SiteChrome } from './SiteChrome';

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <SiteChrome lang={lang} menu={buildBlogMenu(lang)} blogNote={{ ...guideNotes(lang), handle: BLOG_HANDLE }}>
      {children}
    </SiteChrome>
  );
}
