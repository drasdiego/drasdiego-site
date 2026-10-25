import type { CategoryId, Qualification } from '@/types';

/* ============================================================
   GOOGLE SHEETS SERVICE
   The "Qualificações Profissionais" section is fed live from a
   public Google Sheet via the gviz JSON export. New / edited /
   removed rows are reflected automatically on the next page load.
   No rebuild, no redeploy.

   Sheet columns (header names matched tolerantly; positional fallback):
     Curso | Instituição | Data de emissão | Link [ | Categoria | Descrição ]
   ============================================================ */

export const SHEET_ID = '1e0Ly1xwVEOk4mZAD9YE1gjWRBHKkFVKSUW_JcE1tAV4';
export const SHEET_GID = '0';

export interface QualCategory { id: CategoryId; ic: string }

/* Canonical categories (display labels come from content.quals.catNames) */
export const QUAL_CATS: QualCategory[] = [
  { id: 'tech', ic: 'db' },
  { id: 'ia', ic: 'brain' },
  { id: 'agile', ic: 'flow' },
  { id: 'lideranca', ic: 'spark' },
  { id: 'negocios', ic: 'target' },
];

/* The sheet has no category column, so we infer one from title + institution
   using accent-insensitive, word-boundary keyword matching. */
const CAT_SYNONYMS: Record<CategoryId, string[]> = {
  tech: ['sql', 'postgresql', 'python', 'pandas', 'numpy', 'power bi', 'powerbi', 'dados', 'data', 'data science', 'banco de dados', 'bancos de dados', 'modelagem', 'git', 'github', 'javascript', 'html', 'css', 'programacao', 'algoritmos', 'logica de programacao', 'excel', 'metabase', 'looker', 'kibana', 'engenharia de software', 'desenvolvimento de software', 'tecnologia', 'computacao'],
  ia: ['ia', 'ai', 'inteligencia artificial', 'analytics', 'machine learning', 'estatistica', 'gemini', 'cultura de dados', 'generativa', 'ciencia de dados'],
  agile: ['agil', 'ageis', 'agile', 'agilidade', 'scrum', 'backlog', 'kanban', 'product owner', 'scrum master', 'produto', 'product', 'metodologias ageis'],
  lideranca: ['lideranca', 'lider', 'liderar', 'comunicacao', 'oratoria', 'feedback', 'inteligencia emocional', 'emocional', 'diversidade', 'inclusao', 'pertencimento', 'escuta', 'resiliencia', 'motivacao', 'pessoas', 'equipe', 'equipes', 'influencia', 'conversas', 'performance', 'proposito', 'criativa', 'criativos', 'campeoes'],
  negocios: ['negocio', 'negocios', 'operacao', 'operacoes', 'operacional', 'qualidade', 'excelencia', 'processo', 'processos', 'ouvidoria', 'custos', 'mercado', 'mercadologica', 'empreendedora', 'lgpd', 'marketing', 'gestao', 'responsabilidade', 'cidadania', 'social', 'etica', 'compliance', 'lean', 'pop', 'projetos', 'comercial'],
};

const stripAccents = (s: string): string =>
  String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function categorize(raw: string): CategoryId {
  if (!raw) return 'negocios';
  const s = stripAccents(raw).trim();
  for (const c of QUAL_CATS) if (s === c.id) return c.id;
  let best: CategoryId | null = null;
  let bestScore = 0;
  (Object.entries(CAT_SYNONYMS) as [CategoryId, string[]][]).forEach(([id, words]) => {
    let score = 0;
    for (const w of words) {
      if (new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(s)) score += w.length;
    }
    if (score > bestScore) { bestScore = score; best = id; }
  });
  return best ?? 'negocios';
}

/* ---- gviz JSON parsing with tolerant column mapping ---- */
type FieldKey = 'titulo' | 'instituicao' | 'dataEmissao' | 'urlCertificado' | 'categoria' | 'descricao';

