/**
 * Referral Email Preview API Endpoint
 * Renders referral email templates (admin + user) for preview without sending mails
 */

import {
  renderReferralEmails,
  generatePlainTextReferralEmail,
} from '../../utils/referralEmailRenderer';
import type { ReferralData, TranslationFunction } from '../../utils/referralEmailRenderer';
import en from '../../../i18n/locales/en';
import de from '../../../i18n/locales/de';
import fr from '../../../i18n/locales/fr';
import es from '../../../i18n/locales/es';
import type {
  EmailPreviewRequest,
  EmailPreviewResponse,
  EmailLocale,
} from '../../../types/email-preview';

const LOCALES = { en, de, fr, es } as const;

function resolveTranslation(localeObj: Record<string, unknown>, key: string): string {
  const parts = key.split('.');
  let result: unknown = localeObj;
  for (const part of parts) {
    if (result && typeof result === 'object' && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}

function createTranslationFunction(locale: EmailLocale): TranslationFunction {
  const localeObj = LOCALES[locale];
  return (k: string) => resolveTranslation(localeObj, k);
}

function validateQuery(query: Record<string, unknown>): EmailPreviewRequest {
  const type =
    query.type === 'admin' || query.type === 'user' ? (query.type as 'admin' | 'user') : 'user';
  const locale = ['en', 'de', 'fr', 'es'].includes(query.locale as string)
    ? (query.locale as EmailLocale)
    : 'en';
  return { type, locale };
}

const DEFAULT_MOCK: ReferralData = {
  fullName: 'Dmytro Lukianenko',
  email: 'craigadlert@gmail.com',
  companyName: 'Referrer Company',
  company: 'Referrer Company',
  referredCompany: 'Referred Company Name',
  companySize: 'Company Size',
  referralContactName: 'Contact Person',
  referralContactEmail: 'contact@example.com',
  country: 'Estonia',
  services: [],
  technologies: [],
  message: 'Additional information provided by the referrer',
  privacyPolicyAccepted: true,
};

export default defineEventHandler(async (event): Promise<EmailPreviewResponse> => {
  try {
    const query = getQuery(event);
    const { type, locale } = validateQuery(query);

    const t = createTranslationFunction(locale);

    const data: ReferralData = DEFAULT_MOCK;

    const rendered = await renderReferralEmails(data, t);
    const adminText = generatePlainTextReferralEmail(data, t, true);
    const userText = generatePlainTextReferralEmail(data, t, false);

    const html = type === 'admin' ? rendered.adminHtml : rendered.userHtml;
    const subject = t(
      type === 'admin' ? 'referralMail.admin.subject' : 'referralMail.user.subject',
    );

    return { html, subject, type, locale, adminText, userText } as EmailPreviewResponse;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to render referral preview',
      data: err,
    });
  }
});
