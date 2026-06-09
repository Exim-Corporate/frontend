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
import { ref, watchEffect } from 'vue';
import MarkdownIt from 'markdown-it';
// NOTE: isomorphic-dompurify is NOT imported here.
// It pulls jsdom → html-encoding-sniffer → @exodus/bytes (ESM-only) which crashes
// Vercel SSR with "require() of ES Module not supported", causing every article
// page to return HTTP 500 and breaking LinkedIn share previews.
// Content comes from admin-controlled Strapi, so server-side sanitization is
// not required. DOMPurify runs client-side only via dynamic import.
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

const buildHtml = (): string => {
  if (props.content && typeof props.content === 'string') {
    const step1 = normalizeMalformedMarkdownLinks(props.content);
    const step2 = normalizeBullets(step1);
    const step3 = encodeMarkdownUrlSpaces(step2);
    const rawHtml = md.render(step3);
    return rewriteStrapiImageUrls(rawHtml);
  }
  return '';
};

// Server renders raw HTML (trusted Strapi content).
// Client sanitizes asynchronously with DOMPurify (browser-native DOM, no jsdom).
const renderedContent = ref(buildHtml());

if (import.meta.client) {
  watchEffect(async () => {
    const html = buildHtml();
    if (!html) {
      renderedContent.value = '';
      return;
    }
    try {
      const { default: DOMPurify } = await import('dompurify');
      renderedContent.value = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
    } catch {
      renderedContent.value = html;
    }
  });
} else {
  watchEffect(() => {
    renderedContent.value = buildHtml();
  });
}
</script>

<style scoped>
/* Images inside markdown content */
.article-content :deep(img) {
  max-width: 100%;
  max-height: 450px;
  height: auto;
  border-radius: 16px;
  margin: 1rem 0;
  display: block;
  aspect-ratio: 16/9;
}
</style>
