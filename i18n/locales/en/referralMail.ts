const referralMail = {
  admin: {
    subject: 'New referral request',
    subtitle: 'Referral Program Notification',
    intro: 'A new referral was submitted on the website. See details below.',
    contactInfo: 'Referral Details',
    referrerName: 'Referrer name',
    referrerEmail: 'Referrer email',
    referredCompany: 'Referred company',
    companySize: 'Company size',
    referralContact: 'Referral contact',
    privacy: 'Privacy accepted',
    yes: 'Yes',
    no: 'No',
    message: 'Message',
    replyButton: 'Reply to referrer',
    footerText: 'You are receiving this message because a referral was submitted.',
  },
  user: {
    subject: 'We received your referral',
    subtitle: 'Thank you for referring a company to us',
    greeting: 'Hello',
    intro:
      'We have received your referral request. Our team will review it and contact you within 24 hours.',
    submission: 'Referral summary',
    whatNext: 'What happens next',
    nextStep:
      'Our team will evaluate the referral and reach out to you within 24 hours to discuss next steps.',
    personalNote: 'If you have any additional information, reply to this message.',
    footerText: 'Best regards, The AS Exim Team',
  },
};

export default referralMail;
