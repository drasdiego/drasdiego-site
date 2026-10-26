import type { Lang, AcademicItem } from '@/types';

interface Degree {
  id: 'se' | 'mba' | 'pm';
  rank: number;
  org: string;
  by: string;
  ic: string;
  done: boolean;
  since?: { year: number; month: number };
  completedYear?: number;
  name: Record<Lang, string>;
  short: Record<Lang, string>;
}

const DEGREES: Degree[] = [
  {
    id: 'se',
    rank: 2,
    org: 'Uninter',
    by: 'pela',
    ic: 'code',
    done: false,
    name: { pt: 'Bacharelado em Engenharia de Software', en: "Bachelor's in Software Engineering" },
    short: { pt: 'Engenharia de Software', en: 'Software Engineering' },
  },
  {
    id: 'mba',
    rank: 3,
    org: 'USP/ESALQ',
    by: 'na',
    ic: 'brain',
    done: false,
    since: { year: 2026, month: 10 },
    name: {
      pt: 'MBA em Data Science, Inteligência Artificial e Analytics',
      en: 'MBA in Data Science, AI & Analytics',
    },
    short: { pt: 'MBA em Data Science, IA e Analytics', en: 'MBA in Data Science, AI & Analytics' },
  },
  {
    id: 'pm',
    rank: 1,
    org: 'Estácio',
    by: 'pela',
    ic: 'layers',
    done: true,
    completedYear: 2025,
    name: { pt: 'Tecnólogo em Processos Gerenciais', en: 'Technologist in Management Processes' },
    short: { pt: 'Processos Gerenciais', en: 'Management Processes' },
  },
];

const MONTH_LONG: Record<Lang, string[]> = {
  pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const MONTH_SHORT: Record<Lang, string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const COUNT_PT = ['nenhuma', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis'];

function periodOf(d: Degree, lang: Lang): string {
  if (d.done) return lang === 'en' ? `Completed in ${d.completedYear}` : `Concluído em ${d.completedYear}`;
  if (!d.since) return lang === 'en' ? 'In progress' : 'Em andamento';
  const month = MONTH_LONG[lang][d.since.month - 1];
  return lang === 'en'
    ? `In progress since ${month} ${d.since.year}`
    : `Em andamento desde ${month} de ${d.since.year}`;
}

function statusOf(d: Degree, lang: Lang): string {
  if (lang === 'en') return d.done ? 'Completed' : 'Ongoing';
  return d.done ? 'Concluído' : 'Cursando';
}

function phraseOf(d: Degree, lang: Lang): string {
  const p = periodOf(d, lang);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

function chronological(): Degree[] {
  return [...DEGREES].sort((a, b) => a.rank - b.rank);
}

function normLang(lang: Lang): Lang {
  return lang === 'en' ? 'en' : 'pt';
}

export function academicFor(lang: Lang): AcademicItem[] {
  const l = normLang(lang);
  return DEGREES.map(d => ({
    name: d.name[l],
    org: d.org,
    period: periodOf(d, l),
    status: statusOf(d, l),
    done: d.done,
    ic: d.ic,
  }));
}

export function milestoneFor(id: Degree['id'], lang: Lang): { yr: string; role: string; co: string; now: boolean } {
  const l = normLang(lang);
  const d = DEGREES.find(item => item.id === id);
  if (!d || !d.since) throw new Error(`Formação sem data de início: ${id}`);
  const sep = l === 'en' ? ' ' : '/';
  const yr = `${MONTH_SHORT[l][d.since.month - 1]}${sep}${d.since.year} · ${l === 'en' ? 'now' : 'agora'}`;
  const state = l === 'en' ? 'in progress' : 'em andamento';
  return { yr, role: d.short[l], co: `${d.org} · ${state}`, now: false };
}

export function educationList(lang: Lang): string {
  const l = normLang(lang);
  const parts = chronological().map(d =>
    l === 'en'
      ? `${d.name.en} at ${d.org} (${phraseOf(d, l)})`
      : `${d.name.pt} ${d.by} ${d.org} (${phraseOf(d, l)})`,
  );
  if (parts.length < 2) return parts.join('');
  const last = parts[parts.length - 1];
  const head = parts.slice(0, -1).join(', ');
  if (l === 'en') return parts.length === 2 ? `${head} and ${last}` : `${head}, and ${last}`;
  return `${head} e ${last}`;
}

export function educationBullets(lang: Lang): string {
  const l = normLang(lang);
  return chronological()
    .map(d =>
      l === 'en'
        ? `- ${d.name.en} at ${d.org}, ${phraseOf(d, l)}`
        : `- ${d.name.pt} ${d.by} ${d.org}, ${phraseOf(d, l)}`,
    )
    .join('\n');
}

export function degreeCountPt(): string {
  return COUNT_PT[DEGREES.length] ?? String(DEGREES.length);
}

export function completedOrgs(): string[] {
  return chronological()
    .filter(d => d.done)
    .map(d => d.org);
}
