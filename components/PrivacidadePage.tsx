import Link from 'next/link';
import type { Lang } from '@/types';
import '../app/paginas.css';
import '../app/blog.css';
import '../app/espaco.css';
import { contactPath } from '@/lib/site-nav';
import { LINKS } from '@/lib/icons';

type Part = string | { link: 'contato' | 'linkedin'; text: string };

interface PrivacySection {
  id: string;
  title: string;
  paragraphs?: Part[][];
  items?: Part[][];
}

export const PRIVACIDADE_UI = {
  pt: {
    title: 'Aviso de privacidade',
    description: 'Como o site de Diego Arruda trata os dados do formulário de contato e do assistente, e o que fica guardado no seu navegador.',
    lead: 'Este aviso explica, de forma direta, quais dados este site recebe, para que servem e por quanto tempo ficam guardados.',
    updated: 'Atualizado em 11 de novembro de 2026',
    signature: 'Diego Arruda',
    newTab: 'abre em nova aba',
  },
  en: {
    title: 'Privacy notice',
    description: 'How Diego Arruda’s website handles data from the contact form and the assistant, and what is stored in your browser.',
    lead: 'This notice explains, in plain terms, which data this website receives, what it is used for and how long it is kept.',
    updated: 'Last updated November 11, 2026',
    signature: 'Diego Arruda',
    newTab: 'opens in a new tab',
  },
} as const;

const SECTIONS: Record<Lang, PrivacySection[]> = {
  pt: [
    {
      id: 'responsavel',
      title: 'Quem é o responsável',
      paragraphs: [
        ['O responsável pelos dados tratados neste site é Diego Arruda, pessoa física.'],
        ['Para qualquer pedido sobre seus dados, use o ', { link: 'contato', text: 'formulário de contato' }, ' ou fale pelo ', { link: 'linkedin', text: 'LinkedIn' }, '.'],
      ],
    },
    {
      id: 'formulario',
      title: 'Formulário de contato',
      items: [
        ['Dados: nome, e-mail, assunto escolhido e mensagem. O site registra também o idioma da página e a data e hora do envio.'],
        ['Finalidade: responder ao seu contato.'],
        ['Base legal: atender a um pedido seu, como titular dos dados (art. 7º, V, da LGPD).'],
        ['Onde ficam: em uma planilha privada na conta Google de Diego. Cada envio gera um aviso por e-mail para ele.'],
        ['Quem processa: a Vercel hospeda o site e o Google guarda a planilha. Esses serviços podem tratar dados fora do Brasil.'],
        ['Prazo: até 12 meses. Depois disso, os dados são apagados automaticamente da planilha, e os avisos por e-mail vão para a lixeira.'],
        ['Esses dados não são usados para outra finalidade nem compartilhados com terceiros para marketing.'],
        ['Para limitar abusos, o servidor conta por pouco tempo, só na memória, quantos envios cada endereço IP fez. Essa contagem não é gravada.'],
      ],
    },
    {
      id: 'assistente',
      title: 'Assistente de IA',
      items: [
        ['O texto que você digita no assistente, junto com as últimas mensagens da mesma conversa, vai para o servidor do site e, de lá, para a API da Anthropic, que gera a resposta.'],
        ['Quando a integração com a IA está indisponível, a resposta vem de uma base local, sem envio à Anthropic.'],
        ['O site não guarda as conversas. Elas ficam só na página aberta e somem quando você fecha ou recarrega a página. Os registros técnicos do servidor anotam apenas códigos de erro, sem o conteúdo das mensagens.'],
        ['Se você usar o microfone, quem transforma a fala em texto é o próprio navegador. Em alguns navegadores, o áudio é processado por um serviço do fabricante. O site recebe só o texto.'],
        ['Não digite dados pessoais no assistente.'],
      ],
    },
    {
      id: 'navegador',
      title: 'Armazenamento no navegador e medições',
      items: [
        ['O site conta visitas com o Vercel Web Analytics, de forma anônima e agregada, sem cookies de terceiros. A medição registra a página visitada, a página de origem, parâmetros de campanha do endereço (como utm_source), país e cidade aproximados, sistema, navegador e tipo de aparelho. Ela não liga a visita a você nem ao seu endereço IP: o visitante é contado por um código gerado a partir da requisição, descartado depois de 24 horas.'],
        ['O site não usa publicidade nem outras ferramentas de medição ou rastreamento.'],
        ['Se você trocar o tema, essa escolha fica no armazenamento da sessão do navegador (sessionStorage) e é apagada quando você fecha a aba.'],
        ['Na página Sobre, a lista de cursos vem de uma planilha pública no Google Sheets. Algumas páginas de projeto mostram um painel publicado no GitHub Pages. Ao carregar esses conteúdos, seu navegador se conecta ao Google ou ao GitHub, que recebem dados técnicos comuns, como o endereço IP.'],
        ['A Vercel, que hospeda o site, pode registrar dados técnicos de acesso, como endereço IP e navegador, para operar e proteger o serviço.'],
      ],
    },
    {
      id: 'direitos',
      title: 'Seus direitos (LGPD)',
      paragraphs: [
        ['Você pode pedir a confirmação de que seus dados são tratados, o acesso a eles, a correção e a exclusão.'],
        ['Para fazer um pedido, use o ', { link: 'contato', text: 'formulário de contato' }, ' ou fale pelo ', { link: 'linkedin', text: 'LinkedIn' }, '. Informe o e-mail usado no contato para que seus dados sejam encontrados.'],
        ['Se precisar, você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).'],
      ],
    },
  ],
  en: [
    {
      id: 'responsavel',
      title: 'Who is responsible',
      paragraphs: [
        ['The person responsible for the data handled on this website is Diego Arruda, as an individual.'],
        ['For any request about your data, use the ', { link: 'contato', text: 'contact form' }, ' or reach out on ', { link: 'linkedin', text: 'LinkedIn' }, '.'],
      ],
    },
    {
      id: 'formulario',
      title: 'Contact form',
      items: [
        ['Data: name, email, chosen subject and message. The website also records the page language and the date and time of the submission.'],
        ['Purpose: replying to your message.'],
        ['Legal basis: fulfilling a request made by you, as the data subject (art. 7, V, of the LGPD, the Brazilian data protection law).'],
        ['Where it is stored: in a private spreadsheet in Diego’s Google account. Each message also sends him an email alert.'],
        ['Who processes it: Vercel hosts the website and Google stores the spreadsheet. These services may process data outside Brazil.'],
        ['Retention: up to 12 months. After that, the data is deleted automatically from the spreadsheet, and the email alerts are moved to the trash.'],
        ['This data is not used for any other purpose and is not shared with third parties for marketing.'],
        ['To limit abuse, the server briefly counts, in memory only, how many messages each IP address has sent. This count is not saved.'],
      ],
    },
    {
      id: 'assistente',
      title: 'AI assistant',
      items: [
        ['What you type in the assistant, together with the latest messages of the same conversation, goes to the website server and, from there, to the Anthropic API, which writes the answer.'],
        ['When the AI integration is unavailable, the answer comes from a local knowledge base, without sending anything to Anthropic.'],
        ['The website does not store conversations. They exist only in the open page and disappear when you close or reload it. The server’s technical logs record only error codes, never the content of the messages.'],
        ['If you use the microphone, your own browser turns speech into text. In some browsers, the audio is processed by a service from the browser maker. The website receives only the text.'],
        ['Please do not type personal data in the assistant.'],
      ],
    },
    {
      id: 'navegador',
      title: 'Browser storage and analytics',
      items: [
        ['The website counts visits with Vercel Web Analytics, anonymously and in aggregate, without third-party cookies. It records the page visited, the referring page, campaign parameters in the address (such as utm_source), approximate country and city, operating system, browser and device type. It does not tie the visit to you or to your IP address: the visitor is counted by a code generated from the request, discarded after 24 hours.'],
        ['The website does not use advertising or any other measurement or tracking tools.'],
        ['If you switch the theme, that choice is kept in the browser’s session storage (sessionStorage) and is deleted when you close the tab.'],
        ['On the About page, the list of courses comes from a public Google Sheets spreadsheet. Some project pages show a panel published on GitHub Pages. To load this content, your browser connects to Google or GitHub, which receive common technical data such as your IP address.'],
        ['Vercel, which hosts the website, may record technical access data, such as IP address and browser, to run and protect the service.'],
      ],
    },
    {
      id: 'direitos',
      title: 'Your rights (LGPD)',
      paragraphs: [
        ['You can ask for confirmation that your data is processed, access to it, correction and deletion.'],
        ['To make a request, use the ', { link: 'contato', text: 'contact form' }, ' or reach out on ', { link: 'linkedin', text: 'LinkedIn' }, '. Include the email you used so your data can be found.'],
        ['If needed, you can also contact the Brazilian Data Protection Authority (ANPD).'],
      ],
    },
  ],
};

