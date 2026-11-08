import type { Lang } from '@/types';
import { CONTENT } from '@/lib/content';
import { PRESENTATION } from '@/lib/presentation';
import { Hero } from './Hero';
import { FeaturedProject } from './home/FeaturedProject';
import { RecentGuides } from './home/RecentGuides';
import { Contato } from './Contato';

export function Portfolio({ initialLang }: { initialLang: Lang }) {
  const lang = initialLang;
  const t = CONTENT[lang];
  const d = PRESENTATION[lang];

  return (
    <>
      <Hero lang={lang} />
      <FeaturedProject lang={lang} />
      <RecentGuides lang={lang} />
      <Contato lang={lang} t={{ ...t, contact: { ...t.contact, h2: d.contactTitle, p: d.contactDescription } }} />
    </>
  );
}
