export default {
  consentModal: {
    title: 'We use cookies',
    description:
      'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.',
    acceptAllBtn: 'Accept all',
    acceptNecessaryBtn: 'Reject all',
    showPreferencesBtn: 'Manage individual preferences',
    footer: `
      <a href="/privacy" target="_blank">Privacy Policy</a>
    `,
  },
  preferencesModal: {
    title: 'Manage cookie preferences',
    acceptAllBtn: 'Accept all',
    acceptNecessaryBtn: 'Reject all',
    savePreferencesBtn: 'Save preferences',
    closeIconLabel: 'Close modal',
    serviceCounterLabel: 'Service|Services',
    sections: [
      {
        title: 'Your Privacy Choices',
        description:
          'Here you can customize which cookies to allow. You can change your choices anytime.',
      },
      {
        title: 'Strictly Necessary',
        description: 'These cookies are essential for the proper functioning of the website.',
        linkedCategory: 'necessary',
      },
      {
        title: 'Performance and Analytics',
        description: 'These cookies help us understand how visitors interact with the website.',
        linkedCategory: 'analytics',
        cookieTable: {
          caption: 'Cookie table',
          headers: {
            name: 'Cookie',
            domain: 'Domain',
            desc: 'Description',
          },
          body: [],
        },
      },
      {
        title: 'Targeting and Advertising',
        description: 'These cookies help personalize ads.',
        linkedCategory: 'ads',
      },
      {
        title: 'More information',
        description:
          'For any questions about our cookies, please <a href="/contact">contact us</a>.',
      },
    ],
  },
};
