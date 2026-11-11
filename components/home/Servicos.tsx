import Link from 'next/link';
import type { Lang } from '@/types';
import { contactPath, projetosPath } from '@/lib/site-nav';

type Area = 'software' | 'dados' | 'automacao';

interface Oferta {
  area: Area;
  title: string;
  desc: string;
  example: string;
  href: string | null;
}

function servicosUI(lang: Lang) {
  const projetos = projetosPath(lang);
  if (lang === 'en') {
    return {
      title: 'What I build',
      sub: 'Three kinds of projects, each with real work you can open and check.',
      exampleLabel: 'Example:',
      offers: [
        { area: 'software', title: 'Websites and pages', desc: 'Fast, accessible sites that are easy to maintain, with an English version when you need one.', example: 'this website, built with Next.js, in two languages and with an assistant', href: null },
        { area: 'dados', title: 'Data dashboards', desc: 'Data from spreadsheets or public sources organized into a dashboard that answers the questions that matter.', example: 'Fora do Digital, a dashboard on internet access in Brazil', href: `${projetos}/fora-do-digital` },
        { area: 'automacao', title: 'Automations and AI', desc: 'Repetitive routines turned into automations, and assistants that answer based on your own information.', example: 'the career assistant on this website', href: `${projetos}/assistente-de-carreira` },
      ] as Oferta[],
      ai: 'I use AI to speed up development. I review and test every delivery myself before it reaches you.',
      cta: 'Have a project in mind?',
      contact: contactPath(lang),
    };
  }
  return {
    title: 'O que construo',
    sub: 'Três tipos de projeto, cada um com um trabalho real que você pode abrir e conferir.',
    exampleLabel: 'Exemplo:',
    offers: [
      { area: 'software', title: 'Sites e páginas', desc: 'Sites rápidos, acessíveis e fáceis de manter, com versão em inglês quando precisar.', example: 'este site, feito em Next.js, em dois idiomas e com assistente', href: null },
      { area: 'dados', title: 'Painéis de dados', desc: 'Dados de planilhas ou de fontes públicas organizados num painel que responde às perguntas que importam.', example: 'Fora do Digital, painel sobre acesso à internet no Brasil', href: `${projetos}/fora-do-digital` },
      { area: 'automacao', title: 'Automações e IA', desc: 'Rotinas repetitivas que viram automação e assistentes que respondem com base nas suas informações.', example: 'o assistente de carreira deste site', href: `${projetos}/assistente-de-carreira` },
    ] as Oferta[],
    ai: 'Uso IA para acelerar o desenvolvimento. Cada entrega é revisada e testada por mim antes de chegar a você.',
    cta: 'Tem um projeto em mente?',
    contact: contactPath(lang),
  };
}

export function Servicos({ lang }: { lang: Lang }) {
  const ui = servicosUI(lang);
  return (
    <section className="section servicos" id="servicos" aria-labelledby="servicos-titulo">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="servicos-titulo">{ui.title}</h2>
          <p className="section-sub">{ui.sub}</p>
        </div>
        <ul className="servicos-lista" role="list">
          {ui.offers.map((o) => (
            <li className="servico" data-area={o.area} key={o.title}>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <p className="servico-exemplo">
                {ui.exampleLabel}{' '}
                {o.href ? <Link className="inline-link" href={o.href}>{o.example}</Link> : o.example}
              </p>
            </li>
          ))}
        </ul>
        <div className="servicos-rodape">
          <p className="servicos-ia">{ui.ai}</p>
          <Link className="btn btn-primary" href={ui.contact}>{ui.cta}</Link>
        </div>
      </div>
    </section>
  );
}