const FIELD_SYNONYMS: Record<FieldKey, string[]> = {
  titulo: ['titulo', 'título', 'curso', 'nome', 'formação', 'formacao', 'certificação', 'certificacao', 'title', 'name', 'qualificação', 'qualificacao'],
  instituicao: ['instituição', 'instituicao', 'institution', 'escola', 'emissor', 'organização', 'organizacao', 'empresa', 'plataforma', 'provider', 'org', 'fonte'],
  dataEmissao: ['data de conclusão', 'data de conclusao', 'conclusão', 'conclusao', 'concluído', 'concluido', 'data de emissão', 'data de emissao', 'emissão', 'emissao', 'data', 'dataemissao', 'ano', 'year', 'date', 'issued', 'completion', 'completed', 'validade', 'período', 'periodo', 'finalização', 'finalizacao'],
  urlCertificado: ['url', 'link', 'certificado', 'urlcertificado', 'url certificado', 'credential', 'comprovante', 'verificação', 'verificacao'],
  categoria: ['categoria', 'category', 'área', 'area', 'tipo', 'classificação', 'classificacao', 'tema'],
  descricao: ['descrição', 'descricao', 'description', 'detalhes', 'sobre', 'resumo', 'observação', 'observacao', 'notas', 'about'],
};

interface GVizCol { id?: string; label?: string; type?: string }
interface GVizCell { v: string | number | boolean | null; f?: string }
interface GVizRow { c: (GVizCell | null)[] }
interface GVizTable { cols: GVizCol[]; rows: GVizRow[] }
interface GVizResponse { table: GVizTable }

type ColMap = Partial<Record<FieldKey, number>>;

function buildColMap(cols: GVizCol[]): ColMap {
  const map: ColMap = {};
  const labels = cols.map((c) => (c.label || '').toString().toLowerCase().trim());
  const hasHeaders = labels.some((l) => l.length > 0);
  if (hasHeaders) {
    (Object.entries(FIELD_SYNONYMS) as [FieldKey, string[]][]).forEach(([field, syns]) => {
      let idx = labels.findIndex((l) => syns.includes(l));
      if (idx === -1) idx = labels.findIndex((l) => l !== '' && syns.some((s) => l.includes(s)));
      if (idx !== -1) map[field] = idx;
    });
  }
  const order: FieldKey[] = ['titulo', 'instituicao', 'dataEmissao', 'urlCertificado', 'categoria'];
  order.forEach((field, i) => { if (map[field] == null && cols[i]) map[field] = i; });
  return map;
}

