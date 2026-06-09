<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSEO } from '@/composables/useSEO';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import { useI18n } from 'vue-i18n';
import { useAsyncData } from '#imports';
import { usePageContentApi } from '@/composables/usePageContentApi';
import type { StrapiCtaSection, StrapiHomePage, StrapiIndustryPage } from '@/types/strapi';

const calendlyPrefillEmail = ref('');
const { locale, t } = useI18n();
const { fetchHomePage, fetchServicePages } = usePageContentApi();

const handleHeroSubmitEmail = (email: string) => {
  calendlyPrefillEmail.value = email;
};

const { data: homePage } = await useAsyncData(
  () => `home-page-cta-${locale.value}`,
  () => fetchHomePage(locale.value),
  {
    default: () => ({ ctaSection: null } as StrapiHomePage),
    server: true,
    lazy: false,
    watch: [locale],
  },
);

const { fetchIndustryPages } = usePageContentApi();

const { data: industryPages } = await useAsyncData<StrapiIndustryPage[]>(
  () => `home-page-industry-pages-${locale.value}`,
  () => fetchIndustryPages(locale.value),
  {
    default: () => [],
    server: true,
    lazy: false,
    watch: [locale],
  },
);

const { data: servicePages } = await useAsyncData(
  () => `home-page-service-pages-${locale.value}`,
  () => fetchServicePages(locale.value),
  {
    default: () => [],
    server: true,
    lazy: false,
    watch: [locale],
  },
);

const pageCtaSection = computed<StrapiCtaSection>(() =>
  homePage.value?.ctaSection ?? {
    title: t('cta.title'),
    description: t('cta.description'),
    buttonText: t('cta.button'),
    buttonUrl: '#contact-us',
    image: null,
    imageAlt: 'CTA image',
  },
);

const standApartStatsSection = computed(() => homePage.value?.standApartStats ?? null);
const testimonialsSection = computed(() => homePage.value?.testimonialsSection ?? null);
const processSection = computed(() => homePage.value?.processSection ?? null);
const industryExpertiseSection = computed(() => homePage.value?.industryExpertiseSection ?? null);
const whyChooseUsSection = computed(() => homePage.value?.whyChooseUsSection ?? null);
const servicesProvideSection = computed(() => homePage.value?.servicesProvideSection ?? null);
const orderedIndustryPages = computed(() => industryPages.value ?? []);
const orderedServicePages = computed(() => servicePages.value ?? []);

// Centralized SEO for the homepage using useSEO
useSEO({
  title: t('homeSeo.title'),
  description: t('homeSeo.description'),
  image: '/logo.png',
  type: 'website',
});

// Structured Data для лучшего SEO
// useSchemaOrg([
//   defineOrganization({
//     name: 'AS Exim',
//     logo: '/images/logoPic.webp',
//     url: 'https://your-domain.com', // Замените на ваш домен
//     description:
//       'Your trusted partner for custom software development solutions. We provide pre-vetted developers, designers, and QA engineers.',
//     address: {
//       streetAddress: 'Griva Digeni 49, CHRYSTALLA COURT, 5th floor, Flat/Office 51',
//       addressLocality: 'Larnaca',
//       addressCountry: 'Cyprus',
//       postalCode: '6036',
//     },
//     contactPoint: {
//       telephone: '+357-your-phone', // Добавьте ваш телефон
//       contactType: 'customer service',
//     },
//     sameAs: ['https://linkedin.com/company/outsource-tech', 'https://t.me/OutsourceTechSupport'],
//     serviceType: 'IT Staffing and Software Development Services',
//     areaServed: 'Worldwide',
//   }),
// ]);

// Nuxt auto-imports components
</script>

<template>
  <main>
    <HeroSection @submit-email="handleHeroSubmitEmail" />

    <ServicesCardsSection />

    <ServicesProvideSection
      :section-data="servicesProvideSection"
      :services="orderedServicePages"
    />

    <TechStackSection />
    
    <!-- Why Choose Us section -->
    <WhyChooseUsSection :section-data="whyChooseUsSection" />

    <ProcessSection :section-data="processSection" />
    
    <!-- Process Section -->
    <IndustryExpertiseSection
    :section-data="industryExpertiseSection"
    :industries="orderedIndustryPages"
    />
    <StandApartStatsSection :section-data="standApartStatsSection" />
    <!-- <CaseStudiesSection /> --> 
    <TestimonialsSection :section-data="testimonialsSection" />
    <TeamSection />
    <HeroBlogSection />
    <CtaSection
      :section-data="pageCtaSection"
      scroll-target-id="contact-us"
    />

    <!-- FAQ Section -->
    <FAQSection />

    <CalendlyBookingSection
      :key="calendlyPrefillEmail || 'no-prefill'"
      section-id="contact-us"
      utm-source="homepage"
      :prefill-email="calendlyPrefillEmail"
    />
    <!-- Contact Section -->
    <!-- <ContactSection /> -->

  </main>
</template>
