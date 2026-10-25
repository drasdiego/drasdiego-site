import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const fontVars = `${inter.variable} ${spaceGrotesk.variable}`;

const SITE_TITLE = 'Diego Arruda | Engenharia de Software, Dados e IA';
const SITE_DESCRIPTION =
  'Desenvolvimento de software com visão de operação. Trajetória, projetos e formação de Diego Arruda em engenharia de software, dados e IA aplicada.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.drasdiego.com.br'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ['Diego Arruda', 'Dados', 'Data Science', 'Inteligência Artificial', 'Analytics', 'Engenharia de Software', 'Power BI', 'SQL', 'Python'],
  authors: [{ name: 'Diego Arruda', url: 'https://www.linkedin.com/in/drasdiego/' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: { canonical: 'https://www.drasdiego.com.br' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.drasdiego.com.br',
    siteName: 'Diego Arruda',
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: '#f7f8fa',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const languageScript = `
(function(){
  try {
    var root = document.documentElement;
    var lang = localStorage.getItem('diego_lang');
    if (lang === 'en') root.lang = 'en';
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light" className={fontVars} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: languageScript }} />
        {children}
      </body>
    </html>
  );
}
