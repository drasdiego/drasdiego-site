import type { Guide } from './blog';

const BUSCAR_EVENTO = 'grep -rn "pull_request_target" .github/workflows';
const LISTAR_ARQUIVOS = 'grep -rl "pull_request_target" .github/workflows';

const URL_AVISO = 'https://github.blog/changelog/2026-11-02-pull_request_target-blocked-by-default-december-2';
const URL_CONTROLE = 'https://docs.github.com/actions/how-tos/administer/control-workflow-execution';
const URL_EVENTOS = 'https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows';

export const TARGET_BLOQUEIO: Guide = {
  slug: 'pull-request-target-bloqueio',
  category: 'github',
  keyword: 'TARGET',
  published: '2026-11-19',
  pt: {
    title: 'Seu workflow pode parar em dezembro: o que muda com o pull_request_target e como conferir os seus',
    short: 'pull_request_target bloqueado',
    lead: 'O GitHub Actions passa a bloquear o evento pull_request_target por padrão em repositórios públicos a partir de 02/12/2026. Veja o que muda, como achar o evento nos seus workflows e como decidir.',
    description: 'O que muda em 2 de dezembro de 2026 com o bloqueio do pull_request_target por padrão em repositórios públicos, como achar os workflows que usam o evento e como decidir entre manter o bloqueio ou permitir com política.',
    facts: ['github', 'actions', 'segurança'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Os fatos sobre a mudança vêm do aviso oficial do GitHub (02/11/2026) e da documentação do GitHub Actions, conferidos em 18/11/2026. Este guia não é parecer de segurança nem consultoria. Ele não ensina a explorar o evento `pull_request_target` nem a contornar o bloqueio: ele mostra como saber se você usa o evento e como decidir entre manter o bloqueio ou permitir com política. Os dois comandos de busca abaixo foram rodados no Mac, numa pasta de exemplo criada para este guia. O autor não viu a página de políticas do GitHub numa conta real: o caminho vem da documentação, então confira na documentação, nos links das fontes. Datas e regras podem mudar: reconfira o aviso antes de agir. O guia não tem vínculo com o GitHub.' },
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
              'GitHub Actions: o sistema do GitHub que roda automações no seu repositório.',
              'Workflow: uma dessas automações, descrita num arquivo dentro de `.github/workflows`.',
              'Gatilho (evento): o que liga o workflow. Exemplos: `push`, `pull_request` e `pull_request_target`.',
              'Pull request: o pedido de mudança que alguém abre para propor alterações no código.',
              'pull_request_target: segundo a documentação, roda no contexto da branch padrão do repositório base, e não no contexto do commit de merge, como faz o evento pull_request. A documentação cita como uso: rotular ou comentar pull requests vindos de forks.',
              'Segredos (secrets): dados sensíveis guardados no repositório, como tokens (explicação nossa). O aviso do GitHub diz que o evento "can access its secrets".',
              'Política de eventos (event policy): a regra, nas configurações do GitHub Actions, que diz quais eventos podem rodar.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que muda e quando',
        blocks: [
          {
            k: 'ul',
            items: [
              'Quando: a partir de 02/12/2026, segundo o aviso de 02/11/2026. O aviso diz que a aplicação estava prevista para 02/11/2026 e foi adiada. Os dois testes de bloqueio (09 e 16/11/2026) já passaram.',
              'O que: o GitHub Actions passa a bloquear o evento `pull_request_target` por padrão em repositórios públicos.',
              'Onde vale: repositórios públicos nos planos GitHub Free, Team e Enterprise Cloud. Repositórios privados e internos não são afetados. O aviso não cobre o GitHub Enterprise Server.',
              'Como continuar rodando: o evento só segue rodando se uma política de eventos do Actions permitir de forma explícita.',
              'Por quê: o aviso diz que o evento roda no contexto do repositório base e pode acessar seus segredos.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Passo 1: ache os workflows que usam o evento',
        blocks: [
          { k: 'p', v: 'Abra um terminal na pasta do seu repositório e procure o nome do evento nos arquivos de workflow. É uma busca de texto (ideia nossa, não vem da documentação). Ela só olha os arquivos deste repositório: se você tem vários, repita em cada um.' },
          { k: 'code', label: 'Procurar o evento nos workflows (terminal, testado no Mac)', text: BUSCAR_EVENTO },
          { k: 'p', v: 'Cada linha mostra o arquivo e a linha onde o evento aparece. Se não aparecer nada, o comando termina sem saída e o seu repositório não usa o evento por esse caminho. Para ver só os nomes dos arquivos:' },
          { k: 'code', label: 'Listar só os arquivos que usam o evento (terminal, testado no Mac)', text: LISTAR_ARQUIVOS },
          { k: 'p', v: 'No teste, numa pasta com dois workflows, um com `pull_request_target` e outro com `pull_request`, o primeiro comando mostrou só o arquivo do primeiro, com o número da linha. A busca também acha o nome dentro de comentários; abra o arquivo para confirmar.' },
        ],
      },
      {
        n: '3',
        title: 'Passo 2: entenda o que cada workflow faz',
        blocks: [
          {
            k: 'ul',
            items: [
              'Abra cada arquivo achado e leia o que o workflow faz. Se ele só rotula ou comenta pull requests, é o uso que a documentação descreve para o evento.',
              'A documentação avisa: "Avoid using this event if you need to build or run code from the pull request." (evite o evento se você precisa compilar ou rodar o código que vem no pull request). Ela também diz que rodar código não confiável nesse evento pode causar vulnerabilidades.',
              'Se o seu workflow roda o código que vem do pull request, mudar a configuração pode não bastar: vale reescrever o workflow. Para isso, siga a documentação do GitHub, nos links das fontes.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Passo 3: decida entre manter o bloqueio e permitir',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Manter o bloqueio: é o padrão a partir de 02/12/2026. Se o workflow não é mais necessário, ou pode usar `pull_request`, não há o que liberar.',
              'Permitir com política: segundo a documentação, as políticas ficam em Settings, Actions e Policies, no repositório ou na organização. O aviso recomenda usar o direcionamento por arquivo de workflow (workflow file targeting) para permitir só os workflows que dependem do evento, em vez de liberar tudo.',
              'Ver o que foi afetado: a documentação fala em uma página de Policy insights, que mostra as execuções de workflow que foram bloqueadas. Ela marca o modo Evaluate, que mostra o que seria bloqueado, como disponível só no GitHub Enterprise Cloud. Confira na documentação (link nas fontes) o que aparece no seu plano; o autor não viu essa página numa conta real.',
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
              'A partir de 02/12/2026, o GitHub Actions bloqueia `pull_request_target` por padrão em repositórios públicos (Free, Team e Enterprise Cloud).',
              'Repositórios privados e internos não mudam.',
              'O evento só roda se uma política de eventos permitir de forma explícita.',
              'Procure o evento nos seus workflows com `grep`, leia o que cada um faz e decida: manter bloqueado ou permitir só o necessário.',
              'Evite o evento se o workflow precisa compilar ou rodar o código do pull request.',
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
              'Mito: "todo repositório vai perder o workflow". Verdade: o aviso fala em repositórios públicos e diz que privados e internos não são afetados.',
              'Mito: "o bloqueio é para sempre e não tem saída". Verdade: o aviso diz que o evento segue rodando se uma política de eventos permitir de forma explícita.',
              'Mito: "liberar o evento para tudo resolve". Verdade: o aviso recomenda permitir só os workflows que dependem dele, e a documentação desaconselha o evento para rodar código do pull request.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `GitHub Changelog, 02/11/2026, [pull_request_target blocked by default December 2](${URL_AVISO}). GitHub Docs, [controlar a execução de workflows (políticas de eventos)](${URL_CONTROLE}). GitHub Docs, [eventos que disparam workflows (pull_request_target)](${URL_EVENTOS}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com o GitHub.' },
        ],
      },
    ],
  },
  en: {
    title: 'Your workflow may stop in December: pull_request_target will be blocked by default',
    short: 'pull_request_target blocked',
    lead: 'From December 2, 2026, GitHub Actions blocks the pull_request_target event by default in public repositories. See what changes, how to find the event in your workflows and how to decide.',
    description: 'What changes on December 2, 2026 with the default block of pull_request_target in public repositories, how to find the workflows that use the event, and how to decide between keeping the block or allowing it with a policy.',
    facts: ['github', 'actions', 'security'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The facts about the change come from the official GitHub announcement (November 2, 2026) and from the GitHub Actions documentation, checked on November 18, 2026. This guide is not a security opinion or consulting. It does not teach how to exploit the `pull_request_target` event or how to get around the block: it shows how to find out whether you use the event and how to decide between keeping the block or allowing it with a policy. The two search commands below were run on a Mac, in an example folder created for this guide. The author did not see GitHub’s policies page on a real account: the path comes from the documentation, so check the documentation, in the source links. Dates and rules can change: check the announcement again before you act. The guide is not affiliated with GitHub.' },
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
              'GitHub Actions: the GitHub system that runs automations in your repository.',
              'Workflow: one of those automations, described in a file inside `.github/workflows`.',
              'Trigger (event): what starts the workflow. Examples: `push`, `pull_request` and `pull_request_target`.',
              'Pull request: the change request someone opens to propose changes to the code.',
              'pull_request_target: according to the documentation, it runs in the context of the default branch of the base repository, and not in the context of the merge commit, as the pull_request event does. The documentation gives this use: labeling or commenting on pull requests from forks.',
              'Secrets: sensitive data stored in the repository, such as tokens (our explanation). The GitHub announcement says the event "can access its secrets".',
              'Event policy: the rule, in the GitHub Actions settings, that says which events may run.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What changes and when',
        blocks: [
          {
            k: 'ul',
            items: [
              'When: from December 2, 2026, according to the November 2, 2026 announcement. The announcement says enforcement had been planned for November 2, 2026 and was postponed. The two block tests (November 9 and 16, 2026) have already passed.',
              'What: GitHub Actions starts blocking the `pull_request_target` event by default in public repositories.',
              'Where it applies: public repositories on the GitHub Free, Team and Enterprise Cloud plans. Private and internal repositories are not affected. The announcement does not cover GitHub Enterprise Server.',
              'How to keep it running: the event keeps running only if an Actions event policy explicitly allows it.',
              'Why: the announcement says the event runs in the context of the base repository and can access its secrets.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Step 1: find the workflows that use the event',
        blocks: [
          { k: 'p', v: 'Open a terminal in your repository folder and search for the event name in the workflow files. It is a text search (our idea, it does not come from the documentation). It only looks at the files of this repository: if you have several, repeat it in each one.' },
          { k: 'code', label: 'Search the workflows for the event (terminal, tested on Mac)', text: BUSCAR_EVENTO },
          { k: 'p', v: 'Each line shows the file and the line where the event appears. If nothing shows up, the command ends with no output and your repository does not use the event this way. To see only the file names:' },
          { k: 'code', label: 'List only the files that use the event (terminal, tested on Mac)', text: LISTAR_ARQUIVOS },
          { k: 'p', v: 'In the test, in a folder with two workflows, one with `pull_request_target` and another with `pull_request`, the first command showed only the first file, with the line number. The search also finds the name inside comments; open the file to confirm.' },
        ],
      },
      {
        n: '3',
        title: 'Step 2: understand what each workflow does',
        blocks: [
          {
            k: 'ul',
            items: [
              'Open each file you found and read what the workflow does. If it only labels or comments on pull requests, that is the use the documentation describes for the event.',
              'The documentation warns: "Avoid using this event if you need to build or run code from the pull request." It also says that running untrusted code in this event can cause vulnerabilities.',
              'If your workflow runs the code that comes from the pull request, changing the settings may not be enough: rewriting the workflow is worth it. For that, follow the GitHub documentation, in the source links.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Step 3: decide between keeping the block and allowing it',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Keep the block: it is the default from December 2, 2026. If the workflow is no longer needed, or can use `pull_request`, there is nothing to allow.',
              'Allow with a policy: according to the documentation, policies live in Settings, Actions and Policies, in the repository or in the organization. The announcement recommends using workflow file targeting to allow only the workflows that depend on the event, instead of allowing everything.',
              'See what was affected: the documentation mentions a Policy insights page, which shows the workflow runs that were blocked. It marks the Evaluate mode, which shows what would be blocked, as available only on GitHub Enterprise Cloud. Check the documentation (link in the sources) for what shows up on your plan; the author did not see this page on a real account.',
            ],
          },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'From December 2, 2026, GitHub Actions blocks `pull_request_target` by default in public repositories (Free, Team and Enterprise Cloud).',
              'Private and internal repositories do not change.',
              'The event only runs if an event policy explicitly allows it.',
              'Search for the event in your workflows with `grep`, read what each one does and decide: keep it blocked or allow only what is needed.',
              'Avoid the event if the workflow needs to build or run the pull request code.',
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
              'Myth: "every repository will lose its workflow". Fact: the announcement talks about public repositories and says private and internal ones are not affected.',
              'Myth: "the block is forever and has no way out". Fact: the announcement says the event keeps running if an event policy explicitly allows it.',
              'Myth: "allowing the event for everything solves it". Fact: the announcement recommends allowing only the workflows that depend on it, and the documentation advises against the event for running pull request code.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `GitHub Changelog, November 2, 2026, [pull_request_target blocked by default December 2](${URL_AVISO}). GitHub Docs, [Controlling workflow execution (event policies)](${URL_CONTROLE}). GitHub Docs, [Events that trigger workflows (pull_request_target)](${URL_EVENTOS}).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with GitHub.' },
        ],
      },
    ],
  },
};
