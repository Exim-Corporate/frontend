export default {
  consentModal: {
    title: 'Nous utilisons des cookies',
    description:
      'Nous utilisons des cookies pour améliorer votre expérience de navigation, proposer des publicités ou du contenu personnalisés et analyser notre trafic.',
    acceptAllBtn: 'Tout accepter',
    acceptNecessaryBtn: 'Tout refuser',
    showPreferencesBtn: 'Gérer les préférences individuelles',
    footer: `
      <a href="/privacy" target="_blank">Politique de confidentialité</a>
    `,
  },
  preferencesModal: {
    title: 'Gérer les préférences des cookies',
    acceptAllBtn: 'Tout accepter',
    acceptNecessaryBtn: 'Tout refuser',
    savePreferencesBtn: 'Enregistrer les préférences',
    closeIconLabel: 'Fermer la modale',
    serviceCounterLabel: 'Service|Services',
    sections: [
      {
        title: 'Vos choix de confidentialité',
        description:
          'Ici, vous pouvez personnaliser les cookies à autoriser. Vous pouvez modifier vos choix à tout moment.',
      },
      {
        title: 'Strictement nécessaires',
        description: 'Ces cookies sont essentiels au bon fonctionnement du site web.',
        linkedCategory: 'necessary',
      },
      {
        title: 'Performance et analyse',
        description:
          'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site web.',
        linkedCategory: 'analytics',
        cookieTable: {
          caption: 'Tableau des cookies',
          headers: {
            name: 'Cookie',
            domain: 'Domaine',
            desc: 'Description',
          },
          body: [],
        },
      },
      {
        title: 'Ciblage et publicité',
        description: 'Ces cookies permettent de personnaliser les publicités.',
        linkedCategory: 'ads',
      },
      {
        title: 'Plus d’informations',
        description:
          'Pour toute question concernant nos cookies, veuillez <a href="/contact">nous contacter</a>.',
      },
    ],
  },
};
