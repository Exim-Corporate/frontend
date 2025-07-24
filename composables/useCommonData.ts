export interface Technology {
  name: string;
  id: string;
  icon?: string;
}

export interface TechCategory {
  name: string;
  nameKey: string; // Добавляем поле для ключа перевода
  id: string;
  icon?: string; // Добавляем поле для иконки
  technologies: Technology[];
}

export interface ServiceRole {
  name: string;
  id: string;
  enablesTech: boolean;
  description?: string;
  icon?: string;
}

// Technology stacks used across the project
export const techStacks: TechCategory[] = [
  {
    name: 'Frontend', // Удаляем эмодзи из name, они будут добавлены отдельно в шаблоне
    nameKey: 'techStack.categories.frontend',
    id: 'frontend',
    icon: '🖥️', // Добавляем иконку как отдельное свойство
    technologies: [
      { name: 'React', id: 'react', icon: 'logos:react' },
      { name: 'Vue.js', id: 'vue', icon: 'logos:vue' },
      { name: 'JavaScript', id: 'js', icon: 'logos:javascript' },
      { name: 'TypeScript', id: 'ts', icon: 'logos:typescript-icon' },
      { name: 'Nuxt.js', id: 'nuxt', icon: 'logos:nuxt-icon' },
      { name: 'Next.js', id: 'next', icon: 'logos:nextjs-icon' },
      { name: 'Gatsby', id: 'gatsby', icon: 'logos:gatsby' },
    ],
  },
  {
    name: 'Backend',
    nameKey: 'techStack.categories.backend',
    id: 'backend',
    icon: '⚙️',
    technologies: [
      { name: 'Python', id: 'python', icon: 'logos:python' },
      { name: 'Django', id: 'django', icon: 'logos:django-icon' },
      { name: 'FastAPI', id: 'fastapi', icon: 'logos:fastapi-icon' },
      { name: 'Java', id: 'java', icon: 'logos:java' },
      { name: 'Spring', id: 'spring', icon: 'logos:spring-icon' },
      { name: 'Node.js', id: 'node', icon: 'logos:nodejs-icon' },
      { name: 'PHP', id: 'php', icon: 'logos:php' },
      { name: 'Laravel', id: 'laravel', icon: 'logos:laravel' },
      { name: '.NET', id: 'dotnet', icon: 'logos:dotnet' },
      { name: 'C#', id: 'csharp', icon: 'logos:c-sharp' },
    ],
  },
  {
    name: 'Data & AI/ML',
    nameKey: 'techStack.categories.aiml',
    id: 'data-ai',
    icon: '📊',
    technologies: [
      { name: 'TensorFlow', id: 'tensorflow', icon: 'logos:tensorflow' },
      { name: 'PyTorch', id: 'pytorch', icon: 'logos:pytorch-icon' },
      { name: 'Pandas', id: 'pandas', icon: 'logos:pandas-icon' },
      { name: 'NumPy', id: 'numpy', icon: 'logos:numpy' },
      { name: 'R', id: 'r', icon: 'logos:r-lang' },
      { name: 'Apache Spark', id: 'spark', icon: 'logos:apache-spark' },
      { name: 'Kafka', id: 'kafka', icon: 'logos:kafka-icon' },
      { name: 'Airflow', id: 'airflow', icon: 'logos:airflow' },
      { name: 'AWS Glue', id: 'aws-glue', icon: 'logos:aws-glue' },
    ],
  },
  {
    name: 'Design',
    nameKey: 'techStack.categories.design',
    id: 'design',
    icon: '🎨',
    technologies: [
      { name: 'Figma', id: 'figma', icon: 'logos:figma' },
      { name: 'Sketch', id: 'sketch', icon: 'logos:sketch' },
      { name: 'Adobe XD', id: 'xd', icon: 'logos:adobe-xd' },
      { name: 'UI/UX Design', id: 'ui-ux', icon: 'material-symbols:design-services-outline' },
      { name: 'Product Design', id: 'product', icon: 'material-symbols:category-outline' },
      { name: 'Prototyping', id: 'prototyping', icon: 'material-symbols:preview-outline' },
    ],
  },
  {
    name: 'QA & Testing',
    nameKey: 'techStack.categories.qa',
    id: 'qa',
    icon: '🧪',
    technologies: [
      { name: 'Manual QA', id: 'manual-qa', icon: 'material-symbols:rule-settings' },
      { name: 'Selenium', id: 'selenium', icon: 'logos:selenium' },
      { name: 'Cypress', id: 'cypress', icon: 'logos:cypress-icon' },
      { name: 'Playwright', id: 'playwright', icon: 'logos:playwright' },
      {
        name: 'QA Engineering',
        id: 'qa-engineering',
        icon: 'material-symbols:engineering-outline',
      },
    ],
  },
  {
    name: 'Cloud & DevOps',
    nameKey: 'techStack.categories.devops',
    id: 'devops',
    icon: '☁️',
    technologies: [
      { name: 'AWS', id: 'aws', icon: 'logos:aws' },
      { name: 'GCP', id: 'gcp', icon: 'logos:google-cloud' },
      { name: 'Azure', id: 'azure', icon: 'logos:microsoft-azure' },
      { name: 'Docker', id: 'docker', icon: 'logos:docker-icon' },
      { name: 'Kubernetes', id: 'k8s', icon: 'logos:kubernetes' },
      { name: 'CI/CD', id: 'cicd', icon: 'material-symbols:all-inclusive' },
      { name: 'Terraform', id: 'terraform', icon: 'logos:terraform-icon' },
    ],
  },
];

