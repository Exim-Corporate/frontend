import { defineEventHandler, readBody, sendError, createError, getQuery } from 'h3';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import escape from 'escape-html';
import en from '../../i18n/locales/en';
import de from '../../i18n/locales/de';
import fr from '../../i18n/locales/fr';
import es from '../../i18n/locales/es';
import DOMPurify from 'isomorphic-dompurify';
import {
  renderReferralEmails,
  generatePlainTextReferralEmail,
} from '../utils/referralEmailRenderer';
import type { ContactData } from '../utils/emailRenderer';
import type { ReferralData } from '../utils/referralEmailRenderer';

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

// Simple fallback HTML generators if renderContactEmails fails
function fallbackAdminHtml(data: ContactData, t: (k: string) => string) {
  const esc = (v: string) => escape(v);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>${t('contactMail.admin.subject')}</h1>
      <p>${t('contactMail.admin.intro')}</p>
      <p><strong>${t('contactMail.admin.name')}:</strong> ${esc(data.fullName)}</p>
      <p><strong>${t('contactMail.admin.email')}:</strong> ${esc(data.email)}</p>
      <p><strong>${t('contactMail.admin.company')}:</strong> ${esc(data.companyName || '-')}</p>
      <p><strong>${t('contactMail.admin.country')}:</strong> ${esc(data.country)}</p>
      <p><strong>${t('contactMail.admin.services')}:</strong> ${esc(data.services.join(', '))}</p>
      <div>
        <h3>${t('contactMail.admin.message')}</h3>
        <p>${esc(data.message).replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  `;
}

function fallbackUserHtml(data: ContactData, t: (k: string) => string) {
  const esc = (v: string) => escape(v);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>${t('contactMail.user.subject')}</h1>
      <p>${t('contactMail.user.intro')}</p>
      <p>${t('contactMail.user.greeting')}, ${esc(data.fullName)}!</p>
      <div>
        <h3>${t('contactMail.user.submission')}</h3>
        <p><strong>${t('contactMail.admin.email')}:</strong> ${esc(data.email)}</p>
        <p><strong>${t('contactMail.admin.company')}:</strong> ${esc(data.companyName || '-')}</p>
      </div>
    </div>
  `;
}

const ReferralSchema = z.object({
  fullName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  referredCompany: z.string().min(1).max(200),
  companySize: z.string().max(50).optional(),
  contactName: z.string().min(1).max(100),
  contactEmail: z.string().email(),
  message: z.string().max(2000).optional(),
  privacyPolicyAccepted: z.boolean().refine(v => v === true, { message: 'privacy_required' }),
});

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const parsed = ReferralSchema.safeParse(body);
  if (!parsed.success) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid payload' }));
  }

  const safe = parsed.data;

  // Sanitize user-supplied strings to prevent XSS
  const sanitize = (val?: string) =>
    DOMPurify.sanitize(val ?? '', { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

  const sFullName = sanitize(safe.fullName);
  const sEmail = sanitize(safe.email);
  const sReferredCompany = sanitize(safe.referredCompany);
  const sCompanySize = sanitize(safe.companySize || '');
  const sContactName = sanitize(safe.contactName);
  const sContactEmail = sanitize(safe.contactEmail);
  const sMessage = sanitize(safe.message || '');

  // determine locale from cookie or query (same approach as contact.post)
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

  // Build ContactData expected by emailRenderer (map referral fields into contact shape)
  const servicesArr = [
    `Referred: ${sReferredCompany}`,
    `Referral contact: ${sContactName} <${sContactEmail}>`,
  ];
  const composedMessage = `Referred Company: ${sReferredCompany}\nCompany size: ${sCompanySize || '-'}\nContact: ${sContactName} <${sContactEmail}>\n\n${sMessage || ''}`;

  const contactData: ContactData = {
    fullName: sFullName,
    email: sEmail,
    companyName: sReferredCompany,
    country: sCompanySize || '-',
    services: servicesArr,
    technologies: [],
    message: composedMessage,
  };

  // Build referral-shaped data for the referral renderer
  const referralData: ReferralData = {
    ...contactData,
    referredCompany: sReferredCompany,
    companySize: sCompanySize,
    referralContactName: sContactName,
    referralContactEmail: sContactEmail,
    privacyPolicyAccepted: !!safe.privacyPolicyAccepted,
  };

  // Render emails (admin + user) using emailRenderer
  let adminHtml: string;
  let userHtml: string;
  try {
    const rendered = await renderReferralEmails(referralData, t);
    adminHtml = rendered.adminHtml;
    userHtml = rendered.userHtml;
  } catch (err) {
    console.error('Failed to render referral emails, using fallback', err);
    adminHtml = fallbackAdminHtml(contactData, t);
    userHtml = fallbackUserHtml(contactData, t);
  }

  const adminText = generatePlainTextReferralEmail(referralData, t, true);
  const userText = generatePlainTextReferralEmail(referralData, t, false);

  const config = useRuntimeConfig();
  const gmail = (config.gmail ?? {}) as { user: string; pass: string; to: string };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmail.user, pass: gmail.pass },
  });

  try {
    await transporter.sendMail({
      from: `AS Exim message from <${gmail.user}>`,
      to: gmail.to,
      subject: t('referralMail.admin.subject'),
      html: adminHtml,
      text: adminText,
      replyTo: gmail.to,
    });
  } catch (err) {
    console.error('Error sending admin mail:', err);
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Mail sending failed' }));
  }

  try {
    await transporter.sendMail({
      from: `AS Exim LTD Contact <${gmail.user}>`,
      to: contactData.email,
      subject: t('referralMail.user.subject'),
      html: userHtml,
      text: userText,
    });
  } catch (err) {
    console.error('Error sending user mail:', err);
    // do not block the response for user-mail errors
  }

  return { ok: true };
});
