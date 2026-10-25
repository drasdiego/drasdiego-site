'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Qualification } from '@/types';

const QualificationsContext = createContext<Qualification[] | null>(null);

export function QualificationsProvider({ initial, children }: { initial: Qualification[]; children: ReactNode }) {
  return <QualificationsContext.Provider value={initial}>{children}</QualificationsContext.Provider>;
}

export function useInitialQualifications(): Qualification[] | null {
  return useContext(QualificationsContext);
}
