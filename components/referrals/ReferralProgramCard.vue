<template>
  <div
    data-aos="fade-up"
    class="max-w-[450px] h-full"
  >
    <div
      :class="[
        'w-full rounded-lg h-full shadow-sm relative overflow-hidden border-1 transition-all duration-300 hover:scale-105 flex flex-col',
        'border-gray-200 dark:border-white/10',
        hoverEffectClass,
      ]"
      class="h-full"
    >
      <div class="p-6 relative z-10 flex-1 flex flex-col">
        <div class="flex items-center gap-3 mb-2">
          <div :class="['p-3 rounded-lg', iconBgClass]">
            <AppIcon
              v-if="icon"
              :icon="icon"
              :class="['h-8', 'w-8', iconTextClass]"
            />
          </div>

          <div
            class="inline-flex items-center rounded-full border px-4.5 py-0.5 text-xs font-semibold border-gray-300 dark:border-gray-300"
            :class="badgeClass"
          >
            {{ $t(props.title) }}
            <!-- {{ $t(props.title) }} -->
          </div>
        </div>

        <div class="text-muted-foreground text-lg mb-4">
          <p
            v-for="(line, i) in ($t(props.description as string) || '').split('\n')"
            :key="i"
            :class="['mb-2', i === 0 ? 'font-semibold text-2xl' : 'text-secondary text-sm']"
          >
            {{ $t(line) }}
          </p>
        </div>
      </div>

      <div class="p-6 pt-0 relative z-10 mt-auto">
        <div class="space-y-4">
          <!-- Render exactly three feature rows from the provided features array -->
          <div
            v-for="(line, idx) in (props.features || []).slice(0, 3)"
            :key="idx"
            class="flex items-center gap-3"
          >
            <AppIcon
              :icon="iconForIndex(idx)"
              :class="['min-h-6', 'min-w-6', iconTextClass]"
            />
            <span :class="idx === 0 ? 'font-semibold' : ''">{{ $t(line as string) }}</span>
          </div>

          <div
            v-if="!props.index"
            class="mt-6 p-4 rounded-lg"
            :class="props.example && iconBgClass"
          >
            <p :class="['text-sm text-muted-color mt-auto']">
              {{ $t(props.example as string) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppIcon from '@/components/UI/AppIcon.vue';

/** Single referral program card */
interface Props {
  index: number;
  title: string;
  description: string;
  /** Exactly three feature rows to display */
  features: string[];
  /** Optional bottom example / note (rendered in the gray box) */
  example?: string;
  highlight?: boolean;
  /** Tailwind class string to override default accent/color (e.g. 'bg-rose-500' or 'bg-gradient-to-r from-rose-400 to-pink-500') */
  color?: string;
  icon?: string;
}
const props = withDefaults(defineProps<Props>(), {
  highlight: false,
  color: '',
  icon: '',
  example: '',
});
// Use explicit class strings instead of concatenation so Tailwind can generate them.
const iconBgClass = computed(() => {
  if (props.color) return props.color;
  return props.index === 0 ? 'bg-accent/10' : 'bg-violet-100';
});
// Icon text color - return one of the explicit classes above
const iconTextClass = computed(() => {
  return props.index === 0 ? 'text-accent' : 'text-violet-400';
});

// Hover effect class: static utility classes per index so Tailwind generates them
const hoverEffectClass = computed(() => {
  if (props.color) {
    // try deriving a border class from a bg- class
    if (props.color.startsWith('bg-'))
      return `hover:${props.color.replace(/^bg-/, 'border-')} hover:shadow-lg`;
    if (props.color.startsWith('border-')) return `hover:${props.color} hover:shadow-lg`;
    return 'hover:border-accent hover:shadow-lg';
  }
  return props.index === 0
    ? 'hover:border-accent hover:shadow-lg dark:hover:border-accent dark:hover:shadow-accent/30 dark:hover:shadow-xl'
    : 'hover:border-violet-300 hover:shadow-lg dark:hover:border-violet-300 dark:hover:shadow-violet-300/30 dark:hover:shadow-xl';
});

const badgeClass = computed(() => {
  if (props.color) return 'text-foreground border-transparent';
  return props.highlight
    ? 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80'
    : 'text-foreground';
});

/**
 * Choose a small icon name for each feature row (index-based).
 */
function iconForIndex(i: number) {
  const map = ['lucide:euro', 'lucide:trending-up', 'lucide:star'];
  return map[i] || 'lucide:dot';
}
</script>
