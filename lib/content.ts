import type { Lang, AcademicItem, ContactLine, CategoryId } from '@/types';

export interface TechCat { key: string; name: string; desc: string; items: string[] }
export interface Milestone { yr: string; role: string; co: string; now: boolean }
export interface ExpRow { yr: string; role: string; co: string; desc: string }
export interface Capability { ic: string; h: string; p: string }

export interface SiteContent {
  nav: { traj: string; exp: string; data: string; proj: string; tech: string; cert: string; contact: string };
  cta: { talk: string; resume: string; linkedin: string; whatsapp: string; github: string };
  traj: {
    idx: string; eyebrow: string; title: string; sub: string;
    growthTitle: string; growthSpan: string; growthLegend: string[];
    milestones: Milestone[];
  };
  exp: { idx: string; eyebrow: string; title: string; sub: string; rows: ExpRow[] };
  data: { idx: string; eyebrow: string; title: string; sub: string; caps: Capability[] };
  tech: { idx: string; eyebrow: string; title: string; sub: string; cats: TechCat[]; allLabel: string; allDesc: string };
  quals: {
    idx: string; eyebrow: string; title: string; sub: string;
    acadTitle: string; academic: AcademicItem[];
    profTitle: string; profSub: string;
    totalLabel: string; catsLabel: string; searchPlaceholder: string; allLabel: string; clearLabel: string;
    expandAll: string; collapseAll: string; recentLabel: string; featuredLabel: string; featuredBadge: string;
    liveLabel: string; loadingLabel: string; fallbackLabel: string; emptyLabel: string;
    viewCert: string; metaLabels: { inst: string; date: string; cat: string };
    catNames: Record<CategoryId, string>;
  };
  contact: { idx: string; eyebrow: string; h2: string; p: string; lk: string; wa: string; gh: string; lines: ContactLine[] };
  footer: { tag: string; rights: string };
  asst: { title: string; sub: string; placeholder: string; greet: string; chips: string[] };
}

const techCatsPT: TechCat[] = [
  { key: 'work', name: 'Uso profissional', desc: 'Ferramentas do meu trabalho com dados e relatórios', items: ['SQL', 'Excel', 'Google Sheets'] },
  { key: 'ops', name: 'Plataformas e operação', desc: 'Plataformas de atendimento e operação', items: ['Salesforce', 'Zendesk', 'Five9', 'Google Workspace', 'Automação de Processos'] },
  { key: 'study', name: 'Estudo e ferramentas complementares', desc: 'Aprendidas em cursos e projetos', items: ['PostgreSQL', 'Power BI', 'Python', 'Pandas', 'NumPy', 'Metabase', 'Looker', 'Kibana', 'JavaScript', 'HTML', 'Modelagem de Dados'] },
  { key: 'site', name: 'Construído neste site', desc: 'Usadas neste portfólio e no assistente', items: ['TypeScript', 'React', 'Next.js', 'Git/GitHub', 'Claude API', 'Prompt Engineering', 'IA Generativa'] },
];
const techCatsEN: TechCat[] = [
  { key: 'work', name: 'Professional use', desc: 'Tools from my data and reporting work', items: ['SQL', 'Excel', 'Google Sheets'] },
  { key: 'ops', name: 'Platforms and operations', desc: 'Support and operations platforms', items: ['Salesforce', 'Zendesk', 'Five9', 'Google Workspace', 'Process Automation'] },
  { key: 'study', name: 'Study and complementary tools', desc: 'Learned through courses and projects', items: ['PostgreSQL', 'Power BI', 'Python', 'Pandas', 'NumPy', 'Metabase', 'Looker', 'Kibana', 'JavaScript', 'HTML', 'Data Modeling'] },
  { key: 'site', name: 'Built on this site', desc: 'Used in this portfolio and its assistant', items: ['TypeScript', 'React', 'Next.js', 'Git/GitHub', 'Claude API', 'Prompt Engineering', 'Generative AI'] },
];