function cellVal(c: GVizCell | null | undefined): string {
  if (!c) return '';
  if (c.f != null && c.f !== '') return String(c.f).trim();
  if (c.v == null) return '';
  if (typeof c.v === 'string' && /^Date\(/.test(c.v)) {
    const m = c.v.match(/Date\((\d+),(\d+),(\d+)/);
    if (m) return `${m[3]}/${parseInt(m[2], 10) + 1}/${m[1]}`;
  }
  return String(c.v).trim();
}

/* Normalize a free-text date to just the issue/completion YEAR.
   "Emitida em ago de 2024" → 2024, "Concluído em outubro de 2025" → 2025,
   "15/01/2026" → 2026, "Emitido em out de 2024 · Expira em out de 2027" → 2024. */
export function normalizeDate(raw: string | null | undefined): string {
  if (raw == null) return '';
  let s = String(raw).trim();
  if (!s) return '';
  s = s.replace(/[·•|–-]?\s*(expira\w*|expires?|v[áa]lid\w*|expira[çc][ãa]o)\b[\s\S]*$/i, '');
  const ym = s.match(/\b(19|20)\d{2}\b/);
  if (ym) return ym[0];
  return String(raw).trim();
}

const HEADER_TITLES = ['curso', 'título', 'titulo', 'course', 'formação', 'formacao', 'nome', 'qualificação', 'qualificacao'];
const HEADER_INST = ['instituição', 'instituicao', 'institution', 'escola', 'emissor', 'organização', 'organizacao'];

/* Academic degrees live in the highlighted block; exclude from the
   professional list to avoid duplication. */
export function isAcademicDegree(titulo: string): boolean {
  return /\b(mba|p[óo]s[\s-]?gradua\w*|bacharel\w*|licenciatura|tecn[óo]logo|curso superior de tecnologia|gradua[çc][ãa]o|mestrado|doutorado)\b/i.test(titulo || '');
}

const MAX_URL_CHARS = 2048;

export function safeCertificateUrl(raw: string | null | undefined): string {
  const value = String(raw ?? '').trim();
  if (!value || value.length > MAX_URL_CHARS) return '';
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    if (url.username || url.password) return '';
    return url.href;
  } catch {
    return '';
  }
}

export function parseGviz(text: string): Qualification[] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('invalid gviz payload');
  const json = JSON.parse(text.slice(start, end + 1)) as GVizResponse;
  const cols = json.table?.cols ?? [];
  const rows = json.table?.rows ?? [];
  const map = buildColMap(cols);
  const out: Qualification[] = [];
  rows.forEach((r, i) => {
    const c = r.c || [];
    const titulo = cellVal(map.titulo != null ? c[map.titulo] : null);
    if (!titulo) return;
    const inst = cellVal(map.instituicao != null ? c[map.instituicao] : null);
    if (HEADER_TITLES.includes(titulo.toLowerCase().trim()) && HEADER_INST.includes(inst.toLowerCase().trim())) return;
    out.push({
      id: 'sheet-' + i,
      titulo,
      instituicao: inst,
      dataEmissao: normalizeDate(cellVal(map.dataEmissao != null ? c[map.dataEmissao] : null)),
      urlCertificado: safeCertificateUrl(cellVal(map.urlCertificado != null ? c[map.urlCertificado] : null)),
      descricao: map.descricao != null ? cellVal(c[map.descricao]) : '',
      categoria: categorize(cellVal(map.categoria != null ? c[map.categoria] : null) || titulo + ' ' + inst),
    });
  });
  return out;
}

/* ---- Local fallback (real courses; used only if the sheet is unreachable) ---- */
type SeedTuple = [string, string, string?, string?, boolean?, string?];
function mk(arr: SeedTuple[], cat: CategoryId): Qualification[] {
  return arr.map((a, i) => ({
    id: `${cat}-${i}`,
    titulo: a[0],
    instituicao: a[1],
    dataEmissao: a[2] || '',
    urlCertificado: a[3] || '',
    featured: !!a[4],
    descricao: a[5] || '',
    categoria: cat,
  }));
}

