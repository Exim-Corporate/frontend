/**
 * Email Preview API Endpoint
 * Renders email templates for preview without sending actual emails
 */

import {
  renderAdminContactEmail,
  renderUserContactEmail,
  type ContactData,
} from '../../utils/emailRenderer';
import en from '../../../i18n/locales/en';
import de from '../../../i18n/locales/de';
import fr from '../../../i18n/locales/fr';
import es from '../../../i18n/locales/es';
import type {
  EmailPreviewRequest,
  EmailPreviewResponse,
  EmailLocale,
} from '../../../types/email-preview';

/** Default mock data for email preview */
const DEFAULT_MOCK_DATA: ContactData = {
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  companyName: 'Tech Innovations Inc.',
  country: 'United States',
  services: ['Frontend Development', 'Backend Development'],
  technologies: ['React', 'Node.js', 'TypeScript'],
  message:
    'We are looking for experienced developers to help us build a modern web application. The project involves creating a responsive frontend and scalable backend API. We need someone who can work with our team to deliver high-quality solutions.',
};

/** Locale mappings */
const LOCALES = { en, de, fr, es } as const;

/**
 * Resolves translation key for given locale
 */
function resolveTranslation(localeObj: Record<string, unknown>, key: string): string {
  const parts = key.split('.');
  let result: unknown = localeObj;

  for (const part of parts) {
    if (result && typeof result === 'object' && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Creates translation function for given locale
 */
function createTranslationFunction(locale: EmailLocale) {
  const localeObj = LOCALES[locale];
  return (key: string) => resolveTranslation(localeObj, key);
}

/**
 * Validates and sanitizes query parameters
 */
function validateQuery(query: Record<string, unknown>): EmailPreviewRequest {
  const type = query.type === 'admin' || query.type === 'user' ? query.type : 'user';
  const locale = ['en', 'de', 'fr', 'es'].includes(query.locale as string)
    ? (query.locale as EmailLocale)
    : 'en';

  return { type, locale };
}

export default defineEventHandler(async (event): Promise<EmailPreviewResponse> => {
  try {
    const query = getQuery(event);
    const { type, locale } = validateQuery(query);

    // Create translation function
    const t = createTranslationFunction(locale);

    // Use default mock data
    const contactData: ContactData = DEFAULT_MOCK_DATA;

    // Render appropriate template
    const html =
      type === 'admin'
        ? renderAdminContactEmail(contactData, t)
        : renderUserContactEmail(contactData, t);

    // Get subject from translations
    const subject = t(`contactMail.${type}.subject`);

    return {
      html,
      subject,
      type,
      locale,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to render email preview',
      data: error,
    });
  }
});
