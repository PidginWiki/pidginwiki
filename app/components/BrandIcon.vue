<script setup lang="ts">
withDefaults(defineProps<{ variant?: string; size?: number }>(), { variant: 'P', size: 36 })
const uid = useId()
</script>

<template>
  <!-- M: Talking drum -->
  <svg
    v-if="variant === 'M'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="16" cy="6.5" rx="7.5" ry="2.5" />
    <ellipse cx="16" cy="25.5" rx="7.5" ry="2.5" />
    <path d="M8.5 6.5 13 16 8.5 25.5" />
    <path d="M23.5 6.5 19 16 23.5 25.5" />
    <path d="M11 10.5h10M12 13.5h8M12 18.5h8M11 21.5h10" stroke-width="1.6" />
  </svg>

  <!-- N: Cowrie shell -->
  <svg
    v-else-if="variant === 'N'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="16" cy="16" rx="7" ry="10.5" />
    <path d="M16 8c-2.5 4-2.5 12 0 16" stroke-width="1.6" />
    <path d="M16 8c2.5 4 2.5 12 0 16" stroke-width="1.6" />
    <path d="M14 12h4M13.5 15h5M13.5 19h5M14 22h4" stroke-width="1.4" />
  </svg>

  <!-- O: Many voices (overlapping speech bubbles) -->
  <svg
    v-else-if="variant === 'O'"
    :width="size" :height="size" viewBox="0 0 32 32"
    fill="currentColor" aria-hidden="true"
  >
    <path opacity="0.4" d="M5 5h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6l-4 3v-3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
    <path d="M14 12h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-1v3l-4-3h-8a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" />
  </svg>

  <!-- P: Kente weave (colourful, fixed palette) -->
  <svg v-else :width="size" :height="size" viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <clipPath :id="uid"><rect x="4" y="4" width="24" height="24" rx="6.5" /></clipPath>
    </defs>
    <g :clip-path="`url(#${uid})`">
      <rect x="4" y="4" width="24" height="24" fill="#fbf7ee" />
      <!-- horizontal weft bands -->
      <rect x="4" y="7.8" width="24" height="3" fill="#0aa84f" />
      <rect x="4" y="14.5" width="24" height="3" fill="#f01b2f" />
      <rect x="4" y="21.2" width="24" height="3" fill="#ffbc11" />
      <!-- vertical warp threads -->
      <rect x="9" y="4" width="2.6" height="24" fill="#1c1610" />
      <rect x="20.4" y="4" width="2.6" height="24" fill="#1473e6" />
      <!-- base-colour blocks where warp crosses weft, for the woven look -->
      <rect x="9" y="7.8" width="2.6" height="3" fill="#fbf7ee" />
      <rect x="20.4" y="14.5" width="2.6" height="3" fill="#fbf7ee" />
      <rect x="9" y="21.2" width="2.6" height="3" fill="#fbf7ee" />
    </g>
    <rect x="4" y="4" width="24" height="24" rx="6.5" fill="none" stroke="#000000" stroke-opacity="0.14" stroke-width="1.4" />
  </svg>
</template>
