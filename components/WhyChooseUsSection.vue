<template>
  <section
    id="about"
    class="w-ful mx-auto container overflow-hidden"
  >
      <div class="relative">
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
          class="hidden lg:block absolute right-[0%] top-[5%] z-100 rounded-xl w-67.5 h-55 object-cover"
          data-aos="fade-left"
          data-aos-duration="600"
          data-aos-delay="180"
        />

        <div class="mt-10 md:mt-12 flex flex-col gap-6 lg:gap-8">
          <div
            v-for="(item, index) in items"
            :key="item.titleKey"
            :ref="element => setItemRef(element, index)"
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
import { nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
// import BaseText from '@/components/UI/BaseText.vue';
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

const activeIndex = ref<number>(0);
const rowElements = ref<Array<HTMLElement | null>>([]);
let frameId: number | null = null;

const setItemRef = (element: Element | ComponentPublicInstance | null, index: number) => {
  if (element instanceof HTMLElement) {
    rowElements.value[index] = element;
    return;
  }

  rowElements.value[index] = null;
};

const updateActiveIndex = () => {
  const viewportCenter = window.innerHeight / 2;
  let minDistance = Number.POSITIVE_INFINITY;
  let nextActiveIndex = activeIndex.value;

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
    }
  });

  activeIndex.value = nextActiveIndex;
};

const requestUpdate = () => {
  if (frameId !== null) {
    return;
  }

  frameId = window.requestAnimationFrame(() => {
    updateActiveIndex();
    frameId = null;
  });
};

onMounted(async() => {
  await nextTick();
  updateActiveIndex();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
});

onBeforeUnmount(() => {
  if (frameId !== null) {
    window.cancelAnimationFrame(frameId);
    frameId = null;
  }

  window.removeEventListener('scroll', requestUpdate);
  window.removeEventListener('resize', requestUpdate);
});
</script>
