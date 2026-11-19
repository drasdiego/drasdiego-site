import type { Lang } from '@/types';

export const INSTAGRAM_URL = 'https://www.instagram.com/drasdiegotech/';

export interface GuideNext {
  word: string;
  title: { pt: string; en: string };
  category?: string;
  slug?: string;
}

export interface GuideClosingData {
  result: { pt: string; en: string };
  next?: GuideNext;
}

export const GUIDE_CLOSING: Record<string, GuideClosingData> = {
  tribunal: {
    result: {
      pt: 'Agora você consegue instalar a skill /court e colocar uma ideia em julgamento no Claude Code antes de investir tempo nela.',
      en: 'You can now install the /court skill and put an idea on trial in Claude Code before you invest time in it.',
    },
    next: { word: 'DESFAZER', title: { pt: 'Esc duas vezes não desfaz tudo', en: 'Double Esc does not undo everything' }, category: 'claude-code', slug: 'rewind' },
  },
  rewind: {
    result: {
      pt: 'Agora você sabe o que o rewind do Claude Code desfaz, o que ele não desfaz e qual hábito protege o seu projeto.',
      en: 'You now know what Claude Code’s rewind undoes, what it does not, and which habit protects your project.',
    },
    next: { word: 'JOIN', title: { pt: 'JOIN que multiplica a soma', en: 'The JOIN that multiplies the sum' }, category: 'sql', slug: 'join-multiplica-a-soma' },
  },
  'join-multiplica-a-soma': {
    result: {
      pt: 'Agora você consegue perceber quando um JOIN infla a soma e corrigir com agregação antes do JOIN, EXISTS ou LEFT JOIN.',
      en: 'You can now spot when a JOIN inflates a sum and fix it by aggregating before the JOIN, with EXISTS or with a LEFT JOIN.',
    },
    next: { word: 'CHAVE', title: { pt: 'Chave vazada no GitHub', en: 'Leaked key on GitHub' }, category: 'github', slug: 'chave-vazada' },
  },
  'chave-vazada': {
    result: {
      pt: 'Agora você sabe tirar uma chave do código, resolver um envio bloqueado e o que fazer, na ordem certa, se ela vazar.',
      en: 'You now know how to keep a key out of your code, resolve a blocked push and what to do, in the right order, if it leaks.',
    },
    next: { word: 'HOOK', title: { pt: 'Hook, a regra que você impõe', en: 'Hook, the rule you enforce' }, category: 'claude-code', slug: 'hook' },
  },
  hook: {
    result: {
      pt: 'Agora você sabe criar um hook que bloqueia a edição do .env, provar que ele funciona e o que ele não cobre.',
      en: 'You now know how to create a hook that blocks edits to .env, prove that it works and what it does not cover.',
    },
    next: { word: 'PROCV', title: { pt: 'PROCV sem o quarto argumento', en: 'VLOOKUP without the fourth argument' }, category: 'excel', slug: 'procv' },
  },
  procv: {
    result: {
      pt: 'Agora você sabe por que o PROCV sem o quarto argumento erra sem avisar, como corrigir com FALSO e como conferir a planilha.',
      en: 'You now know why VLOOKUP without the fourth argument fails without warning, how to fix it with FALSE and how to check your spreadsheet.',
    },
    next: { word: 'SCRIPT', title: { pt: 'Apps Script tem teto', en: 'Apps Script has a ceiling' }, category: 'google-workspace', slug: 'apps-script-teto' },
  },
  'apps-script-teto': {
    result: {
      pt: 'Agora você sabe montar um script que processa a planilha em lotes, para antes do teto de seis minutos e continua sozinho de onde parou.',
      en: 'You now know how to build a script that processes the spreadsheet in batches, stops before the six-minute ceiling and carries on by itself from where it stopped.',
    },
    next: { word: 'PLUGIN', title: { pt: 'Plugin roda código de verdade', en: 'A plugin really does run code' }, category: 'claude-code', slug: 'plugin-roda-codigo' },
  },
  'plugin-roda-codigo': {
    result: {
      pt: 'Agora você sabe o que um plugin instalado pode rodar na sua máquina e como revisar um plugin antes de instalar, conferir o que ficou e remover o que você não confia mais.',
      en: 'You now know what an installed plugin can run on your machine and how to review a plugin before you install it, check what was installed and remove one you no longer trust.',
    },
    next: { word: 'DESCRIÇÃO', title: { pt: 'O que faz o Codex escolher uma skill', en: 'What makes Codex pick a skill' }, category: 'codex', slug: 'descricao-da-skill' },
  },
  'descricao-da-skill': {
    result: {
      pt: 'Agora você sabe como o Codex escolhe uma skill, como escrever uma descrição com escopo claro e como testar em qual pedido a skill entra.',
      en: 'You now know how Codex picks a skill, how to write a description with a clear scope and how to test which request the skill steps into.',
    },
    next: { word: 'SIMPSON', title: { pt: 'Paradoxo de Simpson na prática', en: 'Simpson’s paradox in practice' }, category: 'dados', slug: 'paradoxo-de-simpson' },
  },
  'paradoxo-de-simpson': {
    result: {
      pt: 'Agora você sabe por que um total pode esconder o que acontece dentro de cada grupo, e tem uma planilha para conferir isso com as suas próprias fórmulas.',
      en: 'You now know why a total can hide what happens inside each group, and you have a spreadsheet to check it with your own formulas.',
    },
    next: { word: 'LOTADO', title: { pt: 'Skills demais no Claude Code', en: 'Too many skills in Claude Code' }, category: 'claude-code', slug: 'skills-demais' },
  },
  'skills-demais': {
    result: {
      pt: 'Agora você sabe por que skill demais atrapalha, como medir o tamanho da lista, achar as que você não usa e decidir entre deixar só o nome ou desligar.',
      en: 'You now know why too many skills get in the way, how to measure the listing, find the ones you never use and choose between keeping only the name and turning a skill off.',
    },
    next: { word: 'DATAS', title: { pt: 'BETWEEN e o dia 31 que some', en: 'BETWEEN and the missing 31st' }, category: 'dados', slug: 'between-dia-31' },
  },
  'between-dia-31': {
    result: {
      pt: 'Agora você sabe por que o BETWEEN perde as vendas do dia 31 quando a coluna guarda data e hora, e tem um teste pronto para conferir isso no seu próprio banco.',
      en: 'You now know why BETWEEN loses the sales of the 31st when the column stores date and time, and you have a ready-made test to check it on your own database.',
    },
    next: { word: 'HOBBY', title: { pt: 'Vercel grátis é só pessoal?', en: 'Vercel’s free plan is for personal use' }, category: 'deploy', slug: 'vercel-hobby-so-pessoal' },
  },
  'vercel-hobby-so-pessoal': {
    result: {
      pt: 'Agora você tem um checklist para conferir se o seu projeto cabe no plano Hobby da Vercel, sabe onde ver o plano do time e onde desligar o uso do seu conteúdo para treino de IA.',
      en: 'You now have a checklist to see whether your project fits Vercel’s Hobby plan, you know where to check your team’s plan and where to turn off the use of your content for AI training.',
    },
    next: { word: 'CUSTO', title: { pt: 'LIMIT 10 no BigQuery não baixa a conta', en: 'LIMIT 10 in BigQuery does not lower the bill' }, category: 'dados', slug: 'limit-bigquery-custo' },
  },
  'limit-bigquery-custo': {
    result: {
      pt: 'Agora você sabe por que o LIMIT não diminui o que o BigQuery cobra numa tabela sem cluster e como estimar o custo antes de rodar a consulta.',
      en: 'You now know why LIMIT does not reduce what BigQuery charges on a table without clustering, and how to estimate the cost before you run the query.',
    },
    next: { word: 'IGNORAR', title: { pt: '.gitignore não desrastreia o que já subiu', en: '.gitignore does not untrack what is already tracked' }, category: 'github', slug: 'gitignore-nao-desrastreia' },
  },
  'gitignore-nao-desrastreia': {
    result: {
      pt: 'Agora você sabe por que o .gitignore não para de acompanhar o que já foi registrado, tem o teste pronto para rodar e o git rm --cached passo a passo.',
      en: 'You now know why .gitignore does not stop tracking what is already in, you have the ready-made test and git rm --cached step by step.',
    },
    next: { word: 'DIAMES', title: { pt: 'Data brasileira no pandas', en: 'Brazilian dates in pandas' }, category: 'dados', slug: 'data-brasileira-pandas' },
  },
  'data-brasileira-pandas': {
    result: {
      pt: 'Agora você sabe como o pandas troca dia e mês sem avisar, as três formas de ler data brasileira e como conferir a coluna depois de converter.',
      en: 'You now know how pandas swaps day and month without warning, the three ways to read Brazilian dates and how to check the column after converting.',
    },
    next: { word: 'AGENDA', title: { pt: 'O cron do GitHub Actions não é um relógio', en: 'The GitHub Actions cron is not a clock' }, category: 'github', slug: 'cron-actions-nao-e-relogio' },
  },
  'cron-actions-nao-e-relogio': {
    result: {
      pt: 'Agora você tem um workflow com cron, fuso e minuto quebrado, a conta de UTC para Brasília e as regras de atraso, descarte e desativação em 60 dias.',
      en: 'You now have a workflow with cron, time zone and an off-the-hour minute, the UTC to Brasília conversion and the rules on delay, dropped runs and the 60-day shutdown.',
    },
    next: { word: 'PAINEL', title: { pt: 'O painel do Claude Code', en: 'The Claude Code status line' }, category: 'claude-code', slug: 'painel-status-line' },
  },
  'painel-status-line': {
    result: {
      pt: 'Agora você tem o script pronto da barra do Claude Code, sabe ligar de dois jeitos, o que cada campo quer dizer e o que fazer se a barra não aparecer.',
      en: 'You now have the ready-made Claude Code status line script, two ways to turn it on, what each field means and what to do if the line does not show up.',
    },
    next: { word: 'TARGET', title: { pt: 'Seu workflow pode parar em dezembro', en: 'Your workflow may stop in December' }, category: 'github', slug: 'pull-request-target-bloqueio' },
  },
  'pull-request-target-bloqueio': {
    result: {
      pt: 'Agora você sabe o que muda no pull_request_target em dezembro, quais repositórios são afetados e como conferir os seus workflows antes da data.',
      en: 'You now know what changes for pull_request_target in December, which repositories are affected and how to check your workflows before the date.',
    },
    next: { word: 'ENTREVISTA', title: { pt: 'Deixe o Claude te entrevistar', en: 'Let Claude interview you' }, category: 'claude-code', slug: 'claude-te-entrevista-spec' },
  },
  'claude-te-entrevista-spec': {
    result: {
      pt: 'Agora você tem o pedido pronto para o Claude te entrevistar antes de escrever, e sabe por que a sessão precisa começar limpa.',
      en: 'You now have the ready-made prompt for Claude to interview you before writing, and you know why the session needs a clean start.',
    },
    next: { word: 'HUMANO', title: { pt: 'Claude escrevendo igual gente', en: 'Claude writing like a person' }, category: 'claude-code', slug: 'humanizer-texto-de-ia' },
  },
  'humanizer-texto-de-ia': {
    result: {
      pt: 'Agora você sabe instalar e usar o Humanizer, o que ele reescreve e o que ele não resolve sozinho.',
      en: 'You now know how to install and use Humanizer, what it rewrites and what it does not solve on its own.',
    },
  },
  'revisor-que-nao-edita': {
    result: {
      pt: 'Agora você tem o arquivo do revisor pronto, sabe por que a trava vale só para o subagente e por que o Bash fica fora da lista.',
      en: 'You now have the ready made reviewer file, you know why the lock applies only to the subagent and why Bash stays off the list.',
    },
  },
};

