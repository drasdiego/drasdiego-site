import type { CSSProperties } from 'react';
import { ICONS } from '@/lib/icons';

export function Icon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  const svg = ICONS[name] || '';
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-flex', ...style }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
