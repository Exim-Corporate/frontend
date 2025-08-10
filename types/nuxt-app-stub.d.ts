// Temporary stub to satisfy type checking for modules importing '#app/nuxt'
// until upstream @nuxt/image types align. Provides minimal shape.
import type { NuxtApp } from 'nuxt/schema';
declare module '#app/nuxt' {
  function useNuxtApp(): NuxtApp;
  export { useNuxtApp };
}
