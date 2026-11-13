import type { Guide } from './blog';

const CMD_MKDIR = 'mkdir -p ~/.agents/skills/revisar-sql';

const SKILL_MD = `---
name: revisar-sql
description: Use para revisar consultas SQL, procurar erros e sugerir melhorias. Não use para criar gráficos nem para escrever consultas novas do zero.
---

# Revisar consulta SQL

1. Leia a consulta que a pessoa enviou.
2. Procure erros: comandos escritos errado, tabelas ligadas de um jeito que duplica linhas, filtros de data incompletos e colunas que não existem.
3. Explique cada problema em linguagem simples.
4. Mostre a consulta corrigida e diga o que mudou.`;

const PEDIDO_REVISAR = `revisa esta consulta:
SELECT cliente, SUM(valor)
FROM pedidos
WHERE data >= '2026-01-01'
GROUP BY cliente;`;

const PEDIDO_GRAFICO = 'faz um gráfico com esses dados';
const PEDIDO_DIRETO = '$revisar-sql revisa esta consulta';

const OPENAI_YAML = `policy:
  allow_implicit_invocation: false`;

const URL_SKILLS = 'https://learn.chatgpt.com/codex/build-skills';

const LABEL_TERMINAL_PT = 'Terminal (Mac ou Linux)';
const LABEL_SKILL_PT = 'Arquivo SKILL.md';
const LABEL_PEDIDO_PT = 'Pedido no Codex';
const LABEL_PEDIDO_DIRETO_PT = 'Pedido no Codex CLI ou na IDE';
const LABEL_YAML_PT = 'Arquivo agents/openai.yaml';

const LABEL_TERMINAL_EN = 'Terminal (Mac or Linux)';
const LABEL_SKILL_EN = 'SKILL.md file';
const LABEL_PEDIDO_EN = 'Request in Codex';
const LABEL_PEDIDO_DIRETO_EN = 'Request in the Codex CLI or the IDE';
const LABEL_YAML_EN = 'agents/openai.yaml file';

