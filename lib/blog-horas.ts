import type { Guide } from './blog';

export const CODESPACES_HORAS: Guide = {
  slug: 'codespaces-horas-contadas',
  category: 'github',
  keyword: 'HORAS',
  published: '2026-11-21',
  pt: {
    title: "Codespaces: como contar as horas e não gastar a cota à toa",
    short: "Codespaces: horas contadas",
    lead: "A cota do Codespaces é medida em horas de núcleo. Aqui está a conta, o que muda ao ligar e desligar, e o passo a passo para parar, ajustar o tempo limite e acompanhar o uso.",
    description: "Quantas horas o GitHub Codespaces inclui na conta pessoal gratuita, por que máquina maior gasta a cota mais rápido, o que cobra parado e como parar, ajustar o desligamento automático e acompanhar o uso.",
    facts: ["github", "codespaces", "cota"],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          {
            k: "p",
            v: "Os fatos e os números vêm das páginas do GitHub citadas nas fontes, abertas em 18/11/2026; a página de cobrança não mostra data de atualização, então cota, preço e comandos mudam: reconfira antes de decidir. O que deu para rodar no Mac foi só a ajuda dos comandos (`gh codespace --help` e os `--help` de `stop`, `list`, `view`, `create` e `delete`, com o GitHub CLI 2.104.0). Os comandos que usam a sua conta não foram executados: o autor não ligou nenhum codespace para este guia. As linhas marcadas como dedução são contas feitas a partir das tabelas das páginas, não números escritos nelas. Vale para conta pessoal; organizações têm regras próprias. O guia não é consultoria de custo e não tem vínculo com o GitHub.",
          },
        ],
      },
      {
        n: "0",
        title: "O que é cada coisa",
        blocks: [
          {
            k: "ol",
            start: 1,
            items: [
              "Codespace: segundo a documentação, \"um ambiente de desenvolvimento hospedado na nuvem\", que você abre no navegador, no Visual Studio Code ou pelo GitHub CLI.",
              "Núcleo (core): uma unidade de processamento do computador. As máquinas do Codespaces vão de 2 a 32 núcleos.",
              "Hora de núcleo (core hour): a medida da cota de computação. A página de produto diz que 120 horas de núcleo equivalem a 60 horas de uso numa máquina de 2 núcleos.",
              "Tempo limite de inatividade (idle timeout): o tempo sem atividade depois do qual o codespace é parado sozinho.",
              "Armazenamento: o espaço que o codespace ocupa, cobrado à parte da computação, em GB-mês.",
            ],
          },
        ],
      },
      {
        n: "1",
        title: "A conta: cota gratuita e tamanho da máquina",
        blocks: [
          {
            k: "p",
            v: "A página de cobrança diz: \"All GitHub personal accounts include a quota of free compute time and storage\" (toda conta pessoal inclui uma cota de computação e armazenamento grátis). Para o plano Free, a lista da página traz 120 horas de computação e 15 GB-mês de armazenamento por mês; para o Pro, 180 horas e 20 GB-mês (este último trecho foi lido em resumo: confira na página). A página de produto confirma o caso do Free: \"120 core hours or 60 hours of run time on a 2 core codespace\".",
          },
          {
            k: "p",
            v: "A página diz que o custo de computação é proporcional ao número de núcleos, e a tabela de preços traz um multiplicador de uso incluído igual ao número de núcleos. A tabela abaixo aplica essa regra à cota do plano Free (dedução: horas de relógio = 120 dividido pelo multiplicador). Os preços são os da página em 18/11/2026, para quando a cota acabar: reconfira.",
          },
          {
            k: "table",
            label: "Horas de uso da cota Free por tamanho de máquina",
            head: [
              "Máquina",
              "Multiplicador",
              "Horas de uso na cota Free (dedução)",
              "Preço por hora (página, 18/11/2026)",
            ],
            rows: [
              ["2 núcleos", "2", "60", "US$ 0,18"],
              ["4 núcleos", "4", "30", "US$ 0,36"],
              ["8 núcleos", "8", "15", "US$ 0,72"],
              ["16 núcleos", "16", "7,5", "US$ 1,44"],
              ["32 núcleos", "32", "3,75", "US$ 2,88"],
            ],
          },
          {
            k: "p",
            v: "Armazenamento: US$ 0,07 por GB-mês na página (o multiplicador não se aplica a ele). Quando a cota acaba: sem forma de pagamento válida na conta, o uso é bloqueado; com forma de pagamento, o uso pode continuar sujeito aos orçamentos da conta (confira os detalhes na página de cobrança). Há alertas por e-mail ao chegar a 90% e a 100% da cota incluída.",
          },
        ],
      },
      {
        n: "2",
        title: "O que gasta e o que não gasta",
        blocks: [
          {
            k: "ul",
            items: [
              "A página sobre parar um codespace diz: \"Only running codespaces incur CPU charges. A stopped codespace incurs only storage costs.\" (só codespaces em execução geram cobrança de CPU; um codespace parado gera só custo de armazenamento).",
              "Então o relógio da computação corre enquanto o codespace está ligado, mesmo que você não esteja usando, até ele ser parado.",
              "Parado ainda ocupa armazenamento, que tem cota própria. Para não pagar por armazenamento de um codespace que você não vai mais usar, apague-o (veja o passo 4).",
              "Vida máxima: a página do tempo limite diz que um codespace tem vida máxima de 12 horas, independentemente do tempo limite de inatividade.",
            ],
          },
        ],
      },
      {
        n: "3",
        title: "Passo a passo",
        blocks: [
          {
            k: "ol",
            start: 1,
            items: [
              "Veja o que está ligado. A ajuda do comando lista os campos `name`, `state`, `lastUsedAt` e `machineName`. O comando exige login no GitHub CLI:",
            ],
          },
          {
            k: "code",
            label: "Listar codespaces (terminal, não executado: confira na documentação)",
            text: "gh codespace list --json name,state,lastUsedAt,machineName",
          },
          {
            k: "ol",
            start: 2,
            items: [
              "Pare o que não está usando. A ajuda do comando (conferida no Mac) mostra o uso `gh codespace stop [flags]` e a opção `-c, --codespace` com o nome. Sem a opção, o comando oferece uma lista para escolher. Pelo navegador, o caminho da documentação é abrir github.com/codespaces, o menu de três pontos ao lado do codespace e escolher Stop codespace:",
            ],
          },
          {
            k: "code",
            label: "Parar um codespace (terminal, ajuda conferida; execução exige login)",
            text: "gh codespace stop --codespace NOME_DO_CODESPACE",
          },
          {
            k: "ol",
            start: 3,
            items: [
              "Ajuste o desligamento automático. O padrão é 30 minutos de inatividade. Em Configurações, Codespaces, o campo Default idle timeout aceita de 5 a 240 minutos. Para um codespace só, a ajuda do `gh codespace create` mostra a opção `--idle-timeout`, com exemplos como \"10m\" e \"1h\". A documentação diz que, hoje, não dá para definir o padrão pela linha de comando. Uma política da organização pode impor um máximo menor. Atenção: o comando abaixo cria um codespace novo e começa a contar horas até ele parar; use só se você for mesmo trabalhar nele e depois pare ou apague (passos 2 e 4). `USUARIO/REPOSITORIO` é um exemplo fictício: troque pelo seu repositório.",
            ],
          },
          {
            k: "code",
            label: "Criar com tempo limite de 10 minutos (terminal, ajuda conferida; execução exige login)",
            text: "gh codespace create --repo USUARIO/REPOSITORIO --idle-timeout 10m",
          },
          {
            k: "ol",
            start: 4,
            items: [
              "Apague o que acabou. A ajuda do `gh codespace delete` mostra as opções `--codespace` e `--days N` (apaga os mais antigos que N dias). O `gh codespace create` também aceita `--retention-period`, que define em quanto tempo, depois de desligado, o codespace é apagado sozinho (máximo de 30 dias, segundo a ajuda). Apagar pode descartar mudanças que não foram enviadas ao repositório: confira antes:",
            ],
          },
          {
            k: "code",
            label: "Apagar um codespace (terminal, ajuda conferida; execução exige login)",
            text: "gh codespace delete --codespace NOME_DO_CODESPACE",
          },
          {
            k: "ol",
            start: 5,
            items: [
              "Acompanhe o uso e crie alertas. Para ver o uso: abra `github.com/settings/billing` e use as abas para ver o consumo de cada produto; o botão View details mostra mais informações (página \"Viewing your usage of metered products and licenses\"). Para criar um orçamento: na mesma página, em Budgets and alerts, comece um orçamento, defina o valor e, se a opção existir, ative Stop usage when budget limit is reached; os alertas de 75%, 90% e 100% são opcionais (página \"Setting up budgets to control spending on metered products\"). Além disso, a página de orçamentos e alertas diz que há aviso por e-mail quando o uso incluído de horas de núcleo e de armazenamento chega a 90% e a 100%. Menus mudam: confira na página (links nas fontes).",
            ],
          },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: "ol",
            start: 1,
            items: [
              "A cota é medida em horas de núcleo: máquina maior gasta a cota mais rápido.",
              "Só o codespace ligado gasta computação; parado, gasta armazenamento.",
              "O desligamento automático é de 30 minutos por padrão e pode ir de 5 a 240 minutos.",
              "Pare com `gh codespace stop`, apague o que acabou e reconfira cota e preço: eles mudam.",
            ],
          },
        ],
      },
      {
        title: "Mito x verdade",
        blocks: [
          {
            k: "ul",
            items: [
              "Mito: \"são 120 horas, ponto\". Verdade: são 120 horas de núcleo; numa máquina de 2 núcleos são 60 horas, e em máquina maior, menos.",
              "Mito: \"fechei a aba, então parou\". Verdade: o codespace é parado pelo tempo de inatividade ou quando você o para; até lá, a computação corre.",
              "Mito: \"parado é de graça\". Verdade: parado, a documentação diz que há custo de armazenamento.",
            ],
          },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          {
            k: "p",
            v: "GitHub Docs, [cobrança do GitHub Codespaces](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces). GitHub, [página de produto do Codespaces](https://github.com/features/codespaces). GitHub Docs, [o que são codespaces](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces). GitHub Docs, [parar e iniciar um codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace). GitHub Docs, [tempo limite de inatividade](https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces). GitHub CLI, [gh codespace stop](https://cli.github.com/manual/gh_codespace_stop). GitHub CLI, [gh codespace create](https://cli.github.com/manual/gh_codespace_create). GitHub CLI, [gh codespace delete](https://cli.github.com/manual/gh_codespace_delete). GitHub Docs, [ver o uso de produtos medidos](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use). GitHub Docs, [orçamentos e limites de gasto](https://docs.github.com/en/billing/how-tos/set-up-budgets). GitHub Docs, [orçamentos e alertas](https://docs.github.com/en/billing/concepts/budgets-and-alerts).",
            muted: true,
          },
          { k: "p", v: "Conteúdo educativo e independente.", muted: true },
        ],
      },
    ],
  },
  en: {
    title: "Codespaces: how to count your hours and not waste the quota",
    short: "Codespaces: counting hours",
    lead: "The Codespaces quota is measured in core hours. Here is the math, what changes when you turn it on and off, and the step by step to stop, adjust the timeout and track your usage.",
    description: "How many hours GitHub Codespaces includes on the free personal account, why a larger machine uses up the quota faster, what is charged while stopped, and how to stop, adjust the automatic shutdown and track usage.",
    facts: ["github", "codespaces", "quota"],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          {
            k: "p",
            v: "The facts and numbers come from the GitHub pages cited in the sources, opened on 11/18/2026; the billing page does not show an update date, so quota, price and commands change: recheck before deciding. All that could be run on the Mac was the help of the commands (`gh codespace --help` and the `--help` of `stop`, `list`, `view`, `create` and `delete`, with GitHub CLI 2.104.0). The commands that use your account were not run: the author did not start any codespace for this guide. The lines marked as deduction are calculations made from the tables on the pages, not numbers written there. It applies to a personal account; organizations have their own rules. This guide is not cost consulting and is not affiliated with GitHub.",
          },
        ],
      },
      {
        n: "0",
        title: "What each thing is",
        blocks: [
          {
            k: "ol",
            start: 1,
            items: [
              "Codespace: according to the documentation, \"a development environment that's hosted in the cloud\", which you open in the browser, in Visual Studio Code or through the GitHub CLI.",
              "Core: a processing unit of the computer. Codespaces machines range from 2 to 32 cores.",
              "Core hour: the measure of the compute quota. The product page says that 120 core hours equal 60 hours of use on a 2 core machine.",
              "Idle timeout: the time without activity after which the codespace is stopped on its own.",
              "Storage: the space the codespace takes up, billed separately from compute, in GB-month.",
            ],
          },
        ],
      },
      {
        n: "1",
        title: "The math: free quota and machine size",
        blocks: [
          {
            k: "p",
            v: "The billing page says: \"All GitHub personal accounts include a quota of free compute time and storage\". For the Free plan, the list on the page shows 120 hours of compute and 15 GB-month of storage per month; for Pro, 180 hours and 20 GB-month (this last passage was read in summary form: check it on the page). The product page confirms the Free case: \"120 core hours or 60 hours of run time on a 2 core codespace\".",
          },
          {
            k: "p",
            v: "The page says the compute cost is proportional to the number of cores, and the price table shows an included usage multiplier equal to the number of cores. The table below applies that rule to the Free plan quota (deduction: clock hours = 120 divided by the multiplier). The prices are the ones on the page on 11/18/2026, for when the quota runs out: recheck.",
          },
          {
            k: "table",
            label: "Hours of use in the Free quota by machine size",
            head: [
              "Machine",
              "Multiplier",
              "Hours of use in the Free quota (deduction)",
              "Price per hour (page, 11/18/2026)",
            ],
            rows: [
              ["2 cores", "2", "60", "US$ 0.18"],
              ["4 cores", "4", "30", "US$ 0.36"],
              ["8 cores", "8", "15", "US$ 0.72"],
              ["16 cores", "16", "7.5", "US$ 1.44"],
              ["32 cores", "32", "3.75", "US$ 2.88"],
            ],
          },
          {
            k: "p",
            v: "Storage: US$ 0.07 per GB-month on the page (the multiplier does not apply to it). When the quota runs out: without a valid payment method on the account, usage is blocked; with a payment method, usage may continue subject to the account budgets (check the details on the billing page). There are email alerts when you reach 90% and 100% of the included quota.",
          },
        ],
      },
      {
        n: "2",
        title: "What uses the quota and what does not",
        blocks: [
          {
            k: "ul",
            items: [
              "The page about stopping a codespace says: \"Only running codespaces incur CPU charges. A stopped codespace incurs only storage costs.\"",
              "So the compute clock runs while the codespace is on, even if you are not using it, until it is stopped.",
              "A stopped one still takes up storage, which has its own quota. To avoid paying for the storage of a codespace you will no longer use, delete it (see step 4).",
              "Maximum lifetime: the timeout page says a codespace has a maximum lifetime of 12 hours, regardless of the idle timeout.",
            ],
          },
        ],
      },
      {
        n: "3",
        title: "Step by step",
        blocks: [
          {
            k: "p",
            v: "The code blocks keep their example names in Portuguese (`NOME_DO_CODESPACE`, `USUARIO/REPOSITORIO`). They are only placeholders: replace them with your own, and the result does not change.",
            muted: true,
          },
          {
            k: "ol",
            start: 1,
            items: [
              "See what is on. The help of the command lists the fields `name`, `state`, `lastUsedAt` and `machineName`. The command requires login in the GitHub CLI:",
            ],
          },
          {
            k: "code",
            label: "List codespaces (terminal, not run: check the documentation)",
            text: "gh codespace list --json name,state,lastUsedAt,machineName",
          },
          {
            k: "ol",
            start: 2,
            items: [
              "Stop what you are not using. The help of the command (checked on the Mac) shows the usage `gh codespace stop [flags]` and the option `-c, --codespace` with the name. Without the option, the command offers a list to choose from. In the browser, the path in the documentation is to open github.com/codespaces, the three dot menu next to the codespace and choose Stop codespace:",
            ],
          },
          {
            k: "code",
            label: "Stop a codespace (terminal, help checked; running it requires login)",
            text: "gh codespace stop --codespace NOME_DO_CODESPACE",
          },
          {
            k: "ol",
            start: 3,
            items: [
              "Adjust the automatic shutdown. The default is 30 minutes of inactivity. In Settings, Codespaces, the Default idle timeout field accepts from 5 to 240 minutes. For a single codespace, the help of `gh codespace create` shows the `--idle-timeout` option, with examples such as \"10m\" and \"1h\". The documentation says that, today, the default cannot be set through the command line. An organization policy may impose a lower maximum. Caution: the command below creates a new codespace and starts counting hours until it stops; use it only if you will really work in it and then stop or delete it (steps 2 and 4). `USUARIO/REPOSITORIO` is a fictional example: replace it with your own repository.",
            ],
          },
          {
            k: "code",
            label: "Create with a 10 minute timeout (terminal, help checked; running it requires login)",
            text: "gh codespace create --repo USUARIO/REPOSITORIO --idle-timeout 10m",
          },
          {
            k: "ol",
            start: 4,
            items: [
              "Delete what is finished. The help of `gh codespace delete` shows the options `--codespace` and `--days N` (deletes the ones older than N days). `gh codespace create` also accepts `--retention-period`, which defines how long after being shut down the codespace is deleted on its own (maximum of 30 days, according to the help). Deleting can discard changes that were not sent to the repository: check before:",
            ],
          },
          {
            k: "code",
            label: "Delete a codespace (terminal, help checked; running it requires login)",
            text: "gh codespace delete --codespace NOME_DO_CODESPACE",
          },
          {
            k: "ol",
            start: 5,
            items: [
              "Track usage and create alerts. To see usage: open `github.com/settings/billing` and use the tabs to see the consumption of each product; the View details button shows more information (page \"Viewing your usage of metered products and licenses\"). To create a budget: on the same page, under Budgets and alerts, start a budget, set the amount and, if the option exists, turn on Stop usage when budget limit is reached; the alerts at 75%, 90% and 100% are optional (page \"Setting up budgets to control spending on metered products\"). Also, the budgets and alerts page says there is an email notice when the included usage of core hours and storage reaches 90% and 100%. Menus change: check the page (links in the sources).",
            ],
          },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: "ol",
            start: 1,
            items: [
              "The quota is measured in core hours: a larger machine uses up the quota faster.",
              "Only the running codespace uses compute; stopped, it uses storage.",
              "The automatic shutdown is 30 minutes by default and can go from 5 to 240 minutes.",
              "Stop with `gh codespace stop`, delete what is finished and recheck quota and price: they change.",
            ],
          },
        ],
      },
      {
        title: "Myth and fact",
        blocks: [
          {
            k: "ul",
            items: [
              "Myth: \"it is 120 hours, period\". Fact: it is 120 core hours; on a 2 core machine it is 60 hours, and on a larger machine, fewer.",
              "Myth: \"I closed the tab, so it stopped\". Fact: the codespace is stopped by the idle timeout or when you stop it; until then, compute keeps running.",
              "Myth: \"stopped is free\". Fact: stopped, the documentation says there is a storage cost.",
            ],
          },
        ],
      },
      {
        title: "Sources",
        blocks: [
          {
            k: "p",
            v: "GitHub Docs, [GitHub Codespaces billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces). GitHub, [Codespaces product page](https://github.com/features/codespaces). GitHub Docs, [what are codespaces](https://docs.github.com/en/codespaces/about-codespaces/what-are-codespaces). GitHub Docs, [stopping and starting a codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace). GitHub Docs, [idle timeout](https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces). GitHub CLI, [gh codespace stop](https://cli.github.com/manual/gh_codespace_stop). GitHub CLI, [gh codespace create](https://cli.github.com/manual/gh_codespace_create). GitHub CLI, [gh codespace delete](https://cli.github.com/manual/gh_codespace_delete). GitHub Docs, [viewing usage of metered products](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use). GitHub Docs, [budgets and spending limits](https://docs.github.com/en/billing/how-tos/set-up-budgets). GitHub Docs, [budgets and alerts](https://docs.github.com/en/billing/concepts/budgets-and-alerts).",
            muted: true,
          },
          { k: "p", v: "Educational and independent content.", muted: true },
        ],
      },
    ],
  },
};
