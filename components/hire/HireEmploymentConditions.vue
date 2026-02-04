<template>
  <section class="container py-16 md:py-20 overflow-hidden">
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      class="text-center mb-16"
    >
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        {{ $t('hire.employment.title1') }}
        <span class="text-gradient">{{ $t('hire.employment.title_span') }}</span>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {{ $t('hire.employment.subtitle') }}
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-3 mb-8 px-4">
      <Badge
        v-for="tab in tabs"
        :key="tab.id"
        :severity="selectedTab === tab.id ? 'primary' : 'secondary'"
        :size="'xlarge'"
        class="cursor-pointer p-2 px-3 text-sm md:text-base animate-pulse-hover"
        @click="selectedTab = tab.id"
      >
        <span class="text-text-dark dark:text-text-light"> {{ tab.icon }} {{ tab.label }} </span>
      </Badge>
    </div>

    <div class="border-b border-gray-200 dark:border-gray-700 mb-8" />

    <div
      data-aos="fade-up"
      data-aos-duration="500"
      class="w-full min-h-[400px]"
    >
      <TransitionGroup
        name="condition-transition"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="item in currentTab?.items || []"
          :key="item.id"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center"
            >
              <Icon
                :icon="item.icon || 'mdi:information-outline'"
                class="w-6 h-6 text-accent"
              />
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ item.title }}
              </h4>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import Badge from 'primevue/badge';

interface ConditionItem {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

interface ConditionTab {
  id: string;
  icon: string;
  label: string;
  items: ConditionItem[];
}

const props = defineProps<{
  conditions?: ConditionTab[];
}>();

const { t } = useI18n();

const defaultTabs = computed<ConditionTab[]>(() => [
  {
    id: 'payment',
    icon: '💰',
    label: t('hire.employment.tabs.payment'),
    items: [
      {
        id: 'payroll',
        icon: 'mdi:calendar-month',
        title: t('hire.employment.payroll.title'),
        description: t('hire.employment.payroll.description'),
      },
      {
        id: 'taxes',
        icon: 'mdi:percent',
        title: t('hire.employment.taxes.title'),
        description: t('hire.employment.taxes.description'),
      },
      {
        id: 'overtime',
        icon: 'mdi:clock-overtime',
        title: t('hire.employment.overtime.title'),
        description: t('hire.employment.overtime.description'),
      },
    ],
  },
  {
    id: 'leave',
    icon: '🏖️',
    label: t('hire.employment.tabs.leave'),
    items: [
      {
        id: 'vacation',
        icon: 'mdi:beach',
        title: t('hire.employment.vacation.title'),
        description: t('hire.employment.vacation.description'),
      },
      {
        id: 'sick',
        icon: 'mdi:hospital',
        title: t('hire.employment.sick.title'),
        description: t('hire.employment.sick.description'),
      },
      {
        id: 'parental',
        icon: 'mdi:baby-carriage',
        title: t('hire.employment.parental.title'),
        description: t('hire.employment.parental.description'),
      },
    ],
  },
  {
    id: 'holidays',
    icon: '🎉',
    label: t('hire.employment.tabs.holidays'),
    items: [
      {
        id: 'public',
        icon: 'mdi:calendar-star',
        title: t('hire.employment.public.title'),
        description: t('hire.employment.public.description'),
      },
    ],
  },
  {
    id: 'additional',
    icon: '📋',
    label: t('hire.employment.tabs.additional'),
    items: [
      {
        id: 'workweek',
        icon: 'mdi:clock-outline',
        title: t('hire.employment.workweek.title'),
        description: t('hire.employment.workweek.description'),
      },
      {
        id: 'contracts',
        icon: 'mdi:file-document-outline',
        title: t('hire.employment.contracts.title'),
        description: t('hire.employment.contracts.description'),
      },
    ],
  },
]);

const tabs = computed(() => (props.conditions?.length ? props.conditions : defaultTabs.value));
const selectedTab = ref(tabs.value[0]?.id || 'payment');
const currentTab = computed(() => tabs.value.find(tab => tab.id === selectedTab.value));
</script>

<style scoped>
.p-badge {
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.3s;
}

.animate-pulse-hover:hover {
  transform: scale(1.05);
}

.condition-transition-enter-active,
.condition-transition-leave-active {
  transition: all 0.3s ease;
}

.condition-transition-enter-from,
.condition-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
