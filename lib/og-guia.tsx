import { ImageResponse } from 'next/og';
import type { Lang } from '@/types';
import { findCategory, findGuide } from './blog';

export const GUIDE_OG_SIZE = { width: 1200, height: 630 };

const AREA_COLOR: Record<string, string> = {
  ia: '#b3a0ff',
  dados: '#5ed3c3',
  software: '#f2c76e',
  automacao: '#ff9f8a',
};

export function guideOgImage(lang: Lang, category: string, slug: string): ImageResponse {
  const cat = findCategory(category);
  const guide = findGuide(category, slug);
  const title = guide ? guide[lang].title : 'Diego Arruda';
  const label = cat ? `${lang === 'en' ? 'Guides' : 'Guias'} / ${cat[lang].name}` : lang === 'en' ? 'Guides' : 'Guias';
  const color = (cat && AREA_COLOR[cat.area]) || '#b3a0ff';
  const fontSize = title.length > 60 ? 54 : title.length > 40 ? 62 : 70;
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#0b0a1f', color: '#f4f2ff', padding: '68px 76px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#cbc8e8' }}>
        <div style={{ display: 'flex', width: 18, height: 18, borderRadius: 9, background: color, marginRight: 16 }} />
        {label}
      </div>
      <div style={{ display: 'flex', fontSize, lineHeight: 1.12, letterSpacing: '-2px', maxWidth: 1000 }}>{title}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24 }}>
        <div style={{ display: 'flex', color: '#f4f2ff' }}>Diego Arruda</div>
        <div style={{ display: 'flex', color }}>www.drasdiego.com.br</div>
      </div>
    </div>,
    GUIDE_OG_SIZE,
  );
}
