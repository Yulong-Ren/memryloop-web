import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Btn } from '../components/ui';
import { P, SITE_MAX, SITE_PX } from '../design/tokens';
import { startPayPalCheckout } from '../services/billing';

type CheckoutState = 'loading' | 'redirecting' | 'missing_uid' | 'error';

function readUserIdFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')?.trim();
  return uid || null;
}

export function CheckoutPage() {
  const [state, setState] = useState<CheckoutState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = readUserIdFromQuery();

  useEffect(() => {
    if (!userId) {
      setState('missing_uid');
      return;
    }

    const controller = new AbortController();

    async function startCheckout() {
      setState('loading');
      setErrorMessage(null);

      try {
        setState('redirecting');
        await startPayPalCheckout(userId!, controller.signal);
      } catch (error) {
        if (controller.signal.aborted) return;
        setState('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unable to start checkout.');
      }
    }

    void startCheckout();

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
          className="w-full max-w-[480px] rounded-2xl border border-[rgba(0,0,0,0.08)] p-10 text-center"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)' }}
        >
          {(state === 'loading' || state === 'redirecting') && (
            <>
              <div
                className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-[3px] border-[rgba(91,77,255,0.15)] border-t-[#5B4DFF]"
                aria-hidden="true"
              />
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">
                {state === 'redirecting' ? 'Redirecting to PayPal…' : 'Preparing checkout…'}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                {state === 'redirecting'
                  ? 'You will approve MemryLoop Pro on PayPal in a moment.'
                  : 'Creating your MemryLoop Pro subscription.'}
              </p>
            </>
          )}

          {state === 'missing_uid' && (
            <>
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">Open checkout from MemryLoop</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                This page needs your extension account ID. Open Upgrade to Pro from the MemryLoop extension to continue.
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
              <h1 className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">Checkout unavailable</h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
                {errorMessage ?? 'Something went wrong while starting PayPal checkout.'}
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
