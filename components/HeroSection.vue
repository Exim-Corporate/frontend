<template>
  <section class="relative w-full overflow-hidden bg-white pb-0">
    <div class="container mx-auto flex flex-col items-center justify-center min-h-[80vh] top-20">
      
      <AnimatedElement direction="bottom" :delay="100">
        <BaseChip variant="light" size="normal" class="mb-6 md:mb-8">
          {{ $t('heroNew.badge') }}
        </BaseChip>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="200" class="">
        <BaseTitle variant="main" class-name="mb-8 whitespace-pre-line text-center max-w-2xl font-semibold text-[28px] md:text-[56px] leading-[1.1]">
          {{ $t('heroNew.title') }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="300">
        <BaseText variant="main" className="mb-12 max-w-2xl text-center">
          {{ $t('heroNew.subtitle') }}
        </BaseText>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="400" class="w-full max-w-xl">
        <form
          class="mb-12 w-full"
          @submit.prevent="submitForm"
        >
          <div class="flex w-full flex-col gap-3 md:flex-row md:items-center md:rounded-full border-0 md:border md:border-form-border p-0 md:p-2.5 md:transition-colors md:hover:border-form-border-hover">
            <div class="w-full rounded-4xl border border-form-border p-0 transition-colors hover:border-form-border-hover md:flex-1 md:rounded-none md:border-0 md:p-0 md:hover:border-transparent">
              <InputText
                type="email"
                :placeholder="$t('heroNew.inputPlaceholder')"
                class="w-full text-base"
                required
              />
            </div>

            <AppButton type="submit" class="w-full md:w-auto">
              {{ $t('heroNew.scheduleButton') }}
            </AppButton>
          </div>
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
import BaseText from '@/components/UI/BaseText.vue';
import BaseChip from '@/components/UI/BaseChip.vue';
import AppButton from '@/components/UI/AppButton.vue';
import InputText from 'primevue/inputtext';
import CompaniesCarousel from '@/components/CompaniesCarousel.vue';

const submitForm = () => {
  console.log('Schedule consultation clicked');
};
</script>