// Global shim for Vue SFC imports
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // Use explicit generic shapes to avoid eslint no-empty-object / no-explicit-any issues
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
