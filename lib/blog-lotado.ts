import type { Guide } from './blog';

const CMD_DOCTOR = '/doctor';
const CMD_SKILL_DOCTOR = '/skill-doctor';
const CMD_TERMINAL = 'claude -p "/skill-doctor"';
const CMD_SKILLS = '/skills';
const JSON_OVERRIDES = '{\n  "skillOverrides": {\n    "revisar-sql": "name-only",\n    "testes-api": "off"\n  }\n}';
const YAML_DESCRICAO = 'description: Revisa consultas SQL, procura erros e sugere melhorias. Use quando alguém pedir para revisar uma consulta.';
const JSON_ORCAMENTO = '{\n  "skillListingBudgetFraction": 0.02\n}';

const URL_SKILLS = 'https://code.claude.com/docs/en/skills';

const LABEL_SESSAO_PT = 'Comando na sessão';
const LABEL_TERMINAL_PT = 'Comando no terminal';
const LABEL_JSON_PT = 'Configuração (JSON)';
const LABEL_YAML_PT = 'Linha da descrição (YAML)';
const LABEL_ORCAMENTO_PT = 'Configuração do orçamento (JSON)';

const LABEL_SESSAO_EN = 'Command in the session';
const LABEL_TERMINAL_EN = 'Command in the terminal';
const LABEL_JSON_EN = 'Setting (JSON)';
const LABEL_YAML_EN = 'Description line (YAML)';
const LABEL_ORCAMENTO_EN = 'Budget setting (JSON)';

