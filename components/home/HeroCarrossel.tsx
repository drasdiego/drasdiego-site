'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Lang } from '@/types';

export interface HeroSlide {
  slug: string;
  href: string;
  src: string;
  width: number;
  height: number;
  title: string;
  label: string;
}

const UI = {
  pt: {
    grupo: 'Capas dos projetos',
    papel: 'carrossel',
    anterior: 'Capa anterior',
    proximo: 'Próxima capa',
    ir: (titulo: string) => `Ver a capa de ${titulo}`,
  },
  en: {
    grupo: 'Project covers',
    papel: 'carousel',
    anterior: 'Previous cover',
    proximo: 'Next cover',
    ir: (titulo: string) => `Show the ${titulo} cover`,
  },
} as const;

const INTERVALO = 6000;

export function HeroCarrossel({ lang, slides }: { lang: Lang; slides: HeroSlide[] }) {
  const u = UI[lang];
  const total = slides.length;
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [travado, setTravado] = useState(false);
  const [reduzMovimento, setReduzMovimento] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aplicar = () => setReduzMovimento(consulta.matches);
    aplicar();
    consulta.addEventListener('change', aplicar);
    return () => consulta.removeEventListener('change', aplicar);
  }, []);

  useEffect(() => {
    if (total < 2 || pausado || travado || reduzMovimento) return;
    const id = window.setInterval(() => setAtual((i) => (i + 1) % total), INTERVALO);
    return () => window.clearInterval(id);
  }, [total, pausado, travado, reduzMovimento]);

  const mover = useCallback((passo: number) => {
    setTravado(true);
    setAtual((i) => (i + passo + total) % total);
  }, [total]);

  const escolher = useCallback((indice: number) => {
    setTravado(true);
    setAtual(indice);
  }, []);

  return (
    <div
      className="hero-carrossel"
      role="group"
      aria-roledescription={u.papel}
      aria-label={u.grupo}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div className="hero-palco">
        {slides.map((slide, i) => (
          <Link
            key={slide.slug}
            className="hero-capa"
            href={slide.href}
            aria-label={slide.label}
            aria-hidden={i === atual ? undefined : true}
            tabIndex={i === atual ? undefined : -1}
            data-ativa={i === atual ? 'sim' : 'nao'}
          >
            <Image src={slide.src} width={slide.width} height={slide.height} alt="" priority={i === 0} unoptimized />
          </Link>
        ))}
      </div>
      <div className="hero-controles">
        <button type="button" className="hero-seta" onClick={() => mover(-1)} aria-label={u.anterior}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <div className="hero-pontos">
          {slides.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              className="hero-ponto"
              onClick={() => escolher(i)}
              aria-label={u.ir(slide.title)}
              aria-current={i === atual ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" className="hero-seta" onClick={() => mover(1)} aria-label={u.proximo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
