/**
 * Referral related TypeScript types.
 */
export interface ReferralProgram {
  id: string;
  title: string;
  description: string;
  /** New: array of feature / reward lines (render exactly 3) */
  features?: string[];
  /** Optional bottom example / note */
  example?: string;
  /** Backwards-compat: single reward string (legacy) */
  reward?: string;
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
