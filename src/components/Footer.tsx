import { NAV_ITEMS, scrollToSection } from '../config';
import { P, SITE_MAX, SITE_PX } from '../design/tokens';
import { SparklesIcon } from './icons';

export function Footer() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    scrollToSection(href.slice(1));
  }

  return (
    <footer className="border-t border-[rgba(0,0,0,0.07)] py-10">
      <div className={`${SITE_MAX} mx-auto ${SITE_PX} flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center`}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[8px]" style={{ background: P }}>
            <SparklesIcon size={14} className="text-white" />
          </div>
          <span className="text-[14px] font-bold text-[#0a0a0a]">MemryLoop</span>
        </div>

        <div className="flex flex-wrap items-center gap-7">
          {NAV_ITEMS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[13px] text-[#6e6e73] no-underline transition-colors hover:text-[#0a0a0a]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-left md:text-right">
          <p className="text-[12px] text-[#6e6e73]">© 2026 MemryLoop</p>
          <p className="text-[12px] text-[#6e6e73]">Remember what you learn.</p>
        </div>
      </div>
    </footer>
  );
}
