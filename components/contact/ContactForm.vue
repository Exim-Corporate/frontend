<template>
  <div
    data-aos="zoom-in"
    data-aos-duration="500"
    class="max-w-4xl relative mx-auto bg-white dark:bg-navy-blue/80 shadow-xl rounded-2xl p-6 md:p-10 backdrop-blur-sm"
  >
    <form @submit.prevent="submitForm">
      <!-- Left column -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <!-- Full Name -->
        <FormInput
          id="fullName"
          v-model="formData.fullName"
          :label="$t('contact.name')"
          :placeholder="$t('contact.placeholders.fullName')"
          :is-invalid="v$.fullName.$invalid && isSubmitted"
          :error-message="
            v$.fullName.$invalid && isSubmitted ? String(v$.fullName.$errors[0].$message) : ''
          "
          required
        />

        <!-- Company Name (optional) -->
        <FormInput
          id="companyName"
          v-model="formData.companyName"
          :label="$t('contact.company')"
          :placeholder="$t('contact.placeholders.companyName')"
          optional
        />

        <!-- Work Email -->
        <FormInput
          id="email"
          v-model="formData.email"
          :label="$t('contact.email')"
          :placeholder="$t('contact.placeholders.email')"
          type="email"
          :is-invalid="v$.email.$invalid && isSubmitted"
          :error-message="
            v$.email.$invalid && isSubmitted ? String(v$.email.$errors[0].$message) : ''
          "
          required
        />

        <!-- Country -->
        <FormAutoComplete
          id="country"
          v-model="formData.country"
          :label="$t('contact.country')"
          :placeholder="$t('contact.placeholders.country')"
          :delay="0"
          :suggestions="filteredCountries"
          :is-invalid="v$.country.$invalid && isSubmitted"
          :error-message="
            v$.country.$invalid && isSubmitted ? $t('contact.validation.country_required') : ''
          "
          required
          @complete="searchCountry"
        />
      </div>

      <!-- Right column -->
      <div>
        <!-- Roles Looking For -->
        <FormMultiSelect
          id="services"
          v-model="formData.services"
          :label="$t('contact.roles')"
          :options="serviceRoles"
          optionLabel="name"
          :placeholder="$t('contact.placeholders.services')"
          :is-invalid="v$.services.$invalid && isSubmitted"
          :error-message="
            v$.services.$invalid && isSubmitted ? $t('contact.validation.roles_required') : ''
          "
          display="chip"
          filter
          :showToggleAll="true"
          pcHeaderCheckbox
          required
          @change="handleServiceChange"
        />

        <!-- Message / Requirements -->
        <FormTextarea
          id="message"
          v-model="formData.message"
          :label="$t('contact.message')"
          :placeholder="$t('contact.placeholders.message')"
          :rows="5"
          :maxlength="500"
          :is-invalid="v$.message.$invalid && isSubmitted"
          :error-message="
            v$.message.$invalid && isSubmitted ? String(v$.message.$errors[0].$message) : ''
          "
          :char-count="charCount"
          required
          @char-count="updateCharCount"
        />
      </div>

      <!-- Full width submit button -->
      <div class="flex flex-col items-center">
        <!-- Privacy Policy Checkbox -->
        <FormCheckbox
          id="privacyPolicy"
          v-model="formData.privacyPolicyAccepted"
          :is-invalid="!formData.privacyPolicyAccepted && isSubmitted"
          :error-message="
            v$.privacyPolicyAccepted.$invalid && isSubmitted
              ? $t('contact.validation.privacy_policy_required')
              : ''
          "
          :required="true"
        >
          {{ $t('contact.privacy_policy_agreement') }} *
          <NuxtLink
            to="/privacy"
            class="text-accent hover:underline"
          >
            {{ $t('contact.privacy_policy') }}
          </NuxtLink>
        </FormCheckbox>

        <FormSubmitButton
          :label="$t('contact.submit')"
          :loading="loading"
          :loading-label="$t('contact.sending')"
          severity="contrast"
          size="large"
        />

        <!-- Mini CTA -->
        <p class="text-sm mt-6 text-gray-500 dark:text-gray-300 text-center">
          {{ $t('contact.prefer_email') }}
          <a
            :href="runtimeConfig.public.contactEmail"
            class="text-accent font-medium hover:underline"
          >
            {{ runtimeConfig.public.contactEmail }}
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import type { ServiceRole, Technology } from '@/composables/useCommonData';
import { useContactForm } from '@/composables/useCommonData';
import { useI18n } from 'vue-i18n';
import countriesData from '@/utils/countries.json';

