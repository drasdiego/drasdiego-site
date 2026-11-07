import type { Lang } from '@/types';
import { LINKS } from './icons';
import { PRESENTATION } from './presentation';
import { SITE_URL, pagePathUrl } from './seo';

export interface ProjetoFact {
  label: string;
  value?: string;
  chips?: string[];
  href?: string;
}

export interface ProjetoItem {
  title: string;
  text: string;
}

export type ProjetoBlock =
  | { k: 'p'; v: string }
  | { k: 'steps'; items: ProjetoItem[] }
  | { k: 'decisions'; items: ProjetoItem[] };

export interface ProjetoSection {
  id: string;
  title: string;
  blocks: ProjetoBlock[];
}

export interface ProjetoQuestion {
  label: string;
  question: string;
}

export interface ProjetoTry {
  id: string;
  title: string;
  heading: string;
  intro: string;
  questions: ProjetoQuestion[];
  write: string;
  note: string;
}

export interface ProjetoText {
  title: string;
  short: string;
  lead: string;
  tags: string[];
  cta: string;
  status: string;
  facts: ProjetoFact[];
  sections: ProjetoSection[];
  tryIt?: ProjetoTry;
}

export interface Projeto {
  slug: string;
  pt: ProjetoText;
  en: ProjetoText;
}

const TECNOLOGIAS = ['Next.js', 'TypeScript', 'Claude API'];

const CASO_UI = {
  pt: {
    cta: 'Ver estudo de caso',
    status: 'No ar neste site',
    statusLabel: 'Status',
    problem: 'O problema',
    problemIntro: 'Quem visita um portfólio normalmente precisa procurar a informação sozinho.',
    problemGoal: 'A proposta é',
    how: 'Como funciona',
    steps: [
      { title: 'Pergunta', text: 'Você escreve a pergunta ou fala pelo microfone, conforme o suporte do navegador. A captura por voz ouve uma pergunta de cada vez.' },
      { title: 'Contexto', text: 'A pergunta segue com o histórico recente da conversa e com a base de conhecimento sobre minha trajetória.' },
      { title: 'Resposta', text: 'A resposta é gerada pela integração com a API do Claude e aparece na tela conforme chega.' },
      { title: 'Alternativa', text: 'Se o serviço de IA estiver indisponível, o assistente responde a partir da base local e avisa que a resposta veio dela.' },
    ],
    howClosing: 'O assistente funciona em português e inglês e acompanha o tema claro ou escuro do site.',
    decisions: 'Decisões do projeto',
    tryIt: 'Experimente',
  },
  en: {
    cta: 'Read the case study',
    status: 'Live on this site',
    statusLabel: 'Status',
    problem: 'The problem',
    problemIntro: 'Visitors to a portfolio usually have to look for the information on their own.',
    problemGoal: 'The goal is to',
    how: 'How it works',
    steps: [
      { title: 'Question', text: 'You type the question or speak into the microphone, depending on browser support. Voice capture listens for one question at a time.' },
      { title: 'Context', text: 'The question goes along with the recent conversation history and the knowledge base about my career.' },
      { title: 'Answer', text: 'The answer is generated through the Claude API integration and appears on screen as it arrives.' },
      { title: 'Fallback', text: 'If the AI service is unavailable, the assistant answers from the local knowledge base and says the answer came from it.' },
    ],
    howClosing: 'The assistant works in Portuguese and English and follows the site’s light or dark theme.',
    decisions: 'Project decisions',
    tryIt: 'Try it',
  },
} as const;

function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function assistenteDeCarreira(lang: Lang): ProjetoText {
  const d = PRESENTATION[lang];
  const u = CASO_UI[lang];
  return {
    title: d.projectName,
    short: d.projectDescription,
    lead: d.projectDescription,
    tags: [...TECNOLOGIAS],
    cta: u.cta,
    status: u.status,
    facts: [
      { label: d.application, value: d.applicationDescription },
      { label: d.technologies, chips: [...TECNOLOGIAS] },
      { label: d.code, value: d.codeLabel, href: LINKS.repo },
      { label: u.statusLabel, value: u.status },
    ],
    sections: [
      {
        id: 'problema',
        title: u.problem,
        blocks: [
          { k: 'p', v: u.problemIntro },
          { k: 'p', v: d.projectSub },
          { k: 'p', v: `${u.problemGoal} ${lowerFirst(d.applicationDescription)}` },
        ],
      },
      {
        id: 'como-funciona',
        title: u.how,
        blocks: [
          { k: 'steps', items: [...u.steps] },
          { k: 'p', v: u.howClosing },
        ],
      },
      {
        id: 'decisoes',
        title: u.decisions,
        blocks: [{ k: 'decisions', items: d.details.map((item) => ({ title: item.title, text: item.text })) }],
      },
    ],
    tryIt: {
      id: 'experimente',
      title: u.tryIt,
      heading: d.assistantTitle,
      intro: d.assistantIntro,
      questions: d.assistantQuestions.map((item) => ({ label: item.label, question: item.question })),
      write: d.writeQuestion,
      note: d.assistantNote,
    },
  };
}

export const PROJETOS: Projeto[] = [
  {
    slug: 'assistente-de-carreira',
    pt: assistenteDeCarreira('pt'),
    en: assistenteDeCarreira('en'),
  },
];

export const PROJETOS_INTRO: Record<Lang, string> = {
  pt: PRESENTATION.pt.projectSub,
  en: PRESENTATION.en.projectSub,
};

export function findProjeto(slug: string): Projeto | undefined {
  return PROJETOS.find((p) => p.slug === slug);
}

export function projetoStructuredData(lang: Lang, projeto: Projeto, rootName: string): string {
  const p = projeto[lang];
  const url = pagePathUrl(lang, `/projetos/${projeto.slug}`);
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${url}#projeto`,
        name: p.title,
        description: p.short,
        url,
        inLanguage: lang === 'en' ? 'en' : 'pt-BR',
        codeRepository: LINKS.repo,
        programmingLanguage: 'TypeScript',
        author: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: rootName, item: pagePathUrl(lang, '/projetos') },
          { '@type': 'ListItem', position: 2, name: p.title, item: url },
        ],
      },
    ],
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
