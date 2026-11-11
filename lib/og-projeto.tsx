import { ImageResponse } from 'next/og';
import type { Lang } from '@/types';
import { tagArea } from './areas';
import { findProjeto } from './projetos';

export const PROJECT_OG_SIZE = { width: 1200, height: 630 };

const AREA_COLOR: Record<string, string> = {
  ia: '#b3a0ff',
  dados: '#5ed3c3',
  software: '#f2c76e',
  automacao: '#ff9f8a',
};

export function projetoOgAlt(lang: Lang, slug: string): string {
  const projeto = findProjeto(slug);
  if (!projeto) return lang === 'en' ? 'A project by Diego Arruda.' : 'Um projeto de Diego Arruda.';
  return lang === 'en' ? `Project by Diego Arruda: ${projeto.en.title}` : `Projeto de Diego Arruda: ${projeto.pt.title}`;
}

export function projetoOgImage(lang: Lang, slug: string): ImageResponse {
  const projeto = findProjeto(slug);
  const text = projeto ? projeto[lang] : null;
  const title = text ? text.title : 'Diego Arruda';
  const label = lang === 'en' ? 'Projects' : 'Projetos';
  const area = text ? text.tags.map(tagArea).find(Boolean) : undefined;
  const color = (area && AREA_COLOR[area]) || '#b3a0ff';
  const fontSize = title.length > 60 ? 54 : title.length > 40 ? 62 : 70;
  const summary = text ? text.short : '';
  const line = summary.length > 150 ? `${summary.slice(0, 147).trimEnd()}...` : summary;
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#0b0a1f', color: '#f4f2ff', padding: '68px 76px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#cbc8e8' }}>
        <div style={{ display: 'flex', width: 18, height: 18, borderRadius: 9, background: color, marginRight: 16 }} />
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize, lineHeight: 1.12, letterSpacing: '-2px', maxWidth: 1000 }}>{title}</div>
        {line ? <div style={{ display: 'flex', marginTop: 24, fontSize: 28, lineHeight: 1.4, color: '#cbc8e8', maxWidth: 980 }}>{line}</div> : null}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24 }}>
        <div style={{ display: 'flex', color: '#f4f2ff' }}>Diego Arruda</div>
        <div style={{ display: 'flex', color }}>www.drasdiego.com.br</div>
      </div>
    </div>,
    PROJECT_OG_SIZE,
  );
}
