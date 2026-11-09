export interface GuideNoteData {
  index: string;
  byCategory: Record<string, string>;
  handle: string;
}

export interface BlogMenuData {
  label: string;
  categories: { name: string; href: string; guides: { title: string; href: string }[] }[];
}
