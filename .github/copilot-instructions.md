# 📌 GitHub Copilot Instructions for This Project

## 📐 Architecture

- Follow the **SOLID principles**:

  - S — Each component should have a single responsibility.
  - O — Components should be open for extension but closed for modification.
  - L — Components should be replaceable with subtypes without breaking functionality.
  - I — Don't force components to depend on unused interfaces.
  - D — Inject dependencies via props, composables, or context.

- Use **feature-based or domain-based folder structure**, such as `components/`, `composables/`, `utils/`, `types/`, `features/`.

## 🧱 Components

- Components must be **small**, **reusable**, and **focused** on a single task.
- Use `<script setup lang="ts">` and **TypeScript**.
- Strongly type props with `defineProps<{ ... }>()`.
- Use `defineModel()` (Vue 3.4+) for two-way binding.
- Organize components by role: `Base`, `App`, `Feature`.

## 🎨 Styling (TailwindCSS 4.1+)

- Use **Tailwind utility classes** instead of inline styles or scoped CSS.
- Avoid repeated class declarations — **extract common styles into global utility classes** using `@apply` in `.css` files.
- Use `tailwindcss-primeui` for styling PrimeVue components with Tailwind.
- Dynamically compose class names using `clsx()` or `twMerge()` when necessary.

## ✂️ Code Splitting

- Lazy-load components with `defineAsyncComponent()` or use `definePageMeta({ preload: false })` in pages.
- Split code into **logical modules**: `pages`, `components`, `layouts`, `features`.

## 🌍 Localization & SEO

- Use `@nuxtjs/i18n` and `defineI18nRoute()` to support multiple languages.
- Use `useSeoMeta()` with localized values for proper SEO metadata.
- Write **semantic HTML** using tags like `<section>`, `<header>`, `<main>`, `<footer>`.

## 🧠 context7 Integration

- Always use **the latest features and APIs** from context7:
  - Tailwind CSS 4.1+
  - Nuxt 3.16+
  - Vue 3.5+
  - New APIs: `defineModel`, `defineSlots`, `defineExpose`, etc.
- Apply modern conventions and remove legacy patterns.

## 🧪 Testability

- Components should be **pure and side-effect free** unless explicitly needed.
- Use `vuelidate` for form validation and isolate logic in `useForm.ts` or composables.
- Move complex logic into `composables/` or `utils/`.

## 📚 Documentation

- Every component, composable, and utility function should have a **JSDoc** comment.
- Declare reusable types in the `types/*.ts` directory.

## 📦 Tech Stack / Libraries

- **Nuxt**: `^3.16.2`
- **Vue**: `^3.5.13`
- **Tailwind CSS**: `^4.1.4`
- **PrimeVue**: `^4.3.3`
- **i18n**, **Vuelidate**, **AOS**, **Iconify**, **Vue Carousel**, **Star Rating**, etc.
- **TypeScript**
- **Prettier** + **ESLint** + `eslint-config-prettier`

---

🧠 Apply all of the above instructions to every generated file. Aim for maintainability, performance, accessibility, and scalability.
