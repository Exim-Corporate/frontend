<script setup lang="ts">
// SEO Meta tags для главной страницы
useSeoMeta({
  title: 'AS Exim - Expert IT Staffing & Remote Developers',
  description:
    'Your trusted partner for custom software development solutions. Connect with top-tier tech talent - pre-vetted developers, designers, and QA engineers ready for your projects.',

  // Open Graph теги для социальных сетей
  ogTitle: 'AS Exim - Expert IT Staffing & Remote Developers',
  ogDescription:
    'Your trusted partner for custom software development solutions. Connect with top-tier tech talent - pre-vetted developers, designers, and QA engineers ready for your projects.',
  ogImage: '/images/og-image.jpg', // Создадим специальную OG картинку
  ogImageAlt: 'AS Exim - Expert IT Developers & Engineers',
  ogType: 'website',
  ogUrl: 'https://www.exim.eu.com/', // Замените на ваш домен
  ogSiteName: 'AS Exim',

  // Twitter Card теги
  twitterCard: 'summary_large_image',
  twitterTitle: 'AS Exim - Expert IT Staffing & Remote Developers',
  twitterDescription:
    'Your trusted partner for custom software development solutions. Connect with top-tier tech talent ready for your projects.',
  twitterImage: '/images/og-image.jpg',
  twitterSite: '@outsource_tech', // Замените на ваш Twitter handle, если есть

  // Дополнительные мета-теги
  author: 'AS Exim',
  keywords:
    'IT staffing, remote developers, software development, tech talent, outsourcing, developers, engineers, QA, designers, pre-vetted talent',
  robots: 'index, follow',
});

// Nuxt auto-imports components
</script>

<template>
  <main>
    <HeroSection />

    <!-- Companies section -->
    <CompaniesCarousel />

    <!-- Why Choose Us section -->
    <WhyChooseUsSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Tech Stack Section -->
    <TechStackSection />

    <!-- Process Section -->
    <ProcessSection />

    <!-- Team Section -->
    <TeamSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- CTA Banner Section -->
    <CTABanner />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- Contact Section -->
    <ContactSection />
  </main>
</template>
