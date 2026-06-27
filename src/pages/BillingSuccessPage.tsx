import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CheckIcon } from '../components/icons';
import { Btn } from '../components/ui';
import { P, SITE_MAX, SITE_PX } from '../design/tokens';
import type { EntitlementStatus } from '../types/billing';
import {
  fetchEntitlementStatus,
  resolveSubscriptionId,
  syncSubscription,
} from '../services/billing';

type SuccessState = 'loading' | 'active' | 'pending' | 'missing_uid' | 'error';

function readUserIdFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')?.trim();
  return uid || null;
}

export function BillingSuccessPage() {
  const [state, setState] = useState<SuccessState>('loading');
  const [entitlement, setEntitlement] = useState<EntitlementStatus | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = readUserIdFromQuery();

  useEffect(() => {
    if (!userId) {
      setState('missing_uid');
      return;
    }

    const controller = new AbortController();

    async function activatePro() {
      setState('loading');
      setErrorMessage(null);

      try {
        const subscriptionId = resolveSubscriptionId(userId!);
        const status = subscriptionId
          ? await syncSubscription(userId!, subscriptionId, controller.signal)
          : await fetchEntitlementStatus(userId!, controller.signal);

        if (controller.signal.aborted) return;

        setEntitlement(status);
        if (status.isPro) {
          setState('active');
          return;
        }

        if (status.subscriptionStatus === 'approval_pending') {
          setState('pending');
          return;
        }

        setState('error');
        setErrorMessage('Your subscription is not active yet. Try again in a moment.');
      } catch (error) {
        if (controller.signal.aborted) return;
        setState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unable to activate Pro membership.');
      }
    }

    void activatePro();

    return () => {
      controller.abort();
    };
  }, [userId]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className={`${SITE_MAX} mx-auto ${SITE_PX} flex min-h-[calc(100vh-160px)] items-center justify-center py-20`}>
        <div
          className="w-full max-w-[520px] rounded-2xl border border-[rgba(0,0,0,0.08)] p-10 text-center"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)' }}
        >
          {state === 'loading' && (
            <>
              <div
                className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-[3px] border-[rgba(91,77,255,0.15)] border-t-[#5B4DFF]"
                aria-hidden="true"
              />
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">Activating MemryLoop Pro…</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                Syncing your subscription from PayPal. This usually takes a few seconds.
              </p>
            </>
          )}

          {state === 'active' && (
            <>
              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'rgba(91,77,255,0.12)' }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: P }}
                >
                  <CheckIcon size={18} className="text-white" />
                </div>
              </div>
              <h1 className="text-[28px] font-bold tracking-tight text-[#0a0a0a]">Welcome to MemryLoop Pro</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                Your subscription is active. Close this tab and reopen the MemryLoop extension to enjoy Pro benefits.
              </p>
              {entitlement && (
                <div className="mt-6 rounded-xl bg-[#fafafa] px-5 py-4 text-left text-[14px] text-[#3d3d3d]">
                  <p>
                    <span className="font-semibold text-[#0a0a0a]">Daily AI Notes:</span>{' '}
                    {entitlement.dailyAnalyzeLimit}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-[#0a0a0a]">Library:</span> Unlimited
                  </p>
                </div>
              )}
              <div className="mt-8">
                <Btn href="/" variant="outline">
                  Back to home
                </Btn>
              </div>
            </>
          )}

          {state === 'pending' && (
            <>
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">Almost there</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                PayPal is still processing your subscription approval. Wait a moment, then retry.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Btn onClick={handleRetry} className="min-w-[180px] justify-center">
                  Check again
                </Btn>
                <Btn href="/" variant="outline">
                  Back to home
                </Btn>
              </div>
            </>
          )}

          {state === 'missing_uid' && (
            <>
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">Missing account information</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                This page needs your MemryLoop account ID. Please upgrade from the extension again.
              </p>
              <div className="mt-8">
                <Btn href="/" variant="outline">
                  Back to home
                </Btn>
              </div>
            </>
          )}

          {state === 'error' && (
            <>
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">Activation failed</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                {errorMessage ?? 'We could not activate your Pro membership.'}
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Btn onClick={handleRetry} className="min-w-[180px] justify-center">
                  Try again
                </Btn>
                <Btn href="/" variant="outline">
                  Back to home
                </Btn>
              </div>
            </>
          )}

          {userId && state !== 'missing_uid' && (
            <p className="mt-8 text-[12px] text-[#9ca3af]">
              Account ID: <span style={{ color: P }}>{userId}</span>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
