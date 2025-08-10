// Augment Nuxt config types for modules without up-to-date type definitions

declare module 'nuxt/schema' {
  interface NuxtConfig {
    gtag?: Record<string, unknown>;
    sitemap?: Record<string, unknown>;
  }
  interface NuxtOptions {
    gtag?: Record<string, unknown>;
    sitemap?: Record<string, unknown>;
  }
}
export {};
