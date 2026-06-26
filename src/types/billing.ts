export interface CreateSubscriptionResult {
  approvalUrl: string | null;
  subscriptionId: string | null;
  message: string | null;
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