const PT: SiteContent = {
  nav: { traj: 'Trajetória', exp: 'Experiência', data: 'Dados & IA', proj: 'Projetos', tech: 'Tecnologias', cert: 'Formação', contact: 'Contato' },
  cta: { talk: 'Vamos conversar', resume: 'Trajetória', linkedin: 'LinkedIn', whatsapp: 'WhatsApp', github: 'GitHub' },
  traj: {
    idx: '01', eyebrow: 'Trajetória',
    title: 'Trajetória de operações a engenharia de software, dados e IA.',
    sub: 'Minha transição para dados não começou do zero. É o resultado de anos resolvendo problemas reais com processos, indicadores e decisões críticas.',
    growthTitle: 'Foco profissional', growthSpan: 'operação → dados & IA',
    growthLegend: ['Operações & negócio', 'Dados, IA & engenharia'],
    milestones: [
      { yr: 'out/2026 · agora', role: 'MBA em Data Science, IA e Analytics', co: 'USP/ESALQ · em andamento', now: false },
      { yr: 'dez/2024 · agora', role: 'Analista de Ouvidoria', co: 'Nubank · causa raiz e melhoria de processos', now: true },
      { yr: '2023 · 2024', role: 'Analista de Operações & Suporte Financeiro', co: 'isaac · RD Station', now: false },
      { yr: '2020 · 2022', role: 'Supervisor de Operações', co: 'MadeiraMadeira · liderança & qualidade', now: false },
      { yr: '2008 · 2020', role: 'Início & base operacional', co: 'Electrolux · Saúde · Rumo', now: false },
    ],
  },
  exp: {
    idx: '02', eyebrow: 'Experiência',
    title: 'Setores regulados, decisões de alto impacto.',
    sub: 'Saúde, logística, marketplace, fintech e SaaS. Sempre conectando estratégia, operação e dados.',
    rows: [
      { yr: 'dez/2024 · atual', role: 'Analista de Ouvidoria (Ombudsman Analyst)', co: 'Nubank', desc: 'Acompanho manifestações públicas e canais regulatórios, com foco na resolução de casos complexos, rastreabilidade e conformidade. Investigo causas raiz e falhas de processo com outras áreas. Produzo análises e relatórios a partir de indicadores e feedbacks de clientes para apoiar melhorias na operação.' },
      { yr: 'fev/2024 · dez/2024', role: 'Analista de Suporte Financeiro', co: 'RD Station', desc: 'Analisei dados financeiros e operacionais para identificar padrões, inconsistências e recorrências. Desenvolvi e acompanhei dashboards e indicadores. Em squads com finanças, operações e tecnologia, usei essas análises para melhorar fluxos e a rastreabilidade das tratativas.' },
      { yr: 'jul/2023 · fev/2024', role: 'Analista de Operações · temporário', co: 'isaac', desc: 'Coletei e organizei dados operacionais para relatórios e acompanhamento de SLAs e KPIs. Identifiquei gargalos e recorrências para apoiar ações preventivas. Dei suporte analítico às rotinas financeiras e operacionais, consolidando informações em planilhas e relatórios.' },
      { yr: 'jun/2020 · out/2022', role: 'Supervisor de Operações', co: 'MadeiraMadeira', desc: 'Usei SQL, Excel e Google Sheets para acompanhar backlog, SLA, FCR, resolutividade e TMA. Desenvolvi dashboards e relatórios gerenciais e liderei equipe remota com feedbacks, monitorias de qualidade e PDIs. Participei dos projetos Madeira Decora e Iguanafix, apoiando melhorias nos fluxos operacionais.' },
      { yr: '2008 · 2020', role: 'Qualidade & operações', co: 'Electrolux · Saúde · Rumo', desc: 'Pós-venda, fiscal, auditorias, indicadores, SAP e gestão da qualidade em ambientes regulados.' },
    ],
  },
  data: {
    idx: '03', eyebrow: 'Dados & Inteligência Artificial',
    title: 'Dados e IA: onde o negócio vira inteligência.',
    sub: 'Acredito que dados servem para resolver problemas reais de pessoas. Uno visão operacional, análise técnica e IA para gerar decisões melhores.',
    caps: [
      { ic: 'db', h: 'Dados no trabalho', p: 'SQL, Excel e Google Sheets para acompanhar indicadores e montar relatórios.' },
      { ic: 'chart', h: 'Analytics e visualização', p: 'Estudo Power BI, Metabase e Python para analisar dados e apresentar resultados.' },
      { ic: 'brain', h: 'Inteligência Artificial', p: 'IA generativa e um assistente próprio com a API do Claude, como o deste site.' },
      { ic: 'flow', h: 'Automação de processos', p: 'Estudo e aplico automação para reduzir trabalho manual em rotinas operacionais.' },
    ],
  },
  tech: {
    idx: '05', eyebrow: 'Tecnologias',
    title: 'Tecnologias que uso e que estudo.',
    sub: 'Organizadas pelo lugar onde entram: trabalho, operação, estudo e este site.',
    cats: techCatsPT,
    allLabel: 'Todas as Ferramentas',
    allDesc: 'Visualização completa do stack.',
  },
  quals: {
    idx: '06', eyebrow: 'Formação & Qualificações',
    title: 'Formação sólida, aprendizado contínuo.',
    sub: 'Uma base acadêmica em construção, somada a mais de 50 formações e certificações sempre voltadas a Dados, IA, Engenharia, Operações e Liderança.',
    acadTitle: 'Formação Acadêmica',
    academic: [
      { name: 'Bacharelado em Engenharia de Software', org: 'Uninter', period: 'Em andamento', status: 'Cursando', done: false, ic: 'code' },
      { name: 'MBA em Data Science, Inteligência Artificial e Analytics', org: 'USP/ESALQ', period: 'Em andamento desde outubro de 2026', status: 'Cursando', done: false, ic: 'brain' },
      { name: 'Tecnólogo em Processos Gerenciais', org: 'Estácio', period: 'Concluído em 2025', status: 'Concluído', done: true, ic: 'layers' },
    ],
    profTitle: 'Qualificações Profissionais',
    profSub: 'Certificações, cursos, especializações e capacitações.',
    totalLabel: 'formações & certificações', catsLabel: 'categorias',
    searchPlaceholder: 'Buscar por curso ou instituição…', allLabel: 'Todas', clearLabel: 'Limpar filtros',
    expandAll: 'Expandir todas', collapseAll: 'Recolher todas',
    liveLabel: 'Sincronizado com Google Sheets', loadingLabel: 'Carregando da planilha…',
    fallbackLabel: 'Base local', emptyLabel: 'Nenhuma formação encontrada para esse filtro.', recentLabel: 'Mais recentes', featuredLabel: 'Em destaque', featuredBadge: 'Destaque',
    viewCert: 'Ver certificado',
    metaLabels: { inst: 'Instituição', date: 'Emissão', cat: 'Categoria' },
    catNames: { tech: 'Tech & Data', ia: 'IA & Analytics', agile: 'Agilidade & Produtos', lideranca: 'Liderança & Comunicação', negocios: 'Negócios & Operações' },
  },
  contact: {
    idx: '07', eyebrow: 'Contato',
    h2: 'Boas ideias começam com boas conexões.',
    p: 'Construindo minha trajetória em Dados, Inteligência Artificial e Engenharia de Software. Para conexões profissionais e conversas sobre desenvolvimento, dados e IA aplicada.',
    lk: 'LinkedIn', wa: 'WhatsApp', gh: 'GitHub',
    lines: [
      { ic: 'pin', k: 'Localização', v: 'Balneário Camboriú · SC' },
      { ic: 'whatsapp', k: 'WhatsApp', v: '(47) 99171-0813', href: 'https://wa.me/5547991710813' },
      { ic: 'linkedin', k: 'LinkedIn', v: '/in/drasdiego', href: 'https://www.linkedin.com/in/drasdiego/' },
      { ic: 'github', k: 'GitHub', v: '@drasdiego', href: 'https://github.com/drasdiego' },
    ],
  },
  footer: { tag: 'Dados · IA · Engenharia de Software', rights: 'Construído com foco em clareza, estrutura e propósito.' },
  asst: {
    title: 'Assistente do Diego', sub: 'IA · responde sobre a carreira',
    placeholder: 'Pergunte sobre experiência, projetos…',
    greet: 'Olá! Sou o assistente do Diego. Posso falar sobre a trajetória, experiência, tecnologias e projetos dele. O que você quer saber?',
    chips: ['Experiência com dados?', 'Onde trabalha hoje?', 'Quais tecnologias domina?', 'Projetos de IA'],
  },
};

