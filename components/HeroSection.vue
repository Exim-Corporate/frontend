<template>
  <section class="relative w-full overflow-hidden bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center justify-center min-h-[80vh]">
      
      <AnimatedElement direction="bottom" :delay="100">
        <BaseChip variant="light" size="normal" class="mb-6 md:mb-8">
          {{ $t('heroNew.badge') }}
        </BaseChip>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="200" class="max-w-3xl">
        <BaseTitle class="mb-6 whitespace-pre-line">
          {{ $t('heroNew.title') }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="300">
        <BaseSubheader class="mb-12 whitespace-pre-line max-w-lg">
          {{ $t('heroNew.subtitle') }}
        </BaseSubheader>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="400" class="w-full max-w-xl">
        <form
          class="flex flex-col md:flex-row items-center w-full rounded-4xl md:rounded-full border border-form-border p-2.5 transition-colors hover:border-form-border-hover mb-12 gap-3 md:gap-0"
          @submit.prevent="submitForm"
        >
          <InputText
            type="email"
            :placeholder="$t('heroNew.inputPlaceholder')"
            class="w-full md:flex-1 text-base"
            required
          />

          <AppButton type="submit">
            {{ $t('heroNew.scheduleButton') }}
          </AppButton>
        </form>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="500" class="w-full">
        <CompaniesCarousel />
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseSubheader from '@/components/UI/BaseSubheader.vue';
import BaseChip from '@/components/UI/BaseChip.vue';
import AppButton from '@/components/UI/AppButton.vue';
import InputText from 'primevue/inputtext';
import CompaniesCarousel from '@/components/CompaniesCarousel.vue';

const submitForm = () => {
  console.log('Schedule consultation clicked');
};
</script>