<script setup lang="ts">
withDefaults(defineProps<{ dark?: boolean; size?: number }>(), { dark: false, size: 30 })
</script>

<template>
  <span class="inline-flex select-none items-center gap-1.5">
    <BrandIcon variant="P" :size="size" />
    <span
      class="wiki-title text-xl lowercase"
      :class="dark ? 'text-white' : 'text-on-surface'"
    >
      pidgin<span class="brand-dot">.</span>wiki
    </span>
  </span>
</template>

<style scoped>
.brand-dot {
  color: var(--brand-accent, #3f51b5);
}
</style>
