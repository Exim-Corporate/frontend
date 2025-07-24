<template>
  <section class="cta-banner relative overflow-hidden">
    <!-- Фоновое изображение с улучшенным параллакс эффектом -->
    <div class="absolute inset-0 w-full h-[120%] -top-10 parallax-container">
      <div
        ref="parallaxBg"
        class="w-full h-full bg-cover bg-center parallax-bg"
        style="background-image: url('/images/cta.webp')"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-navy-blue/90 to-background/80 z-0" />

    <div class="container relative z-10 mx-auto py-20 px-4">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center max-w-4xl mx-auto"
      >
        <!-- Заголовок с градиентным текстом -->
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-light">
          {{ $t('cta.title_part1') }}<span class="text-gradient">{{ $t('cta.title_span1') }}</span
          >{{ $t('cta.title_part2') }} <span class="text-gradient">{{ $t('cta.title_span2') }}</span
          >{{ $t('cta.title_part3') }}
        </h2>

        <p class="text-lg text-text-light mb-10 max-w-3xl mx-auto">
          {{ $t('cta.subtitle') }}
        </p>

        <!-- Кнопка с анимацией и скроллом к контактной форме -->
        <Button
          class="px-8 py-3 text-lg font-semibold transition-transform duration-300 hover:scale-105"
          severity="help"
          raised
          @click="scrollToContact"
        >
          {{ $t('cta.button') }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToContact = () => {
  const contactSection = document.getElementById('contact-us');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};
</script>

<style scoped>
.cta-banner {
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  isolation: isolate;
}

.parallax-container {
  overflow: hidden;
  z-index: -1;
}

.parallax-bg {
  will-change: transform;
  transform: translate3d(0, 0, 0);
  transition: transform 0.2s cubic-bezier(0.2, 0, 0.3, 1);
}

.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #af55ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Добавляем блик для дополнительного эффекта */
.cta-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(76, 161, 255, 0.05) 0%,
    rgba(175, 85, 255, 0.05) 30%,
    transparent 70%
  );
  z-index: 1;
  animation: rotate 30s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
