import type { Guide } from './blog';

const PEDIDO_OFICIAL = "I want to add rate limiting to the public API but haven't thought it through yet. Interview me until you could write the spec, then write it to SPEC.md.";
const PEDIDO_PT = "Quero montar [descreva aqui o que você quer], mas ainda não pensei direito. Me entreviste até conseguir escrever a especificação e grave em SPEC.md.";
const PEDIDO_RELATORIO = "Quero montar um relatório mensal de vendas, mas ainda não pensei direito. Me entreviste até conseguir escrever a especificação e grave em SPEC.md.";
const PEDIDO_AUTOMACAO = "Quero automatizar o envio semanal de um resumo por e-mail, mas ainda não pensei direito. Me entreviste até conseguir escrever a especificação e grave em SPEC.md.";

const URL_BOAS_PRATICAS = 'https://code.claude.com/docs/en/best-practices';

export const CLAUDE_ENTREVISTA: Guide = {
  slug: 'claude-te-entrevista-spec',
  category: 'claude-code',
  keyword: 'ENTREVISTA',
  published: '2026-11-19',
  pt: {
    title: 'Deixe o Claude te entrevistar: o pedido pronto para relatório e automação',
    short: 'Claude te entrevista',
    lead: 'Quando você não sabe o que pedir, peça que o Claude pergunte. O pedido oficial, em inglês e em português, e o que fazer com o SPEC.md.',
    description: 'O pedido da documentação do Claude Code para o Claude te entrevistar e gravar uma especificação em SPEC.md, a tradução em português, dois exemplos adaptados para relatório e automação e o que fazer com o arquivo.',
    facts: ['claude code', 'especificação', 'SPEC.md'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'O pedido oficial vem da página de boas práticas do Claude Code, conferida em 18/11/2026 (a página não mostra data de atualização). Os pedidos em português e os adaptados para relatório e automação são ideias nossas, não texto da documentação. O pedido em inglês, com o assunto relatório mensal de vendas, foi rodado no Mac do autor (Claude Code 2.1.319, modelo haiku, modo `-p`, pasta vazia), e o pedido em português com o mesmo assunto foi rodado numa conferência independente em 18/11/2026. Em nenhum dos testes o `SPEC.md` foi criado: no modo `-p` a pergunta fica sem resposta. Esse teste rodou com as configurações pessoais do autor, então o formato das perguntas na sua tela pode ser outro. O guia não tem vínculo com a Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Claude Code: o assistente de programação da Anthropic que roda no terminal.',
              'Especificação (spec): a descrição do que será feito, escrita antes de começar a construir (explicação nossa).',
              'SPEC.md: o arquivo de texto onde o pedido manda o Claude gravar a especificação.',
              'Sessão: uma conversa com o Claude Code. Uma sessão nova começa sem o histórico da anterior, com o contexto limpo.',
              'Definição de pronto: a lista do que precisa estar feito para você considerar a tarefa concluída.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que a documentação diz',
        blocks: [
          {
            k: 'ul',
            items: [
              'Entre as causas comuns de uma sessão que não saiu como esperado, a página lista que o Claude construiu algo diferente do que você tinha em mente, por faltar informação que ele não consegue tirar do repositório. Ligar isso a pedido vago é leitura nossa.',
              'Quando você ainda não sabe bem o que quer, a recomendação é pedir que o Claude te entreviste.',
              'O Claude volta com perguntas de múltipla escolha sobre as partes que você ainda não definiu e continua perguntando até as respostas formarem uma especificação.',
              'Com o `SPEC.md` pronto, a página manda começar uma sessão nova para construir a partir dele, para a construção começar com o contexto limpo e uma definição de pronto por escrito.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'O pedido, com o seu assunto',
        blocks: [
          { k: 'p', v: 'Este é o pedido oficial, em inglês. Ele começa com o assunto (na documentação, um limite de acessos de uma API). Troque o assunto pelo seu.' },
          { k: 'code', label: 'Pedido da documentação (texto oficial, em inglês)', text: PEDIDO_OFICIAL },
          { k: 'p', v: 'Em português, a tradução nossa do mesmo pedido. Troque o trecho entre colchetes pelo seu assunto:' },
          { k: 'code', label: 'Pedido em português (tradução nossa, testado no Claude Code 2.1.319)', text: PEDIDO_PT },
          { k: 'p', v: 'Sem o assunto, o Claude não tem sobre o que entrevistar. Por isso o pedido começa dizendo o que você quer.' },
        ],
      },
      {
        n: '3',
        title: 'Dois exemplos adaptados (ideia nossa)',
        blocks: [
          { k: 'p', v: 'A documentação só traz o exemplo da API. Os dois abaixo seguem o mesmo formato, com assuntos que a maioria das pessoas reconhece. O de relatório foi o que o autor rodou no teste; o de automação não foi executado.' },
          { k: 'code', label: 'Relatório (adaptado, testado no Claude Code 2.1.319)', text: PEDIDO_RELATORIO },
          { k: 'code', label: 'Automação (adaptado, não executado)', text: PEDIDO_AUTOMACAO },
        ],
      },
      {
        n: '4',
        title: 'Responda as perguntas e confira o SPEC.md',
        blocks: [
          {
            k: 'ul',
            items: [
              'Responda uma pergunta de cada vez. No teste, o Claude começou por perguntas sobre quem lê o relatório e para qual decisão. O formato muda de uma execução para outra: pode vir com opções numeradas ou como lista de perguntas.',
              'Se nenhuma opção servir, escreva a sua resposta. O formato das perguntas pode variar com a versão e com as suas configurações.',
              'No fim, abra o `SPEC.md` e leia: ele é a sua definição de pronto. Corrija o que não for o que você quer antes de construir.',
              'Abra uma sessão nova e peça para construir a partir do `SPEC.md`, como a documentação manda.',
            ],
          },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Pedido vago pode gerar algo diferente do que você imaginava.',
              'Peça: "me entreviste até conseguir escrever a especificação e grave em SPEC.md", com o seu assunto no começo.',
              'O Claude faz perguntas de múltipla escolha até as respostas formarem a especificação.',
              'Com o `SPEC.md` pronto, abra uma sessão nova e construa a partir dele.',
              'Relatório e automação são adaptações nossas do exemplo da documentação.',
            ],
          },
        ],
      },
      {
        title: 'Mito x verdade',
        blocks: [
          {
            k: 'ul',
            items: [
              'Mito: "o Claude precisa de um pedido perfeito para começar". Verdade: a documentação recomenda pedir que ele te entreviste quando a ideia ainda está solta.',
              'Mito: "o pedido funciona sem dizer o assunto". Verdade: o pedido oficial começa com o que você quer; sem isso, não há sobre o que perguntar.',
              'Mito: "depois da entrevista, continue na mesma sessão". Verdade: a documentação manda abrir uma sessão nova para construir a partir do `SPEC.md`.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Best practices for Claude Code](${URL_BOAS_PRATICAS}) (seção Brainstorm with Claude first).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com a Anthropic.' },
        ],
      },
    ],
  },
  en: {
    title: 'Let Claude interview you: the ready-made prompt for reports and automations',
    short: 'Claude interviews you',
    lead: 'When you do not know what to ask for, ask Claude to ask you. The official prompt, in English and in Portuguese, and what to do with SPEC.md.',
    description: 'The Claude Code documentation prompt that makes Claude interview you and write a specification to SPEC.md, the Portuguese translation, two adapted examples for a report and an automation, and what to do with the file.',
    facts: ['claude code', 'specification', 'SPEC.md'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The official prompt comes from the Claude Code best practices page, checked on November 18, 2026 (the page shows no update date). The Portuguese prompts and the ones adapted for a report and an automation are ideas of ours, not documentation text. The English prompt, with the subject monthly sales report, was run on the author’s Mac (Claude Code 2.1.319, haiku model, `-p` mode, empty folder), and the Portuguese prompt with the same subject was run in an independent check on November 18, 2026. In neither test was `SPEC.md` created: in `-p` mode the question is left unanswered. That test ran with the author’s personal settings, so the format of the questions on your screen may be different. This guide is not affiliated with Anthropic.' },
          { k: 'p', v: 'The prompts inside the code blocks that are in Portuguese (the translation and the two adapted ones) stay in Portuguese. They are examples, and the tool also accepts the prompt in English: you can use the official one, or write yours in English.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Claude Code: Anthropic’s coding assistant that runs in the terminal.',
              'Specification (spec): the description of what will be built, written before you start building (our explanation).',
              'SPEC.md: the text file where the prompt tells Claude to write the specification.',
              'Session: a conversation with Claude Code. A new session starts without the history of the previous one, with a clean context.',
              'Definition of done: the list of what must be finished for you to consider the task complete.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What the documentation says',
        blocks: [
          {
            k: 'ul',
            items: [
              'Among the common causes of a session that did not go as expected, the page lists that Claude built something different from what you had in mind, because it lacked information it cannot get from the repository. Linking that to a vague prompt is our reading.',
              'When you do not yet know exactly what you want, the recommendation is to ask Claude to interview you.',
              'Claude comes back with multiple-choice questions about the parts you have not defined yet and keeps asking until the answers add up to a specification.',
              'With `SPEC.md` ready, the page says to start a new session and build from it, so that the build begins with a clean context and a written definition of done.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'The prompt, with your subject',
        blocks: [
          { k: 'p', v: 'This is the official prompt, in English. It starts with the subject (in the documentation, a rate limit for an API). Swap the subject for yours.' },
          { k: 'code', label: 'Prompt from the documentation (official text, in English)', text: PEDIDO_OFICIAL },
          { k: 'p', v: 'In Portuguese, our translation of the same prompt. Swap the part in square brackets, which reads "describe here what you want", for your subject:' },
          { k: 'code', label: 'Prompt in Portuguese (our translation, tested on Claude Code 2.1.319)', text: PEDIDO_PT },
          { k: 'p', v: 'Without the subject, Claude has nothing to interview you about. That is why the prompt starts by saying what you want.' },
        ],
      },
      {
        n: '3',
        title: 'Two adapted examples (our idea)',
        blocks: [
          { k: 'p', v: 'The documentation only has the API example. The two below follow the same format, with subjects most people recognize: a monthly sales report, and a weekly summary sent by email. They are in Portuguese, as examples. The report one is the one the author ran in the test; the automation one was not executed.' },
          { k: 'code', label: 'Report (adapted, tested on Claude Code 2.1.319)', text: PEDIDO_RELATORIO },
          { k: 'code', label: 'Automation (adapted, not executed)', text: PEDIDO_AUTOMACAO },
        ],
      },
      {
        n: '4',
        title: 'Answer the questions and check SPEC.md',
        blocks: [
          {
            k: 'ul',
            items: [
              'Answer one question at a time. In the test, Claude started with questions about who reads the report and for which decision. The format changes from one run to another: it can come with numbered options or as a list of questions.',
              'If no option fits, write your own answer. The format of the questions can vary with the version and with your settings.',
              'At the end, open `SPEC.md` and read it: it is your definition of done. Fix whatever is not what you want before building.',
              'Open a new session and ask it to build from `SPEC.md`, as the documentation says.',
            ],
          },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'A vague prompt can produce something different from what you imagined.',
              'Ask: "interview me until you could write the spec, then write it to SPEC.md", with your subject at the start.',
              'Claude asks multiple-choice questions until the answers add up to the specification.',
              'With `SPEC.md` ready, open a new session and build from it.',
              'The report and the automation are our adaptations of the documentation example.',
            ],
          },
        ],
      },
      {
        title: 'Myth and fact',
        blocks: [
          {
            k: 'ul',
            items: [
              'Myth: "Claude needs a perfect prompt to start". Fact: the documentation recommends asking it to interview you when the idea is still loose.',
              'Myth: "the prompt works without saying the subject". Fact: the official prompt starts with what you want; without that, there is nothing to ask about.',
              'Myth: "after the interview, keep going in the same session". Fact: the documentation says to open a new session to build from `SPEC.md`.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Best practices for Claude Code](${URL_BOAS_PRATICAS}) (section Brainstorm with Claude first).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with Anthropic.' },
        ],
      },
    ],
  },
};
