import type { Guide } from './blog';

const SCRIPT_BARRA =
  '#!/bin/bash\nexport LC_ALL=C\ninput=$(cat)\nMODEL=$(echo "$input" | jq -r \'.model.display_name // "?"\')\nDIR=$(echo "$input" | jq -r \'.workspace.current_dir // "?"\')\nPCT=$(echo "$input" | jq -r \'.context_window.used_percentage // 0\' | cut -d. -f1)\nCOST=$(echo "$input" | jq -r \'.cost.total_cost_usd // 0\')\nFIVE=$(echo "$input" | jq -r \'.rate_limits.five_hour.used_percentage // empty\' | cut -d. -f1)\nSEVEN=$(echo "$input" | jq -r \'.rate_limits.seven_day.used_percentage // empty\' | cut -d. -f1)\nLINE="[$MODEL] ${DIR##*/} | contexto usado ${PCT}% | custo estimado US\\$$(printf \'%.2f\' "$COST")"\nif [ -n "$FIVE" ]; then\n  LINE="$LINE | limite de 5h ${FIVE}%"\nfi\nif [ -n "$SEVEN" ]; then\n  LINE="$LINE | limite de 7 dias ${SEVEN}%"\nfi\necho "$LINE"';
const COMANDO_STATUSLINE =
  '/statusline show model name and context percentage with a progress bar';
const CONFIG_JSON =
  '{\n  "statusLine": {\n    "type": "command",\n    "command": "~/.claude/statusline.sh"\n  }\n}';
const TESTE_JSON =
  'mkdir -p ~/.claude\ncp statusline.sh ~/.claude/statusline.sh\nchmod +x ~/.claude/statusline.sh\necho \'{"model":{"display_name":"Opus"},"workspace":{"current_dir":"/Users/exemplo/meu-projeto"},"cost":{"total_cost_usd":0.01234},"context_window":{"used_percentage":8},"rate_limits":{"five_hour":{"used_percentage":23.5},"seven_day":{"used_percentage":41.2}}}\' | ~/.claude/statusline.sh';
const CONFIG_REFRESH =
  '{\n  "statusLine": {\n    "type": "command",\n    "command": "~/.claude/statusline.sh",\n    "refreshInterval": 5\n  }\n}';

const URL_STATUSLINE = 'https://code.claude.com/docs/en/statusline';

