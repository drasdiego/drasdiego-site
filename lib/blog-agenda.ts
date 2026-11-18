import type { Guide } from './blog';

const WORKFLOW_YAML = 'name: tarefa-agendada\n\non:\n  schedule:\n    - cron: "17 9 * * *"\n      timezone: "America/Sao_Paulo"\n  workflow_dispatch:\n\njobs:\n  rodar:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Registrar quando rodou\n        run: |\n          echo "Rodou em UTC: $(date -u \'+%Y-%m-%d %H:%M:%S\')"\n          echo "Evento: ${{ github.event_name }}"';
const CONVERSAO_PYTHON = 'from datetime import datetime\nfrom zoneinfo import ZoneInfo\n\nhora_utc = 9\ndia = datetime(2026, 11, 18, hora_utc, 0, tzinfo=ZoneInfo("UTC"))\nem_brasilia = dia.astimezone(ZoneInfo("America/Sao_Paulo"))\nprint(f"{hora_utc:02d}:00 UTC = {em_brasilia:%H:%M} em America/Sao_Paulo (UTC{em_brasilia.utcoffset().total_seconds() / 3600:+.0f})")\n\nlocal = datetime(2026, 11, 18, 9, 17, tzinfo=ZoneInfo("America/Sao_Paulo"))\nprint(f"09:17 em America/Sao_Paulo = {local.astimezone(ZoneInfo(\'UTC\')):%H:%M} UTC")';
const COMANDOS_GH = 'gh run list --workflow tarefa-agendada.yml --limit 5\ngh workflow enable tarefa-agendada.yml';

const URL_EVENTOS = 'https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows';
const URL_SINTAXE = 'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax';
const URL_DESATIVAR = 'https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow';
const URL_MANUAL = 'https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow';
const URL_CHANGELOG = 'https://github.blog/changelog/2026-03-19-github-actions-late-march-2026-updates/';
const URL_GH_RUN = 'https://cli.github.com/manual/gh_run_list';
const URL_SCHEMA = 'https://json.schemastore.org/github-workflow.json';

