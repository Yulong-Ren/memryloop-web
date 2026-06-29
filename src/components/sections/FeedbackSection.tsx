import { SHADOW_MD, SITE_MAX, SITE_PX } from '../../design/tokens';
import { Btn, SectionLabel } from '../ui';

export function FeedbackSection() {
  return (
    <section id="feedback" className="scroll-mt-24 py-28" style={{ background: '#fafafa' }}>
      <div className={`${SITE_MAX} mx-auto ${SITE_PX}`}>
        <div
          className="mx-auto max-w-[720px] rounded-3xl border border-[rgba(0,0,0,0.07)] p-10 text-center md:p-16"
          style={{ background: '#fff', boxShadow: SHADOW_MD }}
        >
          <SectionLabel>Feedback</SectionLabel>
          <h2 className="mb-4 text-[40px] font-bold tracking-tight text-[#0a0a0a]">
            Help shape MemryLoop
          </h2>
          <p className="mx-auto mb-10 max-w-[440px] text-[16px] leading-relaxed text-[#6e6e73]">
            MemryLoop is still evolving. Your ideas and suggestions matter — every piece of feedback
            shapes what gets built next.
          </p>

          <div className="mb-10 flex items-center justify-center gap-3">
            <a
              href="mailto:support@memryloop.com"
              className="text-[14px] font-medium text-[#6e6e73] no-underline transition-colors hover:text-[#0a0a0a]"
            >
              support@memryloop.com
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
              <Btn size="lg" href="mailto:support@memryloop.com">
              Send Feedback
            </Btn>
            <Btn size="lg" variant="outline" href="mailto:support@memryloop.com">
              Join Community
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
