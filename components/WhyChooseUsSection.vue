<template>
  <section
    id="about"
    class="w-full mx-auto container overflow-hidden"
  >
    <div ref="sectionRef" class="relative">
      <AnimatedElement
        direction="bottom"
        :delay="100"
      >
        <BaseTitle
          tag="h2"
          variant="main"
          class-name="text-center lg:text-left max-w-md"
        >
          {{ $t('chooseUs.title') }}
        </BaseTitle>
      </AnimatedElement>

      <NuxtImg
        src="/images/techPartner/img.png"
        alt="Strategic tech partner"
        width="270"
        height="220"
        class="hidden lg:block absolute top-0 right-0 z-10 rounded-xl w-67.5 h-55 object-cover transition-transform duration-500 ease-out"
        :style="{ transform: imageTransform }"
        :class="isSectionInView ? 'opacity-100' : 'opacity-0'"
        data-aos="fade-left"
        data-aos-duration="600"
        data-aos-delay="180"
      />

      <div class="mt-10 md:mt-12 flex flex-col gap-6 lg:gap-8">
        <div
          v-for="(item, index) in items"
          :key="item.titleKey"
          :ref="element => setItemRef(element, index)"
          :class="activeIndex === index ? 'relative' : ''"
          data-aos="fade-up"
          data-aos-duration="600"
          :data-aos-delay="220 + index * 80"
        >
          <ChooseUsPartnerRow
            :title="$t(item.titleKey)"
            :description="$t(item.descriptionKey)"
            :is-active="activeIndex === index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';
import { useInView } from 'motion-v';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import ChooseUsPartnerRow from '@/components/chooseUs/ChooseUsPartnerRow.vue';

interface ChooseUsItem {
  titleKey: string;
  descriptionKey: string;
}

const items: ChooseUsItem[] = [
  { titleKey: 'chooseUs.feat3_title', descriptionKey: 'chooseUs.feat3_desc' },
  { titleKey: 'chooseUs.feat2_title', descriptionKey: 'chooseUs.feat2_desc' },
  { titleKey: 'chooseUs.feat4_title', descriptionKey: 'chooseUs.feat4_desc' },
  { titleKey: 'chooseUs.feat5_title', descriptionKey: 'chooseUs.feat5_desc' },
  { titleKey: 'chooseUs.feat6_title', descriptionKey: 'chooseUs.feat6_desc' },
];

const sectionRef = ref<HTMLElement | null>(null);
const isSectionInView = useInView(sectionRef, { amount: 0.35, initial: false });

const activeIndex = ref<number>(0);
const imageTranslateY = ref<number>(0);
const rowElements = ref<Array<HTMLElement | null>>([]);

const imageHeight = 220;
const baseImageTop = 20;
const switchThreshold = 24;
let frameId: number | null = null;

const imageTransform = computed(() => {
  const offsetY = isSectionInView.value ? imageTranslateY.value : imageTranslateY.value - 16;
  return `translateY(${offsetY}px)`;
});

const setItemRef = (element: Element | ComponentPublicInstance | null, index: number) => {
  if (element instanceof HTMLElement) {
    rowElements.value[index] = element;
    return;
  }

  rowElements.value[index] = null;
};

const updateActiveState = () => {
  if (!sectionRef.value || !import.meta.client || !isSectionInView.value) {
    return;
  }

  const viewportCenter = window.innerHeight / 2;
  let minDistance = Number.POSITIVE_INFINITY;
  let nextActiveIndex = activeIndex.value;
  let nextActiveDistance = Number.POSITIVE_INFINITY;

  rowElements.value.forEach((element, index) => {
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

    if (!isVisible) {
      return;
    }

    const rowCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - rowCenter);

    if (distance < minDistance) {
      minDistance = distance;
      nextActiveIndex = index;
      nextActiveDistance = distance;
    }
  });

  const currentElement = rowElements.value[activeIndex.value];

  if (currentElement) {
    const currentRect = currentElement.getBoundingClientRect();
    const currentIsVisible = currentRect.bottom > 0 && currentRect.top < window.innerHeight;

    if (currentIsVisible) {
      const currentCenter = currentRect.top + currentRect.height / 2;
      const currentDistance = Math.abs(viewportCenter - currentCenter);
      const shouldSwitch =
        nextActiveIndex !== activeIndex.value &&
        nextActiveDistance + switchThreshold < currentDistance;

      if (shouldSwitch) {
        activeIndex.value = nextActiveIndex;
      }
    } else {
      activeIndex.value = nextActiveIndex;
    }
  } else {
    activeIndex.value = nextActiveIndex;
  }

  const activeElement = rowElements.value[activeIndex.value];

  if (!activeElement) {
    return;
  }

  const sectionRect = sectionRef.value.getBoundingClientRect();
  const activeRect = activeElement.getBoundingClientRect();
  const targetTop = activeRect.top - sectionRect.top + activeRect.height / 2 - imageHeight / 2;
  const maxTop = Math.max(sectionRect.height - imageHeight, 0);
  const clampedTop = Math.min(Math.max(targetTop, 0), maxTop);

  imageTranslateY.value = clampedTop - baseImageTop;
};

const requestUpdate = () => {
  if (!import.meta.client || frameId !== null) {
    return;
  }

  frameId = window.requestAnimationFrame(() => {
    updateActiveState();
    frameId = null;
  });
};

onMounted(async() => {
  await nextTick();
  requestUpdate();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
});

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return;
  }

  if (frameId !== null) {
    window.cancelAnimationFrame(frameId);
    frameId = null;
  }

  window.removeEventListener('scroll', requestUpdate);
  window.removeEventListener('resize', requestUpdate);
});
</script>
