<template>
  <section class="container overflow-hidden">
    <div
      class="min-h-50 overflow-hidden rounded-4xl px-5 py-5 md:px-8 md:py-8"
      :style="sectionBackgroundStyle"
    >
      <div class="flex min-h-50 flex-col justify-between gap-6 md:gap-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <BaseTitle
            tag="h2"
            variant="main"
            class-name="max-w-65 text-left text-white md:max-w-96.25 md:text-[40px] md:leading-12"
          >
            {{ sectionData.title }}
          </BaseTitle>

          <div v-if="sectionData.buttonText && buttonHref" class="shrink-0 md:self-start">
            <NuxtLink :to="buttonHref" @click="handleButtonClick">
              <AppButton variant="white">
                {{ sectionData.buttonText }}
              </AppButton>
            </NuxtLink>
          </div>
        </div>

        <div v-if="sectionData.description" class="w-full rounded-4xl bg-white/90 p-5 md:p-6">
        <BaseText
          variant="section"
            class-name="text-left text-text-dark md:text-[18px] md:leading-7.5"
        >
          {{ sectionData.description }}
        </BaseText>
        </div>
      </div>

      <span class="sr-only">{{ imageAlt }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppButton from '@/components/UI/AppButton.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import { useContactModal } from '@/composables/useContactModal';
import type { StrapiCtaSection } from '@/types/strapi';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

const props = defineProps<{
  sectionData: StrapiCtaSection;
  scrollTargetId?: string;
}>();

const { open: openContactModal } = useContactModal();

const buttonHref = computed(() => {
  if (props.scrollTargetId) {
    return `#${props.scrollTargetId}`;
  }

  return props.sectionData.buttonUrl || '';
});

const imageSrc = computed(() => {
  const image = props.sectionData.image;
  const imageUrl = image?.formats?.large?.url || image?.url || image?.formats?.medium?.url || image?.formats?.small?.url;
  return imageUrl ? normalizeImageUrl(imageUrl) : '/images/Header.webp';
});

const imageAlt = computed(() => props.sectionData.imageAlt || props.sectionData.title);

const handleButtonClick = (event: MouseEvent) => {
  if (!props.scrollTargetId || import.meta.server) {
    return;
  }

  const target = document.getElementById(props.scrollTargetId);

  if (!target) {
    event.preventDefault();
    openContactModal('cta-button');
    return;
  }

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const sectionBackgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.52) 0%, rgba(15, 23, 42, 0.22) 52%, rgba(15, 23, 42, 0.38) 100%), url("${imageSrc.value}")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));
</script>