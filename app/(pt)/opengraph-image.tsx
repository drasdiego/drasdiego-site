import { ImageResponse } from 'next/og';

export const alt = 'Diego Arruda. Dados e IA para operações reais.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#0b0a1f', color: '#f4f2ff', padding: '68px 76px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 30 }}>Diego Arruda</div>
      <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.12, letterSpacing: '-2px', maxWidth: 950 }}>Dados e IA para operações reais.</div>
      <div style={{ display: 'flex', fontSize: 24, color: '#b3a0ff' }}>www.drasdiego.com.br</div>
    </div>,
    size,
  );
}
