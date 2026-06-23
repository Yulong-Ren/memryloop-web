export const CHROME_STORE_URL = '#install';

export const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Pro', href: '#pro' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Feedback', href: '#feedback' },
] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
