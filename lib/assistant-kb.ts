import type { Lang } from '@/types';
import { fillCareerTime } from './career-time';
import { educationList } from './education';

/* ============================================================
   ASSISTANT KNOWLEDGE BASE
   Keyword-matched canned answers about Diego's career. Runs fully
   client-side (no API key). To wire a real LLM, replace
   `answer()` with a fetch to your /api route, the UI stays the same.
   ============================================================ */

export interface KBEntry { k: string[]; a: string }

const KB: Record<Lang, KBEntry[]> = {
  pt: [
    { k: ["station"], a: "Na RD Station, Diego foi Analista de Suporte Financeiro de fevereiro a dezembro de 2024 ({rd}). Analisou dados financeiros e operacionais, padrões, inconsistências e recorrências; desenvolveu e acompanhou dashboards e indicadores. Participou de squads com finanças, operações e tecnologia para melhorar fluxos e rastreabilidade." },
    { k: ["isaac"], a: "No isaac, Diego foi Analista de Operações em contrato temporário de julho de 2023 a fevereiro de 2024 ({isaac}). Coletou e organizou dados, produziu relatórios e acompanhou SLAs e KPIs. Identificou gargalos e recorrências e deu suporte analítico às rotinas financeiras e operacionais." },
    { k: ['onde', 'trabalha', 'atual', 'nubank', 'hoje'], a: "Atualmente o Diego é Analista de Ouvidoria (Ombudsman Analyst) no Nubank, desde dezembro de 2024 ({nubank}, contando o mês de início). Acompanha manifestações públicas e canais regulatórios, investiga causas raiz com outras áreas e produz análises e relatórios com indicadores e feedbacks de clientes. O foco é resolução, rastreabilidade, conformidade e melhoria de processos." },
    { k: ['experiencia com dados', 'dados', 'data', 'analytics', 'sql', 'postgresql', 'analise'], a: "A experiência com dados inclui SQL, Excel e Google Sheets na MadeiraMadeira, com dashboards e acompanhamento de backlog, SLA, FCR, resolutividade e TMA. Na RD Station, desenvolveu e acompanhou dashboards e indicadores financeiros e operacionais; no isaac, consolidou dados, relatórios, SLAs e KPIs. Python, PostgreSQL, Power BI, Metabase e Looker também fazem parte de sua formação e ferramentas de estudo, sem atribuir seu uso a todos esses cargos." },
    { k: ['que dia', 'dia e hoje', 'dia de hoje', 'data de hoje', 'data atual', 'qual a data'], a: "Hoje é {hoje}. Posso falar sobre a trajetória, a experiência, as tecnologias e os projetos do Diego." },
    { k: ['ia', 'inteligencia', 'artificial', 'gemini', 'machine', 'llm', 'bot'], a: 'Em IA, o Diego trabalha com IA generativa e construiu o assistente de IA deste site, um app em Next.js com a API do Claude. É, inclusive, o que está respondendo você agora. O foco dele é IA aplicada a problemas reais de negócio e automação.' },
    { k: ['tecnologia', 'stack', 'ferramenta', 'linguagem', 'domina', 'skill', 'habilidade'], a: "Stack principal: Next.js, React, TypeScript e integração à API do Claude no assistente deste site. Na experiência operacional, SQL, Excel e Google Sheets estão ligados à MadeiraMadeira. Python, PostgreSQL, Power BI, Metabase e Looker integram sua formação e repertório técnico; isso não implica domínio avançado ou uso em todos os cargos. As plataformas operacionais incluem Salesforce, Zendesk e Five9." },
    { k: ['projeto', 'portfolio', 'construiu', 'projetos'], a: "O assistente de IA deste site é um projeto pessoal de Engenharia de Software com IA, construído com Next.js e a API do Claude. O currículo também registra a interface pessoal Suporte Interativo CSS, em HTML e CSS. Dashboards e relatórios fazem parte da experiência profissional, sem demonstrações públicas ou resultados quantitativos confirmados nesta base." },
    { k: ['experiencia', 'carreira', 'trajetoria', 'anos', 'tempo'], a: 'São mais de 18 anos de carreira, começando aos 16, passando por saúde, logística, marketplace, SaaS e fintech. A trajetória passou de operações e qualidade para liderança e análise de dados. Hoje, seu foco de desenvolvimento é Engenharia de Software, com dados e IA como capacidades complementares.' },
    { k: ['formacao', 'faculdade', 'estudo', 'curso', 'mba', 'engenharia', 'academico'], a: `Formação: ${educationList('pt')}. A data de início da graduação em Engenharia de Software não está informada. Também possui formações complementares em dados e tecnologia.` },
    { k: ['certificac', 'certificado', 'scrum'], a: 'Certificações: Ouvidoria pela ABBC (2025/2029) e Scrum Foundation (SFPC) pela CertiProf (2024/2027), além de Liderança Lean pela Fundação Bradesco.' },
    { k: ['lideranca', 'gestao', 'equipe', 'time', 'madeiramadeira', 'madeira', 'iguanafix'], a: "O Diego liderou equipe remota como Supervisor de Operações na MadeiraMadeira, de junho de 2020 a outubro de 2022 ({mm}). Acompanhou performance, feedbacks, monitorias de qualidade e PDIs, além de dashboards e indicadores como backlog, SLA, FCR, resolutividade e TMA. Participou de Madeira Decora e Iguanafix, apoiando melhorias nos fluxos operacionais." },
    { k: ['contato', 'falar', 'linkedin', 'github', 'whatsapp', 'contratar'], a: 'Para falar com o Diego:\n- LinkedIn: linkedin.com/in/drasdiego\n- WhatsApp: (47) 99171-0813\n- GitHub: @drasdiego\n\nO foco dele é Engenharia de Software, com dados e IA aplicada.' },
    { k: ['procura', 'procurando', 'buscando', 'disponi', 'aberto', 'vaga na', 'vaga de', 'vagas abertas', 'desempregado', 'recolocacao', 'oportunidade de emprego', 'oportunidades de emprego', 'oportunidade profissional', 'insatisfeito', 'mudar de emprego', 'trocar de emprego', 'em busca', 'proposta', 'propostas', 'novas posicoes', 'novo emprego'], a: 'Esse tipo de conversa é melhor direto com o Diego, pelos contatos publicados:\n- LinkedIn: linkedin.com/in/drasdiego\n- WhatsApp: (47) 99171-0813\n- GitHub: @drasdiego\n\nSe quiser, posso falar da trajetória, da formação, das tecnologias ou dos projetos dele.' },
    { k: ['parceria', 'parcerias', 'freela', 'freelance'], a: 'Para tratar de parcerias, o melhor caminho é falar direto com o Diego pelos contatos publicados:\n- LinkedIn: linkedin.com/in/drasdiego\n- WhatsApp: (47) 99171-0813\n- GitHub: @drasdiego\n\nSe quiser, posso falar da trajetória, da formação, das tecnologias ou dos projetos dele.' },
    { k: ['bom dia', 'boa tarde', 'boa noite', 'ola', 'oi'], a: 'Olá! Posso falar sobre a trajetória, a experiência, as tecnologias e os projetos do Diego. O que você quer saber?' },
  ],
  en: [
    { k: ["station"], a: "At RD Station, Diego was a Financial Support Analyst from February to December 2024 ({rd}). He analyzed financial and operational data, patterns, inconsistencies and recurring issues, and developed and tracked dashboards and metrics. He worked with finance, operations and technology squads to improve workflows and traceability." },
    { k: ["isaac"], a: "At isaac, Diego was a temporary Operations Analyst from July 2023 to February 2024 ({isaac}). He collected and organized data, produced reports and tracked SLAs and KPIs. He identified bottlenecks and recurring issues and provided analytical support for financial and operational routines." },
    { k: ['where', 'work', 'current', 'nubank', 'today'], a: "Diego is currently an Ombudsman Analyst at Nubank, since December 2024 ({nubank}, counting the start month). He handles complaints on public platforms and regulatory channels, investigates root causes with other teams, and produces analyses and reports using metrics and customer feedback. His work focuses on resolution, traceability, compliance and process improvement." },
    { k: ['what day', 'what date', 'today s date', 'date today', 'current date', 'the date'], a: "Today is {hoje}. I can talk about Diego's career, experience, technologies and projects." },
    { k: ['data experience', 'data', 'analytics', 'sql', 'postgresql', 'analysis'], a: "Diego's data experience includes SQL, Excel and Google Sheets at MadeiraMadeira, with dashboards and monitoring of backlog, SLA, FCR, resolution rates and AHT. At RD Station, he developed and tracked financial and operational dashboards and metrics; at isaac, he consolidated data, reports, SLAs and KPIs. Python, PostgreSQL, Power BI, Metabase and Looker are also part of his studies and technical toolkit, without implying their use in every role." },
    { k: ['ai', 'artificial', 'intelligence', 'gemini', 'machine', 'llm', 'bot'], a: "In AI, Diego works with generative AI and built the AI assistant on this site, a Next.js app using the Claude API, which is actually what's answering you now. His focus is AI applied to real business problems and automation." },
    { k: ['tech', 'stack', 'tool', 'language', 'skill'], a: "Core stack: Next.js, React, TypeScript and Claude API integration in the assistant on this site. SQL, Excel and Google Sheets are specifically associated with his operational experience at MadeiraMadeira. Python, PostgreSQL, Power BI, Metabase and Looker are part of his studies and technical toolkit, without implying advanced proficiency or use in every role. Operational platforms include Salesforce, Zendesk and Five9." },
    { k: ['project', 'portfolio', 'built'], a: "The AI assistant on this site is a personal software engineering project using AI, built with Next.js and the Claude API. His CV also lists Interactive CSS Support, a personal HTML and CSS interface. Dashboards and reports belong to his professional experience; this knowledge base does not include public demos or verified quantitative results for them." },
    { k: ['experience', 'career', 'journey', 'years'], a: '18+ years of career, starting at 16, across healthcare, logistics, marketplace, SaaS and fintech. His path moved from operations and quality into leadership and data analysis. His current development focus is software engineering, supported by data and AI.' },
    { k: ['education', 'college', 'study', 'course', 'mba', 'engineering', 'academic'], a: `Education: ${educationList('en')}. The start date of his Software Engineering degree is not specified. He also has complementary courses in data and technology.` },
    { k: ['certification', 'certificate', 'scrum', 'credential'], a: 'Certifications: Ombudsman by ABBC (2025/2029) and Scrum Foundation (SFPC) by CertiProf (2024/2027), plus Lean Leadership by Fundação Bradesco.' },
    { k: ['leadership', 'manage', 'team', 'madeiramadeira', 'madeira', 'iguanafix'], a: "Diego led a remote team as an Operations Supervisor at MadeiraMadeira, from June 2020 to October 2022 ({mm}). His responsibilities included performance monitoring, feedback, quality reviews and individual development plans, as well as dashboards and metrics such as backlog, SLA, FCR, resolution rates and AHT. He contributed to Madeira Decora and Iguanafix, supporting operational workflow improvements." },
    { k: ['contact', 'reach', 'linkedin', 'github', 'whatsapp', 'hire'], a: 'To talk with Diego:\n- LinkedIn: linkedin.com/in/drasdiego\n- WhatsApp: +55 47 99171-0813\n- GitHub: @drasdiego\n\nHis focus is software engineering, with data and applied AI.' },
    { k: ['looking', 'seeking', 'availab', 'open to', 'job hunting', 'unemployed', 'job opening', 'job openings', 'open position', 'job opportunit', 'career opportunit', 'unhappy', 'change jobs', 'offer', 'offers', 'on the market', 'new role'], a: "That kind of conversation is best had directly with Diego, through his published contacts:\n- LinkedIn: linkedin.com/in/drasdiego\n- WhatsApp: +55 47 99171-0813\n- GitHub: @drasdiego\n\nIf you like, I can talk about his career, education, technologies or projects." },
    { k: ['partnership', 'partnerships', 'freelance', 'freelancing'], a: "To discuss partnerships, the best way is to talk with Diego directly through his published contacts:\n- LinkedIn: linkedin.com/in/drasdiego\n- WhatsApp: +55 47 99171-0813\n- GitHub: @drasdiego\n\nIf you like, I can talk about his career, education, technologies or projects." },
    { k: ['good morning', 'good afternoon', 'good evening', 'hello', 'hi', 'hey'], a: "Hi! I can talk about Diego's career, experience, technologies and projects. What would you like to know?" },
  ],
};

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function tokens(text: string): string[] {
  return normalize(text).match(/[a-z0-9]+/g) ?? [];
}

