import { CHROME_STORE_URL, NAV_ITEMS, scrollToSection } from '../config';
import { P, SITE_MAX, SITE_PX } from '../design/tokens';
import { SparklesIcon } from './icons';
import { Btn } from './ui';

export function Header() {
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.slice(1));
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.07)] bg-white"
      style={{ height: 80 }}
    >
      <div className={`${SITE_MAX} mx-auto ${SITE_PX} flex h-full items-center justify-between`}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 no-underline"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-[9px]" style={{ background: P }}>
            <SparklesIcon size={16} className="text-white" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-[#0a0a0a]">MemryLoop</span>
        </a>

        <div className="hidden items-center gap-8 md:flex lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[14px] font-medium text-[#6e6e73] no-underline transition-colors hover:text-[#0a0a0a]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Btn size="sm" href={CHROME_STORE_URL} className="hidden md:inline-flex">
          Download Extension
        </Btn>
        <Btn size="sm" href={CHROME_STORE_URL} className="md:hidden">
          Download
        </Btn>
      </div>
    </nav>
  );
}
