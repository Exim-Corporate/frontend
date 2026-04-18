<template>
  <section class="container">
    <div class="flex flex-col gap-10 md:flex-row items-center md:items-start md:gap-10">
      <div class="md:basis-[35%] md:pr-4">
        <AnimatedElement direction="left" :delay="80">
          <div>
          <BaseTitle
            tag="h2"
            variant="main"
            class-name="text-center md:text-left"
          >
            {{ sectionData.title }}
          </BaseTitle>

          <BaseText
            v-if="sectionData.subtitle"
            variant="section"
            class-name="mt-5 text-center md:text-left text-text-dark/85"
          >
            {{ sectionData.subtitle }}
          </BaseText>

          <AppButton
            class="mt-10 w-full md:w-auto"
            scroll-to-contact
          >
            {{ resolvedButtonText }}
          </AppButton>
          </div>
        </AnimatedElement>
      </div>

      <div class="md:basis-[65%]">
        <AnimatedElement direction="right" :delay="140">
          <div class="space-y-6">
          <BaseText
            v-for="(paragraph, paragraphIndex) in descriptionParagraphs"
            :key="`paragraph-${paragraphIndex}`"
            variant="section"
            class-name="text-left text-text-dark/85"
          >
            {{ paragraph }}
          </BaseText>
          </div>
        </AnimatedElement>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-2 gap-2 md:mt-12 md:grid-cols-5 md:gap-4">
      <AnimatedElement
        v-for="(item, index) in limitedItems"
        :key="`${item.technologyName}-${index}`"
        direction="bottom"
        :delay="160 + index * 70"
      >
        <article
          :class="[
              'group flex h-40 w-full max-w-45 flex-col justify-center rounded-3xl border border-transparent p-4 text-center transition-all duration-300 hover:border hover:border-text-dark/15 md:h-50 md:max-w-62.5 md:p-6',
              'bg-background-gray',
          ]"
        >
            <div class="flex h-16 items-center justify-center">
            <AppIcon
              v-if="item.iconType === 'withSvg'"
              :icon="item.icon"
                :size="56"
                class-name="text-text-dark grayscale transition-transform duration-300 hover:scale-100 group-hover:scale-115 cursor-default"
            />
            <BaseText
              v-else
              variant="main"
                class-name="text-[42px] md:text-[56px] leading-none text-text-dark grayscale transition-transform duration-300 group-hover:scale-115"
            >
              {{ item.icon }}
            </BaseText>
          </div>

            <BaseText variant="card" class-name="mt-3 line-clamp-2 text-center text-text-dark md:mt-6">
            {{ item.technologyName }}
          </BaseText>
        </article>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import AppButton from '@/components/UI/AppButton.vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiServiceAboutSection } from '@/types/strapi';

const props = defineProps<{
  sectionData: StrapiServiceAboutSection;
}>();

const { t } = useI18n();

const resolvedButtonText = computed(() => {
  return props.sectionData.buttonText?.trim() || t('servicesProvide.button');
});

const descriptionParagraphs = computed<string[]>(() => {
  const raw = props.sectionData.description || '';
  return raw
    .split(/\n\s*\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
});

const limitedItems = computed(() => {
  return (props.sectionData.accordions || []).slice(0, 4);
});
</script>