const EN: SiteContent = {
  nav: { traj: 'Journey', exp: 'Experience', data: 'Data & AI', proj: 'Projects', tech: 'Stack', cert: 'Education', contact: 'Contact' },
  cta: { talk: "Let's talk", resume: 'Journey', linkedin: 'LinkedIn', whatsapp: 'WhatsApp', github: 'GitHub' },
  traj: {
    idx: '01', eyebrow: 'Journey',
    title: 'Career path from operations to software engineering, data and AI.',
    sub: "My move into data didn't start from zero. It's the result of years solving real problems with processes, metrics and critical decisions.",
    growthTitle: 'Professional focus', growthSpan: 'operations → data & AI',
    growthLegend: ['Operations & business', 'Data, AI & engineering'],
    milestones: [
      { yr: 'Oct 2026 · now', role: 'MBA in Data Science, AI & Analytics', co: 'USP/ESALQ · in progress', now: false },
      { yr: 'Dec 2024 · now', role: 'Ombudsman Analyst', co: 'Nubank · root-cause analysis and process improvement', now: true },
      { yr: '2023 · 2024', role: 'Operations & Financial Support Analyst', co: 'isaac · RD Station', now: false },
      { yr: '2020 · 2022', role: 'Operations Supervisor', co: 'MadeiraMadeira · leadership & quality', now: false },
      { yr: '2008 · 2020', role: 'Start & operational base', co: 'Electrolux · Healthcare · Rumo', now: false },
    ],
  },
  exp: {
    idx: '02', eyebrow: 'Experience',
    title: 'Regulated sectors, high-impact decisions.',
    sub: 'Healthcare, logistics, marketplace, fintech and SaaS. Always connecting strategy, operations and data.',
    rows: [
      { yr: 'Dec 2024 · present', role: 'Ombudsman Analyst', co: 'Nubank', desc: 'I handle complaints on public platforms and regulatory channels, focusing on complex cases, traceability and compliance. I investigate root causes and process failures with other teams. I use metrics and customer feedback to produce analyses and reports that support operational improvements.' },
      { yr: 'Feb 2024 · Dec 2024', role: 'Financial Support Analyst', co: 'RD Station', desc: 'I analyzed financial and operational data to identify patterns, inconsistencies and recurring issues. I developed and tracked dashboards and metrics. Working with finance, operations and technology squads, I used these analyses to improve workflows and case traceability.' },
      { yr: 'Jul 2023 · Feb 2024', role: 'Operations Analyst · temporary', co: 'isaac', desc: 'I collected and organized operational data for reports and SLA and KPI monitoring. I identified bottlenecks and recurring issues to support preventive action. I provided analytical support for financial and operational routines, consolidating information in spreadsheets and reports.' },
      { yr: 'Jun 2020 · Oct 2022', role: 'Operations Supervisor', co: 'MadeiraMadeira', desc: 'I used SQL, Excel and Google Sheets to track backlog, SLA, FCR, resolution rates and AHT. I developed dashboards and management reports and led a remote team through feedback, quality reviews and individual development plans. I contributed to Madeira Decora and Iguanafix, supporting operational workflow improvements.' },
      { yr: '2008 · 2020', role: 'Quality & operations', co: 'Electrolux · Healthcare · Rumo', desc: 'After-sales, fiscal, audits, metrics, SAP and quality management in regulated environments.' },
    ],
  },
  data: {
    idx: '03', eyebrow: 'Data & Artificial Intelligence',
    title: 'Data and AI: where business becomes intelligence.',
    sub: 'I believe data exists to solve real human problems. I blend operational insight, technical analysis and AI to drive better decisions.',
    caps: [
      { ic: 'db', h: 'Data at work', p: 'SQL, Excel and Google Sheets to track metrics and build reports.' },
      { ic: 'chart', h: 'Analytics and visualization', p: 'I study Power BI, Metabase and Python to analyze data and present results.' },
      { ic: 'brain', h: 'Artificial Intelligence', p: 'Generative AI and my own assistant built with the Claude API, like the one on this site.' },
      { ic: 'flow', h: 'Process automation', p: 'I study and apply automation to reduce manual work in operational routines.' },
    ],
  },
  tech: {
    idx: '05', eyebrow: 'Stack',
    title: 'Technologies I use and study.',
    sub: 'Grouped by where they come in: work, operations, study and this site.',
    cats: techCatsEN,
    allLabel: 'All Tools',
    allDesc: 'Full stack view.',
  },
  quals: {
    idx: '06', eyebrow: 'Education & Credentials',
    title: 'Solid foundation, continuous learning.',
    sub: 'An academic base in progress, plus 50+ courses and certifications focused on Data, AI, Engineering, Operations and Leadership.',
    acadTitle: 'Academic Background',
    academic: [
      { name: "Bachelor's in Software Engineering", org: 'Uninter', period: 'In progress', status: 'Ongoing', done: false, ic: 'code' },
      { name: 'MBA in Data Science, AI & Analytics', org: 'USP/ESALQ', period: 'In progress since October 2026', status: 'Ongoing', done: false, ic: 'brain' },
      { name: 'Technologist in Management Processes', org: 'Estácio', period: 'Completed in 2025', status: 'Completed', done: true, ic: 'layers' },
    ],
    profTitle: 'Professional Qualifications',
    profSub: 'Certifications, courses, specializations and training.',
    totalLabel: 'courses & certifications', catsLabel: 'categories',
    searchPlaceholder: 'Search by course or institution…', allLabel: 'All', clearLabel: 'Clear filters',
    expandAll: 'Expand all', collapseAll: 'Collapse all',
    liveLabel: 'Synced with Google Sheets', loadingLabel: 'Loading from sheet…',
    fallbackLabel: 'Local data', emptyLabel: 'No courses found for this filter.', recentLabel: 'Most recent', featuredLabel: 'Featured', featuredBadge: 'Featured',
    viewCert: 'View certificate',
    metaLabels: { inst: 'Institution', date: 'Issued', cat: 'Category' },
    catNames: { tech: 'Tech & Data', ia: 'AI & Analytics', agile: 'Agile & Products', lideranca: 'Leadership & Communication', negocios: 'Business & Operations' },
  },
  contact: {
    idx: '07', eyebrow: 'Contact',
    h2: 'Great ideas start with great connections.',
    p: 'For professional connections and conversations about development, data and applied AI. I would love to chat.',
    lk: 'LinkedIn', wa: 'WhatsApp', gh: 'GitHub',
    lines: [
      { ic: 'pin', k: 'Location', v: 'Balneário Camboriú · Brazil' },
      { ic: 'whatsapp', k: 'WhatsApp', v: '+55 47 99171-0813', href: 'https://wa.me/5547991710813' },
      { ic: 'linkedin', k: 'LinkedIn', v: '/in/drasdiego', href: 'https://www.linkedin.com/in/drasdiego/' },
      { ic: 'github', k: 'GitHub', v: '@drasdiego', href: 'https://github.com/drasdiego' },
    ],
  },
  footer: { tag: 'Data · AI · Software Engineering', rights: 'Built with a focus on clarity, structure and purpose.' },
  asst: {
    title: "Diego's Assistant", sub: 'AI · answers about his career',
    placeholder: 'Ask about experience, projects…',
    greet: "Hi! I'm Diego's assistant. I can talk about his journey, experience, technologies and projects. What would you like to know?",
    chips: ['Data experience?', 'Where does he work now?', 'Which technologies?', 'AI projects'],
  },
};

export const CONTENT: Record<Lang, SiteContent> = { pt: PT, en: EN };
