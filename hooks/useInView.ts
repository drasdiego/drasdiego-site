import { useEffect, useRef, useState } from 'react';

/** Returns [ref, inView]. Flips inView true when the element enters the viewport. */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}) {
  const { once = true, threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = options || {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(el);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView] as const;
}
