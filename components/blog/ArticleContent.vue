<template>
  <AnimatedElement direction="bottom">
    <div
      v-if="renderedContent"
      class="article-content prose prose-neutral max-w-none"
      v-html="renderedContent"
    />
    <p
      v-else
      class="text-gray-500 italic"
    >
      {{ $t('article.content_not_available') }}
    </p>
  </AnimatedElement>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'isomorphic-dompurify';
import { useRuntimeConfig } from '#imports';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import type { StrapiArticle } from '@/types/strapi';

const props = defineProps<{
  content: StrapiArticle['content'] | null;
}>();

const config = useRuntimeConfig();
const strapiUrl = String(config.public.strapiUrl || 'http://localhost:1337').replace('://localhost', '://127.0.0.1');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // breaks: true,
});

const normalizeMalformedMarkdownLinks = (content: string) =>
  content.replace(/\[(https?:\/\/[^\]]+)\]\((link|url)\)/gi, '[link]($1)');

// Encode unencoded spaces inside markdown link/image URLs: ![alt](url with spaces) → ![alt](url%20with%20spaces)
const encodeMarkdownUrlSpaces = (content: string) =>
  content.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (_, prefix, url) =>
    `${prefix}(${url.replace(/ /g, '%20')})`,
  );

// Convert unicode bullet characters (• ○ ◦) used in Strapi richtext to markdown list items
const normalizeBullets = (content: string) =>
  content.replace(/^[ \t]*[•○◦▪▸–\-][ \t]+/gm, '- ');

// Rewrite relative Strapi upload paths to absolute URLs so <img> tags render correctly
const rewriteStrapiImageUrls = (html: string) =>
  html.replace(/(src|href)="(\/uploads\/)/g, `$1="${strapiUrl}$2`);

const renderedContent = computed(() => {
  if (props.content && typeof props.content === 'string') {
    const step1 = normalizeMalformedMarkdownLinks(props.content);
    const step2 = normalizeBullets(step1);
    const step3 = encodeMarkdownUrlSpaces(step2);
    const rawHtml = md.render(step3);
    const rewrittenHtml = rewriteStrapiImageUrls(rawHtml);
    return DOMPurify.sanitize(rewrittenHtml, { ADD_ATTR: ['target'] });
  }
  return '';
});
</script>

<style scoped>
/* Images inside markdown content */
.article-content :deep(img) {
  max-width: 100%;
  max-height: 450px;
  height: auto;
  width: 100%;
  border-radius: 0.5rem;
  margin: 1rem 0;
  display: block;
  aspect-ratio: 16/9;
}
</style>
