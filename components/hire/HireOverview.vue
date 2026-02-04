<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2
          data-aos="fade-up"
          data-aos-duration="500"
          class="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          {{ $t('hire.overview.title') }}
        </h2>

        <div
          v-if="renderedContent"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
          class="prose prose-lg dark:prose-invert max-w-none"
          v-html="renderedContent"
        />

        <div
          v-if="techHubsImage"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="200"
          class="mt-12"
        >
          <h3 class="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {{ $t('hire.overview.techHubs') }}
          </h3>
          <NuxtImg
            :src="techHubsImage"
            alt="Top Tech Hubs"
            format="webp"
            quality="85"
            class="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  content?: string | object;
  techHubsImage?: string;
}>();

const md = new MarkdownIt();

const renderedContent = computed(() => {
  if (!props.content) return '';

  if (typeof props.content === 'string') {
    return md.render(props.content);
  }

  if (Array.isArray(props.content)) {
    const text = props.content
      .map(
        (block: { children?: { text?: string }[] }) =>
          block.children?.map((child: { text?: string }) => child.text || '').join('') || '',
      )
      .join('\n\n');
    return md.render(text);
  }

  return '';
});
</script>
