<template>
  <Breadcrumb
    :model="items"
    class="border-none! bg-transparent! p-0!"
  >
    <template #item="{ item }">
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="text-sm text-text-dark/70 transition-colors hover:text-text-dark"
      >
        {{ item.label }}
      </NuxtLink>
      <span
        v-else
        class="text-sm text-text-dark"
      >
        {{ item.label }}
      </span>
    </template>
    <template #separator>
      <span class="px-2 text-text-dark/60">/</span>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
