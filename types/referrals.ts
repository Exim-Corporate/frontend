/**
 * Referral related TypeScript types.
 */
export interface ReferralProgram {
  id: string;
  title: string;
  description: string;
  reward: string;
  highlight?: boolean;
  icon?: string; // Icon name for AppIcon if needed later
}

export interface ReferralSubmissionPayload {
  fullName: string;
  email: string;
  company?: string;
  referredCompany?: string;
  message?: string;
  privacyPolicyAccepted: boolean;
}
