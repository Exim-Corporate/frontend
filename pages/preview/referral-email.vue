<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2"> 📧 Referral Email Template Preview </h1>
        <p class="text-gray-600">
          Preview referral email templates in different languages without sending actual emails
        </p>
        <div
          class="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg"
        >
          <span class="text-sm">🧪 Development Tool</span>
        </div>
      </header>

      <!-- Controls -->
      <section class="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Template Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Template Type </label>
            <select
              v-model="selectedType"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="fetchPreview"
            >
              <option value="user">📨 User Confirmation</option>
              <option value="admin">🔔 Admin Notification</option>
            </select>
          </div>

          <!-- Language -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Language </label>
            <select
              v-model="selectedLocale"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="fetchPreview"
            >
              <option value="en">🇺🇸 English</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex items-end">
            <button
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              :disabled="loading"
              @click="fetchPreview"
            >
              {{ loading ? '⏳ Loading...' : '🔄 Refresh Preview' }}
            </button>
          </div>
        </div>
      </section>

      <!-- Preview -->
      <section class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <!-- Preview Header -->
        <div class="bg-gray-50 px-6 py-4 border-b">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="font-semibold text-gray-900">
                {{ previewData?.subject || 'Referral Email Preview' }}
              </h2>
              <p class="text-sm text-gray-600">
                {{ selectedType === 'admin' ? '🔔 Admin Notification' : '📨 User Confirmation' }}
                • {{ selectedLocale.toUpperCase() }}
              </p>
            </div>
            <div class="text-sm text-gray-500"> 📱 Responsive Email View </div>
          </div>
        </div>

        <!-- Preview Content -->
        <div class="p-6">
          <div class="mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-lg">
            <!-- Loading State -->
            <div
              v-if="loading"
              class="h-96 flex items-center justify-center bg-gray-50"
            >
              <div class="text-center">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
                />
                <p class="text-gray-600">Loading email preview...</p>
              </div>
            </div>

            <!-- Error State -->
            <div
              v-else-if="error"
              class="h-96 flex items-center justify-center bg-red-50"
            >
              <div class="text-center">
                <div class="text-red-500 text-4xl mb-4">⚠️</div>
                <p class="text-red-600 mb-4">Failed to load preview</p>
                <p class="text-sm text-red-500 mb-4">{{ error }}</p>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  @click="fetchPreview"
                >
                  Try Again
                </button>
              </div>
            </div>

            <!-- Email Preview -->
            <iframe
              v-else-if="previewData"
              :srcdoc="previewData.html"
              class="w-full"
              style="height: 600px; border: none"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </section>

      <!-- Preview Info -->
      <section class="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 class="font-semibold text-blue-900 mb-2">💡 Preview Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <ul class="space-y-1">
            <li>• This preview uses mock data to demonstrate referral email templates</li>
            <li>• Switch between languages to test internationalization</li>
            <li>• Compare admin and user referral email templates</li>
          </ul>
          <ul class="space-y-1">
            <li>• No actual emails are sent during preview</li>
            <li>• Templates use responsive design principles</li>
            <li>• All styles are inline for email client compatibility</li>
          </ul>
        </div>
      </section>

      <!-- Navigation -->
      <section class="mt-8 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Homepage
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmailPreviewResponse, EmailTemplateType, EmailLocale } from '@/types/email-preview';

/** Page metadata */
definePageMeta({
  layout: false,
});

/** Reactive state */
const selectedType = ref<EmailTemplateType>('user');
const selectedLocale = ref<EmailLocale>('en');
const loading = ref(false);
const error = ref<string | null>(null);
const previewData = ref<EmailPreviewResponse | null>(null);

/**
 * Fetches referral email preview from API
 */
async function fetchPreview(): Promise<void> {
  try {
    loading.value = true;
    error.value = null;

    const response = await $fetch<EmailPreviewResponse>('/api/preview/referral-email', {
      params: {
        type: selectedType.value,
        locale: selectedLocale.value,
      },
    });

    previewData.value = response;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Failed to fetch referral email preview:', err);
  } finally {
    loading.value = false;
  }
}

/** Load initial preview on mount */
onMounted(() => {
  fetchPreview();
});

/** SEO metadata */
useSeoMeta({
  title: 'Referral Email Template Preview - Development Tool',
  description: 'Preview referral email templates in different languages for testing purposes',
  robots: 'noindex, nofollow',
});
</script>
