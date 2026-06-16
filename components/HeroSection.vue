<template>
  <section class="container relative w-full overflow-hidden bg-white pb-0">
    <div class=" mx-auto flex flex-col items-center justify-center pt-12">

      <div class="animate-fade-up hero-animate mb-6 md:mb-6">
        <BaseChip variant="light" size="normal">
          {{ $t('heroNew.badge') }}
        </BaseChip>
      </div>

      <div class="animate-fade-up hero-animate delay-100">
        <BaseTitle variant="main" class-name="mb-8 whitespace-pre-line text-center max-w-3xl font-semibold text-[28px] md:text-[56px] leading-[1.1]">
          {{ $t('heroNew.title') }}
        </BaseTitle>
      </div>

      <div class="animate-fade-up hero-animate delay-150 w-full max-w-2xl">
        <BaseText variant="main" class-name="mb-12 w-full text-center">
          {{ $t('heroNew.subtitle') }}
        </BaseText>
      </div>

      <div class="animate-fade-up hero-animate delay-200 w-full max-w-3xl">
        <form
          class="mb-12 w-full"
          @submit.prevent="submitForm"
        >
          <div class="flex w-full flex-col gap-3 md:flex-row md:items-center md:rounded-full border-0 md:border md:border-form-border p-0 md:p-2.5 md:transition-colors md:hover:border-form-border-hover">
            <div class="w-full rounded-4xl border border-form-border p-0 transition-colors hover:border-form-border-hover md:flex-1 md:rounded-none md:border-0 md:p-0 md:hover:border-transparent">
              <InputText
                v-model="email"
                type="email"
                :placeholder="$t('heroNew.inputPlaceholder')"
                autocomplete="email"
                class="w-full text-base"
              />
            </div>

            <AppButton type="submit" class="w-full md:w-auto">
              {{ $t('heroNew.scheduleButton') }}
            </AppButton>
          </div>
        </form>
      </div>

      <div class="animate-fade-up hero-animate delay-250 w-full">
        <CompaniesCarousel />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseChip from '@/components/UI/BaseChip.vue';
import AppButton from '@/components/UI/AppButton.vue';
import InputText from 'primevue/inputtext';
import CompaniesCarousel from '@/components/CompaniesCarousel.vue';

const emit = defineEmits<{
  (e: 'submit-email', email: string): void;
}>();

const email = ref('');

const submitForm = () => {
  emit('submit-email', email.value.trim());
  document.getElementById('contact-us')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
</script>