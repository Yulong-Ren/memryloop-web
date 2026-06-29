import { useEffect, useMemo, useState } from 'react';
import { Footer } from '../components/Footer';
import { CheckIcon, ChevronDownIcon, ShieldIcon, SparklesIcon } from '../components/icons';
import { Btn } from '../components/ui';
import { P, SHADOW_MD, SITE_MAX, SITE_PX } from '../design/tokens';
import { fetchBillingConfig, startPayPalCheckout } from '../services/billing';
import type { PlanLimits } from '../types/billing';

const DEFAULT_LIMITS: PlanLimits = {
  freeDailyAnalyzeLimit: 5,
  proDailyAnalyzeLimit: 50,
  freeLibraryLimit: 10,
};

function buildCompareRows(limits: PlanLimits) {
  return [
    {
      feature: 'AI Notes per day',
      free: String(limits.freeDailyAnalyzeLimit),
      pro: String(limits.proDailyAnalyzeLimit),
    },
    {
      feature: 'Library Storage',
      free: `${limits.freeLibraryLimit} items`,
      pro: 'Unlimited',
    },
    { feature: 'AI Processing', free: 'Standard', pro: 'Priority' },
    { feature: 'Export', free: null, pro: 'PDF & Markdown' },
    { feature: 'Future Features', free: null, pro: 'Early Access' },
  ];
}

function buildDefaultProFeatures(limits: PlanLimits) {
  return [
    `Generate up to ${limits.proDailyAnalyzeLimit} AI Notes every day`,
    'Save unlimited notes and vocabulary',
    'Faster AI note generation',
    'Early access to new features',
    'PDF & Markdown export',
  ];
}

function buildFaqs(limits: PlanLimits) {
  return [
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. You can cancel your subscription at any time from the MemryLoop extension settings. Your Pro access continues until the end of the billing period.',
    },
    {
      q: 'What happens if I reach my AI Note limit?',
      a: `On the Free plan, note generation pauses until the next day. Upgrade to Pro for ${limits.proDailyAnalyzeLimit} notes per day and significantly more headroom for active learners.`,
    },
    {
      q: 'Which payment methods are supported?',
      a: 'Currently, PayPal is supported for all subscriptions. Additional payment methods may be added in the future.',
    },
  ];
}

function readUserIdFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')?.trim();
  return uid || null;
}

