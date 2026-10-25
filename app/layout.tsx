import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const fontVars = `${inter.variable} ${spaceGrotesk.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL('https://www.drasdiego.com.br'),
  title: 'Diego Arruda | Engenharia de Software',
  description:
    'Desenvolvimento de software com visão de operação. Conheça a trajetória, os projetos e a formação de Diego Arruda em Engenharia de Software, dados e IA aplicada.',
  keywords: ['Diego Arruda', 'Dados', 'Data Science', 'Inteligência Artificial', 'Analytics', 'Engenharia de Software', 'Power BI', 'SQL', 'Python'],
  authors: [{ name: 'Diego Arruda', url: 'https://www.linkedin.com/in/drasdiego/' }],
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: 'https://www.drasdiego.com.br' },
  openGraph: {
    title: 'Diego Arruda | Engenharia de Software',
    description: 'Desenvolvimento de software com visão de operação. Projetos, experiência, dados e IA aplicada.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.drasdiego.com.br',
    siteName: 'Diego Arruda',
  },
  twitter: { card: 'summary_large_image', title: 'Diego Arruda | Engenharia de Software' },
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
