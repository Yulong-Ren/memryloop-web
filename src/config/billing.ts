const WEBSITE_ORIGIN = import.meta.env.VITE_WEBSITE_URL ?? 'https://memryloop.com';

export const BILLING_ROUTES = {
  billing: '/billing',
  checkout: '/checkout',
  success: '/billing/success',
  cancel: '/billing/cancel',
} as const;

export function buildBillingPageUrl(userId: string): string {
  const params = new URLSearchParams({ uid: userId });
  return `${WEBSITE_ORIGIN}${BILLING_ROUTES.billing}?${params.toString()}`;
}

export function buildCheckoutUrl(userId: string): string {
  const params = new URLSearchParams({ uid: userId });
  return `${WEBSITE_ORIGIN}${BILLING_ROUTES.checkout}?${params.toString()}`;
}

export function buildBillingSuccessUrl(userId: string): string {
  const params = new URLSearchParams({ uid: userId });
  return `${WEBSITE_ORIGIN}${BILLING_ROUTES.success}?${params.toString()}`;
}

export function buildBillingCancelUrl(userId?: string): string {
  if (!userId) {
    return `${WEBSITE_ORIGIN}${BILLING_ROUTES.cancel}`;
  }
  const params = new URLSearchParams({ uid: userId });
  return `${WEBSITE_ORIGIN}${BILLING_ROUTES.cancel}?${params.toString()}`;
}
