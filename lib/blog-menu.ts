export interface BlogMenuData {
  label: string;
  allGuides: string;
  rootHref: string;
  categories: { name: string; href: string; guides: { title: string; href: string }[] }[];
}
