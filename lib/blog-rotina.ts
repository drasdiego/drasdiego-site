import type { Guide } from './blog';

const U_ROT = 'https://code.claude.com/docs/en/routines.md';
const U_AGE = 'https://code.claude.com/docs/en/scheduled-tasks.md';

export const TAREFA_AGENDADA: Guide = {
  slug: 'claude-code-tarefa-agendada',
  category: 'claude-code',
  keyword: 'ROTINA',
  published: '2026-11-21',
  pt: {
    title: 'Claude com notebook fechado: a primeira tarefa, com segurança',
    short: 'Claude com notebook fechado',
    lead: 'Onde a tarefa roda, o que ela faz em seu nome e o passo a passo para criar a primeira, só de leitura, e parar quando quiser.',
    description: 'Como criar a primeira tarefa agendada do Claude Code, que roda na nuvem com o notebook fechado: onde cada opção roda, checklist de segurança, passo a passo pela web e pelo terminal, limites e como parar. Recurso em prévia de pesquisa.',
    facts: ['claude code', 'tarefas agendadas', 'prévia'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: `Nenhuma tarefa agendada foi criada ou executada na produção deste guia: isso gasta cota e age no GitHub da conta. Tudo vem da documentação do Claude Code, aberta em 18/11/2026 ([tarefas agendadas](${U_ROT}) e [comparação das opções](${U_AGE})).` },
          { k: 'p', v: 'É prévia de pesquisa. A página diz: "Behavior, limits, and the API surface may change." O recurso também já se chamou routines (rotinas), e esse nome ainda aparece em alguns lugares (endereço `claude.ai/code/routines`, comando `/routines`). Planos que incluem: Pro, Max, Team e Enterprise. Reconfira tudo antes de seguir.' },
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
              'Tarefa agendada (antes, routine): uma configuração salva do Claude Code, com um pedido (prompt), um ou mais repositórios e um conjunto de conectores, que roda sozinha.',
              'Gatilho: o que dispara a tarefa. Pode ser horário (recorrente ou uma vez), uma chamada de API ou um evento do GitHub.',
              'Conector: uma integração da sua conta do claude.ai (por exemplo, Slack ou um sistema de tarefas). A documentação avisa que o Claude pode usar um conector incluído durante a execução, inclusive para escrever.',
              'Execução (run): cada vez que a tarefa roda. Cada uma abre como uma sessão completa, nova, em que dá para ver o que o Claude fez.',
              'Branch: uma linha de trabalho do código. Por padrão, o Claude empurra o trabalho para uma branch com prefixo `claude/`.',
              'Modo automático: a sessão na nuvem começa em auto mode, em que um modelo classificador permite ou bloqueia ações que, de outro modo, esperariam sua aprovação.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Onde cada opção roda',
        blocks: [
          {
            k: 'table',
            label: 'Comparação entre nuvem, Desktop e /loop',
            head: ['', 'Nuvem (tarefa agendada)', 'Desktop', '/loop'],
            rows: [
              ['Roda em', 'Nuvem, gerenciada pela Anthropic por padrão', 'Sua máquina', 'Sua máquina'],
              ['Precisa da máquina ligada', 'Não', 'Sim', 'Sim'],
              ['Precisa de sessão aberta', 'Não', 'Não', 'Sim'],
              ['Acesso a arquivos locais', 'Não (cópia nova do repositório)', 'Sim', 'Sim'],
              ['Pedidos de permissão', 'Não (roda sozinha)', 'Configurável por tarefa', 'Herdado da sessão'],
              ['Intervalo mínimo', '1 hora', '1 minuto', '1 minuto'],
            ],
          },
          { k: 'p', v: 'Fonte da tabela: a página de comparação da documentação do Claude Code. "Notebook fechado" vale para a coluna da nuvem.' },
        ],
      },
      {
        n: '2',
        title: 'Antes de criar: o checklist de segurança',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Use um repositório de teste (o seu projeto no GitHub), sem dados reais e sem chaves.',
              'Escolha um pedido só de leitura para a primeira tarefa (veja o exemplo na seção 3). A tarefa roda sozinha: o pedido precisa ser completo e dizer o que é sucesso.',
              'Desligue os apps ligados que a tarefa não usa. No Claude Code eles se chamam conectores: por padrão, todos entram na tarefa, e o Claude pode escrever por eles. Remova os que não servem para essa tarefa.',
              'Proteja a versão principal do código no GitHub (a branch principal). A documentação manda usar regras de proteção de branch (branch protection rules ou rulesets) para controlar onde uma execução pode escrever.',
              'Lembre quem assina: o que a tarefa faz pelo GitHub ou pelos conectores aparece como você. Mudanças no código (commits) e pedidos de revisão (pull requests) levam o seu usuário do GitHub.',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'O passo a passo (pela web)',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Abra a página `claude.ai/code/routines` e clique em `New task`. Se o botão se chamar `New routine`, ou se aparecer o menu `Create with Claude` e `Set up manually`, a documentação descreve o caminho para cada caso: escolha `Set up manually`.',
              'Dê um nome e escreva o pedido. Exemplo só de leitura, que não depende de memória das execuções anteriores nem de conector (cada execução é uma sessão nova): ele lê o README do projeto clonado. Se quiser ler issues, isso exige um conector ou acesso ao GitHub, que este guia não testou (EXEMPLO, troque pelo seu caso):',
            ],
          },
          { k: 'code', label: 'Pedido da primeira tarefa (EXEMPLO)', text: "Leia o arquivo README do repositório e escreva um resumo de cinco linhas. Não altere nenhum arquivo, não abra pull request e não comente em nada." },
          {
            k: 'ol',
            start: 3,
            items: [
              'Escolha o gatilho. Em `Schedule`, use uma frequência pronta (por exemplo, diária). O intervalo mínimo é de uma hora. Evite o horário exato da hora cheia: a documentação diz que uma execução marcada para as 9:00 pode começar alguns minutos atrasada, e sugere um horário como 9:07.',
              'Escolha o repositório (em `Advanced settings`, aba `General`, campo `Repository`). Cada execução clona o repositório do zero.',
              'Escolha o ambiente na nuvem. O ambiente `Default` usa acesso de rede `Trusted`, só com uma lista permitida de domínios comuns de desenvolvimento.',
              'Revise os conectores (aba `Connectors` de `Advanced settings`) e remova os que a tarefa não precisa.',
              'Clique em `Create`. Na página da tarefa, clique em `Run now` para testar sem esperar o horário.',
              'Leia o histórico: clique na execução na lista `History`. Ela abre como uma sessão completa, em que você vê o que o Claude fez.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Pelo terminal, com /schedule',
        blocks: [
          {
            k: 'ul',
            items: [
              '`/schedule` cria uma tarefa em conversa: o Claude pergunta sobre horário, repositórios e pedido antes de salvar. A documentação mostra exemplos como `/schedule daily PR review at 9am`.',
              '`/schedule list` mostra suas tarefas, `/schedule update` altera uma e `/schedule run` inicia uma na hora. O alias `/routines` também funciona.',
              'A tarefa criada pelo terminal tem gatilho de horário. Gatilho de API se edita na web; de GitHub, pela web ou pedindo ao Claude (exige o Claude Code em versão recente: confira na página).',
            ],
          },
        ],
      },
      {
        n: '5',
        title: 'Limites, cota e como parar',
        blocks: [
          {
            k: 'ul',
            items: [
              'Cota: as tarefas gastam a mesma cota de uso das suas sessões normais. Veja em `claude.ai/settings/usage`.',
              'Limite por hora: a documentação lista, por exemplo, 100 execuções agendadas por hora na conta, e 30 por hora, por tarefa, para `Run now` e disparos por API. Nenhum desses limites tem excedente.',
              'GitHub desconectado: se a conexão faltar ou expirar, as execuções são puladas por até 72 horas; depois disso, a tarefa é desligada até você reconectar e ligá-la de novo.',
              'Pausar ou apagar: na página da tarefa, o interruptor no topo pausa e retoma; o menu ao lado do nome tem `Edit` e `Delete`.',
              'Time Team ou Enterprise: um Owner pode desligar o recurso para todos os membros.',
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
              'Tarefa agendada roda na nuvem; por padrão, não precisa do seu computador ligado.',
              'Gatilhos: horário (mínimo de uma hora), chamada de API ou evento do GitHub.',
              'Cada execução clona o repositório: não enxerga arquivos soltos do seu Mac.',
              'Ela age em seu nome: commits e conectores aparecem como você.',
              'Desligue os conectores (apps ligados) desnecessários e proteja a branch principal (a versão principal do código).',
              'Comece só de leitura, teste com Run now e leia o histórico.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Automate work with scheduled tasks](${U_ROT}). Claude Code, [Run prompts on a schedule (compare as opções)](${U_AGE}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'Claude with the laptop closed: your first task, safely',
    short: 'Claude with the laptop closed',
    lead: 'Where the task runs, what it does in your name, and the step by step to create the first one, read only, and stop it whenever you want.',
    description: 'How to create your first Claude Code scheduled task, which runs in the cloud with the laptop closed: where each option runs, safety checklist, step by step on the web and in the terminal, limits and how to stop it. Feature in research preview.',
    facts: ['claude code', 'scheduled tasks', 'preview'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: `No scheduled task was created or run while producing this guide: that spends quota and acts on the account's GitHub. Everything comes from the Claude Code documentation, opened on 11/18/2026 ([scheduled tasks](${U_ROT}) and [comparison of the options](${U_AGE})).` },
          { k: 'p', v: 'It is a research preview. The page says: "Behavior, limits, and the API surface may change." The feature was also once called routines, and that name still appears in some places (address `claude.ai/code/routines`, command `/routines`). Plans that include it: Pro, Max, Team and Enterprise. Recheck everything before you follow along.' },
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
              'Scheduled task (formerly, routine): a saved Claude Code configuration, with a prompt, one or more repositories and a set of connectors, that runs on its own.',
              'Trigger: what starts the task. It can be a schedule (recurring or once), an API call or a GitHub event.',
              'Connector: an integration from your claude.ai account (for example, Slack or a task system). The documentation warns that Claude can use an included connector during the run, including to write.',
              'Run: each time the task runs. Each one opens as a full, new session, where you can see what Claude did.',
              'Branch: a line of work in the code. By default, Claude pushes the work to a branch with the prefix `claude/`.',
              'Auto mode: the cloud session starts in auto mode, in which a classifier model allows or blocks actions that would otherwise wait for your approval.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Where each option runs',
        blocks: [
          {
            k: 'table',
            label: 'Comparison of cloud, Desktop and /loop',
            head: ['', 'Cloud (scheduled task)', 'Desktop', '/loop'],
            rows: [
              ['Runs on', 'Cloud, managed by Anthropic by default', 'Your machine', 'Your machine'],
              ['Needs the machine on', 'No', 'Yes', 'Yes'],
              ['Needs an open session', 'No', 'No', 'Yes'],
              ['Access to local files', 'No (fresh copy of the repository)', 'Yes', 'Yes'],
              ['Permission prompts', 'No (runs on its own)', 'Configurable per task', 'Inherited from the session'],
              ['Minimum interval', '1 hour', '1 minute', '1 minute'],
            ],
          },
          { k: 'p', v: 'Source of the table: the comparison page of the Claude Code documentation. "Laptop closed" applies to the cloud column.' },
        ],
      },
      {
        n: '2',
        title: 'Before you create it: the safety checklist',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Use a test repository (your own project on GitHub), with no real data and no keys.',
              'Pick a read only prompt for the first task (see the example in section 3). The task runs on its own: the prompt must be complete and say what success is.',
              'Turn off the connected apps the task does not use. In Claude Code they are called connectors: by default, all of them go into the task, and Claude can write through them. Remove the ones this task does not need.',
              'Protect the main version of the code on GitHub (the main branch). The documentation says to use branch protection rules or rulesets to control where a run can write.',
              'Remember who signs: what the task does through GitHub or the connectors appears as you. Code changes (commits) and review requests (pull requests) carry your GitHub user.',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'The step by step (on the web)',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Open the page `claude.ai/code/routines` and click `New task`. If the button is called `New routine`, or if the menu `Create with Claude` and `Set up manually` appears, the documentation describes the path for each case: choose `Set up manually`.',
              'Give it a name and write the prompt. A read only example, which depends neither on the memory of earlier runs nor on a connector (each run is a new session): it reads the README of the cloned project. If you want to read issues, that requires a connector or GitHub access, which this guide did not test (EXAMPLE, swap in your own case):',
            ],
          },
          { k: 'code', label: 'First task prompt (EXAMPLE)', text: "Leia o arquivo README do repositório e escreva um resumo de cinco linhas. Não altere nenhum arquivo, não abra pull request e não comente em nada." },
          {
            k: 'ol',
            start: 3,
            items: [
              'Choose the trigger. Under `Schedule`, use a ready made frequency (for example, daily). The minimum interval is one hour. Avoid the exact top of the hour: the documentation says a run set for 9:00 may start a few minutes late, and suggests a time such as 9:07.',
              'Choose the repository (under `Advanced settings`, tab `General`, field `Repository`). Each run clones the repository from scratch.',
              'Choose the cloud environment. The `Default` environment uses `Trusted` network access, with only an allow list of common development domains.',
              'Review the connectors (tab `Connectors` of `Advanced settings`) and remove the ones the task does not need.',
              'Click `Create`. On the task page, click `Run now` to test without waiting for the schedule.',
              'Read the history: click the run in the `History` list. It opens as a full session, where you see what Claude did.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'In the terminal, with /schedule',
        blocks: [
          {
            k: 'ul',
            items: [
              '`/schedule` creates a task in conversation: Claude asks about the time, repositories and prompt before saving. The documentation shows examples such as `/schedule daily PR review at 9am`.',
              '`/schedule list` shows your tasks, `/schedule update` changes one and `/schedule run` starts one right away. The alias `/routines` also works.',
              'A task created in the terminal has a schedule trigger. An API trigger is edited on the web; a GitHub one, on the web or by asking Claude (it requires a recent Claude Code version: check the page).',
            ],
          },
        ],
      },
      {
        n: '5',
        title: 'Limits, quota and how to stop',
        blocks: [
          {
            k: 'ul',
            items: [
              'Quota: tasks use the same usage quota as your normal sessions. Check it at `claude.ai/settings/usage`.',
              'Hourly limit: the documentation lists, for example, 100 scheduled runs per hour on the account, and 30 per hour, per task, for `Run now` and API triggers. None of these limits has overage.',
              'GitHub disconnected: if the connection is missing or expires, runs are skipped for up to 72 hours; after that, the task is turned off until you reconnect and turn it on again.',
              'Pause or delete: on the task page, the switch at the top pauses and resumes; the menu next to the name has `Edit` and `Delete`.',
              'Team or Enterprise: an Owner can turn the feature off for all members.',
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
              'A scheduled task runs in the cloud; by default, it does not need your computer on.',
              'Triggers: schedule (minimum of one hour), API call or GitHub event.',
              'Each run clones the repository: it does not see loose files on your Mac.',
              'It acts in your name: commits and connectors appear as you.',
              'Turn off the unnecessary connectors (connected apps) and protect the main branch (the main version of the code).',
              'Start read only, test with Run now and read the history.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Automate work with scheduled tasks](${U_ROT}). Claude Code, [Run prompts on a schedule (compare the options)](${U_AGE}).` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
