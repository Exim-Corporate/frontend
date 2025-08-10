// import legalTranslations from './legal-en';

export default {
  navigation: {
    blog: 'Blog',
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    contact: 'Contacto',
    faq: 'FAQ',
  },
  blog: {
    title: 'Nuestro Blog',
    description: 'Últimas noticias y artículos de nuestro equipo.',
    loading: 'Cargando artículos...',
    loading_article: 'Cargando artículo...',
    no_articles: 'No se han encontrado artículos.',
    error_loading: 'Error al cargar los artículos. Por favor, inténtelo de nuevo más tarde.',
    read_more: 'Leer más',
    read_more_aria: 'Leer más sobre',
    article_not_found: 'Artículo no encontrado',
    back_to_blog: 'Volver al Blog',
    add_to_favorites: 'Añadir a favoritos',
    remove_from_favorites: 'Quitar de favoritos',
    share: 'Compartir',
    link_copied: 'Enlace copiado al portapapeles',
    added_to_favorites: 'Artículo añadido a favoritos',
    removed_from_favorites: 'Artículo eliminado de favoritos',
    pagination_report:
      'Mostrando {first} a {last} de {total} artículos (Página {page} de {pageCount})',
  },
  article: {
    by: 'Por',
    tags: 'Etiquetas',
    add_favorite: 'Añadir a favoritos',
    remove_favorite: 'Quitar de favoritos',
    share: 'Compartir',
    no_cover: 'Imagen de portada no disponible',
  },
  meta: {
    description:
      'Outsource Tech - Su socio de confianza para soluciones de desarrollo de software personalizadas. Conéctese con talento tecnológico de primer nivel para las necesidades de su negocio.',
  },
  header: {
    contactUs: 'Contáctanos',
    switchTheme: 'Cambiar tema',
    language: 'Cambiar idioma',
  },
  hero: {
    title1: 'Construye más rápido, más inteligente, mejor',
    title2: 'Con nuestros expertos ',
    title3: 'desarrolladores e ingenieros',
    subtitle:
      'Ya sea que necesites un solo especialista o un equipo remoto completo, ofrecemos desarrolladores, diseñadores e ingenieros de control de calidad previamente evaluados, listos para integrarse en tus',
    primaryButton: 'Solicitar talento ahora',
    secondaryButton: 'Contáctenos',
  },
  companies: {
    title: 'Confiado por más de 50 empresas y startups',
  },
  chooseUs: {
    title: 'Su aliado estratégico en tecnología, no solo un proveedor',
    subtitle:
      'Ofrecemos más que talento. Proporcionamos una solución integral para sus necesidades tecnológicas.',
    counter: '¿Qué nos hace destacar?',
    counter_desc1: 'Ingenieros en la red',
    counter_desc2: 'Tiempo promedio de contratación (horas)',
    counter_desc3: 'Clientes atendidos',
    counter_desc4: 'Expertos remotos',
    feat1_title: 'Contratación rápida, sin complicaciones',
    feat1_desc:
      'Evite ciclos de reclutamiento prolongados. Encuentre talento tecnológico de primer nivel en 48 horas.',
    feat2_title: 'Modelos de contratación flexibles',
    feat2_desc:
      'Elija contratos por horas, a tiempo parcial, a tiempo completo o basados en proyectos, adaptados a sus necesidades.',
    feat3_title: 'Experiencia global, estabilidad con base en Chipre',
    feat3_desc:
      'Aproveche desarrolladores globales con la confiabilidad y protección legal de un socio con sede en la UE.',
    feat4_title: 'Solo profesionales previamente evaluados',
    feat4_desc:
      'Trabajamos exclusivamente con expertos comprobados en desarrollo de software, datos, IA/ML, control de calidad y diseño.',
    feat5_title: 'Talento preparado para la comunicación',
    feat5_desc:
      'Cada candidato habla inglés con fluidez, es colaborativo y está adaptado al trabajo remoto.',
    feat6_title: 'Integración fluida y colaboración entre equipos',
    feat6_desc:
      'Nuestros equipos externalizados se integran perfectamente con su personal interno, alineándose con sus procesos, herramientas y zonas horarias para entregar resultados rápidos sin fricciones.',
  },
  services: {
    title1: '¿Qué tipo de',
    title_span: 'expertos',
    title2: 'podemos proporcionar?',
    subtitle:
      'Desde startups en rápido crecimiento hasta equipos tecnológicos empresariales, apoyamos sus proyectos con las personas adecuadas en el momento preciso.',
    additionalExpertise: 'Experiencia adicional',

    // Frontend Development
    frontend: {
      title: 'Desarrollo frontend',
      react: {
        title: 'Desarrolladores React',
        description:
          'Construya interfaces de usuario interactivas, SPA y frontends de alto rendimiento con expertos en React.',
      },
      wordpress: {
        title: 'Desarrolladores WordPress',
        description:
          'Temas personalizados, plugins y sitios web optimizados para el rendimiento utilizando Gutenberg y más.',
      },
    },

    // Backend Development
    backend: {
      title: 'Desarrollo backend',
      python: {
        title: 'Desarrolladores Python',
        description:
          'Ideal para aplicaciones web, APIs, scripts de automatización y sistemas backend.',
      },
      java: {
        title: 'Ingenieros Java',
        description: 'Aplicaciones empresariales escalables con experiencia en Java y Spring Boot.',
      },
    },

    // Data & AI/ML
    ai: {
      title: 'Datos e IA/ML',
      aiml: {
        title: 'Ingenieros de IA/ML',
        description:
          'Aporte inteligencia a sus productos utilizando modelos de ML y herramientas de aprendizaje profundo.',
      },
      dataScience: {
        title: 'Científicos de datos',
        description: 'Convierta sus datos en conocimientos y decisiones comerciales inteligentes.',
      },
    },

    // Product & Design
    design: {
      title: 'Producto y diseño',
      dataEng: {
        title: 'Ingenieros de datos',
        description:
          'Configure una infraestructura de datos moderna con Apache Spark, Kafka y pipelines en la nube.',
      },
      uiux: {
        title: 'Diseñadores UI/UX',
        description:
          'Cree experiencias centradas en el usuario, hermosas y estratégicas con precisión.',
      },
    },

    // Additional expertise
    additional: {
      fullstack: {
        title: 'Desarrolladores full-stack',
        description: 'Desde el frontend hasta el backend: desarrollo completo de aplicaciones.',
      },
      qa: {
        title: 'Ingenieros de control de calidad',
        description: 'Asegure su código con pruebas automatizadas.',
      },
      devops: {
        title: 'Ingenieros DevOps',
        description: 'Optimice implementaciones e infraestructura.',
      },
    },
  },
  process: {
    title: 'Nuestro proceso de externalización',
    subtitle:
      'Un enfoque optimizado para entregar talento tecnológico excepcional que se integra perfectamente con su equipo',
    steps: {
      discovery: {
        title: 'Descubrimiento',
        description:
          'Analizamos sus necesidades y requisitos para comprender el alcance de su proyecto y la dinámica del equipo',
      },
      matching: {
        title: 'Emparejamiento',
        description:
          'Seleccionamos el talento tecnológico perfecto de nuestro grupo, alineando habilidades técnicas y ajuste cultural',
      },
      onboarding: {
        title: 'Integración',
        description: 'Integración fluida de nuestro talento con su equipo y sistemas existentes',
      },
      support: {
        title: 'Soporte continuo',
        description:
          'Monitoreo continuo, retroalimentación y optimización para garantizar el éxito a largo plazo',
      },
    },
  },
  team: {
    title1: 'Conozca a nuestro',
    title_span: 'equipo de liderazgo',
    title2: '',
    subtitle:
      'Los visionarios y expertos detrás de nuestra misión de conectar talento técnico de primer nivel con empresas innovadoras',

    members: {
      john: {
        name: 'Artem Shapovalov',
        role: 'CEO y cofundador',
        bio: 'Líder visionario con más de 10 años de experiencia en optimización de talento tecnológico y desarrollo de negocios.',
      },
      sarah: {
        name: 'Dmytro Lukianenko',
        role: 'Director de tecnología',
        bio: 'Innovador técnico con profunda experiencia en arquitectura de software y tecnologías emergentes.',
      },
      michael: {
        name: 'Oleksandr Shapovalov',
        role: 'Cofundador y director financiero',
        bio: 'Líder financiero estratégico que asegura un crecimiento sostenible y excelencia operativa.',
      },
    },
  },
  testimonials: {
    title: 'Lo que nuestros clientes dicen sobre nuestro talento',
    subtitle:
      'Comentarios reales de empresas que han colaborado con nosotros para encontrar talento técnico excepcional para sus equipos.',
  },
  whyChooseUs: {
    title: 'Por qué elegirnos',
    subtitle: 'Nuestras ventajas',
  },
  contact: {
    title: 'Hablemos sobre sus',
    subtitle: 'necesidades de talento',
    email: 'Introduce tu correo electrónico',
    company: 'Nombre de la empresa',
    country: 'País',
    roles: '¿Qué perfiles estás buscando?',
    message: 'Requisitos del proyecto',
    description:
      'Envíenos un breve resumen: le responderemos con una lista de candidatos en 48 horas.',
    name: 'Introduzca su nombre',
    fullName: 'Nombre completo',
    privacy_policy: 'Política de privacidad',
    privacy_policy_agreement: 'Acepto el tratamiento de mis datos personales de acuerdo con la',
    placeholders: {
      fullName: 'Introduzca su nombre completo',
      companyName: 'Introduzca el nombre de su empresa',
      email: 'Introduzca su correo electrónico de trabajo',
      country: 'Seleccione su país',
      services: 'Seleccione roles',
      message: 'Describa los requisitos de su proyecto',
    },
    submit: 'Enviar solicitud',
    sending: 'Enviando...',
    success: '¡Gracias! Nos pondremos en contacto pronto.',
    form_submitted_successfully:
      'Su formulario ha sido enviado con éxito. Nos pondremos en contacto en breve.',
    personalized_success:
      '¡{name}, gracias por tu mensaje! Agradecemos que te hayas puesto en contacto.',
    select_all: 'Seleccionar todo',
    prefer_email: '¿Prefiere correo electrónico? Contáctenos directamente en',

    // Validation messages
    validation: {
      name_required: 'El nombre completo es obligatorio',
      email_required: 'El correo electrónico laboral es obligatorio',
      email_invalid: 'Por favor, introduzca una dirección de correo electrónico válida',
      country_required: 'El país es obligatorio. Elija de la lista',
      roles_required: 'Por favor, seleccione al menos un rol',
      message_required: 'Los requisitos del proyecto son obligatorios',
      privacy_policy_required: 'Debe aceptar la política de privacidad',
    },

    // Form labels
    labels: {
      optional: 'opcional',
      select_country: 'Seleccione un país',
      select_roles: 'Seleccione roles',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados',
    company: 'AS Exim LTD',
    connect: 'Conéctese con nosotros',
    legal: 'Legal',
    trusted_partner:
      'Su socio de confianza para soluciones de desarrollo de software personalizadas.',
  },
  techStack: {
    title1: 'Expertos tecnológicos en cada',
    title_span: 'stack moderno',
    subtitle:
      'Ya sea que esté escalando un proyecto React, implementando pipelines de datos o lanzando su próximo producto de IA, tenemos los especialistas para hacerlo bien.',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Móvil',
      devops: 'DevOps',
      database: 'Bases de datos',
      aiml: 'IA/ML',
      design: 'Diseño',
      qa: 'Control de calidad y pruebas',
    },
  },
  cta: {
    title_part1: '¿Necesita ',
    title_span1: 'talento',
    title_part2: ' experto? Construyamos algo ',
    title_span2: 'grandioso',
    title_part3: ' juntos.',
    subtitle:
      'Díganos sus necesidades: entregaremos desarrolladores que se sientan como parte de su equipo interno, sin los costos generales.',
    button: '¡Comience a contratar ahora!',
  },
  faq: {
    title_part1: '',
    title_span: 'Preguntas frecuentes',
    title_part2: ' - Usted pregunta, nosotros respondemos',
    subtitle:
      'Encuentre respuestas a las preguntas más comunes. Si tiene más dudas, no dude en contactarnos: ¡nuestro equipo está aquí para ayudar!',
    items: [
      {
        question: '¿Qué es la ampliación de personal?',
        answer:
          'La ampliación de personal es una estrategia de externalización flexible que le permite contratar desarrolladores calificados de forma temporal para llenar vacíos en su proyecto. Este enfoque le proporciona la experiencia necesaria sin el compromiso a largo plazo de contratar empleados a tiempo completo.',
      },
      {
        question: '¿Cómo aseguran que los desarrolladores se ajusten a nuestras necesidades?',
        answer:
          'Comenzamos con una consulta detallada para entender los requisitos específicos de su proyecto, incluyendo habilidades técnicas, niveles de experiencia y dinámica del equipo. Con base en esto, seleccionamos cuidadosamente desarrolladores que se ajusten a sus necesidades.',
      },
      {
        question: '¿En qué tecnologías están especializados sus desarrolladores?',
        answer:
          'Nuestros desarrolladores son expertos en Java, JavaScript (incluyendo React, Angular, Node.js) y PHP, entre otras tecnologías. También nos mantenemos actualizados con las últimas tendencias y herramientas de la industria para garantizar soluciones de vanguardia.',
      },
      {
        question: '¿Qué tan rápido podemos comenzar a trabajar con sus desarrolladores?',
        answer:
          'Tras nuestra consulta inicial, generalmente le asignamos desarrolladores adecuados en pocos días. Una vez que apruebe la selección, el proceso de integración es rápido, permitiendo que los desarrolladores contribuyan a su proyecto casi de inmediato.',
      },
      {
        question: '¿Podemos escalar nuestro equipo hacia arriba o hacia abajo?',
        answer:
          'Sí, nuestros servicios de ampliación de personal están diseñados para ser flexibles. Puede escalar su equipo hacia arriba o hacia abajo fácilmente según las necesidades y cronogramas de su proyecto.',
      },
    ],
  },
  // legal: {
  //   test: legalTranslations.legal.test,
  // },
  contactMail: {
    admin: {
      subject: 'Nueva solicitud de contacto',
      subtitle: 'Servicios de desarrollo profesional',
      greeting: '¡Hola',
      intro:
        'Ha recibido una nueva solicitud de contacto de un cliente potencial. Por favor revise los detalles a continuación y responda prontamente.',
      submission: 'Detalles del contacto',
      contactInfo: 'Información de contacto',
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      country: 'País',
      services: 'Servicios solicitados',
      technologies: 'Tecnologías',
      message: 'Requisitos del proyecto',
      regards: 'Saludos cordiales,\nEl equipo de AS Exim LTD',
      replyButton: 'Responder al cliente',
      priority: 'Alta prioridad - Por favor responda dentro de 24 horas',
      footerText: 'Esta es una notificación automatizada de su formulario de contacto.',
    },
    user: {
      subject: 'Gracias por contactarnos en AS Exim LTD',
      subtitle: 'Su socio tecnológico estratégico',
      greeting: '¡Hola',
      intro:
        '¡Gracias por contactar a AS Exim LTD! Hemos recibido exitosamente su consulta y estamos emocionados de conocer más sobre sus necesidades de proyecto.',
      submission: 'Resumen de su envío',
      regards: 'Saludos cordiales,\nEl equipo de AS Exim LTD',
      whatsNext: '¿Qué sigue?',
      step1: 'Nuestro equipo revisará sus requisitos dentro de 24 horas',
      step2: 'Le enviaremos una lista curada de candidatos calificados',
      step3: 'Programe entrevistas y comience a construir su equipo soñado',
      responseTime: '⚡ Tiempo de respuesta esperado',
      responseTimeDetails: 'Normalmente respondemos dentro de 24 horas durante días laborables',
      visitWebsite: 'Visite nuestro sitio web',
      followUs: 'Síguenos en LinkedIn',
      personalNote:
        'Nuestro equipo está comprometido a encontrarle el talento tecnológico perfecto para sus necesidades específicas.',
      teamSignature: 'El equipo de AS Exim LTD',
      footerText: 'Esperamos colaborar con usted en su próximo proyecto.',
    },
  },
  error: 'No se pudo enviar. Inténtalo de nuevo más tarde.',
};
