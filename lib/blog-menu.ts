export interface GuideNoteData {
  index: string;
  byCategory: Record<string, string>;
  handle: string;
}

export interface BlogMenuGuide {
  title: string;
  href: string;
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
  categories: BlogMenuCategory[];
}
