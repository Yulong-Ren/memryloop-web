import { CHROME_STORE_URL, scrollToSection } from '../../config';
import { SITE_MAX, SITE_PX } from '../../design/tokens';
import { ArrowRightIcon, SparklesIcon } from '../icons';
import {
  ExtensionPopup,
  LibraryWindow,
  NotesWindow,
} from '../mockups/HeroMockups';
import { Btn, Tag } from '../ui';

export function HeroSection() {
  return (
    <section
      id="install"
      className={`${SITE_MAX} mx-auto ${SITE_PX} flex scroll-mt-24 flex-col items-center gap-12 lg:flex-row lg:gap-16`}
      style={{ paddingTop: 64, paddingBottom: 64 }}
    >
      <div className="max-w-[520px] flex-1">
        <Tag>
          <SparklesIcon size={12} />
          Browser Extension · Free to Start
        </Tag>
        <h1 className="mb-6 mt-6 max-w-[520px] text-[40px] font-bold leading-[1.08] tracking-[-0.04em] text-[#0a0a0a] sm:text-[52px] lg:text-[64px]">
          Remember what you learn from YouTube.
        </h1>
        <p className="mb-10 max-w-[440px] text-[18px] leading-[1.625] text-[#6e6e73]">
          MemryLoop transforms videos into AI notes, bilingual subtitles, and a personal learning
          library so you can retain more and improve your language skills naturally.
        </p>
        <div className="flex items-center gap-3">
          <Btn size="lg" href={CHROME_STORE_URL}>
            Get Started
            <ArrowRightIcon size={16} />
          </Btn>
          <Btn size="lg" variant="outline" onClick={() => scrollToSection('features')}>
            See Features
          </Btn>
        </div>
        <p className="mt-5 text-[13px] text-[#6e6e73]">Free · No account required · Chrome & Firefox</p>
      </div>

      <div className="relative hidden min-h-[560px] min-w-[680px] flex-1 overflow-visible lg:block">
        <div className="absolute" style={{ top: 40, left: 60, zIndex: 2 }}>
          <NotesWindow />
        </div>
        <div className="absolute" style={{ top: 0, left: 380, zIndex: 3 }}>
          <ExtensionPopup />
        </div>
        <div className="absolute" style={{ top: 320, left: 0, zIndex: 1 }}>
          <LibraryWindow />
        </div>
      </div>
    </section>
  );
}
