import { useToast } from 'primevue/usetoast';

/**
 * Composable for showing PrimeVue toast notifications.
 * Usage:
 *   const { showSuccess, showError } = useToastMessage();
 *   showSuccess('Success message');
 *   showError('Error message');
 */
export function useToastMessage() {
  const toast = useToast();

  /**
   * Show a success toast message.
   * @param message - The message to display.
   * @param summary - Optional summary/title.
   */
  function showSuccess(message: string, summary: string = 'Success'): void {
    toast.add({
      severity: 'success',
      summary,
      detail: message,
      life: 3000,
    });
  }

  /**
   * Show an error toast message.
   * @param message - The message to display.
   * @param summary - Optional summary/title.
   */
  function showError(message: string, summary: string = 'Error'): void {
    toast.add({
      severity: 'error',
      summary,
      detail: message,
      life: 3000,
    });
  }
  return { showSuccess, showError };
}
