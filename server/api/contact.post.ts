/**
 * Server API route for secure contact form email sending.
 * Uses nodemailer with Gmail SMTP and vue-email templates.
 * Sanitizes all input to prevent XSS/injection.
 *
 * @see https://nodemailer.com/about/
 * @see https://vue-email.org/
 */
import { z } from 'zod';
import nodemailer from 'nodemailer';
import escape from 'escape-html';
import en from '../../i18n/locales/en';
import de from '../../i18n/locales/de';
import fr from '../../i18n/locales/fr';
import es from '../../i18n/locales/es';
import { getQuery } from 'h3';
import {
  generatePlainTextEmail,
  type ContactData,
  // type TranslationFunction,
} from '../utils/emailRenderer';

/**
 * Resolves a translation key (dot notation) for a given locale object.
 * @param localeObj The locale object (en, de, fr, es)
 * @param key The translation key, e.g. 'contactMail.admin.subject'
 * @returns The translated string or the key if not found
 */
function resolveTranslation(localeObj: Record<string, unknown>, key: string): string {
  const parts = key.split('.');
  let result: unknown = localeObj;
  for (const part of parts) {
    if (typeof result === 'object' && result !== null && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}

/**
 * Returns the translation object for a given locale code.
 * Defaults to English if not found.
 */
function getLocaleObj(locale: string): Record<string, unknown> {
  switch (locale) {
    case 'de':
      return de;
    case 'fr':
      return fr;
    case 'es':
      return es;
    default:
      return en;
  }
}

/**
 * Generates fallback HTML email for admin when template rendering fails
 */
function generateFallbackAdminEmail(contactData: ContactData, t: (key: string) => string): string {
  const esc = (v: string) => escape(v);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0A1F44 0%, #4CA1FF 100%); color: white; padding: 20px; text-align: center;">
        <h1>${t('contactMail.admin.subject')}</h1>
      </div>
      <div style="padding: 20px; background: #f8f9fa;">
        <h2>${t('contactMail.admin.contactInfo')}</h2>
        <p><strong>${t('contactMail.admin.name')}:</strong> ${esc(contactData.fullName)}</p>
        <p><strong>${t('contactMail.admin.email')}:</strong> ${esc(contactData.email)}</p>
        <p><strong>${t('contactMail.admin.company')}:</strong> ${esc(contactData.companyName || '-')}</p>
        <p><strong>${t('contactMail.admin.country')}:</strong> ${esc(contactData.country)}</p>
        <p><strong>${t('contactMail.admin.services')}:</strong> ${contactData.services.map(esc).join(', ')}</p>
        <p><strong>${t('contactMail.admin.technologies')}:</strong> ${contactData.technologies?.map(esc).join(', ') || '-'}</p>
        <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #4CA1FF;">
          <h3>${t('contactMail.admin.message')}</h3>
          <p>${esc(contactData.message).replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates fallback HTML email for user when template rendering fails
 */
function generateFallbackUserEmail(contactData: ContactData, t: (key: string) => string): string {
  const esc = (v: string) => escape(v);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0A1F44 0%, #4CA1FF 100%); color: white; padding: 20px; text-align: center;">
        <h1>AS Exim LTD</h1>
        <p>${t('contactMail.user.subtitle')}</p>
      </div>
      <div style="padding: 20px;">
        <h2>${t('contactMail.user.greeting')}, ${esc(contactData.fullName)}!</h2>
        <p>${t('contactMail.user.intro')}</p>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>${t('contactMail.user.submission')}</h3>
          <p><strong>${t('contactMail.admin.email')}:</strong> ${esc(contactData.email)}</p>
          <p><strong>${t('contactMail.admin.company')}:</strong> ${esc(contactData.companyName || '-')}</p>
          <p><strong>${t('contactMail.admin.country')}:</strong> ${esc(contactData.country)}</p>
          <p><strong>${t('contactMail.admin.services')}:</strong> ${contactData.services.join(', ')}</p>
          <p><strong>${t('contactMail.admin.technologies')}:</strong> ${contactData.technologies?.join(', ') || '-'}</p>
        </div>
        <p>${t('contactMail.user.regards')}</p>
      </div>
    </div>
  `;
}

const ContactSchema = z.object({
  fullName: z.string().min(1).max(100),
  companyName: z.string().max(100).optional(),
  email: z.string().email(),
  country: z.string().min(1).max(100),
  services: z.array(z.string().min(1).max(100)),
  technologies: z.array(z.string().min(1).max(100)).optional(),
  message: z.string().min(1).max(1000),
});

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  // Получаем и валидируем данные формы
  const body = await readBody(event);
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid form data' }));
  }
  const safe = parsed.data;
  const services = Array.isArray(safe.services) ? safe.services : [safe.services ?? ''];
  const technologies = Array.isArray(safe.technologies)
    ? safe.technologies
    : [safe.technologies ?? ''];
  const message = Array.isArray(safe.message) ? safe.message.join(', ') : safe.message;

  // Получаем куки и язык из запроса
  const cookieHeader = (event.node?.req?.headers?.['cookie'] as string | undefined) || '';
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie: string) => {
      const idx = cookie.indexOf('=');
      if (idx > -1) {
        const key = cookie.slice(0, idx).trim();
        const value = cookie.slice(idx + 1).trim();
        if (key && value) cookies[key] = decodeURIComponent(value);
      }
    });
  }
  const query = getQuery(event);
  const locale = cookies['i18n_redirected']?.split(',')[0]?.split('-')[0] || query.lang || 'en';
  const localeObj = getLocaleObj(locale as string);
  const t = (key: string) => resolveTranslation(localeObj, key);

  // Prepare contact data for email templates
  const contactData: ContactData = {
    fullName: safe.fullName,
    email: safe.email,
    companyName: safe.companyName,
    country: safe.country,
    services,
    technologies,
    message,
  };
  // const testData = {
  //   fullName: 'test user',
  //   email: 'dmytrolukianenko93@gmail.com',
  //   companyName: 'Test Company',
  //   country: 'Ukraine',
  //   services: ['Web Development', 'Mobile Apps'],
  //   message: 'Lorem ipsum message',
  // };

  // Generate beautiful HTML emails using vue-email templates
  let adminHtml: string, userHtml: string;

  try {
    const renderedEmails = await renderContactEmails(contactData, t);
    adminHtml = renderedEmails.adminHtml;
    userHtml = renderedEmails.userHtml;
  } catch (error) {
    console.error('Error rendering email templates:', error);
    // Fallback to basic HTML if template rendering fails
    adminHtml = generateFallbackAdminEmail(contactData, t);
    userHtml = generateFallbackUserEmail(contactData, t);
  }

  // Generate plain text versions
  const adminText = generatePlainTextEmail(contactData, t, true);
  const userText = generatePlainTextEmail(contactData, t, false);

  // Явно типизируем config.gmail для избежания ошибок типа unknown
  const gmail = (config.gmail ?? {}) as { user: string; pass: string; to: string };
  // Настройка транспорта nodemailer через Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmail.user,
      pass: gmail.pass,
    },
  });
  // Отправка письма админу
  try {
    await transporter.sendMail({
      from: `AS Exim message from <${gmail.user}>`,
      to: gmail.to,
      subject: t('contactMail.admin.subject'),
      html: adminHtml,
      text: adminText,
      replyTo: gmail.to,
    });
  } catch (err) {
    console.error('Error sending admin mail:', err);
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Mail sending failed' }));
  }

  // Отправка автоответа пользователю
  try {
    await transporter.sendMail({
      from: `AS Exim LTD Contact <${gmail.user}>`,
      to: contactData.email,
      subject: t('contactMail.user.subject'),
      html: userHtml,
      text: userText,
    });
  } catch (err) {
    console.error('Error sending user mail:', err);
    // Не возвращаем ошибку пользователю, чтобы не раскрывать детали
  }

  return { ok: true };
});