// List of service roles used across the project
export const serviceRoles: ServiceRole[] = [
  { name: 'Frontend Development', id: 'frontend', enablesTech: true },
  { name: 'Backend Development', id: 'backend', enablesTech: false },
  { name: 'Full Stack Development', id: 'fullstack', enablesTech: true },
  { name: 'UI/UX Design', id: 'design', enablesTech: true },
  { name: 'Mobile App Development', id: 'mobile', enablesTech: true },
  { name: 'DevOps & Cloud Services', id: 'devops', enablesTech: false },
  { name: 'AI & Machine Learning', id: 'ai', enablesTech: false },
  { name: 'Data Engineering', id: 'data', enablesTech: false },
  { name: 'QA & Testing', id: 'qa', enablesTech: false },
  { name: 'Project Management', id: 'pm', enablesTech: false },
];

// Budget options for the contact form
export const budgetOptions = [
  { name: 'Less than $5,000', id: 'lt-5k' },
  { name: '$5,000 - $10,000', id: '5k-10k' },
  { name: '$10,000 - $25,000', id: '10k-25k' },
  { name: '$25,000 - $50,000', id: '25k-50k' },
  { name: '$50,000 - $100,000', id: '50k-100k' },
  { name: '$100,000+', id: 'gt-100k' },
];

// List of countries for the contact form
export const countries = [
  { name: 'United States', id: 'us' },
  { name: 'United Kingdom', id: 'uk' },
  { name: 'Canada', id: 'ca' },
  { name: 'Australia', id: 'au' },
  { name: 'Germany', id: 'de' },
  { name: 'France', id: 'fr' },
  { name: 'Spain', id: 'es' },
  { name: 'Italy', id: 'it' },
  { name: 'Japan', id: 'jp' },
  { name: 'China', id: 'cn' },
  { name: 'India', id: 'in' },
  { name: 'Brazil', id: 'br' },
  { name: 'Ukraine', id: 'ua' },
  { name: 'South Africa', id: 'za' },
];

// Flattened list of all technologies for the contact form
export const getTechnologyOptions = (): Technology[] => {
  const allTechnologies: Technology[] = [];

  techStacks.forEach(category => {
    category.technologies.forEach(tech => {
      // Avoid duplicates
      if (!allTechnologies.find(t => t.id === tech.id)) {
        allTechnologies.push(tech);
      }
    });
  });

  return allTechnologies;
};

// Composable for the contact form
export const useContactForm = () => {
  const technologyOptions = getTechnologyOptions();

  // Determine if tech selection should be enabled based on selected roles
  const shouldEnableTechSelect = (selectedServices: ServiceRole[]) => {
    if (!selectedServices || selectedServices.length === 0) return false;
    return selectedServices.some(service => service.enablesTech);
  };

  return {
    serviceRoles,
    technologyOptions,
    budgetOptions,
    countries,
    shouldEnableTechSelect,
  };
};
