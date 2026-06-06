<template>
  <Transition name="header-slide" appear>
    <header
      v-show="isHeaderReady"
      class="fixed left-0 right-0 top-0 z-50 border-b border-form-border bg-white/95 py-2 backdrop-blur-md transition-transform duration-300"
      :class="isScrolling ? '-translate-y-full' : 'translate-y-0'"
    >
      <div class="container m-auto flex items-center gap-3 lg:gap-6">
        <div class="shrink-0">
          <HeaderLogo />
        </div>

        <MegaMenu :model="menuItems" :pt="megaMenuPt" :dt="megaMenuDt" breakpoint="680px" class="border-0 bg-transparent hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <template #item="{ item, hasSubmenu }" >
              <!-- Custom dropdown panel -->
              <div v-if="!item.root && isPanelItem(item.label)" class="flex max-h-[70vh] w-7xl max-w-[90vw] gap-12 overflow-y-auto p-6">
                <div class="min-w-0 flex-1 flex flex-col justify-between">
                  <div class="space-y-6">
                    <section v-for="group in getPrimaryGroups(getPanelType(item.label))" :key="group.id">
                      <h3 v-if="group.title" class="mb-3 text-base font-semibold text-text-dark">
                        {{ group.title }}
                      </h3>
                      <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-10">
                        <NuxtLink
                          v-for="link in group.links"
                          :key="link.id"
                          :to="link.to"
                          class="block text-text-dark hover:text-accent transition-colors"
                        >
                          <ArticleCard
                            :article="{ title: link.title, description: link.description }"
                            as="div"
                            compact
                            sm
                            hide-image
                            hide-date
                          />
                        </NuxtLink>
                      </div>
                    </section>
                  </div>

                  <!-- Extra links section -->
                  <section v-if="getExtraGroup(getPanelType(item.label))" class="mt-10">
                    <h4 v-if="getExtraGroup(getPanelType(item.label))?.title" class="mb-3 text-base font-semibold text-text-dark">
                      {{ getExtraGroup(getPanelType(item.label))?.title }}
                    </h4>
                    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-10">
                      <NuxtLink
                        v-for="link in getExtraGroup(getPanelType(item.label))?.links"
                        :key="link.id"
                        :to="link.to"
                        class="block text-text-dark hover:text-accent transition-colors"
                      >
                        <ArticleCard
                          :article="{ title: link.title, description: link.description }"
                          as="div"
                          compact
                          sm
                          hide-image
                          hide-date
                        />
                      </NuxtLink>
                    </div>
                  </section>
                </div>

                <NuxtImg
                  :src="getImage(getPanelType(item.label))"
                  alt=""
                  width="248"
                  height="400"
                  loading="lazy"
                  quality="85"
                  format="webp"
                  class="hidden lg:block h-auto w-62 shrink-0 rounded-2xl object-cover"
                />
              </div>

              <!-- Root item with route (e.g. Blog) -->
              <NuxtLink
                v-else-if="item.root && item.route"
                :to="item.route"
                class="flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-text-dark"
              >
                {{ item.label }}
              </NuxtLink>

              <!-- Root item without route (dropdown trigger) -->
              <span
                v-else-if="item.root"
                class="flex cursor-pointer items-center gap-1 px-4 py-2 text-[15px] font-medium text-text-dark"
              >
                {{ item.label }}
                <i v-if="hasSubmenu" class="pi pi-angle-down text-xs transition-transform duration-200" />
              </span>
            </template>
          </MegaMenu>
        <div class="ml-auto flex shrink-0 items-center gap-2 lg:gap-4">
          <div class="hidden md:block">
            <ClientOnly>
              <AppLanguageSwitcher />
              <template #fallback>
                <div class="h-8 w-20 animate-pulse rounded bg-form-border" />
              </template>
            </ClientOnly>
          </div>

          
          <AppButton class="hidden md:block" severity="primary" @click="openContactModal('header-contact')">
            {{ $t('header.contactUs') }}
          </AppButton>
          <button
            class="flex items-center rounded-full p-2 text-text-dark lg:hidden"
            aria-label="Menu"
            @click="drawerVisible = true"
          >
            <AppIcon icon="material-symbols:menu" :size="24" color="currentColor" />
          </button>
        </div>
      </div>
    </header>
  </Transition>

  <ClientOnly>
    <Drawer
      v-model:visible="drawerVisible"
      position="right"
      :modal="true"
      :blockScroll="true"
      :showCloseIcon="false"
      class="mobile-header-drawer w-[86vw] max-w-105 border-0 bg-white p-4"
    >
      <div class="flex h-full flex-col">
        <div class="mb-4 flex items-center justify-between">
          <HeaderLogo />
          <div class="flex items-center gap-3">
            <AppLanguageSwitcher />
            <button
              class="flex items-center rounded-full p-1 text-text-dark"
              aria-label="Close"
              @click="drawerVisible = false"
            >
              <AppIcon icon="material-symbols:close" :size="24" color="currentColor" />
            </button>
          </div>
        </div>

        <PanelMenu :model="mobileMenuItems" :pt="panelMenuPt" multiple class="border-0">
          <template #item="{ item, hasSubmenu }">
            <h4 v-if="item.sectionHeading" class="px-2 pb-1 pt-6 text-sm font-semibold text-text-dark">
              {{ item.label }}
            </h4>
            <NuxtLink v-else-if="item.route" :to="item.route" class="block" @click="drawerVisible = false">
              <ArticleCard
                :article="{ title: String(item.label ?? ''), description: item.subtext }"
                as="div"
                compact
                hide-image
                hide-date
              />
            </NuxtLink>
            <button
              v-else
              type="button"
              class="flex w-full items-center justify-between px-2 py-3 text-base font-medium text-text-dark"
            >
              {{ item.label }}
              <i v-if="hasSubmenu" class="pi pi-angle-down text-xs" />
            </button>
          </template>
        </PanelMenu>

        <div class="mt-auto pt-6">
          <AppButton class="w-full" severity="contrast" @click="handleMobileContactClick">
            {{ $t('header.contactUs') }}
          </AppButton>
        </div>
      </div>
    </Drawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath, useAsyncData, useRuntimeConfig } from '#imports';
