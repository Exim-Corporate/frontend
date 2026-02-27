# Copilot Instructions — AS Exim Frontend

Execute ALL rules below before generating or modifying any file.

---

## Code Quality

- Clean, modular, reusable code. No dead code, no commented-out blocks.
- Comments: short, English, one line max. No Russian comments.
- JSDoc on every exported function, composable, and component.
- Types in `types/*.ts`. No inline interface definitions in composables.
- SOLID principles. Single responsibility per component/composable.
- No `console.log` in production code — use a logger utility or remove.

## Components

- `<script setup lang="ts">` always. Script block first, then template, then style.
- Props: `defineProps<{ label: string; size?: 'sm' | 'md' }>()` (generic syntax, never Options API).
- Emits: `defineEmits<{ click: [id: string] }>()`.
- Two-way binding: `defineModel()` (Vue 3.4+).
- Nuxt auto-imports: **never** manually import components from `~/components/`. They resolve automatically.
- Nuxt auto-imports: **never** manually import `ref`, `computed`, `watch`, `useRoute`, `useI18n`, etc.
- PrimeVue components via `@primevue/nuxt-module` — no manual imports needed.
- Lazy-load heavy components: `<LazyComponentName />` prefix or `defineAsyncComponent()`.
- Mobile-first approach: start with base styles, add `sm:`, `md:`, `lg:` breakpoints.
- Semantic HTML: `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`.

## Styling (Tailwind CSS 4.1+ / PrimeVue)

- **Tailwind utility classes only**. No inline `style=""`. No `<style>` blocks with raw hex colors.
- If a color is used more than once, it MUST be a token in `assets/theme/shared-colors.ts` and exposed via `tailwind.config.ts → theme.extend.colors`.
- Reference colors as Tailwind classes: `text-accent`, `bg-primary-dark`, `border-brand-blue` — never `#4ca1ff` or `rgb()` in templates/styles.
- Gradients: define in `tailwind.config.ts → theme.extend.backgroundImage` and use as `bg-tech-gradient`.
- Dark mode: use Tailwind `dark:` variant (`dark:bg-surface-dark`, `dark:text-white`). Never manually set CSS vars via JS for dark mode.
- PrimeVue component themes: customize in `assets/theme/components/*.ts` using the preset system. Never use `:deep()` or `!important` to override PrimeVue.
- No `!important`. If specificity fails, fix the CSS layer order or theme preset.
- Scoped styles (`<style scoped>`) only when absolutely necessary. Prefer Tailwind classes.
- `sr-only` — use Tailwind's built-in class, never redefine.

## Color System (single source of truth)

```
assets/theme/shared-colors.ts  →  tailwind.config.ts (tailwindColors)
                                →  assets/theme/index.ts (PrimeVue Noir preset)
```

- ALL project colors live in `shared-colors.ts`.
- Tailwind consumes them via `tailwindColors` export.
- PrimeVue consumes them via `sharedColors` in the Noir preset.
- When adding a new color: add to `shared-colors.ts` first, then reference everywhere else.

## i18n

- 4 locales: `en`, `de`, `fr`, `es`. Lazy-loaded from `i18n/locales/`.
- Use `$t('key')` in templates, `const { t } = useI18n()` in script.
- Translation keys: nested, domain-prefixed (`hero.title`, `contact.form.name`).
- No typos in keys. No punctuation in keys.

## Composables

- File: `composables/useFeatureName.ts`. Named export: `export function useFeatureName()`.
- Static data → plain `readonly` objects or `as const`, not wrapped in `ref()`.
- Use injected composables (`useI18n()`, `useToast()`) internally — don't accept `translate` callbacks.
- Return typed objects: `{ data, isLoading, error, refresh }`.

## File Organization

```
components/          — auto-imported, organized by domain
  UI/                — reusable base components (AppButton, AppIcon, form/*)
  blog/              — blog feature components
  hire/              — hire feature components
composables/         — business logic hooks
types/               — shared TypeScript interfaces/types
utils/               — pure helper functions
assets/theme/        — PrimeVue preset + shared colors
  components/        — per-component PrimeVue theme overrides
  shared-colors.ts   — color tokens (single source of truth)
i18n/locales/        — translation files per locale
layouts/             — Nuxt layouts
pages/               — Nuxt pages
server/              — API routes
```

## Refactoring Checklist (apply when touching any file)

1. Remove hard-coded hex colors → replace with Tailwind token classes.
2. Remove manual component imports → rely on Nuxt auto-import.
3. Remove manual Vue API imports (`ref`, `computed`, etc.) → Nuxt auto-imports them.
4. Convert `defineProps({})` Options style → `defineProps<T>()` generic style.
5. Replace Russian comments with short English ones.
6. Remove `!important` and `:deep()` → fix via theme preset or CSS layers.
7. Remove `console.log` statements.
8. Add missing JSDoc.
9. Ensure mobile-first responsive order in Tailwind classes.

## Tech Stack

- Nuxt 3.16+ / Vue 3.5+ / TypeScript
- Tailwind CSS 4.1+ with `@tailwindcss/vite`
- PrimeVue 4.3+ with `tailwindcss-primeui`
- Vuelidate for form validation
- `@nuxtjs/i18n` for localization
- `@iconify/vue` via AppIcon wrapper
- ESLint (flat config) + Prettier (format-only, not inside ESLint)

---

Apply all rules to every generated or modified file. Prioritize maintainability, performance, accessibility, and reusability.
