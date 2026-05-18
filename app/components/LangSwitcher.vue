<script setup lang="ts">
import type { Locale } from '~/i18n/messages'

const locale = useLocale()
const locales = useLocales()
const open = ref(false)
const current = computed(() => locales.find((l) => l.code === locale.value) ?? locales[0])

function pick(code: Locale) {
  locale.value = code
  open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-2 hover:text-on-surface"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
    >
      <span class="text-base leading-none">{{ current.flag }}</span>
      <span class="hidden sm:inline">{{ current.name }}</span>
      <span class="material-symbols-outlined transition-transform" :class="open && 'rotate-180'" style="font-size:18px">expand_more</span>
    </button>

    <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
    <div
      v-if="open"
      class="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-outline bg-surface p-1.5 shadow-[var(--shadow-e2)]"
      role="menu"
    >
      <button
        v-for="l in locales"
        :key="l.code"
        class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-2"
        role="menuitem"
        @click="pick(l.code)"
      >
        <span class="flex items-center gap-2.5">
          <span class="text-base leading-none">{{ l.flag }}</span>
          <span>
            <span class="block text-sm font-medium text-on-surface">{{ l.name }}</span>
            <span v-if="l.note" class="block text-xs text-on-surface-variant">{{ l.note }}</span>
          </span>
        </span>
        <span v-if="l.code === locale" class="material-symbols-outlined text-primary" style="font-size:20px">check</span>
      </button>
      <p class="px-3 pb-1 pt-2 text-xs text-on-surface-variant">More Pidgins are community-translated.</p>
    </div>
  </div>
</template>
