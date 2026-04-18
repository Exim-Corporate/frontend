<template>
  <section class="w-full min-h-210">
    <div class="container mx-auto">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle tag="h3" variant="main" class-name="text-center">
          {{ $t('techStack.title') }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="200">
        <BaseText variant="section" class-name="text-center max-w-3xl mx-auto mt-4">
          {{ $t('techStack.subtitle') }}
        </BaseText>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="300">
        <TechStackCategoryTabs
          :sections="sections"
          :selected-section-id="selectedSectionId"
          @change="selectSection"
        />
      </AnimatedElement>

      <Transition name="stack-switch" mode="out-in">
        <div :key="selectedSectionId">
          <TechStackDesktop
            :section="selectedSection"
            :selected-role-id="selectedRoleId"
            @role-change="selectedRoleId = $event"
          />

          <TechStackMobile :section="selectedSection" />
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import TechStackCategoryTabs from '@/components/techStack/TechStackCategoryTabs.vue';
import TechStackDesktop from '@/components/techStack/TechStackDesktop.vue';
import TechStackMobile from '@/components/techStack/TechStackMobile.vue';
import techStackMock from '@/assets/data/tech-stack-mock.json';
import type { TechStackSectionItem } from '@/types/tech-stack';

const sections = techStackMock as TechStackSectionItem[];

const selectedSectionId = ref<string>(sections[0]?.id ?? '');
const selectedRoleId = ref<string>(sections[0]?.roles[0]?.id ?? '');

const selectedSection = computed<TechStackSectionItem>(() => {
  return sections.find(section => section.id === selectedSectionId.value) ?? sections[0];
});

const selectSection = (sectionId: string) => {
  selectedSectionId.value = sectionId;
};

watch(selectedSectionId, () => {
  selectedRoleId.value = selectedSection.value.roles[0]?.id ?? '';
});
</script>

<style scoped>
.stack-switch-enter-active,
.stack-switch-leave-active {
  transition: opacity 0.15s ease;
}

.stack-switch-enter-from,
.stack-switch-leave-to {
  opacity: 0;
}
</style>
