<template>
  <section class="py-16 md:py-20 overflow-hidden">
    <div class="container">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
        Why Hire Software Developers in
        <span class="text-gradient">{{ countryName }}</span>
      </h2>
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          class="w-full lg:w-1/2 text-center lg:text-left"
        >
          <div
            v-if="content"
            class="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
            v-html="renderedContent"
          />
          <p
            v-else
            class="text-lg text-gray-600 dark:text-gray-300"
          >
            {{ $t('hire.whyHire.defaultDescription') }}
          </p>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-delay="100"
          class="w-full lg:w-1/2"
        >
          <NuxtImg
            :src="image"
            :alt="`Software Developers in ${countryName}`"
            format="webp"
            quality="85"
            class="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

interface ContentBlock {
  type: string;
  children?: { text: string; type: string }[];
}

const props = defineProps<{
  countryName: string;
  content?: ContentBlock[] | string;
  image?: string;
}>();

const md = new MarkdownIt({ html: true, breaks: true, linkify: true });

const renderedContent = computed(() => {
  if (!props.content) return '';
  if (typeof props.content === 'string') return md.render(props.content);
  if (Array.isArray(props.content)) {
    const text = props.content
      .map((block: ContentBlock) => {
        if (block.type === 'paragraph' && block.children) {
          return block.children.map(child => child.text).join('');
        }
        return '';
      })
      .join('\n\n');
    return md.render(text);
  }
  return '';
});
</script>
