import type { Lang, Metric, AcademicItem, ContactLine, CategoryId } from '@/types';

export interface TechCat { key: string; name: string; desc: string; items: string[] }
export interface Milestone { yr: string; role: string; co: string; now: boolean }
export interface TrajBar { yr: string; ops: number; data: number }
export interface ExpRow { yr: string; role: string; co: string; desc: string; tag: string }
export interface Capability { ic: string; h: string; p: string }
export interface ProjectItem { ic: string; status: 'wip' | 'live'; statusLabel: string; h: string; p: string; tags: string[] }

export interface SiteContent {
  nav: { traj: string; exp: string; data: string; proj: string; tech: string; cert: string; contact: string };
  cta: { talk: string; resume: string; linkedin: string; whatsapp: string; github: string };
  hero: { status: string; h1a: string; h1b: string; h1c: string; lead: string; metrics: Metric[]; termTitle: string };
  traj: {
    idx: string; eyebrow: string; title: string; sub: string;
    growthTitle: string; growthSpan: string; growthLegend: string[];
    bars: TrajBar[]; milestones: Milestone[];
  };
  exp: { idx: string; eyebrow: string; title: string; sub: string; rows: ExpRow[] };
  data: { idx: string; eyebrow: string; title: string; sub: string; caps: Capability[] };
  proj: { idx: string; eyebrow: string; title: string; sub: string; items: ProjectItem[] };
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
  hero: {
    status: 'Engenharia de Software, Dados & IA',
    h1a: 'Dos dados à', h1b: 'inteligência', h1c: 'que decide.',
    lead: 'Sou <strong>Diego Arruda</strong>, com 18 anos transformando operação e negócio em decisão. Hoje construo soluções em <strong>Dados, Inteligência Artificial e Engenharia de Software</strong>.',
    metrics: [
      { n: 18, suf: '+', label: 'anos de carreira' },
      { n: 50, suf: '+', label: 'qualificações' },
      { text: 'MBA', label: 'em andamento', sub: 'Data Science, IA & Analytics • USP/ESALQ' },
    ],
    termTitle: 'diego@arruda ~ perfil',
  },
  traj: {
    idx: '01', eyebrow: 'Trajetória',
    title: 'Trajetória de operações a engenharia de software, dados e IA.',
    sub: 'Minha transição para dados não começou do zero. É o resultado de anos resolvendo problemas reais com processos, indicadores e decisões críticas.',
    growthTitle: 'Foco profissional', growthSpan: 'operação → dados & IA',
    growthLegend: ['Operações & negócio', 'Dados, IA & engenharia'],
    bars: [
      { yr: '’08', ops: 90, data: 8 }, { yr: '’14', ops: 80, data: 16 }, { yr: '’20', ops: 62, data: 34 },
      { yr: '’23', ops: 45, data: 58 }, { yr: '’25', ops: 28, data: 82 }, { yr: 'now', ops: 18, data: 96 },
    ],
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
      { yr: 'dez/2024 · atual', role: 'Analista de Ouvidoria (Ombudsman Analyst)', co: 'Nubank', desc: 'Acompanho manifestações públicas e canais regulatórios, com foco na resolução de casos complexos, rastreabilidade e conformidade. Investigo causas raiz e falhas de processo com outras áreas. Produzo análises e relatórios a partir de indicadores e feedbacks de clientes para apoiar melhorias na operação.', tag: 'Fintech' },
      { yr: 'fev/2024 · dez/2024', role: 'Analista de Suporte Financeiro', co: 'RD Station', desc: 'Analisei dados financeiros e operacionais para identificar padrões, inconsistências e recorrências. Desenvolvi e acompanhei dashboards e indicadores. Em squads com finanças, operações e tecnologia, usei essas análises para melhorar fluxos e a rastreabilidade das tratativas.', tag: 'SaaS' },
      { yr: 'jul/2023 · fev/2024', role: 'Analista de Operações · temporário', co: 'isaac', desc: 'Coletei e organizei dados operacionais para relatórios e acompanhamento de SLAs e KPIs. Identifiquei gargalos e recorrências para apoiar ações preventivas. Dei suporte analítico às rotinas financeiras e operacionais, consolidando informações em planilhas e relatórios.', tag: 'Financeiro' },
      { yr: 'jun/2020 · out/2022', role: 'Supervisor de Operações', co: 'MadeiraMadeira', desc: 'Usei SQL, Excel e Google Sheets para acompanhar backlog, SLA, FCR, resolutividade e TMA. Desenvolvi dashboards e relatórios gerenciais e liderei equipe remota com feedbacks, monitorias de qualidade e PDIs. Participei dos projetos Madeira Decora e Iguanafix, apoiando melhorias nos fluxos operacionais.', tag: 'Marketplace' },
      { yr: '2008 · 2020', role: 'Qualidade & operações', co: 'Electrolux · Saúde · Rumo', desc: 'Pós-venda, fiscal, auditorias, indicadores, SAP e gestão da qualidade em ambientes regulados.', tag: 'Multi-setor' },
    ],
  },
  data: {
    idx: '03', eyebrow: 'Dados & Inteligência Artificial',
    title: 'Dados e IA: onde o negócio vira inteligência.',
    sub: 'Acredito que dados servem para resolver problemas reais de pessoas. Uno visão operacional, análise técnica e IA para gerar decisões melhores.',
    caps: [
      { ic: 'db', h: 'Engenharia de dados aplicada', p: 'SQL, PostgreSQL e modelagem para transformar dados brutos em base confiável.' },
      { ic: 'chart', h: 'Analytics & visualização', p: 'Power BI, Metabase e Python para revelar padrões, anomalias e oportunidades.' },
      { ic: 'brain', h: 'Inteligência Artificial', p: 'IA generativa e assistentes próprios com a API do Claude, como o deste site.' },
      { ic: 'flow', h: 'Automação de processos', p: 'Fluxos que eliminam trabalho manual e elevam a eficiência operacional.' },
    ],
  },
  proj: {
    idx: '04', eyebrow: 'Projetos',
    title: 'Construindo na prática.',
    sub: 'Aprendizado contínuo aplicado em produtos reais. Dados, IA e automação.',
    items: [
      { ic: 'bot', status: 'live', statusLabel: 'No ar', h: 'Assistente de IA', p: 'É o assistente deste site. Conversa sobre minha trajetória a partir de uma base de conhecimento própria, com respostas geradas pela API do Claude, memória da conversa e perguntas por microfone.', tags: ['Next.js', 'Claude API', 'Microfone'] },
      { ic: 'code', status: 'live', statusLabel: 'No ar', h: 'Suporte Interativo CSS', p: 'Projeto de interface interativa focado em experiência e clareza visual.', tags: ['HTML', 'CSS', 'UX'] },
      { ic: 'spark', status: 'wip', statusLabel: 'Próximo', h: 'Produtos de dados', p: 'Projetos futuros em dados, IA e automação com foco em escala e impacto real.', tags: ['Python', 'IA', 'Automação'] },
    ],
  },
  tech: {
    idx: '05', eyebrow: 'Tecnologias',
    title: 'Tecnologias de dados, código e IA que uso para construir.',
    sub: 'Um stack em expansão constante, centrado em dados, código e inteligência artificial.',
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
  hero: {
    status: 'Software Engineering, Data & AI',
    h1a: 'From data to', h1b: 'intelligence', h1c: 'that decides.',
    lead: "I'm <strong>Diego Arruda</strong>, with 18 years turning operations and business into decisions. Today I build solutions across <strong>Data, Artificial Intelligence and Software Engineering</strong>.",
    metrics: [
      { n: 18, suf: '+', label: 'years of career' },
      { n: 50, suf: '+', label: 'qualifications' },
      { text: 'MBA', label: 'in progress', sub: 'Data Science, AI & Analytics • USP/ESALQ' },
    ],
    termTitle: 'diego@arruda ~ profile',
  },
  traj: {
    idx: '01', eyebrow: 'Journey',
    title: 'Career path from operations to software engineering, data and AI.',
    sub: "My move into data didn't start from zero. It's the result of years solving real problems with processes, metrics and critical decisions.",
    growthTitle: 'Professional focus', growthSpan: 'operations → data & AI',
    growthLegend: ['Operations & business', 'Data, AI & engineering'],
    bars: [
      { yr: '’08', ops: 90, data: 8 }, { yr: '’14', ops: 80, data: 16 }, { yr: '’20', ops: 62, data: 34 },
      { yr: '’23', ops: 45, data: 58 }, { yr: '’25', ops: 28, data: 82 }, { yr: 'now', ops: 18, data: 96 },
    ],
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
      { yr: 'Dec 2024 · present', role: 'Ombudsman Analyst', co: 'Nubank', desc: 'I handle complaints on public platforms and regulatory channels, focusing on complex cases, traceability and compliance. I investigate root causes and process failures with other teams. I use metrics and customer feedback to produce analyses and reports that support operational improvements.', tag: 'Fintech' },
      { yr: 'Feb 2024 · Dec 2024', role: 'Financial Support Analyst', co: 'RD Station', desc: 'I analyzed financial and operational data to identify patterns, inconsistencies and recurring issues. I developed and tracked dashboards and metrics. Working with finance, operations and technology squads, I used these analyses to improve workflows and case traceability.', tag: 'SaaS' },
      { yr: 'Jul 2023 · Feb 2024', role: 'Operations Analyst · temporary', co: 'isaac', desc: 'I collected and organized operational data for reports and SLA and KPI monitoring. I identified bottlenecks and recurring issues to support preventive action. I provided analytical support for financial and operational routines, consolidating information in spreadsheets and reports.', tag: 'Finance' },
      { yr: 'Jun 2020 · Oct 2022', role: 'Operations Supervisor', co: 'MadeiraMadeira', desc: 'I used SQL, Excel and Google Sheets to track backlog, SLA, FCR, resolution rates and AHT. I developed dashboards and management reports and led a remote team through feedback, quality reviews and individual development plans. I contributed to Madeira Decora and Iguanafix, supporting operational workflow improvements.', tag: 'Marketplace' },
      { yr: '2008 · 2020', role: 'Quality & operations', co: 'Electrolux · Healthcare · Rumo', desc: 'After-sales, fiscal, audits, metrics, SAP and quality management in regulated environments.', tag: 'Multi-sector' },
    ],
  },
  data: {
    idx: '03', eyebrow: 'Data & Artificial Intelligence',
    title: 'Data and AI: where business becomes intelligence.',
    sub: 'I believe data exists to solve real human problems. I blend operational insight, technical analysis and AI to drive better decisions.',
    caps: [
      { ic: 'db', h: 'Applied data engineering', p: 'SQL, PostgreSQL and modeling to turn raw data into a reliable foundation.' },
      { ic: 'chart', h: 'Analytics & visualization', p: 'Power BI, Metabase and Python to reveal patterns, anomalies and opportunities.' },
      { ic: 'brain', h: 'Artificial Intelligence', p: 'Generative AI and custom assistants with the Claude API, like the one on this site.' },
      { ic: 'flow', h: 'Process automation', p: 'Flows that remove manual work and raise operational efficiency.' },
    ],
  },
  proj: {
    idx: '04', eyebrow: 'Projects',
    title: 'Building, in practice.',
    sub: 'Continuous learning applied to real products. Data, AI and automation.',
    items: [
      { ic: 'bot', status: 'live', statusLabel: 'Live', h: 'AI assistant', p: 'The assistant on this site. It talks about my career from a custom knowledge base, with answers generated by the Claude API, conversation memory and questions by microphone.', tags: ['Next.js', 'Claude API', 'Microphone'] },
      { ic: 'code', status: 'live', statusLabel: 'Live', h: 'Interactive CSS Support', p: 'Interactive interface project focused on experience and visual clarity.', tags: ['HTML', 'CSS', 'UX'] },
      { ic: 'spark', status: 'wip', statusLabel: 'Next', h: 'Data products', p: 'Upcoming projects in data, AI and automation focused on scale and real impact.', tags: ['Python', 'AI', 'Automation'] },
    ],
  },
  tech: {
    idx: '05', eyebrow: 'Stack',
    title: 'Data, code and AI technologies I build with.',
    sub: 'A constantly expanding stack centered on data, code and artificial intelligence.',
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
