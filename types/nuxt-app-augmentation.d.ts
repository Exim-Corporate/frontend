// NuxtApp augmentation to satisfy @nuxt/image usage of nuxtApp.isHydrating
import 'nuxt/app';

declare module 'nuxt/app' {
  interface NuxtApp {
    /** Internal hydration state accessed by @nuxt/image runtime */
    isHydrating?: boolean;
  }
}

export {};
