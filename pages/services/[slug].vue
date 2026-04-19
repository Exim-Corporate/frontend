<template>
  <main class="min-h-screen mt-20">
    <section v-if="pending" class="container text-center">
      <BaseText variant="section" class-name="text-text-secondary">
        {{ $t('footer.loading') }}
      </BaseText>
    </section>

    <section v-else-if="error || !resolvedPage" class="container text-center">
      <BaseTitle tag="h1" variant="main" class-name="text-text-dark dark:text-text-light">
        {{ $t('error.404.title') }}
      </BaseTitle>
      <BaseText variant="section" class-name="mt-4 text-text-secondary dark:text-text-light/70">
        {{ $t('error.404.description') }}
      </BaseText>
    </section>

    <template v-else>
      <ServiceHeroSection
        v-if="resolvedPage.hero"
        :hero="resolvedPage.hero"
      />

      <ServicesCardsSection
        v-if="resolvedPage.serviceCardsSection"
        mode="service"
        :page-title="resolvedPage.title"
        :section-data="resolvedPage.serviceCardsSection"
      />

      <ServicesAboutSection
        v-if="resolvedPage.serviceAboutSection"
        :section-data="resolvedPage.serviceAboutSection"
      />

      <ServicesBenefitsSection
        v-if="resolvedPage.serviceBenefitsSection"
        :section-data="resolvedPage.serviceBenefitsSection"
      />

      <CtaSection
        v-if="resolvedPage.ctaSection?.title"
        :section-data="resolvedPage.ctaSection"
        scroll-target-id="calendly-booking"
      />

      <TestimonialsSection />
      <FAQSection />
      <CalendlyBookingSection section-id="calendly-booking" />
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import ServiceHeroSection from '@/components/services/ServiceHeroSection.vue';
import ServicesCardsSection from '@/components/services/ServicesCardsSection.vue';
import ServicesAboutSection from '@/components/services/ServicesAboutSection.vue';
import ServicesBenefitsSection from '@/components/services/ServicesBenefitsSection.vue';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useSEO } from '@/composables/useSEO';
import type { StrapiServicePage } from '@/types/strapi';
import { FAQSection, TestimonialsSection } from '#components';

const route = useRoute();
const { locale, t } = useI18n();
const { fetchServicePage } = usePageContentApi();

const slug = computed(() => String(route.params.slug || ''));

const { data: page, pending, error } = useAsyncData<StrapiServicePage | null>(
  `service-page-${slug.value}-${locale.value}`,
  async () => await fetchServicePage(slug.value, locale.value),
  { default: () => null, watch: [slug, locale] },
);

const resolvedPage = computed<StrapiServicePage | null>(() => page.value ?? null);

const config = useRuntimeConfig();
const siteBase = config.public.siteUrl || 'https://www.exim.eu.com';

useSEO({
  title: resolvedPage.value?.seo?.metaTitle || resolvedPage.value?.title || t('error.404.title'),
  description:
    resolvedPage.value?.seo?.metaDescription ||
    resolvedPage.value?.description ||
    t('meta.description'),
  url: new URL(String(route.fullPath || route.path || '/'), String(siteBase)).href,
});
</script>
