/**
 * Copies a URL to clipboard and executes the provided callback with a translated message.
 * @param onSuccess - Callback to execute after successful copy. Receives the translated message.
 * @param translate - Translation function accepting a key and returning a localized string.
 * @param translationKey - The i18n key for the success message.
 * @param canonicalUrl - Optional canonical URL to copy. Falls back to window.location.href.
 */
export function copyArticleLink(
  onSuccess: (message: string) => void,
  translate: (key: string) => string,
  translationKey: string,
  canonicalUrl?: string,
): void {
  const url: string = canonicalUrl || window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const message: string = translate(translationKey);
    onSuccess(message);
  });
}
