export interface GuideNoteData {
  index: string;
  byCategory: Record<string, string>;
  handle: string;
}

export interface BlogMenuGuide {
  title: string;
  href: string;
  keyword: string;
  hay: string;
}

export interface BlogMenuCategory {
  slug: string;
  name: string;
  href: string;
  count: string;
  allInLabel: string;
  guides: BlogMenuGuide[];
}

export interface BlogMenuData {
  label: string;
  topicsLabel: string;
  guidesLabel: string;
  allLabel: string;
  allHref: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchEmpty: string;
  searchOne: string;
  searchMany: string;
  keywordShort: string;
  categories: BlogMenuCategory[];
}

export interface GuideCardData {
  href: string;
  tag: string;
  area: string;
  title: string;
  lead: string;
  date: string;
  dateLabel: string;
  keyword: string;
  keywordShort: string;
  hay: string;
}

export interface GuideListData {
  searchLabel: string;
  placeholder: string;
  clearLabel: string;
  keywordShort: string;
  total: string;
  totalOne: string;
  found: string;
  foundOne: string;
  empty: string;
  emptyTip: string;
  items: GuideCardData[];
}
