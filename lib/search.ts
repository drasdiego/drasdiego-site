export type SearchKind = 'page' | 'project' | 'guide';

export interface SearchEntry {
  title: string;
  href: string;
  kind: SearchKind;
  hay: string;
  label?: string;
}

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function keywordIndex(parts: string[]): string {
  const seen = new Set<string>();
  for (const word of normalizeText(parts.join(' ')).split(' ')) {
    if (word.length > 1) seen.add(word);
  }
  return Array.from(seen).join(' ');
}

export function matchEntries<T extends { title: string; hay: string; label?: string }>(items: T[], query: string): T[] {
  const tokens = normalizeText(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return [];
  const scored: { item: T; score: number; index: number }[] = [];
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const title = normalizeText(item.title);
    const label = item.label ? normalizeText(item.label) : '';
    let score = 0;
    let all = true;
    for (const token of tokens) {
      if (title.includes(token)) score += 3;
      else if (label.includes(token)) score += 2;
      else if (item.hay.includes(token)) score += 1;
      else {
        all = false;
        break;
      }
    }
    if (all) scored.push({ item, score, index });
  }
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.map((entry) => entry.item);
}