export const CRON_ACTIONS: Guide = {
  slug: 'cron-actions-nao-e-relogio',
  category: 'github',
  published: '2026-11-18',
  pt: {
    title: 'O cron do GitHub Actions não é um relógio: o exemplo pronto para copiar',
    short: 'Cron do Actions não é relógio',
    lead: 'Um arquivo de workflow pronto com cron, fuso horário e minuto quebrado, a conta de UTC para Brasília, as três regras da documentação sobre atraso, descarte e desativação em 60 dias, e como conferir se a tarefa rodou.',
    description: 'Um arquivo de workflow pronto com cron, fuso horário e minuto quebrado, a conta de UTC para Brasília, as três regras da documentação sobre atraso, descarte e desativação em 60 dias, e como conferir se a tarefa rodou.',
    facts: ['github actions', 'cron', 'exemplo pronto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'A documentação do GitHub foi lida em 18/11/2026, com a conferência de cada frase citada neste guia. O arquivo YAML do guia foi lido pelo PyYAML e pelo Ruby sem erro e validado contra o schema de workflows do SchemaStore (um schema da comunidade, não oficial do GitHub), mas não foi executado num repositório do GitHub. O atraso e o descarte de tarefas descritos pela documentação não foram reproduzidos: não há como provocar carga alta do GitHub num teste. A conta de fuso foi feita no computador do autor. Nomes de arquivo, horários e minutos são exemplo. Sem vínculo com o GitHub.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'GitHub Actions: a automação do GitHub. Roda tarefas a partir de arquivos que ficam no seu repositório.',
              'Workflow (fluxo): um arquivo YAML com a tarefa. Os arquivos ficam na pasta `.github/workflows` do repositório.',
              'Cron: uma regra de horário em cinco campos: minuto, hora, dia do mês, mês e dia da semana. `17 9 * * *` quer dizer minuto 17, hora 9, todos os dias.',
              'UTC: o horário universal, usado como padrão. Brasília está três horas atrás dele (UTC-3).',
              'Fuso horário (timezone): o nome da região, como `America/Sao_Paulo`, no formato IANA.',
              'Branch padrão (default branch): a ramificação principal do repositório. O agendamento só roda a partir dela.',
              'Minuto quebrado: um minuto diferente de 0, como 17. Serve para fugir do começo da hora, que a documentação cita como horário de pico.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O arquivo pronto',
        blocks: [
          { k: 'p', v: 'Crie o arquivo `.github/workflows/tarefa-agendada.yml` no seu repositório e faça o commit na branch padrão. O arquivo roda todo dia às 9:17 no horário de Brasília e também pode ser disparado à mão, o que ajuda a testar. A tarefa só escreve duas linhas no registro (log) da execução: quando rodou, em UTC, e que evento a disparou.' },
          { k: 'code', label: 'Workflow (YAML)', text: WORKFLOW_YAML },
          {
            k: 'ul',
            items: [
              '`cron: "17 9 * * *"`: minuto 17, hora 9, todos os dias. Escolher 17 em vez de 0 segue a orientação da documentação de usar outro minuto da hora.',
              '`timezone: "America/Sao_Paulo"`: o horário do cron passa a valer em Brasília. A documentação mostra o campo `timezone` na mesma lista do `cron`, como no exemplo `cron: \'30 5 * * 1-5\'` com `timezone: "America/New_York"`. O changelog do GitHub de 19/03/2026 anunciou o recurso.',
              '`workflow_dispatch:`: permite rodar à mão pela aba Actions, pelo botão Run workflow.',
              '`runs-on: ubuntu-latest`: o tipo de máquina em que a tarefa roda.',
            ],
          },
          { k: 'p', muted: true, v: 'O que foi testado no arquivo: a leitura por PyYAML e Ruby, e a validação contra o schema do SchemaStore, que reconhece o campo `timezone`. Trocando o nome do campo por outro, o schema reprovou o arquivo. A execução no GitHub não foi testada.' },
        ],
      },
      {
        n: '2',
        title: 'A conta de UTC para Brasília',
        blocks: [
          { k: 'p', v: 'Sem o campo `timezone`, o horário do cron é UTC. A documentação diz: "By default, scheduled workflows run in UTC." Em Brasília, que está em UTC-3, um cron das 9 roda às 6 da manhã. É uma conta nossa de fuso, feita com o banco de fusos do Python, e não um texto do GitHub. O script abaixo faz a conta nos dois sentidos:' },
          { k: 'code', label: 'Conversão de fuso (Python)', text: CONVERSAO_PYTHON },
          {
            k: 'table',
            label: 'Cron em UTC e hora em Brasília',
            head: ['Cron em UTC', 'Em Brasília (UTC-3)'],
            rows: [
              ['00:00', '21:00 do dia anterior'],
              ['06:00', '03:00'],
              ['09:00', '06:00'],
              ['12:00', '09:00'],
              ['15:00', '12:00'],
              ['21:00', '18:00'],
            ],
          },
          { k: 'p', v: 'Com `timezone: "America/Sao_Paulo"`, o cron das 9:17 corresponde a 12:17 em UTC. No banco de fusos do teste, Brasília está em UTC-3 e sem horário de verão em 2026. A regra depende de decreto: se o horário de verão voltar, reconfira a conta. No mesmo banco de fusos, America/Manaus está em UTC-4 e America/Rio_Branco em UTC-5: fora de Brasília, a conta é outra.' },
        ],
      },
      {
        n: '3',
        title: 'As três regras da documentação',
        blocks: [
          { k: 'p', v: 'Todas as frases abaixo foram conferidas, palavra por palavra, na página do evento `schedule` em 18/11/2026. A documentação não dá número de atraso nem de frequência de descarte, e este guia também não.' },
          {
            k: 'ol',
            items: [
              'Atraso em horário de pico. "The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs. High load times include the start of every hour." (o agendamento pode atrasar em períodos de carga alta, e o começo de toda hora está entre eles).',
              'Descarte de tarefas na fila. "If the load is sufficiently high enough, some queued jobs may be dropped." (se a carga for alta o bastante, algumas tarefas na fila podem ser descartadas).',
              'Desativação em repositório público. "In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days." (em repositório público, o agendamento é desativado sozinho depois de 60 dias sem atividade). Repositório privado não aparece nessa frase.',
            ],
          },
          { k: 'p', v: 'O que diminui a chance de atraso: a documentação diz "To decrease the chance of delay, schedule your workflow to run at a different time of the hour." (escolha outro minuto da hora). Isso diminui a chance de atraso. Não garante que o atraso não aconteça, e não resolve o descarte da regra 2.' },
        ],
      },
      {
        n: '4',
        title: 'Como conferir que a tarefa rodou',
        blocks: [
          { k: 'p', v: 'Recomendação nossa: se a hora exata importa, confira depois se a execução aconteceu e a que horas. No site do GitHub, abra a aba Actions do repositório e veja a lista de execuções do workflow. Pelo terminal, com o GitHub CLI (`gh`) já logado e dentro da pasta do repositório, o primeiro comando abaixo lista as cinco últimas execuções do arquivo. O segundo reativa um workflow que foi desativado (a documentação cita o comando e também o botão Enable workflow, na aba Actions).' },
          { k: 'code', label: 'Conferir e reativar (terminal, GitHub CLI)', text: COMANDOS_GH },
          { k: 'p', muted: true, v: 'Não executado: os comandos `gh` acima não foram executados num repositório para este guia. O autor só confirmou, na ajuda do `gh` 2.104.0, que as opções `--workflow` e `--limit` e o subcomando `workflow enable` existem.' },
          { k: 'p', v: 'Para testar o arquivo sem esperar o horário, use o botão Run workflow na aba Actions, que aparece por causa do `workflow_dispatch`. Lembre que o agendamento só roda a partir da branch padrão.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Sem o campo `timezone`, o horário do cron é UTC. Cron das 9 em UTC é 6 da manhã em Brasília.',
              'Informe o fuso (`timezone: "America/Sao_Paulo"`) e escolha um minuto quebrado, como 17.',
              'A documentação avisa que o agendamento pode atrasar em pico, que tarefas na fila podem ser descartadas e que, em repositório público, ele é desativado após 60 dias sem atividade.',
              'Se a hora exata importa, confira na aba Actions se a execução aconteceu.',
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
              'Mito: "o cron do GitHub é um relógio exato". Verdade: a documentação diz que pode atrasar e que tarefas podem ser descartadas.',
              'Mito: "cron das 9 roda às 9 no meu horário". Verdade: sem o campo `timezone`, roda às 9 em UTC, que é 6 em Brasília.',
              'Mito: "o agendamento funciona para sempre". Verdade: em repositório público, é desativado depois de 60 dias sem atividade.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `GitHub Docs, [Events that trigger workflows](${URL_EVENTOS}) (evento schedule). GitHub Docs, [Workflow syntax for GitHub Actions](${URL_SINTAXE}) (on.schedule). GitHub Docs, [Disabling and enabling a workflow](${URL_DESATIVAR}). GitHub Docs, [Manually running a workflow](${URL_MANUAL}). GitHub Changelog, [Timezone support for scheduled workflows](${URL_CHANGELOG}) (19/03/2026). GitHub CLI, [gh run list](${URL_GH_RUN}). SchemaStore, [schema de workflows do GitHub](${URL_SCHEMA}) (da comunidade, não oficial do GitHub).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com o GitHub.' },
        ],
      },
    ],
  },
  en: {
    title: 'The GitHub Actions cron is not a clock',
    short: 'Actions cron is not a clock',
    lead: 'A ready-made workflow file with cron, time zone and an off-the-hour minute, the UTC to Brasília conversion, the three rules in the documentation about delay, dropped jobs and deactivation after 60 days, and how to check that the task ran.',
    description: 'A ready-made workflow file with cron, time zone and an off-the-hour minute, the UTC to Brasília conversion, the three rules in the documentation about delay, dropped jobs and deactivation after 60 days, and how to check that the task ran.',
    facts: ['github actions', 'cron', 'ready-made example'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The GitHub documentation was read on November 18, 2026, and each sentence quoted in this guide was checked. The YAML file in this guide was read by PyYAML and Ruby without error and validated against the SchemaStore workflow schema (a community schema, not an official GitHub one), but it was not run in a GitHub repository. The delay and the dropping of jobs described by the documentation were not reproduced: there is no way to cause high GitHub load in a test. The time zone calculation was done on the author’s computer. File names, times and minutes are examples. Not affiliated with GitHub.' },
          { k: 'p', v: 'The time zone `America/Sao_Paulo` and the conversion to Brasília time are examples: swap them for your own time zone.' },
          { k: 'p', v: 'The names and messages inside the code are in Portuguese, as in the original guide: `tarefa-agendada` is scheduled-task, `rodar` is run, `Registrar quando rodou` is Record when it ran, `Rodou em UTC` is Ran at UTC, `Evento` is Event, `hora_utc` is utc_hour, `dia` is day, `em_brasilia` is in_brasilia, and `em` in the printed text is in. They are only example names, and the result does not change if you rename them (if you rename the workflow file, use the new name in the `gh` commands too).' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'GitHub Actions: GitHub’s automation. It runs tasks from files that live in your repository.',
              'Workflow: a YAML file with the task. The files live in the `.github/workflows` folder of the repository.',
              'Cron: a time rule in five fields: minute, hour, day of month, month and day of week. `17 9 * * *` means minute 17, hour 9, every day.',
              'UTC: universal time, used as the default. Brasília is three hours behind it (UTC-3).',
              'Time zone (timezone): the name of the region, such as `America/Sao_Paulo`, in IANA format.',
              'Default branch: the main branch of the repository. The schedule only runs from it.',
              'Off-the-hour minute: a minute other than 0, such as 17. It helps you avoid the start of the hour, which the documentation lists as a peak time.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The ready-made file',
        blocks: [
          { k: 'p', v: 'Create the file `.github/workflows/tarefa-agendada.yml` in your repository and commit it to the default branch. The file runs every day at 9:17 Brasília time and can also be triggered by hand, which helps with testing. The task only writes two lines to the run log: when it ran, in UTC, and which event triggered it. The time zone `America/Sao_Paulo` is an example: replace it with your own.' },
          { k: 'code', label: 'Workflow (YAML)', text: WORKFLOW_YAML },
          {
            k: 'ul',
            items: [
              '`cron: "17 9 * * *"`: minute 17, hour 9, every day. Choosing 17 instead of 0 follows the documentation’s advice to use another minute of the hour.',
              '`timezone: "America/Sao_Paulo"`: the cron time now counts in Brasília time. The documentation shows the `timezone` field in the same list as `cron`, as in the example `cron: \'30 5 * * 1-5\'` with `timezone: "America/New_York"`. The GitHub changelog of March 19, 2026 announced the feature.',
              '`workflow_dispatch:`: lets you run it by hand from the Actions tab, with the Run workflow button.',
              '`runs-on: ubuntu-latest`: the type of machine the task runs on.',
            ],
          },
          { k: 'p', muted: true, v: 'What was tested on the file: reading by PyYAML and Ruby, and validation against the SchemaStore schema, which recognizes the `timezone` field. When the field name was swapped for another one, the schema rejected the file. The run on GitHub was not tested.' },
        ],
      },
      {
        n: '2',
        title: 'The UTC to Brasília conversion',
        blocks: [
          { k: 'p', v: 'Without the `timezone` field, the cron time is UTC. The documentation says: "By default, scheduled workflows run in UTC." In Brasília, which is at UTC-3, a cron at 9 runs at 6 in the morning. This is our own time zone calculation, made with Python’s time zone database, and not a GitHub text. The script below does the calculation in both directions:' },
          { k: 'code', label: 'Time zone conversion (Python)', text: CONVERSAO_PYTHON },
          {
            k: 'table',
            label: 'Cron in UTC and the time in Brasília',
            head: ['Cron in UTC', 'In Brasília (UTC-3)'],
            rows: [
              ['00:00', '21:00 the day before'],
              ['06:00', '03:00'],
              ['09:00', '06:00'],
              ['12:00', '09:00'],
              ['15:00', '12:00'],
              ['21:00', '18:00'],
            ],
          },
          { k: 'p', v: 'With `timezone: "America/Sao_Paulo"`, the 9:17 cron matches 12:17 in UTC. In the time zone database used in the test, Brasília is at UTC-3 and has no daylight saving time in 2026. The rule depends on a decree: if daylight saving time comes back, check the calculation again. In the same database, America/Manaus is at UTC-4 and America/Rio_Branco at UTC-5: outside Brasília time, the calculation is different. The Brasília figures are examples: use your own time zone.' },
        ],
      },
      {
        n: '3',
        title: 'The three rules in the documentation',
        blocks: [
          { k: 'p', v: 'Every sentence below was checked, word by word, on the `schedule` event page on November 18, 2026. The documentation gives no number for the delay nor for how often jobs are dropped, and this guide does not either.' },
          {
            k: 'ol',
            items: [
              'Delay at peak times. "The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs. High load times include the start of every hour." The start of every hour is one of the peak times.',
              'Dropped queued jobs. "If the load is sufficiently high enough, some queued jobs may be dropped." Some jobs waiting in the queue may be discarded.',
              'Deactivation in a public repository. "In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days." The schedule turns itself off after 60 days with no activity. A private repository does not appear in that sentence.',
            ],
          },
          { k: 'p', v: 'What lowers the chance of delay: the documentation says "To decrease the chance of delay, schedule your workflow to run at a different time of the hour." That lowers the chance of delay. It does not guarantee that the delay will not happen, and it does not solve the dropped jobs of rule 2.' },
        ],
      },
      {
        n: '4',
        title: 'How to check that the task ran',
        blocks: [
          { k: 'p', v: 'Our recommendation: if the exact time matters, check afterwards that the run happened and at what time. On the GitHub site, open the Actions tab of the repository and look at the list of runs of the workflow. From the terminal, with the GitHub CLI (`gh`) already logged in and inside the repository folder, the first command below lists the last five runs of the file. The second re-enables a workflow that was disabled (the documentation mentions the command and also the Enable workflow button, in the Actions tab).' },
          { k: 'code', label: 'Check and re-enable (terminal, GitHub CLI)', text: COMANDOS_GH },
          { k: 'p', muted: true, v: 'Not executed: the `gh` commands above were not run in a repository for this guide. The author only confirmed, in the help of `gh` 2.104.0, that the `--workflow` and `--limit` options and the `workflow enable` subcommand exist.' },
          { k: 'p', v: 'To test the file without waiting for the scheduled time, use the Run workflow button in the Actions tab, which appears because of `workflow_dispatch`. Remember that the schedule only runs from the default branch.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'Without the `timezone` field, the cron time is UTC. A cron at 9 in UTC is 6 in the morning in Brasília.',
              'Set the time zone (`timezone: "America/Sao_Paulo"`) and choose an off-the-hour minute, such as 17.',
              'The documentation warns that the schedule can be delayed at peak times, that queued jobs can be dropped and that, in a public repository, it is disabled after 60 days with no activity.',
              'If the exact time matters, check in the Actions tab that the run happened.',
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
              'Myth: "the GitHub cron is an exact clock". Fact: the documentation says it can be delayed and that jobs can be dropped.',
              'Myth: "a cron at 9 runs at 9 in my time". Fact: without the `timezone` field, it runs at 9 in UTC, which is 6 in Brasília.',
              'Myth: "the schedule works forever". Fact: in a public repository, it is disabled after 60 days with no activity.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `GitHub Docs, [Events that trigger workflows](${URL_EVENTOS}) (schedule event). GitHub Docs, [Workflow syntax for GitHub Actions](${URL_SINTAXE}) (on.schedule). GitHub Docs, [Disabling and enabling a workflow](${URL_DESATIVAR}). GitHub Docs, [Manually running a workflow](${URL_MANUAL}). GitHub Changelog, [Timezone support for scheduled workflows](${URL_CHANGELOG}) (March 19, 2026). GitHub CLI, [gh run list](${URL_GH_RUN}). SchemaStore, [GitHub workflow schema](${URL_SCHEMA}) (community schema, not official from GitHub).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with GitHub.' },
        ],
      },
    ],
  },
};
