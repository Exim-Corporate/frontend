<template>
  <span ref="rootEl" class="inline-flex items-baseline">
    <span v-if="parsed.prefix" class="whitespace-pre">{{ parsed.prefix }}</span>

    <span v-if="parsed.isNumeric">{{ animatedValue }}</span>
    <span v-else class="whitespace-pre">{{ textValue }}</span>

    <span v-if="parsed.suffix" class="whitespace-pre">{{ parsed.suffix }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  value: string | number;
  durationMs?: number;
  startFrom?: number;
}>(), {
  durationMs: 2000,
  startFrom: 0,
});

const isReducedMotion = ref(false);
const animatedValue = ref('0');
const hasEnteredView = ref(false);
const rootEl = ref<HTMLElement | null>(null);

const textValue = computed(() => String(props.value ?? '').trim());

const parsed = computed(() => {
  const raw = textValue.value;
  const match = raw.match(/-?\d+(?:[.,]\d+)?/);

  if (!match) {
    return {
      isNumeric: false,
      prefix: '',
      number: 0,
      suffix: '',
    };
  }

  const matchedNumber = match[0] ?? '';
  const startIndex = match.index ?? 0;
  const endIndex = startIndex + matchedNumber.length;

  const normalizedNumber = matchedNumber.replace(',', '.');
  const numericValue = Number.parseFloat(normalizedNumber);

  if (!Number.isFinite(numericValue)) {
    return {
      isNumeric: false,
      prefix: '',
      number: 0,
      suffix: '',
    };
  }

  return {
    isNumeric: true,
    prefix: raw.slice(0, startIndex),
    number: Math.round(numericValue),
    suffix: raw.slice(endIndex),
  };
});

let fallbackRafId: number | null = null;
let observer: IntersectionObserver | null = null;

const stopFallbackAnimation = () => {
  if (fallbackRafId !== null) {
    cancelAnimationFrame(fallbackRafId);
    fallbackRafId = null;
  }
};

const runFallbackAnimation = () => {
  stopFallbackAnimation();

  const end = Number.isFinite(parsed.value.number) ? parsed.value.number : 0;
  const start = isReducedMotion.value
    ? end
    : (Number.isFinite(props.startFrom) ? props.startFrom : 0);

  if (isReducedMotion.value || start === end) {
    animatedValue.value = String(end);
    return;
  }

  const duration = Math.max(200, props.durationMs);
  const startedAt = performance.now();

  const tick = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (end - start) * eased);
    animatedValue.value = String(value);

    if (progress < 1) {
      fallbackRafId = requestAnimationFrame(tick);
      return;
    }

    fallbackRafId = null;
  };

  fallbackRafId = requestAnimationFrame(tick);
};

const startAnimation = () => {
  if (!parsed.value.isNumeric) return;
  runFallbackAnimation();
};

onMounted(() => {
  if (!parsed.value.isNumeric) return;

  isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion.value) {
    hasEnteredView.value = true;
    startAnimation();
    return;
  }

  if (!rootEl.value) return;

  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;

      hasEnteredView.value = true;
      startAnimation();

      observer?.disconnect();
      observer = null;
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  observer.observe(rootEl.value);
});

watch(
  () => textValue.value,
  () => {
    if (!parsed.value.isNumeric || !hasEnteredView.value) return;
    startAnimation();
  },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  stopFallbackAnimation();
});
</script>
