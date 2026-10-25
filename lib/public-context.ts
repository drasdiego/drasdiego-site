import type { Lang } from '@/types';
import { CONTENT } from './content';
import { PRESENTATION } from './presentation';

const LABELS = {
  pt: {
    name: 'Nome profissional: Diego Arruda.',
    years: 'Os 18 anos são de carreira em operações e negócios, não de desenvolvimento de software.',
    exp: 'EXPERIÊNCIA PROFISSIONAL PUBLICADA',
    edu: 'FORMAÇÃO ACADÊMICA PUBLICADA',
    project: 'PROJETO EM DESTAQUE',
    tech: 'TECNOLOGIAS PUBLICADAS',
    limits: 'LIMITES DAS INFORMAÇÕES PROFISSIONAIS',
    limitsTools:
      'SQL, Excel e Google Sheets estão explicitamente associados à MadeiraMadeira. Outras ferramentas do repertório também incluem estudos e formação; não presumir domínio avançado ou uso em todos os cargos.',
    limitsMetrics:
      'Não há métricas quantitativas confirmadas de impacto, volumes ou tamanho de equipe. Projetos pessoais de software e IA não são projetos dos empregadores.',
    contacts: 'CONTATOS PROFISSIONAIS PUBLICADOS',
    site: 'Portfólio: https://www.drasdiego.com.br',
    scope:
      'Esta base contém apenas informações profissionais publicadas no portfólio. Não inferir ou fornecer informações pessoais sensíveis.',
  },
  en: {
    name: 'Professional name: Diego Arruda.',
    years: 'The 18 years are career years in operations and business, not in software development.',
    exp: 'PUBLISHED PROFESSIONAL EXPERIENCE',
    edu: 'PUBLISHED ACADEMIC BACKGROUND',
    project: 'FEATURED PROJECT',
    tech: 'PUBLISHED TECHNOLOGIES',
    limits: 'LIMITS OF THE PROFESSIONAL INFORMATION',
    limitsTools:
      'SQL, Excel and Google Sheets are explicitly tied to MadeiraMadeira. The other tools in his toolkit also come from studies and training; do not assume advanced proficiency or use in every role.',
    limitsMetrics:
      'There are no confirmed quantitative metrics on impact, volumes or team size. Personal software and AI projects are not projects of his employers.',
    contacts: 'PUBLISHED PROFESSIONAL CONTACTS',
    site: 'Portfolio: https://www.drasdiego.com.br',
    scope:
      'This base contains only professional information published on the portfolio. Do not infer or provide sensitive personal information.',
  },
} as const;

export function contextFor(lang: Lang): string {
  const l = lang === 'en' ? 'en' : 'pt';
  const text = LABELS[l];
  const site = CONTENT[l];
  const profile = PRESENTATION[l];
  return [
    text.name,
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
    text.tech,
    ...site.tech.cats.map(item => `${item.name}: ${item.items.join(', ')}.`),
    text.limits,
    text.limitsTools,
    text.limitsMetrics,
    text.contacts,
    ...site.contact.lines.map(item => `${item.k}: ${item.v}.`),
    text.site,
    text.scope,
  ].join('\n');
}
