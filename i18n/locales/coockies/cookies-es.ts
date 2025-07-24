export default {
  consentModal: {
    title: 'Usamos cookies',
    description:
      'Usamos cookies para mejorar tu experiencia de navegación, ofrecer anuncios o contenido personalizado y analizar nuestro tráfico.',
    acceptAllBtn: 'Aceptar todas',
    acceptNecessaryBtn: 'Rechazar todas',
    showPreferencesBtn: 'Gestionar preferencias individuales',
    footer: `
      <a href="/privacy" target="_blank">Política de privacidad</a>
    `,
  },
  preferencesModal: {
    title: 'Gestionar preferencias de cookies',
    acceptAllBtn: 'Aceptar todas',
    acceptNecessaryBtn: 'Rechazar todas',
    savePreferencesBtn: 'Guardar preferencias',
    closeIconLabel: 'Cerrar modal',
    serviceCounterLabel: 'Servicio|Servicios',
    sections: [
      {
        title: 'Tus opciones de privacidad',
        description:
          'Aquí puedes personalizar qué cookies permitir. Puedes cambiar tus opciones en cualquier momento.',
      },
      {
        title: 'Estrictamente necesarias',
        description: 'Estas cookies son esenciales para el correcto funcionamiento del sitio web.',
        linkedCategory: 'necessary',
      },
      {
        title: 'Rendimiento y análisis',
        description:
          'Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio web.',
        linkedCategory: 'analytics',
        cookieTable: {
          caption: 'Tabla de cookies',
          headers: {
            name: 'Cookie',
            domain: 'Dominio',
            desc: 'Descripción',
          },
          body: [],
        },
      },
      {
        title: 'Publicidad y segmentación',
        description: 'Estas cookies ayudan a personalizar anuncios.',
        linkedCategory: 'ads',
      },
      {
        title: 'Más información',
        description:
          'Para cualquier pregunta sobre nuestras cookies, por favor <a href="/contact">contáctanos</a>.',
      },
    ],
  },
};
