<template>
  <section class="relative min-h-screen overflow-hidden flex items-center">
    <NuxtImg
      v-if="heroImage"
      :src="heroImage"
      alt="Hero background"
      format="webp"
      quality="80"
      class="absolute inset-0 w-full h-full object-cover z-0"
      preload
    />
    <div class="absolute inset-0 z-10 bg-indigo-gradient mix-blend-multiply opacity-80" />

    <div class="container relative z-20 mx-auto px-6 sm:px-10 lg:px-16 py-20">
      <div class="max-w-3xl mx-auto text-center md:text-left md:mx-0 md:ml-[5%] lg:ml-[8%]">
        <div
          v-if="flagIcon"
          data-aos="fade-right"
          data-aos-duration="500"
          class="flex items-center gap-3 mb-6 justify-center md:justify-start"
        >
          <NuxtImg
            :src="flagIcon"
            :alt="countryName"
            class="w-10 h-10 rounded-full object-cover shadow-lg"
          />
          <span class="text-white/80 text-lg font-medium">{{ countryName }}</span>
        </div>

        <h1
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-delay="100"
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {{ titleBeforeIn }}<span class="text-gradient">{{ titleAfterIn }}</span>
        </h1>

        <p
          v-if="subtitle"
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-delay="200"
          class="text-base md:text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto md:mx-0"
        >
          {{ subtitle }}
        </p>

        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-delay="300"
        >
          <AppButton
            severity="contrast"
            size="large"
            scrollToContact
          >
            {{ $t('hire.hero.cta') }}
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppButton from '@/components/UI/AppButton.vue';

const props = defineProps<{
  title: string;
  subtitle?: string;
  heroImage?: string;
  flagIcon?: string;
  countryName?: string;
}>();

const titleBeforeIn = computed(() => {
  const inIndex = props.title.toLowerCase().lastIndexOf(' in ');
  if (inIndex === -1) return props.title.split(' ').slice(0, 2).join(' ');
  return props.title.substring(0, inIndex + 4);
});

const titleAfterIn = computed(() => {
  const inIndex = props.title.toLowerCase().lastIndexOf(' in ');
  if (inIndex === -1) return props.title.split(' ').slice(2).join(' ');
  return props.title.substring(inIndex + 4);
});
</script>
