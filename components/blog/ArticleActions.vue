<template>
  <BlogButton
    v-for="action in actions"
    :key="action.key"
    :severity="action.severity"
    :rounded="action.rounded"
    :icon="action.icon"
    :aria-label="action.ariaLabel"
    @click="action.onClick"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BlogButton from '@/components/UI/blog/BlogButton.vue';
import { useToastMessage } from '@/composables/useToast';
import { copyArticleLink } from '@/utils/articleUtils';
import { useFavorites } from '@/composables/useFavorites';

const { showSuccess } = useToastMessage();
const { t, te } = useI18n();

interface Props {
  articleId: string;
  title?: string;
}
const props = defineProps<Props>();

const { isFavorite, toggleFavorite } = useFavorites(props.articleId);

function handleToggleFavorite() {
  toggleFavorite(showSuccess, t);
}

function copyArticle(): void {
  copyArticleLink(showSuccess, t, 'blog.link_copied');
}

const favoriteAriaLabel = computed(() => {
  if (isFavorite.value) {
    return te('article.remove_from_favorites')
      ? t('article.remove_from_favorites')
      : 'Remove from favorites';
  }
  return te('article.add_to_favorites') ? t('article.add_to_favorites') : 'Add to favorites';
});

const actions = computed(() => [
  {
    key: 'favorite',
    severity: isFavorite.value ? 'contrast' : 'secondary',
    rounded: true,
    icon: isFavorite.value ? 'pi pi-bookmark-fill' : 'pi pi-bookmark',
    color: isFavorite.value ? 'var(--primary-color)' : 'var(--secondary-color)',
    ariaLabel: favoriteAriaLabel.value,
    onClick: handleToggleFavorite,
  },
  {
    key: 'share',
    severity: 'secondary',
    rounded: true,
    icon: 'pi pi-share-alt',
    ariaLabel: t('article.share'),
    onClick: copyArticle,
  },
]);
</script>
