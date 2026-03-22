<template>
  <div
    class="md:hidden mt-10 text-center"
    data-aos="fade-up"
    data-aos-duration="350"
  >
    <AppAccordion
      :items="accordionItems"
      :multiple="false"
      :initial-value="initialValue"
      root-class="tech-accordion"
      header-class="!bg-transparent !border-none !px-0"
      content-class="!bg-transparent !border-none !px-0"
    >
      <template #expandicon>
        <Icon icon="ri:arrow-down-s-line" class="text-base transition-transform duration-300" />
      </template>
      <template #collapseicon>
        <Icon icon="ri:arrow-down-s-line" class="text-base transition-transform duration-300 rotate-180" />
      </template>

      <template #header="{ item }">
        <span class="w-full text-center font-sans text-[20px] text-text-dark">{{ $t(getRole(item).roleKey) }}</span>
      </template>

      <template #content="{ item }">
        <div class="grid grid-cols-2 gap-3 justify-items-center">
          <TechStackCard
            v-for="technology in getRole(item).technologies"
            :key="`mobile-${section.id}-${getRole(item).id}-${technology.name}`"
            :technology="technology"
          />
        </div>
      </template>
    </AppAccordion>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import AppAccordion from '@/components/UI/AppAccordion.vue';
import type { AppAccordionItem } from '@/components/UI/AppAccordion.vue';
import TechStackCard from '@/components/techStack/TechStackCard.vue';
import type { TechStackSectionItem } from '@/types/tech-stack';

const props = defineProps<{
  section: TechStackSectionItem;
}>();

interface TechStackAccordionItem extends AppAccordionItem {
  role: TechStackSectionItem['roles'][number];
}

const accordionItems = computed<TechStackAccordionItem[]>(() => {
  return props.section.roles.map((role, index) => ({
    value: String(role.id ?? index),
    role,
  }));
});

const initialValue = computed<string | null>(() => accordionItems.value[0]?.value ?? null);

const getRole = (item: AppAccordionItem): TechStackSectionItem['roles'][number] => {
  return item.role as TechStackSectionItem['roles'][number];
};
</script>

<style scoped>
:deep(.tech-accordion .p-accordionpanel) {
  border-bottom: 1px solid rgb(0 0 0 / 10%);
}

:deep(.tech-accordion .p-accordionpanel:last-child) {
  border-bottom: 0;
}
</style>
