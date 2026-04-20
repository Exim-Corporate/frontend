<template>
  <div class="my-10 flex w-full flex-col items-center">
    <nav
      class="blog-paginator mb-2 flex flex-wrap items-center justify-center gap-2"
      :aria-label="$t('blog.pagination')"
    >
      <NuxtLink
        :to="buildPageLink(1)"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPage <= 1 }"
        :aria-disabled="currentPage <= 1"
        @click.prevent="onPageChange(1)"
      >
        «
      </NuxtLink>

      <NuxtLink
        :to="buildPageLink(Math.max(1, currentPage - 1))"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPage <= 1 }"
        :aria-disabled="currentPage <= 1"
        @click.prevent="onPageChange(Math.max(1, currentPage - 1))"
      >
        ‹
      </NuxtLink>

      <NuxtLink
        v-for="page in pages"
        :key="page"
        :to="buildPageLink(page)"
        class="blog-paginator-btn"
        :class="{ 'is-active': page === currentPage }"
        :aria-current="page === currentPage ? 'page' : undefined"
        @click.prevent="onPageChange(page)"
      >
        {{ page }}
      </NuxtLink>

      <NuxtLink
        :to="buildPageLink(Math.min(pageCount, currentPage + 1))"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPage >= pageCount }"
        :aria-disabled="currentPage >= pageCount"
        @click.prevent="onPageChange(Math.min(pageCount, currentPage + 1))"
      >
        ›
      </NuxtLink>

      <NuxtLink
        :to="buildPageLink(pageCount)"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPage >= pageCount }"
        :aria-disabled="currentPage >= pageCount"
        @click.prevent="onPageChange(pageCount)"
      >
        »
      </NuxtLink>
    </nav>
    <div class="mt-2 text-center text-sm text-text-secondary">
      {{
        $t('blog.pagination_report', {
          first: (currentPage - 1) * pageSize + 1,
          last: Math.min(currentPage * pageSize, totalItems),
          total: totalItems,
          page: currentPage,
          pageCount,
        })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from '#imports';

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  pageCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'page-change', page: number): void }>();
const route = useRoute();

const pageSize = computed(() => props.pageSize ?? 10);
const currentPage = computed(() => props.currentPage);
const totalItems = computed(() => props.totalItems);
const pageCount = computed(() => props.pageCount);
const pages = computed<number[]>(() => {
  const count = Math.max(1, pageCount.value);
  return Array.from({ length: count }, (_, i) => i + 1);
});

function buildPageLink(page: number) {
  const targetPage = Math.max(1, page);
  const query = { ...route.query } as Record<string, string | string[] | undefined>;

  if (targetPage <= 1) {
    delete query.page;
  }
  else {
    query.page = String(targetPage);
  }

  return {
    path: route.path,
    query,
  };
}

function onPageChange(page: number) {
  if (page < 1 || page > pageCount.value || page === currentPage.value) {
    return;
  }

  emit('page-change', page);
}
</script>

<style scoped>
.blog-paginator-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--color-card-bg);
  color: var(--color-text-secondary);
  min-width: 2.25rem;
  height: 2.25rem;
  transition: all 220ms ease;
  text-decoration: none;
}

.blog-paginator-btn:hover {
  background: var(--color-background-gray);
  color: var(--color-text-dark);
}

.blog-paginator-btn.is-active {
  background: var(--color-background-gray);
  color: var(--color-text-dark);
}

.blog-paginator-btn.is-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