function PayPalLogo() {
  return (
    <svg width="80" height="20" viewBox="0 0 80 20" fill="none" aria-hidden="true">
      <text x="0" y="15" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009cde">Pal</tspan>
      </text>
    </svg>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[rgba(0,0,0,0.08)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-[#0a0a0a]">{q}</span>
        <ChevronDownIcon
          size={16}
          className={`shrink-0 text-[#6e6e73] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open ? <p className="pb-5 text-sm leading-7 text-[#6e6e73]">{a}</p> : null}
    </div>
  );
}

export function BillingPage() {
  const userId = readUserIdFromQuery();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [limits, setLimits] = useState<PlanLimits>(DEFAULT_LIMITS);
  const [proFeatures, setProFeatures] = useState<string[]>(() => buildDefaultProFeatures(DEFAULT_LIMITS));

  useEffect(() => {
    const controller = new AbortController();

    fetchBillingConfig(controller.signal)
      .then(({ limits: nextLimits, proFeatures: nextProFeatures }) => {
        setLimits(nextLimits);
        if (nextProFeatures.length > 0) {
          setProFeatures(nextProFeatures);
        } else {
          setProFeatures(buildDefaultProFeatures(nextLimits));
        }
      })
      .catch(() => {
        // Keep fallback defaults when the API is unreachable.
      });

    return () => controller.abort();
  }, []);

  const tableRows = useMemo(() => buildCompareRows(limits), [limits]);
  const faqs = useMemo(() => buildFaqs(limits), [limits]);

  async function handleUpgrade() {
    if (!userId) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      await startPayPalCheckout(userId);
    } catch (error) {
      setCheckoutLoading(false);
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout.');
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 pb-16 pt-16 text-center">
        <div className="mb-6 inline-flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{ borderColor: 'rgba(91,77,255,0.18)', color: P, background: '#f0efff' }}
          >
            <SparklesIcon size={11} />
            MemryLoop Pro
          </span>
        </div>

        <h1 className="mx-auto mb-5 max-w-[640px] text-[40px] font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[48px]">
          Upgrade your learning experience
        </h1>

        <p className="mx-auto max-w-[520px] text-lg leading-relaxed text-[#6e6e73]">
          Generate more AI Notes, save unlimited knowledge, and unlock advanced learning tools.
        </p>
      </header>

      <main className={`${SITE_MAX} mx-auto ${SITE_PX} pb-24`}>
        <div className="flex flex-col items-start gap-12 lg:flex-row">
          <div className="min-w-0 flex-1">
            <h2 className="mb-6 text-lg font-semibold text-[#0a0a0a]">Compare Plans</h2>

            <div className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)]">
              <div className="grid grid-cols-3 border-b border-[rgba(0,0,0,0.08)] bg-[#fafafa] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#6e6e73]">
                <span>Feature</span>
                <span className="text-center">Free</span>
                <span className="text-center" style={{ color: P }}>
                  Pro
                </span>
              </div>

              {tableRows.map((row, index) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-3 items-center px-6 py-4"
                  style={{
                    borderBottom:
                      index < tableRows.length - 1 ? '1px solid rgba(0,0,0,0.08)' : undefined,
                  }}
                >
                  <span className="text-sm font-medium text-[#0a0a0a]">{row.feature}</span>

                  <span className="text-center">
                    {row.free === null ? (
                      <span className="text-sm text-[#d1d5db]">—</span>
                    ) : (
                      <span className="text-sm text-[#6e6e73]">{row.free}</span>
                    )}
                  </span>

                  <span className="flex items-center justify-center gap-1.5">
                    {row.pro === null ? (
                      <span className="text-sm text-[#d1d5db]">—</span>
                    ) : (
                      <>
                        <CheckIcon size={13} style={{ color: P }} strokeWidth={2.5} />
                        <span className="text-sm font-medium text-[#0a0a0a]">{row.pro}</span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#9ca3af]">
              Pro features are billed monthly and can be cancelled at any time. All usage limits reset
              daily at midnight UTC.
            </p>
          </div>

          <div className="w-full shrink-0 lg:w-[420px]">
            <div
              className="rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white p-8"
              style={{ boxShadow: SHADOW_MD }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: P }}>
                MemryLoop Pro
              </p>

              <div className="mb-2 flex items-end gap-1.5">
                <span className="text-[52px] font-extrabold leading-none tracking-[-0.03em] text-[#0a0a0a]">
                  $4.99
                </span>
                <span className="pb-2 text-sm text-[#6e6e73]">per month</span>
              </div>

              <p className="mb-6 text-sm text-[#6e6e73]">Learn faster. Remember more.</p>

              <ul className="mb-8 space-y-3.5">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: '#f0efff' }}
                    >
                      <CheckIcon size={11} style={{ color: P }} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-[#0a0a0a]">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6 h-px bg-[rgba(0,0,0,0.08)]" />

              <div className="mb-5">
                <p className="mb-3 text-sm font-semibold text-[#0a0a0a]">Payment Method</p>

                <div
                  className="flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5"
                  style={{ borderColor: P, background: '#f0efff' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 shadow-sm">
                      <PayPalLogo />
                    </div>
                    <span className="text-sm font-medium text-[#0a0a0a]">PayPal</span>
                  </div>
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full border-2"
                    style={{ borderColor: P, background: P }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <ShieldIcon size={12} className="text-[#9ca3af]" />
                  <p className="text-xs text-[#9ca3af]">Secure payment powered by PayPal.</p>
                </div>
                <p className="ml-5 mt-1.5 text-xs text-[#9ca3af]">Billed monthly · Cancel anytime</p>
              </div>

              {!userId ? (
                <div className="mb-4 rounded-xl bg-[#fafafa] px-4 py-3 text-sm leading-relaxed text-[#6e6e73]">
                  Open Upgrade to Pro from the MemryLoop extension to continue with your account.
                </div>
              ) : null}

              {checkoutError ? (
                <p className="mb-4 text-sm text-red-600">{checkoutError}</p>
              ) : null}

              <Btn
                className="h-[52px] w-full justify-center text-[15px]"
                disabled={!userId || checkoutLoading}
                onClick={() => void handleUpgrade()}
              >
                {checkoutLoading ? 'Redirecting to PayPal…' : 'Upgrade to Pro'}
              </Btn>

              {userId ? (
                <p className="mt-4 text-center text-[12px] text-[#9ca3af]">
                  Account ID: <span style={{ color: P }}>{userId}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <section className="mx-auto max-w-[720px] px-6 pb-24">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-[-0.02em] text-[#0a0a0a]">
          Frequently Asked Questions
        </h2>
        <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] px-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[480px] px-6 pb-24">
        <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#fafafa] px-8 py-10 text-center">
          <h3 className="mb-2 text-lg font-bold text-[#0a0a0a]">Need help?</h3>
          <p className="mb-5 text-sm text-[#6e6e73]">Contact us anytime.</p>
          <a
            href="mailto:support@memryloop.com"
            className="text-base font-semibold transition-opacity hover:opacity-75"
            style={{ color: P }}
          >
            support@memryloop.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
