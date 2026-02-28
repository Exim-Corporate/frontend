<template>
  <div class="marquee-container">
    <div class="gradient-mask-left" />
    <div class="gradient-mask-right" />
    <div class="marquee">
      <div class="marquee-content">
        <div
          v-for="(company, index) in companies"
          :key="index"
          class="company-item flex flex-col items-center justify-center mx-2 text-black opacity-[35%]"
        >
          <AppIcon
            :icon="company.icon"
            :size="38"
            :className="'pointer-events-none'"
          />
          <div class="mt-2 text-center text-sm font-medium">{{ company.name }}</div>
        </div>
      </div>
      <div
        class="marquee-content"
        aria-hidden="true"
      >
        <div
          v-for="(company, index) in companies"
          :key="index"
          class="company-item flex flex-col items-center justify-center mx-2 text-black opacity-[35%]"
        >
          <AppIcon
            :icon="company.icon"
            :size="38"
            :className="'pointer-events-none'"
          />
          <div class="mt-2 text-center text-sm font-medium">{{ company.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from './AppIcon.vue';

const companies = [
  {
    name: 'Dell',
    icon: 'cib:dell',
  },
  {
    name: 'Amazon',
    icon: 'cib:amazon',
  },
  {
    name: 'DuckDuckGo',
    icon: 'cib:duckduckgo',
  },
  {
    name: 'Spotify',
    icon: 'cib:spotify',
  },
  {
    name: 'Telekom',
    icon: 'cib:t-mobile',
  },
  {
    name: 'Sonos',
    icon: 'cib:sonos',
  },
  {
    name: 'TripAdvisor',
    icon: 'cib:tripadvisor',
  },
  {
    name: 'Xiaomi',
    icon: 'cib:xiaomi',
  },
  {
    name: 'Vimeo',
    icon: 'cib:vimeo-v',
  },
  {
    name: 'Slack',
    icon: 'cib:slack',
  },
];
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee {
  display: flex;
  width: fit-content;
  animation: scroll 120s linear infinite;
  will-change: transform;
}

.marquee-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
  gap: 2px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .marquee {
    transition: transform 0.1s linear;
  }
}
</style>
