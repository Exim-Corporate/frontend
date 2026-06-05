<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSEO } from '@/composables/useSEO';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import { useI18n } from 'vue-i18n';
import { useAsyncData } from '#imports';
import { usePageContentApi } from '@/composables/usePageContentApi';
import type { StrapiCtaSection, StrapiHomePage } from '@/types/strapi';

const calendlyPrefillEmail = ref('');
const { locale, t } = useI18n();
const { fetchHomePage } = usePageContentApi();

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

// Centralized SEO for the homepage using useSEO
useSEO({
  title: 'AS Exim - Expert IT Staffing & Remote Developers',
  description:
    'Your trusted partner for custom software development solutions. Connect with top-tier tech talent - pre-vetted developers, designers, and QA engineers ready for your projects.',
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

    <ServicesProvideSection />

    <TechStackSection />
    
    <!-- Why Choose Us section -->
    <WhyChooseUsSection />
    
    <!-- Process Section -->
    <ProcessSection />
    <IndustryExpertiseSection />
    <CaseStudiesSection />
    <StandApartStatsSection />
    <TestimonialsSection />
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
