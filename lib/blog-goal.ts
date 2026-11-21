import type { Guide } from './blog';

const U_GOAL = 'https://code.claude.com/docs/en/goal.md';
const U_BEST = 'https://code.claude.com/docs/en/best-practices.md';

export const GOAL_ATE_O_TESTE: Guide = {
  slug: 'goal-ate-o-teste-passar',
  category: 'claude-code',
  published: '2026-11-21',
  pt: {
    title: "/goal: condições prontas para o Claude trabalhar até o teste passar",
    short: "/goal até o teste passar",
    lead: "Condições prontas para teste, build e lint, a regra de ouro (o conferente só lê a conversa), como cancelar e quando o goal termina sozinho.",
    description: "Como o comando /goal do Claude Code funciona, como escrever a condição, condições prontas para teste, build e lint, como ver o estado e cancelar, e o que o conferente consegue ler. Testado no Mac até onde dá sem gastar uma sessão inteira.",
    facts: ["claude code", "goal", "testes"],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          { k: 'p', v: "Testado no Mac (18/11/2026, Claude Code 2.1.319): `/goal` sem goal ativo respondeu `No goal set. Usage: /goal <condition>` e `/goal clear` respondeu `No goal set`, como a documentação descreve." },
          { k: 'p', v: `Não testado: um goal completo, com turnos e veredictos. Isso gasta tokens e mexe em arquivos de um projeto, então o ciclo de avaliação vem só da documentação ([página do /goal](${U_GOAL})). As condições da seção 3 são EXEMPLO: troque os comandos pelos do seu projeto. Comandos do Claude Code mudam com frequência: reconfira.` },
        ],
      },
      {
        n: "0",
        title: "O que é cada coisa",
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              "/goal: o comando que define uma condição de término. O Claude continua trabalhando, sem você mandar cada passo, até a condição valer.",
              "Turno: uma rodada de trabalho do Claude, do pedido até ele parar.",
              "Conferente (avaliador): depois de cada turno, um modelo pequeno e rápido confere se a condição vale (a documentação o chama de \"small fast model\").",
              "Condição: a frase que você escreve depois de `/goal`.",
              "Hook Stop: um script ou prompt seu que decide se o Claude pode parar. O /goal é um atalho para isso, só da sessão atual.",
            ],
          },
        ],
      },
      {
        n: "1",
        title: "Como funciona, segundo a documentação",
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              "Você escreve `/goal` e a condição. Isso já inicia um turno.",
              "Ao fim de cada turno, o conferente recebe a condição e a conversa até ali. Ele responde: ainda não vale (o motivo vira dica para o próximo turno), vale (o goal é limpo) ou é impossível (o goal é limpo).",
              "Regra central: o avaliador \"does not call tools, so it can only judge what Claude has already surfaced in the conversation\" (não chama ferramentas, então só julga o que o Claude já mostrou na conversa). Ele não roda comando nem abre arquivo sozinho.",
              "Por isso a condição precisa ser algo que a saída do próprio Claude consiga mostrar, como o resultado de um teste.",
            ],
          },
        ],
      },
      {
        n: "2",
        title: "Como escrever a condição",
        blocks: [
          { k: 'p', v: "A documentação diz que uma boa condição tem:" },
          {
            k: 'ol',
            start: 1,
            items: [
              "Um estado final mensurável: um resultado de teste, um código de saída do build, uma fila vazia.",
              "A checagem declarada: como o Claude prova (por exemplo, `npm test` termina com 0).",
              "Restrições que importam: o que não pode mudar no caminho (por exemplo, nenhum outro arquivo de teste modificado).",
              "Um limite, se quiser: a documentação sugere uma cláusula como \"or stop after 20 turns\". O Claude relata o progresso contra ela e o conferente a julga pela conversa: é lida da conversa, não é trava do programa.",
            ],
          },
          { k: 'p', v: "O tamanho máximo da condição é de 4.000 caracteres." },
        ],
      },
      {
        n: "3",
        title: "Condições prontas (EXEMPLO)",
        blocks: [
          { k: 'p', v: "Copie, troque os comandos pelos do seu projeto e cole depois de `/goal`." },
          { k: 'code', label: "Definir um goal de testes (EXEMPLO)", text: "/goal todos os testes em test/auth passam, e o comando npm test termina com código 0 e mostra o resultado na conversa, sem modificar nenhum outro arquivo de teste, ou pare depois de 20 turnos" },
          { k: 'code', label: "Definir um goal de build (EXEMPLO)", text: "/goal o comando npm run build termina com código 0 e a saída do build aparece na conversa, ou pare depois de 15 turnos" },
          { k: 'code', label: "Definir um goal de lint (EXEMPLO)", text: "/goal o comando npm run lint não mostra nenhum erro e a saída aparece na conversa, sem desligar nenhuma regra do lint, ou pare depois de 15 turnos" },
          { k: 'code', label: "Definir um goal de fila vazia (EXEMPLO)", text: "/goal a lista de tarefas pendentes em TODO.md está vazia, cada item concluído foi marcado com o teste que o comprova, ou pare depois de 25 turnos" },
          { k: 'p', v: "Os exemplos da documentação são parecidos: \"all tests in test/auth pass and the lint step is clean\" e \"CHANGELOG.md has an entry for every PR merged this week\". Os números de turnos e os nomes de arquivo acima são nossos (EXEMPLO)." },
        ],
      },
      {
        n: "4",
        title: "Ver o estado e cancelar",
        blocks: [
          { k: 'code', label: "Ver o estado e cancelar", text: "/goal\n/goal clear" },
          { k: 'p', v: "Rode um comando por vez: se colar os dois juntos, você cancela o goal que acabou de consultar. `/goal` sozinho mostra a condição, há quanto tempo roda, quantos turnos foram avaliados, os tokens gastos e o motivo mais recente do avaliador. `/goal clear` remove o goal (a documentação aceita também `stop`, `off`, `reset`, `none` e `cancel`). Testado: sem goal ativo, as duas respostas foram as da documentação. Rodar `/clear` também remove o goal." },
        ],
      },
      {
        n: "5",
        title: "Permissões e modo não interativo",
        blocks: [
          { k: 'p', v: "O /goal não muda o seu modo de permissão. A documentação diz que, no modo manual, o Claude ainda pede permissão para o que as suas configurações não liberaram, como o comando do teste. Para rodar sem ninguém por perto, a documentação cita o auto mode, que este guia não ensina: leia a página dele antes de decidir." },
          { k: 'p', v: "Sem interface, a documentação mostra esta forma. Não executado: ela roda o ciclo inteiro e gasta tokens." },
          { k: 'code', label: "Rodar sem interface (terminal, não executado: confira na documentação)", text: "claude -p \"/goal CHANGELOG.md has an entry for every PR merged this week\"" },
          { k: 'p', v: "Sem saída formatada, nada aparece até o fim. A documentação sugere `--output-format stream-json --verbose` para acompanhar." },
        ],
      },
      {
        n: "6",
        title: "/goal, /loop ou um hook Stop?",
        blocks: [
          {
            k: 'table',
            label: "Comparação entre /goal, /loop e hook Stop",
            head: ["Opção", "O próximo turno começa quando", "Para quando"],
            rows: [
              ["/goal", "O turno anterior termina", "O avaliador confirma a condição, a julga impossível, um erro seu a limpa, ou você cancela"],
              ["/loop", "Passa um intervalo de tempo", "Você para, ou o Claude decide que acabou"],
              ["Hook Stop", "O turno anterior termina", "Seu script ou prompt decide"],
            ],
          },
          { k: 'p', muted: true, v: "Fonte da tabela: a própria página do /goal." },
        ],
      },
      {
        n: "7",
        title: "Quando o goal termina sozinho",
        blocks: [
          {
            k: 'ul',
            items: [
              "A condição vale (o conferente confirma).",
              "O conferente julga a condição impossível.",
              "Um erro que só você resolve: falha de autenticação, saldo de crédito esgotado, contexto cheio demais que a compactação não resolveu, ou modelo indisponível. Aparece `Goal cleared after an unrecoverable error`; corrija e rode `/goal` de novo.",
              "Sem progresso (nenhuma ferramenta usada por vários turnos): o Claude Code para o ciclo, avisa e devolve o controle com o goal ainda definido.",
            ],
          },
          { k: 'p', v: "Requisitos: o /goal usa a mesma regra de confiança de pasta dos hooks e fica indisponível com `disableAllHooks` ou `allowManagedHooksOnly`. Check-ins e novidades exigem versões recentes do Claude Code: confira a página. O avaliador gasta tokens do modelo pequeno, que a documentação diz serem normalmente desprezíveis perto do gasto principal." },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              "O /goal faz o Claude continuar até a condição valer.",
              "Depois de cada turno, um modelo pequeno confere, e só lê a conversa.",
              "Escreva a condição como algo que a saída do Claude mostre.",
              "Inclua uma cláusula de limite, que é julgada pela conversa.",
              "Cancele com `/goal clear`.",
              "No modo manual, o Claude ainda pede permissão.",
            ],
          },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Keep Claude working toward a goal](${U_GOAL}). Claude Code, [boas práticas (dar ao Claude uma checagem)](${U_BEST}).` },
          { k: 'p', muted: true, v: "Conteúdo educativo e independente." },
        ],
      },
    ],
  },
  en: {
    title: "/goal: ready-made conditions so Claude works until the tests pass",
    short: "/goal until the tests pass",
    lead: "Ready-made conditions for tests, build and lint, the golden rule (the checker only reads the conversation), how to cancel and when the goal ends on its own.",
    description: "How the Claude Code /goal command works, how to write the condition, ready-made conditions for tests, build and lint, how to see the status and cancel, and what the checker can read. Tested on a Mac as far as possible without spending a whole session.",
    facts: ["claude code", "goal", "tests"],
    sections: [
      {
        title: "Read first: the limit of this guide",
        note: true,
        blocks: [
          { k: 'p', v: "Tested on a Mac (November 18, 2026, Claude Code 2.1.319): `/goal` with no active goal answered `No goal set. Usage: /goal <condition>` and `/goal clear` answered `No goal set`, as the documentation describes." },
          { k: 'p', v: `Not tested: a complete goal, with turns and verdicts. That spends tokens and changes files in a project, so the evaluation cycle comes only from the documentation ([the /goal page](${U_GOAL})). The conditions in section 3 are EXAMPLES: swap the commands for the ones in your project. Claude Code commands change often: check again.` },
        ],
      },
      {
        n: "0",
        title: "What each thing is",
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              "/goal: the command that sets an end condition. Claude keeps working, without you ordering each step, until the condition holds.",
              "Turn: one round of Claude's work, from the request until it stops.",
              "Checker (evaluator): after each turn, a small, fast model checks whether the condition holds (the documentation calls it the \"small fast model\").",
              "Condition: the sentence you write after `/goal`.",
              "Stop hook: a script or prompt of yours that decides whether Claude may stop. /goal is a shortcut for that, for the current session only.",
            ],
          },
        ],
      },
      {
        n: "1",
        title: "How it works, according to the documentation",
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              "You write `/goal` and the condition. That already starts a turn.",
              "At the end of each turn, the checker receives the condition and the conversation up to that point. It answers: not yet met (the reason becomes a hint for the next turn), met (the goal is cleared) or impossible (the goal is cleared).",
              "Core rule: the evaluator \"does not call tools, so it can only judge what Claude has already surfaced in the conversation\". It does not run commands or open files on its own.",
              "That is why the condition must be something Claude's own output can show, such as a test result.",
            ],
          },
        ],
      },
      {
        n: "2",
        title: "How to write the condition",
        blocks: [
          { k: 'p', v: "The documentation says a good condition has:" },
          {
            k: 'ol',
            start: 1,
            items: [
              "A measurable end state: a test result, a build exit code, an empty queue.",
              "The check stated: how Claude proves it (for example, `npm test` exits with 0).",
              "Constraints that matter: what must not change along the way (for example, no other test file modified).",
              "A limit, if you want one: the documentation suggests a clause like \"or stop after 20 turns\". Claude reports progress against it and the checker judges it from the conversation: it is read from the conversation, it is not a lock in the program.",
            ],
          },
          { k: 'p', v: "The maximum length of the condition is 4,000 characters." },
        ],
      },
      {
        n: "3",
        title: "Ready-made conditions (EXAMPLE)",
        blocks: [
          { k: 'p', v: "Copy, swap the commands for the ones in your project and paste after `/goal`." },
          { k: 'p', v: "The wording and file names in these Portuguese examples are illustration; the result does not change." },
          { k: 'code', label: "Set a tests goal (EXAMPLE)", text: "/goal todos os testes em test/auth passam, e o comando npm test termina com código 0 e mostra o resultado na conversa, sem modificar nenhum outro arquivo de teste, ou pare depois de 20 turnos" },
          { k: 'code', label: "Set a build goal (EXAMPLE)", text: "/goal o comando npm run build termina com código 0 e a saída do build aparece na conversa, ou pare depois de 15 turnos" },
          { k: 'code', label: "Set a lint goal (EXAMPLE)", text: "/goal o comando npm run lint não mostra nenhum erro e a saída aparece na conversa, sem desligar nenhuma regra do lint, ou pare depois de 15 turnos" },
          { k: 'code', label: "Set an empty queue goal (EXAMPLE)", text: "/goal a lista de tarefas pendentes em TODO.md está vazia, cada item concluído foi marcado com o teste que o comprova, ou pare depois de 25 turnos" },
          { k: 'p', v: "The examples in the documentation are similar: \"all tests in test/auth pass and the lint step is clean\" and \"CHANGELOG.md has an entry for every PR merged this week\". The turn counts and file names above are ours (EXAMPLE)." },
        ],
      },
      {
        n: "4",
        title: "See the status and cancel",
        blocks: [
          { k: 'code', label: "See the status and cancel", text: "/goal\n/goal clear" },
          { k: 'p', v: "Run one command at a time: if you paste both together, you cancel the goal you just checked. `/goal` alone shows the condition, how long it has been running, how many turns were evaluated, the tokens spent and the evaluator's most recent reason. `/goal clear` removes the goal (the documentation also accepts `stop`, `off`, `reset`, `none` and `cancel`). Tested: with no active goal, both answers matched the documentation. Running `/clear` also removes the goal." },
        ],
      },
      {
        n: "5",
        title: "Permissions and non-interactive mode",
        blocks: [
          { k: 'p', v: "/goal does not change your permission mode. The documentation says that, in manual mode, Claude still asks for permission for what your settings did not allow, such as the test command. To run with nobody around, the documentation mentions auto mode, which this guide does not teach: read its page before deciding." },
          { k: 'p', v: "Without the interface, the documentation shows this form. Not run: it runs the whole cycle and spends tokens." },
          { k: 'code', label: "Run without the interface (terminal, not run: check the documentation)", text: "claude -p \"/goal CHANGELOG.md has an entry for every PR merged this week\"" },
          { k: 'p', v: "Without formatted output, nothing appears until the end. The documentation suggests `--output-format stream-json --verbose` to follow along." },
        ],
      },
      {
        n: "6",
        title: "/goal, /loop or a Stop hook?",
        blocks: [
          {
            k: 'table',
            label: "Comparison between /goal, /loop and a Stop hook",
            head: ["Option", "The next turn starts when", "Stops when"],
            rows: [
              ["/goal", "The previous turn ends", "The evaluator confirms the condition, judges it impossible, an error of yours clears it, or you cancel"],
              ["/loop", "A time interval passes", "You stop it, or Claude decides it is done"],
              ["Stop hook", "The previous turn ends", "Your script or prompt decides"],
            ],
          },
          { k: 'p', muted: true, v: "Table source: the /goal page itself." },
        ],
      },
      {
        n: "7",
        title: "When the goal ends on its own",
        blocks: [
          {
            k: 'ul',
            items: [
              "The condition holds (the checker confirms).",
              "The checker judges the condition impossible.",
              "An error that only you can fix: authentication failure, credit balance exhausted, context too full for compaction to fix, or model unavailable. `Goal cleared after an unrecoverable error` appears; fix it and run `/goal` again.",
              "No progress (no tool used for several turns): Claude Code stops the cycle, warns you and hands control back with the goal still set.",
            ],
          },
          { k: 'p', v: "Requirements: /goal uses the same folder trust rule as hooks and is unavailable with `disableAllHooks` or `allowManagedHooksOnly`. Check-ins and new features require recent versions of Claude Code: check the page. The evaluator spends tokens of the small model, which the documentation says are typically negligible next to the main spend." },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              "/goal makes Claude keep going until the condition holds.",
              "After each turn, a small model checks, and it only reads the conversation.",
              "Write the condition as something Claude's output shows.",
              "Include a limit clause, which is judged from the conversation.",
              "Cancel with `/goal clear`.",
              "In manual mode, Claude still asks for permission.",
            ],
          },
        ],
      },
      {
        title: "Sources",
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Keep Claude working toward a goal](${U_GOAL}). Claude Code, [best practices (give Claude a way to check)](${U_BEST}).` },
          { k: 'p', muted: true, v: "Educational and independent content." },
        ],
      },
    ],
  },
};
