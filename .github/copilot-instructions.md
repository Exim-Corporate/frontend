# Copilot System Instructions — AS Exim Frontend

You are an expert Nuxt 3 + TypeScript developer working on a full redesign of this project.
Apply these rules on every task.

---

## 1) Core Stack
- Nuxt 3 with ISR pages.
- Strict TypeScript. Do not use `any`.
- SEO is mandatory per page via `useSEO.ts`.
- Prefer declarative template logic (`v-for`, typed configs) over imperative branching.

## 2) Design System Rules
- Use PrimeVue for interactive controls.
- Use Tailwind for layout/spacing/composition.
- Use only semantic colors from `assets/theme/shared-colors.ts`.
- Do not hardcode HEX/RGB in Vue components.

## 3) Typography Contract (Canonical)
- Use typography primitives from `components/UI/` only.
- `BaseTitle` API:
  - `variant="main | subheader | subheader18"`
  - `className` for local layout overrides only.
- `BaseText` API:
  - `variant="main | card | section"`
  - `className` for local layout overrides only.
- `BaseSubheader` is removed/deprecated and must not be used.

## 4) Variant First, ClassName Second
- First choose the correct `variant`.
- Use `className` only for alignment/spacing/width adjustments (for example: `text-left`, `max-w-*`, `mb-*`).
- Do not redefine font-size/line-height in feature components unless absolutely necessary.

## 5) Refactoring Workflow
1. Break mockup into reusable UI pieces.
2. Check existing primitives in `components/UI/`.
3. Extend via `variant` when possible.
4. Create new primitive only when no suitable one exists.
5. Compose sections from primitives and typed data configs.

## 6) Animation + i18n
- Wrap meaningful visual blocks with `AnimatedElement`.
- Keep i18n direct in templates (`$t('...')`).
- When adding/replacing text, update all 4 locales: `en`, `de`, `fr`, `es`.
- Remove obsolete translation keys.

## 7) DRY Rules
- Repeated logic (2+ usages) goes to `composables/`.
- Repeated style groups (2+ usages) go to design-system utilities/tokens.

## 8) Reference Sections (Source of Truth)
- `components/HeroSection.vue`
  - `BaseTitle variant="main"`
  - `BaseText variant="main"`
  - `AnimatedElement` around key blocks
  - PrimeVue form controls + `AppButton`
- `components/ServicesProvideSection.vue`
  - `BaseTitle tag="h2" variant="main"`
  - `BaseText variant="section"`
  - typed `CardConfig` + declarative card rendering via `v-for`

---

## Additional Docs
- `.github/copilot-architecture.md`
- `.github/copilot-refactoring.md`
