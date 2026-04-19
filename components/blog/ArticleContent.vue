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
import DOMPurify from 'isomorphic-dompurify';
import type { StrapiArticle } from '@/types/strapi';

const props = defineProps<{
  content: StrapiArticle['content'] | null;
}>();
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // breaks: true,
});

const normalizeMalformedMarkdownLinks = (content: string) =>
  content.replace(/\[(https?:\/\/[^\]]+)\]\((link|url)\)/gi, '[link]($1)');

const renderedContent = computed(() => {
  if (props.content && typeof props.content === 'string') {
    const normalizedContent = normalizeMalformedMarkdownLinks(props.content);
    const rawHtml = md.render(normalizedContent);
    return DOMPurify.sanitize(rawHtml);
  }
  return '';
});
</script>

<style scoped>
/* Ensure links inside rendered markdown (v-html) look like links - use deep selector */
.article-content :deep(a) {
  color: var(--accent, #2563eb);
  text-decoration: underline;
}
.article-content :deep(a:hover) {
  opacity: 0.9;
}

/* Paragraph spacing: ensure paragraphs from markdown keep vertical rhythm even if global reset removed p margins */
.article-content :deep(p) {
  margin: 0 0 1rem;
  line-height: 1.7;
}

/* Headings spacing */
.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
}
</style>
