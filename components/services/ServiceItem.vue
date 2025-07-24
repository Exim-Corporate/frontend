<template>
  <div
    class="service-item"
    :data-aos="reversed ? 'fade-left' : 'fade-right'"
    data-aos-duration="500"
  >
    <!-- Мобильный заголовок (виден только на мобильных) -->
    <h3 class="text-2xl font-bold text-white mb-6 block md:hidden">{{ $t(service.title) }}</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
      <!-- Image Side -->
      <div
        class="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-2xl shadow-xl"
        :class="{ 'md:order-2': reversed }"
      >
        <!-- Main service image -->
        <NuxtImg
          :src="service.image"
          :alt="$t(service.title)"
          class="w-full h-full object-fit"
          :class="service.imagePosition ? `object-${service.imagePosition}` : ''"
          loading="lazy"
          quality="80"
        />
      </div>

      <!-- Text Content Side -->
      <div
        class="service-content space-y-4 md:space-y-6"
        :class="{ 'md:order-1': reversed }"
      >
        <!-- Десктопный заголовок (скрыт на мобильных) -->
        <h3 class="text-2xl md:text-3xl font-bold text-white hidden md:block">{{
          $t(service.title)
        }}</h3>

        <!-- Service Items with dividers -->
        <div class="space-y-4">
          <div
            v-for="(item, index) in service.items"
            :key="`service-item-${index}`"
            class="service-block"
          >
            <div class="flex items-start">
              <div>
                <h4 class="text-lg sm:text-xl font-medium text-white mb-1">{{ $t(item.title) }}</h4>
                <p class="text-sm sm:text-base text-gray-300">
                  {{ $t(item.description) }}
                </p>
              </div>
            </div>

            <!-- Divider, except for last item -->
            <div
              v-if="index < service.items.length - 1"
              class="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3 md:my-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  service: {
    type: Object,
    required: true,
  },
  reversed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.service-item {
  transition: all 0.5s ease;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .service-item {
    margin-bottom: 3rem;
  }
}
</style>
