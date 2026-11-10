import type { Lang } from '@/types';
import { Analytics } from '@vercel/analytics/next';
import { SEO } from '@/lib/seo';
import { fontVars } from '@/lib/fonts';
import { THEME_COLORS } from '@/lib/theme';

export const themeScript = `(function(){try{if(sessionStorage.getItem('diego_theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].setAttribute('content','${THEME_COLORS.dark}');}}}catch(e){}})();`;

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={SEO[lang].htmlLang} data-theme="light" className={fontVars} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
