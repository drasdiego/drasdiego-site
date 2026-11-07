import type { Guide } from './blog';

export const TRIBUNAL: Guide = {
  slug: 'tribunal',
  category: 'claude-code',
  published: '2026-11-07',
  pt: {
    title: 'Tribunal de 12 Claudes',
    short: 'Tribunal',
    lead: 'Como instalar e usar a skill /court no Claude Code para colocar a sua ideia em julgamento antes de gastar tempo com ela.',
    description: 'Como instalar e usar a skill gratuita /court no Claude Code para colocar uma ideia em julgamento diante de 12 jurados.',
    facts: ['gratuita', 'código aberto (MIT)', 'para Claude Code'],
    sections: [
      {
        n: '0',
        title: 'O que é e o que você precisa',
        blocks: [
          { k: 'p', v: 'O Claude costuma concordar com tudo que você fala. A skill `/court` muda isso: um Claude defende que a ideia vai dar errado, outro defende que vai dar certo, jurados votam em separado e um Claude juiz resume o veredito.' },
          { k: 'ul', items: ['Claude Code instalado no seu computador.', 'Python 3, que a skill usa para organizar os votos.', 'Um plano do Claude com uso suficiente, porque cada julgamento consome várias chamadas.'] },
          { k: 'p', muted: true, v: 'Não precisa de chave de API, cadastro nem conexão com nenhuma conta.' },
        ],
      },
      {
        n: '1',
        title: 'Instale a skill',
        blocks: [
          { k: 'p', v: 'Escolha uma das opções. A primeira é a mais simples.' },
          { k: 'h3', v: 'Opção A: peça para o próprio Claude instalar' },
          { k: 'code', label: 'cole no Claude Code', text: 'Instale a skill deste repositório e confirme que o comando /court funciona: https://github.com/alexyc9381/court-skill' },
          { k: 'h3', v: 'Opção B: pelo terminal' },
          { k: 'code', label: 'terminal', text: 'npx skills add alexyc9381/court-skill' },
          { k: 'h3', v: 'Opção C: manualmente' },
          { k: 'code', label: 'terminal', text: 'git clone https://github.com/alexyc9381/court-skill.git\ncp -r court-skill/skills/court ~/.claude/skills/' },
          { k: 'h3', v: 'Opção D: como plugin' },
          { k: 'code', label: 'dentro do Claude Code', text: '/plugin marketplace add alexyc9381/court-skill\n/plugin install court-skill@court-skill' },
          { k: 'p', muted: true, v: 'Instalada como plugin, a skill aparece como `/court-skill:court`.' },
        ],
      },
      {
        n: '2',
        title: 'Abra o Claude Code na pasta certa',
        blocks: [
          { k: 'p', v: 'Entre na pasta do seu projeto e abra o Claude Code por lá. O julgamento cria uma pasta chamada `.court` dentro dela e, segundo o repositório, não mexe nos seus outros arquivos.' },
          { k: 'p', muted: true, v: 'Dica do repositório: ative o modo de aceitar edições com Shift+Tab, para não precisar aprovar cada arquivo.' },
        ],
      },
      {
        n: '3',
        title: 'Coloque a sua ideia em julgamento',
        blocks: [
          { k: 'p', v: 'Digite `/court` seguido da ideia ou da decisão que você está avaliando.' },
          { k: 'code', label: 'exemplo', text: '/court Criar um canal semanal de vídeos curtos sobre inteligência artificial' },
          { k: 'h3', v: 'Opções' },
          {
            k: 'opts',
            items: [
              { c: '--jury N', v: 'Define de 3 a 12 jurados. O padrão é 12.' },
              { c: '--quick', v: 'Julgamento rápido, com 6 jurados.' },
              { c: '--seed S', v: 'Fixa quais jurados participam quando o júri é menor.' },
            ],
          },
          { k: 'p', muted: true, v: 'Um julgamento completo usa 17 chamadas de sub-agentes, e o modo rápido usa 11. Todas contam no uso do seu plano.' },
        ],
      },
      {
        n: '4',
        title: 'Leia o veredito',
        blocks: [
          { k: 'p', v: 'O resultado fica no arquivo `VERDICT.md`, dentro da pasta `.court`. Nele você encontra:' },
          { k: 'ol', items: ['A contagem dos votos, por exemplo culpado por 9 a 3.', 'O motivo de cada jurado em uma linha.', 'As mudanças que valem a pena fazer antes de tentar de novo.', 'A parte do juiz: as acusações que pegaram, o que a defesa acertou e as condições para a ideia ser absolvida.'] },
          { k: 'p', muted: true, v: 'O repositório traz um exemplo pronto em `examples/candles/VERDICT.md`.' },
        ],
      },
      {
        title: 'Antes de confiar no resultado',
        note: true,
        blocks: [
          { k: 'ul', items: ['O veredito é uma simulação feita por IA. Ele traz pontos de vista que você pode ter deixado passar, mas não prevê o futuro.', 'Quem decide é você. Use o resultado como uma segunda opinião e confira os fatos importantes por conta própria.', 'Para remover a skill: `rm -rf ~/.claude/skills/court`'] },
        ],
      },
      {
        title: 'Crédito',
        blocks: [
          { k: 'p', muted: true, v: 'A skill `/court` é de Alex Chen (@nocodealex): [github.com/alexyc9381/court-skill](https://github.com/alexyc9381/court-skill). Licença MIT. A skill é do autor, não é minha nem da Anthropic.' },
        ],
      },
    ],
  },
  en: {
    title: 'Court of 12 Claudes',
    short: 'Court',
    lead: 'How to install and use the /court skill in Claude Code to put your idea on trial before you spend time on it.',
    description: 'How to install and use the free /court skill in Claude Code to put an idea on trial in front of 12 jurors.',
    facts: ['free', 'open source (MIT)', 'for Claude Code'],
    sections: [
      {
        n: '0',
        title: 'What it is and what you need',
        blocks: [
          { k: 'p', v: 'Claude tends to agree with everything you say. The `/court` skill changes that: one Claude argues that the idea will fail, another argues that it will work, jurors vote independently, and a Claude acting as judge summarizes the verdict.' },
          { k: 'ul', items: ['Claude Code installed on your computer.', 'Python 3, which the skill uses to organize the votes.', 'A Claude plan with enough usage, because each trial makes several calls.'] },
          { k: 'p', muted: true, v: 'No API key, sign-up or account connection is needed.' },
        ],
      },
      {
        n: '1',
        title: 'Install the skill',
        blocks: [
          { k: 'p', v: 'Pick one of the options. The first is the simplest.' },
          { k: 'h3', v: 'Option A: ask Claude to install it' },
          { k: 'code', label: 'paste into Claude Code', text: 'Install the skill from this repository and confirm that the /court command works: https://github.com/alexyc9381/court-skill' },
          { k: 'h3', v: 'Option B: from the terminal' },
          { k: 'code', label: 'terminal', text: 'npx skills add alexyc9381/court-skill' },
          { k: 'h3', v: 'Option C: manually' },
          { k: 'code', label: 'terminal', text: 'git clone https://github.com/alexyc9381/court-skill.git\ncp -r court-skill/skills/court ~/.claude/skills/' },
          { k: 'h3', v: 'Option D: as a plugin' },
          { k: 'code', label: 'inside Claude Code', text: '/plugin marketplace add alexyc9381/court-skill\n/plugin install court-skill@court-skill' },
          { k: 'p', muted: true, v: 'When installed as a plugin, the skill appears as `/court-skill:court`.' },
        ],
      },
      {
        n: '2',
        title: 'Open Claude Code in the right folder',
        blocks: [
          { k: 'p', v: 'Go to your project folder and open Claude Code from there. The trial creates a folder called `.court` inside it and, according to the repository, leaves your other files alone.' },
          { k: 'p', muted: true, v: 'Tip from the repository: turn on accept-edits mode with Shift+Tab, so you do not have to approve every file.' },
        ],
      },
      {
        n: '3',
        title: 'Put your idea on trial',
        blocks: [
          { k: 'p', v: 'Type `/court` followed by the idea or decision you are evaluating.' },
          { k: 'code', label: 'example', text: '/court Start a channel that posts a short video about artificial intelligence every week' },
          { k: 'h3', v: 'Options' },
          {
            k: 'opts',
            items: [
              { c: '--jury N', v: 'Sets the number of jurors, from 3 to 12. The default is 12.' },
              { c: '--quick', v: 'A quick trial with 6 jurors.' },
              { c: '--seed S', v: 'Locks in which jurors sit on the jury when it is smaller.' },
            ],
          },
          { k: 'p', muted: true, v: 'A full trial makes 17 sub-agent calls, and quick mode makes 11. All of them count toward your plan usage.' },
        ],
      },
      {
        n: '4',
        title: 'Read the verdict',
        blocks: [
          { k: 'p', v: 'The result is saved in the `VERDICT.md` file, inside the `.court` folder. It contains:' },
          { k: 'ol', items: ['The vote count, for example a 9 to 3 guilty verdict.', 'Each juror’s reason in one line.', 'The changes worth making before you try again.', 'The judge’s section: the charges that stuck, what the defense got right, and the conditions under which the idea would be acquitted.'] },
          { k: 'p', muted: true, v: 'The repository includes a ready-made example at `examples/candles/VERDICT.md`.' },
        ],
      },
      {
        title: 'Before you trust the result',
        note: true,
        blocks: [
          { k: 'ul', items: ['The verdict is an AI simulation. It brings up points of view you may have missed, but it does not predict the future.', 'You make the decision. Use the result as a second opinion and check the important facts yourself.', 'To remove the skill: `rm -rf ~/.claude/skills/court`'] },
        ],
      },
      {
        title: 'Credit',
        blocks: [
          { k: 'p', muted: true, v: 'The `/court` skill is by Alex Chen (@nocodealex): [github.com/alexyc9381/court-skill](https://github.com/alexyc9381/court-skill). MIT license. The skill belongs to its author. It is neither mine nor Anthropic’s.' },
        ],
      },
    ],
  },
};
