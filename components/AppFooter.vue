<template>
  <ClientOnly>
    <footer class="bg-gray-800 text-white px-4 sm:px-6 py-12 mt-auto">
      <div class="container mx-auto">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8">
          <!-- Column 1: Logo -->
          <div class="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              class="flex items-center justify-center md:justify-start mb-6 cursor-pointer"
              @click="navigateToHome"
            >
              <img
                src="/images/logoPic.webp"
                alt="Logo"
                class="h-auto w-16 brightness-100"
              />
              <img
                src="/images/logoText.webp"
                alt="Logo text"
                class="h-10 ml-4 brightness-100"
              />
            </div>
            <p class="text-gray-300 mt-4 max-w-xs mx-auto md:mx-0">
              {{ $t('footer.trusted_partner') }}
            </p>
          </div>

          <!-- Column 2: Social Media Icons and Address -->
          <FooterColumn :title="$t('footer.connect')">
            <div class="flex space-x-6 mb-8 justify-center md:justify-start">
              <a
                v-for="social in socialMedia"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-gray-700 hover:bg-accent p-2 rounded-full transition-colors"
                :aria-label="social.name"
              >
                <AppIcon
                  :icon="social.icon"
                  :size="24"
                  className="text-white"
                />
              </a>
            </div>

            <!-- Address -->
            <address class="text-gray-300 not-italic text-center md:text-left mt-4">
              <p class="mb-2 font-bold">{{ $t('footer.company') }}</p>
              <p
                v-for="(line, index) in addressLines"
                :key="index"
                :class="{ 'mb-1': index < addressLines.length - 1 }"
              >
                {{ line }}
              </p>
            </address>
          </FooterColumn>

          <!-- Column 3: Policies -->
          <FooterColumn :title="$t('footer.legal')">
            <ul class="space-y-3">
              <li
                v-for="link in legalLinks"
                :key="link.to"
              >
                <FooterLink
                  :to="link.to"
                  class="text-gray-300 hover:text-accent transition-colors"
                  >{{ link.label }}</FooterLink
                >
              </li>
            </ul>
          </FooterColumn>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-gray-700 mt-8 pt-5 text-center">
          <p class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} {{ $t('footer.company') }}.
            {{ $t('footer.rights') }}.
          </p>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<script setup lang="ts">
import AppIcon from '@/components/UI/AppIcon.vue';
import FooterLink from '@/components/UI/FooterLink.vue';
import { useRuntimeConfig, navigateTo } from 'nuxt/app';
// import { navigateTo } from 'nuxt';
import { defineComponent, h } from 'vue';

// Импортируем useRuntimeConfig
const runtimeConfig = useRuntimeConfig();

// FooterColumn component for all footer columns with headings
const FooterColumn = defineComponent({
  props: {
    title: { type: String, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: 'flex flex-col items-center text-center md:items-start md:text-left',
        },
        [
          h('h3', { class: 'text-xl font-semibold mb-6 relative inline-block' }, [
            props.title,
            h('span', {
              class:
                'absolute bottom-0 left-0 right-0 md:right-auto w-12 h-0.5 bg-accent mx-auto md:mx-0',
            }),
          ]),
          slots?.default?.(),
        ],
      );
  },
});

// Social media data with icon mapping
const socialMedia = [
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    url: 'https://linkedin.com/company/as-exim-ltd',
  },
  {
    name: 'Telegram',
    icon: 'mdi:telegram',
    url: 'https://t.me/ASEximsupport',
  },
  {
    name: 'Gmail',
    icon: 'mdi:gmail',
    url: `mailto:${runtimeConfig.public.supportEmail}`,
  },
  {
    name: 'X',
    icon: 'bi:twitter-x',
    url: `https://x.com/eximltdcy`,
  },
];

// Company address lines
const addressLines = [
  'Griva Digeni 49',
  'CHRYSTALLA COURT',
  '5th floor, Flat/Office 51',
  '6036 Larnaca, Cyprus',
];

// Legal links with i18n support
const legalLinks = [
  // { to: '/blog', label: 'Blog' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
];

// Function to navigate to home page according to current language
function navigateToHome(): void {
  navigateTo('/');
}
</script>