function keywordScore(words: string[], keyword: string): number {
  const parts = tokens(keyword);
  if (parts.length === 0 || parts.length > words.length) return 0;
  for (let i = 0; i + parts.length <= words.length; i++) {
    const hit = parts.every((part, j) => (part.length <= 3 ? words[i + j] === part : words[i + j].startsWith(part)));
    if (hit) return parts.join('').length;
  }
  return 0;
}

export function localMatch(q: string, lang: Lang, now: Date = new Date()): string | null {
  const words = tokens(q);
  const kb = KB[lang] || KB.pt;
  let best: KBEntry | null = null;
  let bestScore = 0;
  for (const entry of kb) {
    let score = 0;
    for (const kw of entry.k) score += keywordScore(words, kw);
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return best && bestScore > 0 ? fillCareerTime(best.a, now, lang) : null;
}

export function fallbackAnswer(lang: Lang): string {
  return lang === 'en'
    ? "I'm focused on Diego's professional journey, try asking about his data experience, current role, technologies, projects or education. For anything else, reach him on LinkedIn: /in/drasdiego."
    : 'Fui feito para falar sobre a trajetória profissional do Diego, pergunte sobre experiência com dados, cargo atual, tecnologias, projetos ou formação. Para outros assuntos, fale com ele no LinkedIn: /in/drasdiego.';
}

export function answer(q: string, lang: Lang, now: Date = new Date()): string {
  return localMatch(q, lang, now) ?? fallbackAnswer(lang);
}

const INTERRUPTED_NOTES = [
  '\n\n(A resposta foi interrompida. Pergunte de novo para receber o restante.)',
  '\n\n(The answer was interrupted. Ask again to get the rest.)',
];

export function interruptedNote(lang: Lang): string {
  return lang === 'en' ? INTERRUPTED_NOTES[1] : INTERRUPTED_NOTES[0];
}

export function stripInterruptedNote(text: string): string {
  for (const note of INTERRUPTED_NOTES) {
    if (text.endsWith(note)) return text.slice(0, -note.length);
  }
  return text;
}

export const MAX_QUESTION_CHARS = 800;
export const MAX_HISTORY_ITEM_CHARS = 1500;

export interface ChatTurn {
  role: 'user' | 'bot';
  text: string;
}

/** Streamed hybrid answer: asks the /api/chat route (local KB + Claude) and
    reports the text as it arrives via `onToken`. Sends recent history so the
    assistant understands follow-up questions. Falls back to the local answer
    if the network fails. Resolves with the complete text. */
export async function streamAssistant(
  question: string,
  lang: Lang,
  history: ChatTurn[],
  onToken: (soFar: string) => void,
  signal?: AbortSignal,
  onMode?: (mode: string | null) => void,
): Promise<string> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  else signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(abort, 30_000);
  let full = '';
  const finish = (): string => {
    const text = full.trim();
    if (text) return text;
    if (!signal?.aborted) onMode?.('fallback');
    return answer(question, lang);
  };
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, lang, history }),
      signal: controller.signal,
    });
    if (!res.ok || !res.body) {
      onMode?.('fallback');
      return answer(question, lang);
    }
    onMode?.(res.headers.get('X-Assistant-Mode'));

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      full += decoder.decode(value, { stream: true });
      onToken(full);
    }
    full += decoder.decode();
    return finish();
  } catch {
    return finish();
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
