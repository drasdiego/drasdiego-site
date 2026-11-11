import type { Lang } from '@/types';
import { LINKS } from './icons';
import { PRESENTATION } from './presentation';
import { projetosPath } from './site-nav';
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
  | { k: 'list'; items: string[] }
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

export interface ProjetoCardActions {
  demo: ProjetoLink;
  code: ProjetoLink;
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
  cardActions?: ProjetoCardActions;
  facts: ProjetoFact[];
  sections: ProjetoSection[];
  tryIt?: ProjetoTry;
  media?: ProjetoMedia;
}

export interface ProjetoCapa {
  src: string;
  width: number;
  height: number;
}

export interface Projeto {
  slug: string;
  image?: ProjetoImage;
  capa?: ProjetoCapa;
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
    codeLink: 'Código',
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
    codeLink: 'Code',
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
    cardActions: {
      demo: { label: u.tryIt, href: `${projetosPath(lang)}/assistente-de-carreira#experimente` },
      code: { label: u.codeLink, href: LINKS.repo },
    },
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
        id: 'o-que-o-painel-mostra',
        title: 'O que o painel mostra',
        blocks: [
          {
            k: 'list',
            items: [
              'Indicadores principais com tendência: pessoas que usaram a internet, pessoas sem internet (em milhões e em percentual), domicílios com internet, pessoas com celular para uso pessoal e pessoas de 60 anos ou mais online.',
              'Evolução do uso da internet nas áreas urbana e rural.',
              'Recortes de 2025 por região, área, idade, instrução, sexo e cor ou raça, um de cada vez.',
              'Motivos para não usar a internet, de pessoas e de domicílios, e motivos para não ter celular.',
              'Finalidades de uso da internet e equipamentos usados para acessar.',
              'Destaque com o rendimento médio mensal real per capita dos domicílios com e sem internet. A renda aparece só nesse destaque, não como recorte.',
              'Simulador "Sua base de clientes", tabela alternativa em cada gráfico e download dos dados em CSV.',
            ],
          },
        ],
      },
      {
        id: 'fonte-dos-dados',
        title: 'Fonte dos dados',
        blocks: [
          { k: 'p', v: 'Os dados são oficiais e vêm da PNAD Contínua (Pesquisa Nacional por Amostra de Domicílios Contínua), a pesquisa do IBGE (Instituto Brasileiro de Geografia e Estatística) que mede o acesso à internet. O painel usa o módulo TIC (Tecnologia da Informação e Comunicação), a partir dos informativos de 2024 e 2025.' },
          { k: 'p', v: 'Os números foram transcritos dos informativos para um arquivo de dados, e cada série, recorte e bloco aponta para a fonte de onde veio. Os dados pertencem ao IBGE.' },
          { k: 'p', v: 'O projeto usa somente publicações do IBGE como fonte.' },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'Como foi construído',
        blocks: [
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
          { k: 'p', v: 'Limitações: a PNAD Contínua é uma pesquisa por amostra, então os percentuais têm margem de erro. O IBGE revisa a série a cada divulgação: os pontos de 2016 (urbano e rural) e de 2023 vêm do informativo de 2024 e podem diferir da série revisada. Os anos sem dado não são interpolados. Os recortes são mostrados um de cada vez, porque não dá para combinar perfis sem os microdados. As leituras para atendimento são recomendações do projeto, não resultados da pesquisa.' },
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
        id: 'o-que-o-painel-mostra',
        title: 'What the dashboard shows',
        blocks: [
          {
            k: 'list',
            items: [
              'Headline indicators with trends: people who used the internet, people without internet (in millions and as a percentage), households with internet, people with a mobile phone for personal use and people aged 60 or over who are online.',
              'How internet use has changed in urban and rural areas.',
              '2025 breakdowns by region, area, age, education, sex and color or race, one at a time.',
              'Reasons for not using the internet, for people and for households, and reasons for not having a mobile phone.',
              'What the internet is used for and which devices are used to get online.',
              'A highlight with the real average monthly per capita income of households with and without internet. Income appears only in that highlight, not as a breakdown.',
              'A "Sua base de clientes" (your customer base) simulator, an alternative table for every chart and a CSV download of the data.',
            ],
          },
        ],
      },
      {
        id: 'fonte-dos-dados',
        title: 'Data source',
        blocks: [
          { k: 'p', v: 'The data is official and comes from the PNAD Contínua (the Continuous National Household Sample Survey), the IBGE (Brazilian Institute of Geography and Statistics) survey that measures internet access. The dashboard uses the ICT (Information and Communication Technology) module, from the 2024 and 2025 reports.' },
          { k: 'p', v: 'The figures were transcribed from the reports into a data file, and every series, breakdown and block points to the source it came from. The data belongs to IBGE.' },
          { k: 'p', v: 'The project uses only IBGE publications as sources.' },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'How it was built',
        blocks: [
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
          { k: 'p', v: 'Limitations: the PNAD Contínua is a sample survey, so the percentages have a margin of error. IBGE revises the series with each release: the 2016 points (urban and rural) and the 2023 points come from the 2024 report and may differ from the revised series. Years without data are not interpolated. Breakdowns are shown one at a time, because profiles cannot be combined without the microdata. The readings for customer service are recommendations from the project, not survey results.' },
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

const BA_DEMO = 'https://portfolio-brasa-alta.pages.dev/';
const BA_CODE = 'https://github.com/drasdiego/portfolio-brasa-alta';
const BA_PESQUISA = 'https://github.com/drasdiego/portfolio-brasa-alta/blob/main/pesquisa-cardapio.md';

const BRASA_ALTA: Record<Lang, ProjetoText> = {
  pt: {
    title: 'Brasa Alta',
    short: 'Site conceitual de uma hamburgueria fictícia na brasa, com cardápio, busca, pedido montável e atendimento simulado por mensagem.',
    lead: 'Site conceitual de uma hamburgueria fictícia na brasa, com cardápio, busca, pedido montável e atendimento simulado por mensagem. Brasa Alta é uma marca fictícia: marca, imagens e vídeo foram criados com IA, o endereço e os preços são fictícios e nenhuma mensagem sai do site.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    cta: 'Ver estudo de caso',
    status: 'Publicado na Cloudflare Pages',
    facts: [
      { label: 'Aplicação', value: 'Site de restaurante com cardápio, busca e pedido montável' },
      { label: 'Tecnologias', chips: ['HTML', 'CSS', 'JavaScript'] },
      { label: 'Marca e imagens', value: 'Marca fictícia. Marca, fotos e vídeo gerados com IA' },
      { label: 'Código', value: 'Repositório público no GitHub', href: BA_CODE },
      { label: 'Status', value: 'Publicado na Cloudflare Pages' },
    ],
    media: {
      alt: 'Captura de tela do site Brasa Alta. No topo, um aviso de que é um projeto de portfólio com marca e imagens criadas com IA. Abaixo, o menu com Cardápio, Na casa e Endereço e o botão Bandeja. Sobre a imagem de um hambúrguer na grelha, o título Brasa Alta, o horário de funcionamento e o botão Montar meu pedido.',
      demo: { label: 'Ver site', href: BA_DEMO },
      code: { label: 'Código', href: BA_CODE },
      embedTitle: 'Site Brasa Alta',
      mobileNote: 'Em telas pequenas o site não é incorporado aqui. Abra a versão completa em outra aba.',
    },
    sections: [
      {
        id: 'o-projeto',
        title: 'O projeto',
        blocks: [
          { k: 'p', v: 'O Brasa Alta mostra como eu construo um site de restaurante completo: o visitante lê o cardápio, busca um item, monta o pedido e vê como seria o atendimento por mensagem.' },
          { k: 'p', v: 'A marca é fictícia e foi criada para este projeto. O endereço e os preços também são fictícios, com referência em hamburguerias artesanais da região Sul do Brasil em 2026. O envio do pedido é uma simulação: nenhuma mensagem sai do site.' },
        ],
      },
      {
        id: 'o-que-o-site-faz',
        title: 'O que o site faz',
        blocks: [
          {
            k: 'list',
            items: [
              'Cardápio de 51 itens em 9 categorias, gerado a partir de uma lista de dados, com barra de categorias fixa que acompanha a rolagem.',
              'Busca sem acento e sem diferenciar maiúsculas, por nome, descrição, categoria e etiqueta.',
              'Bandeja de pedido: o botão Adicionar vira controle de quantidade, os chopes têm seletor de 300 e 500 ml, e o total, a observação e a forma de retirada aparecem em tempo real. No celular, a bandeja é uma folha arrastável.',
              'Envio simulado: o pedido vira uma conversa com resposta da casa, que muda conforme o horário de Brasília, a forma de retirada e a presença de bebida alcoólica.',
              'Chat com respostas prontas: horário calculado na hora, endereço, tempo de retirada, opções vegetarianas e chopes, tudo lido dos mesmos dados do cardápio.',
              'Desfazer por 10 segundos, com atalho de teclado (Ctrl+Z ou Cmd+Z).',
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: 'Decisões de design',
        blocks: [
          {
            k: 'decisions',
            items: [
              { title: 'Conceito', text: 'O papel kraft da bandeja vira a página. O vídeo da grelha abre o site e o cardápio aparece logo na primeira rolagem.' },
              { title: 'Tipografia', text: 'Big Shoulders Display nos títulos, condensada como um letreiro pintado, e Archivo no texto. As fontes são servidas pelo próprio site.' },
              { title: 'Movimento', text: 'Trechos do vídeo viram fotos vivas que só tocam quando estão na tela, e um disco voa até a bandeja ao adicionar um item. Tudo para quando o sistema está com a preferência de reduzir movimento.' },
              { title: 'Cara de produto', text: 'Linhas de cardápio impresso em vez de cartões, estados reais (vazio, removido, desfazer, nada encontrado) e textos escritos como um cardápio de verdade.' },
            ],
          },
        ],
      },
      {
        id: 'acessibilidade',
        title: 'Acessibilidade e qualidade',
        blocks: [
          {
            k: 'list',
            items: [
              'Contraste verificado por par de cores (WCAG), alvos de toque de 44 px, foco visível e uma única região de anúncio para leitor de tela.',
              'Testado no Chrome em 320, 360, 390, 768 e 1440 px e em paisagem, sem rolagem horizontal e sem erros no console.',
              'Revisão independente em três rodadas.',
            ],
          },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'Como foi construído',
        blocks: [
          {
            k: 'steps',
            items: [
              { title: 'Página', text: 'HTML, CSS e JavaScript puros, sem framework e sem dependência externa em tempo de execução.' },
              { title: 'Dados', text: 'O cardápio, a busca, a bandeja e o chat leem a mesma lista de dados.' },
              { title: 'Imagens', text: 'Marca, fotos e vídeo foram gerados com IA. A pesquisa de preços e de cardápio que embasou os valores está no repositório.' },
              { title: 'Publicação', text: 'O site está hospedado na Cloudflare Pages.' },
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            k: 'links',
            items: [
              { label: 'Site publicado', href: BA_DEMO },
              { label: 'Código no GitHub', href: BA_CODE },
              { label: 'Pesquisa de cardápio e preços', href: BA_PESQUISA, note: 'O que embasou os valores fictícios' },
            ],
          },
          { k: 'p', v: 'As fontes Big Shoulders Display e Archivo usam a licença SIL Open Font License.' },
        ],
      },
    ],
  },
  en: {
    title: 'Brasa Alta',
    short: 'A concept website for a fictional wood-fired burger restaurant, with a menu, search, a build-your-order tray and simulated customer service by message.',
    lead: 'A concept website for a fictional wood-fired burger restaurant, with a menu, search, a build-your-order tray and simulated customer service by message. Brasa Alta is a fictional brand: the brand, images and video were created with AI, the address and prices are fictional and no message ever leaves the site.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    cta: 'Read the case study',
    status: 'Published on Cloudflare Pages',
    facts: [
      { label: 'Purpose', value: 'Restaurant website with a menu, search and a build-your-order tray' },
      { label: 'Technologies', chips: ['HTML', 'CSS', 'JavaScript'] },
      { label: 'Brand and images', value: 'Fictional brand. Brand, photos and video generated with AI' },
      { label: 'Code', value: 'Public repository on GitHub', href: BA_CODE },
      { label: 'Status', value: 'Published on Cloudflare Pages' },
    ],
    media: {
      alt: 'Screenshot of the Brasa Alta website. At the top, a notice that it is a portfolio project with a brand and images created with AI. Below, the menu with Cardápio, Na casa and Endereço and the Bandeja button. Over the image of a burger on the grill, the title Brasa Alta, the opening hours and the Montar meu pedido button.',
      demo: { label: 'View site', href: BA_DEMO },
      code: { label: 'Code', href: BA_CODE },
      embedTitle: 'Brasa Alta website',
      mobileNote: 'On small screens the site is not embedded here. Open the full version in a new tab.',
    },
    sections: [
      {
        id: 'o-projeto',
        title: 'The project',
        blocks: [
          { k: 'p', v: 'Brasa Alta shows how I build a complete restaurant website: the visitor reads the menu, searches for an item, builds the order and sees what customer service by message would look like.' },
          { k: 'p', v: 'The brand is fictional and was created for this project. The address and prices are also fictional, based on craft burger restaurants in southern Brazil in 2026. Sending the order is a simulation: no message ever leaves the site.' },
        ],
      },
      {
        id: 'o-que-o-site-faz',
        title: 'What the site does',
        blocks: [
          {
            k: 'list',
            items: [
              'A menu of 51 items in 9 categories, generated from a data list, with a fixed category bar that follows the scroll.',
              'Search that ignores accents and letter case, by name, description, category and tag.',
              'Order tray: the Adicionar (add) button becomes a quantity control, draft beers have a 300 and 500 ml selector, and the total, the note and the pickup option update in real time. On mobile, the tray is a draggable sheet.',
              'Simulated sending: the order becomes a conversation with a reply from the restaurant, which changes with Brasília time, the pickup option and whether there is an alcoholic drink.',
              'Chat with ready-made answers: opening hours calculated on the spot, address, pickup time, vegetarian options and draft beers, all read from the same menu data.',
              'Undo for 10 seconds, with a keyboard shortcut (Ctrl+Z or Cmd+Z).',
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: 'Design decisions',
        blocks: [
          {
            k: 'decisions',
            items: [
              { title: 'Concept', text: 'The kraft paper of the tray becomes the page. The grill video opens the site and the menu appears on the very first scroll.' },
              { title: 'Typography', text: 'Big Shoulders Display for headings, condensed like a painted sign, and Archivo for text. The fonts are served by the site itself.' },
              { title: 'Motion', text: 'Clips from the video become live photos that only play while on screen, and a disc flies to the tray when you add an item. Everything stops when the system is set to reduce motion.' },
              { title: 'Product feel', text: 'Printed-menu lines instead of cards, real states (empty, removed, undo, nothing found) and copy written like a real menu.' },
            ],
          },
        ],
      },
      {
        id: 'acessibilidade',
        title: 'Accessibility and quality',
        blocks: [
          {
            k: 'list',
            items: [
              'Contrast checked per color pair (WCAG), 44 px touch targets, visible focus and a single announcement region for screen readers.',
              'Tested in Chrome at 320, 360, 390, 768 and 1440 px and in landscape, with no horizontal scrolling and no console errors.',
              'Independent review in three rounds.',
            ],
          },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'How it was built',
        blocks: [
          {
            k: 'steps',
            items: [
              { title: 'Page', text: 'Plain HTML, CSS and JavaScript, with no framework and no external runtime dependency.' },
              { title: 'Data', text: 'The menu, the search, the tray and the chat read the same data list.' },
              { title: 'Images', text: 'The brand, photos and video were generated with AI. The price and menu research behind the values is in the repository.' },
              { title: 'Publishing', text: 'The site is hosted on Cloudflare Pages.' },
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            k: 'links',
            items: [
              { label: 'Published site', href: BA_DEMO, note: 'The site is in Portuguese' },
              { label: 'Code on GitHub', href: BA_CODE },
              { label: 'Menu and price research', href: BA_PESQUISA, note: 'What the fictional values are based on, in Portuguese' },
            ],
          },
          { k: 'p', v: 'The Big Shoulders Display and Archivo fonts use the SIL Open Font License.' },
        ],
      },
    ],
  },
};

const OUV_DEMO = 'https://drasdiego.github.io/ouvidometro/painel/#painel';
const OUV_CODE = 'https://github.com/drasdiego/ouvidometro';
const OUV_CGU = 'https://www.gov.br/cgu/pt-br/acesso-a-informacao/dados-abertos/arquivos/ouvidoria';

const OUVIDOMETRO: Record<Lang, ProjetoText> = {
  pt: {
    title: 'Ouvidômetro',
    short: 'Painel interativo sobre prazo e atraso nas manifestações de ouvidoria registradas no Fala.BR, com dados abertos da Controladoria-Geral da União (CGU).',
    lead: 'Painel interativo sobre prazo e atraso nas manifestações de ouvidoria registradas no Fala.BR, a plataforma de ouvidoria do governo federal, com dados abertos da Controladoria-Geral da União (CGU). Ele mede como os órgãos públicos respondem ao cidadão: quanto tempo levam, quanto fica fora do prazo e onde as pendências se acumulam.',
    tags: ['Dados', 'Python', 'DuckDB', 'D3', 'JavaScript'],
    cta: 'Ver estudo de caso',
    status: 'Publicado no GitHub Pages',
    facts: [
      { label: 'Aplicação', value: 'Painel interativo sobre prazo de resposta em ouvidorias públicas' },
      { label: 'Tecnologias', chips: ['Python', 'DuckDB', 'HTML', 'CSS', 'JavaScript', 'D3'] },
      { label: 'Dados', value: 'Arquivo público de manifestações de ouvidoria da CGU, de janeiro de 2015 a agosto de 2026' },
      { label: 'Código', value: 'Repositório público no GitHub', href: OUV_CODE },
      { label: 'Status', value: 'Publicado no GitHub Pages' },
    ],
    media: {
      alt: 'Captura de tela do painel Ouvidômetro, em tema escuro. À esquerda, o título e a pergunta sobre se os órgãos públicos respondem ao cidadão no prazo que a lei manda. À direita, uma grade de 10 por 10 pontos, em que os pontos em magenta representam as manifestações que ficaram fora do prazo.',
      demo: { label: 'Ver painel', href: OUV_DEMO },
      code: { label: 'Código', href: OUV_CODE },
      embedTitle: 'Painel Ouvidômetro',
      mobileNote: 'Em telas pequenas o painel não é incorporado aqui. Abra a versão completa em outra aba.',
    },
    sections: [
      {
        id: 'problema',
        title: 'O problema',
        blocks: [
          { k: 'p', v: 'O painel mede como os órgãos públicos respondem às manifestações dos cidadãos. A pergunta de fundo é a de quem gere uma ouvidoria pública: onde agir primeiro.' },
          {
            k: 'list',
            items: [
              'O prazo da lei é cumprido, e isso melhorou?',
              'Quanto tempo o cidadão espera pela resposta?',
              'O que está pendente com o prazo vencido?',
              'Em que esfera, tipo, UF e assunto o prazo mais estoura?',
              'Quais órgãos precisam de atenção primeiro?',
              'A demanda foi atendida, e o atraso pesa na satisfação?',
            ],
          },
        ],
      },
      {
        id: 'base-legal',
        title: 'Base legal',
        blocks: [
          { k: 'p', v: 'O painel confronta os dados com as regras de ouvidoria do setor público.' },
          {
            k: 'list',
            items: [
              'Decreto 9.492/2018, art. 18: resposta conclusiva em 30 dias, prorrogável uma vez por mais 30, com justificativa. O pedido de complementação suspende o prazo.',
              'Decreto 9.492/2018, art. 3º: definições de reclamação, denúncia, elogio, sugestão e solicitação.',
              'Decreto 9.492/2018, art. 16: uso obrigatório do e-Ouv (hoje Fala.BR) pelos órgãos federais.',
              'Lei 13.460/2017: direitos do usuário de serviços públicos e medição anual da satisfação.',
            ],
          },
          { k: 'p', v: 'O próprio painel traz uma tabela que liga cada regra ao indicador que a confere e uma seção de dúvidas frequentes.' },
        ],
      },
      {
        id: 'fonte-dos-dados',
        title: 'Fonte dos dados',
        blocks: [
          { k: 'p', v: 'Os dados vêm do arquivo público de manifestações de ouvidoria da CGU, atualizado todo mês. O arquivo usado foi gerado em 01/09/2026 e traz um CSV por ano, com datas de registro, prazo e resposta, tipo, órgão, assunto, situação, esfera e pesquisa de satisfação.' },
          { k: 'p', v: 'O recorte vai de janeiro de 2015 a 31/08/2026, com 8.752.496 manifestações. O recorte principal do painel são os últimos 12 meses completos, comparados aos 12 anteriores.' },
          { k: 'p', v: 'Os dados brutos não vão para o repositório, só os indicadores agregados.' },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'Como foi construído',
        blocks: [
          {
            k: 'steps',
            items: [
              { title: 'Preparar', text: 'Um script em Python baixa o arquivo da CGU, converte os CSVs de Latin-1 para UTF-8 e grava um arquivo Parquet por ano.' },
              { title: 'Agregar', text: 'Outro script agrega a base com DuckDB por mês, esfera, tipo, UF, órgão e assunto e grava o arquivo de dados que alimenta os filtros do painel.' },
              { title: 'Resumir', text: 'Um terceiro script grava o resumo dos últimos 12 meses em JSON e CSV, para quem quiser os números fora do painel.' },
              { title: 'Painel', text: 'O painel é feito em HTML, CSS e JavaScript, com gráficos em D3. Tem filtros de período, esfera, tipo e UF, clique nas barras para filtrar e busca de órgão, e funciona sem internet.' },
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: 'Como o painel foi pensado',
        blocks: [
          {
            k: 'decisions',
            items: [
              { title: 'Uma pergunta por seção', text: 'Cada seção responde a uma pergunta de decisão, e não só exibe números.' },
              { title: 'Cor de alerta', text: 'A cor diz onde olhar primeiro: verde abaixo da média, amarelo até o dobro e vermelho acima do dobro.' },
              { title: 'Mediana e percentil 90', text: 'A mediana mostra o caso típico, e o percentil 90 mostra quem espera demais.' },
              { title: 'Pendências com idade', text: 'O painel mostra há quanto tempo cada pendência está vencida, e não só a contagem.' },
              { title: 'Denominador à vista', text: 'Toda proporção traz o denominador, e a data de corte fica visível.' },
              { title: 'Ranking por taxa', text: 'Os órgãos são ordenados por taxa, com volume mínimo, para não punir quem recebe mais manifestações.' },
            ],
          },
        ],
      },
      {
        id: 'limitacoes',
        title: 'Limitações',
        blocks: [
          {
            k: 'list',
            items: [
              'O campo de dias de atraso do arquivo só vem preenchido para manifestações sem resposta. Por isso o atraso foi calculado pelas datas.',
              'Nos meses mais recentes há mais manifestações em aberto, então a mediana e o percentil 90 de dias ficam um pouco abaixo do real.',
              'A pesquisa de satisfação é opcional: no período, menos de 4% das manifestações têm resposta, com peso maior de quem ficou insatisfeito.',
              'Os campos de perfil do manifestante têm mais de 80% de vazios e ficaram fora.',
              'A base inclui estados e municípios que aderiram ao Fala.BR, e não todos os órgãos do país.',
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            k: 'links',
            items: [
              { label: 'Painel publicado', href: OUV_DEMO },
              { label: 'Código no GitHub', href: OUV_CODE, note: 'Com o passo a passo para reproduzir cada número' },
              { label: 'CGU, dados abertos de ouvidoria', href: OUV_CGU },
            ],
          },
          { k: 'p', v: 'Painel independente, sem vínculo com a CGU. Os dados pertencem à CGU. A biblioteca D3 usa a licença ISC.' },
        ],
      },
    ],
  },
  en: {
    title: 'Ouvidômetro',
    short: 'An interactive dashboard on deadlines and delays in ombudsman requests filed on Fala.BR, built with open data from Brazil’s Office of the Comptroller General (CGU).',
    lead: 'An interactive dashboard on deadlines and delays in ombudsman requests filed on Fala.BR, the Brazilian federal government’s ombudsman platform, built with open data from the Office of the Comptroller General (CGU). It measures how public bodies respond to citizens: how long they take, how much goes past the deadline and where pending requests pile up.',
    tags: ['Data', 'Python', 'DuckDB', 'D3', 'JavaScript'],
    cta: 'Read the case study',
    status: 'Published on GitHub Pages',
    facts: [
      { label: 'Purpose', value: 'Interactive dashboard on response deadlines in public ombudsman offices' },
      { label: 'Technologies', chips: ['Python', 'DuckDB', 'HTML', 'CSS', 'JavaScript', 'D3'] },
      { label: 'Data', value: 'CGU public file of ombudsman requests, from January 2015 to August 2026' },
      { label: 'Code', value: 'Public repository on GitHub', href: OUV_CODE },
      { label: 'Status', value: 'Published on GitHub Pages' },
    ],
    media: {
      alt: 'Screenshot of the Ouvidômetro dashboard in dark theme. On the left, the title and the question about whether public bodies respond to citizens within the legal deadline. On the right, a 10 by 10 grid of dots, where magenta dots represent the requests that went past the deadline.',
      demo: { label: 'View dashboard', href: OUV_DEMO },
      code: { label: 'Code', href: OUV_CODE },
      embedTitle: 'Ouvidômetro dashboard',
      mobileNote: 'On small screens the dashboard is not embedded here. Open the full version in a new tab.',
    },
    sections: [
      {
        id: 'problema',
        title: 'The problem',
        blocks: [
          { k: 'p', v: 'The dashboard measures how public bodies respond to requests from citizens. The underlying question is the one a public ombudsman manager asks: where to act first.' },
          {
            k: 'list',
            items: [
              'Is the legal deadline met, and has that improved?',
              'How long does the citizen wait for a response?',
              'What is pending past the deadline?',
              'In which sphere of government, request type, state and subject is the deadline missed most?',
              'Which bodies need attention first?',
              'Was the request resolved, and does the delay weigh on satisfaction?',
            ],
          },
        ],
      },
      {
        id: 'base-legal',
        title: 'Legal basis',
        blocks: [
          { k: 'p', v: 'The dashboard checks the data against Brazil’s public-sector ombudsman rules.' },
          {
            k: 'list',
            items: [
              'Decree 9,492/2018, article 18: a conclusive response within 30 days, extendable once for another 30, with justification. A request for more information suspends the deadline.',
              'Decree 9,492/2018, article 3: definitions of complaint, report, compliment, suggestion and request.',
              'Decree 9,492/2018, article 16: mandatory use of e-Ouv (now Fala.BR) by federal bodies.',
              'Law 13,460/2017: rights of users of public services and yearly measurement of satisfaction.',
            ],
          },
          { k: 'p', v: 'The dashboard itself has a table linking each rule to the indicator that checks it, and a frequently asked questions section.' },
        ],
      },
      {
        id: 'fonte-dos-dados',
        title: 'Data source',
        blocks: [
          { k: 'p', v: 'The data comes from CGU’s public file of ombudsman requests, updated every month. The file used was generated on September 1, 2026 and has one CSV per year, with filing, deadline and response dates, type, body, subject, status, sphere of government and satisfaction survey.' },
          { k: 'p', v: 'The dataset runs from January 2015 to August 31, 2026, with 8,752,496 requests. The dashboard’s main window is the last 12 full months, compared with the previous 12.' },
          { k: 'p', v: 'The raw data does not go into the repository, only the aggregated indicators.' },
        ],
      },
      {
        id: 'como-foi-construido',
        title: 'How it was built',
        blocks: [
          {
            k: 'steps',
            items: [
              { title: 'Prepare', text: 'A Python script downloads the CGU file, converts the CSVs from Latin-1 to UTF-8 and writes one Parquet file per year.' },
              { title: 'Aggregate', text: 'Another script aggregates the data with DuckDB by month, sphere, type, state, body and subject and writes the data file that feeds the dashboard filters.' },
              { title: 'Summarize', text: 'A third script writes the summary of the last 12 months to JSON and CSV, for anyone who wants the figures outside the dashboard.' },
              { title: 'Dashboard', text: 'The dashboard is built with HTML, CSS and JavaScript, with D3 charts. It has filters for period, sphere, type and state, click-to-filter bars and a search for bodies, and it works offline.' },
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: 'How the dashboard was designed',
        blocks: [
          {
            k: 'decisions',
            items: [
              { title: 'One question per section', text: 'Each section answers a decision question instead of only showing numbers.' },
              { title: 'Alert color', text: 'Color tells you where to look first: green below the average, yellow up to twice the average and red above that.' },
              { title: 'Median and 90th percentile', text: 'The median shows the typical case, and the 90th percentile shows who waits too long.' },
              { title: 'Pending requests with age', text: 'The dashboard shows how long each pending request has been overdue, not just the count.' },
              { title: 'Denominator in view', text: 'Every proportion shows its denominator, and the cutoff date stays visible.' },
              { title: 'Ranking by rate', text: 'Bodies are ranked by rate, with a minimum volume, so that those receiving more requests are not penalized.' },
            ],
          },
        ],
      },
      {
        id: 'limitacoes',
        title: 'Limitations',
        blocks: [
          {
            k: 'list',
            items: [
              'The file’s days-overdue field is only filled in for requests without a response. That is why the delay was calculated from the dates.',
              'In the most recent months more requests are still open, so the median and 90th percentile of days are slightly below the real values.',
              'The satisfaction survey is optional: in the period, fewer than 4% of requests have an answer, weighted toward people who were dissatisfied.',
              'The requester profile fields are more than 80% empty and were left out.',
              'The dataset includes the states and municipalities that joined Fala.BR, not every public body in the country.',
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            k: 'links',
            items: [
              { label: 'Published dashboard', href: OUV_DEMO, note: 'The dashboard is in Portuguese' },
              { label: 'Code on GitHub', href: OUV_CODE, note: 'With the steps to reproduce every figure, in Portuguese' },
              { label: 'CGU, open ombudsman data (in Portuguese)', href: OUV_CGU },
            ],
          },
          { k: 'p', v: 'Independent dashboard, not affiliated with CGU. The data belongs to CGU. The D3 library uses the ISC license.' },
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
    capa: { src: '/images/projetos/capa-fora-do-digital.webp', width: 1200, height: 627 },
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
  {
    slug: 'brasa-alta',
    capa: { src: '/images/projetos/capa-brasa-alta.webp', width: 1200, height: 627 },
    pt: BRASA_ALTA.pt,
    en: BRASA_ALTA.en,
    image: {
      src: '/images/projetos/brasa-alta.webp',
      width: 1440,
      height: 900,
      cardSrc: '/images/projetos/brasa-alta-800.webp',
      cardWidth: 800,
      cardHeight: 500,
    },
    schema: { repo: BA_CODE, language: ['JavaScript', 'HTML', 'CSS'] },
  },
  {
    slug: 'ouvidometro',
    capa: { src: '/images/projetos/capa-ouvidometro.webp', width: 1200, height: 627 },
    pt: OUVIDOMETRO.pt,
    en: OUVIDOMETRO.en,
    image: {
      src: '/images/projetos/ouvidometro.webp',
      width: 1440,
      height: 900,
      cardSrc: '/images/projetos/ouvidometro-800.webp',
      cardWidth: 800,
      cardHeight: 500,
    },
    schema: { repo: OUV_CODE, language: ['Python', 'JavaScript'] },
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