export const PAINEL_STATUS_LINE: Guide = {
  slug: 'painel-status-line',
  category: 'claude-code',
  keyword: 'PAINEL',
  published: '2026-11-18',
  pt: {
    title: 'O painel do Claude Code: veja quanto da conversa ainda cabe, com um script pronto',
    short: 'O painel do Claude Code',
    lead: 'O script pronto da barra de status (status line) do Claude Code, que mostra o uso da janela de contexto, o custo estimado e os limites, dois jeitos de ligar e o que fazer se a barra não aparecer.',
    description: 'O script pronto da status line do Claude Code com modelo, pasta, uso da janela de contexto, custo estimado e limites de 5 horas e 7 dias, dois jeitos de ligar, o que cada campo quer dizer e o que fazer se a barra não aparecer.',
    facts: ['claude code', 'status line', 'script pronto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'A página "Customize your status line" da documentação do Claude Code foi lida em 18/11/2026. O script foi rodado pelo autor no Mac, com o jq 1.7.1, usando JSON de exemplo no formato da documentação, em vários casos. O Claude Code instalado era o 2.1.319, mas o painel não foi testado numa sessão interativa real e o `/statusline` não foi rodado: confira na sua tela. Os valores (pasta, modelo, custo) são exemplo. "Painel" é o nome que usamos para a status line; a documentação fala em "persistent, at-a-glance view". Conteúdo independente, sem vínculo com a Anthropic.' },
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
              'Status line (barra de status): uma barra no rodapé do Claude Code que roda um script seu e mostra o que o script imprimir.',
              'Janela de contexto: o espaço de leitura da conversa. A documentação dá o tamanho máximo no campo `context_window_size`.',
              'Script: um arquivo com comandos. Este guia usa um script em bash, que roda no macOS e no Linux.',
              'jq: um programa que lê JSON no terminal. O script precisa dele; a documentação diz que você pode precisar instalar.',
              'JSON: o formato em que o Claude Code entrega os dados da sessão para o seu script.',
              'Token: a unidade em que o modelo lê e escreve texto.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O script pronto',
        blocks: [
          { k: 'p', v: 'Salve como `~/.claude/statusline.sh` (o `~` é a sua pasta pessoal). Ele lê o JSON que o Claude Code envia, e imprime uma linha com modelo, nome da pasta, porcentagem da janela de contexto usada, custo estimado e, quando existirem, os limites de 5 horas e de 7 dias. Os campos usados são `model.display_name`, `workspace.current_dir`, `context_window.used_percentage`, `cost.total_cost_usd` e `rate_limits.five_hour` e `seven_day`, todos listados na documentação.' },
          { k: 'code', label: 'Script da barra (bash)', text: SCRIPT_BARRA },
          { k: 'p', v: 'Sobre a linha `export LC_ALL=C`: ela foi acrescentada depois de um teste do autor. Num Mac com a região em português do Brasil, o `printf` trata a vírgula como separador decimal e o custo saía errado (US$0,00 e uma mensagem de erro, em vez de US$0.01). Com a linha, o resultado ficou certo nos dois casos.' },
        ],
      },
      {
        n: '2',
        title: 'Dois jeitos de ligar',
        blocks: [
          { k: 'ol', start: 1, items: ['Pelo comando `/statusline`. Dentro do Claude Code, escreva o que você quer ver. A documentação diz que ele aceita instruções em linguagem natural, gera o script em `~/.claude/` e atualiza as configurações, e que você deve aprovar a edição de arquivo se o Claude Code pedir. O exemplo da documentação, em inglês:'] },
          { k: 'code', label: 'Comando na sessão (exemplo da documentação)', text: COMANDO_STATUSLINE },
          { k: 'p', muted: true, v: 'Que o comando entenda descrições em português é dedução nossa e não foi testada. Gerar o script é uma conversa normal com o Claude e usa o seu plano.' },
          { k: 'ol', start: 2, items: ['Manualmente. Dê permissão de execução ao script e acrescente o campo `statusLine` ao arquivo de configurações do usuário, `~/.claude/settings.json`. O trecho do JSON:'] },
          { k: 'code', label: 'Configuração (JSON)', text: CONFIG_JSON },
          { k: 'callout', tone: 'warn', v: 'Se o seu `settings.json` já existe, não cole esse JSON por cima do arquivo. Acrescente só o campo `statusLine` dentro do JSON que já está lá, sem apagar o resto. A documentação diz que o Claude Code recarrega as configurações sozinho ao salvar.' },
          { k: 'p', v: 'Para dar permissão de execução ao script, rode `chmod +x ~/.claude/statusline.sh`, como na documentação.' },
        ],
      },
      {
        n: '3',
        title: 'Teste o script fora do Claude Code',
        blocks: [
          { k: 'p', v: 'Antes de ligar, rode o script com um JSON de exemplo. Salve o script como `statusline.sh` na pasta atual e rode o bloco abaixo. Ele copia o arquivo para `~/.claude/` (se já houver um `statusline.sh` lá, ele será substituído) e passa um JSON de exemplo:' },
          { k: 'code', label: 'Teste com JSON de exemplo (terminal)', text: TESTE_JSON },
          { k: 'p', v: 'Resultado esperado: `[Opus] meu-projeto | contexto usado 8% | custo estimado US$0.01 | limite de 5h 23% | limite de 7 dias 41%`. Sem o bloco `rate_limits` no JSON, a linha termina no custo. Com JSON vazio, aparece `[?] ? | contexto usado 0% | custo estimado US$0.00`. Esses casos foram rodados no Mac do autor.' },
        ],
      },
      {
        n: '4',
        title: 'O que cada campo quer dizer',
        blocks: [
          {
            k: 'ul',
            items: [
              'Contexto usado: a documentação diz que `used_percentage` é a porcentagem da janela de contexto usada e é calculada só com tokens de entrada (`input_tokens + cache_creation_input_tokens + cache_read_input_tokens`), sem os de saída. O `/context` pode mostrar um valor maior, porque acrescenta uma estimativa das mensagens novas.',
              'Custo estimado: "Estimated session cost in USD, computed client-side at list price", e a documentação acrescenta que pode diferir da cobrança real. É uma estimativa feita no seu computador.',
              'Limites de 5 horas e de 7 dias: aparecem só para assinantes. A documentação de 18/11/2026 diz "Pro, Max, and Ultra" (ou atrás de um gateway com limite de gasto) e só depois da primeira resposta da sessão. Cada janela pode faltar, por isso o script usa `// empty`.',
              'Custo da barra: a documentação diz que a status line roda localmente e não consome tokens da API. Se o seu script chamar a rede ou outros programas, o custo e a lentidão passam a ser do seu script.',
            ],
          },
        ],
      },
      {
        n: '5',
        title: 'Quando a barra atualiza',
        blocks: [
          { k: 'p', v: 'Segundo a documentação, o script roda uma vez quando a sessão começa e depois quando chega uma mensagem nova do assistente, quando o `/compact` termina, quando o modo de permissão muda, quando o modo Vim alterna, quando você muda o comando, entre outros eventos. Ou seja, por padrão ela atualiza por evento, não a cada segundo.' },
          { k: 'p', v: 'O campo opcional `refreshInterval` faz o comando rodar também a cada N segundos (mínimo 1). A documentação diz para usá-lo quando a barra mostra dados que mudam com o tempo e para deixá-lo de fora para rodar só nos eventos. Exemplo, dentro do mesmo `statusLine`:' },
          { k: 'code', label: 'Configuração com refreshInterval (JSON)', text: CONFIG_REFRESH },
          { k: 'p', muted: true, v: 'A barra some temporariamente em alguns menus, como o de ajuda e os pedidos de permissão.' },
        ],
      },
      {
        n: '6',
        title: 'Se a barra não aparecer',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Confie na pasta. A documentação diz que, até você aceitar o diálogo de confiança do espaço de trabalho (workspace trust), a barra fica em branco. Reinicie o Claude Code e aceite.',
              'Dê permissão de execução: `chmod +x ~/.claude/statusline.sh`.',
              'Rode o script à mão com o JSON de exemplo, como na seção 3. Ele precisa imprimir no stdout e terminar sem erro: a documentação diz que scripts com código de saída diferente de zero ou sem saída deixam a barra em branco.',
              'Rode `claude --debug` para ver o stderr do script e o código de saída.',
              'Configurações gerenciadas: se `disableAllHooks` estiver ligado, ou se a sua organização usar `allowManagedHooksOnly`, a barra personalizada pode ser desativada. Pergunte ao administrador.',
            ],
          },
        ],
      },
      {
        title: 'Segurança: leia o script antes de usar',
        note: true,
        blocks: [
          { k: 'p', v: 'A barra executa um script no seu computador. A documentação trata o `statusLine` sob a mesma regra de confiança dos hooks. Leia qualquer script antes de usar, principalmente os que você copiou de terceiros, e não cole no seu `settings.json` um comando que você não entende.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'A status line roda um script seu no rodapé do Claude Code. Ela recebe os dados da sessão em JSON.',
              'Dois jeitos de ligar: `/statusline` com uma descrição, ou o campo `statusLine` no `settings.json`.',
              'O contexto mostrado é o usado, calculado só com tokens de entrada. O custo é uma estimativa.',
              'Limites de 5 horas e de 7 dias só aparecem para assinantes, depois da primeira resposta.',
              'A barra roda local, sem consumir tokens da API, e atualiza por evento.',
              'Leia o script antes de usar.',
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
              'Mito: "a barra atualiza a cada segundo". Verdade: por padrão, atualiza por evento; o `refreshInterval` é opcional.',
              'Mito: "o custo da barra é o valor da fatura". Verdade: a documentação diz que é uma estimativa e pode diferir da cobrança real.',
              'Mito: "a barra gasta tokens". Verdade: a documentação diz que ela roda local e não consome tokens da API.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Customize your status line](${URL_STATUSLINE}). Teste próprio: script rodado no Mac com JSON de exemplo (jq 1.7.1), sem sessão interativa.` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com a Anthropic.' },
        ],
      },
    ],
  },
  en: {
    title: 'How much context does Claude have left? The status line',
    short: 'The status line',
    lead: 'The ready-made script for the Claude Code status line, which shows how much of the context window is used, the estimated cost and the limits, two ways to turn it on, and what to do if the bar does not show up.',
    description: 'The ready-made Claude Code status line script with model, folder, context window usage, estimated cost and 5-hour and 7-day limits, two ways to turn it on, what each field means, and what to do if the bar does not show up.',
    facts: ['claude code', 'status line', 'ready-made script'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The "Customize your status line" page of the Claude Code documentation was read on November 18, 2026. The author ran the script on a Mac, with jq 1.7.1, using example JSON in the format of the documentation, in several cases. The installed Claude Code was 2.1.319, but the panel was not tested in a real interactive session and `/statusline` was not run: check it on your own screen. The values (folder, model, cost) are examples. "Panel" is the name we use for the status line; the documentation speaks of a "persistent, at-a-glance view". Independent content, not affiliated with Anthropic.' },
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
              'Status line: a bar at the bottom of Claude Code that runs a script of yours and shows whatever the script prints.',
              'Context window: the reading space of the conversation. The documentation gives the maximum size in the `context_window_size` field.',
              'Script: a file with commands. This guide uses a bash script, which runs on macOS and Linux.',
              'jq: a program that reads JSON in the terminal. The script needs it; the documentation says you may need to install it.',
              'JSON: the format in which Claude Code hands the session data to your script.',
              'Token: the unit in which the model reads and writes text.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The ready-made script',
        blocks: [
          { k: 'p', v: 'Save it as `~/.claude/statusline.sh` (the `~` is your home folder). It reads the JSON that Claude Code sends, and prints one line with the model, the folder name, the percentage of the context window used, the estimated cost and, when they exist, the 5-hour and 7-day limits. The fields used are `model.display_name`, `workspace.current_dir`, `context_window.used_percentage`, `cost.total_cost_usd` and `rate_limits.five_hour` and `seven_day`, all listed in the documentation.' },
          { k: 'code', label: 'Status line script (bash)', text: SCRIPT_BARRA },
          { k: 'p', v: 'The line the script prints uses Portuguese labels (`contexto usado` is context used, `custo estimado` is estimated cost, `limite de 5h` is 5-hour limit and `limite de 7 dias` is 7-day limit); they are example labels that you can translate by editing the text in the script.' },
          { k: 'p', v: 'About the `export LC_ALL=C` line: it was added after a test by the author. On a Mac with the region set to Brazilian Portuguese, `printf` treats the comma as the decimal separator and the cost came out wrong (US$0,00 and an error message, instead of US$0.01). With the line, the result came out right in both cases.' },
        ],
      },
      {
        n: '2',
        title: 'Two ways to turn it on',
        blocks: [
          { k: 'ol', start: 1, items: ['With the `/statusline` command. Inside Claude Code, write what you want to see. The documentation says it accepts natural language instructions, generates the script in `~/.claude/` and updates the settings, and that you should approve the file edit if Claude Code asks. The example from the documentation:'] },
          { k: 'code', label: 'Command in the session (example from the documentation)', text: COMANDO_STATUSLINE },
          { k: 'p', muted: true, v: 'That the command understands descriptions in Portuguese is our deduction and was not tested. Generating the script is a normal conversation with Claude and uses your plan.' },
          { k: 'ol', start: 2, items: ['Manually. Give the script execute permission and add the `statusLine` field to the user settings file, `~/.claude/settings.json`. The JSON snippet:'] },
          { k: 'code', label: 'Configuration (JSON)', text: CONFIG_JSON },
          { k: 'callout', tone: 'warn', v: 'If your `settings.json` already exists, do not paste this JSON over the file. Add only the `statusLine` field inside the JSON that is already there, without deleting the rest. The documentation says Claude Code reloads the settings by itself when you save.' },
          { k: 'p', v: 'To give the script execute permission, run `chmod +x ~/.claude/statusline.sh`, as in the documentation.' },
        ],
      },
      {
        n: '3',
        title: 'Test the script outside Claude Code',
        blocks: [
          { k: 'p', v: 'Before turning it on, run the script with an example JSON. Save the script as `statusline.sh` in the current folder and run the block below. It copies the file to `~/.claude/` (if there is already a `statusline.sh` there, it will be replaced) and passes an example JSON:' },
          { k: 'code', label: 'Test with example JSON (terminal)', text: TESTE_JSON },
          { k: 'p', v: 'Expected result: `[Opus] meu-projeto | contexto usado 8% | custo estimado US$0.01 | limite de 5h 23% | limite de 7 dias 41%`. Without the `rate_limits` block in the JSON, the line ends at the cost. With an empty JSON, you get `[?] ? | contexto usado 0% | custo estimado US$0.00`. These cases were run on the author’s Mac.' },
        ],
      },
      {
        n: '4',
        title: 'What each field means',
        blocks: [
          {
            k: 'ul',
            items: [
              'Context used: the documentation says `used_percentage` is the percentage of the context window used and is calculated from input tokens only (`input_tokens + cache_creation_input_tokens + cache_read_input_tokens`), without the output ones. `/context` can show a higher value, because it adds an estimate for the new messages.',
              'Estimated cost: "Estimated session cost in USD, computed client-side at list price", and the documentation adds that it may differ from your actual bill. It is an estimate made on your computer.',
              '5-hour and 7-day limits: they appear only for subscribers. The documentation of November 18, 2026 says "Pro, Max, and Ultra" (or behind a gateway with a spending limit) and only after the first response of the session. Each window can be missing, which is why the script uses `// empty`.',
              'Cost of the bar: the documentation says the status line runs locally and does not consume API tokens. If your script calls the network or other programs, the cost and the slowness become your script’s.',
            ],
          },
        ],
      },
      {
        n: '5',
        title: 'When the bar updates',
        blocks: [
          { k: 'p', v: 'According to the documentation, the script runs once when the session starts and then when a new assistant message arrives, when `/compact` finishes, when the permission mode changes, when Vim mode toggles, when you change the command, among other events. In other words, by default it updates on events, not every second.' },
          { k: 'p', v: 'The optional `refreshInterval` field makes the command run also every N seconds (minimum 1). The documentation says to use it when the bar shows data that changes with time and to leave it out to run only on events. Example, inside the same `statusLine`:' },
          { k: 'code', label: 'Configuration with refreshInterval (JSON)', text: CONFIG_REFRESH },
          { k: 'p', muted: true, v: 'The bar disappears temporarily in some menus, such as the help one and the permission prompts.' },
        ],
      },
      {
        n: '6',
        title: 'If the bar does not show up',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Trust the folder. The documentation says that, until you accept the workspace trust dialog, the bar stays blank. Restart Claude Code and accept.',
              'Give execute permission: `chmod +x ~/.claude/statusline.sh`.',
              'Run the script by hand with the example JSON, as in section 3. It must print to stdout and finish without an error: the documentation says that scripts with a non-zero exit code or with no output leave the bar blank.',
              'Run `claude --debug` to see the script’s stderr and the exit code.',
              'Managed settings: if `disableAllHooks` is on, or if your organization uses `allowManagedHooksOnly`, the custom bar can be disabled. Ask your administrator.',
            ],
          },
        ],
      },
      {
        title: 'Security: read the script before you use it',
        note: true,
        blocks: [
          { k: 'p', v: 'The bar runs a script on your computer. The documentation treats `statusLine` under the same trust rule as hooks. Read any script before you use it, especially the ones you copied from someone else, and do not paste into your `settings.json` a command you do not understand.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'The status line runs a script of yours at the bottom of Claude Code. It receives the session data as JSON.',
              'Two ways to turn it on: `/statusline` with a description, or the `statusLine` field in `settings.json`.',
              'The context shown is the used one, calculated from input tokens only. The cost is an estimate.',
              'The 5-hour and 7-day limits appear only for subscribers, after the first response.',
              'The bar runs locally, without consuming API tokens, and updates on events.',
              'Read the script before you use it.',
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
              'Myth: "the bar updates every second". Fact: by default, it updates on events; `refreshInterval` is optional.',
              'Myth: "the cost on the bar is the amount on the bill". Fact: the documentation says it is an estimate and may differ from the actual bill.',
              'Myth: "the bar spends tokens". Fact: the documentation says it runs locally and does not consume API tokens.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [Customize your status line](${URL_STATUSLINE}). Own test: script run on a Mac with example JSON (jq 1.7.1), without an interactive session.` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with Anthropic.' },
        ],
      },
    ],
  },
};
