import { useCallback, useEffect, useState } from 'react';
import type { Tweaks } from '@/types';

export const DEFAULT_TWEAKS: Tweaks = {
  accent: '#7b5cff',
  fontPair: 'Grotesk',
  dark: false,
  density: 'regular',
};

export const THEME_KEY = 'diego_theme';

export function useTweaks() {
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULT_TWEAKS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(THEME_KEY) === 'dark') setTweaks((t) => ({ ...t, dark: true }));
    } catch {}
    setHydrated(true);
  }, []);

  const set = useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    if (key === 'dark') {
      try {
        sessionStorage.setItem(THEME_KEY, value ? 'dark' : 'light');
      } catch {}
    }
    setTweaks((t) => ({ ...t, [key]: value }));
  }, []);

  return { tweaks, set, hydrated };
}
