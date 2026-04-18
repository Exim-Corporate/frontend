<template>
  <section
    id="contact-us"
    class="overflow-hidden contact-section relative"
  >
    <!-- Gradient Background with Image Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center z-0"
      style="background-image: url('/images/contactForm.webp')"
    />
    <div class="absolute inset-0 bg-linear-to-l from-navy-blue/95 to-accent/60 z-0" />

    <div class="container relative z-10">
      <CalendlyBookingSection
        embedded
        utm-source="contact-section"
        class="mb-10 md:mb-14"
      />

      <!-- Header Component -->
      <ContactHeader
        data-aos="fade-up"
        data-aos-duration="450"
      />

      <!-- Form Component -->
      <ContactForm
        data-aos="fade-up"
        data-aos-duration="450"
        data-aos-delay="120"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
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
