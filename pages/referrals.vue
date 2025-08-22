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
// Keep features simple: use three keys per locale and build an array with `t(...)` directly.

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
    features: [
      t('referrals.programs.items.cash.features1'),
      t('referrals.programs.items.cash.features2'),
      t('referrals.programs.items.cash.features3'),
    ],
    example: t('referrals.programs.items.cash.example'),
    icon: 'octicon:people-24',
  },
  {
    id: 'revenue',
    title: t('referrals.programs.items.revenue.title'),
    description: t('referrals.programs.items.revenue.description'),
    features: [
      t('referrals.programs.items.revenue.features1'),
      t('referrals.programs.items.revenue.features2'),
      t('referrals.programs.items.revenue.features3'),
    ],
    example: t('referrals.programs.items.revenue.example'),
    icon: 'mdi:gift-outline',
  },
];

const scrollToForm = () => {
  const el = document.getElementById('refForm') as HTMLElement | null;
  if (el) {
    el.scrollIntoView({ block: 'start' });
  }
};
</script>
