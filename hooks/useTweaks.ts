import { useCallback, useEffect, useState } from 'react';
import type { Tweaks } from '@/types';

export const DEFAULT_TWEAKS: Tweaks = {
  accent: '#7b5cff',
  fontPair: 'Grotesk',
  dark: false,
  density: 'regular',
};

export function useTweaks() {
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULT_TWEAKS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const set = useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((t) => ({ ...t, [key]: value }));
  }, []);

  return { tweaks, set, hydrated };
}
