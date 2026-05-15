<template>
  <div class="my-10 flex w-full flex-col items-center">
    <nav
      class="blog-paginator mb-2 flex flex-wrap items-center justify-center gap-2"
      :aria-label="$t('blog.pagination')"
    >
      <Button
        type="button"
        label="«"
        size="small"
        severity="secondary"
        rounded
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber <= 1 }"
        :disabled="currentPageNumber <= 1"
        :aria-disabled="currentPageNumber <= 1"
        @click="onPageChange(1)"
      />

      <Button
        type="button"
        label="‹"
        size="small"
        severity="secondary"
        rounded
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber <= 1 }"
        :disabled="currentPageNumber <= 1"
        :aria-disabled="currentPageNumber <= 1"
        @click="onPageChange(Math.max(1, currentPageNumber - 1))"
      />

      <Button
        v-for="page in pages"
        :key="page"
        type="button"
        :label="String(page)"
        size="small"
        :severity="page === currentPageNumber ? 'contrast' : 'secondary'"
        rounded
        class="blog-paginator-btn"
        :class="{ 'is-active': page === currentPageNumber }"
        :aria-current="page === currentPageNumber ? 'page' : undefined"
        @click="onPageChange(page)"
      />

      <Button
        type="button"
        label="›"
        size="small"
        severity="secondary"
        rounded
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber >= pageCountNumber }"
        :disabled="currentPageNumber >= pageCountNumber"
        :aria-disabled="currentPageNumber >= pageCountNumber"
        @click="onPageChange(Math.min(pageCountNumber, currentPageNumber + 1))"
      />

      <Button
        type="button"
        label="»"
        size="small"
        severity="secondary"
        rounded
        class="blog-paginator-btn"
        :class="{ 'is-disabled': currentPageNumber >= pageCountNumber }"
        :disabled="currentPageNumber >= pageCountNumber"
        :aria-disabled="currentPageNumber >= pageCountNumber"
        @click="onPageChange(pageCountNumber)"
      />
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
import Button from 'primevue/button';

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
  min-width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  transition: transform 220ms ease;
}

.blog-paginator-btn:hover:not(.is-disabled) {
  transform: translateY(-1px);
}

.blog-paginator-btn.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
