<template>
  <section class="container pb-20 overflow-hidden section-header">
    <div class="container">
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-4 md:mb-5"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mt-0">{{
          $t('process.title')
        }}</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t('process.subtitle') }}
        </p>
      </div>

      <!-- Grid Process Layout -->
      <div class="process-grid">
        <!-- First Row -->
        <div class="process-row">
          <!-- Step 1 with connector below (mobile only) -->
          <div class="step-with-connector">
            <ProcessStepCard
              :step="{ ...processSteps[0], number: 1 }"
              :color-class="getColorClass(0)"
              :gradient-class="getCardGradientClass(0)"
              :icon-bg-class="getIconBgClass(0)"
              :icon-color-class="getIconColorClass(0)"
              :connector-class="getConnectorClass(0)"
            />
            <div class="mobile-connector">
              <ProcessConnector
                type="vertical"
                :color-class="getConnectorClass(0)"
                animation="zoom-in"
                :delay="600"
              />
            </div>
          </div>

          <!-- Horizontal Connector between 1 & 2 (desktop only) -->
          <div class="desktop-connector">
            <ProcessConnector
              type="horizontal"
              :color-class="getConnectorClass(0)"
            />
          </div>

          <!-- Step 2 with connector below (mobile only) -->
          <div class="step-with-connector">
            <ProcessStepCard
              :step="{ ...processSteps[1], number: 2 }"
              :color-class="getColorClass(1)"
              :gradient-class="getCardGradientClass(1)"
              :icon-bg-class="getIconBgClass(1)"
              :icon-color-class="getIconColorClass(1)"
              :connector-class="getConnectorClass(1)"
              :is-left-arrow="true"
            />
            <div class="mobile-connector">
              <ProcessConnector
                type="vertical"
                :color-class="getConnectorClass(1)"
              />
            </div>
          </div>
        </div>

        <!-- Connector from 2 to 3 (desktop only) -->
        <div class="desktop-vertical-connector">
          <ProcessConnector
            type="vertical"
            :color-class="getConnectorClass(1)"
          />
        </div>

        <!-- Second Row -->
        <div class="process-row">
          <!-- Step 3 with connector below (mobile only) -->
          <div class="step-with-connector">
            <ProcessStepCard
              :step="{ ...processSteps[2], number: 3 }"
              :color-class="getColorClass(2)"
              :gradient-class="getCardGradientClass(2)"
              :icon-bg-class="getIconBgClass(2)"
              :icon-color-class="getIconColorClass(2)"
              :connector-class="getConnectorClass(2)"
            />
            <div class="mobile-connector">
              <ProcessConnector
                type="vertical"
                :color-class="getConnectorClass(2)"
                animation="fade-up"
                :delay="100"
              />
            </div>
          </div>

          <!-- Horizontal Connector between 3 & 4 (desktop only) -->
          <div class="desktop-connector">
            <ProcessConnector
              type="horizontal"
              :color-class="getConnectorClass(2)"
              animation="fade-right"
              :duration="800"
            />
          </div>

          <!-- Step 4 -->
          <div class="step-container">
            <ProcessStepCard
              :step="{ ...processSteps[3], number: 4 }"
              :color-class="getColorClass(3)"
              :gradient-class="getCardGradientClass(3)"
              :icon-bg-class="getIconBgClass(3)"
              :icon-color-class="getIconColorClass(3)"
              :connector-class="getConnectorClass(3)"
              :is-left-arrow="true"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProcessStepCard from '@/components/process/ProcessStepCard.vue';
import ProcessConnector from '@/components/process/ProcessConnector.vue';

// Process steps data
const processSteps = [
  {
    title: 'process.steps.discovery.title',
    icon: 'material-symbols:search',
    description: 'process.steps.discovery.description',
  },
  {
    title: 'process.steps.matching.title',
    icon: 'material-symbols:handshake',
    description: 'process.steps.matching.description',
  },
  {
    title: 'process.steps.onboarding.title',
    icon: 'material-symbols:person-add',
    description: 'process.steps.onboarding.description',
  },
  {
    title: 'process.steps.support.title',
    icon: 'material-symbols:support-agent',
    description: 'process.steps.support.description',
  },
];

// Color variants for markers and backgrounds
const colorVariants = ['bg-accent', 'bg-accent-mint', 'bg-accent-yellow', 'bg-accent-coral'];
const gradientVariants = [
  'from-accent/5 to-accent/20 dark:from-accent/10 dark:to-accent/30',
  'from-accent-mint/5 to-accent-mint/20 dark:from-accent-mint/10 dark:to-accent-mint/30',
  'from-accent-yellow/5 to-accent-yellow/20 dark:from-accent-yellow/10 dark:to-accent-yellow/30',
  'from-accent-coral/5 to-accent-coral/20 dark:from-accent-coral/10 dark:to-accent-coral/30',
];
const iconBgClasses = [
  'bg-accent/10 dark:bg-accent/20',
  'bg-accent-mint/10 dark:bg-accent-mint/20',
  'bg-accent-yellow/10 dark:bg-accent-yellow/20',
  'bg-accent-coral/10 dark:bg-accent-coral/20',
];
const iconColorClasses = [
  'text-accent dark:text-accent-hover',
  'text-accent-mint dark:text-accent-mint-hover',
  'text-accent-yellow dark:text-accent-yellow-hover',
  'text-accent-coral dark:text-accent-coral-hover',
];
const connectorVariants = [
  'connector-accent',
  'connector-mint',
  'connector-yellow',
  'connector-coral',
];

// Helper functions to get classes based on index
const getColorClass = (index: number) => colorVariants[index % colorVariants.length];
const getCardGradientClass = (index: number) =>
  `bg-gradient-to-br ${gradientVariants[index % gradientVariants.length]}`;
const getIconBgClass = (index: number) => iconBgClasses[index % iconBgClasses.length];
const getIconColorClass = (index: number) => iconColorClasses[index % iconColorClasses.length];
const getConnectorClass = (index: number) => connectorVariants[index % connectorVariants.length];
</script>

<style scoped>
.process-grid {
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin: 0 auto;
}

.process-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.step-container,
.step-with-connector {
  width: 45%;
}

.step-with-connector {
  display: flex;
  flex-direction: column;
}

.desktop-connector {
  width: 10%;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.desktop-vertical-connector {
  display: flex;
  justify-content: center;
  height: 4rem;
  margin: 1rem 0;
}

.mobile-connector {
  display: none;
  margin: 0.5rem auto;
  height: 3rem;
}

@media (max-width: 768px) {
  .process-row {
    flex-direction: column;
    align-items: center;
  }

  .step-container,
  .step-with-connector {
    width: 90%;
    margin-bottom: 0.5rem;
  }

  .desktop-connector,
  .desktop-vertical-connector {
    display: none;
  }

  .mobile-connector {
    display: block;
  }
}
</style>
