<template>
  <section class="container overflow-hidden">
    <div
      class="min-h-50 overflow-hidden rounded-3xl px-5 py-5 md:px-8 md:py-8"
      :style="sectionBackgroundStyle"
    >
      <div class="flex min-h-50 flex-col justify-between gap-6 md:gap-8">
        <AnimatedElement direction="bottom" :delay="100">
          <div class="flex gap-4 flex-row justify-between md:gap-6">
            <BaseTitle
              tag="h2"
              variant="main"
              class-name="max-w-85 text-left text-white md:text-[40px] md:leading-12"
            >
              {{ sectionData.title }}
            </BaseTitle>

            <div v-if="sectionData.buttonText && (isLocalScroll || buttonHref)" class="shrink-0 md:self-start">
              <AppButton
                v-if="isLocalScroll"
                variant="white"
                @click="handleButtonClick"
              >
                {{ sectionData.buttonText }}
              </AppButton>

              <NuxtLink v-else :to="buttonHref">
                <AppButton variant="white">
                  {{ sectionData.buttonText }}
                </AppButton>
              </NuxtLink>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement
          v-if="sectionData.description"
          direction="bottom"
          :delay="150"
        >
          <div class="w-full rounded-3xl bg-white/90 p-5 md:p-6">
            <BaseText
              variant="section"
              class-name="text-left text-text-dark md:text-[18px] md:leading-7.5"
            >
              {{ sectionData.description }}
            </BaseText>
          </div>
        </AnimatedElement>
      </div>

      <span class="sr-only">{{ imageAlt }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
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

const localScrollTargetId = computed(() => {
  if (props.scrollTargetId) {
    return props.scrollTargetId;
  }

  const buttonUrl = props.sectionData.buttonUrl?.trim();
  if (!buttonUrl || !buttonUrl.startsWith('#')) {
    return '';
  }

  return buttonUrl.slice(1);
});

const isLocalScroll = computed(() => Boolean(localScrollTargetId.value));

const buttonHref = computed(() => {
  if (isLocalScroll.value) {
    return `#${localScrollTargetId.value}`;
  }

  return props.sectionData.buttonUrl || '';
});

const imageSrc = computed(() => {
  const image = props.sectionData.image;
  const imageUrl = image?.formats?.large?.url || image?.url || image?.formats?.medium?.url || image?.formats?.small?.url;
  return imageUrl ? normalizeImageUrl(imageUrl) : '/images/Header.webp';
});

const imageAlt = computed(() => props.sectionData.imageAlt || props.sectionData.title);

const handleButtonClick = () => {
  if (import.meta.server || !localScrollTargetId.value) {
    return;
  }

  const target = document.getElementById(localScrollTargetId.value);

  if (!target) {
    openContactModal('cta-button');
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const sectionBackgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.52) 0%, rgba(15, 23, 42, 0.22) 52%, rgba(15, 23, 42, 0.38) 100%), url("${imageSrc.value}")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));
</script>