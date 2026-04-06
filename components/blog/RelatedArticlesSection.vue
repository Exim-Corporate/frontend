    <template>
  <section class="my-25 pb-0 md:my-40">
    <div class="container">
      <BaseTitle
        tag="h2"
        variant="main"
        class-name="text-left leading-[35px] md:leading-[58px]"
      >
        {{ title }}
      </BaseTitle>

      <div class="mt-3 md:mt-4">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { StrapiArticle } from '@/types/strapi';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';

interface Props {
  title: string;
  articles: StrapiArticle[];
}

defineProps<Props>();
</script>
