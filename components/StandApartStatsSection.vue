<template>
  <section class="container w-full bg-white">
    <AnimatedElement direction="bottom" :delay="100">
      <BaseTitle tag="h2" variant="main" class-name="text-center lg:text-left">
        {{ $t('standApart.title') }}
      </BaseTitle>
    </AnimatedElement>

    <div class="mt-8 md:hidden">
        <AnimatedElement
          v-for="(item, index) in stats"
          :key="item.labelKey"
          direction="bottom"
          :delay="100 + index * 60"
        >
          <div class="flex items-center lg:items-start gap-4 border-b border-black/10 py-5 last:border-b-0">
            <BaseText variant="card" className="w-1/2 text-left text-text-dark">
              {{ $t(item.labelKey) }}
            </BaseText>
            <BaseTitle tag="p" variant="main" class-name="w-1/2 text-start text-text-dark">
              {{ item.value }}
            </BaseTitle>
          </div>
        </AnimatedElement>
    </div>

    <div class="mt-12 hidden md:block">
      <AnimatedElement
        v-for="(item, index) in stats"
        :key="`desktop-${item.labelKey}`"
        direction="bottom"
        :delay="220 + index * 60"
      >
        <div class="flex items-start gap-8 border-b border-black/10 py-7 lg:py-8 last:border-b-0">
          <BaseText variant="card" class-name="w-1/2 text-left text-text-dark">
            {{ $t(item.labelKey) }}
          </BaseText>
          <BaseTitle tag="p" variant="main" class-name="w-1/2 text-left text-text-dark">
            {{ item.value }}
          </BaseTitle>
        </div>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';

interface StandApartStat {
  labelKey: string;
  value: string;
}

const stats: StandApartStat[] = [
  {
    labelKey: 'standApart.items.engineers',
    value: '200+',
  },
  {
    labelKey: 'standApart.items.knowHow',
    value: '6',
  },
  {
    labelKey: 'standApart.items.clients',
    value: '100+',
  },
  {
    labelKey: 'standApart.items.remote',
    value: '100%',
  },
];
</script>
