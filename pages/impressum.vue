<template>
  <div class="pt-20">
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-center mb-10">Impressum</h1>

      <div class="max-w-3xl mx-auto text-text-dark dark:text-text-light">
        <h2 class="text-2xl font-semibold mb-6 text-accent">Company Information</h2>

        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400"> Email: </div>
            <div class="md:col-span-2">
              <a
                :href="`mailto:${runtimeConfig.public.contactEmail}`"
                class="text-accent hover:underline"
              >
                {{ runtimeConfig.public.contactEmail }}
              </a>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Legal Representatives:
            </div>
            <div class="md:col-span-2">
              <p>
                Managing Director: Artem Shapovalov<br />
                Company Registration: HE123456<br />
                VAT ID: CY98765432L
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Responsibility for Content:
            </div>
            <div class="md:col-span-2">
              <p>
                Responsible under press law:<br />
                AS Exim LTD<br />
                Griva Digeni 49<br />
                CHRYSTALLA COURT<br />
                5th floor, Flat/Office 51<br />
                6036 Larnaca, Cyprus
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400"> Disclaimer: </div>
            <div class="md:col-span-2">
              <p>
                Despite careful content control, we assume no liability for the content of external
                links. The operators of the linked pages are solely responsible for their content.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Copyright Notice:
            </div>
            <div class="md:col-span-2">
              <p>
                &copy; {{ new Date().getFullYear() }} AS Exim LTD. All rights reserved. All text,
                images, graphics, audio, video and animation files are subject to copyright and
                other laws protecting intellectual property. They may not be copied for commercial
                use or distribution, nor may they be modified and used on other websites.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Data Protection:
            </div>
            <div class="md:col-span-2">
              <a
                :href="`mailto:${runtimeConfig.public.privacyEmail}`"
                class="text-accent hover:underline"
              >
                {{ runtimeConfig.public.privacyEmail }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>
