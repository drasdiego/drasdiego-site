import type { Lang } from '@/types';

type YearMonth = readonly [number, number];

interface Role {
  key: 'nubank' | 'rd' | 'isaac' | 'mm';
  company: string;
  title: Record<Lang, string>;
  start: YearMonth;
  end: YearMonth | null;
}

const TIME_ZONE = 'America/Sao_Paulo';

const ROLES: Role[] = [
  { key: 'nubank', company: 'Nubank', title: { pt: 'Analista de Ouvidoria', en: 'Ombudsman Analyst' }, start: [2024, 12], end: null },
  { key: 'rd', company: 'RD Station', title: { pt: 'Analista de Suporte Financeiro', en: 'Financial Support Analyst' }, start: [2024, 2], end: [2024, 12] },
  { key: 'isaac', company: 'isaac', title: { pt: 'Analista de Operações (temporário)', en: 'Operations Analyst (temporary)' }, start: [2023, 7], end: [2024, 2] },
  { key: 'mm', company: 'MadeiraMadeira', title: { pt: 'Supervisor de Operações', en: 'Operations Supervisor' }, start: [2020, 6], end: [2022, 10] },
];

const MONTHS: Record<Lang, string[]> = {
  pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export function zonedDate(now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: pick('year'), month: pick('month'), day: pick('day') };
}

function monthsInclusive(start: YearMonth, end: YearMonth): number {
  return (end[0] - start[0]) * 12 + (end[1] - start[1]) + 1;
}

export function formatSpan(totalMonths: number, lang: Lang): string {
  const months = Math.max(1, totalMonths);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const pt = lang === 'pt';
  const yearText = years === 0 ? '' : pt ? `${years} ${years === 1 ? 'ano' : 'anos'}` : `${years} ${years === 1 ? 'year' : 'years'}`;
  const monthText = rest === 0 ? '' : pt ? `${rest} ${rest === 1 ? 'mês' : 'meses'}` : `${rest} ${rest === 1 ? 'month' : 'months'}`;
  if (yearText && monthText) return `${yearText} ${pt ? 'e' : 'and'} ${monthText}`;
  return yearText || monthText;
}

export function roleSpans(now: Date, lang: Lang): Record<Role['key'], string> {
  const today = zonedDate(now);
  const current: YearMonth = [today.year, today.month];
  const result = {} as Record<Role['key'], string>;
  for (const role of ROLES) {
    result[role.key] = formatSpan(monthsInclusive(role.start, role.end ?? current), lang);
  }
  return result;
}

export function dateLabel(now: Date, lang: Lang): string {
  const { year, month, day } = zonedDate(now);
  return lang === 'pt'
    ? `${day} de ${MONTHS.pt[month - 1]} de ${year}`
    : `${MONTHS.en[month - 1]} ${day}, ${year}`;
}

export function careerTimeBlock(now: Date, lang: Lang): string {
  const spans = roleSpans(now, lang);
  const pt = lang === 'pt';
  const lines = ROLES.map((role) => {
    const start = `${MONTHS[lang][role.start[1] - 1]} ${role.start[0]}`;
    const period = role.end
      ? `${start} ${pt ? 'a' : 'to'} ${MONTHS[lang][role.end[1] - 1]} ${role.end[0]}`
      : `${start} ${pt ? 'até hoje' : 'to today'}`;
    return `- ${role.company}, ${role.title[lang]}: ${period}, ${spans[role.key]}.`;
  });
  return pt
    ? [
        `DATA ATUAL: ${dateLabel(now, lang)} (fuso America/Sao_Paulo).`,
        'TEMPO DE ATUAÇÃO JÁ CALCULADO (a contagem inclui o mês de início, como no LinkedIn):',
        ...lines,
        'Para perguntas sobre tempo de atuação, use exatamente estes valores e não refaça contas. Para qualquer outra referência a "hoje", "agora" ou "atualmente", use a data atual informada acima.',
      ].join('\n')
    : [
        `CURRENT DATE: ${dateLabel(now, lang)} (America/Sao_Paulo time zone).`,
        'TIME IN EACH ROLE, ALREADY CALCULATED (the count includes the start month, as on LinkedIn):',
        ...lines,
        'For questions about time in a role, use exactly these values and do not recalculate. For any other reference to "today", "now" or "currently", use the current date given above.',
      ].join('\n');
}

export function fillCareerTime(text: string, now: Date, lang: Lang): string {
  const spans = roleSpans(now, lang);
  return text
    .replace('{nubank}', spans.nubank)
    .replace('{rd}', spans.rd)
    .replace('{isaac}', spans.isaac)
    .replace('{mm}', spans.mm);
}
