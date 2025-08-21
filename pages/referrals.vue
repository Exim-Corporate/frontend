<template>
  <div>
    <ReferralsHero
      @primary-cta="scrollToForm"
      @secondary-cta="scrollToForm"
    />
    <ReferralPrograms :programs="programs" />
    <ReferralSubmission ref="formSection" />
    <ReferralCTA @cta="scrollToForm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSEO } from '@/composables/useSEO';
import type { ReferralProgram } from '@/types/referrals';

import ReferralsHero from '@/components/referrals/ReferralsHero.vue';
import ReferralPrograms from '@/components/referrals/ReferralPrograms.vue';
import ReferralSubmission from '@/components/referrals/ReferralSubmission.vue';
import ReferralCTA from '@/components/referrals/ReferralCTA.vue';

const { t } = useI18n();

useSEO({
  title: t('referrals.meta.title'),
  description: t('referrals.meta.description'),
  image: '/images/og-referrals.jpg',
  url: '/referrals',
});

const formSection = ref<InstanceType<typeof ReferralSubmission> | null>(null);

const programs: ReferralProgram[] = [
  {
    id: 'cash',
    title: t('referrals.programs.items.cash.title'),
    description: t('referrals.programs.items.cash.description'),
    reward: t('referrals.programs.items.cash.reward'),
    highlight: true,
    icon: 'ph:currency-dollar',
  },
  {
    id: 'revenue',
    title: t('referrals.programs.items.revenue.title'),
    description: t('referrals.programs.items.revenue.description'),
    reward: t('referrals.programs.items.revenue.reward'),
    icon: 'ph:chart-line-up',
  },
  {
    id: 'hybrid',
    title: t('referrals.programs.items.hybrid.title'),
    description: t('referrals.programs.items.hybrid.description'),
    reward: t('referrals.programs.items.hybrid.reward'),
    icon: 'ph:arrows-left-right',
  },
];

const scrollToForm = () => {
  const el = document.querySelector('#__nuxt form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
