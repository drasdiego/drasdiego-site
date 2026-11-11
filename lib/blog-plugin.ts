import type { Guide } from './blog';

const CMD_MARKETPLACE_LIST = 'claude plugin marketplace list';
const CMD_PLUGIN = '/plugin';
const CMD_PLUGIN_INSTALL = '/plugin install plugin-exemplo@nome-do-marketplace';
const CMD_PLUGIN_DIR = 'claude --plugin-dir <pasta do plugin> plugin details <nome do plugin>';
const CMD_DETAILS = 'claude plugin details <nome do plugin>';
const CMD_UNINSTALL = 'claude plugin uninstall plugin-exemplo --scope user';
const CMD_MARKETPLACE_REMOVE = 'claude plugin marketplace remove <nome do marketplace>';

const URL_SECURITY = 'https://code.claude.com/docs/en/plugins/security.md';
const URL_DISCOVER = 'https://code.claude.com/docs/en/discover-plugins';
const URL_SANDBOX = 'https://code.claude.com/docs/en/sandboxing.md';
const URL_CLI = 'https://code.claude.com/docs/en/plugins/cli-reference';

const LABEL_TERMINAL_PT = 'Comando (cole no terminal, fora do Claude Code)';
const LABEL_SESSAO_PT = 'Comando (digite dentro de uma sessão do Claude Code)';
const LABEL_TERMINAL_EN = 'Command (paste into the terminal, outside Claude Code)';
const LABEL_SESSAO_EN = 'Command (type inside a Claude Code session)';

