<template>
  <div
    v-if="renderedContent"
    v-html="renderedContent"
  />
  <p
    v-else
    class="text-gray-500 italic"
  >
    {{ $t('article.content_not_available') }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
// import DOMPurify from 'dompurify';
import type { StrapiArticle } from '@/types/strapi';

const props = defineProps<{
  content: StrapiArticle['content'] | null;
}>();

const md = new MarkdownIt();

const renderedContent = computed(() => {
  if (props.content && typeof props.content === 'string') {
    const rawHtml = md.render(props.content);
    return rawHtml;
    // return DOMPurify.sanitize(rawHtml);
  }
  return '';
});
</script>
