import Link from 'next/link';
import type { Lang } from '@/types';
import { BLOG_UI, GUIDES, blogRoot, sortGuides } from '@/lib/blog';
import { PRESENTATION } from '@/lib/presentation';
import { GuideCard } from '../GuideCard';

const LIMIT = 3;

export function RecentGuides({ lang }: { lang: Lang }) {
  const d = PRESENTATION[lang];
  const root = blogRoot(lang);
  const guides = sortGuides(GUIDES).slice(0, LIMIT);
  if (guides.length === 0) return null;
  return (
    <section className="section recent-guides" id="guias" aria-labelledby="guides-title">
      <div className="wrap">
        <div className="section-headline">
          <div>
            <h2 className="section-title" id="guides-title">{d.blogTitle}</h2>
            <p className="section-sub">{BLOG_UI[lang].indexLead}</p>
          </div>
          <Link className="text-link" href={root}>{d.blogAll}</Link>
        </div>
        <ul className="guides-grid">
          {guides.map(guide => (
            <li key={`${guide.category}/${guide.slug}`}><GuideCard lang={lang} guide={guide} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
