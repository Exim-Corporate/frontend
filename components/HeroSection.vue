<template>
  <section
    class="relative min-h-screen h-auto w-full overflow-hidden content-start md:content-center"
  >
    <!-- Background image with Nuxt Image (SEO-friendly + performance) -->
    <NuxtImg
      :src="'/images/hero/bg.webp'"
      alt="Hero background"
      format="webp"
      quality="80"
      class="absolute inset-0 w-full h-full object-cover z-0"
      preload
    />
    <div class="absolute inset-0 z-10 bg-tech-gradient mix-blend-hard-light opacity-80" />
    <!-- Мобильная версия робота (позади текста) -->
    <div class="md:hidden absolute bottom-0 w-full z-10 flex justify-center">
      <AnimatedElement
        direction="bottom"
        :delay="300"
        class="flex justify-center items-end relative h-full"
      >
        <div class="robot-container-mobile">
          <NuxtImg
            :src="'/images/hero/robot.webp'"
            alt="AI Robot"
            format="webp"
            quality="100"
            class="robot-image-mobile"
            preload
          />
        </div>
      </AnimatedElement>
    </div>
    <!-- Content -->
    <div
      class="relative z-20 h-full container mx-auto px-10 pt-[100px] flex items-start md:items-center"
    >
      <div class="w-full flex flex-col md:flex-row items-center">
        <!-- Left Content: Text Area -->
        <div class="text-white md:w-4/6 md:text-left text-center mb-12 md:mb-0 z-20">
          <!-- Title с анимацией слева (SEO-friendly) -->
          <AnimatedElement
            direction="left"
            :delay="100"
          >
            <h1 class="text-5xl md:text-5xl lg:text-7xl font-bold mb-6">
              {{ $t('hero.title1') }}<br />
              <span class="text-gradient">{{ $t('hero.title2') }}</span
              ><br />
              {{ $t('hero.title3') }}
            </h1>
          </AnimatedElement>

          <!-- Description с анимацией слева (SEO-friendly) -->
          <AnimatedElement
            direction="left"
            :delay="200"
          >
            <p class="text-base md:text-xl mb-8 text-gray-100 max-w-2xl md:mx-0 mx-auto">
              {{ $t('hero.subtitle') }}
            </p>
          </AnimatedElement>
          <!-- Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 md:justify-start justify-center buttons-container"
          >
            <!-- Primary Button с анимацией слева -->
            <AnimatedElement
              direction="left"
              :delay="300"
            >
              <AppButton
                severity="contrast"
                size="large"
                :class="'w-full sm:w-auto relative z-30'"
                scrollToContact
              >
                {{ $t('hero.primaryButton') }}
              </AppButton>
            </AnimatedElement>
          </div>
        </div>
        <!-- Right Content: Robot Image (desktop only) -->
        <div class="hidden md:flex md:w-2/6 justify-center items-center relative h-full">
          <div class="robot-container">
            <AnimatedElement direction="right">
              <NuxtImg
                :src="'/images/hero/robotWithFrame.webp'"
                alt="AI Robot"
                format="webp"
                quality="100"
                class="robot-image object-contain"
                preload
              />
            </AnimatedElement>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from '@/components/UI/AppButton.vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
</script>
<style>
.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #ca8dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Стили для робота */
.robot-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Стили для робота на мобильных */
.robot-container-mobile {
  position: relative;
  width: 90%;
  height: 70vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.robot-image-mobile {
  height: auto;
  max-height: 95%;
  width: auto;
  max-width: 95%;
  object-fit: contain;
  transform: translateX(10%);
}

/* Стили для робота */
.robot-image {
  height: 600px;
  position: relative;
  transform: translateY(1%);
}

/* Добавляем эффект свечения под роботом */
</style>
