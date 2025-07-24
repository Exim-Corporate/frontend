<template>
  <div
    data-aos="fade-up"
    data-aos-duration="500"
    class="text-center mb-16"
  >
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
      {{ $t('contact.title') }} <span class="text-gradient">{{ $t('contact.subtitle') }}</span>
    </h2>
    <p class="text-lg text-gray-100 max-w-3xl mx-auto">
      {{ $t('contact.description') }}
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #af55ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>
