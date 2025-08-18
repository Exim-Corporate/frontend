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
import { useRuntimeConfig, useRoute } from '#imports';

const { showSuccess } = useToastMessage();

const { t } = useI18n();

const runtime = useRuntimeConfig();
const route = useRoute();

// Canonical page URL: prefer window.location on client; on server build from siteUrl + route.fullPath (safer than route.path)
const pageUrl = computed(() => {
  if (typeof window !== 'undefined' && window.location?.href) {
    return window.location.href;
  }
  const base = runtime.public.siteUrl || runtime.public.strapiUrl || 'https://www.exim.eu.com';
  // route.fullPath includes path + query/hash; fall back to route.path or '/'
  const path = String(route.fullPath || route.path || '/');
  return new URL(path, String(base)).href;
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
    onClick: () => {
      const u = encodeURIComponent(pageUrl.value);
      const w = window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, '_blank');
      if (w) w.opener = null;
    },
  },
  {
    key: 'x',
    icon: 'pi pi-twitter', // используйте подходящий icon для X
    ariaLabel: t('article.share') + ' X',
    severity: 'secondary',
    onClick: () => {
      const u = encodeURIComponent(pageUrl.value);
      const w = window.open(`https://x.com/share?url=${u}`, '_blank');
      if (w) w.opener = null;
    },
  },
  {
    key: 'linkedin',
    icon: 'pi pi-linkedin',
    ariaLabel: t('article.share') + ' LinkedIn',
    severity: 'secondary',
    onClick: () => {
      const u = encodeURIComponent(pageUrl.value);
      const w = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`, '_blank');
      if (w) w.opener = null;
    },
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
