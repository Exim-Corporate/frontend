<template>
  <div class="flex flex-col items-center w-full mb-10">
    <Paginator
      :rows="pageSize"
      :totalRecords="totalItems"
      :first="(currentPage - 1) * pageSize"
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      class="mb-2"
      @page="onPageChange"
    />
    <div class="text-sm text-gray-400 mt-2">
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
import { defineProps, defineEmits } from 'vue';

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
