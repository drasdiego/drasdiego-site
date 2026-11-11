import type { Lang } from '@/types';
import '../app/paginas.css';
import '../app/blog.css';
import '../app/espaco.css';
import { CONTENT } from '@/lib/content';
import { LINKS } from '@/lib/icons';
import { Icon } from './Icon';
import { ContatoForm } from './ContatoForm';

export const CONTATO_UI = {
  pt: {
    title: 'Tem um projeto em mente?',
    lead: 'Conte o contexto e eu retorno pelo e-mail que você informar. Se preferir, fale direto pelo LinkedIn ou pelo WhatsApp.',
    description: 'Tem um projeto em mente? Site, painel de dados, automação ou IA. Envie uma mensagem pelo formulário ou fale direto com Diego Arruda pelo LinkedIn, WhatsApp ou GitHub.',
    formTitle: 'Enviar mensagem',
    channelsTitle: 'Contato direto',
    newTab: 'abre em nova aba',
  },
  en: {
    title: 'Have a project in mind?',
    lead: 'Tell me the context and I will reply to the email you provide. If you prefer, reach out directly on LinkedIn or WhatsApp.',
    description: 'Have a project in mind? Website, data dashboard, automation or AI. Send a message through the form or reach Diego Arruda directly on LinkedIn, WhatsApp or GitHub.',
    formTitle: 'Send a message',
    channelsTitle: 'Direct contact',
    newTab: 'opens in a new tab',
  },
} as const;

export function ContatoPage({ lang }: { lang: Lang }) {
  const ui = CONTATO_UI[lang];
  const lines = CONTENT[lang].contact.lines;
  const channels = (['linkedin', 'whatsapp', 'github'] as const).map((ic) => {
    const line = lines.find((item) => item.ic === ic);
    return { ic, k: line?.k ?? ic, v: line?.v ?? '', href: LINKS[ic] };
  });
  return (
    <div className="wrap blog-page contato-page">
      <header className="blog-col">
        <h1 className="blog-title">{ui.title}</h1>
        <p className="blog-lead">{ui.lead}</p>
      </header>
      <div className="contato-layout">
        <section className="contato-form-card" aria-labelledby="contato-form-titulo">
          <h2 className="sr-only" id="contato-form-titulo">{ui.formTitle}</h2>
          <ContatoForm lang={lang} />
        </section>
        <section className="contato-canais" aria-labelledby="contato-canais-titulo">
          <h2 id="contato-canais-titulo">{ui.channelsTitle}</h2>
          <ul>
            {channels.map((line) => (
              <li key={line.k}>
                <a href={line.href} target="_blank" rel="noopener noreferrer" aria-label={`${line.k}, ${line.v} (${ui.newTab})`}>
                  <Icon name={line.ic} />
                  <span className="contato-canal-k">{line.k}</span>
                  <span className="contato-canal-v">{line.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
