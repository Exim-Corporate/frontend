import { ref, computed } from 'vue';

const FAVORITES_KEY = 'article_favorites';

function getStoredFavorites(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites(articleId: string) {
  const favorites = ref<string[]>(getStoredFavorites());
  const isFavorite = computed(() => favorites.value.includes(articleId));

  function toggleFavorite(
    onSuccess: (message: string) => void,
    translate: (key: string) => string,
  ): void {
    const idx = favorites.value.indexOf(articleId);
    if (idx === -1) {
      favorites.value.push(articleId);
      onSuccess(translate('blog.added_to_favorites'));
    } else {
      favorites.value.splice(idx, 1);
      onSuccess(translate('blog.removed_from_favorites'));
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
  }

  function getFavorites(): string[] {
    return [...favorites.value];
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavorites,
  };
}
