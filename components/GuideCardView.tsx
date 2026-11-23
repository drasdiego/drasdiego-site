import Link from 'next/link';
import type { GuideCardData } from '@/lib/blog-menu';

export function GuideCardView({ card }: { card: GuideCardData }) {
  return (
    <Link className="guide-card" href={card.href}>
      {card.tag && <span className="guide-card-tag" data-area={card.area}>{card.tag}</span>}
      <h3>{card.title}</h3>
      <p>{card.lead}</p>
      <span className="guide-card-foot">
        <time className="guide-card-date" dateTime={card.date}>{card.dateLabel}</time>
        <span className="guide-card-key">{card.keywordShort}: <strong>{card.keyword}</strong></span>
      </span>
    </Link>
  );
}
