/**
 * Referral Email Template Renderer
 * Mirrors the style and API of `emailRenderer.ts` but with referral-specific copy
 */
import escape from 'escape-html';
import type { ContactData, TranslationFunction } from './emailRenderer';

export type ReferralData = {
  company?: string;
  referredCompany?: string;
  companySize?: string;
  referralContactName?: string;
  referralContactEmail?: string;
  privacyPolicyAccepted?: boolean;
} & ContactData;

const emailStyles = {
  outerContainer:
    'width: 100%; max-width: 600px; margin: auto; background-color: #f3f4f6; padding: 20px 0; min-height: 100vh; display: table; table-layout: fixed;',
  emailWrapper: 'vertical-align: top; text-align: center; padding: 20px;',
  container:
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; text-align: left; display: inline-block; width: 100%;',
  header:
    'background: linear-gradient(135deg, #0A1F44 0%, #4CA1FF 100%); padding: 30px 20px; border-radius: 8px; text-align: center;',
  headerTitle: 'color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;',
  headerSubtitle: 'color: #e0e7ff; font-size: 14px; margin: 8px 0 0 0;',
  body: 'padding: 30px 24px;',
  section: 'margin-bottom: 20px; text-align: start',
  sectionTitle: 'color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;',
  text: 'color: #4b5563; font-size: 15px; margin: 0 0 12px 0;',
  infoGrid:
    'background-color: #f9fafb; border-radius: 12px; padding: 18px; text-align: left; border-left: 4px solid #0A1F44;',
  infoItem: 'margin-bottom: 10px; padding: 6px 0;',
  infoLabel: 'font-weight: 600; color: #374151; display: inline-block; min-width: 140px;',
  infoValue: 'color: #6b7280;',
  messageBox:
    'background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #10b981;',
  button:
    'background: linear-gradient(135deg, #0A1F44 0%, #4CA1FF 100%); color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;',
  footer:
    'background-color: #f9fafb; padding: 20px 16px; text-align: center; border-top: 1px solid #e5e7eb;',
  footerText: 'color: #6b7280; font-size: 13px; margin: 4px 0;',
};

function esc(v?: string) {
  return escape(v ?? '-');
}

