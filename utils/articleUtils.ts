/**
 * Copies the current page URL to clipboard and executes the provided callback with a translated message.
 * @param onSuccess - Callback to execute after successful copy. Receives the translated message.
 * @param translate - Translation function accepting a key and returning a localized string.
 * @param translationKey - The i18n key for the success message.
 */
export function copyArticleLink(
  onSuccess: (message: string) => void,
  translate: (key: string) => string,
  translationKey: string,
): void {
  const url: string = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const message: string = translate(translationKey);
    onSuccess(message);
  });
}
