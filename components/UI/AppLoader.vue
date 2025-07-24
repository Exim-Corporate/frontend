<template>
  <div class="app-loader-overlay">
    <div class="app-loader-spinner">
      <svg
        class="animate-spin h-12 w-12 text-white"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for base loader
</script>

<style scoped>
.app-loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 41, 59, 0.5); /* dark bg with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.app-loader-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
