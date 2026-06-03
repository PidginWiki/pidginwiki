<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    title: string
    description?: string
    actionLabel?: string
    actionTo?: string
  }>(),
  { icon: 'search_off' },
)
</script>

<template>
  <div class="flex flex-col items-center rounded-2xl border border-dashed border-outline-strong bg-surface-2 px-6 py-12 text-center">
    <span class="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-on-surface-variant">
      <span class="material-symbols-outlined">{{ icon }}</span>
    </span>
    <p class="mt-4 font-medium text-on-surface">{{ title }}</p>
    <p v-if="description" class="mt-1 max-w-sm text-sm text-on-surface-variant">{{ description }}</p>
    <NuxtLink v-if="actionLabel && actionTo" :to="actionTo" class="btn-text mt-3">{{ actionLabel }}</NuxtLink>
  </div>
</template>
