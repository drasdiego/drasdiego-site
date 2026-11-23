import type { Guide } from './blog';

const U_COSTS = 'https://code.claude.com/docs/en/costs';
const U_MSG = 'https://platform.claude.com/docs/en/build-with-claude/working-with-messages';
const U_GLOSS = 'https://platform.claude.com/docs/en/about-claude/glossary';
const U_CACHE = 'https://code.claude.com/docs/en/prompt-caching';
const U_USAGE = 'https://platform.claude.com/usage';

export const TOKENS_CLAUDE_CODE: Guide = {
  slug: 'tokens-claude-code',
  category: 'claude-code',
  keyword: 'TOKENS',
  published: '2026-11-21',
  pt: {
    title: 'Para onde foram seus tokens: por que a conversa inteira vai a cada pedido e como usar menos',
    short: 'Para onde foram seus tokens',
    lead: 'Por que uma pergunta de uma linha leva a conversa inteira junto no Claude Code, o que o cache de prompt reduz e o que não reduz, e o passo a passo para medir e gastar menos.',
    description: 'Por que o Claude Code reenvia a conversa inteira a cada pedido, o que o cache muda, como medir o uso com /usage e /context, e cinco hábitos para usar menos, com o aviso para assinantes Pro e Max.',
    facts: ['claude code', 'tokens', 'contexto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Os fatos vêm das páginas citadas nas fontes, abertas em 18/11/2026. Os comandos deste guia (`/usage`, `/context`, `/clear`, `/rename`, `/resume`, `/compact`, `/mcp`) são comandos de dentro de uma sessão do Claude Code e não foram executados para este guia: confira cada um na documentação, nos links das fontes. As mensagens de exemplo são fictícias. Se você assina o Claude Pro ou o Max, o valor em dólar do bloco Session do /usage não vale como cobrança: a documentação diz que o uso já está incluído na assinatura. Este guia não é consultoria de custo e não tem vínculo com a Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Claude Code: a ferramenta de programar com IA da Anthropic, usada no terminal e em outros editores.',
              'Token: segundo o glossário da Anthropic, a menor unidade que o modelo lê; pode corresponder a palavras, partes de palavras ou caracteres.',
              'Contexto (janela de contexto): o texto que o modelo consegue olhar para trás ao responder, a "memória de trabalho" dele, nas palavras do glossário.',
              'Cache de prompt: mecanismo que reaproveita o trecho repetido da entrada. A documentação de custos diz que ele reduz o custo do conteúdo repetido.',
              'Sessão: a conversa aberta com o Claude Code, do início até você limpar ou sair.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Por que a conversa inteira vai a cada pedido',
        blocks: [
          { k: 'p', v: 'Na API da Anthropic, "The Messages API is stateless, which means that you always send the full conversational history to the API." (a API não guarda a conversa: você sempre envia o histórico inteiro).' },
          { k: 'p', v: 'A página de custos do Claude Code diz o mesmo do lado da ferramenta: "Claude Code sends your full conversation with every request" (envia a conversa inteira a cada requisição). E acrescenta que uma pergunta de uma linha, numa sessão aberta o dia todo, ainda gasta uso pela conversa toda.' },
          { k: 'p', v: 'Leitura prática: o tamanho do que você escreveu agora importa menos do que o tamanho da conversa que vai junto. Por isso o reel diz que a pergunta de uma linha "leva a conversa inteira junto".' },
        ],
      },
      {
        n: '2',
        title: 'O que o cache muda e o que não muda',
        blocks: [
          {
            k: 'ul',
            items: [
              'A documentação diz que o Claude Code usa cache de prompt, que "reduces costs for repeated content" (reduz o custo de conteúdo repetido). O histórico repetido é relido à taxa de cache.',
              'Reduzir não é zerar: a mesma página diz que "Token costs scale with context size" (o custo de tokens cresce com o tamanho do contexto).',
              'O cache tem prazo: a página explica que a primeira mensagem depois de uma pausa maior que o tempo de vida do cache não encontra o cache e reprocessa o contexto inteiro. Detalhes na página de cache de prompt, no link das fontes.',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'Passo a passo: medir o que você usou',
        blocks: [
          { k: 'ol', start: 1, items: ['Dentro do Claude Code, digite o comando abaixo. A documentação diz que ele mostra o uso de tokens da sessão atual:'] },
          { k: 'code', label: 'Ver o uso da sessão (dentro do Claude Code, não executado: confira na documentação)', text: "/usage" },
          { k: 'ol', start: 2, items: ['Entenda o bloco Session. A documentação diz que ele mostra o uso de tokens da API e que o valor em dólar é calculado localmente a partir da contagem de tokens, a preço de lista. Para quem assina Pro ou Max, diz que o uso está incluído na assinatura, então o valor da sessão não serve como cobrança; essas pessoas veem barras de uso do plano. Para cobrança de verdade, a página manda olhar a página de uso do Console.'] },
          { k: 'ol', start: 3, items: ['Para ver o que ocupa o contexto, a documentação manda rodar o comando abaixo:'] },
          { k: 'code', label: 'Ver o que ocupa o contexto (dentro do Claude Code, não executado: confira na documentação)', text: "/context" },
        ],
      },
      {
        n: '4',
        title: 'Passo a passo: usar menos',
        blocks: [
          { k: 'ol', start: 1, items: ['Ao mudar de assunto, limpe a conversa. A documentação diz que contexto velho gasta tokens em toda mensagem nova. Salve um nome antes, para voltar depois, e depois limpe. Rode um comando de cada vez (não cole os três juntos); troque nome-da-sessao pelo nome que quiser:'] },
          { k: 'code', label: 'Nome, limpar e voltar (dentro do Claude Code, não executado: confira na documentação)', text: "/rename nome-da-sessao\n/clear\n/resume" },
          { k: 'p', v: 'O `nome-da-sessao` é um exemplo do guia, não da documentação (a página só cita o `/rename`). O `/rename` dá um nome à sessão, o `/clear` começa uma conversa nova e o `/resume` volta a uma sessão salva. O que estava no contexto deixa de acompanhar os pedidos novos.' },
          { k: 'ol', start: 2, items: ['Se precisar manter o fio, compacte com foco. O exemplo abaixo é o da própria documentação. Atenção: a página avisa que compactar um contexto grande é, ele mesmo, um pedido grande.'] },
          { k: 'code', label: 'Compactar com instrução (dentro do Claude Code, não executado: confira na documentação)', text: "/compact Focus on code samples and API usage" },
          { k: 'ol', start: 3, items: ['Peça tarefas específicas. A documentação diz que pedido vago dispara varredura ampla. Os dois exemplos abaixo são da página. Copie só a frase depois dos dois pontos; os rótulos Vago e Específico são só para você comparar:'] },
          { k: 'code', label: 'Pedido vago x pedido específico (exemplos da documentação)', text: "Vago: improve this codebase\nEspecífico: add input validation to the login function in auth.ts" },
          { k: 'ol', start: 4, items: ['Desligue servidores MCP que você não usa. A documentação manda rodar o `/mcp`, ver os servidores configurados e desativar os que não estão em uso.'] },
          { k: 'ol', start: 5, items: ['Mantenha o CLAUDE.md curto. A página de custos recomenda abaixo de 200 linhas e mover instruções de fluxos específicos para skills, que só carregam quando chamadas. O guia do reel REGRAS, quando estiver no ar, detalha isso.'] },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'No Claude Code, cada pedido leva a conversa inteira junto; o custo cresce com o tamanho do contexto.',
              'O cache reduz o custo do trecho repetido, mas não zera, e some depois de uma pausa longa.',
              'Meça com /usage e /context. Se você assina Pro ou Max, o valor em dólar do /usage não vale como cobrança.',
              'Limpe ao trocar de assunto, peça tarefas específicas e desligue o que não usa.',
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
              'Mito: "pergunta curta gasta pouco". Verdade: a documentação diz que uma pergunta de uma linha, numa sessão longa, usa a conversa toda.',
              'Mito: "o cache zera o custo do histórico". Verdade: a documentação diz que o cache reduz o custo do repetido, e o custo cresce com o contexto.',
              'Mito: "o valor do /usage é a minha fatura". Verdade: para Pro e Max o uso está incluído na assinatura e o valor da sessão não vale como cobrança; para cobrança, veja a página de uso do Console.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Gerenciar custos (Manage costs effectively)](${U_COSTS}). Anthropic, [Messages API: trabalhando com mensagens](${U_MSG}). Anthropic, [Glossário (Tokens e Context window)](${U_GLOSS}). Claude Code, [Cache de prompt](${U_CACHE}). Claude Console, [Página de uso](${U_USAGE}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com a Anthropic.' },
        ],
      },
    ],
  },
  en: {
    title: 'Where did your tokens go: why the whole conversation goes with every request and how to use less',
    short: 'Where did your tokens go',
    lead: 'Why a one line question carries the whole conversation with it in Claude Code, what prompt caching reduces and what it does not, and the step by step to measure and spend less.',
    description: 'Why Claude Code resends the whole conversation with every request, what the cache changes, how to measure usage with /usage and /context, and five habits to use less, with the warning for Pro and Max subscribers.',
    facts: ['claude code', 'tokens', 'context'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The facts come from the pages cited in the sources, opened on November 18, 2026. The commands in this guide (`/usage`, `/context`, `/clear`, `/rename`, `/resume`, `/compact`, `/mcp`) are commands you type inside a Claude Code session and were not run for this guide: check each one in the documentation, through the source links. The example messages are fictional. If you subscribe to Claude Pro or Max, the dollar value in the Session block of /usage does not count as a charge: the documentation says that usage is already included in the subscription. This guide is not cost consulting and is not affiliated with Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Claude Code: Anthropic\'s tool for coding with AI, used in the terminal and in other editors.',
              'Token: according to the Anthropic glossary, the smallest unit the model reads; it can correspond to words, parts of words or characters.',
              'Context (context window): the text the model can look back on when it answers, its "working memory", in the glossary\'s words.',
              'Prompt cache: a mechanism that reuses the repeated part of the input. The costs documentation says it reduces the cost of repeated content.',
              'Session: the open conversation with Claude Code, from the start until you clear it or quit.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Why the whole conversation goes with every request',
        blocks: [
          { k: 'p', v: 'In the Anthropic API, "The Messages API is stateless, which means that you always send the full conversational history to the API." (the API does not keep the conversation: you always send the whole history).' },
          { k: 'p', v: 'The Claude Code costs page says the same from the tool side: "Claude Code sends your full conversation with every request". It adds that a one line question, in a session left open all day, still uses up usage for the whole conversation.' },
          { k: 'p', v: 'Practical reading: the size of what you just wrote matters less than the size of the conversation that goes along with it. That is why the reel says the one line question "carries the whole conversation with it".' },
        ],
      },
      {
        n: '2',
        title: 'What the cache changes and what it does not',
        blocks: [
          {
            k: 'ul',
            items: [
              'The documentation says Claude Code uses prompt caching, which "reduces costs for repeated content". The repeated history is read again at the cache rate.',
              'Reducing is not zeroing: the same page says that "Token costs scale with context size".',
              'The cache has a time limit: the page explains that the first message after a pause longer than the cache lifetime does not find the cache and reprocesses the whole context. Details are on the prompt caching page, in the sources link.',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'Step by step: measure what you used',
        blocks: [
          { k: 'ol', start: 1, items: ['Inside Claude Code, type the command below. The documentation says it shows the token usage of the current session:'] },
          { k: 'code', label: 'See the session usage (inside Claude Code, not run: check the documentation)', text: "/usage" },
          { k: 'ol', start: 2, items: ['Understand the Session block. The documentation says it shows API token usage and that the dollar value is calculated locally from the token count, at list price. For Pro or Max subscribers, it says usage is included in the subscription, so the session value does not work as a charge; these people see plan usage bars. For the real charge, the page points to the Console usage page.'] },
          { k: 'ol', start: 3, items: ['To see what takes up the context, the documentation tells you to run the command below:'] },
          { k: 'code', label: 'See what takes up the context (inside Claude Code, not run: check the documentation)', text: "/context" },
        ],
      },
      {
        n: '4',
        title: 'Step by step: use less',
        blocks: [
          { k: 'ol', start: 1, items: ['When you change subject, clear the conversation. The documentation says stale context wastes tokens on every new message. Save a name first, so you can come back later, and then clear. Run one command at a time (do not paste the three together); replace nome-da-sessao with any name you like:'] },
          { k: 'code', label: 'Name, clear and come back (inside Claude Code, not run: check the documentation)', text: "/rename nome-da-sessao\n/clear\n/resume" },
          { k: 'p', v: '`nome-da-sessao` is an example from this guide, not from the documentation (the page only mentions `/rename`). `/rename` gives the session a name, `/clear` starts a new conversation and `/resume` goes back to a saved session. What was in the context stops following the new requests.' },
          { k: 'ol', start: 2, items: ['If you need to keep the thread, compact with a focus. The example below is the documentation\'s own. Note: the page warns that compacting a large context is itself a large request.'] },
          { k: 'code', label: 'Compact with an instruction (inside Claude Code, not run: check the documentation)', text: "/compact Focus on code samples and API usage" },
          { k: 'ol', start: 3, items: ['Ask for specific tasks. The documentation says a vague request triggers broad scanning. The two examples below are from the page. Copy only the sentence after the colon; the labels Vago and Específico are only for you to compare:'] },
          { k: 'code', label: 'Vague request x specific request (examples from the documentation)', text: "Vago: improve this codebase\nEspecífico: add input validation to the login function in auth.ts" },
          { k: 'ol', start: 4, items: ['Turn off MCP servers you do not use. The documentation tells you to run `/mcp`, see the configured servers and disable the ones not in use.'] },
          { k: 'ol', start: 5, items: ['Keep CLAUDE.md short. The costs page recommends under 200 lines and moving instructions for specific workflows into skills, which only load when called. The guide for the REGRAS reel, once it is live, goes into this in detail.'] },
        ],
      },
      {
        title: 'Keep this in mind',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'In Claude Code, every request carries the whole conversation with it; the cost grows with the size of the context.',
              'The cache reduces the cost of the repeated part but does not zero it, and it is lost after a long pause.',
              'Measure with /usage and /context. If you subscribe to Pro or Max, the dollar value in /usage does not count as a charge.',
              'Clear when you change subject, ask for specific tasks and turn off what you do not use.',
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
              'Myth: "a short question uses little". Fact: the documentation says a one line question, in a long session, uses the whole conversation.',
              'Myth: "the cache zeroes the cost of the history". Fact: the documentation says the cache reduces the cost of the repeated part, and the cost grows with the context.',
              'Myth: "the /usage value is my bill". Fact: for Pro and Max, usage is included in the subscription and the session value does not count as a charge; for the real charge, see the Console usage page.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Manage costs effectively](${U_COSTS}). Anthropic, [Messages API: working with messages](${U_MSG}). Anthropic, [Glossary (Tokens and Context window)](${U_GLOSS}). Claude Code, [Prompt caching](${U_CACHE}). Claude Console, [Usage page](${U_USAGE}).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with Anthropic.' },
        ],
      },
    ],
  },
};
