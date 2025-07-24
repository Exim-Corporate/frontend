/**
 * TypeScript type declarations for nuxt-gtag module
 * Extends the Nuxt app context with gtag functionality
 */

export interface GtagConfig {
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  custom_map?: Record<string, string>;
  [key: string]: unknown;
}

export interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  non_interaction?: boolean;
  [key: string]: string | number | boolean | undefined;
}

// gtag command types
type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'get' | 'consent';
type GtagArgs = [string, Record<string, unknown>?] | [Date] | [string] | unknown[];

declare global {
  interface Window {
    gtag?: (command: GtagCommand, ...args: GtagArgs) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

declare module '#app' {
  interface NuxtApp {
    $gtag: {
      (command: GtagCommand, ...args: GtagArgs): void;
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gtag: {
      (command: GtagCommand, ...args: GtagArgs): void;
    };
  }
}

export {};
