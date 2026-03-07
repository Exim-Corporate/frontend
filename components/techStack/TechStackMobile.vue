<template>
  <div class="md:hidden mt-10 text-center">
    <Accordion :multiple="false" :active-index="0" class="tech-accordion">
      <template #expandicon>
        <Icon icon="ri:arrow-down-s-line" class="text-base transition-transform duration-300" />
      </template>
      <template #collapseicon>
        <Icon icon="ri:arrow-down-s-line" class="text-base transition-transform duration-300 rotate-180" />
      </template>
      <AccordionTab
        v-for="role in section.roles"
        :key="`accordion-${section.id}-${role.id}`"
        :header="$t(role.roleKey)"
      >
        <div class="grid grid-cols-2 gap-3 justify-items-center">
          <TechStackCard
            v-for="technology in role.technologies"
            :key="`mobile-${section.id}-${role.id}-${technology.name}`"
            :technology="technology"
          />
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import TechStackCard from '@/components/techStack/TechStackCard.vue';
import type { TechStackSectionItem } from '@/types/tech-stack';

defineProps<{
  section: TechStackSectionItem;
}>();
</script>

<style scoped>
:deep(.tech-accordion .p-accordion-header-link) {
  background: transparent;
  border: none;
  padding-left: 0;
  padding-right: 0;
}

:deep(.tech-accordion .p-accordion-header-text) {
  text-align: center;
}

:deep(.tech-accordion .p-accordion-content) {
  background: transparent;
  border: none;
  padding-left: 0;
  padding-right: 0;
}
</style>
