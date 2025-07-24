<template>
  <div
    class="tech-icon flex flex-col items-center text-center gap-2 p-3 rounded-lg cursor-pointer hover:scale-110 transition-transform"
    :style="positionStyle"
    @click="handleClick"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <AppIcon
      :icon="icon"
      :size="size"
      :className="'transition-all duration-300'"
    />
    <span class="text-xs md:text-sm text-dark dark:text-light font-medium">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/UI/AppIcon.vue';

defineProps<{
  name: string;
  icon: string;
  positionStyle: Record<string, string>;
  size?: number;
}>();

// Управление анимацией на мобильных устройствах
let touchTimeout: number | null = null;

const handleClick = () => {
  // Добавляем небольшую анимацию при клике
  const el = event?.currentTarget as HTMLElement;
  if (el) {
    el.classList.add('tech-icon-pulse');
    setTimeout(() => {
      el.classList.remove('tech-icon-pulse');
    }, 500);
  }
};

const handleTouchStart = () => {
  // При касании останавливаем плавающую анимацию и добавляем выделение
  const el = event?.currentTarget as HTMLElement;
  if (el) {
    el.style.animationPlayState = 'paused';
    el.classList.add('active-touch');

    // Чистим предыдущий таймаут
    if (touchTimeout) clearTimeout(touchTimeout);
  }
};

const handleTouchEnd = () => {
  // После окончания касания через небольшую задержку возобновляем анимацию
  const el = event?.currentTarget as HTMLElement;
  if (el) {
    el.classList.remove('active-touch');

    touchTimeout = setTimeout(() => {
      el.style.animationPlayState = 'running';
    }, 1000) as unknown as number;
  }
};
</script>

<style scoped>
.tech-icon {
  position: absolute;
  animation: float 2s ease-in-out infinite;
}

.tech-icon:hover {
  animation-play-state: paused;
  /* background: rgba(255, 255, 255, 0.1); */
  z-index: 10;
}

.active-touch {
  transform: translate(-50%, -50%) scale(1.15) !important;
  z-index: 10;
}

.tech-icon-pulse {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }

  50% {
    transform: translate(-50%, -50%) translateY(-8px);
  }
}

/* Замедляем анимацию для мобильных устройств */
@media (max-width: 768px) {
  .tech-icon {
    animation-duration: 3s; /* Замедленная анимация для меньшей нагрузки */
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(-50%, -50%) translateY(0);
    }

    50% {
      transform: translate(-50%, -50%) translateY(-5px); /* Меньше движения */
    }
  }

  /* Добавляем подсветку для тап-состояний */
  .tech-icon:active {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
