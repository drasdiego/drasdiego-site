import Link from 'next/link';
import type { Lang } from '@/types';
import { BLOG_UI, CATEGORIES, GUIDES, blogRoot, blogStructuredData, formatDate, guidesIn, sortGuides } from '@/lib/blog';
import type { Block, Category, Guide, Section } from '@/lib/blog';
import '@/app/blog.css';
import { CopyButton } from './CopyButton';
import { GuideCard } from './GuideCard';
import { GuideToc } from './GuideToc';

function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) return <a key={i} className="inline-link" href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Crumbs({ lang, items }: { lang: Lang; items: { name: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label={BLOG_UI[lang].crumbs}>
      <ol>
        {items.map((item, i) => (
          <li key={item.name}>
            {item.href && i < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const CALLOUT_ICON: Record<'tip' | 'warn' | 'note' | 'example', string> = {
  tip: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z',
  warn: 'M12 3 2.5 20h19L12 3ZM12 10v4.5M12 17.5v.01',
  note: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 7.5v.01',
  example: 'm8 8-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13',
};

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Blocks({ blocks, lang }: { blocks: Block[]; lang: Lang }) {
  const ui = BLOG_UI[lang];
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.k) {
          case 'p':
            return <p key={i} className={b.muted ? 'guide-muted' : undefined}><Inline text={b.v} /></p>;
          case 'h3':
            return <h3 key={i}>{b.v}</h3>;
          case 'ul':
            return <ul key={i} className="guide-list">{b.items.map((item) => <li key={item}><Inline text={item} /></li>)}</ul>;
          case 'ol':
            return <ol key={i} className="guide-list">{b.items.map((item) => <li key={item}><Inline text={item} /></li>)}</ol>;
          case 'code':
            return (
              <div key={i} className="codeblock">
                <div className="codeblock-head">
                  <span>{b.label}</span>
                  <CopyButton text={b.text} label={b.label} lang={lang} />
                </div>
                <pre><code>{b.text}</code></pre>
              </div>
            );
          case 'callout':
            return (
              <div key={i} className={`callout callout-${b.tone}`} role="note">
                <p className="callout-label"><Glyph d={CALLOUT_ICON[b.tone]} />{ui[b.tone]}</p>
                <p><Inline text={b.v} /></p>
              </div>
            );
          case 'split':
            return (
              <div key={i} className="split">
                <div className="split-col split-yes">
                  <h3><Glyph d="m5 12.5 4.5 4.5L19 7.5" />{b.yes.title}</h3>
                  <ul>{b.yes.items.map((item) => <li key={item}><span><Inline text={item} /></span></li>)}</ul>
                </div>
                <div className="split-col split-no">
                  <h3><Glyph d="M6 6l12 12M18 6 6 18" />{b.no.title}</h3>
                  <ul>{b.no.items.map((item) => <li key={item}><span><Inline text={item} /></span></li>)}</ul>
                </div>
              </div>
            );
          case 'opts':
            return (
              <dl key={i} className="opts">
                {b.items.map((item) => (
                  <div key={item.c} className="opt">
                    <dt><code>{item.c}</code></dt>
                    <dd>{item.v}</dd>
                  </div>
                ))}
              </dl>
            );
        }
      })}
    </>
  );
}

function CategoryNav({ lang, current }: { lang: Lang; current?: string }) {
  const ui = BLOG_UI[lang];
  const root = blogRoot(lang);
  return (
    <nav className="blog-cats" aria-label={ui.categoriesTitle}>
      <ul>
        <li><Link href={root} aria-current={current === undefined ? 'page' : undefined}>{ui.allGuides}</Link></li>
        {CATEGORIES.map((cat) => (
          <li key={cat.slug}>
            <Link href={`${root}/${cat.slug}`} aria-current={current === cat.slug ? 'page' : undefined}>{cat[lang].name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function GuideCards({ lang, guides }: { lang: Lang; guides: Guide[] }) {
  const ui = BLOG_UI[lang];
  return (
    <section className="blog-list" aria-labelledby="guias">
      <h2 id="guias" className="sr-only">{ui.guidesTitle}</h2>
      <ul className="guides-grid">
        {guides.map((g) => (
          <li key={`${g.category}/${g.slug}`}><GuideCard lang={lang} guide={g} /></li>
        ))}
      </ul>
    </section>
  );
}

export function BlogHomePage({ lang }: { lang: Lang }) {
  const ui = BLOG_UI[lang];
  const name = ui.blog;
  const json = blogStructuredData(lang, [{ name, sub: '' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <div className="wrap blog-page">
        <Crumbs lang={lang} items={[{ name }]} />
        <div className="blog-col">
          <h1 className="blog-title">{ui.indexTitle}</h1>
          <p className="blog-lead">{ui.indexLead}</p>
        </div>
        <CategoryNav lang={lang} />
        <GuideCards lang={lang} guides={sortGuides(GUIDES)} />
      </div>
    </>
  );
}

export function BlogCategoryPage({ lang, category }: { lang: Lang; category: Category }) {
  const ui = BLOG_UI[lang];
  const c = category[lang];
  const guides = sortGuides(guidesIn(category.slug));
  const json = blogStructuredData(lang, [{ name: ui.blog, sub: '' }, { name: c.name, sub: `/${category.slug}` }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <div className="wrap blog-page">
        <Crumbs lang={lang} items={[{ name: ui.blog, href: blogRoot(lang) }, { name: c.name }]} />
        <div className="blog-col">
          <h1 className="blog-title">{c.name}</h1>
          <p className="blog-lead">{c.desc}</p>
        </div>
        <CategoryNav lang={lang} current={category.slug} />
        <GuideCards lang={lang} guides={guides} />
      </div>
    </>
  );
}

function sectionNumber(section: Section): string | undefined {
  if (section.n === undefined) return undefined;
  const value = Number(section.n);
  return Number.isInteger(value) ? String(value + 1) : section.n;
}

export function BlogGuidePage({ lang, category, guide }: { lang: Lang; category: Category; guide: Guide }) {
  const ui = BLOG_UI[lang];
  const c = category[lang];
  const g = guide[lang];
  const json = blogStructuredData(
    lang,
    [{ name: ui.blog, sub: '' }, { name: c.name, sub: `/${category.slug}` }, { name: g.short, sub: `/${category.slug}/${guide.slug}` }],
    { headline: g.title, description: g.description, published: guide.published },
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <article className="wrap blog-page">
        <Crumbs lang={lang} items={[{ name: ui.blog, href: blogRoot(lang) }, { name: c.name, href: `${blogRoot(lang)}/${category.slug}` }, { name: g.short }]} />
        <header className="blog-col">
          <h1 className="blog-title">{g.title}</h1>
          <p className="blog-lead">{g.lead}</p>
          <ul className="blog-facts" aria-label={lang === 'en' ? 'Highlights' : 'Destaques'}>
            {g.facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <p className="blog-date">{ui.published} <time dateTime={guide.published}>{formatDate(guide.published, lang)}</time></p>
        </header>
        <div className="guide-layout">
          <GuideToc
            title={ui.toc}
            items={g.sections.map((s, idx) => ({ id: `sec-${idx}`, label: s.title, num: sectionNumber(s) ?? '•' }))}
          />
          <div className="guide">
            {g.sections.map((s, idx) => (
              <section key={s.title} className={`guide-step${s.note ? ' guide-note' : ''}`} aria-labelledby={`sec-${idx}`}>
                {s.n !== undefined && <span className="guide-num" aria-hidden="true">{sectionNumber(s)}</span>}
                <div className="guide-body">
                  <h2 id={`sec-${idx}`}>{s.title}</h2>
                  <Blocks blocks={s.blocks} lang={lang} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
