import type { Guide } from './blog';

const U_BEST = 'https://code.claude.com/docs/en/best-practices';
const U_SUB = 'https://code.claude.com/docs/en/sub-agents';
const U_TOOLS = 'https://code.claude.com/docs/en/tools-reference';

export const REVISOR_NAO_EDITA: Guide = {
  slug: 'revisor-que-nao-edita',
  category: 'claude-code',
  keyword: 'REVISOR',
  published: '2026-11-20',
  pt: {
    title: 'Revisor que não pode editar: o arquivo do subagente pronto para copiar',
    short: 'Revisor que não edita',
    lead: 'Pedir no prompt para não editar é só um pedido. Um subagente com ferramentas só de leitura tem o limite imposto pelo Claude Code. O arquivo pronto, o teste e os limites.',
    description: 'Como criar no Claude Code um revisor de IA que só lê: o arquivo reviewer.md da documentação com tools Read, Grep e Glob, como chamá-lo, por que a trava vale para o subagente e não para a sessão principal, e o cuidado com o Bash.',
    facts: ['claude code', 'subagente', 'revisão'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'A trava vale para o subagente. A sessão principal do Claude Code continua podendo editar: ela tem as ferramentas dela, e foi o que aconteceu num teste do revisor independente, em que o agente principal anexou a linha por conta própria. O que este guia entrega é um revisor que não consegue editar, não um Claude que não edita. O arquivo do revisor é o modelo da página de boas práticas do Claude Code, conferida em 18/11/2026. O autor testou no Mac (Claude Code 2.1.319, modelo haiku): o revisor leu os arquivos e relatou, e quando pediu que corrigisse, respondeu que só tinha ferramentas de leitura; o arquivo ficou igual. Com o Bash na lista, o resultado variou: num teste do revisor independente o subagente conseguiu anexar uma linha a um arquivo; em duas execuções no modo `-p`, a escrita foi negada pelo sistema de permissões. Por isso o guia manda deixar o Bash de fora. O guia não tem vínculo com a Anthropic.' },
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
              'Subagente: segundo a documentação, um assistente de IA especializado que roda em contexto próprio, com instruções, acesso a ferramentas e permissões próprias.',
              'tools: a linha do arquivo que lista as ferramentas que o subagente pode usar. Funciona como lista de permitidas.',
              'Read, Grep e Glob: ler arquivos, buscar texto dentro deles e buscar arquivos pelo nome. Nenhuma das três escreve em arquivo.',
              'Edit e Write: as ferramentas que alteram e criam arquivos. Ficam de fora da lista.',
              'Bash: a ferramenta que roda comandos de terminal.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Pedido no prompt x limite imposto',
        blocks: [
          { k: 'p', v: 'Pedir "não edite nada" no prompt é um pedido. A documentação de boas práticas diz que, com um subagente que só tem `Read, Grep, Glob`, o limite é imposto pelo Claude Code, e não pedido num prompt. É a diferença entre pedir e trancar.' },
        ],
      },
      {
        n: '2',
        title: 'Crie o arquivo do revisor',
        blocks: [
          { k: 'p', v: 'O arquivo fica na pasta `.claude/agents/` do projeto (só para este projeto) ou em `~/.claude/agents/` (para todos os seus projetos), segundo a documentação. Primeiro crie a pasta:' },
          { k: 'ol', start: 1, items: ['Na raiz do projeto:'] },
          { k: 'code', label: 'Criar a pasta (terminal, testado no Mac)', text: "mkdir -p .claude/agents" },
          { k: 'ol', start: 2, items: ['Salve o conteúdo abaixo como `.claude/agents/reviewer.md` (modelo da documentação, em inglês):'] },
          { k: 'code', label: 'Arquivo reviewer.md (modelo da documentação, testado no Claude Code 2.1.319)', text: "---\nname: reviewer\ndescription: Reviews changed files against the spec they were built from. Use after implementing a feature, before opening the PR.\ntools: Read, Grep, Glob\n---\nYou're reviewing code you didn't write. Compare the changed files against the spec you're given,\ncheck that every requirement is implemented and the listed edge cases have tests,\nand report only the gaps that affect correctness. Skip style." },
          { k: 'p', v: 'Observação sobre o Mac, Linux e WSL: nesses sistemas o Grep e o Glob não vêm no conjunto padrão e o Claude busca pelo Bash. A documentação diz que um subagente que lista Glob ou Grep em `tools` e deixa o Bash de fora recebe as duas ferramentas de volta. Por isso a lista `Read, Grep, Glob` funciona como busca sem Bash.' },
        ],
      },
      {
        n: '3',
        title: 'Chame o revisor',
        blocks: [
          { k: 'p', v: 'Peça para o Claude usar o revisor. O pedido da documentação, em inglês, é "have the reviewer compare the rate limiter against SPEC.md". O exemplo abaixo é adaptado e foi o que o autor rodou:' },
          { k: 'code', label: 'Chamar o revisor (testado no Claude Code 2.1.319)', text: "Use the reviewer subagent to compare src/calc.py against SPEC.md and report the gaps." },
          { k: 'p', v: 'No teste, a pasta tinha um `SPEC.md` com duas regras e um `src/calc.py` com duas funções. O revisor leu os dois, disse que não havia lacuna e listou duas dúvidas da especificação. Não editou nada. Quando o pedido incluía "corrija você mesmo", ele respondeu que só tinha leitura.' },
        ],
      },
      {
        n: '4',
        title: 'O que a trava cobre e o que não cobre',
        blocks: [
          {
            k: 'ul',
            items: [
              'Cobre: o subagente. Sem Edit e Write na lista, ele não consegue alterar nem criar arquivos por essas ferramentas.',
              'Não cobre a sessão principal: o Claude principal continua com as ferramentas dele. Se você pedir a ele que corrija, ele corrige.',
              'Bash: deixe de fora. Com Bash na lista, o subagente pode rodar comandos de terminal, e um comando pode alterar arquivo. O que acontece na prática depende das regras de permissão; a lista deixa de garantir que ele só lê. A página de subagentes da documentação traz um exemplo com Read, Grep, Glob e Bash e diz que o subagente não edita nem escreve arquivos; os testes citados divergiram, e por isso o guia manda deixar o Bash de fora.',
              'Sem Bash, o revisor não roda testes (dedução nossa): ele lê o código e a especificação, mas não executa nada.',
            ],
          },
        ],
      },
      {
        n: '5',
        title: 'Dois cuidados com o revisor',
        blocks: [
          {
            k: 'ul',
            items: [
              'Peça para ignorar estilo. A documentação avisa: "A reviewer that\'s asked to find problems will always find something." (um revisor pedido para achar problemas sempre acha alguma coisa). Se você corrigir tudo, acaba com camadas e testes que não precisava. Por isso o arquivo acima termina com "Skip style".',
              'Um revisor novo ajuda porque ele não viu como o código foi escrito. A documentação lista isso como um dos usos do subagente. Em compensação, a documentação diz que cada subagente custa principalmente tokens, porque envia as próprias requisições e conta no mesmo uso da conversa principal.',
            ],
          },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Pedir no prompt para não editar é só um pedido; um subagente com `tools: Read, Grep, Glob` tem o limite imposto pelo Claude Code.',
              'O arquivo é `.claude/agents/reviewer.md`, com o modelo da documentação.',
              'A trava vale para o subagente. A sessão principal continua podendo editar.',
              'Deixe o Bash de fora: com ele, o subagente pode rodar comandos que alteram arquivos, conforme as permissões.',
              'Peça para ignorar estilo e use o revisor como olhar novo.',
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
              'Mito: "se eu pedir não edite no prompt, o revisor não edita". Verdade: é um pedido; o limite imposto é o da linha `tools`.',
              'Mito: "o Claude inteiro fica sem editar". Verdade: a trava é do subagente; a sessão principal continua editando.',
              'Mito: "com Bash na lista ainda é só leitura". Verdade: Bash roda comandos, e um comando pode alterar arquivo, conforme as permissões.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Best practices (subagentes, revisor, skip style)](${U_BEST}). Claude Code, [Subagents (campo tools, pastas de agentes)](${U_SUB}). Claude Code, [Tools reference (Read, Grep, Glob, Bash)](${U_TOOLS}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com a Anthropic.' },
        ],
      },
    ],
  },
  en: {
    title: 'A reviewer that cannot edit: the subagent file, ready to copy',
    short: 'A reviewer that cannot edit',
    lead: 'Asking in the prompt not to edit is only a request. A subagent with read only tools has the limit enforced by Claude Code. The ready made file, the test and the limits.',
    description: 'How to create a read only AI reviewer in Claude Code: the reviewer.md file from the documentation with tools Read, Grep and Glob, how to call it, why the lock applies to the subagent and not to the main session, and the caution about Bash.',
    facts: ['claude code', 'subagent', 'review'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The lock applies to the subagent. The main Claude Code session can still edit: it has its own tools, and that is what happened in an independent reviewer test, where the main agent appended the line on its own. What this guide gives you is a reviewer that cannot edit, not a Claude that does not edit. The reviewer file is the model from the Claude Code best practices page, checked on November 18, 2026. The author tested it on a Mac (Claude Code 2.1.319, haiku model): the reviewer read the files and reported back, and when asked to fix them, it answered that it only had read tools; the file stayed the same. With Bash on the list, the result varied: in an independent reviewer test the subagent did append a line to a file; in two runs in `-p` mode, the write was denied by the permission system. That is why this guide tells you to leave Bash out. This guide is not affiliated with Anthropic.' },
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
              'Subagent: according to the documentation, a specialized AI assistant that runs in its own context, with its own instructions, tool access and permissions.',
              'tools: the line in the file that lists the tools the subagent may use. It works as an allow list.',
              'Read, Grep and Glob: read files, search text inside them and find files by name. None of the three writes to a file.',
              'Edit and Write: the tools that change and create files. They stay off the list.',
              'Bash: the tool that runs terminal commands.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'A prompt request versus an enforced limit',
        blocks: [
          { k: 'p', v: 'Asking "do not edit anything" in the prompt is a request. The best practices page says that, with a subagent that only has `Read, Grep, Glob`, the limit is enforced by Claude Code rather than requested in a prompt. That is the difference between asking and locking.' },
        ],
      },
      {
        n: '2',
        title: 'Create the reviewer file',
        blocks: [
          { k: 'p', v: 'The file goes in the project folder `.claude/agents/` (for this project only) or in `~/.claude/agents/` (for all your projects), according to the documentation. First create the folder:' },
          { k: 'ol', start: 1, items: ['In the project root:'] },
          { k: 'code', label: 'Create the folder (terminal, tested on a Mac)', text: "mkdir -p .claude/agents" },
          { k: 'ol', start: 2, items: ['Save the content below as `.claude/agents/reviewer.md` (model from the documentation, in English):'] },
          { k: 'code', label: 'The reviewer.md file (model from the documentation, tested on Claude Code 2.1.319)', text: "---\nname: reviewer\ndescription: Reviews changed files against the spec they were built from. Use after implementing a feature, before opening the PR.\ntools: Read, Grep, Glob\n---\nYou're reviewing code you didn't write. Compare the changed files against the spec you're given,\ncheck that every requirement is implemented and the listed edge cases have tests,\nand report only the gaps that affect correctness. Skip style." },
          { k: 'p', v: 'A note about Mac, Linux and WSL: on those systems Grep and Glob are not in the default set and Claude searches through Bash. The documentation says that a subagent which lists Glob or Grep in `tools` and leaves Bash out gets both tools back. That is why the list `Read, Grep, Glob` works as search without Bash.' },
        ],
      },
      {
        n: '3',
        title: 'Call the reviewer',
        blocks: [
          { k: 'p', v: 'Ask Claude to use the reviewer. The request in the documentation is "have the reviewer compare the rate limiter against SPEC.md". The example below is adapted, and it is the one the author ran:' },
          { k: 'code', label: 'Call the reviewer (tested on Claude Code 2.1.319)', text: "Use the reviewer subagent to compare src/calc.py against SPEC.md and report the gaps." },
          { k: 'p', v: 'In the test, the folder had a `SPEC.md` with two rules and a `src/calc.py` with two functions. The reviewer read both, said there was no gap and listed two questions about the spec. It edited nothing. When the request included "fix it yourself", it answered that it only had read access.' },
        ],
      },
      {
        n: '4',
        title: 'What the lock covers and what it does not',
        blocks: [
          {
            k: 'ul',
            items: [
              'It covers the subagent. With Edit and Write off the list, it cannot change or create files through those tools.',
              'It does not cover the main session: the main Claude keeps its own tools. If you ask it to fix something, it fixes it.',
              'Bash: leave it out. With Bash on the list, the subagent can run terminal commands, and a command can change a file. What happens in practice depends on the permission rules; the list stops guaranteeing that it only reads. The subagents page in the documentation shows an example with Read, Grep, Glob and Bash and says the subagent does not edit or write files; the tests cited above diverged, and that is why this guide tells you to leave Bash out.',
              'Without Bash, the reviewer does not run tests (our inference): it reads the code and the spec, but runs nothing.',
            ],
          },
        ],
      },
      {
        n: '5',
        title: 'Two cautions about the reviewer',
        blocks: [
          {
            k: 'ul',
            items: [
              'Ask it to skip style. The documentation warns: "A reviewer that\'s asked to find problems will always find something." If you fix everything, you end up with layers and tests you did not need. That is why the file above ends with "Skip style".',
              'A fresh reviewer helps because it has not seen how the code was written. The documentation lists that as one of the uses of a subagent. In exchange, the documentation says each subagent costs mostly tokens, because it sends its own requests and counts against the same usage as the main conversation.',
            ],
          },
        ],
      },
      {
        title: 'Keep this in mind',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Asking in the prompt not to edit is only a request; a subagent with `tools: Read, Grep, Glob` has the limit enforced by Claude Code.',
              'The file is `.claude/agents/reviewer.md`, with the model from the documentation.',
              'The lock applies to the subagent. The main session can still edit.',
              'Leave Bash out: with it, the subagent can run commands that change files, depending on permissions.',
              'Ask it to skip style and use the reviewer as a fresh pair of eyes.',
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
              'Myth: "if I ask it not to edit in the prompt, the reviewer will not edit". Fact: that is a request; the enforced limit is the `tools` line.',
              'Myth: "the whole Claude stops editing". Fact: the lock belongs to the subagent; the main session keeps editing.',
              'Myth: "with Bash on the list it is still read only". Fact: Bash runs commands, and a command can change a file, depending on permissions.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Best practices (subagents, reviewer, skip style)](${U_BEST}). Claude Code, [Subagents (the tools field, agent folders)](${U_SUB}). Claude Code, [Tools reference (Read, Grep, Glob, Bash)](${U_TOOLS}).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with Anthropic.' },
        ],
      },
    ],
  },
};
