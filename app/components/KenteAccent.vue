<script setup lang="ts">
// A slim woven-kente stripe, used as a branded section divider or card top accent.
withDefaults(defineProps<{ height?: number }>(), { height: 6 })

const stripe =
  'repeating-linear-gradient(90deg,' +
  'var(--color-kente-green) 0 16px,' +
  'var(--color-kente-gold) 16px 32px,' +
  'var(--color-kente-red) 32px 48px,' +
  'var(--color-kente-ink) 48px 56px,' +
  'var(--color-kente-blue) 56px 72px)'
</script>

<template>
  <div
    class="w-full"
    :style="{ height: `${height}px`, background: stripe }"
    aria-hidden="true"
  />
</template>
