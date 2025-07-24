<template>
  <div class="pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      <div class="max-w-3xl mx-auto space-y-8 text-text-dark dark:text-text-light">
        <!-- Privacy Policy Section -->
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Privacy Policy</h2>
          <p class="mb-4">
            We value your privacy and ensure full compliance with the General Data Protection
            Regulation (GDPR) and relevant provisions of Cyprus national legislation, including the
            Cyprus Law 125(I)/2018 on the Protection of Natural Persons with Regard to the
            Processing of Personal Data.
          </p>
          <h3 class="text-xl font-medium mb-2 mt-6">What We Collect:</h3>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Name, email address, company information, and messages submitted via our forms</li>
            <li>IP address and browser information for analytics</li>
          </ul>
          <h3 class="text-xl font-medium mb-2 mt-6">How We Use Your Data:</h3>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>To respond to your inquiries and provide requested services</li>
            <li>To maintain records of communication</li>
            <li>For internal analytics and site improvement</li>
          </ul>
          <h3 class="text-xl font-medium mb-2 mt-6">Your Rights under Cyprus and EU Law:</h3>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Right to access, correct, or delete your personal data</li>
            <li>Right to object or restrict processing</li>
            <li>Right to data portability</li>
            <li
              >Right to file a complaint with the Cyprus Commissioner for Personal Data
              Protection</li
            >
          </ul>
          <h3 class="text-xl font-medium mb-2 mt-6">Third Party Disclosure:</h3>
          <p class="mb-4">
            We only share data with third parties who are GDPR-compliant and necessary for service
            delivery
          </p>
          <h3 class="text-xl font-medium mb-2 mt-6">Contact for Data Requests:</h3>
          <p class="mb-1">
            Email:
            <a
              :href="`mailto:${runtimeConfig.public.privacyEmail}`"
              class="text-accent hover:underline"
            >
              {{ runtimeConfig.public.privacyEmail }}
            </a>
          </p>
          <p
            >Post: AS Exim Ltd., Griva Digeni 49, CHRYSTALLA COURT, 5th floor, Flat/Office 51, 6036
            Larnaca, Cyprus</p
          >
        </section>
        <!-- Imprint Section -->
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Imprint</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-medium mb-1">Business Name:</p>
              <p class="mb-3">AS Exim Ltd.</p>
              <p class="font-medium mb-1">Legal Form:</p>
              <p class="mb-3">Private Limited Company (Ltd) registered in Cyprus</p>
              <p class="font-medium mb-1">Registered Office:</p>
              <p class="mb-3"
                >Griva Digeni 49, CHRYSTALLA COURT, 5th floor, Flat/Office 51, 6036 Larnaca,
                Cyprus</p
              >
              <p class="font-medium mb-1">Phone:</p>
              <p class="mb-3">+380 98 465 87 55</p>
            </div>
            <div>
              <p class="font-medium mb-1">Email:</p>
              <p class="mb-3">
                <a
                  :href="`mailto:${runtimeConfig.public.contactEmail}`"
                  class="text-accent hover:underline"
                >
                  {{ runtimeConfig.public.contactEmail }}
                </a>
              </p>
              <p class="font-medium mb-1">Managing Director:</p>
              <p class="mb-3">Artem Shapovalov</p>
              <p class="font-medium mb-1">Company Registration Number:</p>
              <p class="mb-3">ΗΕ388602</p>
              <p class="font-medium mb-1">VAT Identification Number:</p>
              <p class="mb-3">CY98765432L</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-medium mb-1">Regulatory Authority:</p>
            <p class="mb-3">Registrar of Companies and Official Receiver, Cyprus</p>
            <p class="font-medium mb-1">EU Online Dispute Resolution:</p>
            <p class="mb-3">
              The European Commission provides a platform for online dispute resolution:
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p class="mb-3">
              We are not obligated to participate in dispute resolution before a consumer
              arbitration board, but we are open to finding an amicable solution.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>
