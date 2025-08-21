<template>
  <div
    :class="[
      'rounded-xl p-6 h-full border transition shadow-sm flex flex-col',
      highlight
        ? 'bg-gradient-to-br from-accent/10 to-primary/10 border-accent/40 dark:border-accent/50'
        : 'bg-white/70 dark:bg-navy-blue/70 border-gray-200/60 dark:border-white/10',
    ]"
    data-aos="fade-up"
  >
    <div class="flex items-start gap-3 mb-4">
      <AppIcon
        v-if="icon"
        :name="icon"
        class="w-8 h-8 text-accent"
      />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
    </div>
    <p class="text-gray-600 dark:text-gray-300 mb-4 flex-1">{{ description }}</p>
    <div class="mt-auto">
      <span
        class="inline-block text-sm font-medium px-3 py-1 rounded-full bg-accent text-white shadow"
      >
        {{ reward }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
/** Single referral program card */
interface Props {
  title: string;
  description: string;
  reward: string;
  highlight?: boolean;
  icon?: string;
}
defineProps<Props>();
</script>
