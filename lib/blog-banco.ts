import type { Guide } from './blog';

export const SUPABASE_PAUSA: Guide = {
  slug: "supabase-pausa-projeto",
  category: "deploy",
  published: "2026-11-21",
  pt: {
    title: "Supabase pausa seu projeto grátis: como conferir, restaurar e se proteger",
    short: "Supabase pausa projeto grátis",
    lead: "O passo a passo da restauração de um projeto pausado no plano gratuito do Supabase, o que conferir antes e depois, e como se proteger para o app não ficar sem banco.",
    description: "O que a documentação do Supabase diz sobre a pausa de projetos do plano gratuito, o passo a passo para conferir o plano, restaurar um projeto pausado, guardar uma cópia fora do Supabase e decidir quando um plano pago faz sentido.",
    facts: ["deploy", "supabase", "plano gratuito"],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          { k: "p", v: "Nada deste guia foi executado no Supabase. O Mac de teste não tem projeto nem conta do Supabase, e a CLI do Supabase não está instalada nele. Tudo vem da documentação do Supabase, conferida em 18/11/2026, e os passos de painel estão marcados como confira na documentação, com link." },
          { k: "p", v: "As regras de pausa, aviso e restauração mudam com frequência (a janela de restauração já mudou antes). Reconfira as páginas das fontes antes de depender de qualquer prazo. Este guia vale para o plano gratuito (Free). Não traz preço: veja a página de preços do dia." },
        ],
      },
      {
        n: "0",
        title: "O que é cada coisa",
        blocks: [
          {
            k: "ol",
            items: [
              "Supabase: a documentação o descreve como a plataforma de desenvolvimento Postgres que oferece os recursos de backend. Para este guia, é onde o banco de dados do seu app mora.",
              "Projeto: uma instância do Supabase com o seu banco. É o projeto que é pausado, não a sua conta.",
              "Plano gratuito (Free): o plano sem custo. É o único que a regra de inatividade atinge.",
              "Pausa: o Supabase para o projeto por baixa atividade. O banco deixa de atender o app até a restauração (nossa leitura: a documentação não descreve o erro que o app recebe).",
              "Restaurar: trazer o projeto pausado de volta, pelo painel.",
              "Cópia (dump): um arquivo com o conteúdo do banco, guardado fora do Supabase.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "1",
        title: "O que a documentação diz",
        blocks: [
          { k: "p", v: "A página de preços: \"Free projects are paused after 1 week of inactivity.\" (projetos gratuitos são pausados depois de 1 semana de inatividade)." },
          { k: "p", v: "A página de pausa: \"Supabase pauses Free Plan projects that show low activity\" (pausa projetos gratuitos com pouca atividade). Ela fala em baixa atividade, não em zero acesso, e não publica um número exato de requisições." },
          { k: "p", v: "O aviso: \"A warning email roughly one week before the pause takes effect\" (um e-mail de aviso mais ou menos uma semana antes da pausa). Ele vai para o dono do projeto." },
          { k: "p", v: "Plano pago: \"Projects under a paid plan cannot be paused\" (projetos em plano pago não podem ser pausados)." },
          { k: "p", v: "Cuidado com a linha do tempo: as duas páginas falam em uma semana (uma para a pausa, outra para o aviso), mas o Supabase não publica uma cronologia única que junte as duas. Não conte dias a partir disso: use o e-mail e o painel." },
        ],
      },
      {
        n: "2",
        title: "Passo a passo: conferir o plano e o estado do projeto",
        blocks: [
          {
            k: "ol",
            items: [
              "Abra o painel do Supabase e entre na organização do projeto.",
              "Confira o plano da organização: se for Free, a regra de pausa vale. Confira na documentação onde cada informação aparece, porque o painel muda: [página de pausa](https://supabase.com/docs/guides/platform/free-project-pausing).",
              "Confira se o e-mail do dono do projeto é um e-mail que você lê. O aviso de pausa vai para o dono.",
              "Se o projeto já estiver pausado, o painel mostra as opções de restauração (a documentação cita as telas de organização e de projeto). Confira na documentação o nome atual do botão.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "3",
        title: "Passo a passo: restaurar um projeto pausado",
        blocks: [
          {
            k: "ol",
            items: [
              "Abra o painel do Supabase, selecione a organização e, depois, o projeto pausado. Clique em Resume project e confirme (passo a passo da página Project Pausing, conferida em 18/11/2026; o nome do botão pode mudar, confira).",
              "A documentação diz que o projeto \"will return to its previous state, including data and configurations\" (volta ao estado anterior, com dados e configurações).",
              "A mesma página diz que você pode restaurar por até 1 ano depois da pausa e que os backups ficam guardados só por um período limitado. O prazo é volátil: reconfira. Por isso a seção 4 existe.",
              "Depois de restaurar, abra o seu app e teste um fluxo que lê e outro que grava. Confira também as variáveis de conexão do app, caso o seu app dependa delas (nossa recomendação, sem fonte direta).",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "4",
        title: "Passo a passo: guardar uma cópia fora do Supabase",
        blocks: [
          { k: "p", v: "Esta é uma recomendação nossa: a documentação só avisa que os backups duram um período limitado. A CLI do Supabase tem o comando `supabase db dump`, descrito como \"Dumps contents from a database.\" (despeja o conteúdo de um banco)." },
          {
            k: "ol",
            items: [
              "Instale e configure a CLI seguindo a documentação oficial: [supabase db dump](https://supabase.com/docs/reference/cli/supabase-db-dump). Não executado aqui.",
              "Veja as opções atuais do comando no seu terminal:",
            ],
            start: 1,
          },
          {
            k: "code",
            label: "Ver as opções do comando de cópia do banco (terminal, não executado: confira na documentação)",
            text: "supabase db dump --help",
          },
          {
            k: "ol",
            items: [
              "Escolha as opções pela ajuda do comando e guarde o arquivo gerado em um lugar fora do Supabase. Teste a cópia em um projeto de teste antes de confiar nela.",
              "Nunca coloque o arquivo da cópia (ele contém os seus dados) em um repositório público.",
            ],
            start: 3,
          },
        ],
      },
      {
        n: "5",
        title: "Uso real, sem truque",
        blocks: [
          { k: "p", v: "A base de conhecimento do Supabase diz que o que conta é \"sending real requests from your app\" (enviar pedidos reais do app) ou abrir o projeto no painel. Ela diz que alguns pedidos por dia costumam bastar, mas que isso \"isn't a guarantee\" (não é garantia)." },
          { k: "p", v: "O que não fazer: uma rotina automática criada só para enganar a regra de inatividade. A documentação fala em uso real e avisa que não há garantia. Se o projeto importa, o caminho é o próximo passo." },
        ],
      },
      {
        n: "6",
        title: "Quando um plano pago faz sentido",
        blocks: [
          { k: "p", v: "Se alguém depende do projeto, a base de conhecimento do Supabase recomenda subir para um plano pago, e a documentação diz que projetos em plano pago não podem ser pausados." },
          { k: "p", v: "Este guia não traz preço, porque ele varia e muda. Veja a [página de preços](https://supabase.com/pricing) no dia e confira o que o plano inclui antes de decidir." },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: "ol",
            items: [
              "No plano Free, uma semana com pouca atividade pausa o projeto.",
              "O Supabase avisa o dono por e-mail antes da pausa.",
              "Dá para restaurar pelo painel, dentro do prazo que a documentação informar no dia.",
              "Guarde uma cópia do banco fora do Supabase (recomendação nossa).",
              "Plano pago não pausa por inatividade.",
              "Nada aqui foi executado no Supabase: confira cada passo na documentação.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          { k: "p", v: "Supabase, [preços](https://supabase.com/pricing). Supabase, [Project Pausing](https://supabase.com/docs/guides/platform/free-project-pausing). Supabase, [base de conhecimento: projetos pausam por inatividade?](https://supabase.com/kb/faqs/platform/free-project-pausing). Supabase, [documentação](https://supabase.com/docs). Supabase CLI, [db dump](https://supabase.com/docs/reference/cli/supabase-db-dump).", muted: true },
          { k: "p", v: "Conteúdo educativo e independente.", muted: true },
        ],
      },
    ],
  },
  en: {
    title: "Supabase pauses free projects: how to check, restore and protect yours",
    short: "Supabase pauses free projects",
    lead: "The step by step for restoring a paused project on the Supabase free plan, what to check before and after, and how to protect yourself so your app is not left without a database.",
    description: "What the Supabase documentation says about pausing free plan projects, the step by step to check the plan, restore a paused project, keep a copy outside Supabase and decide when a paid plan makes sense.",
    facts: ["deploy", "supabase", "free plan"],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          { k: "p", v: "Nothing in this guide was run on Supabase. The test Mac has no Supabase project or account, and the Supabase CLI is not installed on it. Everything comes from the Supabase documentation, checked on November 18, 2026, and the dashboard steps are marked as check the documentation, with a link." },
          { k: "p", v: "The rules for pausing, warnings and restoring change often (the restore window has changed before). Recheck the source pages before relying on any deadline. This guide applies to the free plan (Free). It does not include prices: see the pricing page on the day." },
        ],
      },
      {
        n: "0",
        title: "What each thing is",
        blocks: [
          {
            k: "ol",
            items: [
              "Supabase: the documentation describes it as the Postgres development platform that provides backend features. For this guide, it is where your app's database lives.",
              "Project: an instance of Supabase with your database. The project is what gets paused, not your account.",
              "Free plan (Free): the plan at no cost. It is the only one the inactivity rule applies to.",
              "Pause: Supabase stops the project because of low activity. The database stops serving the app until it is restored (our reading: the documentation does not describe the error the app receives).",
              "Restore: bring the paused project back, through the dashboard.",
              "Copy (dump): a file with the contents of the database, kept outside Supabase.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "1",
        title: "What the documentation says",
        blocks: [
          { k: "p", v: "The pricing page: \"Free projects are paused after 1 week of inactivity.\"" },
          { k: "p", v: "The pause page: \"Supabase pauses Free Plan projects that show low activity\". It talks about low activity, not zero access, and does not publish an exact number of requests." },
          { k: "p", v: "The warning: \"A warning email roughly one week before the pause takes effect\". It goes to the project owner." },
          { k: "p", v: "Paid plan: \"Projects under a paid plan cannot be paused\"." },
          { k: "p", v: "Watch the timeline: both pages mention one week (one for the pause, the other for the warning), but Supabase does not publish a single timeline that joins the two. Do not count days from this: use the email and the dashboard." },
        ],
      },
      {
        n: "2",
        title: "Step by step: check the plan and the project state",
        blocks: [
          {
            k: "ol",
            items: [
              "Open the Supabase dashboard and go into the project's organization.",
              "Check the organization's plan: if it is Free, the pause rule applies. Check the documentation for where each piece of information appears, because the dashboard changes: [pause page](https://supabase.com/docs/guides/platform/free-project-pausing).",
              "Check that the project owner's email is one you read. The pause warning goes to the owner.",
              "If the project is already paused, the dashboard shows the restore options (the documentation mentions the organization and project screens). Check the documentation for the current name of the button.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "3",
        title: "Step by step: restore a paused project",
        blocks: [
          {
            k: "ol",
            items: [
              "Open the Supabase dashboard, select the organization and then the paused project. Click Resume project and confirm (steps from the Project Pausing page, checked on November 18, 2026; the button name may change, check).",
              "The documentation says the project \"will return to its previous state, including data and configurations\".",
              "The same page says you can restore for up to 1 year after the pause and that backups are kept only for a limited period. The deadline is volatile: recheck. That is why section 4 exists.",
              "After restoring, open your app and test one flow that reads and one that writes. Also check the app's connection variables, in case your app depends on them (our recommendation, no direct source).",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "4",
        title: "Step by step: keep a copy outside Supabase",
        blocks: [
          { k: "p", v: "This is our recommendation: the documentation only warns that backups last a limited period. The Supabase CLI has the command `supabase db dump`, described as \"Dumps contents from a database.\"" },
          {
            k: "ol",
            items: [
              "Install and set up the CLI following the official documentation: [supabase db dump](https://supabase.com/docs/reference/cli/supabase-db-dump). Not run here.",
              "See the command's current options in your terminal:",
            ],
            start: 1,
          },
          {
            k: "code",
            label: "See the options of the database copy command (terminal, not run: check the documentation)",
            text: "supabase db dump --help",
          },
          {
            k: "ol",
            items: [
              "Choose the options from the command help and keep the generated file somewhere outside Supabase. Test the copy on a test project before relying on it.",
              "Never put the copy file (it contains your data) in a public repository.",
            ],
            start: 3,
          },
        ],
      },
      {
        n: "5",
        title: "Real use, no tricks",
        blocks: [
          { k: "p", v: "The Supabase knowledge base says what counts is \"sending real requests from your app\" or opening the project in the dashboard. It says a few requests a day are usually enough, but that this \"isn't a guarantee\"." },
          { k: "p", v: "What not to do: an automatic routine created only to trick the inactivity rule. The documentation talks about real use and warns there is no guarantee. If the project matters, the way forward is the next step." },
        ],
      },
      {
        n: "6",
        title: "When a paid plan makes sense",
        blocks: [
          { k: "p", v: "If someone depends on the project, the Supabase knowledge base recommends moving up to a paid plan, and the documentation says projects under a paid plan cannot be paused." },
          { k: "p", v: "This guide does not include a price, because it varies and changes. See the [pricing page](https://supabase.com/pricing) on the day and check what the plan includes before deciding." },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: "ol",
            items: [
              "On the Free plan, one week with low activity pauses the project.",
              "Supabase warns the owner by email before the pause.",
              "You can restore through the dashboard, within the deadline the documentation states on the day.",
              "Keep a copy of the database outside Supabase (our recommendation).",
              "A paid plan does not pause for inactivity.",
              "Nothing here was run on Supabase: check each step in the documentation.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Sources",
        blocks: [
          { k: "p", v: "Supabase, [pricing](https://supabase.com/pricing). Supabase, [Project Pausing](https://supabase.com/docs/guides/platform/free-project-pausing). Supabase, [knowledge base: do projects pause for inactivity?](https://supabase.com/kb/faqs/platform/free-project-pausing). Supabase, [documentation](https://supabase.com/docs). Supabase CLI, [db dump](https://supabase.com/docs/reference/cli/supabase-db-dump).", muted: true },
          { k: "p", v: "Educational and independent content.", muted: true },
        ],
      },
    ],
  },
};