function Parts({ lang, parts }: { lang: Lang; parts: Part[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === 'string') return <span key={i}>{part}</span>;
        if (part.link === 'contato') return <Link key={i} className="inline-link" href={contactPath(lang)}>{part.text}</Link>;
        return (
          <a key={i} className="inline-link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${part.text} (${PRIVACIDADE_UI[lang].newTab})`}>
            {part.text}
          </a>
        );
      })}
    </>
  );
}

export function PrivacidadePage({ lang }: { lang: Lang }) {
  const ui = PRIVACIDADE_UI[lang];
  return (
    <article className="wrap blog-page caso privacidade">
      <header className="blog-col">
        <h1 className="blog-title">{ui.title}</h1>
        <p className="blog-lead">{ui.lead}</p>
        <p className="privacidade-data">{ui.updated}</p>
      </header>
      <div className="caso-corpo">
        {SECTIONS[lang].map((section) => (
          <section key={section.id} className="caso-sec" id={section.id} aria-labelledby={`${section.id}-titulo`}>
            <h2 id={`${section.id}-titulo`}>{section.title}</h2>
            {section.paragraphs?.map((parts, i) => <p key={i}><Parts lang={lang} parts={parts} /></p>)}
            {section.items ? (
              <ul className="caso-lista">
                {section.items.map((parts, i) => <li key={i}><Parts lang={lang} parts={parts} /></li>)}
              </ul>
            ) : null}
          </section>
        ))}
        <p className="privacidade-assinatura" translate="no">{ui.signature}</p>
      </div>
    </article>
  );
}
