import type { Lang } from '@/types';
import { contactPath, projetosPath } from './site-nav';

export type ServicoArea = 'software' | 'dados' | 'automacao';

export interface Oferta {
  area: ServicoArea;
  title: string;
  desc: string;
  example: string;
  href: string | null;
}

export interface ServicosUI {
  title: string;
  sub: string;
  exampleLabel: string;
  offers: Oferta[];
  ai: string;
  cta: string;
  contact: string;
}

export function servicosUI(lang: Lang): ServicosUI {
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
      ],
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
    ],
    ai: 'Uso IA para acelerar o desenvolvimento. Cada entrega é revisada e testada por mim antes de chegar a você.',
    cta: 'Tem um projeto em mente?',
    contact: contactPath(lang),
  };
}