export const QUAL_SEED: Qualification[] = [
  ...mk([
    ['Análise de Dados como Suporte à Tomada de Decisão', 'ENAP', '2026'],
    ['Aprendendo com Python', 'ENAP', '2026'],
    ['Python para Data Science', 'Alura', '2025'],
    ['Python para Data Science: primeiros passos', 'Alura', '2025'],
    ['Python: funções, estruturas de dados e exceções', 'Alura', '2025'],
    ['Pandas: conhecendo a biblioteca', 'Alura', '2025'],
    ['NumPy: análise numérica eficiente com Python', 'Alura', '2025'],
    ['PostgreSQL', 'Alura', '2024'],
    ['PostgreSQL: Views, Subconsultas e Funções', 'Alura', '2025'],
    ['Modelagem de Banco de Dados: entidades e relacionamentos', 'Alura', '2024'],
    ['Modelagem de Banco de Dados Relacional', 'Alura', '2024'],
    ['Power BI Desktop: construindo dashboards', 'Alura', '2024'],
    ['Power BI Desktop: tratamento no Power Query', 'Alura', '2024'],
    ['Git e GitHub: compartilhando e colaborando', 'Alura', '2025'],
    ['Lógica de Programação com JavaScript', 'Alura', '2025'],
    ['JavaScript e HTML', 'Alura', '2025'],
    ['SQL: linguagem de bancos de dados', 'Escola Conquer', '2024'],
    ['Metabase', 'Udemy', '2024'],
    ['Lógica de Programação e Algoritmos', 'Udemy', '2023'],
    ['Lógica de Programação', 'Wise Hands', '2023'],
  ], 'tech'),
  ...mk([
    ['Imersão Dev com Google Gemini', 'Alura', '2025'],
    ['Análise e Cultura de Dados', 'Udemy', '2024'],
    ['Introdução à Estatística', 'Wise Hands', '2023'],
    ['Pensamento Estratégico', 'LinkedIn Learning', '2023'],
    ['Agilidade de Aprendizagem', 'LinkedIn Learning', '2023'],
  ], 'ia'),
  ...mk([
    ['Scrum Foundation Professional Certification (SFPC)', 'CertiProf', '2024', '', true, 'Certificação internacional em fundamentos de Scrum e metodologias ágeis para gestão de produtos e entrega contínua de valor. Validade 2024 a 2027.'],
    ['Construção de Backlog', 'Noble Work Foundation', '2023'],
    ['Papéis de Product Owner e Scrum Master', 'Noble Work Foundation', '2023'],
    ['Metodologias Ágeis', 'Noble Work Foundation', '2023'],
    ['Metodologias Ágeis e Introdução à Estatística', 'Wise Hands', '2023'],
  ], 'agile'),
  ...mk([
    ['Introdução à Liderança Lean', 'Fundação Bradesco', '2023', '', true, 'Princípios de liderança Lean com foco em eliminação de desperdícios, melhoria contínua e gestão eficiente de equipes e processos.'],
    ['Produtividade, Gestão do Tempo e Propósito', 'PUCRS', '2022'],
    ['Liderança Saudável', 'PUCRS', '2022'],
    ['Liderança, Capacidade de Aprender e Resiliência', 'PUCRS', '2022'],
    ['Liderança de Times de Alta Performance', 'Sebrae', '2022'],
    ['Liderança na Gestão de Equipes', 'Sebrae', '2022'],
    ['Comunicação e Oratória', 'Escola Conquer', '2022'],
    ['Inteligência Emocional', 'Escola Conquer', '2022'],
    ['Formando Campeões: Liderança', 'Escola Conquer', '2022'],
    ['Gestores do Amanhã', 'Insider Class', '2023'],
    ['Comunicação na Liderança', 'LinkedIn Learning', '2022'],
    ['Diversidade e Inclusão em Empresas Globais', 'LinkedIn Learning', '2022'],
    ['Escuta Ativa', 'LinkedIn Learning', '2021'],
    ['Feedback e Conversas Difíceis', 'LinkedIn Learning', '2021'],
    ['Resiliência na Liderança', 'LinkedIn Learning', '2022'],
    ['Gestão de Performance', 'LinkedIn Learning', '2022'],
  ], 'lideranca'),
  ...mk([
    ['Certificação em Ouvidoria', 'ABBC', '2025', '', true, 'Certificação profissional em Ouvidoria pela Associação Brasileira de Bancos, voltada à gestão de manifestações, mediação de conflitos e relação com o consumidor. Validade 2025 a 2029.'],
    ['Fundamentos da Gestão da Qualidade', 'FM2S', '2021'],
    ['Fundamentos da Excelência Operacional', 'FM2S', '2021'],
    ['Metodologias para Excelência Operacional', 'FM2S', '2021'],
    ['Elaboração de POP', 'FM2S', '2021'],
    ['Gestão Empreendedora e Mercadológica', 'Estácio', '2024'],
    ['Modelagem de Processos e Projetos', 'Estácio', '2024'],
    ['Gestão de Custos', 'Estácio', '2024'],
    ['LGPD nas Empresas', 'LinkedIn Learning', '2022'],
    ['Google Guides', 'MyMovit', '2020'],
    ['RD Station Marketing Basic', 'RD Station', '2024'],
  ], 'negocios'),
];

/* Fetch + parse the live sheet. Cache-busted so edits show up without a redeploy. */
export async function fetchQualifications(signal?: AbortSignal): Promise<Qualification[]> {
  const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&gid=${SHEET_GID}`;
  const url = `${base}&_=${Date.now()}`;
  const res = await fetch(url, { signal, cache: 'no-store' });
  if (!res.ok) throw new Error(`sheet request failed: ${res.status}`);
  const text = await res.text();
  return parseGviz(text);
}
