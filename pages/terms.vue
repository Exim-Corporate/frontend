<template>
  <div class="pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Terms of Service</h1>
      <div class="max-w-3xl mx-auto space-y-8 text-text-dark dark:text-text-light">
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Overview</h2>
          <p class="mb-4">
            These Terms of Service ("Terms") govern your use of our website and services. By
            accessing our website or using our services, you agree to these Terms. If you do not
            agree with these Terms, please do not use our services.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Intellectual Property Rights</h2>
          <p class="mb-4">
            All content, including text, graphics, logos, icons, images, and software, is the
            property of our company and is protected by copyright and other intellectual property
            laws. You may not reproduce, modify, distribute, or republish any material from our
            website without our prior written consent.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">User Responsibilities</h2>
          <p class="mb-4">When using our services, you agree to:</p>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Use our services only for lawful purposes</li>
            <li>Not engage in any activity that interferes with or disrupts our services</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Limitation of Liability</h2>
          <p class="mb-4">
            We provide our services "as is" without any warranty. We shall not be liable for any
            direct, indirect, incidental, special, consequential, or punitive damages resulting from
            your use or inability to use our services.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Governing Law</h2>
          <p class="mb-4">
            These Terms are governed by and construed in accordance with the laws of Cyprus. Any
            disputes arising under these Terms shall be subject to the exclusive jurisdiction of the
            courts of Cyprus.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Changes to Terms</h2>
          <p class="mb-4">
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting on our website. Your continued use of our services after any
            changes indicates your acceptance of the modified Terms.
          </p>
        </section>
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Contact Us</h2>
          <p class="mb-4">
            If you have any questions about these Terms, please contact us at:
            <a
              :href="`mailto:${runtimeConfig.public.contactEmail}`"
              class="text-accent hover:underline"
            >
              {{ runtimeConfig.public.contactEmail }}
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>

<style scoped>
.terms-page {
  line-height: 1.6;
  color: #333;
}
.terms-content p {
  margin-bottom: 1rem;
}
</style>
