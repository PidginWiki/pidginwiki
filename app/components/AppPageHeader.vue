<script setup lang="ts">
withDefaults(defineProps<{ title: string; subtitle?: string; icon?: string; motif?: string; max?: string }>(), {
  max: 'max-w-3xl',
})
</script>

<template>
  <section class="relative overflow-hidden border-b border-outline bg-surface-1">
    <div class="kente-bar h-2" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-16 top-2 h-48 w-48 rounded-full bg-[#c7d2fe] opacity-30 blur-3xl" />
    <div :class="['relative mx-auto px-4 py-9 sm:py-11', max]">
      <div class="flex items-center gap-4">
        <span
          v-if="icon || motif"
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-primary shadow-sm"
        >
          <MotifIcon v-if="motif" :motif="motif" :size="26" />
          <span v-else class="material-symbols-outlined" style="font-size:26px">{{ icon }}</span>
        </span>
        <div>
          <h1 class="wiki-title text-3xl text-on-surface sm:text-4xl">{{ title }}</h1>
          <p v-if="subtitle" class="mt-1 max-w-2xl text-on-surface-variant">{{ subtitle }}</p>
        </div>
      </div>
      <slot />
    </div>
  </section>
</template>
