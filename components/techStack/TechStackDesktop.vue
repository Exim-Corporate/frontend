<template>
  <div class="hidden md:grid md:grid-cols-[220px_1fr] gap-10 mt-12">
    <div
      class="flex flex-col"
      data-aos="fade-right"
      data-aos-duration="500"
    >
      <button
        v-for="role in section.roles"
        :key="role.id"
        type="button"
        class="group relative py-4 text-left cursor-pointer"
        @click="$emit('roleChange', role.id)"
      >
        <div class="flex items-center justify-between gap-4">
          <BaseText variant="main">{{ $t(role.roleKey) }}</BaseText>
          <Icon
            icon="ri:arrow-right-line"
            class="text-xl transition-opacity duration-200"
            :class="selectedRoleId === role.id ? 'opacity-100' : 'opacity-0'"
          />
        </div>
        <span
          class="absolute left-0 bottom-0 h-px bg-text-dark transition-all duration-300"
          :class="selectedRoleId === role.id ? 'w-full' : 'w-0 group-hover:w-[30%]'"
        />
      </button>
    </div>

    <Transition name="role-fade" mode="out-in">
      <div
        :key="selectedRole.id"
        class="grid grid-cols-2 xl:grid-cols-4 gap-4 justify-items-start"
        data-aos="fade-left"
        data-aos-duration="500"
      >
        <TechStackCard
          v-for="technology in selectedRole.technologies"
          :key="`${section.id}-${selectedRole.id}-${technology.name}`"
          :technology="technology"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import BaseText from '@/components/UI/BaseText.vue';
import TechStackCard from '@/components/techStack/TechStackCard.vue';
import type { TechStackRole, TechStackSectionItem } from '@/types/tech-stack';

const props = defineProps<{
  section: TechStackSectionItem;
  selectedRoleId: string;
}>();

defineEmits<{
  roleChange: [roleId: string];
}>();

const selectedRole = computed<TechStackRole>(() => {
  return props.section.roles.find(role => role.id === props.selectedRoleId) ?? props.section.roles[0];
});
</script>

<style scoped>
.role-fade-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
  /* transition-delay: 100ms; */
}

.role-fade-leave-active {
  transition: opacity 0.10s ease;
}

.role-fade-enter-from,
.role-fade-leave-to {
  opacity: 0;
}

.role-fade-enter-from {
  transform: scale(0.85);
}

.role-fade-enter-to,
.role-fade-leave-from {
  opacity: 1;
}

.role-fade-enter-to {
  transform: scale(1);
}
</style>