import type { MenuItem } from 'primevue/menuitem';
import MegaMenu from 'primevue/megamenu';
import PanelMenu from 'primevue/panelmenu';
import Drawer from 'primevue/drawer';
import AppButton from '@/components/UI/AppButton.vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import AppLanguageSwitcher from '@/components/UI/AppLanguageSwitcher.vue';
import HeaderLogo from '@/components/UI/HeaderLogo.vue';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import { useContactModal } from '@/composables/useContactModal';
import type { StrapiHeaderNavigation, StrapiHeaderNavLink } from '@/types/strapi';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

type PanelType = 'ai' | 'expertise';

interface LinkItem {
  id: string;
  title: string;
  description: string;
  to: string;
}

interface LinkGroup {
  id: string;
  title?: string;
  links: LinkItem[];
}

const { locale } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const { open: openContactModal } = useContactModal();

const isScrolling = ref(false);
const drawerVisible = ref(false);
const isMounted = ref(false);
let lastScrollTop = 0;

const isHeaderReady = computed(() => import.meta.server || isMounted.value);

const { data: headerData } = await useAsyncData<StrapiHeaderNavigation>(
  () => `header-navigation-${locale.value}`,
  () => $fetch<StrapiHeaderNavigation>('/api/header-navigation', { query: { locale: locale.value } }),
  { server: true, lazy: false, watch: [locale] },
);

const toServicePath = (slug: string) => localePath(`/services/${slug}`);
const toIndustryPath = (slug: string) => localePath(`/industry/${slug}`);
const normalizeLinkDescription = (description: string | undefined, title: string): string => {
  const normalized = description?.trim();
  return normalized && normalized.length > 0 ? normalized : title;
};

