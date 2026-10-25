import type { Lang } from '@/types';
import { SEO } from '@/lib/seo';
import { fontVars } from '@/lib/fonts';

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={SEO[lang].htmlLang} data-theme="light" className={fontVars} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
