<template>
  <section class="container pt-20 overflow-hidden">
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      class="text-center mb-16"
    >
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        {{ $t('techStack.title1') }}
        <span class="text-gradient">{{ $t('techStack.title_span') }}</span>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {{ $t('techStack.subtitle') }}
      </p>
    </div>

    <!-- Categories (Badges) always on top -->
    <div class="flex flex-wrap justify-center gap-3 mb-8 px-4">
      <Badge
        v-for="category in techStacks"
        :key="category.id"
        :severity="selectedCategory === category.id ? 'primary' : 'secondary'"
        :size="'xlarge'"
        class="cursor-pointer p-2 px-3 text-sm md:text-base animate-pulse-hover"
        @click="selectedCategory = category.id"
      >
        <span class="text-text-dark dark:text-text-light"
          >{{ category.icon }} {{ $t(category.nameKey) }}</span
        >
      </Badge>
    </div>

    <!-- Divider -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-8" />

    <!-- Technologies (Icons) taking full width -->
    <div
      ref="containerRef"
      class="w-full"
    >
      <TransitionGroup
        name="tech-transition"
        tag="div"
        class="tech-container"
      >
        <TechIcon
          v-for="(tech, index) in currentStack?.technologies || []"
          :key="tech.id"
          :name="tech.name"
          :icon="tech.icon ?? ''"
          :position-style="getIconPosition(index, currentStack?.technologies.length || 0)"
          :size="getIconSize()"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Badge from 'primevue/badge';
import TechIcon from '@/components/UI/TechIcon.vue';
import { techStacks } from '@/composables/useCommonData';

// Get initial selected category ID
const selectedCategory = ref(techStacks[0].id);
const containerRef = ref<HTMLElement | null>(null);
const isClient = ref(false);
const windowWidth = ref(0);

// Update window width on resize
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Set client-side flag and window width after component is mounted
onMounted(() => {
  isClient.value = true;
  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

// Get current stack based on selected category ID
const currentStack = computed(() => {
  return techStacks.find(stack => stack.id === selectedCategory.value);
});

// Dynamic icon size based on screen width
const getIconSize = () => {
  if (windowWidth.value <= 375) return 36;
  if (windowWidth.value <= 640) return 42;
  if (windowWidth.value <= 768) return 48;
  return 50;
};

// Function to calculate icon positions on an ellipse
const getIconPosition = (index: number, total: number): Record<string, string> => {
  if (total === 0 || !isClient.value) return { position: 'absolute' }; // Return minimal style for SSR

  // Configuration for ellipse dimensions - adaptive based on screen width
  const containerWidth = containerRef.value?.offsetWidth || 800;

  // Calculate responsive radius values
  let radiusX, radiusY;

  if (windowWidth.value <= 375) {
    // Extra small screens - reduce radius significantly
    radiusY = 100;
    radiusX = Math.min(containerWidth * 0.25, 100);
  } else if (windowWidth.value <= 640) {
    // Small screens
    radiusY = 120;
    radiusX = Math.min(containerWidth * 0.28, 140);
  } else if (windowWidth.value <= 768) {
    // Medium screens
    radiusY = 130;
    radiusX = Math.min(containerWidth * 0.3, 160);
  } else {
    // Large screens
    radiusY = 150;
    radiusX = Math.max(containerWidth * 0.3, 200);
  }

  // Calculate position around the ellipse
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;

  return {
    position: 'absolute',
    top: `calc(35% + ${radiusY * Math.sin(angle)}px)`,
    left: `calc(50% + ${radiusX * Math.cos(angle)}px)`,
    transform: 'translate(-50%, -50%)',
    'animation-delay': `${index * 0.15}s`,
    'z-index': '5',
  };
};
</script>

<style scoped>
.p-badge {
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.3s;
}

.animate-pulse-hover:hover {
  animation: pulse 0.5s;
  transform: scale(1.05);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1.05);
  }
}

.tech-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px; /* Smaller height for mobile */
}

.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #af55ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent; /* Using color:transparent instead of text-fill-color */
}

/* Mobile styles */
@media (max-width: 375px) {
  .tech-container {
    min-height: 280px;
    padding: 0 10px;
  }
}

/* Tablet styles */
@media (min-width: 376px) and (max-width: 767px) {
  .tech-container {
    min-height: 350px;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  .tech-container {
    min-height: 500px;
  }
}

@media (min-width: 1024px) {
  .tech-container {
    min-height: 550px;
  }
}

.tech-transition-enter-active,
.tech-transition-leave-active {
  transition:
    filter 0.5s,
    opacity 0.5s,
    transform 0.5s;
}

.tech-transition-enter-from,
.tech-transition-leave-to {
  opacity: 0;
  filter: blur(10px);
  transform: scale(0.8);
}
</style>
