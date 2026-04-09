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
- Use `className` only for alignment/spacing/width adjustments (e.g. `text-left`, `max-w-*`, `mb-*`).
- Do not redefine font-size/line-height in feature components unless absolutely necessary.

## 5) Two-Screenshot Section Workflow (Required)
When user provides 2 screenshots (mobile + desktop), implement one modular section in this exact order:
1. **Extract structure from screenshots**: identify title block, controls, cards/list, CTA, visual accents.
2. **Map to primitives**: use `BaseTitle`, `BaseText`, existing cards/buttons/chips first.
3. **Define typed config**: create typed arrays/interfaces for repeated items.
4. **Build responsive split**:
   - mobile block first (`md:hidden`)
   - desktop block second (`hidden md:*`)
5. **Add animation intentionally**:
   - viewport reveal via `AnimatedElement`
   - state switch animation via `<Transition ...>` with complete `enter/leave` classes
6. **Wire i18n keys**: text in template via `$t('...')`, keys added in all locales.
7. **Final cleanup**: no dead/commented code, no unused styles, no one-off typography hacks.

## 6) Animation + i18n
- Wrap meaningful visual blocks with `AnimatedElement`.
- If using Vue `<Transition>`, always define full state set:
  - `*-enter-from`, `*-enter-active`, `*-enter-to`
  - `*-leave-from`, `*-leave-active`, `*-leave-to`
- For switched content, key the animated root (`:key`) and use `mode="out-in"` when old block must finish leave before new enter.
- Do not keep transition CSS if `<Transition>` is removed/commented.
- Keep i18n direct in templates (`$t('...')`).
- When adding/replacing text, update all 4 locales: `en`, `de`, `fr`, `es`.
- Remove obsolete translation keys.

## 7) DRY Rules
- Repeated logic (2+ usages) goes to `composables/`.
- Repeated style groups (2+ usages) go to design-system utilities/tokens.

## 8) Component Composition Pattern
- Section shell: semantic `<section>` + consistent container strategy.
- Header block: `BaseTitle` + `BaseText` with layout-only `className`.
- Dynamic block: typed config + `v-for` rendering.
- Feature splits (tabs/roles/categories): keep selected state in section parent, pass down via props/events.
- Keep child components focused (desktop view, mobile view, tabs, card).

## 9) Clean Code Guardrails
- No commented-out template/script/style blocks in final code.
- No duplicate animation systems for the same interaction unless explicitly required.
- Keep classes mobile-first and readable.
- Preserve strict typing in props, emits, computed values.

## 10) Reference Sections (Source of Truth)
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
- `.github/strapi-mcp-rules.md`

## 11) Strapi Content Ops Reference (REST Only)
Use this checklist whenever adding/updating content models or content in Strapi.

### A. Verify API Access First
1. Confirm Strapi is reachable:
  - `GET /api/<collection>` should return `200/403` (403 means auth required, service is up).
2. Confirm token-based read works:
  - `GET /api/<collection>?pagination[limit]=1`
3. Confirm token-based write works safely (no-op update):
  - `PUT /api/<collection>/<documentId>` with body `{ "data": {} }`
  - Expect `200` and unchanged entity.

### B. Check Existing Content and Fields
1. Inspect available entries:
  - `GET /api/<collection>?pagination[limit]=100`
2. Inspect nested fields/components/media/relations:
  - `GET /api/<collection>?populate=*`
  - For deeper structures use nested populate:
    - `populate[field][populate][nested]=true`
3. Validate actual response shape before typing frontend models.

### C. Add/Update Content Model (Schema)
1. Create new component JSON in `strapi/src/components/<category>/<name>.json`.
2. If needed, create nested components first, then reference them from parent component.
3. Attach the new component field to the target content-type schema in:
  - `strapi/src/api/<type>/content-types/<type>/schema.json`
4. For component fields use:
  - `"type": "component"`, `"component": "<category>.<name>"`, `"repeatable": true|false`.

### D. Add Content via API
1. Read target entries first and map by `documentId`.
2. Create payload in `{ "data": { ... } }` format.
3. Use:
  - `POST /api/<collection>` for create
  - `PUT /api/<collection>/<documentId>` for update
4. For relations/components, send values in the exact shape expected by Strapi response model.

### E. Validate Completion
1. Re-read updated entries with nested populate.
2. Confirm all required pages have content (no missing items).
3. Only after API validation is complete, implement/update frontend rendering.
