import type { Lang } from '@/types';
import { SEO } from '@/lib/seo';
import { fontVars } from '@/lib/fonts';

const themeScript = `(function(){try{if(sessionStorage.getItem('diego_theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={SEO[lang].htmlLang} data-theme="light" className={fontVars} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
