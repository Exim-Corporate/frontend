/**
 * Email Template Renderer Utility
 * Provides functions to render HTML email templates
 * Integrates with nodemailer for sending beautiful emails
 */

import escape from 'escape-html';

export interface ContactData {
  fullName: string;
  email: string;
    projectInformation: string;
    source?: string;
}

export interface TranslationFunction {
  (key: string): string;
}

/**
 * Base email styles using inline CSS for maximum email client compatibility
 * Colors aligned with project branding:
 * - Header: #000000 (black, like footer)
 * - Step numbers: #000000 background with white text
 * - Cards: #f5f7fa background (like card-bg in project)
 * - Buttons: #EBE8D2 to #CBBB97 gradient (like AppButton)
 */
const emailStyles = {
  // Outer container
  outerContainer:
    'width: 100%; max-width: 600px; margin: auto; background-color: #f5f7fa; padding: 10px 0; min-height: 100vh; display: table; table-layout: fixed;',
  emailWrapper: 'vertical-align: top; text-align: center; padding: 10px;',
  container:
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; text-align: left; display: inline-block; width: 100%;',
  
  // Header - black like footer
  header:
    'background: #121212; padding: 25px 20px; text-align: center; border-radius: 12px 12px 0 0;',
  headerTitle:
    'color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;',
  headerSubtitle: 'color: #ffffff; font-size: 14px; margin: 10px 0 0 0; font-weight: 400; opacity: 0.9;',
  
  body: 'padding: 40px 30px;',
  
  // Greeting and intro
  greeting: 'color: #000000; font-size: 18px; font-weight: 700; margin: 0 0 8px 0;',
  intro: 'color: #000000; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;',
  
  // Black divider
  divider: 'height: 1px; background-color: #000000; margin: 25px 0;',
  
  // Section title
  sectionTitle:
    'color: #000000; font-size: 18px; font-weight: 700; margin: 0 0 20px 0;',
  
  // Steps list
  stepsList: 'margin: 0;',
  stepItem:
    'margin-bottom: 12px; padding: 14px 12px; display: table; width: 100%; box-sizing: border-box; background-color: #eef2f9; border-left: 4px solid #000000; border-radius: 8px;',
  stepNumber:
    'background-color: #000000; color: #ffffff; border-radius: 50%; width: 32px; min-width: 32px; max-width: 32px; height: 32px; min-height: 32px; max-height: 32px; display: inline-block; line-height: 32px; text-align: center; font-weight: 700; font-size: 16px; vertical-align: top;',
  stepText:
    'color: #333333; font-size: 14px; line-height: 1.6; margin: 0; display: table-cell; vertical-align: top; padding-left: 12px;',
  
  // Info grid
  infoGrid:
    'background-color: #f5f7fa; border-radius: 8px; padding: 20px; text-align: left; border-left: 4px solid #000000;',
  infoItem: 'margin-bottom: 12px; padding: 0;',
  infoLabel: 'font-weight: 700; color: #000000; display: inline-block;',
  infoValue: 'color: #666666; margin-left: 8px;',
  
  // Button
  button:
    'background-color: #000000; color: #EBE8D2; padding: 15px 24px; text-decoration: none; border-radius: 8px; display: block; width: 100%; box-sizing: border-box; font-weight: 600; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18); font-size: 16px; text-align: center; letter-spacing: 0.01em; margin: 0 0 12px 0;',
  buttonGroup: 'width: 100%; margin: 25px 0;',
  
  footer:
    'background-color: #f5f7fa; padding: 15px 15px; text-align: center; border-top: 1px solid #e5e7eb;',
  footerText: 'color: #666666; font-size: 13px; margin: 5px 0;',
  
  priority:
    'background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0; color: #dc2626;',
};

const esc = (value: string): string => escape(value);
const nl2br = (value: string): string => esc(value).replace(/\n/g, '<br>');
const formatHeaderTitle = (title: string): string =>
  esc(title).replace(/\s+(AS\s*Exim\s*LTD)\b/i, '<br>$1');

