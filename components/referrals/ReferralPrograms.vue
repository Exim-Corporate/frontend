<template>
  <section class="py-16 md:py-24 bg-gray-50 dark:bg-navy-blue/40">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-14">
        <h2
          data-aos="fade-up"
          class="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        >
          <span class="text-gradient">{{ $t('referrals.programs.title') }}</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          class="text-gray-600 dark:text-gray-300 text-lg"
        >
          {{ $t('referrals.programs.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <ReferralProgramCard
          v-for="(program, idx) in programs"
          :key="program.id"
          :title="program.title"
          :description="program.description"
          :reward="program.reward"
          :highlight="program.highlight"
          :icon="program.icon"
          :data-aos-delay="idx * 100"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ReferralProgram } from '@/types/referrals';

/** Props */
defineProps<{ programs: ReferralProgram[] }>();
</script>
