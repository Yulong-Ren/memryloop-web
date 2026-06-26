import { BILLING_ROUTES } from '../../config/billing';
import { P, SHADOW_MD, SHADOW_SM, SITE_MAX, SITE_PX } from '../../design/tokens';
import { CheckIcon } from '../icons';
import { Btn, SectionLabel } from '../ui';

const FREE_BENEFITS = ['5 AI Notes per day', 'Save up to 10 videos', 'Basic translation', 'Chrome & Firefox'];
const PRO_BENEFITS = [
  '50 AI Notes per day',
  'Unlimited library',
  'Priority AI processing',
  'Early access to future features',
  'PDF & Markdown export',
];

export function PricingSection() {
  return (
    <section id="pro" className="scroll-mt-24 py-28" style={{ background: '#fafafa' }}>
      <div className={`${SITE_MAX} mx-auto ${SITE_PX}`}>
        <div className="mb-16 text-center">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-[44px] font-bold tracking-tight text-[#0a0a0a]">MemryLoop Pro</h2>
          <p className="mt-4 text-[18px] text-[#6e6e73]">Unlock unlimited learning.</p>
        </div>

        <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="rounded-2xl border border-[rgba(0,0,0,0.08)] p-8"
            style={{ background: '#fff', boxShadow: SHADOW_SM }}
          >
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-widest text-[#6e6e73]">Free</p>
            <div className="mb-1 flex items-end gap-1">
              <span className="text-[42px] font-bold leading-none text-[#0a0a0a]">$0</span>
            </div>
            <p className="mb-7 text-[13px] text-[#6e6e73]">Forever free</p>
            <ul className="mb-8 space-y-3">
              {FREE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckIcon size={16} className="shrink-0 text-[#6e6e73]" />
                  <span className="text-[14px] text-[#3d3d3d]">{benefit}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled
              className="w-full cursor-default rounded-xl border border-[rgba(0,0,0,0.1)] bg-[#f5f5f7] py-3 text-[14px] font-semibold text-[#6e6e73]"
            >
              Current Plan
            </button>
          </div>

          <div
            className="relative rounded-2xl border-2 p-8"
            style={{
              background: '#fff',
              borderColor: P,
              boxShadow: `0 0 0 4px rgba(91,77,255,0.06), ${SHADOW_MD}`,
            }}
          >
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold text-white"
              style={{ background: P }}
            >
              MOST POPULAR
            </div>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-widest" style={{ color: P }}>
              Pro
            </p>
            <div className="mb-1 flex items-end gap-1">
              <span className="text-[42px] font-bold leading-none text-[#0a0a0a]">$4.99</span>
              <span className="mb-1 text-[14px] text-[#6e6e73]">/month</span>
            </div>
            <p className="mb-7 text-[13px] text-[#6e6e73]">Billed monthly · cancel anytime</p>
            <ul className="mb-8 space-y-3">
              {PRO_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{ background: P }}
                  >
                    <CheckIcon size={10} className="text-white" />
                  </div>
                  <span className="text-[14px] font-medium text-[#0a0a0a]">{benefit}</span>
                </li>
              ))}
            </ul>
            <Btn href={BILLING_ROUTES.billing} className="w-full justify-center py-3">
              Upgrade to Pro
            </Btn>
            <p className="mt-3 text-center text-[12px] leading-relaxed text-[#6e6e73]">
              Continue in the MemryLoop extension to link your account and pay with PayPal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
