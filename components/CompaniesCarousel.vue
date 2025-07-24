<template>
  <section class="container py-30 text-center test">
    <h2
      data-aos="fade-up"
      data-aos-duration="500"
    >
      {{ $t('companies.title') }}
    </h2>
    <AppLogoMarquee />
  </section>
</template>
<script setup lang="ts">
import AppLogoMarquee from '@/components/UI/AppLogoMarquee.vue';
</script>
<style lang=""></style>
