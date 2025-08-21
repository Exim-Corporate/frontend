<template>
  <section class="py-20 md:py-28">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-14">
        <h2
          data-aos="fade-up"
          class="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        >
          <span class="text-gradient">{{ $t('referrals.submission.title') }}</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          class="text-gray-600 dark:text-gray-300 text-lg"
        >
          {{ $t('referrals.submission.subtitle') }}
        </p>
      </div>

      <div
        data-aos="zoom-in"
        class="max-w-3xl mx-auto bg-white dark:bg-navy-blue/80 shadow-xl rounded-2xl p-6 md:p-10 backdrop-blur-sm"
      >
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="fullName"
              v-model="form.fullName"
              :label="$t('referrals.form.full_name')"
              :placeholder="$t('referrals.form.placeholders.full_name')"
              :is-invalid="v$.fullName.$invalid && submitted"
              :error-message="
                v$.fullName.$invalid && submitted ? String(v$.fullName.$errors[0].$message) : ''
              "
              required
            />
            <FormInput
              id="email"
              v-model="form.email"
              type="email"
              :label="$t('referrals.form.email')"
              :placeholder="$t('referrals.form.placeholders.email')"
              :is-invalid="v$.email.$invalid && submitted"
              :error-message="
                v$.email.$invalid && submitted ? String(v$.email.$errors[0].$message) : ''
              "
              required
            />
            <FormInput
              id="company"
              v-model="form.company"
              :label="$t('referrals.form.company')"
              :placeholder="$t('referrals.form.placeholders.company')"
              optional
            />
            <FormInput
              id="referredCompany"
              v-model="form.referredCompany"
              :label="$t('referrals.form.referred_company')"
              :placeholder="$t('referrals.form.placeholders.referred_company')"
              :is-invalid="v$.referredCompany?.$invalid && submitted"
              :error-message="
                v$.referredCompany?.$invalid && submitted
                  ? String(v$.referredCompany?.$errors[0].$message)
                  : ''
              "
              required
            />
          </div>
          <div class="mt-4">
            <FormTextarea
              id="message"
              v-model="form.message"
              :label="$t('referrals.form.message')"
              :placeholder="$t('referrals.form.placeholders.message')"
              :rows="5"
              :maxlength="400"
              @char-count="count => (charCount = count)"
            />
          </div>
          <div class="flex flex-col items-center mt-6">
            <FormCheckbox
              id="privacy"
              v-model="form.privacyPolicyAccepted"
              :is-invalid="!form.privacyPolicyAccepted && submitted"
              :error-message="
                v$.privacyPolicyAccepted.$invalid && submitted
                  ? $t('referrals.form.validation.privacy_required')
                  : ''
              "
              :required="true"
            >
              {{ $t('referrals.form.privacy_policy_agreement') }} *
              <NuxtLink
                to="/privacy"
                class="text-accent hover:underline"
              >
                {{ $t('contact.privacy_policy') }}
              </NuxtLink>
            </FormCheckbox>
            <FormSubmitButton
              :label="$t('referrals.form.submit')"
              :loading="loading"
              :loading-label="$t('referrals.form.sending')"
              severity="contrast"
              size="large"
            />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailVal, helpers } from '@vuelidate/validators';
import type { ReferralSubmissionPayload } from '@/types/referrals';

import FormInput from '@/components/UI/form/FormInput.vue';
import FormTextarea from '@/components/UI/form/FormTextarea.vue';
import FormCheckbox from '@/components/UI/form/FormCheckbox.vue';
import FormSubmitButton from '@/components/UI/form/FormSubmitButton.vue';

const { t } = useI18n();
const toast = useToast();

const form = reactive<ReferralSubmissionPayload>({
  fullName: '',
  email: '',
  company: '',
  referredCompany: '',
  message: '',
  privacyPolicyAccepted: false,
});

const loading = ref(false);
const submitted = ref(false);
const charCount = 0; // currently tracked via emitted char-count if needed

const rules = {
  fullName: {
    required: helpers.withMessage(t('referrals.form.validation.name_required'), required),
  },
  email: {
    required: helpers.withMessage(t('referrals.form.validation.email_required'), required),
    email: helpers.withMessage(t('referrals.form.validation.email_invalid'), emailVal),
  },
  referredCompany: {
    required: helpers.withMessage(
      t('referrals.form.validation.referred_company_required'),
      required,
    ),
  },
  privacyPolicyAccepted: {
    isTrue: helpers.withMessage(
      t('referrals.form.validation.privacy_required'),
      (val: boolean) => val === true,
    ),
  },
};

// Suppress strict typing issues for Vuelidate here (runtime validation is correct)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const v$ = useVuelidate(rules, form);

const submitForm = async () => {
  submitted.value = true;
  const ok = await v$.value.$validate();
  if (!ok) return;
  loading.value = true;
  try {
    await $fetch('/api/referrals', { method: 'POST', body: form });
    toast.add({
      severity: 'success',
      summary: t('referrals.form.success'),
      detail:
        t('referrals.form.personalized_success', { name: form.fullName }) ||
        t('referrals.form.success_generic'),
      life: 5000,
    });
    v$.value.$reset();
    form.fullName = '';
    form.email = '';
    form.company = '';
    form.referredCompany = '';
    form.message = '';
    form.privacyPolicyAccepted = false;
    submitted.value = false;
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: t('error'),
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
