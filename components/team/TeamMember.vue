<template>
  <article class="team-member-card relative isolate overflow-hidden rounded-3xl border border-form-border/80">
    <NuxtImg
      :src="member.imageSrc"
      :alt="member.name"
      class="absolute inset-0 h-full w-full object-cover object-top grayscale-75"
      width="640"
      height="740"
      loading="lazy"
      format="webp"
      quality="90"
      sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 560px"
    />

    <div class="absolute inset-0 bg-linear-to-t from-text-dark/20 via-text-dark/20 to-text-dark/20" />

    <div class="relative flex h-full flex-col justify-between p-6 sm:p-7 lg:p-8">
      <BaseText
        variant="card"
        class-name="inline-flex w-fit rounded-full border border-text-light/70 px-4 py-1 text-text-light !leading-5"
      >
        {{ member.roleKey ? $t(member.roleKey) : member.role }}
      </BaseText>

      <div>
        <BaseTitle tag="h3" variant="serifSubheader" class-name="text-left text-text-light">
          {{ member.nameKey ? $t(member.nameKey) : member.name }}
        </BaseTitle>
        <BaseText variant="section" class-name="mt-4 max-w-md text-left text-text-light">
          {{ member.bioKey ? $t(member.bioKey) : member.bio }}
        </BaseText>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { TeamMemberType } from '@/types/team';

defineProps<{
  member: TeamMemberType;
}>();
</script>

<style scoped>
.team-member-card {
  height: clamp(29.375rem, 110vw, 46.875rem);
}

@media (min-width: 768px) {
  .team-member-card {
    height: clamp(32rem, 62vw, 46.875rem);
  }
}

@media (min-width: 1024px) {
  .team-member-card {
    height: min(52vw, 46.875rem);
  }
}
</style>
