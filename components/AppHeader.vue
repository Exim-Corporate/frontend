<template>
  <Transition
    name="header-slide"
    appear
  >
    <header
      v-show="isHeaderReady"
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1.5 gap-4"
      :class="[
        isScrolling ? '-translate-y-full' : 'translate-y-0',
        'bg-[var(--header-bg)] text-[var(--header-text)] shadow-[var(--header-shadow)]',
      ]"
    >
      <div class="container m-auto flex items-center justify-between gap-4 lg:gap-8">
        <div class="flex-shrink-0">
          <HeaderLogo />
        </div>

        <!-- Navigation Section -->
        <div class="flex-1 md:flex hidden items-center justify-center min-w-0">
          <HeaderNavigation />
        </div>

        <div class="flex-shrink-0 flex items-center gap-2 lg:gap-4">
          <!-- Language Dropdown - visible on desktop -->
          <div class="hidden md:block">
            <ClientOnly>
              <AppLanguageSwitcher />
              <template #fallback>
                <div class="w-20 h-8 bg-[var(--skeleton-bg)] rounded animate-pulse" />
              </template>
            </ClientOnly>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden flex items-center p-2 text-[var(--header-text)]"
            aria-label="Menu"
            @click="visible = true"
          >
            <AppIcon
              icon="material-symbols:menu"
              :size="24"
              className=""
              :color="'currentColor'"
            />
          </button>

          <!-- Theme switcher - visible only on desktop -->
          <ClientOnly>
            <AppThemeSwitcher
              size="medium"
              className="hidden md:block"
            />
            <template #fallback>
              <div
                class="hidden md:block w-12 h-6 bg-[var(--skeleton-bg)] rounded-full animate-pulse"
              />
            </template>
          </ClientOnly>

          <AppButton
            class="hidden md:block"
            severity="primary"
            scrollToContact
          >
            {{ $t('header.contactUs') }}
          </AppButton>
        </div>
      </div>
    </header>
  </Transition>

  <!-- Mobile Navigation Drawer -->
  <ClientOnly>
    <Drawer
      v-model:visible="visible"
      position="right"
      :modal="true"
      :showCloseIcon="true"
      class="p-4 w-80 bg-[var(--drawer-bg)]"
    >
      <div class="flex flex-col items-start gap-6">
        <NuxtImg
          src="/images/logoPic.webp"
          alt="Logo"
          class="h-auto w-40 mx-auto cursor-pointer filter-[var(--logo-filter)]"
          @click="navigateToHome"
        />
        <NuxtImg
          src="/images/logoText.webp"
          alt="Logo text"
          class="h-auto w-full cursor-pointer filter-[var(--logo-filter)]"
          @click="navigateToHome"
        />
        <!-- <HeaderLogo /> -->

        <!-- Language Switcher in drawer for mobile -->
        <div class="w-full mt-4">
          <AppLanguageSwitcher />
        </div>

        <HeaderNavigation v-model:visible="visible" />
        <!-- Theme switcher in drawer for mobile -->
        <div class="mt-6 flex justify-center items-center gap-3">
          <span class="text-sm text-[var(--drawer-text)]">{{ $t('header.switchTheme') }}:</span>
          <AppThemeSwitcher
            size="medium"
            className=""
          />
        </div>
        <!-- <div class="flex-1 flex items-center justify-center min-w-[300px] h-[300px]"> -->
        <!-- </div> -->

        <div class="mt-4 flex w-full justify-center">
          <AppButton
            v-model:visible="visible"
            severity="contrast"
            class="w-full"
            scrollToContact
          >
            {{ $t('header.contactUs') }}
          </AppButton>
        </div>
      </div>
    </Drawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import AppButton from '@/components/UI/AppButton.vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import AppThemeSwitcher from '@/components/UI/AppThemeSwitcher.vue';
import AppLanguageSwitcher from '@/components/UI/AppLanguageSwitcher.vue';
import HeaderLogo from '@/components/UI/HeaderLogo.vue';
import { useNavigateHome } from '@/composables/useNavigateHome';
import HeaderNavigation from '@/components/UI/HeaderNavigation.vue';
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import Drawer from 'primevue/drawer';
// import { useI18n } from 'vue-i18n';

