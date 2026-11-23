import type { Lang } from '@/types';
import { BLOG_UI, blogRoot, findCategory, formatDate } from '@/lib/blog';
import type { Guide } from '@/lib/blog';
import { GuideCardView } from './GuideCardView';
import '@/app/blog.css';

export function GuideCard({ lang, guide }: { lang: Lang; guide: Guide }) {
  const category = findCategory(guide.category);
  return (
    <GuideCardView
      card={{
        href: `${blogRoot(lang)}/${guide.category}/${guide.slug}`,
        tag: category ? category[lang].name : '',
        area: category ? category.area : '',
        title: guide[lang].title,
        lead: guide[lang].lead,
        date: guide.published,
        dateLabel: formatDate(guide.published, lang),
        keyword: guide.keyword,
        keywordShort: BLOG_UI[lang].keywordShort,
        hay: '',
      }}
    />
  );
}
