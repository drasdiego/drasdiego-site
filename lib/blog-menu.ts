export interface GuideNoteData {
  index: string;
  byCategory: Record<string, string>;
  handle: string;
}

export interface BlogMenuCategory {
  slug: string;
  name: string;
  href: string;
  count: string;
  allInLabel: string;
  guides: { title: string; href: string }[];
}

export interface BlogMenuData {
  label: string;
  topicsLabel: string;
  guidesLabel: string;
  allLabel: string;
  allHref: string;
  categories: BlogMenuCategory[];
}
