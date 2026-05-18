<script setup lang="ts">
withDefaults(defineProps<{ motif: string; size?: number }>(), { size: 32 })
</script>

<template>
  <!-- talking drum: communication, oral tradition -->
  <svg
    v-if="motif === 'talking-drum'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="16" cy="6.5" rx="7.5" ry="2.3" />
    <ellipse cx="16" cy="25.5" rx="7.5" ry="2.3" />
    <path d="M8.5 6.5 13 16 8.5 25.5" />
    <path d="M23.5 6.5 19 16 23.5 25.5" />
    <path d="M11 11h10M12 14.2h8M12 17.8h8M11 21h10" stroke-width="1.5" />
  </svg>

  <!-- learn: a small neural network -->
  <svg
    v-else-if="motif === 'learn'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M9.8 9.6 16.5 14.4M9.8 22.4 16.5 17.6M20.5 16H25" />
    <circle cx="7.5" cy="8" r="2.6" />
    <circle cx="7.5" cy="24" r="2.6" />
    <circle cx="18.5" cy="16" r="2.8" />
    <circle cx="26.5" cy="16" r="2.4" />
  </svg>

  <!-- globe-voices: dialects across regions -->
  <svg
    v-else-if="motif === 'globe-voices'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="14" cy="18" r="9" />
    <path d="M5 18h18M14 9c4.2 2.8 4.2 15.2 0 18M14 9c-4.2 2.8-4.2 15.2 0 18" stroke-width="1.6" />
    <path d="M22 4h6a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2l-3 2 .4-2H22a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="currentColor" stroke="none" />
  </svg>

  <!-- bandolo-bot: the contribution assistant -->
  <svg
    v-else-if="motif === 'bandolo-bot'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M16 5v3" />
    <circle cx="16" cy="4" r="1.6" fill="currentColor" stroke="none" />
    <rect x="6" y="8" width="20" height="14" rx="5" />
    <circle cx="12.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19.5" cy="15" r="1.5" fill="currentColor" stroke="none" />
    <path d="M13 18.5c1.8 1.3 4.2 1.3 6 0" />
    <path d="M11 22v3l3-3" />
  </svg>

  <!-- cowrie: contribution / value -->
  <svg
    v-else-if="motif === 'cowrie'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="16" cy="16" rx="7" ry="10.5" />
    <path d="M16 8c-2.5 4-2.5 12 0 16" stroke-width="1.6" />
    <path d="M16 8c2.5 4 2.5 12 0 16" stroke-width="1.6" />
    <path d="M14 12h4M13.5 15.5h5M13.5 19h5" stroke-width="1.4" />
  </svg>

  <!-- open-book: dictionary / reference -->
  <svg
    v-else-if="motif === 'open-book'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M16 9c-2.2-1.6-5.2-2.6-8.5-2.6V23c3.3 0 6.3 1 8.5 2.6 2.2-1.6 5.2-2.6 8.5-2.6V6.4C21.2 6.4 18.2 7.4 16 9Z" />
    <path d="M16 9v16.6" />
  </svg>

  <!-- community: a circle of people -->
  <svg
    v-else-if="motif === 'community'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="16" cy="6.5" r="2.4" />
    <circle cx="25.5" cy="13.5" r="2.4" />
    <circle cx="21.8" cy="24.5" r="2.4" />
    <circle cx="10.2" cy="24.5" r="2.4" />
    <circle cx="6.5" cy="13.5" r="2.4" />
    <circle cx="16" cy="16" r="6.5" stroke-dasharray="2 3" stroke-width="1.4" />
  </svg>

  <!-- pen: add a word -->
  <svg
    v-else-if="motif === 'pen'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M7 25l1.6-5.2L20 8.4l3.6 3.6L12.2 23.4 7 25Z" />
    <path d="M18.4 10l3.6 3.6" />
  </svg>

  <!-- exchange: translate / swap -->
  <svg
    v-else
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M7 12h17l-5-5" />
    <path d="M25 20H8l5 5" />
  </svg>
</template>
