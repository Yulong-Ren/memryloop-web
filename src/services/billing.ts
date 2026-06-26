import type { CreateSubscriptionResult, EntitlementStatus } from '../types/billing';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
const SUBSCRIPTIONS_PATH = '/api/billing/subscriptions';
const SYNC_PATH = '/api/billing/subscriptions/sync';
const STATUS_PATH = '/api/billing/status';
const REQUEST_TIMEOUT_MS = 30_000;

const CHECKOUT_STORAGE_PREFIX = 'memryloop_checkout_';

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = (await response.json()) as { detail?: string; message?: string };
      message = body.detail ?? body.message ?? message;
    } catch {
      // keep statusText
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

export async function createSubscription(
  userId: string,
  signal?: AbortSignal,
): Promise<CreateSubscriptionResult> {
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);

  const onAbort = () => timeoutController.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      throw new DOMException('Checkout request aborted', 'AbortError');
    }
    signal.addEventListener('abort', onAbort, { once: true });
  }

  try {
    const response = await fetch(`${API_BASE}${SUBSCRIPTIONS_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
      signal: timeoutController.signal,
    });
    return parseJson<CreateSubscriptionResult>(response);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      if (signal?.aborted) {
        throw error;
      }
      throw new Error(
        `Checkout timed out after ${REQUEST_TIMEOUT_MS / 1000}s. Check that the API is running at ${API_BASE}.`,
      );
    }
    if (error instanceof TypeError) {
      throw new Error(
        `Unable to reach MemryLoop API at ${API_BASE}. Start the backend or set VITE_API_BASE_URL.`,
      );
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', onAbort);
    }
  }
}

export function rememberCheckoutSubscription(userId: string, subscriptionId: string): void {
  sessionStorage.setItem(`${CHECKOUT_STORAGE_PREFIX}${userId}`, subscriptionId);
}

export function readCheckoutSubscription(userId: string): string | null {
  return sessionStorage.getItem(`${CHECKOUT_STORAGE_PREFIX}${userId}`);
}

export function forgetCheckoutSubscription(userId: string): void {
  sessionStorage.removeItem(`${CHECKOUT_STORAGE_PREFIX}${userId}`);
}

export async function syncSubscription(
  userId: string,
  subscriptionId: string,
  signal?: AbortSignal,
): Promise<EntitlementStatus> {
  const response = await fetch(`${API_BASE}${SYNC_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, subscriptionId }),
    signal,
  });
  return parseJson<EntitlementStatus>(response);
}

export async function fetchEntitlementStatus(
  userId: string,
  signal?: AbortSignal,
): Promise<EntitlementStatus> {
  const params = new URLSearchParams({ userId, sync: 'true' });
  const response = await fetch(`${API_BASE}${STATUS_PATH}?${params.toString()}`, { signal });
  return parseJson<EntitlementStatus>(response);
}

export async function startPayPalCheckout(userId: string, signal?: AbortSignal): Promise<void> {
  const result = await createSubscription(userId, signal);
  if (!result.approvalUrl) {
    throw new Error(result.message ?? 'PayPal did not return an approval URL.');
  }
  if (result.subscriptionId) {
    rememberCheckoutSubscription(userId, result.subscriptionId);
  }
  window.location.assign(result.approvalUrl);
}

export function resolveSubscriptionId(userId: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('subscription_id')?.trim() ||
    params.get('subscriptionId')?.trim() ||
    readCheckoutSubscription(userId)
  );
}
