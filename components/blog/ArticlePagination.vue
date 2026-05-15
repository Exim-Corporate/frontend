<template>
  <div class="my-10 flex w-full flex-col items-center">
    <nav
      class="blog-paginator mb-2 flex flex-wrap items-center justify-center gap-2"
      :aria-label="$t('blog.pagination')"
    >
      <button
        type="button"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber <= 1 }"
        :aria-disabled="currentPageNumber <= 1"
        @click.prevent="onPageChange(1)"
      >
        «
      </button>

      <button
        type="button"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber <= 1 }"
        :aria-disabled="currentPageNumber <= 1"
        @click.prevent="onPageChange(Math.max(1, currentPageNumber - 1))"
      >
        ‹
      </button>

      <button
        v-for="page in pages"
        :key="page"
        type="button"
        class="blog-paginator-btn"
        :class="{ 'is-active': page === currentPageNumber }"
        :aria-current="page === currentPageNumber ? 'page' : undefined"
        @click.prevent="onPageChange(page)"
      >
        {{ page }}
      </button>

      <button
        type="button"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber >= pageCountNumber }"
        :aria-disabled="currentPageNumber >= pageCountNumber"
        @click.prevent="onPageChange(Math.min(pageCountNumber, currentPageNumber + 1))"
      >
        ›
      </button>

      <button
        type="button"
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber >= pageCountNumber }"
        :aria-disabled="currentPageNumber >= pageCountNumber"
        @click.prevent="onPageChange(pageCountNumber)"
      >
        »
      </button>
    </nav>
    <div class="mt-2 text-center text-sm text-text-secondary">
      {{
        $t('blog.pagination_report', {
          first: Math.max(1, (currentPageNumber - 1) * pageSizeNumber + 1),
          last: Math.min(currentPageNumber * pageSizeNumber, totalItemsNumber),
          total: totalItemsNumber,
          page: currentPageNumber,
          pageCount: pageCountNumber,
        })
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  pageCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'page-change', page: number): void }>();

const pageSizeNumber = computed(() => Math.max(1, Number(props.pageSize ?? 10) || 10));
const currentPageNumber = computed(() => Math.max(1, Number(props.currentPage) || 1));
const totalItemsNumber = computed(() => Math.max(0, Number(props.totalItems) || 0));
const pageCountNumber = computed(() => Math.max(1, Number(props.pageCount) || 1));
const pages = computed<number[]>(() => {
  const count = pageCountNumber.value;
  return Array.from({ length: count }, (_, i) => i + 1);
});

function onPageChange(page: number) {
  if (page < 1 || page > pageCountNumber.value || page === currentPageNumber.value) {
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
