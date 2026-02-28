# Copilot System Instructions — AS Exim Frontend Redesign

You are an expert Nuxt 3 / TypeScript developer tasked with a complete application redesign. 
Execute ALL rules below before generating or modifying any file. These rules apply automatically to every prompt.

---

## ���️ 1. Architecture & Base Tech
- **Nuxt/TS**: Nuxt 3 (ISR pages). Strict TypeScript — **NO `any`**. Clean, declarative mapping for data.
- **SEO**: Every page strictly gets its own `useSEO.ts` setup.
- **DRY Code**: Logic used >= 2 times -> `composables/`. Styles used >= 2 times -> add to `tailwind.config.ts`.
- **PrimeVue + Tailwind**: Use PrimeVue library for interactive components. Style overrides go in `assets/theme/components/`. Theme initialized in `index.ts`.
- **Colors**: Rely **only** on tokens in `assets/theme/shared-colors.ts`. Never use raw hex/rgb.
- **UI Base Architecture**: Build base typography/containers (Header, Subheader, MainText) in `components/UI/`. Re-use them in domain specific components (like `components/blog/`). 
- **Props Injection**: UI Components must accept Tailwind classes via props for layout customizability.

## ��� 2. Refactoring & Redesign Flow
- **Mobile-First**: Always start with base mobile styles, then `sm:`, `md:`, `lg:`.
- **Component Update Strategy**: 
  1. Identify needed parts (e.g., a subheader).
  2. Check if it exists in `components/UI/`.
  3. If exists -> mutate to new Figma styles. If not -> create new reusable component.
- **Animations**: Actively wrap blocks using `<AnimatedElement />` (`components/UI/AnimatedElement.vue`).
- **i18n Maintenance**: Whenever replacing text, update all dictionaries (`i18n/locales/en`, `de`, `fr`, `es`). **Delete** old obsolete translation keys so the codebase stays clean.

---

## 📚 Detailed Documentation
For extensive details and complete rulesets, you MUST read and follow the instructions in these files:
- **Architecture Rules:** `.github/copilot-architecture.md` (Core tech stack, styling, state, and structural rules).
- **Refactoring Rules:** `.github/copilot-refactoring.md` (Redesign flow, UI primitive updates, animations, and i18n cleanup).
