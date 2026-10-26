import Link from 'next/link';
import './globals.css';
import { fontVars } from '@/lib/fonts';

export const metadata = { title: '404 | Diego Arruda' };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" data-theme="light" className={fontVars}>
      <body>
        <main className="wrap" style={{ padding: '96px 0' }}>
          <h1>Página não encontrada</h1>
          <p><Link href="/">Voltar ao início</Link></p>
          <div lang="en" style={{ marginTop: 32 }}>
            <h2>Page not found</h2>
            <p><Link href="/en">Back to home</Link></p>
          </div>
        </main>
      </body>
    </html>
  );
}
