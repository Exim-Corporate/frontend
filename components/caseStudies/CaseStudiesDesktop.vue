<template>
  <div class="hidden lg:flex md:items-start gap-10 mt-12">
    <div
      class="flex w-60 shrink-0 flex-col"
      data-aos="fade-right"
      data-aos-duration="0"
    >
      <button
        v-for="study in studies"
        :key="study.id"
        type="button"
        class="group relative py-4 text-left cursor-pointer"
        @click="$emit('change', study.id)"
      >
        <div class="flex items-center justify-between gap-4">
          <BaseText variant="main">{{ $t(study.labelKey) }}</BaseText>
          <Icon
            icon="ri:arrow-right-line"
            class="text-xl transition-opacity duration-200"
            :class="selectedStudyId === study.id ? 'opacity-100' : 'opacity-0'"
          />
        </div>
        <span
          class="absolute left-0 bottom-0 h-px bg-text-dark transition-all duration-300"
          :class="selectedStudyId === study.id ? 'w-full' : 'w-0 group-hover:w-[30%]'"
        />
      </button>
    </div>

    <div
      :key="selectedStudyId"
      class="flex-1 min-w-0 overflow-x-hidden"
      data-aos="fade-left"
      data-aos-duration="350"
    >
      <div class="flex items-start gap-6 lg:gap-15 min-h-125 ">
        <div class="md:pl-10 flex-1 max-w-130">
          <BaseTitle tag="h3" variant="subheader" class-name="text-left text-text-dark">
            {{ $t(selectedStudy.titleKey) }}
          </BaseTitle>

          <BaseText variant="section" class-name="mt-4 text-left text-text-secondary">
            {{ $t(selectedStudy.descriptionKey) }}
          </BaseText>

          <div class="mt-7">
            <BaseTitle tag="h4" variant="subheader" class-name="text-left text-text-dark">
              {{ $t('caseStudies.impactTitle') }}
            </BaseTitle>

            <div class="mt-3 grid grid-cols-2 gap-8">
              <div v-for="impact in selectedStudy.impacts" :key="impact.labelKey">
                <BaseTitle tag="p" variant="subheader" class-name="text-left text-text-dark">
                  {{ impact.value }}
                </BaseTitle>
                <BaseText variant="card" class-name="mt-1 text-left text-text-secondary">
                  {{ $t(impact.labelKey) }}
                </BaseText>
              </div>
            </div>
          </div>

          <AppButton class="mt-9">
            {{ $t('caseStudies.cta') }}
          </AppButton>
        </div>

        <!-- <div class="h-105 w-90 shrink-0 -mr-10 lg:mr-0"> -->
          <NuxtImg
            :src="selectedStudy.image"
            :alt="$t(selectedStudy.titleKey)"
            loading='lazy'
            width="360"
            height="420"
            class="h-105 w-90 absolute top-0 right-0 rounded-[20px] object-cover"
          />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import AppButton from '@/components/UI/AppButton.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { CaseStudyItem } from '@/types/case-studies';

const props = defineProps<{
  studies: CaseStudyItem[];
  selectedStudyId: string;
}>();

defineEmits<{
  change: [studyId: string];
}>();

const selectedStudy = computed<CaseStudyItem>(() => {
  return props.studies.find((study) => study.id === props.selectedStudyId) ?? props.studies[0];
});
</script>
