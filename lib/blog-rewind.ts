import type { Guide } from './blog';

export const REWIND: Guide = {
  slug: 'rewind',
  category: 'claude-code',
  published: '2026-11-07',
  pt: {
    title: 'Esc duas vezes não desfaz tudo',
    short: 'Rewind',
    lead: 'Como usar o rewind do Claude Code para voltar o código e a conversa, o que ele não consegue desfazer e o hábito que protege o seu projeto.',
    description: 'Como usar o rewind do Claude Code (Esc duas vezes ou /rewind), o que ele desfaz, o que fica de fora e como se proteger com um commit antes de tarefa grande.',
    facts: ['recurso nativo', 'sem instalar nada', 'para Claude Code'],
    sections: [
      {
        n: '0',
        title: 'O que é o rewind',
        blocks: [
          { k: 'p', v: 'Toda vez que você envia um pedido que começa uma nova rodada, o Claude Code guarda um ponto de restauração (checkpoint) com o estado dos arquivos antes daquela rodada. O rewind é o menu que deixa você voltar para um desses pontos.' },
          {
            k: 'ul',
            items: [
              'Funciona sozinho: não precisa ativar nem instalar nada.',
              'Os pontos ficam salvos junto com a conversa. Se você retomar a sessão depois, o rewind continua disponível.',
              'O Claude Code guarda as cópias dos arquivos dos 100 pontos mais recentes de cada sessão.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Abra o menu',
        blocks: [
          { k: 'p', v: 'Com a caixa de texto vazia, aperte `Esc` duas vezes. Se preferir, digite o comando:' },
          { k: 'code', label: 'dentro do Claude Code', text: '/rewind' },
          { k: 'callout', tone: 'note', v: 'Se a caixa tiver texto, `Esc` duas vezes só limpa o que estava escrito. O texto vai para o histórico: depois de usar o menu, aperte a seta para cima para trazer de volta.' },
        ],
      },
      {
        n: '2',
        title: 'Escolha o ponto e o que volta',
        blocks: [
          { k: 'p', v: 'O menu lista os pedidos que você fez na sessão. Selecione o ponto desejado e escolha uma ação. Os nomes aparecem em inglês na tela:' },
          {
            k: 'opts',
            items: [
              { c: 'Restore code and conversation', v: 'Volta o código e a conversa para aquele ponto.' },
              { c: 'Restore conversation', v: 'Volta só a conversa e mantém o código como está.' },
              { c: 'Restore code', v: 'Volta só os arquivos e mantém a conversa.' },
              { c: 'Summarize from here / Summarize up to here', v: 'Resume parte da conversa para liberar espaço no contexto. Não mexe nos arquivos.' },
              { c: 'Never mind', v: 'Sai sem mudar nada.' },
            ],
          },
          { k: 'callout', tone: 'note', v: 'As duas opções que restauram código só aparecem quando aquele ponto tem edições de arquivo registradas. Ao voltar a conversa, o pedido original volta para a caixa de texto, pronto para você editar ou reenviar.' },
        ],
      },
      {
        n: '3',
        title: 'O que volta e o que fica de fora',
        blocks: [
          {
            k: 'split',
            yes: {
              title: 'Volta',
              items: [
                'Arquivos que o Claude editou com as ferramentas de edição dele.',
                'Mudanças feitas por comandos de terminal em um arquivo que o Claude já tinha editado nessa conversa.',
                'A conversa, se você escolher essa opção.',
              ],
            },
            no: {
              title: 'Não volta',
              items: [
                'Arquivo que só foi mudado por comando de terminal, como `rm` (apagar) e `mv` (mover ou renomear).',
                'Edições feitas por subagentes, na maioria dos casos.',
                'Mudanças que você fez fora do Claude Code ou em outra sessão ao mesmo tempo.',
                'Arquivos que são atalhos de sistema (links simbólicos e hard links).',
              ],
            },
          },
          { k: 'callout', tone: 'example', v: 'Se o Claude rodar `rm b.txt` no terminal e esse arquivo nunca tiver sido editado por ele, o rewind não traz o `b.txt` de volta.' },
        ],
      },
      {
        n: '4',
        title: 'Faça um commit antes de tarefa grande',
        blocks: [
          { k: 'p', v: 'A própria documentação diz que o rewind não substitui o controle de versão. Antes de pedir uma mudança grande, salve o estado do projeto no Git. Na pasta do projeto, rode:' },
          { k: 'code', label: 'terminal, uma vez por projeto', text: 'git init' },
          { k: 'code', label: 'terminal, antes de cada tarefa grande', text: 'git add -A\ngit commit -m "antes da tarefa grande"' },
          { k: 'callout', tone: 'tip', v: 'O `git add -A` é o que inclui os arquivos novos. Sem ele, um arquivo que nunca entrou no Git não fica salvo no commit.' },
          { k: 'h3', v: 'Se algo foi apagado ou movido pelo terminal' },
          { k: 'p', v: 'Para ver o que mudou desde o último commit:' },
          { k: 'code', label: 'terminal', text: 'git status' },
          { k: 'p', v: 'Para trazer de volta um arquivo apagado que estava no commit (troque `b.txt` pelo nome do seu arquivo):' },
          { k: 'code', label: 'terminal', text: 'git restore b.txt' },
          { k: 'callout', tone: 'warn', v: '`git restore .` volta todos os arquivos ao estado do último commit e descarta qualquer mudança que ainda não foi salva. Use só quando tiver certeza.' },
        ],
      },
      {
        title: 'Antes de confiar no rewind',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Os pontos de restauração são apagados na limpeza automática, por padrão cerca de 30 dias depois da última vez que a sessão salvou um. Para guardar por mais tempo, ajuste a configuração `cleanupPeriodDays`.',
              'Se as cópias de um ponto já foram apagadas, voltar para ele pode falhar com a mensagem `No files were restored`.',
              'Use o rewind para desfazer rápido dentro da sessão e o Git para histórico de verdade.',
            ],
          },
        ],
      },
      {
        title: 'Fonte',
        blocks: [
          { k: 'p', muted: true, v: 'Documentação oficial do Claude Code, página Checkpointing: [code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing). Conferida em 07/11/2026. O comportamento pode mudar em versões futuras.' },
        ],
      },
    ],
  },
  en: {
    title: 'Double Esc does not undo everything',
    short: 'Rewind',
    lead: 'How to use Claude Code’s rewind to restore an earlier state of your code and conversation, what it cannot undo, and the habit that protects your project.',
    description: 'How to use Claude Code’s rewind (double Esc or /rewind), what it undoes, what it leaves out, and how to protect yourself with a commit before a big task.',
    facts: ['built-in feature', 'nothing to install', 'for Claude Code'],
    sections: [
      {
        n: '0',
        title: 'What rewind is',
        blocks: [
          { k: 'p', v: 'Every time you send a request that starts a new turn, Claude Code saves a checkpoint of your files as they were before that turn. Rewind is the menu that lets you go back to one of those checkpoints.' },
          {
            k: 'ul',
            items: [
              'It works on its own: there is nothing to turn on or install.',
              'Checkpoints are saved with the conversation. If you resume the session later, rewind is still available.',
              'Claude Code keeps file copies of the 100 most recent checkpoints in each session.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Open the menu',
        blocks: [
          { k: 'p', v: 'With the text box empty, press `Esc` twice. If you prefer, you can type the command instead:' },
          { k: 'code', label: 'inside Claude Code', text: '/rewind' },
          { k: 'callout', tone: 'note', v: 'If the box has text, pressing `Esc` twice only clears what you had written. The text goes to your history: after you use the menu, press the up arrow to bring the text back.' },
        ],
      },
      {
        n: '2',
        title: 'Pick the checkpoint and what comes back',
        blocks: [
          { k: 'p', v: 'The menu lists the requests you made in the session. Select the checkpoint you want and choose an action:' },
          {
            k: 'opts',
            items: [
              { c: 'Restore code and conversation', v: 'Returns both the code and the conversation to that point.' },
              { c: 'Restore conversation', v: 'Returns only the conversation to that point and keeps the code as it is.' },
              { c: 'Restore code', v: 'Returns only the files to that point and keeps the conversation.' },
              { c: 'Summarize from here / Summarize up to here', v: 'Summarizes part of the conversation to free up context space. Does not touch your files.' },
              { c: 'Never mind', v: 'Leaves the menu without changing anything.' },
            ],
          },
          { k: 'callout', tone: 'note', v: 'The two options that restore code only appear when that checkpoint has recorded file edits. When you go back in the conversation, the original request returns to the text box, ready for you to edit or resend.' },
        ],
      },
      {
        n: '3',
        title: 'What comes back and what stays out',
        blocks: [
          {
            k: 'split',
            yes: {
              title: 'Comes back',
              items: [
                'Files that Claude edited with its own editing tools.',
                'Changes made by terminal commands to a file that Claude had already edited in that conversation.',
                'The conversation, if you choose that option.',
              ],
            },
            no: {
              title: 'Does not come back',
              items: [
                'A file that was only changed by a terminal command, such as `rm` (delete) or `mv` (move or rename).',
                'Edits made by subagents, in most cases.',
                'Changes you made outside Claude Code or in another session at the same time.',
                'Files that are system shortcuts (symbolic links and hard links).',
              ],
            },
          },
          { k: 'callout', tone: 'example', v: 'If Claude runs `rm b.txt` in the terminal and has never edited that file, rewind does not bring `b.txt` back.' },
        ],
      },
      {
        n: '4',
        title: 'Make a commit before a big task',
        blocks: [
          { k: 'p', v: 'The official documentation itself says rewind is not a replacement for version control. Before asking for a big change, save the state of your project in Git. In the project folder, run:' },
          { k: 'code', label: 'terminal, once per project', text: 'git init' },
          { k: 'code', label: 'terminal, before each big task', text: 'git add -A\ngit commit -m "before the big task"' },
          { k: 'callout', tone: 'tip', v: 'The `git add -A` command is what includes new files. Without it, a file that has never been added to Git is not saved in the commit.' },
          { k: 'h3', v: 'If something was deleted or moved by the terminal' },
          { k: 'p', v: 'To see what changed since the last commit:' },
          { k: 'code', label: 'terminal', text: 'git status' },
          { k: 'p', v: 'To bring back a deleted file that was in the commit (replace `b.txt` with the name of your file):' },
          { k: 'code', label: 'terminal', text: 'git restore b.txt' },
          { k: 'callout', tone: 'warn', v: '`git restore .` returns all files to the state of the last commit and discards any change that has not been saved yet. Use it only when you are sure.' },
        ],
      },
      {
        title: 'Before you trust rewind',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Checkpoints are deleted in the automatic cleanup, by default about 30 days after the session last saved one. To keep them longer, adjust the `cleanupPeriodDays` setting.',
              'If the copies of a checkpoint have already been deleted, going back to it can fail with the message `No files were restored`.',
              'Use rewind for a quick undo inside the session and Git for real history.',
            ],
          },
        ],
      },
      {
        title: 'Source',
        blocks: [
          { k: 'p', muted: true, v: 'Official Claude Code documentation, Checkpointing page: [code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing). Checked on November 7, 2026. The behavior may change in future versions.' },
        ],
      },
    ],
  },
};
