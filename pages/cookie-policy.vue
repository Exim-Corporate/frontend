<template>
  <div class="pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Cookie Policy</h1>

      <div class="max-w-3xl mx-auto space-y-8 text-text-dark dark:text-text-light">
        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">About Cookies</h2>
          <p class="mb-4">
            Cookies are small text files that are stored on your device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to
            website owners. This Cookie Policy explains how we use cookies on our website.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Types of Cookies We Use</h2>

          <h3 class="text-xl font-medium mb-2 mt-6">Essential Cookies</h3>
          <p class="mb-4"
            >These cookies are necessary for the website to function properly. They enable basic
            functions like page navigation and access to secure areas of the website. The website
            cannot function properly without these cookies.</p
          >

          <h3 class="text-xl font-medium mb-2 mt-6">Analytics Cookies</h3>
          <p class="mb-4"
            >These cookies help us understand how visitors interact with our website. They provide
            information about metrics like the number of visitors, bounce rate, traffic source, etc.
            This helps us improve the performance of our website.</p
          >

          <h3 class="text-xl font-medium mb-2 mt-6">Marketing Cookies</h3>
          <p class="mb-4"
            >These cookies are used to track visitors across websites. The intention is to display
            ads that are relevant and engaging for the individual user. These cookies may be set
            through our site by our advertising partners.</p
          >
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">How to Manage Cookies</h2>
          <p class="mb-4"
            >You can control and/or delete cookies as you wish. You can delete all cookies that are
            already on your computer and you can set most browsers to prevent them from being
            placed. However, if you do this, you may have to manually adjust some preferences every
            time you visit a site and some services and functionalities may not work.</p
          >

          <p class="mb-2 font-medium">How to manage cookies in different browsers:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>Google Chrome: Settings > Privacy and security > Cookies and other site data</li>
            <li>Mozilla Firefox: Options > Privacy & Security > Cookies and Site Data</li>
            <li>Safari: Preferences > Privacy > Cookies and website data</li>
            <li>Microsoft Edge: Settings > Cookies and site permissions > Cookies and site data</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Third-Party Cookies</h2>
          <p class="mb-4">
            Some of our pages display content from external providers, e.g., YouTube, Facebook, and
            Twitter. To view this third-party content, you first have to accept their specific terms
            and conditions. This includes their cookie policies which we have no control over.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Changes to Our Cookie Policy</h2>
          <p class="mb-4">
            We may update our Cookie Policy from time to time. Any changes will be posted on this
            page. We encourage you to periodically review this page for the latest information on
            our cookie practices.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4 text-accent">Contact Us</h2>
          <p class="mb-4">
            If you have any questions about our Cookie Policy, please contact us at:
            <a
              :href="`mailto:${runtimeConfig.public.privacyEmail}`"
              class="text-accent hover:underline"
              >{{ runtimeConfig.public.privacyEmail }}</a
            >
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>
