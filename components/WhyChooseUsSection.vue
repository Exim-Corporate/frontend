<template>
  <section
    v-if="sectionData"
    id="about"
    class="w-full mx-auto container overflow-hidden"
  >
    <div ref="sectionRef" class="relative">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle
          tag="h2"
          variant="main"
          class-name="text-center lg:text-left lg:max-w-md"
        >
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>

      <NuxtImg
        src="/images/techPartner/img.webp"
        alt="Strategic tech partner"
        width="270"
        height="220"
        loading="lazy"
        quality="80"
        format="webp"
        class="hidden xl:block absolute top-0 right-0 z-10 rounded-xl w-67.5 h-55 object-cover transition-all duration-2000 ease-out"
        :style="{
          transform: `translateY(${imageY}px)`,
          opacity: isSectionInView ? 1 : 0,
        }"
      />

      <div class="mt-10 md:mt-12 flex flex-col gap-6 lg:gap-8">
        <div
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          :ref="(el) => setItemRef(el, index)"
          data-aos="fade-up"
          data-aos-duration="450"
          :data-aos-delay="220 + index * 80"
        >
          <ChooseUsPartnerRow
            :title="item.title"
            :description="item.description"
            :is-active="activeIndex === index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';
import { inView, useInView } from 'motion-v';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import ChooseUsPartnerRow from '@/components/chooseUs/ChooseUsPartnerRow.vue';
import type { StrapiWhyChooseUsItem, StrapiWhyChooseUsSection } from '@/types/strapi';

interface Props {
  sectionData?: StrapiWhyChooseUsSection | null;
}

const props = defineProps<Props>();

const items = computed<StrapiWhyChooseUsItem[]>(() => props.sectionData?.items ?? []);

const sectionRef = ref<HTMLElement | null>(null);
const isSectionInView = useInView(sectionRef, { amount: 0.2, initial: false });

const activeIndex = ref(0);
const rowElements = ref<Array<HTMLElement | null>>([]);
// item center Y relative to the section, computed once on mount
const itemCenters = ref<number[]>([]);

const imageHeight = 220;
const baseImageTop = 20;

// Cache section height to avoid forced reflow in computed
const sectionHeight = ref(0);

// Image Y derived purely from pre-measured layout — no per-frame DOM reads
const imageY = computed(() => {
  const center = itemCenters.value[activeIndex.value];
  if (center === undefined || sectionHeight.value === 0) return 0;
  const maxY = Math.max(sectionHeight.value - imageHeight, 0);
  return Math.min(Math.max(center - imageHeight / 2 - baseImageTop, 0), maxY);
});

const setItemRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  rowElements.value[index] = el instanceof HTMLElement ? el : null;
};

const stopFns: Array<() => void> = [];

onMounted(async () => {
  await nextTick();

  // One-time layout measurements — no scroll-time DOM reads
  sectionHeight.value = sectionRef.value?.offsetHeight ?? 0;
  itemCenters.value = rowElements.value.map(
    (el) => (el ? el.offsetTop + el.offsetHeight / 2 : 0),
  );

  // Scroll-spy via inView: fires when item top crosses 60% mark from the top
  rowElements.value.forEach((el, index) => {
    if (!el) return;

    const stop = inView(
      el,
      () => {
        activeIndex.value = index;
        // On leave (scroll back up): step back to previous item
        return () => {
          if (activeIndex.value === index) {
            activeIndex.value = Math.max(0, index - 1);
          }
        };
      },
      { margin: '0px 0px -40% 0px' },
    );

    if (typeof stop === 'function') stopFns.push(stop);
  });
});

onBeforeUnmount(() => {
  stopFns.forEach((fn) => fn());
});
</script>
