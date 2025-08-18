<script setup lang="ts">
// Centralized SEO for the homepage using useSEO
useSEO({
  title: 'AS Exim - Expert IT Staffing & Remote Developers',
  description:
    'Your trusted partner for custom software development solutions. Connect with top-tier tech talent - pre-vetted developers, designers, and QA engineers ready for your projects.',
  image: '/logo.png',
  type: 'website',
});

// Structured Data для лучшего SEO
// useSchemaOrg([
//   defineOrganization({
//     name: 'AS Exim',
//     logo: '/images/logoPic.webp',
//     url: 'https://your-domain.com', // Замените на ваш домен
//     description:
//       'Your trusted partner for custom software development solutions. We provide pre-vetted developers, designers, and QA engineers.',
//     address: {
//       streetAddress: 'Griva Digeni 49, CHRYSTALLA COURT, 5th floor, Flat/Office 51',
//       addressLocality: 'Larnaca',
//       addressCountry: 'Cyprus',
//       postalCode: '6036',
//     },
//     contactPoint: {
//       telephone: '+357-your-phone', // Добавьте ваш телефон
//       contactType: 'customer service',
//     },
//     sameAs: ['https://linkedin.com/company/outsource-tech', 'https://t.me/OutsourceTechSupport'],
//     serviceType: 'IT Staffing and Software Development Services',
//     areaServed: 'Worldwide',
//   }),
// ]);

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