export const DESCRICAO_DA_SKILL: Guide = {
  slug: 'descricao-da-skill',
  category: 'codex',
  published: '2026-11-13',
  pt: {
    title: 'Como escrever a descrição de uma skill do Codex',
    short: 'Descrição da skill',
    lead: 'Como o Codex escolhe uma skill, a diferença entre uma descrição vaga e uma clara, um exemplo pronto de skill para revisar consultas SQL e como testar em qual pedido a skill entra.',
    description: 'Como o Codex escolhe uma skill, a diferença entre uma descrição vaga e uma clara, um exemplo pronto de skill para revisar consultas SQL e como testar em qual pedido a skill entra.',
    facts: ['Codex', 'skills', 'exemplo pronto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'O Codex muda entre versões. Este guia segue a documentação oficial lida em 13/11/2026. O exemplo não foi executado no Codex pelo autor do guia: o teste de verdade é seu. A skill `revisar-sql`, a consulta e os pedidos são EXEMPLO, inventados para o guia. Uma descrição clara ajuda o Codex a escolher a skill certa, mas não garante a escolha. Na página oficial, não encontrei um jeito de confirmar qual skill o Codex usou.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Skill: uma pasta com instruções que ensina o Codex a fazer uma tarefa do jeito que você quer. Dentro dela fica o arquivo `SKILL.md`.',
              'SKILL.md: o arquivo principal da skill. Ele precisa ter dois campos no topo: `name` (o nome da skill) e `description` (a descrição). Esses dois campos ficam entre duas linhas com `---`.',
              'Descrição: uma frase que diz para que a skill serve e quando usar. É por ela que o Codex decide se a skill combina com o seu pedido.',
              'Consulta SQL: um pedido escrito na linguagem SQL para buscar dados numa tabela, como "some o valor das vendas de cada cliente".',
              'Chamada automática: o Codex escolhe a skill sozinho quando o seu pedido combina com a descrição.',
              'Chamada direta: você chama a skill pelo nome. No Codex CLI e na extensão da IDE, digite `$` e o nome da skill.',
              'Codex CLI e extensão da IDE: o Codex CLI é o Codex usado pelo terminal, o programa onde você digita comandos. A extensão da IDE é o Codex dentro de um editor de código, como o VS Code.',
              'Repositório e `$HOME`: repositório é a pasta de um projeto de código. `$HOME` é a sua pasta de usuário no computador; o `~` dos comandos é a mesma coisa.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Como o Codex escolhe',
        blocks: [
          { k: 'p', v: 'Primeiro o Codex lê só o nome e a descrição de cada skill. O `SKILL.md` inteiro, com o passo a passo, só entra quando ele decide usar aquela skill. Por isso a descrição precisa ter um escopo claro: dizer o que a skill faz e quando ela não deve entrar. Se você tem muitas skills instaladas, o Codex pode encurtar as descrições. Coloque o caso principal e as palavras importantes logo no começo.' },
          {
            k: 'ul',
            items: [
              'Descrição vaga: `ajuda com dados`. Cabe em quase qualquer pedido sobre dados: gráfico, planilha, relatório ou SQL.',
              'Descrição clara: `Use para revisar consultas SQL, procurar erros e sugerir melhorias.` Diz o assunto e o que a skill faz.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'O exemplo pronto',
        blocks: [
          {
            k: 'ol',
            items: [
              'Crie a pasta da skill. A pasta `$HOME/.agents/skills` vale para todos os seus projetos. Para uma skill de um projeto só, use `.agents/skills` dentro do repositório. No terminal do Mac ou do Linux, o comando `mkdir -p` cria a pasta (e as pastas acima dela, se faltarem):',
            ],
          },
          { k: 'code', label: LABEL_TERMINAL_PT, text: CMD_MKDIR },
          { k: 'ol', start: 2, items: ['Dentro dessa pasta, crie o arquivo `SKILL.md` com este conteúdo:'] },
          { k: 'code', label: LABEL_SKILL_PT, text: SKILL_MD },
          { k: 'ol', start: 3, items: ['O Codex percebe a skill nova sozinho. Se ela não aparecer, reinicie o Codex.'] },
        ],
      },
      {
        n: '3',
        title: 'Como testar',
        blocks: [
          { k: 'ol', items: ['Peça a revisão de uma consulta. Este pedido combina com a descrição, então a skill tem boa chance de entrar:'] },
          { k: 'code', label: LABEL_PEDIDO_PT, text: PEDIDO_REVISAR },
          { k: 'ol', start: 2, items: ['Depois peça uma coisa fora do escopo. A descrição diz que a skill não serve para gráficos, então ela provavelmente não entra:'] },
          { k: 'code', label: LABEL_PEDIDO_PT, text: PEDIDO_GRAFICO },
          {
            k: 'ol',
            start: 3,
            items: [
              'Compare as duas respostas. Na primeira, procure sinais de que o Codex seguiu os passos da skill (leu, procurou erros, explicou, corrigiu). Isso é um indício, não uma confirmação. Se o resultado não for o esperado, ajuste a descrição e teste de novo.',
              'Para chamar a skill direto, sem depender da escolha automática, no Codex CLI ou na extensão da IDE:',
            ],
          },
          { k: 'code', label: LABEL_PEDIDO_DIRETO_PT, text: PEDIDO_DIRETO },
        ],
      },
      {
        n: '4',
        title: 'Opcional: só chamada direta',
        blocks: [
          { k: 'p', v: 'Se você quer que a skill entre apenas quando for chamada pelo nome, crie o arquivo `agents/openai.yaml` (um arquivo de configuração em texto simples) dentro da pasta da skill (`revisar-sql/agents/openai.yaml`) com:' },
          { k: 'code', label: LABEL_YAML_PT, text: OPENAI_YAML },
          { k: 'p', v: 'O padrão é `true` (ligado: o Codex pode escolher a skill sozinho). Com `false` (desligado), ele não escolhe a skill sozinho, e a chamada com `$revisar-sql` continua funcionando.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'A descrição é o que o Codex lê para escolher a skill.',
              'Diga o assunto, o que a skill faz e quando ela não deve entrar.',
              'Coloque o caso principal no começo da frase.',
              'Teste com um pedido que deve acionar a skill e outro que não deve.',
              'Para chamar direto: `$nome-da-skill` no CLI ou na IDE.',
            ],
          },
        ],
      },
      {
        title: 'Fonte',
        blocks: [
          { k: 'p', muted: true, v: `OpenAI, Build skills, documentação do Codex, lida em 13/11/2026: [learn.chatgpt.com/codex/build-skills](${URL_SKILLS}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem afiliação com a OpenAI.' },
        ],
      },
    ],
  },
  en: {
    title: 'How to write a Codex skill description',
    short: 'Skill description',
    lead: 'How Codex picks a skill, the difference between a vague description and a clear one, a ready-made example skill for reviewing SQL queries, and how to test which request the skill steps into.',
    description: 'How Codex picks a skill, the difference between a vague description and a clear one, a ready-made example skill for reviewing SQL queries, and how to test which request the skill steps into.',
    facts: ['Codex', 'skills', 'ready-made example'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'Codex changes between versions. This guide follows the official documentation read on November 13, 2026. The example was not run in Codex by the author of this guide: the real test is yours. The `revisar-sql` skill, the query and the requests are EXAMPLES, made up for this guide. A clear description helps Codex pick the right skill, but it does not guarantee the choice. On the official page, I found no way to confirm which skill Codex used.' },
          { k: 'p', v: 'The code blocks are kept exactly as in the Portuguese guide, so the example description and the requests are written in Portuguese. Feel free to translate them into your own language; only the surrounding text was translated here.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Skill: a folder with instructions that teaches Codex to do a task the way you want. The `SKILL.md` file lives inside it.',
              'SKILL.md: the main file of the skill. It needs two fields at the top: `name` (the skill name) and `description` (the description). Those two fields sit between two lines with `---`.',
              'Description: a sentence saying what the skill is for and when to use it. Codex uses it to decide whether the skill matches your request.',
              'SQL query: a request written in the SQL language to fetch data from a table, such as "add up the sales value for each customer".',
              'Automatic invocation: Codex picks the skill by itself when your request matches the description.',
              'Direct invocation: you call the skill by name. In the Codex CLI and in the IDE extension, type `$` and the skill name.',
              'Codex CLI and IDE extension: the Codex CLI is Codex used from the terminal, the program where you type commands. The IDE extension is Codex inside a code editor, such as VS Code.',
              'Repository and `$HOME`: a repository is the folder of a code project. `$HOME` is your user folder on the computer; the `~` in the commands means the same thing.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'How Codex picks',
        blocks: [
          { k: 'p', v: 'Codex first reads only the name and the description of each skill. The whole `SKILL.md`, with the step by step, only comes in once it decides to use that skill. That is why the description needs a clear scope: say what the skill does and when it should stay out. If you have many skills installed, Codex may shorten the descriptions. Put the main case and the important words right at the start.' },
          {
            k: 'ul',
            items: [
              'Vague description: `ajuda com dados` ("helps with data"). It fits almost any request about data: a chart, a spreadsheet, a report or SQL.',
              'Clear description: `Use para revisar consultas SQL, procurar erros e sugerir melhorias.` ("Use to review SQL queries, look for errors and suggest improvements.") It says the subject and what the skill does.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'The ready-made example',
        blocks: [
          {
            k: 'ol',
            items: [
              'Create the skill folder. The `$HOME/.agents/skills` folder applies to all your projects. For a skill in a single project, use `.agents/skills` inside the repository. In the Mac or Linux terminal, the `mkdir -p` command creates the folder (and the folders above it, if they are missing):',
            ],
          },
          { k: 'code', label: LABEL_TERMINAL_EN, text: CMD_MKDIR },
          { k: 'ol', start: 2, items: ['Inside that folder, create the `SKILL.md` file with this content:'] },
          { k: 'code', label: LABEL_SKILL_EN, text: SKILL_MD },
          { k: 'ol', start: 3, items: ['Codex notices the new skill by itself. If it does not show up, restart Codex.'] },
        ],
      },
      {
        n: '3',
        title: 'How to test',
        blocks: [
          { k: 'ol', items: ['Ask for a query review. This request matches the description, so the skill has a good chance of stepping in:'] },
          { k: 'code', label: LABEL_PEDIDO_EN, text: PEDIDO_REVISAR },
          { k: 'ol', start: 2, items: ['Then ask for something outside the scope. The description says the skill is not for charts, so it probably stays out:'] },
          { k: 'code', label: LABEL_PEDIDO_EN, text: PEDIDO_GRAFICO },
          {
            k: 'ol',
            start: 3,
            items: [
              'Compare the two answers. In the first one, look for signs that Codex followed the steps of the skill (read it, looked for errors, explained, corrected). That is an indication, not a confirmation. If the result is not what you expected, adjust the description and test again.',
              'To call the skill directly, without depending on the automatic choice, in the Codex CLI or in the IDE extension:',
            ],
          },
          { k: 'code', label: LABEL_PEDIDO_DIRETO_EN, text: PEDIDO_DIRETO },
        ],
      },
      {
        n: '4',
        title: 'Optional: direct invocation only',
        blocks: [
          { k: 'p', v: 'If you want the skill to step in only when it is called by name, create the `agents/openai.yaml` file (a plain text configuration file) inside the skill folder (`revisar-sql/agents/openai.yaml`) with:' },
          { k: 'code', label: LABEL_YAML_EN, text: OPENAI_YAML },
          { k: 'p', v: 'The default is `true` (on: Codex may pick the skill by itself). With `false` (off), it does not pick the skill by itself, and calling it with `$revisar-sql` keeps working.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'The description is what Codex reads to pick the skill.',
              'Say the subject, what the skill does and when it should stay out.',
              'Put the main case at the start of the sentence.',
              'Test with a request that should trigger the skill and one that should not.',
              'To call it directly: `$skill-name` in the CLI or in the IDE.',
            ],
          },
        ],
      },
      {
        title: 'Source',
        blocks: [
          { k: 'p', muted: true, v: `OpenAI, Build skills, Codex documentation, read on November 13, 2026: [learn.chatgpt.com/codex/build-skills](${URL_SKILLS}).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with OpenAI.' },
        ],
      },
    ],
  },
};
