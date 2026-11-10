import Link from 'next/link';
import type { Lang } from '@/types';
import { blogRoot, findCategory, formatDate } from '@/lib/blog';
import type { Guide } from '@/lib/blog';
import '@/app/blog.css';

export function GuideCard({ lang, guide }: { lang: Lang; guide: Guide }) {
  const category = findCategory(guide.category);
  return (
    <Link className="guide-card" href={`${blogRoot(lang)}/${guide.category}/${guide.slug}`}>
      {category && <span className="guide-card-tag" data-area={category.area}>{category[lang].name}</span>}
      <h3>{guide[lang].title}</h3>
      <p>{guide[lang].lead}</p>
      <time className="guide-card-date" dateTime={guide.published}>{formatDate(guide.published, lang)}</time>
    </Link>
  );
}
