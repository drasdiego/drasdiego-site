export const THEME_COLORS = { dark: '#101214', light: '#f7f8fa' } as const;

export function syncThemeColor(dark: boolean): void {
  const color = dark ? THEME_COLORS.dark : THEME_COLORS.light;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    if (m.getAttribute('content') !== color) m.setAttribute('content', color);
  });
}

export function watchThemeColor(dark: boolean): () => void {
  syncThemeColor(dark);
  if (typeof MutationObserver === 'undefined') return () => {};
  const observer = new MutationObserver(() => syncThemeColor(dark));
  observer.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ['content'] });
  return () => observer.disconnect();
}
