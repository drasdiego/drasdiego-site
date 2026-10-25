import { ImageResponse } from 'next/og';

export const alt = 'Diego Arruda. Desenvolvimento de software com visão de operação.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#101214', color: '#f2f0eb', padding: '68px 76px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 30 }}>Diego Arruda</div>
      <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.12, letterSpacing: '-2px', maxWidth: 950 }}>Desenvolvimento de software com visão de operação.</div>
      <div style={{ display: 'flex', fontSize: 24, color: '#b6a4ff' }}>www.drasdiego.com.br</div>
    </div>,
    size,
  );
}
