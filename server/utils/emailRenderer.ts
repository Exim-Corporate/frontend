/**
 * Email Template Renderer Utility
 * Provides functions to render HTML email templates
 * Integrates with nodemailer for sending beautiful emails
 */

export interface ContactData {
  fullName: string;
  email: string;
  companyName?: string;
  country: string;
  services: string[];
  technologies?: string[];
  message: string;
}

export interface TranslationFunction {
  (key: string): string;
}

/**
 * Base email styles using inline CSS for maximum email client compatibility
 */
const emailStyles = {
  // Outer container for centering the email on large screens
  outerContainer:
    'width: 100%; max-width: 600px; margin: auto; background-color: #f3f4f6; padding: 20px 0; min-height: 100vh; display: table; table-layout: fixed;',
  // Main email wrapper for proper centering
  emailWrapper: 'display: table-cell; vertical-align: top; text-align: center; padding: 20px;',
  // Inner container with max width and centering
  container:
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; text-align: left; display: inline-block; width: 100%;',
  header:
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; border-radius: 8px; text-align: center;',
  headerTitle:
    'color: #ffffff; font-size: 34px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);',
  headerSubtitle: 'color: #e0e7ff; font-size: 16px; margin: 10px 0 0 0; font-weight: 400;',
  body: 'padding: 40px 30px;',
  section: 'margin-bottom: 30px; text-align: start',
  sectionTitle:
    'color: #374151; font-size: 20px; font-weight: 600; margin: 0 0 15px 0; border-bottom: 2px solid #f4f8ff; padding-bottom: 8px;',
  text: 'color: #4b5563; font-size: 16px; margin: 0 0 15px 0;',
  infoGrid:
    'background-color: #f9fafb; border-radius: 12px; padding: 25px; text-align: left; border-left: 4px solid #667eea;',
  infoItem: 'margin-bottom: 12px; padding: 8px 0;',
  infoLabel: 'font-weight: 600; color: #374151; display: inline-block; min-width: 120px;',
  infoValue: 'color: #6b7280;',
  messageBox:
    'background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #10b981;',
  stepsList: 'background-color: #c9d6fb; border-radius: 12px; padding: 25px; margin: 20px 0;',
  stepItem: 'margin: 5px 0; padding: 5px 0; border-bottom: 1px solid #3434367a;',
  stepNumber:
    'background-color: #4459ef; color: #ffffff; border-radius: 50%; width: 26px; height: 26px; display: inline-block; text-align: center; line-height: 26px; margin-right: 12px; font-weight: 600; font-size: 14px; vertical-align: middle;',
  button:
    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);',
  footer:
    'background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;',
  footerText: 'color: #6b7280; font-size: 14px; margin: 5px 0;',
  priority:
    'background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0; color: #dc2626;',
};

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
                <!-- Header -->
                <div style="${emailStyles.header}">
                    <h1 style="${emailStyles.headerTitle}">${t('contactMail.admin.subject')}</h1>
                    <p style="${emailStyles.headerSubtitle}">${t('contactMail.admin.subtitle')}</p>
                </div>
                
                <!-- Body -->
                <div style="${emailStyles.body}">
                    <!-- Priority Notice -->
                    <div style="${emailStyles.priority}">
                        <strong>⚡ ${t('contactMail.admin.priority')}</strong>
                    </div>
                    
                    <!-- Greeting -->
                    <p style="${emailStyles.text}">${t('contactMail.admin.greeting')},</p>
                    <p style="${emailStyles.text}"><strong>${t('contactMail.admin.intro')}</strong></p>
                    
                    <!-- Contact Information -->
                    <div style="${emailStyles.section}">
                        <h2 style="${emailStyles.sectionTitle}">${t('contactMail.admin.contactInfo')}</h2>
                        <div style="${emailStyles.infoGrid}">
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.name')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.fullName}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.email')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.email}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.company')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.companyName || '-'}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.country')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.country}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.services')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.services.join(', ')}</span>
                            </div>
                            ${
                              contactData.technologies?.length
                                ? `
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.technologies')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.technologies.join(', ')}</span>
                            </div>
                            `
                                : ''
                            }
                        </div>
                    </div>
                    
                    <!-- Project Requirements -->
                    <div style="${emailStyles.section}">
                        <h2 style="${emailStyles.sectionTitle}">${t('contactMail.admin.message')}</h2>
                        <div style="${emailStyles.messageBox}">
                            <p style="margin: 0; color: #374151; line-height: 1.6;">${contactData.message.replace(/\n/g, '<br>')}</p>
                        </div>
                    </div>
                    
                    <!-- Action Button -->
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="mailto:${contactData.email}" style="${emailStyles.button}">
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
                <!-- Header -->
                <div style="${emailStyles.header}">
                    <h1 style="${emailStyles.headerTitle}">${t('contactMail.user.subject')}</h1>
                    <p style="${emailStyles.headerSubtitle}">${t('contactMail.user.subtitle')}</p>
                </div>
                
                <!-- Body -->
                <div style="${emailStyles.body}">
                    <!-- Greeting -->
                    <p style="${emailStyles.text}"><strong>${t('contactMail.user.greeting')}, ${contactData.fullName}!</strong></p>
                    <p style="${emailStyles.text}">${t('contactMail.user.intro')}</p>
                    
                    <!-- What's Next Section -->
                    <div style="${emailStyles.section}">
                        <h2 style="${emailStyles.sectionTitle}">🚀 ${t('contactMail.user.whatsNext')}</h2>
                        <div style="${emailStyles.stepsList}">
                            <div style="${emailStyles.stepItem}">
                                <span style="${emailStyles.stepNumber}">1</span>
                                ${t('contactMail.user.step1')}
                            </div>
                            <div style="${emailStyles.stepItem}">
                                <span style="${emailStyles.stepNumber}">2</span>
                                ${t('contactMail.user.step2')}
                            </div>
                            <div style="${emailStyles.stepItem}; border-bottom: none;">
                                <span style="${emailStyles.stepNumber}">3</span>
                                ${t('contactMail.user.step3')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Response Time -->
                    <div style="${emailStyles.section}">
                        <h2 style="${emailStyles.sectionTitle}">⚡ ${t('contactMail.user.responseTime')}</h2>
                        <p style="${emailStyles.text}">${t('contactMail.user.responseTimeDetails')}</p>
                    </div>
                    
                    <!-- Submission Summary -->
                    <div style="${emailStyles.section}">
                        <h2 style="${emailStyles.sectionTitle}">${t('contactMail.user.submission')}</h2>
                        <div style="${emailStyles.infoGrid}">
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.email')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.email}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.company')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.companyName || '-'}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.country')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.country}</span>
                            </div>
                            <div style="${emailStyles.infoItem}">
                                <span style="${emailStyles.infoLabel}">${t('contactMail.admin.services')}:</span>
                                <span style="${emailStyles.infoValue}">${contactData.services.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Personal Note -->
                    <div style="${emailStyles.messageBox}">
                        <p style="margin: 0; color: #374151; font-style: italic;">
                            💼 ${t('contactMail.user.personalNote')}
                        </p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="text-align: center; margin: 30px auto; width: 300px">
                        <a href="https://www.exim.eu.com/" style="${emailStyles.button}; width: -webkit-fill-available">
                            🌐 ${t('contactMail.user.visitWebsite')}
                        </a>
                        <a href="https://www.linkedin.com/company/as-exim/" style="${emailStyles.button}; width: -webkit-fill-available">
                            💼 ${t('contactMail.user.followUs')}
                        </a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="${emailStyles.footer}">
                    <p style="${emailStyles.footerText}">${t('contactMail.user.teamSignature')}</p>
                    <p style="${emailStyles.footerText}">${t('contactMail.user.footerText')}</p>
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
${t('contactMail.admin.company')}: ${contactData.companyName || '-'}
${t('contactMail.admin.country')}: ${contactData.country}
${t('contactMail.admin.services')}: ${contactData.services.join(', ')}
${t('contactMail.admin.technologies')}: ${contactData.technologies?.join(', ') || '-'}

${t('contactMail.admin.message')}:
${contactData.message}

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
${t('contactMail.admin.company')}: ${contactData.companyName || '-'}
${t('contactMail.admin.country')}: ${contactData.country}
${t('contactMail.admin.services')}: ${contactData.services.join(', ')}
${t('contactMail.admin.technologies')}: ${contactData.technologies?.join(', ') || '-'}

${t('contactMail.admin.message')}:
${contactData.message}

${t('contactMail.user.regards')}
    `.trim();
  }
}
