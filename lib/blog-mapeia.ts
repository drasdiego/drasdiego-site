import type { Guide } from './blog';

export const MAPA_DO_CODIGO: Guide = {
  slug: 'mapa-do-codigo-graphify',
  category: 'claude-code',
  keyword: 'MAPEIA',
  published: '2026-11-21',
  pt: {
    title: "Seu projeto vira um mapa: do jeito seguro",
    short: "Seu projeto vira um mapa",
    lead: "O passo a passo para gerar o mapa do seu código com o Graphify, ver o que ele escreve na sua máquina e remover tudo se não gostar.",
    description: "Como gerar um mapa do seu código com o projeto aberto Graphify: requisitos, instalação, os três arquivos gerados, como ler só o código, o que o hook faz, como remover e um teste justo para saber se ajudou.",
    facts: ['graphify', 'claude code', 'código aberto'],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          { k: 'p', v: "Nada foi instalado nem executado na produção deste guia. Tudo vem do [README do Graphify](https://github.com/Graphify-Labs/graphify) (ramo v8) e da página do pacote no PyPI, abertos em 18/11/2026. Afirmações do README estão marcadas [REPO]. Comandos mudam: reconfira no README antes de rodar." },
          { k: 'p', v: "Crédito e independência: o Graphify é um projeto da Graphify Labs, com licença Apache-2.0. Este guia é independente, sem vínculo com a Graphify Labs, e não usa o logo do projeto. Não prometo economia de tokens: o número de \"80%\" que aparece no README é da versão Graphify Cloud, não da ferramenta aberta, e não foi medido por nós." },
        ],
      },
      {
        n: '0',
        title: "O que é cada coisa",
        blocks: [
          { k: 'ol', start: 1, items: ["Grafo (o mapa): um conjunto de pontos ligados por linhas. Cada ponto é uma parte do código; cada linha é uma ligação, como \"este arquivo chama aquele\" [REPO].", "tree-sitter: o leitor que entende a estrutura do código, sem usar modelo de IA. O README diz que o código é lido assim, no seu computador, e que \"nothing leaves your machine\" [REPO].", "EXTRACTED e INFERRED: o jeito de marcar cada ligação. EXTRACTED é o que está escrito no código; INFERRED é o que a ferramenta resolveu por dedução [REPO]. Trate as deduzidas como pistas, não como fatos.", "Skill: um conjunto de instruções que o Claude Code carrega. O `graphify install` registra a skill do Graphify [REPO].", "Hook: um comando automático que roda quando o Claude Code vai fazer algo, como ler um arquivo. No Claude Code, o README diz que um hook dispara antes de buscas e de leituras de código e empurra o assistente para consultar o grafo [REPO].", "Modelo de IA: o que lê documentos, PDFs e imagens para extrair o sentido. Para esses arquivos, o README diz que o conteúdo vai ao seu assistente (ou a um provedor configurado) [REPO]."] },
        ],
      },
      {
        n: '1',
        title: "Antes de instalar: confira em 3 minutos",
        blocks: [
          { k: 'ol', start: 1, items: ["Escolha um projeto pequeno e sem segredos (chaves, senhas, dados de cliente). Comece numa cópia.", "Requisitos: Python 3.11 ou mais novo (o PyPI diz 3.11 ou mais novo e menor que 3.15) e o `uv` (recomendado) ou o `pipx` [REPO]. Atenção: o repertório antigo dizia Python 3.10; hoje o README e o PyPI dizem 3.11.", "Leia o README e o que o instalador escreve. O README diz que o comando específico do Claude Code \"writes a small config file\" e remete à página \"Always-on setup\" (docs.graphify.com) para a lista exata de arquivos. Não afirmo quais arquivos são: confira lá.", "Nome do pacote: é `graphifyy`, com dois y [REPO]. O comando que você usa depois é `graphify`.", "Se o projeto tem documentos, PDFs ou imagens, faça a seção 2 antes da seção 3. O `/graphify .` manda esses arquivos ao modelo de IA [REPO]."] },
        ],
      },
      {
        n: '2',
        title: "Só o código, sem mandar nada ao modelo (antes de gerar o mapa)",
        blocks: [
          { k: 'ol', start: 1, items: ["O que vai ao modelo: num projeto com documentos, PDFs e imagens, o `/graphify .` envia esses arquivos ao modelo do seu assistente para extrair o sentido [REPO]. O código, não: ele é lido localmente.", "Como ficar só no código: o README diz \"On a mixed repo, add --code-only to index just the code and skip the docs/PDFs/images that would otherwise need an LLM.\" Essa opção é descrita para o comando `graphify extract`, que é um comando de terminal, não algo que se digita dentro do Claude Code.", "Rode no terminal, na pasta do projeto:"] },
          { k: 'code', label: "Só código, no terminal (sintaxe a confirmar: não testei)", text: "graphify extract --code-only" },
          { k: 'ol', start: 4, items: ["Confira a sintaxe antes de rodar: não testei este comando. Veja `graphify extract --help` e o README, que também diz que o `graphify extract` de um projeto só de código roda totalmente offline.", "Para desligar de vez os provedores de modelo, o README cita `GRAPHIFY_BACKEND=none` [REPO].", "O README diz que as consultas ao grafo ficam registradas num log local (`~/.cache/graphify-queries.log`) e que não há telemetria [REPO]."] },
        ],
      },
      {
        n: '3',
        title: "O passo a passo",
        blocks: [
          { k: 'ol', start: 1, items: ["Instale e registre a skill (rode um comando por vez):"] },
          { k: 'code', label: "Instalar (README)", text: "uv tool install graphifyy\ngraphify install" },
          { k: 'ol', start: 2, items: ["Gere o mapa (se o projeto tem documentos, PDFs ou imagens, volte à seção 2 antes). Abra o Claude Code na pasta do projeto e rode:"] },
          { k: 'code', label: "Gerar o mapa (README)", text: "/graphify ." },
          { k: 'ol', start: 3, items: ["Abra os três arquivos que ficam em `graphify-out/` [REPO]: `graph.html` (abre no navegador, dá para clicar nos pontos, filtrar e buscar), `GRAPH_REPORT.md` (os conceitos principais, ligações surpreendentes e perguntas sugeridas) e `graph.json` (o grafo inteiro, que dá para consultar sem reler os arquivos).", "Faça uma pergunta ao mapa (exemplo do README, troque pelos nomes do seu projeto):"] },
          { k: 'code', label: "Consultar o grafo (README)", text: "/graphify query \"what connects auth to the database?\"" },
          { k: 'ol', start: 5, items: ["Confira a resposta nos arquivos. O mapa orienta, você verifica. Olhe com mais cuidado as ligações marcadas INFERRED.", "Atualize quando o código mudar: o README mostra a opção `--update`, que refaz só o que mudou (exemplo do README: `/graphify ./docs --update`)."] },
        ],
      },
      {
        n: '4',
        title: "O hook: veja o que ele faz e como tirar",
        blocks: [
          { k: 'ol', start: 1, items: ["Veja os hooks ativos: no Claude Code, digite `/hooks`. A documentação do Claude Code diz que esse comando abre o navegador de hooks.", "O que o README descreve: antes de buscas e de leituras de arquivo, o hook empurra o assistente para o grafo. No modo estrito (`graphify install --project --strict`), a leitura e a busca podem ser negadas uma vez por sessão, até haver uma consulta recente ao grafo [REPO].", "Se não quiser esse comportamento, não use o modo estrito e confira o que o instalador escreveu antes de continuar.", "Para remover:"] },
          { k: 'code', label: "Remover (README)", text: "graphify uninstall" },
          { k: 'p', v: "O README diz que isso remove o Graphify de todas as plataformas e que a opção `--purge` também apaga a pasta `graphify-out/`. Há também a forma por plataforma, `graphify claude uninstall`." },
        ],
      },
      {
        n: '5',
        title: "Teste justo: o mapa ajudou?",
        blocks: [
          { k: 'ol', start: 1, items: ["Escolha uma pergunta real do seu projeto (por exemplo, \"o que depende deste arquivo?\").", "Faça a pergunta com o mapa e confira cada afirmação nos arquivos.", "Anote: acertou, errou ou ficou incompleto? As ligações INFERRED estavam certas?", "Decida pelo que você viu. Este guia não mostra número de economia: o benchmark do README para a ferramenta aberta fala de qualidade de recuperação e de \"0 LLM credits\" na construção do grafo, não de tokens economizados."] },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          { k: 'ol', start: 1, items: ["O Graphify transforma o código num grafo: pontos e ligações.", "O código é lido no seu computador, sem IA.", "Cada ligação vem marcada como escrita (EXTRACTED) ou deduzida (INFERRED).", "Documentos, PDFs e imagens vão ao modelo; para só código, use code-only.", "Há um hook no Claude Code: veja com /hooks e remova com graphify uninstall.", "Sem promessa de economia: o 80% do README é da versão Cloud."] },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          { k: 'p', muted: true, v: "[Graphify, Graphify Labs (Apache-2.0)](https://github.com/Graphify-Labs/graphify). [Pacote graphifyy no PyPI](https://pypi.org/project/graphifyy/). [Claude Code, guia de hooks (/hooks)](https://code.claude.com/docs/en/hooks-guide.md)." },
          { k: 'p', muted: true, v: "Conteúdo educativo e independente." },
        ],
      },
    ],
  },
  en: {
    title: "Your project becomes a map: the safe way",
    short: "Your project becomes a map",
    lead: "The step by step to generate a map of your code with Graphify, see what it writes on your machine and remove everything if you do not like it.",
    description: "How to generate a map of your code with the open source project Graphify: requirements, installation, the three generated files, how to read code only, what the hook does, how to remove it and a fair test to know whether it helped.",
    facts: ['graphify', 'claude code', 'open source'],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          { k: 'p', v: "Nothing was installed or run in the production of this guide. Everything comes from the [Graphify README](https://github.com/Graphify-Labs/graphify) (v8 branch) and the package page on PyPI, opened on November 18, 2026. Claims from the README are marked [REPO]. Commands change: recheck the README before running." },
          { k: 'p', v: "Credit and independence: Graphify is a Graphify Labs project, licensed under Apache-2.0. This guide is independent, has no affiliation with Graphify Labs, and does not use the project's logo. I do not promise token savings: the \"80%\" figure that appears in the README belongs to the Graphify Cloud version, not to the open tool, and was not measured by us." },
        ],
      },
      {
        n: '0',
        title: "What each thing is",
        blocks: [
          { k: 'ol', start: 1, items: ["Graph (the map): a set of points connected by lines. Each point is a part of the code; each line is a connection, such as \"this file calls that one\" [REPO].", "tree-sitter: the reader that understands the structure of the code, without using an AI model. The README says the code is read this way, on your computer, and that \"nothing leaves your machine\" [REPO].", "EXTRACTED and INFERRED: the way each connection is marked. EXTRACTED is what is written in the code; INFERRED is what the tool worked out by deduction [REPO]. Treat the inferred ones as clues, not as facts.", "Skill: a set of instructions that Claude Code loads. `graphify install` registers the Graphify skill [REPO].", "Hook: an automatic command that runs when Claude Code is about to do something, such as reading a file. In Claude Code, the README says a hook fires before code searches and reads and pushes the assistant to consult the graph [REPO].", "AI model: what reads documents, PDFs and images to extract meaning. For those files, the README says the content goes to your assistant (or to a configured provider) [REPO]."] },
        ],
      },
      {
        n: '1',
        title: "Before installing: check in 3 minutes",
        blocks: [
          { k: 'ol', start: 1, items: ["Pick a small project with no secrets (keys, passwords, client data). Start on a copy.", "Requirements: Python 3.11 or newer (PyPI says 3.11 or newer and below 3.15) and `uv` (recommended) or `pipx` [REPO]. Note: the old repertoire said Python 3.10; today the README and PyPI say 3.11.", "Read the README and what the installer writes. The README says the Claude Code specific command \"writes a small config file\" and points to the \"Always-on setup\" page (docs.graphify.com) for the exact list of files. I do not state which files they are: check there.", "Package name: it is `graphifyy`, with two y's [REPO]. The command you use afterwards is `graphify`.", "If the project has documents, PDFs or images, do section 2 before section 3. `/graphify .` sends those files to the AI model [REPO]."] },
        ],
      },
      {
        n: '2',
        title: "Code only, sending nothing to the model (before generating the map)",
        blocks: [
          { k: 'ol', start: 1, items: ["What goes to the model: in a project with documents, PDFs and images, `/graphify .` sends those files to your assistant's model to extract meaning [REPO]. The code does not: it is read locally.", "How to stay code only: the README says \"On a mixed repo, add --code-only to index just the code and skip the docs/PDFs/images that would otherwise need an LLM.\" That option is described for the `graphify extract` command, which is a terminal command, not something you type inside Claude Code.", "Run in the terminal, in the project folder:"] },
          { k: 'code', label: "Code only, in the terminal (syntax to confirm: I did not test it)", text: "graphify extract --code-only" },
          { k: 'ol', start: 4, items: ["Check the syntax before running: I did not test this command. See `graphify extract --help` and the README, which also says that `graphify extract` on a code-only project runs fully offline.", "To turn off the model providers for good, the README mentions `GRAPHIFY_BACKEND=none` [REPO].", "The README says graph queries are recorded in a local log (`~/.cache/graphify-queries.log`) and that there is no telemetry [REPO]."] },
        ],
      },
      {
        n: '3',
        title: "The step by step",
        blocks: [
          { k: 'ol', start: 1, items: ["Install and register the skill (run one command at a time):"] },
          { k: 'code', label: "Install (README)", text: "uv tool install graphifyy\ngraphify install" },
          { k: 'ol', start: 2, items: ["Generate the map (if the project has documents, PDFs or images, go back to section 2 first). Open Claude Code in the project folder and run:"] },
          { k: 'code', label: "Generate the map (README)", text: "/graphify ." },
          { k: 'ol', start: 3, items: ["Open the three files that end up in `graphify-out/` [REPO]: `graph.html` (opens in the browser, you can click the points, filter and search), `GRAPH_REPORT.md` (the main concepts, surprising connections and suggested questions) and `graph.json` (the whole graph, which can be queried without re-reading the files).", "Ask the map a question (example from the README, replace it with the names from your project):"] },
          { k: 'code', label: "Query the graph (README)", text: "/graphify query \"what connects auth to the database?\"" },
          { k: 'ol', start: 5, items: ["Check the answer in the files. The map guides, you verify. Look more carefully at the connections marked INFERRED.", "Update when the code changes: the README shows the `--update` option, which redoes only what changed (README example: `/graphify ./docs --update`)."] },
        ],
      },
      {
        n: '4',
        title: "The hook: see what it does and how to remove it",
        blocks: [
          { k: 'ol', start: 1, items: ["See the active hooks: in Claude Code, type `/hooks`. The Claude Code documentation says this command opens the hooks browser.", "What the README describes: before searches and file reads, the hook pushes the assistant toward the graph. In strict mode (`graphify install --project --strict`), reading and searching may be denied once per session, until there is a recent query to the graph [REPO].", "If you do not want this behavior, do not use strict mode and check what the installer wrote before continuing.", "To remove:"] },
          { k: 'code', label: "Remove (README)", text: "graphify uninstall" },
          { k: 'p', v: "The README says this removes Graphify from all platforms and that the `--purge` option also deletes the `graphify-out/` folder. There is also the per platform form, `graphify claude uninstall`." },
        ],
      },
      {
        n: '5',
        title: "Fair test: did the map help?",
        blocks: [
          { k: 'ol', start: 1, items: ["Pick a real question from your project (for example, \"what depends on this file?\").", "Ask the question with the map and check each claim in the files.", "Note it down: right, wrong or incomplete? Were the INFERRED connections correct?", "Decide based on what you saw. This guide shows no savings figure: the README benchmark for the open tool talks about retrieval quality and \"0 LLM credits\" in building the graph, not about tokens saved."] },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          { k: 'ol', start: 1, items: ["Graphify turns the code into a graph: points and connections.", "The code is read on your computer, without AI.", "Each connection is marked as written (EXTRACTED) or deduced (INFERRED).", "Documents, PDFs and images go to the model; for code only, use code-only.", "There is a hook in Claude Code: see it with /hooks and remove it with graphify uninstall.", "No savings promise: the README's 80% belongs to the Cloud version."] },
        ],
      },
      {
        title: "Sources",
        blocks: [
          { k: 'p', muted: true, v: "[Graphify, Graphify Labs (Apache-2.0)](https://github.com/Graphify-Labs/graphify). [graphifyy package on PyPI](https://pypi.org/project/graphifyy/). [Claude Code, hooks guide (/hooks)](https://code.claude.com/docs/en/hooks-guide.md)." },
          { k: 'p', muted: true, v: "Educational and independent content." },
        ],
      },
    ],
  },
};
