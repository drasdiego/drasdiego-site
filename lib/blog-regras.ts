import type { Guide } from './blog';

const U_MEM = 'https://code.claude.com/docs/en/memory';
const U_COST = 'https://code.claude.com/docs/en/costs';
const U_HOOKS = 'https://code.claude.com/docs/en/hooks-guide';

export const CLAUDE_MD_ENXUTO: Guide = {
  slug: 'claude-md-enxuto',
  category: 'claude-code',
  keyword: 'REGRAS',
  published: '2026-11-21',
  pt: {
    title: 'CLAUDE.md gigante atrapalha: como deixar o arquivo curto e as regras mais obedecidas',
    short: 'CLAUDE.md enxuto',
    lead: 'O CLAUDE.md é contexto, não configuração obrigatória, e arquivo grande reduz a obediência. Um exemplo enxuto, o que cortar e como conferir o que o Claude carregou.',
    description: 'O que a documentação do Claude Code diz sobre o tamanho do CLAUDE.md, regras que se contradizem e regras vagas, um CLAUDE.md enxuto de exemplo, como conferir o que foi carregado com /memory e o que vira hook ou skill.',
    facts: ['claude code', 'claude.md', 'regras'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Os fatos vêm das páginas do Claude Code citadas nas fontes, abertas em 18/11/2026. O que foi testado no Mac: o arquivo de exemplo abaixo foi salvo e contado com `wc -l` (deu 20 linhas; se o seu editor não colocar quebra de linha no fim do arquivo, o `wc` mostra 19) e o `grep` do passo 2 foi rodado nele. Os comandos de dentro do Claude Code (`/memory`) e o comportamento do Claude com o arquivo não foram executados: confira na documentação, nos links das fontes. O CLAUDE.md abaixo é exemplo (projeto fictício). Este guia não tem vínculo com a Anthropic.' },
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
              'CLAUDE.md: segundo a documentação, arquivos de texto que você escreve para dar ao Claude instruções persistentes sobre o projeto, o seu jeito de trabalhar ou a organização; o Claude os lê no começo de toda sessão.',
              'Contexto: o texto que o modelo enxerga ao responder. Arquivo grande ocupa mais dele.',
              'Aderência (adherence): o quanto o Claude segue o que está escrito.',
              'Hook: comando de shell que roda em momentos fixos do ciclo do Claude Code, qualquer que seja a decisão dele, conforme a documentação.',
              'Skill: instruções que só carregam quando são chamadas, em vez de em toda sessão.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que a documentação diz',
        blocks: [
          {
            k: 'ul',
            items: [
              'É contexto, não obrigação: "Claude treats them as context, not enforced configuration." A página também diz que não há garantia de cumprimento estrito, principalmente com instruções vagas ou conflitantes.',
              'Tamanho: a meta é "target under 200 lines per CLAUDE.md file" (menos de 200 linhas por arquivo), porque "Longer files consume more context and reduce adherence." A página diz que o arquivo é carregado inteiro, qualquer que seja o tamanho, e que arquivo mais curto dá melhor aderência. O limite de 200 linhas do MEMORY.md, da memória automática, é outra coisa.',
              'Contradição: "if two rules contradict each other, Claude may pick one arbitrarily" (se duas regras se contradizem, o Claude pode escolher uma sem critério).',
              'Especificidade: "The more specific and concise your instructions, the more consistently Claude follows them."',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Passo a passo',
        blocks: [
          { k: 'ol', start: 1, items: ['Salve o exemplo abaixo como `CLAUDE.md`. Ele tem regras curtas e verificáveis, e é só um exemplo de formato:'] },
          { k: 'code', label: 'CLAUDE.md enxuto (exemplo, projeto fictício)', text: "# Projeto Loja (exemplo)\n\n## Comandos\n- Instalar: npm install\n- Testar: npm test\n- Rodar local: npm run dev\n\n## Código\n- Use dois espaços de indentação.\n- Nomes de função em camelCase e nomes de arquivo em kebab-case.\n- Crie arquivos só em src/ e tests/.\n\n## Antes de commitar\n- Rode npm test e só faça o commit com todos os testes passando.\n- Escreva a mensagem de commit no imperativo, com até 72 caracteres.\n\n## Estrutura\n- src/api: rotas\n- src/ui: componentes\n- tests: testes automatizados" },
          { k: 'ol', start: 2, items: ['Conte as linhas do seu arquivo. Rodado no Mac com o exemplo acima, o resultado foi 20 (se o seu editor não colocar quebra de linha no fim do arquivo, o `wc` mostra 19; o que importa é ficar bem abaixo de 200, a meta da documentação):'] },
          { k: 'code', label: 'Contar linhas (terminal)', text: "wc -l CLAUDE.md" },
          { k: 'ol', start: 3, items: ['Procure regras vagas. Esta busca é uma dica do autor, não da documentação: ela lista linhas com palavras que costumam esconder regra vaga. Rodada no exemplo acima, não achou nada:'] },
          { k: 'code', label: 'Achar palavras vagas (terminal, dica do autor)', text: "grep -n -i -E \"bem|direito|sempre|nunca|adequad\" CLAUDE.md" },
          { k: 'ol', start: 4, items: ['Troque regra vaga por regra específica. Exemplos da documentação: "Use 2-space indentation" no lugar de "Format code properly" e "Run npm test before committing" no lugar de "Test your changes". Remova regras que se contradizem; a documentação manda revisar de tempos em tempos o CLAUDE.md, os de subpastas e o `.claude/rules/`.'] },
          { k: 'ol', start: 5, items: ['Confira o que o Claude carregou na sessão. A documentação diz que o comando abaixo lista os arquivos CLAUDE.md e de regras carregados, e que, se um arquivo não aparece, o Claude não o enxerga:'] },
          { k: 'code', label: 'Ver o que foi carregado (dentro do Claude Code, não executado: confira na documentação)', text: "/memory" },
          { k: 'ol', start: 6, items: ['Tire do arquivo o que vale só para um tipo de arquivo. A documentação descreve regras por caminho, em `.claude/rules/`, com este cabeçalho, que só disparam quando o Claude lê arquivos que combinam com o padrão:'] },
          { k: 'code', label: 'Cabeçalho de regra por caminho (da documentação, não executado)', text: "---\npaths:\n  - \"src/api/**/*.ts\"\n---" },
          { k: 'ol', start: 7, items: ['O que nunca pode falhar não deve depender do arquivo. Para bloquear uma ação, a documentação manda usar um hook PreToolUse. O guia de hooks da documentação mostra como: [https://code.claude.com/docs/en/hooks-guide](' + U_HOOKS + '). Instruções de fluxos específicos, como revisão de PR, também podem virar skills, que só carregam quando chamadas (página de custos).'] },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'O CLAUDE.md é contexto, não configuração obrigatória.',
              'Mire em menos de 200 linhas: arquivo maior gasta mais contexto e reduz a aderência.',
              'Regras curtas, específicas e sem contradição.',
              'Confira com /memory. O que nunca pode falhar vira hook, não regra escrita.',
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
              'Mito: "se está no CLAUDE.md, o Claude é obrigado". Verdade: a documentação diz que é contexto, sem garantia de cumprimento estrito.',
              'Mito: "quanto mais regra, melhor". Verdade: a documentação diz que arquivo maior consome mais contexto e reduz a aderência.',
              'Mito: "dividir em @imports reduz o contexto". Verdade: a documentação diz que dividir em imports ajuda a organizar, mas não reduz o contexto, porque os arquivos importados carregam no início.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [memória (CLAUDE.md e regras)](${U_MEM}). Claude Code, [gerenciar custos (CLAUDE.md abaixo de 200 linhas, skills)](${U_COST}). Claude Code, [guia de hooks](${U_HOOKS}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'A giant CLAUDE.md gets in the way: how to keep it short and your rules followed',
    short: 'A lean CLAUDE.md',
    lead: 'CLAUDE.md is context, not enforced configuration, and a large file reduces how well it is followed. A lean example, what to cut and how to check what Claude loaded.',
    description: 'What the Claude Code documentation says about CLAUDE.md size, contradicting rules and vague rules, a lean example CLAUDE.md, how to check what was loaded with /memory and what becomes a hook or a skill.',
    facts: ['claude code', 'claude.md', 'rules'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The facts come from the Claude Code pages cited in the sources, opened on 11/18/2026. What was tested on a Mac: the example file below was saved and counted with `wc -l` (it gave 20 lines; if your editor does not put a line break at the end of the file, `wc` shows 19) and the `grep` from step 2 was run on it. The commands inside Claude Code (`/memory`) and the behavior of Claude with the file were not run: check the documentation, in the links under the sources. The CLAUDE.md below is an example (fictional project). This guide is not affiliated with Anthropic.' },
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
              'CLAUDE.md: according to the documentation, text files you write to give Claude persistent instructions about the project, your way of working or the organization; Claude reads them at the start of every session.',
              'Context: the text the model sees when it answers. A large file takes up more of it.',
              'Adherence: how closely Claude follows what is written.',
              'Hook: a shell command that runs at fixed moments of the Claude Code cycle, whatever Claude decides, according to the documentation.',
              'Skill: instructions that only load when they are called, instead of in every session.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What the documentation says',
        blocks: [
          {
            k: 'ul',
            items: [
              'It is context, not an obligation: "Claude treats them as context, not enforced configuration." The page also says there is no guarantee of strict compliance, especially with vague or conflicting instructions.',
              'Size: the target is "target under 200 lines per CLAUDE.md file", because "Longer files consume more context and reduce adherence." The page says the file is loaded in full, whatever its size, and that a shorter file gives better adherence. The 200 line limit of MEMORY.md, from automatic memory, is a different thing.',
              'Contradiction: "if two rules contradict each other, Claude may pick one arbitrarily".',
              'Specificity: "The more specific and concise your instructions, the more consistently Claude follows them."',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Step by step',
        blocks: [
          { k: 'ol', start: 1, items: ['Save the example below as `CLAUDE.md`. It has short, checkable rules, and it is only an example of the format. The names in Portuguese inside the blocks are example names, and the result does not change:'] },
          { k: 'code', label: 'CLAUDE.md enxuto (exemplo, projeto fictício)', text: "# Projeto Loja (exemplo)\n\n## Comandos\n- Instalar: npm install\n- Testar: npm test\n- Rodar local: npm run dev\n\n## Código\n- Use dois espaços de indentação.\n- Nomes de função em camelCase e nomes de arquivo em kebab-case.\n- Crie arquivos só em src/ e tests/.\n\n## Antes de commitar\n- Rode npm test e só faça o commit com todos os testes passando.\n- Escreva a mensagem de commit no imperativo, com até 72 caracteres.\n\n## Estrutura\n- src/api: rotas\n- src/ui: componentes\n- tests: testes automatizados" },
          { k: 'ol', start: 2, items: ['Count the lines of your file. Run on a Mac with the example above, the result was 20 (if your editor does not put a line break at the end of the file, `wc` shows 19; what matters is staying well below 200, the target in the documentation):'] },
          { k: 'code', label: 'Contar linhas (terminal)', text: "wc -l CLAUDE.md" },
          { k: 'ol', start: 3, items: ['Look for vague rules. This search is a tip from the author, not from the documentation: it lists lines with words that tend to hide a vague rule. Run on the example above, it found nothing:'] },
          { k: 'code', label: 'Achar palavras vagas (terminal, dica do autor)', text: "grep -n -i -E \"bem|direito|sempre|nunca|adequad\" CLAUDE.md" },
          { k: 'ol', start: 4, items: ['Swap a vague rule for a specific one. Examples from the documentation: "Use 2-space indentation" instead of "Format code properly" and "Run npm test before committing" instead of "Test your changes". Remove rules that contradict each other; the documentation says to review the CLAUDE.md, the ones in subfolders and `.claude/rules/` from time to time.'] },
          { k: 'ol', start: 5, items: ['Check what Claude loaded in the session. The documentation says the command below lists the CLAUDE.md and rules files that were loaded, and that, if a file does not appear, Claude cannot see it:'] },
          { k: 'code', label: 'Ver o que foi carregado (dentro do Claude Code, não executado: confira na documentação)', text: "/memory" },
          { k: 'ol', start: 6, items: ['Take out of the file what only applies to one type of file. The documentation describes path rules, in `.claude/rules/`, with this header, which only trigger when Claude reads files that match the pattern:'] },
          { k: 'code', label: 'Cabeçalho de regra por caminho (da documentação, não executado)', text: "---\npaths:\n  - \"src/api/**/*.ts\"\n---" },
          { k: 'ol', start: 7, items: ['What can never fail should not depend on the file. To block an action, the documentation says to use a PreToolUse hook. The hooks guide in the documentation shows how: [https://code.claude.com/docs/en/hooks-guide](' + U_HOOKS + '). Instructions for specific workflows, such as PR review, can also become skills, which only load when called (costs page).'] },
        ],
      },
      {
        title: 'Keep this in mind',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'CLAUDE.md is context, not enforced configuration.',
              'Aim for under 200 lines: a larger file uses more context and reduces adherence.',
              'Short, specific rules with no contradiction.',
              'Check with /memory. What can never fail becomes a hook, not a written rule.',
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
              'Myth: "if it is in CLAUDE.md, Claude has to obey". Fact: the documentation says it is context, with no guarantee of strict compliance.',
              'Myth: "the more rules, the better". Fact: the documentation says a larger file consumes more context and reduces adherence.',
              'Myth: "splitting into @imports reduces the context". Fact: the documentation says splitting into imports helps organize, but does not reduce context, because the imported files load at launch.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Claude Code, [memory (CLAUDE.md and rules)](${U_MEM}). Claude Code, [managing costs (CLAUDE.md under 200 lines, skills)](${U_COST}). Claude Code, [hooks guide](${U_HOOKS}).` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
