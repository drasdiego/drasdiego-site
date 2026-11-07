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

export interface ProjetoLink {
  label: string;
  href: string;
  note?: string;
}

export type ProjetoBlock =
  | { k: 'p'; v: string }
  | { k: 'steps'; items: ProjetoItem[] }
  | { k: 'decisions'; items: ProjetoItem[] }
  | { k: 'links'; items: ProjetoLink[] };

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

export interface ProjetoMedia {
  alt: string;
  demo: ProjetoLink;
  code: ProjetoLink;
  embedTitle: string;
  mobileNote: string;
}

export interface ProjetoImage {
  src: string;
  width: number;
  height: number;
  cardSrc: string;
  cardWidth: number;
  cardHeight: number;
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
  media?: ProjetoMedia;
}

export interface Projeto {
  slug: string;
  image?: ProjetoImage;
  schema?: { repo: string; language: string | string[] };
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

const FDD_DEMO = 'https://drasdiego.github.io/fora-do-digital/';
const FDD_CODE = 'https://github.com/drasdiego/fora-do-digital';
const FDD_METHOD = 'https://github.com/drasdiego/fora-do-digital/blob/main/docs/METODOLOGIA.md';
const FDD_IBGE_2025 = 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102290_informativo.pdf';
const FDD_IBGE_2024 = 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102193_informativo.pdf';

const FORA_DO_DIGITAL: Record<Lang, ProjetoText> = {
  pt: {
    title: 'Fora do Digital',
    short: 'Painel aberto e interativo sobre quem ainda está fora da internet no Brasil, com dados oficiais do IBGE (Instituto Brasileiro de Geografia e Estatística).',
    lead: 'Painel aberto e interativo sobre o acesso à internet no Brasil. Ele usa dados oficiais da PNAD Contínua TIC (Pesquisa Nacional por Amostra de Domicílios Contínua, módulo de Tecnologia da Informação e Comunicação), do IBGE (Instituto Brasileiro de Geografia e Estatística), nos informativos de 2024 e 2025. A pergunta central: quem ainda está fora da internet, e o que isso significa para quem desenha atendimento 100% digital?',
    tags: ['Dados', 'IBGE', 'Visualização de dados', 'JavaScript', 'Python'],
    cta: 'Ver estudo de caso',
    status: 'Publicado no GitHub Pages',
    facts: [
      { label: 'Aplicação', value: 'Painel aberto e interativo sobre acesso à internet no Brasil' },
      { label: 'Tecnologias', chips: ['HTML', 'CSS', 'JavaScript', 'Python'] },
      { label: 'Dados', value: 'PNAD Contínua TIC do IBGE, informativos de 2024 e 2025' },
      { label: 'Código', value: 'Repositório público no GitHub', href: FDD_CODE },
      { label: 'Status', value: 'Publicado no GitHub Pages' },
      { label: 'Licença', value: 'MIT. Os dados pertencem ao IBGE.' },
    ],
    media: {
      alt: 'Captura de tela do painel Fora do Digital, em tema escuro. À esquerda, o título e a pergunta sobre quem ainda está fora da internet no Brasil. À direita, uma grade de 10 por 10 pontos, em que os pontos em magenta representam as pessoas que não usaram a internet. Abaixo, os primeiros cartões de indicadores.',
      demo: { label: 'Ver painel', href: FDD_DEMO },
      code: { label: 'Código', href: FDD_CODE },
      embedTitle: 'Painel Fora do Digital',
      mobileNote: 'Em telas pequenas o painel não é incorporado aqui. Abra a versão completa em outra aba.',
    },
    sections: [
      {
        id: 'problema',
        title: 'O problema',
        blocks: [
          { k: 'p', v: 'Quem desenha atendimento decide, muitas vezes, quais canais existem e quais saem do ar. Esse tipo de decisão costuma usar a média de quem já está conectado.' },
          { k: 'p', v: 'A pergunta do painel é: quem ainda está fora da internet no Brasil, e o que isso significa para quem desenha atendimento 100% digital?' },
          { k: 'p', v: 'Eu trabalho com atendimento e ouvidoria. O painel junta os dois lados: um dado público bem tratado e uma pergunta que quem atende pessoas precisa responder antes de tornar um canal 100% digital.' },
        ],
      },
      {
        id: 'fonte-dos-dados',
        title: 'Fonte dos dados',
        blocks: [
          { k: 'p', v: 'Os dados são oficiais e vêm da PNAD Contínua (Pesquisa Nacional por Amostra de Domicílios Contínua), a pesquisa do IBGE (Instituto Brasileiro de Geografia e Estatística) que mede o acesso à internet. O painel usa o módulo TIC (Tecnologia da Informação e Comunicação), a partir dos informativos de 2024 e 2025.' },
          { k: 'p', v: 'Os números foram transcritos dos informativos para um arquivo de dados, e cada série, recorte e bloco aponta para a fonte de onde veio. Os dados pertencem ao IBGE.' },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'Como foi construído',
        blocks: [
          { k: 'p', v: 'O painel mostra indicadores (KPIs, os números principais) com tendência; recortes por região, área urbana e rural, idade, instrução, sexo e cor ou raça, um de cada vez; os motivos para não usar a internet, de pessoas e de domicílios; as finalidades de uso e os equipamentos usados para acessar; e um destaque que compara o rendimento médio per capita dos domicílios com e sem internet. A renda aparece só nesse destaque, não como recorte.' },
          {
            k: 'steps',
            items: [
              { title: 'Dados', text: 'Os dados ficam em um arquivo JSON, com a fonte de cada série.' },
              { title: 'Python', text: 'Um script em Python, só com a biblioteca padrão, valida os dados, calcula os derivados e gera o arquivo que a página lê.' },
              { title: 'Página', text: 'A página é feita em HTML, CSS e JavaScript puros. Os gráficos são SVG próprios, sem biblioteca de gráficos, sem framework e sem CDN.' },
              { title: 'Uso', text: 'Funciona offline: dá para abrir a página com duplo clique no arquivo, sem servidor e sem instalação. A versão publicada está no GitHub Pages.' },
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: 'Decisões técnicas',
        blocks: [
          {
            k: 'decisions',
            items: [
              { title: 'JavaScript puro, sem framework e sem CDN', text: 'O painel tem poucas telas e nenhuma dependência para manter. Funciona offline e continua funcionando daqui a anos.' },
              { title: 'Arquivo de dados gerado do JSON', text: 'Navegadores bloqueiam a leitura de arquivos locais com fetch, então os dados são carregados por uma tag script e a página abre com duplo clique. O JSON continua sendo a fonte de verdade, e a validação automática barra um arquivo gerado desatualizado.' },
              { title: 'Gráficos SVG desenhados à mão', text: 'O eixo respeita o espaçamento real dos anos, séries com anos faltantes têm trechos tracejados e valores nulos viram lacuna. Foco, dica ao passar o mouse (tooltip) e uso pelo teclado também são tratados.' },
              { title: 'Cálculos em Python, leitura em JavaScript', text: 'Variações, diferenças e percentuais de quem está fora são calculados e testados em Python. O navegador só exibe.' },
              { title: 'Tema escuro por padrão', text: 'A preferência de tema é salva no navegador, com tratamento de erro para quando o armazenamento estiver bloqueado.' },
            ],
          },
        ],
      },
      {
        id: 'validacao',
        title: 'Como os dados são validados',
        blocks: [
          { k: 'p', v: 'Cada série, recorte e bloco do arquivo de dados precisa de uma fonte que exista na lista de fontes. Depois disso, o projeto segue quatro passos.' },
          {
            k: 'steps',
            items: [
              { title: 'Gerar', text: 'O script gerar_dados.py valida o JSON, calcula os derivados e gera o arquivo que o painel lê.' },
              { title: 'Validar', text: 'O script validar_dados.py aplica as regras de qualidade dos dados.' },
              { title: 'Testar', text: 'Testes automatizados, escritos com unittest, cobrem o validador e o gerador.' },
              { title: 'Repetir no CI', text: 'A validação contínua, feita com GitHub Actions (o serviço do GitHub que roda verificações automáticas), repete esses passos e confere, com a opção --check, se o arquivo gerado está atualizado.' },
            ],
          },
          { k: 'p', v: 'Limitações: a PNAD Contínua é uma pesquisa por amostra, então os percentuais têm margem de erro. O IBGE revisa a série a cada divulgação, e por isso pontos vindos do informativo de 2024 podem diferir da série revisada. Os anos sem dado não são interpolados. Os recortes são mostrados um de cada vez, porque não dá para combinar perfis sem os microdados. As leituras para atendimento são recomendações do projeto, não resultados da pesquisa.' },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            k: 'links',
            items: [
              { label: 'Painel publicado', href: FDD_DEMO },
              { label: 'Código no GitHub', href: FDD_CODE },
              { label: 'Metodologia', href: FDD_METHOD, note: 'Como cada número foi obtido e calculado' },
              { label: 'IBGE, PNAD Contínua, informativo de 2025 (PDF)', href: FDD_IBGE_2025 },
              { label: 'IBGE, PNAD Contínua, informativo de 2024 (PDF)', href: FDD_IBGE_2024 },
            ],
          },
          { k: 'p', v: 'Licença MIT. Os dados pertencem ao IBGE.' },
        ],
      },
    ],
  },
  en: {
    title: 'Fora do Digital',
    short: 'An open, interactive dashboard on who is still offline in Brazil, built with official data from IBGE (the Brazilian Institute of Geography and Statistics).',
    lead: 'An open, interactive dashboard on internet access in Brazil. It uses official data from the PNAD Contínua TIC (the ICT module of the Continuous National Household Sample Survey), run by IBGE (the Brazilian Institute of Geography and Statistics), from the 2024 and 2025 reports. The central question: who is still offline, and what does that mean for people who design 100% digital customer service?',
    tags: ['Data', 'IBGE', 'Data visualization', 'JavaScript', 'Python'],
    cta: 'Read the case study',
    status: 'Published on GitHub Pages',
    facts: [
      { label: 'Purpose', value: 'Open, interactive dashboard on internet access in Brazil' },
      { label: 'Technologies', chips: ['HTML', 'CSS', 'JavaScript', 'Python'] },
      { label: 'Data', value: 'IBGE PNAD Contínua TIC, 2024 and 2025 reports' },
      { label: 'Code', value: 'Public repository on GitHub', href: FDD_CODE },
      { label: 'Status', value: 'Published on GitHub Pages' },
      { label: 'License', value: 'MIT. The data belongs to IBGE.' },
    ],
    media: {
      alt: 'Screenshot of the Fora do Digital dashboard in dark theme. On the left, the title and the question about who is still offline in Brazil. On the right, a 10 by 10 grid of dots, where magenta dots represent the people who did not use the internet. Below, the first indicator cards.',
      demo: { label: 'View dashboard', href: FDD_DEMO },
      code: { label: 'Code', href: FDD_CODE },
      embedTitle: 'Fora do Digital dashboard',
      mobileNote: 'On small screens the dashboard is not embedded here. Open the full version in a new tab.',
    },
    sections: [
      {
        id: 'problema',
        title: 'The problem',
        blocks: [
          { k: 'p', v: 'People who design customer service often decide which channels exist and which ones go offline. That kind of decision tends to rely on the average of those who are already connected.' },
          { k: 'p', v: 'The dashboard asks: who is still offline in Brazil, and what does that mean for people who design 100% digital customer service?' },
          { k: 'p', v: 'I work with customer service and the ombudsman function. The dashboard brings both sides together: well-handled public data and a question that anyone who serves people needs to answer before making a channel 100% digital.' },
        ],
      },
      {
        id: 'fonte-dos-dados',
        title: 'Data source',
        blocks: [
          { k: 'p', v: 'The data is official and comes from the PNAD Contínua (the Continuous National Household Sample Survey), the IBGE (Brazilian Institute of Geography and Statistics) survey that measures internet access. The dashboard uses the ICT (Information and Communication Technology) module, from the 2024 and 2025 reports.' },
          { k: 'p', v: 'The figures were transcribed from the reports into a data file, and every series, breakdown and block points to the source it came from. The data belongs to IBGE.' },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'How it was built',
        blocks: [
          { k: 'p', v: 'The dashboard shows indicators (KPIs, the headline figures) with trends; breakdowns by region, urban and rural area, age, education, sex and color or race, one at a time; the reasons for not using the internet, for people and for households; what the internet is used for and which devices are used to get online; and a highlight comparing the average per capita income of households with and without internet. Income appears only in that highlight, not as a breakdown.' },
          {
            k: 'steps',
            items: [
              { title: 'Data', text: 'The data lives in a JSON file, with the source of each series.' },
              { title: 'Python', text: 'A Python script, using only the standard library, validates the data, calculates the derived values and generates the file the page reads.' },
              { title: 'Page', text: 'The page is plain HTML, CSS and JavaScript. The charts are custom SVG, with no charting library, no framework and no CDN.' },
              { title: 'Use', text: 'It works offline: you can open the page by double-clicking the file, with no server and no installation. The published version is on GitHub Pages.' },
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: 'Technical decisions',
        blocks: [
          {
            k: 'decisions',
            items: [
              { title: 'Plain JavaScript, no framework and no CDN', text: 'The dashboard has few screens and no dependencies to maintain. It works offline and will keep working years from now.' },
              { title: 'Data file generated from the JSON', text: 'Browsers block fetch on local files, so the data is loaded through a script tag and the page opens with a double click. The JSON remains the source of truth, and the automated validation blocks an outdated generated file.' },
              { title: 'Hand-drawn SVG charts', text: 'The axis respects the real spacing between years, series with missing years have dashed segments and null values become gaps. Focus, tooltips and keyboard use are also handled.' },
              { title: 'Calculations in Python, reading in JavaScript', text: 'Changes, differences and the percentages of people who are offline are calculated and tested in Python. The browser only displays them.' },
              { title: 'Dark theme by default', text: 'The theme preference is saved in the browser, with error handling for when storage is blocked.' },
            ],
          },
        ],
      },
      {
        id: 'validacao',
        title: 'How the data is validated',
        blocks: [
          { k: 'p', v: 'Every series, breakdown and block in the data file needs a source that exists in the list of sources. After that, the project follows four steps.' },
          {
            k: 'steps',
            items: [
              { title: 'Generate', text: 'The gerar_dados.py script validates the JSON, calculates the derived values and generates the file the dashboard reads.' },
              { title: 'Validate', text: 'The validar_dados.py script applies the data quality rules.' },
              { title: 'Test', text: 'Automated tests, written with unittest, cover the validator and the generator.' },
              { title: 'Repeat in CI', text: 'Continuous validation, run with GitHub Actions (the GitHub service that runs automated checks), repeats these steps and uses the --check option to confirm the generated file is up to date.' },
            ],
          },
          { k: 'p', v: 'Limitations: the PNAD Contínua is a sample survey, so the percentages have a margin of error. IBGE revises the series with each release, so points taken from the 2024 report may differ from the revised series. Years without data are not interpolated. Breakdowns are shown one at a time, because profiles cannot be combined without the microdata. The readings for customer service are recommendations from the project, not survey results.' },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            k: 'links',
            items: [
              { label: 'Published dashboard', href: FDD_DEMO, note: 'The dashboard is in Portuguese' },
              { label: 'Code on GitHub', href: FDD_CODE },
              { label: 'Methodology', href: FDD_METHOD, note: 'How each figure was obtained and calculated, in Portuguese' },
              { label: 'IBGE, PNAD Contínua, 2025 report (PDF, in Portuguese)', href: FDD_IBGE_2025 },
              { label: 'IBGE, PNAD Contínua, 2024 report (PDF, in Portuguese)', href: FDD_IBGE_2024 },
            ],
          },
          { k: 'p', v: 'MIT license. The data belongs to IBGE.' },
        ],
      },
    ],
  },
};

export const PROJETOS: Projeto[] = [
  {
    slug: 'assistente-de-carreira',
    pt: assistenteDeCarreira('pt'),
    en: assistenteDeCarreira('en'),
  },
  {
    slug: 'fora-do-digital',
    pt: FORA_DO_DIGITAL.pt,
    en: FORA_DO_DIGITAL.en,
    image: {
      src: '/images/projetos/fora-do-digital.webp',
      width: 1600,
      height: 1000,
      cardSrc: '/images/projetos/fora-do-digital-800.webp',
      cardWidth: 800,
      cardHeight: 500,
    },
    schema: { repo: FDD_CODE, language: ['JavaScript', 'Python'] },
  },
];

export const PROJETOS_INTRO: Record<Lang, string> = {
  pt: 'Estudos de caso dos meus projetos, com o problema, as decisões e o código.',
  en: 'Case studies of my projects, with the problem, the decisions and the code.',
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
        codeRepository: projeto.schema?.repo ?? LINKS.repo,
        programmingLanguage: projeto.schema?.language ?? 'TypeScript',
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
