// Augment the '#app/nuxt' module so @nuxt/image type checks pass when accessing nuxtApp.isHydrating
import '#app/nuxt';

declare module '#app/nuxt' {
  interface NuxtApp {
    isHydrating?: boolean;
  }
}

export {};
