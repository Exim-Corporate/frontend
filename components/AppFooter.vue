<template>
  <footer class="mt-auto bg-text-dark text-text-light">
    <section class="container relative mx-auto px-4 pb-8 pt-8 sm:px-6 md:pb-6 md:pt-10">
      <div class="md:hidden">
        <AnimatedElement direction="bottom">
          <div class="flex justify-start pr-16">
            <button
              type="button"
              class="flex items-center gap-3 bg-transparent p-0 text-left"
              aria-label="Homepage"
              @click="navigateToHome"
            >
              <NuxtImg
                src="/images/logoPic.webp"
                alt="AS Exim logo mark"
                class="h-auto w-10"
                draggable="false"
                loading="lazy"
              />
              <NuxtImg
                src="/images/logoText.webp"
                alt="AS Exim"
                class="h-7 w-auto"
                draggable="false"
                loading="lazy"
              />
            </button>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="mt-14 flex flex-col items-center text-center">
            <BaseTitle tag="h2" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.company') }}
            </BaseTitle>

            <address class="mt-6 not-italic">
              <BaseText
                v-for="line in addressLines"
                :key="line"
                variant="section"
                class-name="mb-4 text-text-light/85 last:mb-0"
              >
                {{ line }}
              </BaseText>
            </address>

            <div class="mt-10 flex items-center justify-center gap-6">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.name"
                class="text-text-light/90 transition-colors duration-300 hover:text-text-light"
              >
                <AppIcon
                  :icon="social.icon"
                  :size="24"
                  class-name="text-current h-6 w-6"
                />
              </a>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="mt-16 flex flex-col items-center text-center">
            <BaseTitle tag="h3" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.navigation.industry.title') }}
            </BaseTitle>

            <div class="mt-6 flex flex-col gap-5">
              <NuxtLinkLocale
                v-for="item in industryLinks"
                :key="item.id"
                :to="resolveNavigationTarget(item)"
                class="transition-colors duration-300 hover:text-text-light"
              >
                <BaseText variant="section" class-name="text-text-light/82">
                  {{ item.label }}
                </BaseText>
              </NuxtLinkLocale>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="mt-16 flex flex-col items-center text-center">
            <BaseTitle tag="h3" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.navigation.services.title') }}
            </BaseTitle>

            <div class="mt-6 flex flex-col gap-5">
              <NuxtLinkLocale
                v-for="item in serviceLinks"
                :key="item.id"
                :to="resolveNavigationTarget(item)"
                class="transition-colors duration-300 hover:text-text-light"
              >
                <BaseText variant="section" class-name="text-text-light/82">
                  {{ item.label }}
                </BaseText>
              </NuxtLinkLocale>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="mt-16 flex flex-col items-center text-center">
            <BaseTitle tag="h3" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.navigation.legal.title') }}
            </BaseTitle>

            <div class="mt-6 flex flex-col gap-5">
              <NuxtLinkLocale
                v-for="link in legalPrimaryLinks"
                :key="link.to"
                :to="link.to"
                class="transition-colors duration-300 hover:text-text-light"
              >
                <BaseText variant="section" class-name="text-text-light/82">
                  {{ link.label }}
                </BaseText>
              </NuxtLinkLocale>
            </div>

            <NuxtLinkLocale
              :to="legalSecondaryLink.to"
              class="mt-12 transition-colors duration-300 hover:text-text-light"
            >
              <BaseText variant="section" class-name="text-text-light/82">
                {{ legalSecondaryLink.label }}
              </BaseText>
            </NuxtLinkLocale>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="mt-16 flex justify-center">
            <div class="footer-badge-shell flex h-32.5 w-27 items-center justify-center border border-text-light/35 bg-text-light/8 p-1.5">
              <div class="footer-badge-core flex h-full w-full flex-col items-center justify-center gap-1 border border-text-light/25 bg-text-light px-2 text-center text-text-dark">
                <span class="font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                  Top
                </span>
                <span class="font-sans text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                  Software development Company
                </span>
                <span class="font-sans text-[27px] font-semibold leading-none">Clutch</span>
                <span class="font-sans text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  2025
                </span>
              </div>
            </div>
          </div>
        </AnimatedElement> 
      </div>

      <div class="hidden md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.82fr)] md:gap-x-10 lg:gap-x-16">
        <AnimatedElement direction="bottom">
          <div class="flex flex-col items-start text-left">
            <button
              type="button"
              class="flex items-center gap-3 bg-transparent p-0 text-left"
              aria-label="Homepage"
              @click="navigateToHome"
            >
              <NuxtImg
                src="/images/logoPic.webp"
                alt="AS Exim logo mark"
                class="h-auto w-11"
                draggable="false"
                loading="lazy"
              />
              <NuxtImg
                src="/images/logoText.webp"
                alt="AS Exim"
                class="h-7 w-auto"
                draggable="false"
                loading="lazy"
              />
            </button>

            <div class="mt-16">
              <BaseTitle tag="h2" variant="subheader18" class-name="text-text-light">
                {{ $t('footer.company') }}
              </BaseTitle>

              <address class="mt-8 not-italic">
                <BaseText
                  v-for="line in addressLines"
                  :key="line"
                  variant="section"
                  class-name="mb-5 text-text-light/85 last:mb-0"
                >
                  {{ line }}
                </BaseText>
              </address>

              <div class="mt-10 flex items-center gap-5">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.name"
                  className="text-text-light/90 transition-all duration-300 hover:text-text-light hover:scale-115 h-6 w-6"
                >
                  <AppIcon
                    :icon="social.icon"
                    :size="24"
                    class-name="text-current"
                  />
                </a>
              </div>

              <div class="mt-24">
                <div class="footer-badge-shell flex h-31.5 w-25.5 items-center justify-center border border-text-light/35 bg-text-light/8 p-1.5">
                  <div class="footer-badge-core flex h-full w-full flex-col items-center justify-center gap-1 border border-text-light/25 bg-text-light px-2 text-center text-text-dark">
                    <span class="font-sans text-[8px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                      Top
                    </span>
                    <span class="font-sans text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                      SEO Company
                    </span>
                    <span class="font-sans text-[26px] font-semibold leading-none">Clutch</span>
                    <span class="font-sans text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                      2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="flex flex-col items-start text-left pt-20">
            <BaseTitle tag="h3" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.navigation.industry.title') }}
            </BaseTitle>

            <div class="mt-8 flex flex-col gap-5">
              <NuxtLinkLocale
                v-for="item in industryLinks"
                :key="item.id"
                :to="resolveNavigationTarget(item)"
              >
                <BaseText variant="section" class-name="text-text-light/82 transition-all duration-300 hover:font-bold hover:text-text-light">
                  {{ item.label }}
                </BaseText>
              </NuxtLinkLocale>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="flex flex-col items-start text-left pt-20">
            <BaseTitle tag="h3" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.navigation.services.title') }}
            </BaseTitle>

            <div class="mt-8 flex flex-col gap-5">
              <NuxtLinkLocale
                v-for="item in serviceLinks"
                :key="item.id"
                :to="resolveNavigationTarget(item)"
              >
                <BaseText variant="section" class-name="text-text-light/82 transition-all duration-300 hover:font-bold hover:text-text-light">
                  {{ item.label }}
                </BaseText>
              </NuxtLinkLocale>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="flex flex-col items-start text-left pt-20">
            <BaseTitle tag="h3" variant="subheader18" class-name="text-text-light">
              {{ $t('footer.navigation.legal.title') }}
            </BaseTitle>

            <div class="mt-8 flex flex-col gap-5">
              <NuxtLinkLocale
                v-for="link in legalPrimaryLinks"
                :key="link.to"
                :to="link.to"
                class=""
              >
                <BaseText variant="section" className="text-text-light transition-all duration-300 hover:font-bold ">
                  {{ link.label }}
                </BaseText>
              </NuxtLinkLocale>
            </div>

            <NuxtLinkLocale
              :to="legalSecondaryLink.to"
              class="mt-16 transition-colors duration-300 hover:text-text-light"
            >
              <BaseText variant="section" class-name="text-text-light/82">
                {{ legalSecondaryLink.label }}
              </BaseText>
            </NuxtLinkLocale>
          </div>
        </AnimatedElement>
      </div>
        <div class="mt-16 flex justify-center border-t border-text-light/12 pt-6 md:mt-12 md:justify-end md:border-t-0 md:pt-0">
          <BaseText variant="section" class-name="text-center text-text-light/45 md:text-right">
            &copy; {{ currentYear }} {{ $t('footer.company') }}. {{ $t('footer.rights') }}.
          </BaseText>
        </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { callOnce, useState } from '#imports';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import { useFooterData } from '@/composables/useFooterData';
