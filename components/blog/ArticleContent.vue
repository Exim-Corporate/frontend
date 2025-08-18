<template>
  <div
    v-if="renderedContent"
    class="article-content"
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
console.log('ArticleContent props:', props.content);
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // breaks: true,
});

const renderedContent = computed(() => {
  if (props.content && typeof props.content === 'string') {
    const rawHtml = md.render(props.content);
    return rawHtml;
    // return DOMPurify.sanitize(rawHtml);
  }
  return '';
});
</script>

<style scoped>
/* Ensure links inside rendered markdown (v-html) look like links - use deep selector */
.article-content ::v-deep a {
  color: var(--accent, #2563eb);
  text-decoration: underline;
}
.article-content ::v-deep a:hover {
  opacity: 0.9;
}
</style>
