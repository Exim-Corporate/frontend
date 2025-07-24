<template>
  <section class="team-section py-24 relative overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 rotate-180 bg-indigo-gradient opacity-95" />

    <!-- Decorative Elements -->
    <div
      class="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
    />
    <div
      class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"
    />

    <div class="container relative z-10 mx-auto px-4">
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-20"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-light">
          {{ $t('team.title1') }} <span class="text-gradient">{{ $t('team.title_span') }}</span>
          {{ $t('team.title2') }}
        </h2>
        <p class="text-lg text-text-light max-w-3xl mx-auto">
          {{ $t('team.subtitle') }}
        </p>
        <div
          class="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mt-8 rounded-full"
        />
      </div>

      <!-- Team Members - Centered for 2 cards -->
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <TeamMember
            v-for="member in teamMembers"
            :key="member.id"
            :member="member"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Fetch team members data from the composable
const { teamMembers } = useTeamMembers();
</script>

<style scoped>
.team-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #af55ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

@media (max-width: 640px) {
  .team-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
    min-height: auto;
  }
}
</style>
