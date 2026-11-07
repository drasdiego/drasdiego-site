import Link from 'next/link';
import type { Lang } from '@/types';
import { BLOG_UI, GUIDES, blogRoot, formatDate } from '@/lib/blog';
import { PRESENTATION } from '@/lib/presentation';

const LIMIT = 3;

export function RecentGuides({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  const root = blogRoot(lang);
  const guides = GUIDES.map((guide, index) => ({ guide, index }))
    .sort((a, b) => (a.guide.published < b.guide.published ? 1 : a.guide.published > b.guide.published ? -1 : a.index - b.index))
    .slice(0, LIMIT)
    .map(item => item.guide);
  if (guides.length === 0) return null;
  return (
    <section className="section recent-guides" id="guias" aria-labelledby="guides-title">
      <div className="wrap">
        <div className="guides-head">
          <div>
            <h2 className="section-title" id="guides-title">{d.blogTitle}</h2>
            <p className="section-sub">{BLOG_UI[lang].indexLead}</p>
          </div>
          <Link className="text-link" href={root}>{d.blogAll}</Link>
        </div>
        <ul className="guides-grid">
          {guides.map(guide => (
            <li key={`${guide.category}/${guide.slug}`}>
              <Link className="guide-card" href={`${root}/${guide.category}/${guide.slug}`}>
                <h3>{guide[lang].title}</h3>
                <p>{guide[lang].lead}</p>
                <span className="guide-card-date">{formatDate(guide.published, lang)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