export function renderAdminReferralEmail(data: ReferralData, t: TranslationFunction): string {
  // Admin email: use translations for labels so they match the form inputs exactly
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New referral request</title>
</head>
<body style="margin:0;padding:0;">
  <div style="${emailStyles.outerContainer}">
    <div style="${emailStyles.emailWrapper}">
      <div style="${emailStyles.container}">
        <div style="${emailStyles.header}">
          <h1 style="${emailStyles.headerTitle}">New referral request</h1>
          <p style="${emailStyles.headerSubtitle}">Referral Program Notification</p>
        </div>
        <div style="${emailStyles.body}">
          <p style="${emailStyles.text}"><strong>${t('referralMail.admin.intro') || 'A new referral was submitted on the website. See details below.'}</strong></p>

          <div style="${emailStyles.section}">
            <h2 style="${emailStyles.sectionTitle}">${t('referralMail.admin.contactInfo') || 'Referral Details'}</h2>
            <div style="${emailStyles.infoGrid}">
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.full_name') || 'full_name:'}</span>
                <span style="${emailStyles.infoValue}">${esc(data.fullName)}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.email') || 'email:'}</span>
                <span style="${emailStyles.infoValue}">${esc(data.email)}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.company') || 'company:'}</span>
                <span style="${emailStyles.infoValue}">${esc(data.companyName || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.referred_company') || 'referred_company:'}</span>
                <span style="${emailStyles.infoValue}">${esc(data.referredCompany || data.companyName || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.company_size_label') || 'company_size:'}</span>
                <span style="${emailStyles.infoValue}">${esc(data.companySize || data.country || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.contact_name') || 'contact_name:'}</span>
                <span style="${emailStyles.infoValue}">${esc(data.referralContactName || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.contact_email') || 'contact_email:'}</span>
                <span style="${emailStyles.infoValue}">${data.referralContactEmail ? `<a href="mailto:${esc(data.referralContactEmail)}">${esc(data.referralContactEmail)}</a>` : '-'}</span>
              </div>
            </div>
          </div>

          <div style="${emailStyles.section}">
            <h2 style="${emailStyles.sectionTitle}">${t('referrals.form.message') || 'Message'}</h2>
            <div style="${emailStyles.messageBox}">
              <p style="margin:0;color:#374151;line-height:1.6;">${(data.message || '').replace(/\n/g, '<br>') || t('referrals.form.additional_information_label') || ''}</p>
            </div>
          </div>

          <div style="text-align:center;margin:18px 0;">
            <a href="mailto:${esc(data.email)}" style="${emailStyles.button}">📧 Reply to referrer</a>
          </div>

        </div>

        <div style="${emailStyles.footer}">
          <p style="${emailStyles.footerText}">You are receiving this message because a referral was submitted.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function renderUserReferralEmail(data: ReferralData, t: TranslationFunction): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t('referralMail.user.subject')}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: 0 !important; }
      .email-wrapper { padding: 10px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;">
  <div style="${emailStyles.outerContainer}">
    <div style="${emailStyles.emailWrapper}">
      <div class="email-container" style="${emailStyles.container}">
        <div style="${emailStyles.header}">
          <h1 style="${emailStyles.headerTitle}">${t('referralMail.user.subject')}</h1>
          <p style="${emailStyles.headerSubtitle}">${t('referralMail.user.subtitle')}</p>
        </div>

        <div style="${emailStyles.body}">
          <p style="${emailStyles.text}"><strong>${t('referralMail.user.greeting')}, ${esc(data.fullName)}!</strong></p>
          <p style="${emailStyles.text}">${t('referralMail.user.intro')}</p>

          <div style="${emailStyles.section}">
            <h2 style="${emailStyles.sectionTitle}">${t('referralMail.user.submission')}</h2>
            <div style="${emailStyles.infoGrid}">
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.full_name') || 'full_name'}:</span>
                <span style="${emailStyles.infoValue}">${esc(data.fullName)}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.email') || 'email'}:</span>
                <span style="${emailStyles.infoValue}">${esc(data.email)}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.company') || 'company'}:</span>
                <span style="${emailStyles.infoValue}">${esc(data.company || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.referred_company') || 'referred_company'}:</span>
                <span style="${emailStyles.infoValue}">${esc(data.referredCompany || data.companyName || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.company_size_label') || 'company_size'}:</span>
                <span style="${emailStyles.infoValue}">${esc(data.companySize || data.country || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.contact_name') || 'contact_name'}:</span>
                <span style="${emailStyles.infoValue}">${esc(data.referralContactName || '-')}</span>
              </div>
              <div style="${emailStyles.infoItem}">
                <span style="${emailStyles.infoLabel}">${t('referrals.form.contact_email') || 'contact_email'}:</span>
                <span style="${emailStyles.infoValue}">${data.referralContactEmail ? `(${esc(data.referralContactEmail)})` : '-'}</span>
              </div>
            </div>
          </div>

          <div style="${emailStyles.section}">
            <h2 style="${emailStyles.sectionTitle}">${t('referrals.form.message') || 'Message'}</h2>
            <div style="${emailStyles.messageBox}">
              <p style="margin:0;color:#374151;line-height:1.6;">${(data.message || '').replace(/\n/g, '<br>') || t('referrals.form.additional_information_label') || ''}</p>
            </div>
          </div>

          <div style="${emailStyles.section}">
            <h2 style="${emailStyles.sectionTitle}">⚡ ${t('referralMail.user.whatNext')}</h2>
            <p style="${emailStyles.text}">${t('referralMail.user.nextStep')}</p>
          </div>

          <div style="${emailStyles.messageBox}">
            <p style="margin:0;color:#374151;font-style:italic;">${t('referralMail.user.personalNote')}</p>
          </div>

        </div>

        <div style="${emailStyles.footer}">
          <p style="${emailStyles.footerText}">${t('referralMail.user.footerText') || 'Best regards, The AS Exim Team'}</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function renderReferralEmails(
  data: ReferralData,
  t: TranslationFunction,
): Promise<{ adminHtml: string; userHtml: string }> {
  try {
    const adminHtml = renderAdminReferralEmail(data, t);
    const userHtml = renderUserReferralEmail(data, t);
    return { adminHtml, userHtml };
  } catch (err) {
    console.error('Error rendering referral emails:', err);
    throw new Error('Failed to render referral emails');
  }
}

export function generatePlainTextReferralEmail(
  data: ReferralData,
  t: TranslationFunction,
  isAdmin = false,
): string {
  if (isAdmin) {
    return `
${t('referralMail.admin.subject') || 'New referral request'}

${t('referralMail.admin.subtitle') || 'Referral Program Notification'}

${t('referralMail.admin.intro') || 'A new referral was submitted on the website. See details below.'}

${t('referralMail.admin.contactInfo') || 'Referral Details'}
${t('referrals.form.full_name') || 'full_name'}: ${data.fullName}
${t('referrals.form.email') || 'email'}: ${data.email}
${t('referrals.form.company') || 'company'}: ${data.companyName || '-'}
${t('referrals.form.referred_company') || 'referred_company'}: ${data.referredCompany || data.companyName || '-'}
${t('referrals.form.company_size_label') || 'company_size'}: ${data.companySize || data.country || '-'}
${t('referrals.form.contact_name') || 'contact_name'}: ${data.referralContactName || '-'}
${t('referrals.form.contact_email') || 'contact_email'}: ${data.referralContactEmail || ''}
${t('referrals.form.privacy_policy_agreement') || 'privacy_policy_accepted'}: ${data.privacyPolicyAccepted ? 'true' : 'false'}
${t('referrals.form.message') || 'Message'}
${data.message || '-'}

${t('referralMail.admin.footerText') || 'Notes (optional)'}

`.trim();
  }

  return `
Hello, ${data.fullName}!

${t('referralMail.user.intro') || 'We have received your referral request. Our team will review it and contact you within 24 hours.'}

${t('referralMail.user.submission') || 'Referral summary'}
${t('referrals.form.referred_company') || 'referred_company'}: ${data.referredCompany || data.companyName || '-'}
${t('referrals.form.company_size_label') || 'company_size'}: ${data.companySize || data.country || '-'}
${t('referrals.form.contact_name') || 'contact_name'}: ${data.referralContactName || '-'}
${t('referrals.form.contact_email') || 'contact_email'}: ${data.referralContactEmail ? `(${data.referralContactEmail})` : '-'}

${t('referralMail.user.whatNext') || 'What happens next'}
${t('referralMail.user.nextStep') || 'Our team will evaluate the referral and reach out to you within 24 hours to discuss next steps.'}

${t('referralMail.user.personalNote') || 'If you have any additional information, reply to this message.'}
`.trim();
}