const buildGroups = (
  links: StrapiHeaderNavLink[] | undefined,
  extraLinks: StrapiHeaderNavLink[] | undefined,
  primaryTitle: string | undefined,
  extraTitle: string | undefined,
  toPath: (slug: string) => string,
): { primary: LinkGroup[]; extra: LinkGroup | null } => {
  const primary: LinkGroup[] = [];

  if (links?.length) {
    primary.push({
      id: 'primary',
      title: primaryTitle,
      links: links.map(l => ({
        id: l.documentId || String(l.id),
        title: l.title,
        description: normalizeLinkDescription(l.description, l.title),
        to: toPath(l.slug),
      })),
    });
  }

  const extra: LinkGroup | null = extraLinks?.length
    ? {
        id: 'extra',
        title: extraTitle,
        links: extraLinks.map(l => ({
          id: `extra-${l.documentId || String(l.id)}`,
          title: l.title,
          description: normalizeLinkDescription(l.description, l.title),
          to: toPath(l.slug),
        })),
      }
    : null;

  return { primary, extra };
};

const aiData = computed(() => {
  const d = headerData.value?.aiDevelopmentDropdown;
  if (!d) return { primary: [], extra: null };
  return buildGroups(d.links, d.extraLinks, d.primaryGroupTitle, d.extraGroupTitle, toServicePath);
});

const expertiseData = computed(() => {
  const d = headerData.value?.expertiseDropdown;
  if (!d) return { primary: [], extra: null };
  return buildGroups(d.links, d.extraLinks, d.primaryGroupTitle, d.extraGroupTitle, toIndustryPath);
});

const getPrimaryGroups = (panelType?: PanelType): LinkGroup[] =>
  panelType === 'ai' ? aiData.value.primary : panelType === 'expertise' ? expertiseData.value.primary : [];

const getExtraGroup = (panelType?: PanelType): LinkGroup | null =>
  panelType === 'ai' ? aiData.value.extra : panelType === 'expertise' ? expertiseData.value.extra : null;

const getAllGroups = (panelType?: PanelType): LinkGroup[] => {
  const p = getPrimaryGroups(panelType);
  const e = getExtraGroup(panelType);
  return e ? [...p, e] : p;
};

const FALLBACK_IMAGE = '/images/Header.webp';

const getImage = (panelType?: PanelType): string => {
  const url =
    panelType === 'ai'
      ? headerData.value?.aiDevelopmentDropdown?.image?.url
      : panelType === 'expertise'
        ? headerData.value?.expertiseDropdown?.image?.url
        : undefined;
  if (!url || !url.trim()) return FALLBACK_IMAGE;
  return normalizeImageUrl(url, String(config.public.strapiUrl ?? '')) || FALLBACK_IMAGE;
};

const isPanelItem = (label: unknown): boolean => {
  return String(label ?? '').startsWith('_panel:');
};

const getPanelType = (label: unknown): PanelType | undefined => {
  const str = String(label);
  if (str.startsWith('_panel:ai')) return 'ai';
  if (str.startsWith('_panel:expertise')) return 'expertise';
  return undefined;
};

const menuItems = computed<MenuItem[]>(() => {
  if (!headerData.value) return [];
  return [
    {
      label: headerData.value.aiDevelopmentDropdown?.label,
      root: true,
      items: [[{ label: '', items: [{ label: '_panel:ai' }] }]],
    },
    {
      label: headerData.value.expertiseDropdown?.label,
      root: true,
      items: [[{ label: '', items: [{ label: '_panel:expertise' }] }]],
    },
    {
      label: headerData.value.blogLabel,
      root: true,
      route: headerData.value.blogPath,
    },
  ];
});

