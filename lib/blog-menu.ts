export interface BlogMenuData {
  label: string;
  categories: { name: string; href: string; guides: { title: string; href: string }[] }[];
}
