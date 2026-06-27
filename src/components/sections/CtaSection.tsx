import { CHROME_STORE_URL, scrollToSection } from '../../config';
import { SITE_MAX, SITE_PX } from '../../design/tokens';
import { ArrowRightIcon } from '../icons';
import { Btn } from '../ui';

export function CtaSection() {
  return (
    <section className={`${SITE_MAX} mx-auto ${SITE_PX} scroll-mt-24 py-36 text-center`}>
      <h2
        className="mb-6 font-bold leading-[1.06] tracking-tight text-[#0a0a0a]"
        style={{ fontSize: 72 }}
      >
        Start remembering more.
      </h2>
      <p className="mx-auto mb-12 max-w-[480px] text-[20px] leading-relaxed text-[#6e6e73]">
        Transform YouTube videos into knowledge you can keep.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Btn size="lg" href={CHROME_STORE_URL}>
          Download Extension
          <ArrowRightIcon size={16} />
        </Btn>
        <Btn size="lg" variant="outline" onClick={() => scrollToSection('roadmap')}>
          View Roadmap
        </Btn>
      </div>
      <p className="mt-6 text-[13px] text-[#6e6e73]">Free · No account required · Takes 30 seconds</p>
    </section>
  );
}