const mobileMenuItems = computed(() => {
  if (!headerData.value) return [];

  const toItems = (groups: LinkGroup[]): (MenuItem & { subtext?: string; route?: string; sectionHeading?: boolean })[] =>
    groups.flatMap(g => [
      ...(g.title ? [{ label: g.title, sectionHeading: true, disabled: true }] : []),
      ...g.links.map(l => ({ label: l.title, subtext: l.description, route: l.to })),
    ]);

  return [
    {
      label: headerData.value.aiDevelopmentDropdown?.label,
      items: toItems(getAllGroups('ai')),
    },
    {
      label: headerData.value.expertiseDropdown?.label,
      items: toItems(getAllGroups('expertise')),
    },
    {
      label: headerData.value.blogLabel,
      route: headerData.value.blogPath,
    },
  ];
});

const megaMenuDt = {
  overlay: {
    background: 'transparent',
    border: { color: 'transparent', radius: '0' },
    shadow: 'none',
    padding: '0',
    gap: '0',
  },
  item: {
    focus: { background: 'transparent' },
    active: { background: 'transparent' },
  },
  submenu: {
    padding: '0',
    gap: '0',
  },
};

function handleRootItemEnter(e: MouseEvent) {
  const li = e.currentTarget as HTMLElement;
  requestAnimationFrame(() => {
    if (li.isConnected && li.getAttribute('data-p-active') !== 'true') {
      const content = li.querySelector(':scope > .p-megamenu-item-content') as HTMLElement;
      content?.click();
    }
  });
}

function handleMegaMenuLeave(e: MouseEvent) {
  const root = e.currentTarget as HTMLElement;
  requestAnimationFrame(() => {
    const active = root.querySelector<HTMLElement>('.p-megamenu-item[data-p-active="true"] > .p-megamenu-item-content');
    active?.click();
  });
}

const megaMenuPt = {
  root: {
    onMouseleave: handleMegaMenuLeave,
  },
  rootList: 'justify-center gap-1',
  submenu: 'border border-form-border bg-white px-8 py-6 shadow-xl rounded-2xl',
  overlay: 'pt-2',
  item: ({ context }: { context: { item: MenuItem } }) => {
    if (!Array.isArray(context.item?.items) || context.item.items.length === 0) return {};
    return {
      onMouseenter: handleRootItemEnter,
    };
  },
};

const panelMenuPt = {
  root: 'border-0 bg-transparent',
  panel: 'border-0 bg-transparent mb-1',
  headerContent: 'border-b border-form-border rounded-none bg-transparent',
  content: 'border-0 bg-transparent',
};

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  isScrolling.value = scrollTop > lastScrollTop && scrollTop > 40;
  if (scrollTop < lastScrollTop) isScrolling.value = false;
  lastScrollTop = scrollTop;
}

const handleMobileContactClick = () => {
  drawerVisible.value = false;
  openContactModal('header-contact');
};

onMounted(() => {
  isMounted.value = true;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
:deep(.p-megamenu-overlay) {
  animation: headerMegaIn 200ms ease-out;
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  margin-inline: auto !important;
  width: 1400px !important;
  min-width: 0 !important;
  max-width: 95vw !important;
}

@keyframes headerMegaIn {
  from {
    opacity: 0;
    margin-top: -10px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
}

:deep(.p-megamenu-item[data-p-active='true'] > .p-megamenu-item-content .pi-angle-down) {
  transform: rotate(180deg);
}

:deep(.p-megamenu-submenu .p-megamenu-item-content) {
  background: transparent !important;
  padding: 0;
}

:deep(.p-collapsible-enter-active) {
  animation: headerPanelExpand 300ms ease-out;
}

:deep(.p-collapsible-leave-active) {
  animation: headerPanelCollapse 250ms ease-in;
}

@keyframes headerPanelExpand {
  from {
    opacity: 0;
    grid-template-rows: 0fr;
  }
  to {
    opacity: 1;
    grid-template-rows: 1fr;
  }
}

@keyframes headerPanelCollapse {
  from {
    opacity: 1;
    grid-template-rows: 1fr;
  }
  to {
    opacity: 0;
    grid-template-rows: 0fr;
  }
}

:deep(.mobile-header-drawer .p-drawer-header) {
  display: none;
}

:deep(.p-panelmenu-submenu .p-panelmenu-item:last-child .group .absolute.bottom-0) {
  display: none;
}
</style>
