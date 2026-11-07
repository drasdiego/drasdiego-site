import type { Lang } from '@/types';
import { BLOG_HANDLE, BLOG_UI, buildBlogMenu } from '@/lib/blog';
import { SiteChrome } from './SiteChrome';

export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <SiteChrome lang={lang} menu={buildBlogMenu(lang)} blogNote={{ note: BLOG_UI[lang].footer, handle: BLOG_HANDLE }}>
      {children}
    </SiteChrome>
  );
}
