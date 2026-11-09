import Link from 'next/link';
import type { Lang } from '@/types';
import { SITE_URL } from '@/lib/seo';
import { blogRoot } from '@/lib/blog';
import { CLOSING_UI, INSTAGRAM_URL, type GuideClosingData } from '@/lib/blog-closing';
import { CopyButton } from './CopyButton';

export function GuideClosing({ lang, path, data }: { lang: Lang; path: string; data: GuideClosingData }) {
  const ui = CLOSING_UI[lang];
  const next = data.next;
  const nextHref = next?.category && next.slug ? `${blogRoot(lang)}/${next.category}/${next.slug}` : undefined;
  const privacyHref = lang === 'en' ? '/en/privacidade' : '/privacidade';
  return (
    <section className="guide-closing" aria-labelledby="guide-closing-title">
      <h2 id="guide-closing-title" className="sr-only">{ui.heading}</h2>
      <p className="guide-closing-result">{data.result[lang]}</p>
      <a className="btn btn-primary guide-closing-follow" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`${ui.follow} (${ui.followHint})`}>
        {ui.follow}
      </a>
      {next && (
        <div className="guide-closing-next">
          <p className="guide-closing-label">{ui.nextTitle}</p>
          <p className="guide-closing-next-title">{next.title[lang]}</p>
          <p className="guide-closing-next-word">{ui.nextWord(next.word)}</p>
          {nextHref ? <Link className="inline-link" href={nextHref}>{ui.nextRead}</Link> : <p className="guide-closing-soon">{ui.nextSoon}</p>}
        </div>
      )}
      <div className="guide-closing-save">
        <p>{ui.save}</p>
        <CopyButton text={`${SITE_URL}${path}`} label={ui.copyLink} lang={lang} idle={ui.copyLink} />
      </div>
      <Link className="inline-link guide-closing-others" href={blogRoot(lang)}>{ui.others}</Link>
      <p className="guide-closing-privacy">{ui.privacy} <Link className="inline-link" href={privacyHref}>{ui.privacyLink}</Link></p>
    </section>
  );
}
