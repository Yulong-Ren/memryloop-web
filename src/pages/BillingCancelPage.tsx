import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Btn } from '../components/ui';
import { P, SITE_MAX, SITE_PX } from '../design/tokens';
import { buildBillingPageUrl } from '../config/billing';
import { forgetCheckoutSubscription } from '../services/billing';

function readUserIdFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')?.trim();
  return uid || null;
}

export function BillingCancelPage() {
  const userId = readUserIdFromQuery();

  useEffect(() => {
    if (userId) {
      forgetCheckoutSubscription(userId);
    }
  }, [userId]);

  const retryHref = userId ? buildBillingPageUrl(userId) : null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className={`${SITE_MAX} mx-auto ${SITE_PX} flex min-h-[calc(100vh-160px)] items-center justify-center py-20`}>
        <div
          className="w-full max-w-[520px] rounded-2xl border border-[rgba(0,0,0,0.08)] p-10 text-center"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <h1 className="text-[28px] font-bold tracking-tight text-[#0a0a0a]">Checkout cancelled</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73]">
            No charges were made. You can try again anytime from the MemryLoop extension or below.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            {retryHref && (
              <Btn href={retryHref} className="min-w-[180px] justify-center">
                Try checkout again
              </Btn>
            )}
            <Btn href="/" variant="outline">
              Back to home
            </Btn>
          </div>

          {!userId && (
            <p className="mt-6 text-[14px] leading-relaxed text-[#6e6e73]">
              Open Upgrade to Pro from the MemryLoop extension to continue with your account.
            </p>
          )}

          {userId && (
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
