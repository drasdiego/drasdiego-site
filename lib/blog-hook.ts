import type { Guide } from './blog';

const PREPARE = "echo \"CHAVE=EXEMPLO\" > .env\nmkdir -p .claude/hooks";
const SCRIPT = "#!/bin/bash\nINPUT=$(cat)\nFILE_PATH=$(echo \"$INPUT\" | jq -r '.tool_input.file_path // empty')\nFILE_PATH=\"${FILE_PATH//\\\\//}\"\nNAME=\"${FILE_PATH##*/}\"\n\nif [[ \"$NAME\" == .env* ]]; then\n  echo \"Bloqueado: $FILE_PATH é um arquivo .env protegido por hook\" >&2\n  exit 2\nfi\n\nexit 0";
const CHMOD = "chmod +x .claude/hooks/protect-env.sh";
const SETTINGS = "{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"\\\"$CLAUDE_PROJECT_DIR\\\"/.claude/hooks/protect-env.sh\"\n          }\n        ]\n      }\n    ]\n  }\n}";

const URL_MEMORY = 'https://code.claude.com/docs/en/memory';
const URL_GUIDE = 'https://code.claude.com/docs/en/hooks-guide';
const URL_REFERENCE = 'https://code.claude.com/docs/en/hooks';

export const HOOK: Guide = {
  slug: 'hook',
  category: 'claude-code',
  published: '2026-11-10',
  pt: {
    title: 'Hook, a regra que você impõe',
    short: 'Hook',
    lead: 'O CLAUDE.md orienta o Claude, mas não garante. Um hook é um comando que o próprio Claude Code executa. Veja como criar um que protege o arquivo .env e como provar que ele funciona.',
    description: 'Como criar um hook PreToolUse no Claude Code que bloqueia a edição do arquivo .env, testar se ele funciona e entender o que ele não cobre.',
    facts: ['Claude Code', 'hook PreToolUse', 'exemplo para copiar'],
    sections: [
      {
        title: 'Leia antes: o limite deste hook',
        note: true,
        blocks: [
          { k: 'p', v: 'Este hook vale para as ferramentas de editar e criar arquivo (matcher `Edit|Write`). Um comando de terminal que escreve no .env, como `echo oi >> .env`, passa por ele.' },
          { k: 'p', v: 'A documentação indica dois caminhos para cobrir isso: um hook `Stop`, que confere a pasta uma vez por turno, ou casar também o terminal, com o matcher `Edit|Write|Bash|PowerShell` mais um script que liste os arquivos modificados (`git status --porcelain`). Este guia não traz esse segundo script. Até você criá-lo, a proteção é parcial.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ul',
            items: [
              'CLAUDE.md: texto que o Claude lê como contexto. Pela documentação, ele orienta, mas não é regra imposta pelo sistema, e não há garantia de que seja seguido à risca.',
              'Hook: um comando (script) que o Claude Code executa em pontos fixos do funcionamento, como antes de usar uma ferramenta. Pela documentação, ele roda independentemente do que o Claude decidir.',
              'PreToolUse: o evento que dispara antes de a ferramenta rodar e pode bloquear a ação.',
              'Matcher: o filtro que diz para quais ferramentas o hook vale. `Edit|Write` cobre editar e criar arquivo; não cobre comandos de terminal.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Prepare uma pasta de teste',
        blocks: [
          { k: 'p', v: 'Pré-requisitos: Claude Code instalado e a ferramenta `jq`, que lê o JSON que o Claude Code manda para o hook. No Mac, confira com `which jq`.' },
          { k: 'p', v: 'Use uma pasta de teste, não um projeto de verdade. Crie um arquivo `.env` com um conteúdo de exemplo e a pasta dos hooks:' },
          { k: 'code', label: 'Terminal', text: PREPARE },
        ],
      },
      {
        n: '2',
        title: 'Crie o script do hook',
        blocks: [
          { k: 'p', v: 'Salve como `.claude/hooks/protect-env.sh`. Ele lê o caminho do arquivo que o Claude quer mexer e, se o nome começar com `.env`, sai com código dois, que é o código que bloqueia.' },
          { k: 'code', label: '.claude/hooks/protect-env.sh', text: SCRIPT },
          { k: 'p', muted: true, v: 'O script compara só o nome do arquivo (o que vem depois da última barra). Assim ele bloqueia `.env`, `.env.local` e `.env.production`, e não bloqueia uma pasta que só tenha ".env" no nome, como `.environments`. O `.env.example` também fica bloqueado; ajuste se precisar liberá-lo.' },
          { k: 'p', v: 'Torne o script executável:' },
          { k: 'code', label: 'Terminal', text: CHMOD },
        ],
      },
      {
        n: '3',
        title: 'Registre o hook no settings.json',
        blocks: [
          { k: 'p', v: 'Crie `.claude/settings.json` com este conteúdo. Se o arquivo já existir, junte o bloco `hooks` ao que já está lá.' },
          { k: 'code', label: '.claude/settings.json', text: SETTINGS },
          { k: 'p', v: 'Abra o Claude Code na pasta de teste e digite `/hooks`. O hook deve aparecer na lista, em PreToolUse.' },
        ],
      },
      {
        n: '4',
        title: 'Teste',
        blocks: [
          { k: 'p', v: 'Faça estes três pedidos ao Claude, um de cada vez:' },
          {
            k: 'opts',
            items: [
              { c: 'Adicione um comentário no arquivo .env', v: 'Esperado: a edição é bloqueada antes de acontecer e o Claude recebe a mensagem "Bloqueado: ...".' },
              { c: 'Crie um arquivo teste.txt com a palavra oi', v: 'Esperado: funciona, porque o script sai com código zero para outros arquivos.' },
              { c: 'Rode no terminal: echo oi >> .env', v: 'Esperado: passa. O matcher `Edit|Write` não vê comandos de terminal. É o limite avisado no começo.' },
            ],
          },
          { k: 'p', muted: true, v: 'Se o hook não aparecer ou não disparar, inicie com `claude --debug-file /tmp/claude.log` e acompanhe com `tail -f /tmp/claude.log`, ou use `/debug` dentro da sessão.' },
        ],
      },
      {
        n: '5',
        title: 'O que verificar',
        blocks: [
          {
            k: 'ul',
            items: [
              'Só o código de saída dois bloqueia. Código um sem JSON válido é erro não bloqueante: a ação segue.',
              'O script precisa estar executável e o `jq` instalado. Sem isso, o hook falha e, em geral, a ação segue.',
              'Código zero em PreToolUse não aprova a ação: ela segue o fluxo normal de permissões.',
              'Hooks de comando são regras fixas. Hooks de prompt e de agente usam um modelo para decidir; servem para julgamento, não para regra fixa.',
              'Onde guardar: `.claude/settings.json` vale para o projeto e pode ir para o Git; `.claude/settings.local.json` vale só para você; `~/.claude/settings.json` vale para todos os seus projetos.',
              'Para proibir uma ação de forma ampla, as regras de permissão (`permissions.deny`) são outra camada que a documentação aponta.',
            ],
          },
        ],
      },
      {
        title: 'Regra de bolso',
        blocks: [
          {
            k: 'ul',
            items: [
              'Hook ou permissão: regra que precisa valer sempre, como proteger arquivo ou bloquear comando.',
              'CLAUDE.md: preferência de estilo e contexto do projeto.',
            ],
          },
        ],
      },
      {
        title: 'Antes de levar para o seu projeto',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'O script foi testado em 09/11/2026 no terminal, no Linux e num Mac (macOS 27), com o JSON de PreToolUse que a documentação descreve: bloqueia .env, .env.local, .env.production, sub/.env e .env.example; libera app.py e arquivos dentro de .environments; não vê comandos de terminal.',
              'Teste dentro de uma sessão real do Claude Code, na pasta de teste, antes de usar num projeto de verdade.',
              'Nomes de eventos e formato do settings.json podem mudar. Confira a documentação na data em que for usar.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Documentação oficial do Claude Code, conferida em 09/11/2026: [Memory (CLAUDE.md)](${URL_MEMORY}), [Hooks guide](${URL_GUIDE}) e [Hooks reference](${URL_REFERENCE}). O script é inspirado no exemplo "Block edits to protected files" da documentação, com a comparação pelo nome do arquivo e a mensagem adaptadas.` },
        ],
      },
    ],
  },
  en: {
    title: 'Hook, the rule you enforce',
    short: 'Hook',
    lead: 'CLAUDE.md guides Claude, but it does not guarantee anything. A hook is a command that Claude Code itself runs. See how to create one that protects the .env file and how to prove that it works.',
    description: 'How to create a PreToolUse hook in Claude Code that blocks edits to the .env file, test that it works and understand what it does not cover.',
    facts: ['Claude Code', 'PreToolUse hook', 'example to copy'],
    sections: [
      {
        title: 'Read first: the limit of this hook',
        note: true,
        blocks: [
          { k: 'p', v: 'This hook applies to the tools that edit and create files (matcher `Edit|Write`). A terminal command that writes to .env, such as `echo oi >> .env`, gets past it.' },
          { k: 'p', v: 'The documentation points to two ways to cover that: a `Stop` hook, which checks the folder once per turn, or also matching the terminal, with the matcher `Edit|Write|Bash|PowerShell` plus a script that lists the modified files (`git status --porcelain`). This guide does not include that second script. Until you create it, the protection is partial.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ul',
            items: [
              'CLAUDE.md: text that Claude reads as context. According to the documentation, it guides Claude, but it is not a rule enforced by the system, and there is no guarantee that it will be followed to the letter.',
              'Hook: a command (script) that Claude Code runs at fixed points of its operation, such as before using a tool. According to the documentation, it runs regardless of what Claude decides.',
              'PreToolUse: the event that fires before the tool runs and can block the action.',
              'Matcher: the filter that says which tools the hook applies to. `Edit|Write` covers editing and creating files; it does not cover terminal commands.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Prepare a test folder',
        blocks: [
          { k: 'p', v: 'Prerequisites: Claude Code installed and the `jq` tool, which reads the JSON that Claude Code sends to the hook. On a Mac, check with `which jq`.' },
          { k: 'p', v: 'Use a test folder, not a real project. Create a `.env` file with sample content and the hooks folder:' },
          { k: 'code', label: 'Terminal', text: PREPARE },
        ],
      },
      {
        n: '2',
        title: 'Create the hook script',
        blocks: [
          { k: 'p', v: 'Save it as `.claude/hooks/protect-env.sh`. It reads the path of the file Claude wants to change and, if the name starts with `.env`, exits with code two, which is the code that blocks.' },
          { k: 'code', label: '.claude/hooks/protect-env.sh', text: SCRIPT },
          { k: 'p', muted: true, v: 'The script compares only the file name (what comes after the last slash). That way it blocks `.env`, `.env.local` and `.env.production`, and does not block a folder that merely has ".env" in its name, such as `.environments`. `.env.example` is also blocked; adjust the script if you need to allow it. The message in the script is in Portuguese ("Bloqueado" means "Blocked"); you can translate the text inside `echo` without changing how it works.' },
          { k: 'p', v: 'Make the script executable:' },
          { k: 'code', label: 'Terminal', text: CHMOD },
        ],
      },
      {
        n: '3',
        title: 'Register the hook in settings.json',
        blocks: [
          { k: 'p', v: 'Create `.claude/settings.json` with this content. If the file already exists, merge the `hooks` block into what is already there.' },
          { k: 'code', label: '.claude/settings.json', text: SETTINGS },
          { k: 'p', v: 'Open Claude Code in the test folder and type `/hooks`. The hook should appear in the list, under PreToolUse.' },
        ],
      },
      {
        n: '4',
        title: 'Test',
        blocks: [
          { k: 'p', v: 'Make these three requests to Claude, one at a time:' },
          {
            k: 'opts',
            items: [
              { c: 'Add a comment to the .env file', v: 'Expected: the edit is blocked before it happens and Claude receives the message "Bloqueado: ...".' },
              { c: 'Create a file teste.txt with the word oi', v: 'Expected: it works, because the script exits with code zero for other files.' },
              { c: 'Run in the terminal: echo oi >> .env', v: 'Expected: it gets through. The `Edit|Write` matcher does not see terminal commands. This is the limit mentioned at the start.' },
            ],
          },
          { k: 'p', muted: true, v: 'If the hook does not appear or does not fire, start with `claude --debug-file /tmp/claude.log` and follow it with `tail -f /tmp/claude.log`, or use `/debug` inside the session.' },
        ],
      },
      {
        n: '5',
        title: 'What to check',
        blocks: [
          {
            k: 'ul',
            items: [
              'Only exit code two blocks. Exit code one without valid JSON is a non-blocking error: the action goes ahead.',
              'The script must be executable and `jq` must be installed. Without that, the hook fails and, in general, the action goes ahead.',
              'Exit code zero in PreToolUse does not approve the action: it follows the normal permission flow.',
              'Command hooks are fixed rules. Prompt and agent hooks use a model to decide; they are for judgment, not for fixed rules.',
              'Where to keep it: `.claude/settings.json` applies to the project and can go into Git; `.claude/settings.local.json` applies only to you; `~/.claude/settings.json` applies to all your projects.',
              'To forbid an action broadly, permission rules (`permissions.deny`) are another layer the documentation points to.',
            ],
          },
        ],
      },
      {
        title: 'Rule of thumb',
        blocks: [
          {
            k: 'ul',
            items: [
              'Hook or permission: a rule that must always apply, such as protecting a file or blocking a command.',
              'CLAUDE.md: style preferences and project context.',
            ],
          },
        ],
      },
      {
        title: 'Before you take it to your project',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'The script was tested on November 9, 2026 in the terminal, on Linux and on a Mac (macOS 27), with the PreToolUse JSON the documentation describes: it blocks .env, .env.local, .env.production, sub/.env and .env.example; it allows app.py and files inside .environments; it does not see terminal commands.',
              'Test it inside a real Claude Code session, in the test folder, before using it in a real project.',
              'Event names and the settings.json format may change. Check the documentation on the date you use it.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Official Claude Code documentation, checked on November 9, 2026: [Memory (CLAUDE.md)](${URL_MEMORY}), [Hooks guide](${URL_GUIDE}) and [Hooks reference](${URL_REFERENCE}). The script is based on the documentation’s "Block edits to protected files" example, with the file name comparison and the message adapted.` },
        ],
      },
    ],
  },
};
