<template>
  <section
    id="contact-us"
    class="py-20 overflow-hidden contact-section relative"
  >
    <!-- Gradient Background with Image Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center z-0"
      style="background-image: url('/images/contactForm.webp')"
    />
    <div class="absolute inset-0 bg-gradient-to-l from-navy-blue/95 to-accent/60 z-0" />

    <div class="container relative z-10">
      <!-- Header Component -->
      <ContactHeader />

      <!-- Form Component -->
      <ContactForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactHeader from '@/components/contact/ContactHeader.vue';
import ContactForm from '@/components/contact/ContactForm.vue';
</script>

<style scoped>
.contact-section {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
