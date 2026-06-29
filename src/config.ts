export const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/memryloop/fhmhpoldjajflalnllncpmjhkfjpefmf';

export const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Pro', href: '#pro' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Feedback', href: '#feedback' },
] as const;

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

export function isLandingPath(pathname: string = window.location.pathname): boolean {
  return normalizePath(pathname) === '/';
}

export function buildSectionHref(hashHref: string): string {
  if (!hashHref.startsWith('#')) {
    return hashHref;
  }
  return isLandingPath() ? hashHref : `/${hashHref}`;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function navigateToSection(hashHref: string) {
  if (!hashHref.startsWith('#')) {
    window.location.assign(hashHref);
    return;
  }

  const sectionId = hashHref.slice(1);
  if (isLandingPath()) {
    scrollToSection(sectionId);
    window.history.replaceState(null, '', hashHref);
    return;
  }

  window.location.assign(`/${hashHref}`);
}

export function scrollToHashOnLoad() {
  const hash = window.location.hash;
  if (!hash.startsWith('#')) {
    return;
  }

  const sectionId = hash.slice(1);
  window.requestAnimationFrame(() => {
    scrollToSection(sectionId);
  });
}
