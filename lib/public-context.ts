import type { Lang } from '@/types';
import { CONTENT } from './content';
import { PRESENTATION } from './presentation';
import { CATEGORIES, blogRoot, guidesIn, sortGuides } from './blog';
import { servicosUI } from './servicos';

const LABELS = {
  pt: {
    name: 'Nome profissional: Diego Arruda.',
    years: 'Os 18 anos são de carreira em operações e negócios, não de desenvolvimento de software.',
    exp: 'EXPERIÊNCIA PROFISSIONAL PUBLICADA',
    edu: 'FORMAÇÃO ACADÊMICA PUBLICADA',
    project: 'PROJETO EM DESTAQUE',
    services: 'SERVIÇOS PUBLICADOS (seção O que construo do Início). Pedidos de orçamento ou de projeto vão para a página de contato, com o campo Assunto.',
    tech: 'TECNOLOGIAS PUBLICADAS',
    limits: 'LIMITES DAS INFORMAÇÕES PROFISSIONAIS',
    limitsTools:
      'SQL, Excel e Google Sheets estão explicitamente associados à MadeiraMadeira. Outras ferramentas do repertório também incluem estudos e formação; não presumir domínio avançado ou uso em todos os cargos.',
    limitsMetrics:
      'Não há métricas quantitativas confirmadas de impacto, volumes ou tamanho de equipe. Projetos pessoais de software e IA não são projetos dos empregadores.',
    contacts: 'CONTATOS PROFISSIONAIS PUBLICADOS',
    contactPage: 'Página de contato: drasdiego.com.br/contato.',
    site: 'Portfólio: https://www.drasdiego.com.br',
    map: 'MAPA DO SITE',
    guides: 'GUIAS PUBLICADOS',
    mapLines: [
      'Início (/): apresentação, serviços (O que construo), projetos em destaque, guias recentes e contato.',
      'Projetos (/projetos): estudos de caso de projetos pessoais, que não são projetos dos empregadores: o assistente de carreira (/projetos/assistente-de-carreira), o Fora do Digital (/projetos/fora-do-digital), o Brasa Alta, site conceitual de uma hamburgueria fictícia (/projetos/brasa-alta), e o Ouvidômetro, painel com dados abertos da CGU sobre ouvidorias públicas (/projetos/ouvidometro).',
      'Guias (/guias): guias práticos e educativos escritos pelo Diego, organizados por categoria. Não são experiência profissional.',
      'Sobre (/sobre): resumo, experiência profissional, formação, dados e IA e tecnologias.',
      'Contato (/contato): formulário para enviar uma mensagem, com resposta pelo e-mail informado, além de LinkedIn, WhatsApp e GitHub. Os mesmos canais aparecem no rodapé de todas as páginas e na seção de contato do Início.',
      'Privacidade (/privacidade): aviso de privacidade do site.',
    ],
    scope:
      'Esta base contém apenas informações profissionais publicadas no portfólio. Não inferir ou fornecer informações pessoais sensíveis.',
  },
  en: {
    name: 'Professional name: Diego Arruda.',
    years: 'The 18 years are career years in operations and business, not in software development.',
    exp: 'PUBLISHED PROFESSIONAL EXPERIENCE',
    edu: 'PUBLISHED ACADEMIC BACKGROUND',
    project: 'FEATURED PROJECT',
    services: 'PUBLISHED SERVICES (the What I build section on the home page). Requests for a quote or a project go to the contact page, which has a Subject field.',
    tech: 'PUBLISHED TECHNOLOGIES',
    limits: 'LIMITS OF THE PROFESSIONAL INFORMATION',
    limitsTools:
      'SQL, Excel and Google Sheets are explicitly tied to MadeiraMadeira. The other tools in his toolkit also come from studies and training; do not assume advanced proficiency or use in every role.',
    limitsMetrics:
      'There are no confirmed quantitative metrics on impact, volumes or team size. Personal software and AI projects are not projects of his employers.',
    contacts: 'PUBLISHED PROFESSIONAL CONTACTS',
    contactPage: 'Contact page: drasdiego.com.br/en/contato.',
    site: 'Portfolio: https://www.drasdiego.com.br',
    map: 'SITE MAP',
    guides: 'PUBLISHED GUIDES',
    mapLines: [
      'Home (/en): introduction, services (What I build), featured projects, latest guides and contact.',
      'Projects (/en/projetos): case studies of personal projects, which are not employer projects: the career assistant (/en/projetos/assistente-de-carreira), Fora do Digital (/en/projetos/fora-do-digital), Brasa Alta, a concept website for a fictional burger restaurant (/en/projetos/brasa-alta), and Ouvidômetro, a dashboard with CGU open data on public ombudsman offices (/en/projetos/ouvidometro).',
      'Guides (/en/guias): practical, educational guides written by Diego, organized by category. They are not professional experience.',
      'About (/en/sobre): summary, professional experience, education, data and AI, and technologies.',
      'Contact (/en/contato): form to send a message, with a reply to the email provided, plus LinkedIn, WhatsApp and GitHub. The same channels appear in the footer of every page and in the contact section of the home page.',
      'Privacy (/en/privacidade): the website privacy notice.',
    ],
    scope:
      'This base contains only professional information published on the portfolio. Do not infer or provide sensitive personal information.',
  },
} as const;

function guideLines(lang: Lang): string[] {
  const root = blogRoot(lang);
  return CATEGORIES.flatMap((cat) => [
    `${cat[lang].name} (${root}/${cat.slug}): ${cat[lang].desc}`,
    ...sortGuides(guidesIn(cat.slug)).map((g) => `${g[lang].title} (${root}/${cat.slug}/${g.slug}), ${g.published}: ${g[lang].description}`),
  ]);
}

export function contextFor(lang: Lang): string {
  const l = lang === 'en' ? 'en' : 'pt';
  const text = LABELS[l];
  const site = CONTENT[l];
  const profile = PRESENTATION[l];
  const servicos = servicosUI(l);
  const exemplo = l === 'en' ? 'Example' : 'Exemplo';
  return [
    text.name,
    profile.lead,
    profile.context,
    profile.career,
    text.years,
    text.exp,
    ...site.exp.rows.map(item => `${item.yr}: ${item.role}, ${item.co}. ${item.desc}`),
    text.edu,
    ...site.quals.academic.map(item => `${item.name}, ${item.org}. ${item.period}.`),
    text.project,
    `${profile.projectName}. ${profile.projectDescription}`,
    ...profile.details.map(item => `${item.title}: ${item.text}`),
    text.services,
    ...servicos.offers.map(o => `${o.title}: ${o.desc} ${exemplo}: ${o.example}${o.href ? ` (${o.href})` : ''}.`),
    servicos.ai,
    text.tech,
    ...site.tech.cats.map(item => `${item.name}: ${item.items.join(', ')}.`),
    text.limits,
    text.limitsTools,
    text.limitsMetrics,
    text.contacts,
    ...site.contact.lines.map(item => `${item.k}: ${item.v}.`),
    text.contactPage,
    text.site,
    text.map,
    ...text.mapLines,
    text.guides,
    ...guideLines(l),
    text.scope,
  ].join('\n');
}