export const PLUGIN_RODA_CODIGO: Guide = {
  slug: 'plugin-roda-codigo',
  category: 'claude-code',
  published: '2026-11-11',
  pt: {
    title: 'Como revisar um plugin do Claude Code antes de instalar',
    short: 'Plugin roda código',
    lead: 'O que um plugin instalado pode rodar na sua máquina e como revisar um plugin antes de instalar: origem do marketplace, painel de detalhes, os três lugares para ler, inventário, atualização automática e remoção.',
    description: 'O que um plugin instalado pode rodar na sua máquina e como revisar um plugin antes de instalar: origem do marketplace, painel de detalhes, os três lugares para ler, inventário, atualização automática e remoção.',
    facts: ['Claude Code', 'Plugins', 'segurança'],
    sections: [
      {
        title: 'Leia antes: os limites deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Comandos, nomes de painel e padrões do Claude Code mudam entre versões. Este guia segue a documentação oficial de 11/11/2026. Os comandos `claude plugin --help` e `claude plugin marketplace list` foram conferidos no Mac do autor, na versão 2.1.319 do Claude Code. O passo a passo de revisão com um plugin de terceiros não foi executado aqui: o teste de verdade é seu, com um plugin de teste ou um plugin que você mesmo escreveu. O plugin "plugin-exemplo" deste guia é inventado (EXEMPLO) e não representa nenhum plugin real. Este guia não acusa plugin, autor ou marketplace. Revisar reduz o risco, não elimina, e não substitui a política de segurança da sua empresa, se você tiver uma.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Plugin: um pacote que você instala no Claude Code a partir de um marketplace. Segundo a documentação, um plugin instalado "can execute arbitrary code on your machine with your user privileges".',
              'Marketplace: o catálogo de onde o Claude Code baixa o plugin. O nome do marketplace diz quem publica o catálogo, não o que cada plugin dele faz. Por isso a revisão vale para qualquer marketplace.',
              'Hook: comando de shell que o plugin roda em pontos do ciclo do Claude Code, como antes ou depois de uma chamada de ferramenta.',
              'Servidor MCP: o Claude Code se conecta aos servidores MCP que um plugin ativo declara. Um servidor stdio é um processo que o Claude Code inicia na sua máquina.',
              'Pasta bin/: o Claude Code coloca a pasta bin/ de cada plugin ativo no PATH do shell da ferramenta Bash. Os comandos Bash do Claude podem rodar qualquer executável que esteja lá.',
              'Skills, comandos e agentes: entram no contexto do Claude como instruções. Influenciam o que o Claude faz com as ferramentas que ele já tem.',
              'Sandbox: fronteira de isolamento em volta dos comandos de shell que o Claude roda. As regras de permissão e o sandbox cobrem as chamadas de ferramenta que o Claude faz, não o código que o plugin roda sozinho. Hooks e servidores MCP locais rodam fora do sandbox. A página do sandbox diz que ele vem desligado por padrão e que cobre só comandos de shell.',
              'Escopo: onde a instalação vale. `user` vale para você em todos os projetos da máquina. `project` vale para quem trabalha naquele repositório. `local` vale para você, só naquele repositório.',
              'Atualização automática: quando está ligada no marketplace de onde você instalou, o Claude Code atualiza o plugin em segundo plano, e os arquivos que você revisou podem mudar no disco.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Revisão em quatro etapas',
        blocks: [
          { k: 'p', v: 'Faça antes de escolher o escopo e instalar.' },
          { k: 'h3', v: 'Etapa 1. Descubra de onde veio o marketplace' },
          { k: 'p', v: 'No terminal, fora do Claude Code:' },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_MARKETPLACE_LIST },
          { k: 'p', v: 'O comando mostra a origem de cada marketplace, como um repositório do GitHub ou uma pasta. Confira se a origem é a que você espera.' },
          { k: 'h3', v: 'Etapa 2. Abra o painel de detalhes' },
          { k: 'p', v: 'Dentro de uma sessão do Claude Code:' },
          { k: 'code', label: LABEL_SESSAO_PT, text: CMD_PLUGIN },
          { k: 'p', v: 'Selecione o plugin. O painel mostra a seção Will install, com comandos, agentes, skills, hooks e servidores MCP e LSP. Em alguns plugins a seção traz só um aviso: `Components will be discovered at installation` (plugin dentro do marketplace) ou `Component summary not available for remote plugin` (plugin buscado em outro lugar). Nossa leitura: nesse caso a lista não ajuda, e as etapas 3 e 4 passam a ser as principais.' },
          { k: 'p', v: 'Para abrir direto nos detalhes de um plugin conhecido:' },
          { k: 'code', label: LABEL_SESSAO_PT, text: CMD_PLUGIN_INSTALL },
          { k: 'p', v: 'Em uma sessão, esse comando não instala na hora: ele abre o painel nos detalhes do plugin para você revisar e escolher o escopo. No terminal, `claude plugin install` instala de imediato, então não use esse comando para revisar.' },
          { k: 'h3', v: 'Etapa 3. Leia os três lugares' },
          { k: 'p', v: 'A lista Will install mostra que um hook existe, mas não o que ele roda. No painel, use Open homepage ou View on GitHub. Se o painel não oferecer nenhum dos dois, abra o repositório do marketplace que você viu na etapa 1 e procure a pasta do plugin. Leia:' },
          {
            k: 'ol',
            items: [
              '`hooks/hooks.json`: o comando que cada hook roda.',
              '`.mcp.json`: o comando ou a URL de cada servidor.',
              '`bin/`: todos os arquivos da pasta.',
            ],
          },
          { k: 'p', v: 'Estes são os arquivos que a documentação manda ler. Não é uma lista fechada de tudo que um plugin pode ter.' },
          { k: 'h3', v: 'Etapa 4. Liste o que o plugin contém' },
          { k: 'p', v: 'Clone o repositório que guarda a pasta do plugin. Em seguida, no terminal:' },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_PLUGIN_DIR },
          { k: 'p', v: 'Segundo a documentação, o comando lê os arquivos do plugin sem abrir uma sessão e imprime um `Component inventory`: skills e comandos, agentes, hooks com o evento de cada um, e servidores MCP e LSP. Se a sua empresa bloqueia a opção `--plugin-dir`, esta etapa não roda: a documentação diz que um administrador pode desligá-la. Nossa recomendação, que não vem da documentação: clonar em geral só baixa os arquivos, mas não rode nenhum script do repositório que você ainda não leu.' },
        ],
      },
      {
        n: '2',
        title: 'Depois de instalar',
        blocks: [
          { k: 'p', v: 'Para ver o mesmo inventário do plugin instalado, que fica em `~/.claude/plugins/cache/<marketplace>/<plugin>/<versão>/`:' },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_DETAILS },
        ],
      },
      {
        n: '3',
        title: 'Atualização automática: o que muda e como controlar',
        blocks: [
          { k: 'p', v: 'Padrões de cada tipo de marketplace, segundo a documentação:' },
          {
            k: 'ul',
            items: [
              '`claude-plugins-official` e os demais nomes oficiais, exceto `knowledge-work-plugins` e `first-party-plugins`: ligada por padrão.',
              'Marketplaces adicionados pelo claude.ai: ligada por padrão.',
              'Qualquer outro, comunitário, de terceiros ou local de desenvolvimento: desligada por padrão.',
            ],
          },
          { k: 'p', v: 'Para ligar ou desligar, em uma sessão: `/plugin`, aba Marketplaces, escolha o marketplace e selecione Enable auto-update ou Disable auto-update.' },
          { k: 'p', v: 'Quando um plugin é atualizado, a sessão aberta continua com a versão que já carregou. Você vê `Plugin updated: <nome> · Run /reload-plugins to apply`, e a próxima sessão carrega a versão nova. Se você revisou uma versão, o que roda depois pode ser outra. Nossa recomendação, que não vem da documentação: revise de novo quando o plugin atualizar.' },
        ],
      },
      {
        n: '4',
        title: 'Se você desconfiou: como remover',
        blocks: [
          { k: 'p', v: 'No terminal, com o mesmo escopo da instalação:' },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_UNINSTALL },
          { k: 'p', v: 'O escopo aceita `user`, `project` ou `local`. Sem a opção, o `uninstall` age no escopo `user`. Depois confira o que ficou:' },
          {
            k: 'ol',
            items: [
              'Dados persistentes: se esse era o último escopo em que o plugin estava instalado, a desinstalação também apaga a pasta de dados persistentes do plugin, a menos que você use `--keep-data`.',
              'Arquivos em cache: ficam em `~/.claude/plugins/cache/` por 14 dias, até uma varredura em segundo plano removê-los. Se, com essa desinstalação, não sobrou nenhum plugin instalado, as pastas órfãs ficam até você instalar outro. Para apagar antes, remova você mesmo a pasta `~/.claude/plugins/cache/<marketplace>/<plugin>/`.',
              'O marketplace: se você também não confia em quem o publica, remova o marketplace. Isso desinstala todos os plugins que você instalou por ele.',
            ],
          },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_MARKETPLACE_REMOVE },
        ],
      },
      {
        n: '5',
        title: 'O que o Claude Code avisa ou recusa',
        blocks: [
          { k: 'p', v: 'O painel de detalhes mostra um aviso de confiança antes da instalação, igual para qualquer marketplace: confie no plugin antes de instalar, atualizar ou usar, porque a Anthropic não controla o que há nos plugins. O Claude Code também recusa carregar um marketplace que use nome oficial ou da comunidade com origem fora de `github.com/anthropics/`, e recusa instalar um plugin de origem `archive` cujo arquivo baixado não bata com o `sha256` fixado pelo marketplace.' },
        ],
      },
      {
        n: '6',
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Veja a origem: `claude plugin marketplace list`.',
              'Abra o painel: `/plugin`, e leia Will install, sabendo que ele não mostra o que cada hook roda.',
              'Leia `hooks/hooks.json`, `.mcp.json` e `bin/`.',
              'Liste o inventário: `claude --plugin-dir <pasta> plugin details <nome>`.',
              'Confira se a atualização automática está ligada no marketplace.',
              'Desconfiou: `claude plugin uninstall <plugin> --scope <escopo>` e limpe o cache.',
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
              'Mito: "plugin é só um atalho". Verdade: skills, comandos e agentes entram como instruções, mas hooks e servidores MCP locais (stdio) rodam código na sua máquina, fora do sandbox.',
              'Mito: "se eu li antes de instalar, está tudo certo". Verdade: com a atualização automática ligada, os arquivos que você revisou podem mudar.',
              'Mito: "desinstalar apaga tudo na hora". Verdade: os arquivos ficam em cache por 14 dias (e, se não sobrou nenhum plugin instalado, até você instalar outro), a menos que você apague a pasta.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Páginas da documentação do Claude Code abertas em 11/11/2026: [Plugin security and trust](${URL_SECURITY}), [Install and manage plugins](${URL_DISCOVER}), [Sandboxing](${URL_SANDBOX}) e [Plugin CLI reference](${URL_CLI}).` },
          { k: 'p', muted: true, v: 'Comandos: `claude plugin --help` e `claude plugin marketplace list` conferidos no Mac do autor em 11/11/2026, na versão 2.1.319 do Claude Code. Conteúdo educativo e independente, sem vínculo com a Anthropic.' },
        ],
      },
    ],
  },
  en: {
    title: 'How to review a Claude Code plugin before you install it',
    short: 'Plugins run code',
    lead: 'What an installed plugin can run on your machine and how to review a plugin before you install it: where the marketplace came from, the details panel, the three places to read, the inventory, auto-update and removal.',
    description: 'What an installed plugin can run on your machine and how to review a plugin before you install it: where the marketplace came from, the details panel, the three places to read, the inventory, auto-update and removal.',
    facts: ['Claude Code', 'Plugins', 'security'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'Claude Code commands, panel names and defaults change between versions. This guide follows the official documentation as of November 11, 2026. The commands `claude plugin --help` and `claude plugin marketplace list` were checked on the author’s Mac, on Claude Code 2.1.319. The review walkthrough with a third-party plugin was not carried out here: the real test is yours, with a test plugin or a plugin you wrote yourself. The "plugin-exemplo" plugin in this guide is made up (its name is Portuguese for "example plugin") and does not stand for any real plugin. This guide does not accuse any plugin, author or marketplace. Reviewing reduces the risk, it does not remove it, and it does not replace your company’s security policy, if you have one.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Plugin: a package you install in Claude Code from a marketplace. According to the documentation, an installed plugin "can execute arbitrary code on your machine with your user privileges".',
              'Marketplace: the catalog Claude Code downloads the plugin from. The marketplace name tells you who publishes the catalog, not what each plugin in it does. That is why the review applies to any marketplace.',
              'Hook: a shell command the plugin runs at points of the Claude Code cycle, such as before or after a tool call.',
              'MCP server: Claude Code connects to the MCP servers an active plugin declares. A stdio server is a process Claude Code starts on your machine.',
              'The bin/ folder: Claude Code puts the bin/ folder of each active plugin on the PATH of the Bash tool shell. Claude’s Bash commands can run any executable that sits there.',
              'Skills, commands and agents: they enter Claude’s context as instructions. They influence what Claude does with the tools it already has.',
              'Sandbox: the isolation boundary around the shell commands Claude runs. Permission rules and the sandbox cover the tool calls Claude makes, not the code the plugin runs on its own. Hooks and local MCP servers run outside the sandbox. The sandboxing page says it is off by default and that it covers shell commands only.',
              'Scope: where the installation applies. `user` applies to you in every project on the machine. `project` applies to whoever works in that repository. `local` applies to you, in that repository only.',
              'Auto-update: when it is on for the marketplace you installed from, Claude Code updates the plugin in the background, and the files you reviewed may change on disk.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'A review in four steps',
        blocks: [
          { k: 'p', v: 'Do this before you choose the scope and install.' },
          { k: 'h3', v: 'Step 1. Find out where the marketplace came from' },
          { k: 'p', v: 'In the terminal, outside Claude Code:' },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_MARKETPLACE_LIST },
          { k: 'p', v: 'The command shows the source of each marketplace, such as a GitHub repository or a folder. Check that the source is the one you expect.' },
          { k: 'h3', v: 'Step 2. Open the details panel' },
          { k: 'p', v: 'Inside a Claude Code session:' },
          { k: 'code', label: LABEL_SESSAO_EN, text: CMD_PLUGIN },
          { k: 'p', v: 'Select the plugin. The panel shows the Will install section, with commands, agents, skills, hooks and MCP and LSP servers. For some plugins the section only carries a notice: `Components will be discovered at installation` (a plugin inside the marketplace) or `Component summary not available for remote plugin` (a plugin fetched from somewhere else). Our reading: in that case the list does not help, and steps 3 and 4 become the main ones.' },
          { k: 'p', v: 'To open straight into the details of a plugin you already know:' },
          { k: 'code', label: LABEL_SESSAO_EN, text: CMD_PLUGIN_INSTALL },
          { k: 'p', v: 'In a session, that command does not install right away: it opens the panel on the plugin details so you can review it and choose the scope. In the terminal, `claude plugin install` installs immediately, so do not use that command to review.' },
          { k: 'h3', v: 'Step 3. Read the three places' },
          { k: 'p', v: 'The Will install list shows that a hook exists, but not what it runs. In the panel, use Open homepage or View on GitHub. If the panel offers neither, open the marketplace repository you saw in step 1 and look for the plugin folder. Read:' },
          {
            k: 'ol',
            items: [
              '`hooks/hooks.json`: the command each hook runs.',
              '`.mcp.json`: the command or the URL of each server.',
              '`bin/`: every file in the folder.',
            ],
          },
          { k: 'p', v: 'These are the files the documentation tells you to read. It is not a closed list of everything a plugin can hold.' },
          { k: 'h3', v: 'Step 4. List what the plugin contains' },
          { k: 'p', v: 'Clone the repository that holds the plugin folder. Then, in the terminal:' },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_PLUGIN_DIR },
          { k: 'p', v: 'According to the documentation, the command reads the plugin files without opening a session and prints a `Component inventory`: skills and commands, agents, hooks with the event of each one, and MCP and LSP servers. If your company blocks the `--plugin-dir` option, this step does not run: the documentation says an administrator can turn it off. Our recommendation, which does not come from the documentation: cloning usually only downloads the files, but do not run any script from a repository you have not read yet. The command is the same as in the Portuguese guide, where `<pasta do plugin>` is the plugin folder and `<nome do plugin>` is the plugin name.' },
        ],
      },
      {
        n: '2',
        title: 'After you install',
        blocks: [
          { k: 'p', v: 'To see the same inventory for the installed plugin, which lives in `~/.claude/plugins/cache/<marketplace>/<plugin>/<version>/`:' },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_DETAILS },
        ],
      },
      {
        n: '3',
        title: 'Auto-update: what changes and how to control it',
        blocks: [
          { k: 'p', v: 'Defaults for each type of marketplace, according to the documentation:' },
          {
            k: 'ul',
            items: [
              '`claude-plugins-official` and the other official names, except `knowledge-work-plugins` and `first-party-plugins`: on by default.',
              'Marketplaces added by claude.ai: on by default.',
              'Any other one, community, third-party or local development: off by default.',
            ],
          },
          { k: 'p', v: 'To turn it on or off, in a session: `/plugin`, the Marketplaces tab, choose the marketplace and select Enable auto-update or Disable auto-update.' },
          { k: 'p', v: 'When a plugin is updated, the open session keeps the version it already loaded. You see `Plugin updated: <name> · Run /reload-plugins to apply`, and the next session loads the new version. If you reviewed one version, what runs afterwards may be another. Our recommendation, which does not come from the documentation: review it again when the plugin updates.' },
        ],
      },
      {
        n: '4',
        title: 'If you stopped trusting it: how to remove',
        blocks: [
          { k: 'p', v: 'In the terminal, with the same scope as the installation:' },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_UNINSTALL },
          { k: 'p', v: 'The scope accepts `user`, `project` or `local`. Without the option, `uninstall` acts on the `user` scope. Then check what is left:' },
          {
            k: 'ol',
            items: [
              'Persistent data: if that was the last scope the plugin was installed in, uninstalling also deletes the plugin’s persistent data folder, unless you use `--keep-data`.',
              'Cached files: they stay in `~/.claude/plugins/cache/` for 14 days, until a background sweep removes them. If this uninstall left no plugin installed at all, the orphan folders stay until you install another one. To delete them sooner, remove the `~/.claude/plugins/cache/<marketplace>/<plugin>/` folder yourself.',
              'The marketplace: if you no longer trust whoever publishes it, remove the marketplace. That uninstalls every plugin you installed through it.',
            ],
          },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_MARKETPLACE_REMOVE },
        ],
      },
      {
        n: '5',
        title: 'What Claude Code warns about or refuses',
        blocks: [
          { k: 'p', v: 'The details panel shows a trust notice before installation, the same for any marketplace: trust the plugin before installing, updating or using it, because Anthropic does not control what is inside plugins. Claude Code also refuses to load a marketplace that uses an official or community name with a source outside `github.com/anthropics/`, and refuses to install a plugin from an `archive` source whose downloaded file does not match the `sha256` pinned by the marketplace.' },
        ],
      },
      {
        n: '6',
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'Check the source: `claude plugin marketplace list`.',
              'Open the panel: `/plugin`, and read Will install, knowing it does not show what each hook runs.',
              'Read `hooks/hooks.json`, `.mcp.json` and `bin/`.',
              'List the inventory: `claude --plugin-dir <folder> plugin details <name>`.',
              'Check whether auto-update is on for the marketplace.',
              'Stopped trusting it: `claude plugin uninstall <plugin> --scope <scope>`, then clear the cache.',
            ],
          },
        ],
      },
      {
        title: 'Myth and truth',
        blocks: [
          {
            k: 'ul',
            items: [
              'Myth: "a plugin is just a shortcut". Truth: skills, commands and agents come in as instructions, but hooks and local MCP servers (stdio) run code on your machine, outside the sandbox.',
              'Myth: "if I read it before installing, everything is fine". Truth: with auto-update on, the files you reviewed may change.',
              'Myth: "uninstalling deletes everything right away". Truth: the files stay in the cache for 14 days (and, if no plugin is left installed, until you install another one), unless you delete the folder yourself.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code documentation pages opened on November 11, 2026: [Plugin security and trust](${URL_SECURITY}), [Install and manage plugins](${URL_DISCOVER}), [Sandboxing](${URL_SANDBOX}) and [Plugin CLI reference](${URL_CLI}).` },
          { k: 'p', muted: true, v: 'Commands: `claude plugin --help` and `claude plugin marketplace list` checked on the author’s Mac on November 11, 2026, on Claude Code 2.1.319. Educational and independent content, not affiliated with Anthropic.' },
        ],
      },
    ],
  },
};