import { useNavigateHome } from '@/composables/useNavigateHome';
import type { FooterNavigationData } from '@/types/footer';

const { locale } = useI18n();
const { navigateToHome } = useNavigateHome();
const {
  addressLines,
  currentYear,
  getFallbackNavigation,
  legalPrimaryLinks,
  legalSecondaryLink,
  loadNavigation,
  resolveNavigationTarget,
  socialLinks,
} = useFooterData();

// Shared cache persists SSR→client and across all route changes
const footerCache = useState<Record<string, FooterNavigationData>>('footer-nav-cache', () => ({}));

const navigationData = useState<FooterNavigationData>(
  `footer-nav-${locale.value}`,
  getFallbackNavigation,
);

const loadForLocale = async (loc: string) => {
  if (footerCache.value[loc]) {
    navigationData.value = footerCache.value[loc];
    return;
  }
  const data = await loadNavigation();
  footerCache.value[loc] = data;
  navigationData.value = data;
};

// callOnce: runs SSR once, skipped on every subsequent client navigation
await callOnce(`footer-nav-init-${locale.value}`, () => loadForLocale(locale.value));

// Only re-fetch when locale actually changes
watch(locale, newLocale => { loadForLocale(newLocale); });

const industryLinks = computed(() => navigationData.value?.industry ?? getFallbackNavigation().industry);
const serviceLinks = computed(() => navigationData.value?.services ?? getFallbackNavigation().services);

</script>

<style scoped>
.footer-badge-shell {
  clip-path: polygon(50% 0%, 100% 18%, 100% 78%, 50% 100%, 0% 78%, 0% 18%);
}

.footer-badge-core {
  clip-path: polygon(50% 0%, 100% 18%, 100% 78%, 50% 100%, 0% 78%, 0% 18%);
}
</style>
