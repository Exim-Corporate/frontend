<template>
  <div
    id="refForm"
    class="relative"
  >
    <div
      class="absolute inset-0 bg-cover bg-center z-0"
      style="background-image: url('/images/contactForm.webp')"
    />
    <div class="absolute inset-0 bg-gradient-to-l from-navy-blue/95 to-accent/60 z-0" />
    <section class="px-6 py-16 container">
      <div
        data-aos="fade-up"
        data-aos-duration="300"
        class="text-center mb-16"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span class="text-gradient">{{ $t('referrals.submission.title') }}</span>
        </h2>
        <p class="text-lg text-gray-100 max-w-3xl mx-auto">
          {{ $t('referrals.submission.subtitle') }}
        </p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-duration="500"
        class="max-w-4xl mx-auto bg-white dark:bg-navy-blue/80 shadow-xl rounded-2xl p-6 md:p-10 backdrop-blur-sm"
      >
        <form @submit.prevent="submitForm">
          <div class="space-y-3">
            <!-- Referrer info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
            </div>

            <div class="">
              <h3 class="text-lg font-semibold mb-4">{{
                $t('referrals.form.referred_section_title')
              }}</h3>
              <div class="grid md:grid-cols-2 gap-6">
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

                <FormInput
                  id="companySize"
                  v-model="form.companySize"
                  :label="$t('referrals.form.company_size_label')"
                  :placeholder="$t('referrals.form.placeholders.company_size')"
                />
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <FormInput
                  id="contactName"
                  v-model="form.contactName"
                  :label="$t('referrals.form.contact_name')"
                  :placeholder="$t('referrals.form.placeholders.contact_name')"
                  :is-invalid="v$.contactName?.$invalid && submitted"
                  :error-message="
                    v$.contactName?.$invalid && submitted
                      ? String(v$.contactName?.$errors[0].$message)
                      : ''
                  "
                  required
                />

                <FormInput
                  id="contactEmail"
                  v-model="form.contactEmail"
                  type="email"
                  :label="$t('referrals.form.contact_email')"
                  :placeholder="'john@example.com'"
                  :is-invalid="v$.contactEmail?.$invalid && submitted"
                  :error-message="
                    v$.contactEmail?.$invalid && submitted
                      ? String(v$.contactEmail?.$errors[0].$message)
                      : ''
                  "
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">{{
                $t('referrals.form.additional_information_label')
              }}</label>
              <FormTextarea
                id="message"
                v-model="form.message"
                :label="$t('referrals.form.message')"
                :placeholder="$t('referrals.form.placeholders.description')"
                :rows="5"
                :maxlength="500"
              />
            </div>

            <div>
              <FormCheckbox
                id="privacyPolicy"
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
                  >{{ $t('contact.privacy_policy') }}</NuxtLink
                >
              </FormCheckbox>
            </div>

            <div class="flex flex-col items-center">
              <FormSubmitButton
                :label="$t('referrals.form.submit')"
                :loading="loading"
                :loading-label="$t('referrals.form.sending')"
                severity="contrast"
                size="large"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailVal, helpers } from '@vuelidate/validators';

// Import local form components so the compiler registers them for the template
import FormInput from '@/components/UI/form/FormInput.vue';
import FormTextarea from '@/components/UI/form/FormTextarea.vue';
import FormCheckbox from '@/components/UI/form/FormCheckbox.vue';
import FormSubmitButton from '@/components/UI/form/FormSubmitButton.vue';

const { t } = useI18n();
const toast = useToast();

const form = reactive({
  fullName: '',
  email: '',
  company: '',
  referredCompany: '',
  message: '',
  privacyPolicyAccepted: false,
  companySize: '',
  contactName: '',
  contactEmail: '',
});

const loading = ref(false);
const submitted = ref(false);

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
  contactName: {
    required: helpers.withMessage(
      t('referrals.form.validation.contact_name_required') ||
        t('referrals.form.validation.name_required'),
      required,
    ),
  },
  contactEmail: {
    required: helpers.withMessage(
      t('referrals.form.validation.contact_email_required') ||
        t('referrals.form.validation.email_required'),
      required,
    ),
    email: helpers.withMessage(t('referrals.form.validation.email_invalid'), emailVal),
  },
  privacyPolicyAccepted: {
    isTrue: helpers.withMessage(
      t('referrals.form.validation.privacy_required'),
      (val: boolean) => val === true,
    ),
  },
};

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
  submitted.value = true;
  const ok = await v$.value.$validate();
  if (!ok) return;
  loading.value = true;
  try {
    await $fetch('/api/referrals', { method: 'POST', body: { ...form } });
    toast.add({
      severity: 'success',
      summary: t('referrals.form.success'),
      detail:
        t('referrals.form.personalized_success', { name: form.fullName }) ||
        t('referrals.form.success_generic'),
      life: 5000,
    });
    v$.value.$reset();
    // reset form
    form.fullName = '';
    form.email = '';
    form.company = '';
    form.referredCompany = '';
    form.message = '';
    form.privacyPolicyAccepted = false;
    form.companySize = '';
    form.contactName = '';
    form.contactEmail = '';
    submitted.value = false;
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Error', detail: t('error') || String(e), life: 5000 });
  } finally {
    loading.value = false;
  }
};
</script>
