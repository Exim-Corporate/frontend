<template>
  <div class="py-8 mt-8 border-t border-gray-200 dark:border-gray-700">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <!-- Share Article -->
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ $t('article.share') }}:
        </span>
        <div class="flex gap-2">
          <BlogButton
            v-for="action in shareActions"
            :key="action.key"
            :icon="action.icon"
            :aria-label="action.ariaLabel"
            :severity="action.severity"
            :rounded="true"
            @click="action.onClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BlogButton from '@/components/UI/blog/BlogButton.vue';
import { useI18n } from 'vue-i18n';
import { copyArticleLink } from '@/utils/articleUtils';
import { useToastMessage } from '@/composables/useToast';

const { showSuccess } = useToastMessage();

const { t } = useI18n();

const pageUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return '';
});

function copyLink() {
  copyArticleLink(showSuccess, t, 'blog.link_copied');
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(pageUrl.value);
  }
}

const shareActions = computed(() => [
  {
    key: 'facebook',
    icon: 'pi pi-facebook',
    ariaLabel: t('article.share') + ' Facebook',
    severity: 'secondary',
    onClick: () =>
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl.value}`, '_blank'),
  },
  {
    key: 'x',
    icon: 'pi pi-twitter', // используйте подходящий icon для X
    ariaLabel: t('article.share') + ' X',
    severity: 'secondary',
    onClick: () => window.open(`https://x.com/share?url=${pageUrl.value}`, '_blank'),
  },
  {
    key: 'linkedin',
    icon: 'pi pi-linkedin',
    ariaLabel: t('article.share') + ' LinkedIn',
    severity: 'secondary',
    onClick: () =>
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl.value}`, '_blank'),
  },
  {
    key: 'copy',
    icon: 'pi pi-copy',
    ariaLabel: t('article.share') + ' Copy Link',
    severity: 'secondary',
    onClick: copyLink,
  },
]);
</script>
