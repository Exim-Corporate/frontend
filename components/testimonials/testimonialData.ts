export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarSrc: string;
  rating: number;
  comment: string;
  projectType: string;
  accentColor?: string;
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechInnovate',
    avatarSrc: '/images/testimonials/sarahJohnson.jpg',
    rating: 4.8,
    comment:
      'The development team we hired through Outsource exceeded our expectations. They seamlessly integrated with our existing team and delivered our SaaS platform ahead of schedule, solving critical scalability issues.',
    projectType: 'SaaS Platform Development',
    accentColor: 'accent',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'DataStream',
    avatarSrc: '/images/testimonials/michaelChen.jpg',
    rating: 4.6,
    comment:
      'We needed specialized AI engineers for our machine learning project. The talent provided was top-notch, with excellent problem-solving skills and clear communication, ensuring our models were production-ready.',
    projectType: 'AI/Machine Learning Integration',
    accentColor: 'accent-mint',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'VP of Engineering',
    company: 'CloudSecure',
    avatarSrc: '/images/testimonials/emmaRodriguez.jpg',
    rating: 4.2,
    comment:
      "Outsource's DevOps engineers transformed our deployment pipeline. Their expertise in CI/CD and cloud infrastructure significantly improved our release cycle times and system reliability.",
    projectType: 'DevOps Transformation',
    accentColor: 'accent-coral',
  },
  {
    id: 4,
    name: 'Alex Williams',
    role: 'Founder',
    company: 'MobileFirst',
    avatarSrc: '/images/testimonials/alexWilliams.jpg',
    rating: 4.9,
    comment:
      'Finding skilled React Native developers was critical for our startup. The Outsource team delivered a high-performance cross-platform app that exceeded our user adoption targets by 40%.',
    projectType: 'Mobile App Development',
    accentColor: 'accent-yellow',
  },
  {
    id: 5,
    name: 'Olivia Patel',
    role: 'Director of Technology',
    company: 'HealthTech Solutions',
    avatarSrc: '/images/testimonials/oliviaPatel.jpg',
    rating: 4.7,
    comment:
      'We needed to rebuild our healthcare platform with HIPAA compliance. The backend developers from Outsource were experts in security protocols, delivering a robust and compliant solution.',
    projectType: 'Healthcare Platform Development',
  },
  {
    id: 6,
    name: 'James Carter',
    role: 'Head of Product',
    company: 'FinTech Ventures',
    avatarSrc: '/images/testimonials/jamesCarter.jpg',
    rating: 4.5,
    comment:
      'Outsource provided us with blockchain developers who streamlined our transaction processing system. Their innovative solutions reduced latency and enhanced our platform’s security.',
    projectType: 'Blockchain Integration',
    accentColor: 'accent-blue',
  },
  {
    id: 7,
    name: 'Sophie Lee',
    role: 'Engineering Manager',
    company: 'GreenWave Analytics',
    avatarSrc: '/images/testimonials/sophieLee.jpg',
    rating: 4.3,
    comment:
      'The data engineers from Outsource optimized our big data pipeline, enabling real-time analytics for our customers. Their attention to detail and proactive approach solved our performance bottlenecks.',
    projectType: 'Big Data Pipeline Optimization',
    accentColor: 'accent-green',
  },
  {
    id: 8,
    name: 'David Nguyen',
    role: 'CEO',
    company: 'SmartRetail',
    avatarSrc: '/images/testimonials/davidNguyen.jpg',
    rating: 4.4,
    comment:
      'We partnered with Outsource to build an e-commerce platform with complex inventory management. Their full-stack developers delivered a seamless solution that improved our operational efficiency.',
    projectType: 'E-commerce Platform Development',
    accentColor: 'accent-purple',
  },
  {
    id: 9,
    name: 'Laura Kim',
    role: 'Chief Innovation Officer',
    company: 'EduTech Innovations',
    avatarSrc: '/images/testimonials/lauraKim.jpg',
    rating: 4.1,
    comment:
      'Outsource’s frontend developers helped us redesign our learning management system. Their user-centric approach and technical expertise resulted in a highly intuitive platform for our users.',
    projectType: 'Learning Management System Redesign',
    accentColor: 'accent-teal',
  },
  {
    id: 10,
    name: 'Matthias Köhler',
    role: 'IT-Leiter',
    company: 'LogiTech GmbH',
    avatarSrc: '/images/testimonials/matthiasKohler.jpg',
    rating: 4.7,
    comment:
      'Die Zusammenarbeit mit dem Outsourcing-Team war hervorragend. Die Entwickler haben unsere ERP-Schnittstellen modernisiert und perfekt in unsere bestehende Infrastruktur integriert.',
    projectType: 'ERP System Modernisierung',
    accentColor: 'accent-blue',
  },
  {
    id: 11,
    name: 'Claire Dubois',
    role: 'Responsable Technique',
    company: 'BioSoft Solutions',
    avatarSrc: '/images/testimonials/claireDubois.jpg',
    rating: 4.6,
    comment:
      "Nous avions besoin de développeurs spécialisés en React pour refondre notre dashboard analytique. L'équipe d'Outsource a su livrer une solution fluide et responsive en un temps record.",
    projectType: 'Refonte d’Interface Utilisateur',
    accentColor: 'accent-purple',
  },
  {
    id: 12,
    name: 'Tom Berger',
    role: 'Produktmanager',
    company: 'AutoNetz AG',
    avatarSrc: '/images/testimonials/tomBerger.jpg',
    rating: 4.8,
    comment:
      'Outsource hat uns geholfen, ein skalierbares IoT-Dashboard zu entwickeln. Besonders hervorzuheben ist das Fachwissen im Bereich MQTT und Echtzeitdaten-Visualisierung.',
    projectType: 'IoT Dashboard Entwicklung',
    accentColor: 'accent-green',
  },
  {
    id: 13,
    name: 'Isabelle Moreau',
    role: 'Directrice Produit',
    company: 'Finanalyse',
    avatarSrc: '/images/testimonials/isabelleMoreau.jpg',
    rating: 4.9,
    comment:
      "L'intégration d'une équipe DevOps d'Outsource nous a permis d'automatiser nos déploiements sur Kubernetes et de renforcer la sécurité de nos flux CI/CD.",
    projectType: 'Automatisation CI/CD',
    accentColor: 'accent-mint',
  },
  {
    id: 14,
    name: 'Jörg Schneider',
    role: 'Softwarearchitekt',
    company: 'MedTechPro',
    avatarSrc: '/images/testimonials/jorgSchneider.jpg',
    rating: 4.5,
    comment:
      'Für unsere neue medizinische Plattform war HIPAA-konforme Backend-Architektur entscheidend. Outsource lieferte eine sichere und skalierbare Lösung, die alle Anforderungen erfüllte.',
    projectType: 'Medizinische Plattformarchitektur',
    accentColor: 'accent-coral',
  },
  {
    id: 15,
    name: 'Élise Garnier',
    role: 'Tech Lead',
    company: 'RetailXperience',
    avatarSrc: '/images/testimonials/eliseGarnier.jpg',
    rating: 4.4,
    comment:
      'Le projet e-commerce nécessitait une gestion avancée des stocks et des flux multicanaux. Les développeurs Outsource ont livré une solution performante et facilement maintenable.',
    projectType: 'Plateforme E-commerce',
    accentColor: 'accent-yellow',
  },
];
