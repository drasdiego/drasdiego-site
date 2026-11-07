import Link from 'next/link';
import type { Lang } from '@/types';
import '../app/paginas.css';
import '../app/blog.css';
import { BLOG_UI } from '@/lib/blog';
import { PROJETOS, PROJETOS_INTRO, projetoStructuredData } from '@/lib/projetos';
import type { Projeto, ProjetoBlock, ProjetoFact, ProjetoSection } from '@/lib/projetos';
import { NAV_UI, projetosPath } from '@/lib/site-nav';
import { TryAssistant } from './projetos/TryAssistant';

export function ProjetosIndex({ lang }: { lang: Lang }) {
  const root = projetosPath(lang);
  return (
    <>
      <div className="wrap blog-page">
        <div className="blog-col">
          <h1 className="blog-title">{NAV_UI[lang].projetos}</h1>
          <p className="blog-lead">{PROJETOS_INTRO[lang]}</p>
        </div>
        <ul className="projeto-grid" aria-label={NAV_UI[lang].projetos}>
          {PROJETOS.map((p) => {
            const t = p[lang];
            return (
              <li key={p.slug} className="projeto-card">
                <h2><Link className="projeto-card-link" href={`${root}/${p.slug}`}>{t.title}</Link></h2>
                <p>{t.short}</p>
                <ul className="projeto-tags" aria-label={lang === 'en' ? 'Technologies' : 'Tecnologias'}>
                  {t.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="projeto-card-foot">
                  <span className="projeto-status">{t.status}</span>
                  <span className="projeto-card-cta" aria-hidden="true">{t.cta}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function Fact({ fact }: { fact: ProjetoFact }) {
  return (
    <div className="caso-fact">
      <dt>{fact.label}</dt>
      <dd>
        {fact.chips ? (
          <ul className="projeto-tags">{fact.chips.map((c) => <li key={c}>{c}</li>)}</ul>
        ) : fact.href ? (
          <a className="text-link" href={fact.href} target="_blank" rel="noreferrer">{fact.value}</a>
        ) : (
          fact.value
        )}
      </dd>
    </div>
  );
}

function Block({ block }: { block: ProjetoBlock }) {
  switch (block.k) {
    case 'p':
      return <p>{block.v}</p>;
    case 'steps':
      return (
        <ol className="caso-passos">
          {block.items.map((item, i) => (
            <li key={item.title}>
              <span className="guide-num" aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'decisions':
      return (
        <ol className="caso-decisoes">
          {block.items.map((item, i) => (
            <li key={item.title}>
              <span className="guide-num" aria-hidden="true">{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      );
  }
}

function Section({ section }: { section: ProjetoSection }) {
  const titleId = `${section.id}-titulo`;
  return (
    <section className="caso-sec" id={section.id} aria-labelledby={titleId}>
      <h2 id={titleId}>{section.title}</h2>
      {section.blocks.map((b, i) => <Block key={i} block={b} />)}
    </section>
  );
}

export function ProjetoDetalhe({ lang, projeto }: { lang: Lang; projeto: Projeto }) {
  const p = projeto[lang];
  const root = projetosPath(lang);
  const rootName = NAV_UI[lang].projetos;
  const json = projetoStructuredData(lang, projeto, rootName);
  const tryIt = p.tryIt;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <article className="wrap blog-page caso">
        <nav className="crumbs" aria-label={BLOG_UI[lang].crumbs}>
          <ol>
            <li><Link href={root}>{rootName}</Link></li>
            <li><span aria-current="page">{p.title}</span></li>
          </ol>
        </nav>
        <header className="blog-col">
          <h1 className="blog-title">{p.title}</h1>
          <p className="blog-lead">{p.lead}</p>
        </header>
        <dl className="caso-ficha">
          {p.facts.map((f) => <Fact key={f.label} fact={f} />)}
        </dl>
        <div className="caso-corpo">
          {p.sections.map((s) => <Section key={s.id} section={s} />)}
          {tryIt ? (
            <section className="caso-sec" id={tryIt.id} aria-labelledby={`${tryIt.id}-titulo`}>
              <h2 id={`${tryIt.id}-titulo`}>{tryIt.title}</h2>
              <TryAssistant data={tryIt} />
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
