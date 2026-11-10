import Link from 'next/link';
import './globals.css';
import { fontVars } from '@/lib/fonts';
import { themeScript } from '@/components/RootShell';

export const metadata = { title: '404 | Diego Arruda' };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" data-theme="light" suppressHydrationWarning className={fontVars}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <main className="wrap" style={{ paddingBlock: 96 }}>
          <h1>Página não encontrada</h1>
          <p><Link className="inline-link nf-link" href="/">Voltar ao início</Link></p>
          <div lang="en" style={{ marginTop: 32 }}>
            <h2>Page not found</h2>
            <p><Link className="inline-link nf-link" href="/en">Back to home</Link></p>
          </div>
        </main>
      </body>
    </html>
  );
}
