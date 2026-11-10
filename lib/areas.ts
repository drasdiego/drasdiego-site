export type Area = 'ia' | 'dados' | 'software' | 'automacao';

const TAG_AREA: Record<string, Area> = {
  'Claude API': 'ia',
  Dados: 'dados',
  Data: 'dados',
  IBGE: 'dados',
  'Visualização de dados': 'dados',
  'Data visualization': 'dados',
  Python: 'dados',
  'Next.js': 'software',
  TypeScript: 'software',
  JavaScript: 'software',
  HTML: 'software',
  CSS: 'software',
};

export function tagArea(tag: string): Area | undefined {
  return TAG_AREA[tag];
}
