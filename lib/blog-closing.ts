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
    next: { word: 'HOOK', title: { pt: 'Hook, a regra sem exceção', en: 'Hook, the rule with no exceptions' } },
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
