<template>
  <div class="my-10 flex w-full flex-col items-center">
    <Paginator
      :rows="pageSize"
      :totalRecords="totalItems"
      :first="(currentPage - 1) * pageSize"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      className="blog-paginator mb-2 border-none bg-transparent shadow-none aria-selected"
      @page="onPageChange"
    />
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
import Paginator from 'primevue/paginator';

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  pageCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'page-change', page: number): void }>();

const pageSize = props.pageSize ?? 10;
const currentPage = props.currentPage;
const totalItems = props.totalItems;
const pageCount = props.pageCount;

function onPageChange(event: { first: number; rows: number; page: number; pageCount?: number }) {
  emit('page-change', event.page + 1);
}
</script>

<style scoped>
:deep(.p-paginator) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.blog-paginator .p-paginator-pages .p-paginator-page),
:deep(.blog-paginator .p-paginator-first),
:deep(.blog-paginator .p-paginator-prev),
:deep(.blog-paginator .p-paginator-next),
:deep(.blog-paginator .p-paginator-last) {
  border-radius: 9999px;
    background: var(--color-card-bg) !important;

  color: var(--color-text-secondary);
  min-width: 2.25rem;
  height: 2.25rem;
  transition: all 220ms ease;
}

:deep(.blog-paginator .p-paginator-pages .p-paginator-page.p-highlight)
:deep(.blog-paginator .p-paginator-page .p-paginator-page-selected)
{
  background: var(--color-card-bg) !important;
  color: var(--color-text-dark);
}

:deep(.blog-paginator .p-paginator-pages .p-paginator-page:hover),
:deep(.blog-paginator .p-paginator-first:hover),
:deep(.blog-paginator .p-paginator-prev:hover),
:deep(.blog-paginator .p-paginator-next:hover),
:deep(.blog-paginator  .p-paginator-page-selected),
:deep(.blog-paginator .p-paginator-last:hover) {
  background: var(--color-background-gray);
  color: var(--color-text-dark);
}
</style>