export const CLOSING_UI = {
  pt: {
    heading: 'Fechamento do guia',
    follow: 'Seguir @drasdiegotech',
    followHint: 'Abre o Instagram',
    nextTitle: 'Próximo guia',
    nextWord: (w: string) => `No reel, comente ${w} para receber o link.`,
    nextRead: 'Ler o próximo guia',
    nextSoon: 'Em breve no site.',
    save: 'Salve este guia nos favoritos do navegador e salve o reel no Instagram para voltar quando precisar.',
    copyLink: 'Copiar link do guia',
    others: 'Ver outros guias',
    privacy: 'Este site conta visitas com o Vercel Web Analytics, de forma anônima e agregada, sem cookies de terceiros.',
    privacyLink: 'Aviso de privacidade',
  },
  en: {
    heading: 'Guide wrap-up',
    follow: 'Follow @drasdiegotech',
    followHint: 'Opens Instagram',
    nextTitle: 'Next guide',
    nextWord: (w: string) => `On the reel, comment ${w} to get the link.`,
    nextRead: 'Read the next guide',
    nextSoon: 'Coming soon to the site.',
    save: 'Bookmark this guide in your browser and save the reel on Instagram so you can come back when you need it.',
    copyLink: 'Copy guide link',
    others: 'See other guides',
    privacy: 'This site counts visits with Vercel Web Analytics, anonymously and in aggregate, without third-party cookies.',
    privacyLink: 'Privacy notice',
  },
} satisfies Record<Lang, Record<string, unknown>>;
