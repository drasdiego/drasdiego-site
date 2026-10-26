export type Lang = 'pt' | 'en';
export type Theme = 'dark' | 'light';
export type Density = 'compact' | 'regular' | 'comfy';
export type FontPair = 'Grotesk' | 'Serif' | 'Bricolage';

export type CategoryId = 'tech' | 'ia' | 'agile' | 'lideranca' | 'negocios';

/** A single professional qualification (course / certification). */
export interface Qualification {
  id: string;
  titulo: string;
  instituicao: string;
  dataEmissao: string;
  urlCertificado: string;
  descricao?: string;
  categoria: CategoryId;
  featured?: boolean;
}

export type SheetStatus = 'loading' | 'live' | 'fallback';

export interface AcademicItem {
  name: string;
  org: string;
  period: string;
  status: string;
  done: boolean;
  ic: string;
}

export interface ContactLine {
  ic: string;
  k: string;
  v: string;
  href?: string;
}

export interface Tweaks {
  accent: string;
  fontPair: FontPair;
  dark: boolean;
  density: Density;
}