/**
 * Generates admin contact notification email HTML
 */
export function renderAdminContactEmail(contactData: ContactData, t: TranslationFunction): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('contactMail.admin.subject')}</title>
    <style>
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; margin: 0 !important; }
            .email-wrapper { padding: 10px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <div style="${emailStyles.outerContainer}">
        <div style="${emailStyles.emailWrapper}">
            <div class="email-container" style="${emailStyles.container}">
                <!-- Header - Black like footer -->
                <div style="${emailStyles.header}">
                  <h1 style="${emailStyles.headerTitle}">${formatHeaderTitle(t('contactMail.admin.subject'))}</h1>
                </div>
                
                <!-- Body -->
                <div style="${emailStyles.body}">
                    <!-- Priority Notice -->
                    <div style="${emailStyles.priority}">
                        <strong>⚡ ${t('contactMail.admin.priority')}</strong>
                    </div>
                    
                    <!-- Greeting -->
                    <p style="${emailStyles.greeting}">${t('contactMail.admin.greeting')},</p>
                    <p style="${emailStyles.intro}">${t('contactMail.admin.intro')}</p>
                    
                    <!-- Black Divider -->
                    <div style="${emailStyles.divider}"></div>
                    
                    <!-- Contact Information -->
                    <h2 style="${emailStyles.sectionTitle}">${t('contactMail.admin.contactInfo')}</h2>
                    <div style="${emailStyles.infoGrid}">
                        <div style="${emailStyles.infoItem}">
                            <span style="${emailStyles.infoLabel}">${t('contactMail.admin.name')}:</span>
                            <span style="${emailStyles.infoValue}">${esc(contactData.fullName)}</span>
                        </div>
                        <div style="${emailStyles.infoItem}">
                            <span style="${emailStyles.infoLabel}">${t('contactMail.admin.email')}:</span>
                            <span style="${emailStyles.infoValue}">${esc(contactData.email)}</span>
                        </div>
                        <div style="${emailStyles.infoItem}">
                            <span style="${emailStyles.infoLabel}">${t('contactMail.admin.message')}:</span>
                            <span style="${emailStyles.infoValue}">${nl2br(contactData.projectInformation)}</span>
                        </div>
                    </div>
                    
                    <!-- Action Button -->
                    <div style="${emailStyles.buttonGroup}">
                      <a href="mailto:${esc(contactData.email)}" style="${emailStyles.button}; margin-bottom: 0;">
                            📧 ${t('contactMail.admin.replyButton')}
                        </a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="${emailStyles.footer}">
                    <p style="${emailStyles.footerText}">${t('contactMail.admin.footerText')}</p>
                    <p style="${emailStyles.footerText}">${t('contactMail.admin.regards').replace('\\n', '<br>')}</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Generates user contact confirmation email HTML
 */
export function renderUserContactEmail(contactData: ContactData, t: TranslationFunction): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('contactMail.user.subject')}</title>
    <style>
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; margin: 0 !important; }
            .email-wrapper { padding: 10px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <div style="${emailStyles.outerContainer}">
        <div style="${emailStyles.emailWrapper}">
            <div class="email-container" style="${emailStyles.container}">
                <!-- Header - Black like footer -->
                <div style="${emailStyles.header}">
                  <h1 style="${emailStyles.headerTitle}">${formatHeaderTitle(t('contactMail.user.subject'))}</h1>
                </div>
                
                <!-- Body -->
                <div style="${emailStyles.body}">
                    <!-- Greeting -->
                    <p style="${emailStyles.greeting}">${t('contactMail.user.greeting')}, ${esc(contactData.fullName)}!</p>
                    <p style="${emailStyles.intro}">${t('contactMail.user.intro')}</p>
                    
                    <!-- Black Divider -->
                    <div style="${emailStyles.divider}"></div>
                    
                    <!-- What's Next Section -->
                    <h2 style="${emailStyles.sectionTitle}">🚀 ${t('contactMail.user.whatsNext')}</h2>
                    <div style="${emailStyles.stepsList}">
                        <div style="${emailStyles.stepItem}">
                            <span style="${emailStyles.stepNumber}">1</span>
                            <span style="${emailStyles.stepText}">${t('contactMail.user.step1')}</span>
                        </div>
                        <div style="${emailStyles.stepItem}">
                            <span style="${emailStyles.stepNumber}">2</span>
                            <span style="${emailStyles.stepText}">${t('contactMail.user.step2')}</span>
                        </div>
                        <div style="${emailStyles.stepItem}">
                            <span style="${emailStyles.stepNumber}">3</span>
                            <span style="${emailStyles.stepText}">${t('contactMail.user.step3')}</span>
                        </div>
                    </div>
                    
                    <!-- Response Time Info (only once) -->
                    <div style="${emailStyles.divider}"></div>
                    
                    <!-- Submission Summary -->
                    <h2 style="${emailStyles.sectionTitle}">${t('contactMail.user.submission')}</h2>
                    <div style="${emailStyles.infoGrid}">
                    <div style="${emailStyles.infoItem}">
                    <span style="${emailStyles.infoLabel}">${t('contactMail.admin.email')}:</span>
                    <span style="${emailStyles.infoValue}">${esc(contactData.email)}</span>
                    </div>
                    <div style="${emailStyles.infoItem}">
                    <span style="${emailStyles.infoLabel}">${t('contactMail.admin.message')}:</span>
                    <span style="${emailStyles.infoValue}">${nl2br(contactData.projectInformation)}</span>
                    </div>
                    </div>

                    <p style="${emailStyles.intro}">
                        ${t('contactMail.user.responseTimeDetails')}
                    </p>
                    
                    <!-- Action Buttons -->
                    <div style="${emailStyles.buttonGroup}">
                        <a href="https://www.exim.eu.com/" style="${emailStyles.button}">
                            🌐 ${t('contactMail.user.visitWebsite')}
                        </a>
                      <a href="https://www.linkedin.com/company/as-exim-cyprus" style="${emailStyles.button}; margin-bottom: 0;">
                            💼 ${t('contactMail.user.followUs')}
                        </a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="${emailStyles.footer}">
                    <p style="${emailStyles.footerText}">${t('contactMail.user.regards').replace('\\n', '<br>')}</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Generates both admin and user email HTML
 */
export async function renderContactEmails(
  contactData: ContactData,
  t: TranslationFunction,
): Promise<{ adminHtml: string; userHtml: string }> {
  try {
    const adminHtml = renderAdminContactEmail(contactData, t);
    const userHtml = renderUserContactEmail(contactData, t);

    return { adminHtml, userHtml };
  } catch (error) {
    console.error('Error rendering contact emails:', error);
    throw new Error('Failed to render email templates');
  }
}

/**
 * Generates fallback plain text content for emails
 */
export function generatePlainTextEmail(
  contactData: ContactData,
  t: TranslationFunction,
  isAdmin: boolean = false,
): string {
  if (isAdmin) {
    return `
${t('contactMail.admin.subject')}

${t('contactMail.admin.intro')}

${t('contactMail.admin.contactInfo')}:
${t('contactMail.admin.name')}: ${contactData.fullName}
${t('contactMail.admin.email')}: ${contactData.email}
${t('contactMail.admin.message')}:
${contactData.projectInformation}

${t('contactMail.admin.regards')}
    `.trim();
  } else {
    return `
${t('contactMail.user.greeting')}, ${contactData.fullName}!

${t('contactMail.user.intro')}

${t('contactMail.user.whatsNext')}:
1. ${t('contactMail.user.step1')}
2. ${t('contactMail.user.step2')}
3. ${t('contactMail.user.step3')}

${t('contactMail.user.submission')}:
${t('contactMail.admin.email')}: ${contactData.email}
${t('contactMail.admin.message')}:
${contactData.projectInformation}

${t('contactMail.user.regards')}
    `.trim();
  }
}
