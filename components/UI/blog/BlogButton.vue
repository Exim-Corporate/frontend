<template>
  <Button v-bind="$attrs" />
</template>

<script setup lang="ts">
import type { ButtonProps } from 'primevue/button';

defineProps</* @vue-ignore */ ButtonProps>();
</script>
