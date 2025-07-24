<template>
  <section class="services-section py-24 relative overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-indigo-gradient" />

    <!-- Decorative Elements -->
    <!-- <div class="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/20 blur-[80px]" />
    <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-500/20 blur-[80px]" /> -->

    <div class="container relative z-10 mx-auto">
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-16"
      >
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          {{ t('services.title1') }}
          <span class="text-gradient">{{ t('services.title_span') }}</span>
          {{ t('services.title2') }}
        </h2>
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Service Items - Alternating Layout -->
      <div class="space-y-20">
        <!-- Map through service items -->
        <ServiceItem
          v-for="(service, index) in services"
          :key="`service-${index}`"
          :service="service"
          :reversed="index % 2 !== 0"
        />

        <!-- Additional Expertise Block -->
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          class="flex flex-col items-center justify-center py-6 sm:py-8 px-4 bg-background-gray/20 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl"
        >
          <h3 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{{
            t('services.additionalExpertise')
          }}</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <!-- Map through expertise cards -->
            <ExpertiseCard
              v-for="(expertise, index) in additionalExpertise"
              :key="`expertise-${index}`"
              :expertise="expertise"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceItem from '@/components/services/ServiceItem.vue';
import ExpertiseCard from '@/components/services/ExpertiseCard.vue';

// Import the i18n composable - используем только для разметки секции
const { t } = useI18n();

// Массив с данными сервисов - передаем только ключи
const services = [
  {
    title: 'services.frontend.title',
    image: '/images/services/fe.webp',
    mainIcon: 'logos:react',
    items: [
      {
        title: 'services.frontend.react.title',
        description: 'services.frontend.react.description',
        icon: 'logos:react',
        iconClass: 'text-blue-500',
        iconBgClass: 'bg-blue-500/20',
      },
      {
        title: 'services.frontend.wordpress.title',
        description: 'services.frontend.wordpress.description',
        icon: 'logos:wordpress-icon',
        iconClass: 'text-indigo-600',
        iconBgClass: 'bg-indigo-600/20',
      },
    ],
  },
  {
    title: 'services.backend.title',
    image: 'images/services/be.webp',
    mainIcon: 'logos:python',
    items: [
      {
        title: 'services.backend.python.title',
        description: 'services.backend.python.description',
        icon: 'logos:python',
        iconClass: 'text-yellow-500',
        iconBgClass: 'bg-yellow-500/20',
      },
      {
        title: 'services.backend.java.title',
        description: 'services.backend.java.description',
        icon: 'logos:java',
        iconClass: 'text-red-500',
        iconBgClass: 'bg-red-500/20',
      },
    ],
  },
  {
    title: 'services.ai.title',
    image: 'images/services/ai.webp',
    imagePosition: 'top',
    mainIcon: 'logos:tensorflow',
    items: [
      {
        title: 'services.ai.aiml.title',
        description: 'services.ai.aiml.description',
        icon: 'logos:tensorflow',
        iconClass: 'text-green-500',
        iconBgClass: 'bg-green-500/20',
      },
      {
        title: 'services.ai.dataScience.title',
        description: 'services.ai.dataScience.description',
        icon: 'carbon:chart-multitype',
        iconClass: 'text-purple-600',
        iconBgClass: 'bg-purple-600/20',
      },
    ],
  },
  {
    title: 'services.design.title',
    image: 'images/services/design.webp',
    imagePosition: 'bottom',
    mainIcon: 'material-symbols:design-services-outline',
    items: [
      {
        title: 'services.design.dataEng.title',
        description: 'services.design.dataEng.description',
        icon: 'logos:apache-kafka',
        iconClass: 'text-orange-500',
        iconBgClass: 'bg-orange-500/20',
      },
      {
        title: 'services.design.uiux.title',
        description: 'services.design.uiux.description',
        icon: 'material-symbols:design-services-outline',
        iconClass: 'text-pink-500',
        iconBgClass: 'bg-pink-500/20',
      },
    ],
  },
];

// Массив с дополнительными экспертизами - передаем только ключи
const additionalExpertise = [
  {
    title: 'services.additional.fullstack.title',
    description: 'services.additional.fullstack.description',
    icon: 'carbon:application',
    iconClass: 'text-teal-500',
    iconBgClass: 'bg-teal-500',
  },
  {
    title: 'services.additional.qa.title',
    description: 'services.additional.qa.description',
    icon: 'material-symbols:bug-report-outline',
    iconClass: 'text-cyan-600',
    iconBgClass: 'bg-cyan-600',
  },
  {
    title: 'services.additional.devops.title',
    description: 'services.additional.devops.description',
    icon: 'logos:kubernetes',
    iconClass: 'text-blue-500',
    iconBgClass: 'bg-blue-500',
  },
];
</script>

<style scoped>
.services-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #af55ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* Using color:transparent instead of text-fill-color */
}

@media (max-width: 768px) {
  .service-item [class*='order-'] {
    order: 0;
  }
}
</style>
