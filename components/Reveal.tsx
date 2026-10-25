'use client';

import { createElement } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

export function Reveal({
  children,
  className = '',
  as,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: ElementType;
  style?: CSSProperties;
}) {
  return createElement(as || 'div', { className, style }, children);
}