// locale & router handled inside useNavigateHome composable now

const isScrolling = ref(false);
const visible = ref(false);
const isMounted = ref(false);
const themeInitialized = ref(false);

let lastScrollTop = 0;

// Проверяем готовность хедера для отображения
const isHeaderReady = computed(() => {
  // На сервере показываем сразу (SSR), на клиенте ждем инициализации
  if (import.meta.server) return true;
  return isMounted.value && themeInitialized.value;
});

// Инициализация CSS переменных для предотвращения FOUC
const initializeCSSVariables = (): void => {
  if (import.meta.server) return;

  const root = document.documentElement;
  const isDark = document.documentElement.classList.contains('dark');

  // Устанавливаем CSS переменные на основе текущей темы
  if (isDark) {
    root.style.setProperty('--header-bg', 'rgb(17 24 39 / 0.9)');
    root.style.setProperty('--header-text', 'rgb(255 255 255)');
    root.style.setProperty('--header-shadow', '0 10px 15px -3px rgb(0 0 0 / 0.1)');
    root.style.setProperty('--logo-filter', 'brightness(1)');
    root.style.setProperty('--drawer-bg', 'rgb(17 24 39)');
    root.style.setProperty('--drawer-text', 'rgb(255 255 255)');
    root.style.setProperty('--skeleton-bg', 'rgb(55 65 81)');
  } else {
    root.style.setProperty('--header-bg', 'rgb(243 244 246 / 0.8)');
    root.style.setProperty('--header-text', 'rgb(17 24 39)');
    root.style.setProperty('--header-shadow', '0 10px 15px -3px rgb(0 0 0 / 0.1)');
    root.style.setProperty('--logo-filter', 'brightness(0.5)');
    root.style.setProperty('--drawer-bg', 'rgb(243 244 246)');
    root.style.setProperty('--drawer-text', 'rgb(17 24 39)');
    root.style.setProperty('--skeleton-bg', 'rgb(229 231 235)');
  }
};

// Отслеживание изменений темы
const observeThemeChanges = (): MutationObserver | undefined => {
  if (import.meta.server) return;

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        initializeCSSVariables();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return observer;
};

function handleScroll(): void {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Hide header when scrolling down
  if (scrollTop > lastScrollTop && scrollTop > 50) {
    isScrolling.value = true;
  }
  // Show header when scrolling up (even by a few pixels)
  else if (scrollTop < lastScrollTop) {
    isScrolling.value = false;
  }

  lastScrollTop = scrollTop;
}

// Navigation helpers (DRY)
// scrollToTop currently unused here but returned for possible future use
const { navigateToHome, scrollToTop: _scrollToTop } = useNavigateHome({ visibleRef: visible });

onMounted(async () => {
  // Добавляем обработчик скролла
  window.addEventListener('scroll', handleScroll);

  // Ждем следующий тик для завершения гидратации
  await nextTick();

  // Инициализируем CSS переменные
  initializeCSSVariables();

  // Запускаем наблюдение за изменениями темы
  const themeObserver = observeThemeChanges();

  // Даем время для инициализации темы
  setTimeout(() => {
    themeInitialized.value = true;
  }, 50);

  // Помечаем как монтированный
  isMounted.value = true;

  // Очистка при размонтировании
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    themeObserver?.disconnect();
  });
});
</script>

<style scoped>
.language-selector {
  min-width: 100px;
}

/* Анимации для плавного появления хедера */
.header-slide-enter-active {
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.header-slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.header-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.header-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.header-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.header-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Поддержка анимации для пользователей с ограниченными возможностями */
@media (prefers-reduced-motion: reduce) {
  .header-slide-enter-active,
  .header-slide-leave-active {
    transition: opacity 0.3s ease;
  }

  .header-slide-enter-from,
  .header-slide-leave-to {
    transform: none;
    opacity: 0;
  }

  .header-slide-enter-to,
  .header-slide-leave-from {
    transform: none;
    opacity: 1;
  }
}
</style>
