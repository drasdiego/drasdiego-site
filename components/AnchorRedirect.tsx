'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Lang } from '@/types';
import { legacyAnchorTarget } from '@/lib/site-nav';

export function AnchorRedirect({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const check = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return;
      let id = raw;
      try {
        id = decodeURIComponent(raw);
      } catch {}
      if (document.getElementById(id)) return;
      const target = legacyAnchorTarget(lang, id);
      if (!target) return;
      const [path, hash] = target.split('#');
      if (path === pathname && (!hash || hash === id)) return;
      router.replace(target);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [lang, pathname, router]);

  return null;
}
