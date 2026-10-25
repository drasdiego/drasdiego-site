'use client';

import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

export function CountUp({
  to,
  suffix = '',
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val}
      <span className="suf">{suffix}</span>
    </span>
  );
}
