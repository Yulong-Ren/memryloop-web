export interface CreateSubscriptionResult {
  approvalUrl: string | null;
  subscriptionId: string | null;
  message: string | null;
}

export interface PlanLimits {
  freeDailyAnalyzeLimit: number;
  proDailyAnalyzeLimit: number;
  freeLibraryLimit: number;
}

export interface BillingPlan {
  id: string;
  name: string;
  price: string;
  currency: string;
  interval: string;
  features: string[];
}

export interface BillingConfig {
  billingEnabled: boolean;
  checkoutEnabled: boolean;
  websiteUrl: string;
  limits: PlanLimits;
  plans: BillingPlan[];
}

export type PlanTier = 'free' | 'pro';

export type SubscriptionStatus =
  | 'inactive'
  | 'approval_pending'
  | 'active'
  | 'cancelled'
  | 'suspended'
  | 'expired';

export interface EntitlementStatus {
  userId: string;
  plan: PlanTier;
  isPro: boolean;
  dailyAnalyzeLimit: number;
  dailyAnalyzeUsed: number;
  dailyAnalyzeRemaining: number;
  libraryLimit: number | null;
  subscriptionStatus: SubscriptionStatus;
  currentPeriodEnd: string | null;
  billingEnabled: boolean;
}
