export default {
  consentModal: {
    title: 'Wir verwenden Cookies',
    description:
      'Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern, personalisierte Anzeigen oder Inhalte bereitzustellen und unseren Datenverkehr zu analysieren.',
    acceptAllBtn: 'Alle akzeptieren',
    acceptNecessaryBtn: 'Alle ablehnen',
    showPreferencesBtn: 'Individuelle Präferenzen verwalten',
    footer: `
      <a href="/privacy" target="_blank">Datenschutzrichtlinie</a>
    `,
  },
  preferencesModal: {
    title: 'Cookie-Präferenzen verwalten',
    acceptAllBtn: 'Alle akzeptieren',
    acceptNecessaryBtn: 'Alle ablehnen',
    savePreferencesBtn: 'Präferenzen speichern',
    closeIconLabel: 'Modal schließen',
    serviceCounterLabel: 'Dienst|Dienste',
    sections: [
      {
        title: 'Ihre Datenschutzoptionen',
        description:
          'Hier können Sie anpassen, welche Cookies zugelassen werden. Sie können Ihre Auswahl jederzeit ändern.',
      },
      {
        title: 'Unbedingt erforderlich',
        description:
          'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich.',
        linkedCategory: 'necessary',
      },
      {
        title: 'Leistung und Analyse',
        description:
          'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
        linkedCategory: 'analytics',
        cookieTable: {
          caption: 'Cookie-Tabelle',
          headers: {
            name: 'Cookie',
            domain: 'Domain',
            desc: 'Beschreibung',
          },
          body: [],
        },
      },
      {
        title: 'Targeting und Werbung',
        description: 'Diese Cookies helfen, Anzeigen zu personalisieren.',
        linkedCategory: 'ads',
      },
      {
        title: 'Weitere Informationen',
        description:
          'Für Fragen zu unseren Cookies <a href="/contact">kontaktieren Sie uns bitte</a>.',
      },
    ],
  },
};
