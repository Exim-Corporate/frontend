<template>
  <Dialog
    v-model:visible="isOpen"
    modal
    :draggable="false"
    :dismissableMask="true"
    :showHeader="false"
    :style="{ width: '32.5rem' }"
    :breakpoints="{ '1200px': '84vw', '575px': '92vw' }"
    pt:root:class="!rounded-2xl"
    pt:content:class="!px-4 !py-8 sm:!px-8 sm:!py-10"
  >
    <button
      type="button"
      class="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-text-dark/55 transition-all hover:bg-background-gray hover:text-text-dark"
      aria-label="Close dialog"
      @click="close"
    >
      <AppIcon icon="material-symbols:close" :size="20" />
    </button>

    <form class="flex flex-col gap-5" @submit.prevent="submitForm">
      <div class="flex flex-col gap-2">
        <label for="modal-full-name" class="pointer-events-none text-base leading-[1.2] text-text-dark/60">
          {{ $t('contact.fullName') }}
        </label>
        <InputText
          id="modal-full-name"
          v-model="formData.fullName"
          :placeholder="$t('contact.placeholders.fullName')"
          class="h-16 w-full rounded-xl border border-form-border px-4 text-lg text-text-dark transition-all duration-300 placeholder:text-text-dark/50  hover:border-black/35  active:border-black/45  focus:border-primary  focus-visible:border-primary focus-visible:outline-none"
          :invalid="v$.fullName.$invalid && isSubmitted"
        />
        <small v-if="v$.fullName.$invalid && isSubmitted" class="text-sm text-red-500">
          {{ String(v$.fullName.$errors[0]?.$message || '') }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="modal-email" class="pointer-events-none text-base leading-[1.2] text-text-dark/60">
          {{ $t('contact.emailLabel') }}
        </label>
        <InputText
          id="modal-email"
          v-model="formData.email"
          type="email"
          :placeholder="$t('contact.placeholders.email')"
          class="h-16 w-full rounded-xl border border-form-border px-4 text-lg text-text-dark transition-all duration-300 placeholder:text-text-dark/50  hover:border-black/35  active:border-black/45  focus:border-primary  focus-visible:border-primary focus-visible:outline-none"
          :invalid="v$.email.$invalid && isSubmitted"
        />
        <small v-if="v$.email.$invalid && isSubmitted" class="text-sm text-red-500">
          {{ String(v$.email.$errors[0]?.$message || '') }}
        </small>
      </div>

      <div class="flex flex-col gap-2">
        <label for="modal-project-info" class="pointer-events-none text-base leading-[1.2] text-text-dark/60">
          {{ $t('contact.projectInformation') }}
        </label>
        <Textarea
          id="modal-project-info"
          v-model="formData.projectInformation"
          rows="3"
          maxlength="1000"
          :placeholder="$t('contact.placeholders.projectInformation')"
          class="min-h-30 w-full rounded-xl border border-form-border px-4 py-3 text-lg text-text-dark transition-all duration-300 placeholder:text-text-dark/50 hover:border-black/35 active:border-black/45 focus:border-primary focus-visible:border-primary focus-visible:outline-none"
          :invalid="v$.projectInformation.$invalid && isSubmitted"
        />
        <small v-if="v$.projectInformation.$invalid && isSubmitted" class="text-sm text-red-500">
          {{ String(v$.projectInformation.$errors[0]?.$message || '') }}
        </small>
      </div>

      <div class="mt-1">
        <div class="flex items-start gap-3">
          <Checkbox
            v-model="formData.privacyPolicyAccepted"
            inputId="modal-privacy"
            binary
            :invalid="v$.privacyPolicyAccepted.$invalid && isSubmitted"
            class="mt-0.5"
          />
          <label for="modal-privacy" class="text-sm leading-6 text-text-dark">
            {{ $t('contact.privacy_policy_agreement') }}
            <NuxtLink :to="localePath('/privacy')" class="underline">
              {{ $t('contact.privacy_policy') }}
            </NuxtLink>
          </label>
        </div>
        <small v-if="v$.privacyPolicyAccepted.$invalid && isSubmitted" class="mt-1 block text-sm text-red-500">
          {{ String(v$.privacyPolicyAccepted.$errors[0]?.$message || '') }}
        </small>
      </div>

      <AppButton
        type="submit"
        :label="$t('contact.letsConnect')"
        :disabled="loading"
        class="mt-2 w-full"
      />
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import AppButton from '@/components/UI/AppButton.vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import { useContactModal } from '@/composables/useContactModal';
import { useLocalePath } from '#imports';

const { t, locale } = useI18n();
const toast = useToast();
const { isOpen, close, source } = useContactModal();
const localePath = useLocalePath();

const loading = ref(false);
const isSubmitted = ref(false);

const formData = reactive({
  fullName: '',
  email: '',
  projectInformation: '',
  privacyPolicyAccepted: false,
});

const rules = {
  fullName: { required: helpers.withMessage(t('contact.validation.name_required'), required) },
  email: {
    required: helpers.withMessage(t('contact.validation.email_required'), required),
    email: helpers.withMessage(t('contact.validation.email_invalid'), email),
  },
  projectInformation: {
    required: helpers.withMessage(t('contact.validation.project_information_required'), required),
  },
  privacyPolicyAccepted: {
    isTrue: helpers.withMessage(
      t('contact.validation.privacy_policy_required'),
      (val: boolean) => val === true,
    ),
  },
};

const v$ = useVuelidate(rules, formData);

const resetForm = () => {
  formData.fullName = '';
  formData.email = '';
  formData.projectInformation = '';
  formData.privacyPolicyAccepted = false;
  isSubmitted.value = false;
  v$.value.$reset();
};

const submitForm = async () => {
  isSubmitted.value = true;
  const valid = await v$.value.$validate();
  if (!valid) {
    return;
  }

  loading.value = true;
  try {
    const response = await $fetch<{ ok: boolean; message?: string }>('/api/contact', {
      method: 'POST',
      query: { lang: locale.value },
      body: {
        fullName: formData.fullName,
        email: formData.email,
        projectInformation: formData.projectInformation,
        privacyPolicyAccepted: formData.privacyPolicyAccepted,
        source: source.value,
      },
    });

    if (response?.ok) {
      toast.add({
        severity: 'success',
        summary: t('contact.success'),
        detail:
          t('contact.personalized_success', { name: formData.fullName }) ||
          t('contact.form_submitted_successfully'),
        life: 4000,
      });
      resetForm();
      close();
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: t('contact.error') || 'Something went wrong. Please try again.',
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};
</script>
