<template>
  <div class="testimonial-carousel">
    <Carousel3d
      :count="testimonials.length"
      :perspective="25"
      :display="displayCount"
      :width="slideWidth"
      :height="slideHeight"
      :space="slideSpace"
      :controls-visible="visible"
      :controls-prev-html="'&#10092;'"
      :controls-next-html="'&#10093;'"
      :autoplay="true"
      :autoplay-timeout="4000"
      :autoplay-hover-pause="true"
      :clickable="true"
      :inverse-scaling="inverseScaling"
      :disable-3d="false"
    >
      <Slide
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.id"
        :index="index"
      >
        <div class="carousel-slide-wrapper">
          <TestimonialCard
            :testimonial="testimonial"
            :index="index"
          />
        </div>
      </Slide>
    </Carousel3d>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Carousel3d, Slide } from 'vue3-carousel-3d';
import 'vue3-carousel-3d/dist/index.css';
import TestimonialCard from './TestimonialCard.vue';
import type { Testimonial } from './testimonialData';
import { defaultTestimonials } from './testimonialData';

// Props with defaults
defineProps({
  testimonials: {
    type: Array as () => Testimonial[],
    default: () => defaultTestimonials,
  },
});

// Responsive parameters
const displayCount = ref(5); // Default for desktop
const slideWidth = ref(300);
const slideHeight = ref(440); // Увеличиваем высоту для размещения контента
const slideSpace = ref(300);
const inverseScaling = ref(250);
const visible = ref(true); // Состояние для скрытия слайдов по бокам

// Update carousel params based on screen size
function updateResponsiveParams() {
  // Desktop: Show 5 slides (2 on each side)
  if (window.innerWidth >= 1280) {
    displayCount.value = 5;
    slideWidth.value = 300;
    slideHeight.value = 440;
    slideSpace.value = 300;
    inverseScaling.value = 250;
  }
  // Tablet: Show 3 slides (1 on each side)
  else if (window.innerWidth >= 768) {
    displayCount.value = 3;
    slideWidth.value = 280;
    slideHeight.value = 420;
    slideSpace.value = 280;
    inverseScaling.value = 220;
    visible.value = true; // Скрыва ем слайды по бокам
  }
  // Mobile: Show partial slides on sides
  else {
    displayCount.value = 3;
    slideWidth.value = 240;
    slideHeight.value = 400;
    slideSpace.value = 200;
    inverseScaling.value = 200;
    visible.value = false; // Скрываем слайды по бокам
  }
}

// Set up responsiveness
onMounted(() => {
  updateResponsiveParams();
  window.addEventListener('resize', updateResponsiveParams);
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', updateResponsiveParams);
});
</script>

<style scoped>
.testimonial-carousel {
  position: relative;
  /* padding: 20px 0 40px; */
  /* Добавляем горизонтальные отступы по бокам для кнопок */
  /* padding-left: 30px; */
  /* padding-right: 30px; */
}

:deep(.carousel-3d-container) {
  min-height: 520px;
}

:deep(.carousel-3d-slide) {
  border: none;
  background: transparent;
  overflow: visible;
}

.carousel-slide-wrapper {
  width: 100%;
  height: 100%;
  overflow: visible;
}

:deep(.carousel-3d-controls) {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%; /* Меняем на 100% */
  left: 0; /* Начинаем с края контейнера */
  top: 50%;
  z-index: 10;
  transform: translateY(-50%); /* Центрируем вертикально */
  pointer-events: none; /* Чтобы не блокировать клики на слайдах */
}

:deep(.carousel-3d-controls a) {
  background-color: rgba(76, 161, 255, 0.7);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  pointer-events: auto; /* Возвращаем возможность кликов на кнопках */
  margin: 0 10px; /* Добавляем отступы по бокам */
  position: relative;
  z-index: 15;
}

:deep(.carousel-3d-controls a:first-child) {
  margin-left: -10px; /* Смещаем левую кнопку влево */
  display: absolute;
}

:deep(.carousel-3d-controls a:last-child) {
  margin-right: -10px; /* Смещаем правую кнопку вправо */
}

/* Responsive heights */
@media (max-width: 768px) {
  :deep(.carousel-3d-container) {
    min-height: 480px;
  }
}

@media (max-width: 480px) {
  :deep(.carousel-3d-container) {
    min-height: 450px;
  }

  :deep(.carousel-3d-controls a) {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
}
</style>
