import { CONTENT } from './content';
import { PRESENTATION } from './presentation';

const site = CONTENT.pt;
const profile = PRESENTATION.pt;

export const DIEGO_CONTEXT = [
  'Nome profissional: Diego Arruda.',
  profile.context,
  profile.career,
  'Os 18 anos são de carreira em operações e negócios, não de desenvolvimento de software.',
  'EXPERIÊNCIA PROFISSIONAL PUBLICADA',
  ...site.exp.rows.map(item => `${item.yr}: ${item.role}, ${item.co}. ${item.desc}`),
  'FORMAÇÃO ACADÊMICA PUBLICADA',
  ...site.quals.academic.map(item => `${item.name}, ${item.org}. ${item.period}.`),
  'PROJETO EM DESTAQUE',
  `${profile.projectName}. ${profile.projectDescription}`,
  ...profile.details.map(item => `${item.title}: ${item.text}`),
  'TECNOLOGIAS PUBLICADAS',
  ...site.tech.cats.map(item => `${item.name}: ${item.items.join(', ')}.`),
  'LIMITES DAS INFORMAÇÕES PROFISSIONAIS',
  'SQL, Excel e Google Sheets estão explicitamente associados à MadeiraMadeira. Outras ferramentas do repertório também incluem estudos e formação; não presumir domínio avançado ou uso em todos os cargos.',
  'Não há métricas quantitativas confirmadas de impacto, volumes ou tamanho de equipe. Projetos pessoais de software e IA não são projetos dos empregadores.',
  'CONTATOS PROFISSIONAIS PUBLICADOS',
  ...site.contact.lines.map(item => `${item.k}: ${item.v}.`),
  'Portfólio: https://www.drasdiego.com.br',
  'Esta base contém apenas informações profissionais publicadas no portfólio. Não inferir ou fornecer informações pessoais sensíveis.',
].join('\n');
