'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/types';
import { BLOG_UI } from '@/lib/blog';

export function CopyButton({ text, label, lang, idle }: { text: string; label: string; lang: Lang; idle?: string }) {
  const ui = BLOG_UI[lang];
  const [state, setState] = useState<'idle' | 'done' | 'fail'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const finish = (next: 'done' | 'fail') => {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 1800);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      finish('done');
    } catch {
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(area);
        finish(ok ? 'done' : 'fail');
      } catch {
        finish('fail');
      }
    }
  };

  const visible = state === 'done' ? ui.copied : state === 'fail' ? ui.copyFail : idle ?? ui.copy;

  return (
    <>
      <button type="button" className="copy-btn" onClick={copy} aria-label={idle ?? `${ui.copy}: ${label}`}>
        {visible}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{state === 'idle' ? '' : visible}</span>
    </>
  );
}
