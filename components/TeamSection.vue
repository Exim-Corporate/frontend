<template>
  <section class=" bg-white container">
      <div class="mx-auto items-center max-w-5xl">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-left">
            {{ $t('team.title') }}
          </BaseTitle>
        </AnimatedElement>

        <AnimatedElement direction="bottom" :delay="170">
          <BaseText variant="section" class-name="mt-4 max-w-4xl text-text-secondary text-center">
            {{ $t('team.subtitle') }}
          </BaseText>
        </AnimatedElement>
      </div>

      <div class="mt-10 space-y-4 md:hidden">
        <AnimatedElement
          v-for="(member, index) in teamMembers"
          :key="`mobile-${member.id}`"
          direction="bottom"
          :delay="120 + index * 70"
        >
          <TeamMember :member="member" />
        </AnimatedElement>
      </div>

      <div class="mt-10 hidden md:block">
        <div class="mx-auto grid grid-cols-2 gap-5 lg:gap-6">
          <AnimatedElement
            v-for="(member, index) in teamMembers"
            :key="`desktop-${member.id}`"
            direction="bottom"
            :delay="180 + index * 90"
          >
            <TeamMember :member="member" />
          </AnimatedElement>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import TeamMember from '@/components/team/TeamMember.vue';
import { useTeamMembers } from '@/composables/useTeamMembers';

const { teamMembers } = useTeamMembers();
</script>