// Импортируем компоненты формы
import FormInput from '@/components/UI/form/FormInput.vue';
import FormTextarea from '@/components/UI/form/FormTextarea.vue';
import FormAutoComplete from '@/components/UI/form/FormAutoComplete.vue';
import FormMultiSelect from '@/components/UI/form/FormMultiSelect.vue';
import FormCheckbox from '@/components/UI/form/FormCheckbox.vue';
import FormSubmitButton from '@/components/UI/form/FormSubmitButton.vue';
const runtimeConfig = useRuntimeConfig();
// Use i18n
const { t } = useI18n();

// Initialize toast service
const toast = useToast();

// Get form data from shared composable
const { serviceRoles, /* technologyOptions, */ shouldEnableTechSelect } = useContactForm();

const loading = ref(false);
const isSubmitted = ref(false);
const filteredCountries = ref<Array<string>>([]);
const charCount = ref(0);

// Convert imported countries to our format

// Form data
const formData = reactive({
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  country: null as string | null,
  services: [] as ServiceRole[],
  technologies: [] as Technology[],
  message: '',
  privacyPolicyAccepted: false,
});

// Form validation rules
const rules = {
  fullName: { required: helpers.withMessage(t('contact.validation.name_required'), required) },
  email: {
    required: helpers.withMessage(t('contact.validation.email_required'), required),
    email: helpers.withMessage(t('contact.validation.email_invalid'), email),
  },
  country: { required: helpers.withMessage(t('contact.validation.country_required'), required) },
  services: { required: helpers.withMessage(t('contact.validation.roles_required'), required) },
  message: { required: helpers.withMessage(t('contact.validation.message_required'), required) },
  privacyPolicyAccepted: {
    isTrue: helpers.withMessage(
      t('contact.validation.privacy_policy_required'),
      (val: boolean) => val === true,
    ),
  },
};

const v$ = useVuelidate(rules, formData);

// Filter countries based on user input
const searchCountry = (event: { query: string }) => {
  const query = event.query.toLowerCase();
  filteredCountries.value = countriesData
    .filter(country => country.country.toLowerCase().includes(query))
    .map(({ country }) => country);
};
const isTechSelectEnabled = computed(() => shouldEnableTechSelect(formData.services));

// Handle service selection change
const handleServiceChange = () => {
  // If no tech-enabled services are selected, clear the technologies selection
  if (!isTechSelectEnabled.value) {
    formData.technologies = [];
  }
};

// Update character count for the message textarea
const updateCharCount = () => {
  charCount.value = formData.message.length;
};

// Initialize character count when component mounts
onMounted(() => {
  charCount.value = formData.message.length;
});

// Form submission handler
const submitForm = async () => {
  isSubmitted.value = true;
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    return;
  }
  loading.value = true;
  try {
    // Отправка данных на серверную функцию
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        country: formData.country,
        services: formData.services.map(
          (s: import('@/composables/useCommonData').ServiceRole | string) =>
            typeof s === 'string' ? s : s.name,
        ),
        technologies:
          formData.technologies?.map(
            (t: import('@/composables/useCommonData').Technology | string) =>
              typeof t === 'string' ? t : t.name,
          ) || [],
        message: formData.message,
      },
    });
    if (response && (response as { ok?: boolean }).ok) {
      toast.add({
        severity: 'success',
        summary: t('contact.success'),
        // Personalized, localized message: e.g. "John, thank you for your message!"
        detail:
          t('contact.personalized_success', { name: formData.fullName }) ||
          t('contact.form_submitted_successfully'),
        life: 5000,
      });
      v$.value.$reset();
      isSubmitted.value = false;
      formData.fullName = '';
      formData.companyName = '';
      formData.email = '';
      formData.message = '';
      formData.country = null;
      formData.services = [];
      formData.technologies = [];
      formData.privacyPolicyAccepted = false;
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: t('contact.error'),
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Специфичные стили только для контейнера формы */
/* Остальные стили перенесены в соответствующие компоненты формы */
</style>
