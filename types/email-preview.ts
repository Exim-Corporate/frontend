/**
 * Email preview types and interfaces
 * Provides type safety for email template preview functionality
 */

/** Available email template types */
export type EmailTemplateType = 'admin' | 'user';

/** Available locales for email templates */
export type EmailLocale = 'en' | 'de' | 'fr' | 'es';

/** Mock contact data for email preview */
export interface MockContactData {
  fullName: string;
  email: string;
  companyName?: string;
  country: string;
  services: string[];
  technologies?: string[];
  message: string;
}

/** Email preview request parameters */
export interface EmailPreviewRequest {
  type: EmailTemplateType;
  locale: EmailLocale;
  mockData?: Partial<MockContactData>;
}

/** Email preview response */
export interface EmailPreviewResponse {
  html: string;
  subject: string;
  type: EmailTemplateType;
  locale: EmailLocale;
}