export const SKILLS_DEMAIS: Guide = {
  slug: 'skills-demais',
  category: 'claude-code',
  published: '2026-11-13',
  pt: {
    title: 'Skills demais no Claude Code',
    short: 'Skills demais',
    lead: 'Por que skill demais pode fazer o Claude ignorar algumas, como ver quanto a lista de skills ocupa, achar as que você não usa e decidir entre deixar só o nome ou desligar.',
    description: 'Por que skill demais pode fazer o Claude ignorar algumas, como ver quanto a lista de skills ocupa, achar as que você não usa e decidir entre deixar só o nome ou desligar.',
    facts: ['claude code', 'skills', 'passo a passo'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Comandos, configurações e limites do Claude Code mudam entre versões. Este guia segue a documentação oficial de 13/11/2026. O comando `/skill-doctor` foi rodado no Mac do autor, no Claude Code 2.1.319, no modo de texto (`claude -p`). Os outros passos vêm da documentação e não foram todos executados aqui: confira na sua versão. Os nomes de skills deste guia (revisar-sql, resumo-pdf e outros) são exemplo. Este guia é independente, não é documentação oficial e não tem vínculo com a Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Skill: uma pasta com um arquivo `SKILL.md` de instruções que você dá ao Claude. As pessoais ficam em `~/.claude/skills/<nome>/SKILL.md` e valem em todos os projetos. As de projeto ficam em `.claude/skills/<nome>/SKILL.md`, dentro da pasta do projeto.',
              'Descrição: o campo `description` no começo do `SKILL.md`. É por ela que o Claude decide quando usar a skill sozinho. O campo opcional `when_to_use` é somado à descrição na lista e conta no mesmo teto de caracteres.',
              'Lista de skills: o Claude Code manda ao Claude uma lista com o nome e a descrição de cada skill. A documentação diz que cada skill da lista ocupa espaço em toda mensagem, mesmo que o Claude nunca a use. O resto do `SKILL.md` só entra quando a skill é usada.',
              'Espaço que o Claude tem para ler: é a janela de contexto, o tanto de texto que o modelo consegue considerar de uma vez numa conversa. A lista de skills disputa esse espaço com o resto da conversa.',
              'Orçamento da lista: a lista tem um teto de 1% da janela de contexto do modelo. Quando passa do teto, o Claude Code corta descrições, começando pelas skills que você menos usa. O nome continua na lista, e as skills que você mais usa mantêm o texto inteiro.',
              'Teto de cada descrição: a descrição somada ao `when_to_use` é cortada em 1.536 caracteres, independente do orçamento. O valor muda com a configuração `skillListingMaxDescChars`.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Por que isso faz o Claude ignorar uma skill',
        blocks: [
          { k: 'p', v: 'Sem a descrição, somem as palavras que o Claude usa para ligar o seu pedido àquela skill. A chance de ele escolher a skill sozinho cai. Nossa leitura: a chance cai, mas não zera, e você ainda pode chamar a skill pelo nome, digitando `/nome-da-skill`, desde que ela não esteja desligada.' },
        ],
      },
      {
        n: '2',
        title: 'Veja quanto a lista ocupa',
        blocks: [
          { k: 'p', v: 'Dentro de uma sessão do Claude Code:' },
          { k: 'code', label: LABEL_SESSAO_PT, text: CMD_DOCTOR },
          { k: 'p', v: 'Segundo a documentação, o `/doctor` mostra uma estimativa do quanto a lista de skills ocupa e quais skills pesam mais. A linha Skills do comando `/context` mostra o tamanho da lista depois do corte, que é o que o modelo de fato recebe. Em versões anteriores à 2.1.196, essa linha mostrava um número muito maior que o real; se o seu parece enorme, atualize antes de se preocupar. Quando a lista passa do orçamento, o Claude Code também grava um aviso no arquivo de diagnóstico que ele mantém para quem investiga problemas, visível se você abrir o Claude Code com `--debug`.' },
        ],
      },
      {
        n: '3',
        title: 'Ache as skills que você não usa',
        blocks: [
          { k: 'p', v: 'Dentro de uma sessão:' },
          { k: 'code', label: LABEL_SESSAO_PT, text: CMD_SKILL_DOCTOR },
          { k: 'p', v: 'O relatório mostra o custo de contexto de cada skill e quantas vezes ela foi usada, e marca as que nunca foram usadas. Na sessão interativa, ele abre na aba Stats do gerenciador `/plugin`. No terminal, fora de uma sessão, você recebe o mesmo relatório em texto:' },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_TERMINAL },
          { k: 'p', v: 'Cuidados:' },
          {
            k: 'ul',
            items: [
              'Exige Claude Code 2.1.252 ou mais novo.',
              'Não funciona pelo Remote Control (quando você controla do celular ou do navegador uma sessão que roda no computador) nem em sessões que pulam a busca de recursos novos. Rode no terminal da máquina onde a sessão roda. Se o comando não existir na sua sessão, confira a versão.',
              'O relatório não inclui as skills que já vêm com o Claude Code nem as da empresa.',
              'A documentação recomenda começar pelas skills que custam mais contexto.',
              'Nossa leitura: "nunca usada" vem do histórico de uso. Uma skill rara e importante pode aparecer na lista. Confira antes de mexer.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Decida o que fazer com cada uma',
        blocks: [
          { k: 'p', v: 'A configuração `skillOverrides` tem quatro estados para cada skill:' },
          {
            k: 'opts',
            items: [
              { c: 'on', v: 'O Claude vê nome e descrição. Aparece no menu `/`.' },
              { c: 'name-only', v: 'O Claude vê só o nome. Aparece no menu `/`.' },
              { c: 'user-invocable-only', v: 'No menu aparece como user-only. O Claude não vê. Aparece no menu `/`.' },
              { c: 'off', v: 'O Claude não vê. Não aparece no menu `/`.' },
            ],
          },
          { k: 'p', v: 'Skill que não aparece em `skillOverrides` fica como `on`.' },
          { k: 'p', v: 'O jeito mais simples é o menu, dentro de uma sessão:' },
          { k: 'code', label: LABEL_SESSAO_PT, text: CMD_SKILLS },
          { k: 'p', v: 'Escolha a skill, aperte Espaço para trocar o estado e Esc para salvar. O menu grava a escolha em `.claude/settings.local.json`.' },
          { k: 'p', v: 'Se preferir escrever à mão, o formato é este (os nomes são exemplo). JSON é só um formato de arquivo de configuração: copie igual, com chaves, aspas e vírgulas. Se o arquivo `.claude/settings.local.json` já existir, não cole o bloco inteiro por cima: adicione só a parte `"skillOverrides": { ... }` dentro das chaves que já existem, separada das outras linhas por vírgula. Se o arquivo não existir, o caminho mais seguro é usar o menu `/skills`, que cria o arquivo sozinho.' },
          { k: 'code', label: LABEL_JSON_PT, text: JSON_OVERRIDES },
          { k: 'p', v: 'Como escolher:' },
          {
            k: 'ul',
            items: [
              'Deixe em `name-only` para liberar espaço e manter a skill a um `/nome-da-skill` de distância. Nossa recomendação para skills raras que você ainda quer ter à mão.',
              'Use `user-invocable-only` quando o Claude pode deixar de ver a skill, mas você ainda quer chamá-la pelo menu.',
              'Use `off` para sumir de tudo. Chamar pelo nome completo devolve erro em vez de rodar. Também esconde a skill de quem usa o Claude Code pelo Remote Control ou pelo Agent SDK. Antes de usar `off`, confira se alguma outra skill ou rotina sua chama essa skill pelo nome. Na dúvida, use `name-only`. Nossa leitura: como a configuração só controla a visibilidade, a pasta da skill continua no disco. Remover de verdade seria apagar a pasta, e este guia não pede isso.',
            ],
          },
          { k: 'p', v: 'Atenção: skills de plugin não obedecem `skillOverrides`. Gerencie essas pelo `/plugin`.' },
        ],
      },
      {
        n: '5',
        title: 'Escreva a descrição com o uso principal no começo',
        blocks: [
          { k: 'p', v: 'Nas skills que ficam, a documentação recomenda pôr o caso de uso principal logo no início da descrição, porque cada descrição tem teto de 1.536 caracteres. Um exemplo (essa linha fica entre os dois traços `---` no começo do `SKILL.md`, junto do campo `name`):' },
          { k: 'code', label: LABEL_YAML_PT, text: YAML_DESCRICAO },
        ],
      },
      {
        n: '6',
        title: 'Se precisar, aumente o orçamento',
        blocks: [
          { k: 'p', v: 'Se você usa muitas skills de verdade, dá para aumentar o orçamento da lista nas configurações. O exemplo abaixo dobra o teto para 2% da janela de contexto. Coloque essa linha dentro do seu arquivo de configurações, sem apagar o que já está lá:' },
          { k: 'code', label: LABEL_ORCAMENTO_PT, text: JSON_ORCAMENTO },
          { k: 'p', v: 'A documentação também cita a variável de ambiente `SLASH_COMMAND_TOOL_CHAR_BUDGET`, que fixa o orçamento num número de caracteres. Ela é para quem já usa variáveis de ambiente; se você não usa, ignore. Nossa leitura: um orçamento maior deixa mais descrições inteiras, mas a lista passa a ocupar mais espaço em toda mensagem. Nossa recomendação: enxugue antes de aumentar.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Rode `/doctor` e veja quanto a lista ocupa.',
              'Rode `/skill-doctor` e ache as skills nunca usadas.',
              'No `/skills`, deixe as raras como `name-only` e desligue com `off` só as que você dispensa.',
              'Ponha o uso principal no começo de cada descrição.',
              'Só aumente o orçamento se ainda faltar espaço.',
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
              'Mito: "skill instalada é skill que funciona". Verdade: se a lista passa do orçamento, a descrição dela pode ser cortada, e o Claude pode não saber quando usá-la.',
              'Mito: "skill que eu não uso não pesa". Verdade: segundo a documentação, toda skill da lista ocupa espaço em toda mensagem.',
              'Mito: "desligar apaga a skill". Verdade: `off` só esconde. Nossa leitura: a pasta continua no disco. Para religar, troque o estado de volta no `/skills` ou apague a linha do arquivo de configurações.',
            ],
          },
        ],
      },
      {
        title: 'Fonte',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code Docs, [Skills](${URL_SKILLS}), lida em 13/11/2026. Conteúdo educativo e independente, sem vínculo com a Anthropic.` },
        ],
      },
    ],
  },
  en: {
    title: 'Too many skills in Claude Code',
    short: 'Too many skills',
    lead: 'Why too many skills can make Claude ignore some of them, how to see how much room the skill listing takes, how to find the ones you never use and how to choose between keeping only the name and turning a skill off.',
    description: 'Why too many skills can make Claude ignore some of them, how to see how much room the skill listing takes, how to find the ones you never use and how to choose between keeping only the name and turning a skill off.',
    facts: ['claude code', 'skills', 'step by step'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'Claude Code commands, settings and limits change between versions. This guide follows the official documentation as of November 13, 2026. The `/skill-doctor` command was run on the author’s Mac, on Claude Code 2.1.319, in text mode (`claude -p`). The other steps come from the documentation and were not all carried out here: check them on your own version. The skill names in this guide (revisar-sql, resumo-pdf and others) are examples. This guide is independent, it is not official documentation and it has no affiliation with Anthropic.' },
          { k: 'p', v: 'The code blocks are kept exactly as in the Portuguese guide, so the example skill names and the YAML description line are written in Portuguese. They are only examples, and a description can be written in any language.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Skill: a folder with a `SKILL.md` file of instructions you give Claude. Personal ones live in `~/.claude/skills/<name>/SKILL.md` and apply to every project. Project ones live in `.claude/skills/<name>/SKILL.md`, inside the project folder.',
              'Description: the `description` field at the top of `SKILL.md`. Claude uses it to decide when to reach for the skill on its own. The optional `when_to_use` field is added to the description in the listing and counts towards the same character limit.',
              'Skill listing: Claude Code sends Claude a list with the name and the description of each skill. The documentation says every skill in the listing takes room in every message, even if Claude never uses it. The rest of the `SKILL.md` only comes in once the skill is used.',
              'The room Claude has to read: that is the context window, how much text the model can take into account at once in a conversation. The skill listing competes for that room with the rest of the conversation.',
              'Listing budget: the listing has a cap of 1% of the model’s context window. Once it goes over, Claude Code trims descriptions, starting with the skills you use least. The name stays in the listing, and the skills you use most keep their full text.',
              'Cap per description: the description plus `when_to_use` is cut at 1,536 characters, regardless of the budget. That value changes with the `skillListingMaxDescChars` setting.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Why that makes Claude ignore a skill',
        blocks: [
          { k: 'p', v: 'Without the description, the words Claude uses to connect your request to that skill are gone. The chance of it reaching for the skill on its own drops. Our reading: the chance drops, it does not reach zero, and you can still call the skill by name, typing `/skill-name`, as long as it is not turned off.' },
        ],
      },
      {
        n: '2',
        title: 'See how much room the listing takes',
        blocks: [
          { k: 'p', v: 'Inside a Claude Code session:' },
          { k: 'code', label: LABEL_SESSAO_EN, text: CMD_DOCTOR },
          { k: 'p', v: 'According to the documentation, `/doctor` shows an estimate of how much room the skill listing takes and which skills weigh the most. The Skills line of the `/context` command shows the size of the listing after trimming, which is what the model actually receives. In versions before 2.1.196, that line showed a number far larger than the real one; if yours looks huge, update before worrying. When the listing goes over the budget, Claude Code also writes a warning into the diagnostic file it keeps for troubleshooting, visible if you start Claude Code with `--debug`.' },
        ],
      },
      {
        n: '3',
        title: 'Find the skills you never use',
        blocks: [
          { k: 'p', v: 'Inside a session:' },
          { k: 'code', label: LABEL_SESSAO_EN, text: CMD_SKILL_DOCTOR },
          { k: 'p', v: 'The report shows the context cost of each skill and how many times it was used, and marks the ones never used. In an interactive session, it opens on the Stats tab of the `/plugin` manager. In the terminal, outside a session, you get the same report as text:' },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_TERMINAL },
          { k: 'p', v: 'Watch out for:' },
          {
            k: 'ul',
            items: [
              'It requires Claude Code 2.1.252 or newer.',
              'It does not work through Remote Control (when you drive from your phone or browser a session that runs on the computer) nor in sessions that skip looking up new features. Run it in the terminal of the machine where the session runs. If the command does not exist in your session, check the version.',
              'The report does not include the skills that ship with Claude Code nor the ones from your company.',
              'The documentation recommends starting with the skills that cost the most context.',
              'Our reading: "never used" comes from usage history. A rare but important skill can show up on that list. Check before you touch it.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Decide what to do with each one',
        blocks: [
          { k: 'p', v: 'The `skillOverrides` setting has four states for each skill:' },
          {
            k: 'opts',
            items: [
              { c: 'on', v: 'Claude sees the name and the description. It shows up in the `/` menu.' },
              { c: 'name-only', v: 'Claude sees only the name. It shows up in the `/` menu.' },
              { c: 'user-invocable-only', v: 'In the menu it appears as user-only. Claude does not see it. It shows up in the `/` menu.' },
              { c: 'off', v: 'Claude does not see it. It does not show up in the `/` menu.' },
            ],
          },
          { k: 'p', v: 'A skill that does not appear in `skillOverrides` stays as `on`.' },
          { k: 'p', v: 'The simplest way is the menu, inside a session:' },
          { k: 'code', label: LABEL_SESSAO_EN, text: CMD_SKILLS },
          { k: 'p', v: 'Pick the skill, press Space to switch the state and Esc to save. The menu writes your choice into `.claude/settings.local.json`.' },
          { k: 'p', v: 'If you would rather write it by hand, this is the format (the names are examples). JSON is just a configuration file format: copy it exactly, with braces, quotes and commas. If the `.claude/settings.local.json` file already exists, do not paste the whole block over it: add only the `"skillOverrides": { ... }` part inside the braces that are already there, separated from the other lines by a comma. If the file does not exist, the safest path is the `/skills` menu, which creates the file by itself.' },
          { k: 'code', label: LABEL_JSON_EN, text: JSON_OVERRIDES },
          { k: 'p', v: 'How to choose:' },
          {
            k: 'ul',
            items: [
              'Use `name-only` to free up room and keep the skill one `/skill-name` away. Our recommendation for rare skills you still want within reach.',
              'Use `user-invocable-only` when Claude can stop seeing the skill, but you still want to call it from the menu.',
              'Use `off` to make it disappear from everything. Calling it by its full name returns an error instead of running. It also hides the skill from anyone using Claude Code through Remote Control or the Agent SDK. Before using `off`, check whether another skill or routine of yours calls that skill by name. When in doubt, use `name-only`. Our reading: since the setting only controls visibility, the skill folder stays on disk. Removing it for real would mean deleting the folder, and this guide does not ask for that.',
            ],
          },
          { k: 'p', v: 'Careful: plugin skills do not obey `skillOverrides`. Manage those through `/plugin`.' },
        ],
      },
      {
        n: '5',
        title: 'Write the description with the main use at the start',
        blocks: [
          { k: 'p', v: 'For the skills that stay, the documentation recommends putting the main use case right at the start of the description, because each description has a cap of 1,536 characters. An example (this line sits between the two `---` dashes at the top of `SKILL.md`, next to the `name` field):' },
          { k: 'code', label: LABEL_YAML_EN, text: YAML_DESCRICAO },
        ],
      },
      {
        n: '6',
        title: 'Raise the budget if you need to',
        blocks: [
          { k: 'p', v: 'If you really do use many skills, you can raise the listing budget in the settings. The example below doubles the cap to 2% of the context window. Put that line inside your settings file, without deleting what is already there:' },
          { k: 'code', label: LABEL_ORCAMENTO_EN, text: JSON_ORCAMENTO },
          { k: 'p', v: 'The documentation also mentions the `SLASH_COMMAND_TOOL_CHAR_BUDGET` environment variable, which fixes the budget at a number of characters. It is for people who already work with environment variables; if you do not, ignore it. Our reading: a larger budget keeps more descriptions whole, but the listing then takes more room in every message. Our recommendation: trim before you raise it.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'Run `/doctor` and see how much room the listing takes.',
              'Run `/skill-doctor` and find the skills never used.',
              'In `/skills`, leave the rare ones as `name-only` and use `off` only for the ones you can do without.',
              'Put the main use at the start of each description.',
              'Only raise the budget if room is still short.',
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
              'Myth: "an installed skill is a working skill". Truth: if the listing goes over the budget, its description may be trimmed, and Claude may not know when to use it.',
              'Myth: "a skill I never use costs nothing". Truth: according to the documentation, every skill in the listing takes room in every message.',
              'Myth: "turning it off deletes the skill". Truth: `off` only hides it. Our reading: the folder stays on disk. To turn it back on, switch the state back in `/skills` or delete the line from the settings file.',
            ],
          },
        ],
      },
      {
        title: 'Source',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code Docs, [Skills](${URL_SKILLS}), read on November 13, 2026. Educational and independent content, not affiliated with Anthropic.` },
        ],
      },
    ],
  },
};
